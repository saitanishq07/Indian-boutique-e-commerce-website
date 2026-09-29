import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import PinCodeChecker from '../../components/customer/PinCodeChecker';
import ProductCard from '../../components/customer/ProductCard';
import QuickViewModal from '../../components/customer/QuickViewModal';
import { formatPrice, calculateDiscount } from '../../utils/formatters';
import { Star, Heart, ShoppingBag, ShieldCheck, ChevronDown, ChevronUp, Check, Award, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetail({ productId, onNavigate }) {
  const { products, reviews, addToCart, toggleWishlist, isInWishlist, addReview } = useApp();
  
  const product = products.find(p => p.id === productId) || products[0];
  const inWishlist = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.mrp);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'One Size');
  const [quantity, setQuantity] = useState(1);

  // Accordion Toggles
  const [openAccordions, setOpenAccordions] = useState({
    details: true,
    fabric: false,
    sizeFit: false,
    shipping: false,
    returns: false,
    care: false
  });

  // Review Form state
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewName, setNewReviewName] = useState('');

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewText || !newReviewName) return;
    
    addReview({
      id: `rev-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      customerName: newReviewName,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      review: newReviewText,
      verified: true,
      status: 'Published'
    });

    setNewReviewText('');
    setNewReviewName('');
    alert('Thank you! Your review has been submitted.');
  };

  const productReviews = reviews.filter(r => r.productId === product.id && r.status === 'Published');
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Product Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Gallery (6 cols on lg) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="w-full aspect-[3/4] bg-white rounded-lg overflow-hidden border border-[#E8DFD5] relative group">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#4A0E17] text-[#FAF6F0] text-xs font-bold tracking-widest uppercase rounded shadow">
                {product.badge}
              </span>
            )}
          </div>

          {/* Image Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-24 rounded overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImage === idx ? 'border-[#4A0E17] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Purchase Details (6 cols on lg) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-[#C5A059] font-bold uppercase tracking-widest mb-1">
              <span>{product.category}</span>
              {product.craft && <span className="text-[#222222]/60">CRAFT: {product.craft}</span>}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-sm text-[#222222] ml-1">{product.rating}</span>
              </div>
              <span className="text-xs text-[#222222]/40 font-medium">({product.reviewCount} customer reviews)</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                IN STOCK ({product.stock} available)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-white rounded border border-[#E8DFD5] flex items-baseline gap-4">
            <span className="font-serif font-bold text-3xl text-[#4A0E17]">
              {formatPrice(product.price)}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-sm text-[#222222]/40 line-through">
                MRP {formatPrice(product.mrp)}
              </span>
            )}
            {discount > 0 && (
              <span className="text-xs font-bold text-[#C85A32] bg-[#C85A32]/10 px-2.5 py-1 rounded uppercase tracking-wider">
                {discount}% OFF (Inclusive of all taxes)
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#222222]/80 leading-relaxed">
            {product.description}
          </p>

          {/* Specs Highlights Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF6F0] p-4 rounded border border-[#E8DFD5]">
            <div><span className="font-bold text-[#C5A059]">Fabric:</span> <span className="text-[#222222]">{product.fabric}</span></div>
            <div><span className="font-bold text-[#C5A059]">Craft:</span> <span className="text-[#222222]">{product.craft || 'Handloom'}</span></div>
            <div><span className="font-bold text-[#C5A059]">Color:</span> <span className="text-[#222222]">{product.color}</span></div>
            <div><span className="font-bold text-[#C5A059]">Occasion:</span> <span className="text-[#222222]">{product.occasion}</span></div>
            {product.sareeLength && (
              <div><span className="font-bold text-[#C5A059]">Length:</span> <span className="text-[#222222]">{product.sareeLength}</span></div>
            )}
            {product.blousePiece && (
              <div className="col-span-2"><span className="font-bold text-[#C5A059]">Blouse Piece:</span> <span className="text-[#222222]">{product.blousePiece}</span></div>
            )}
          </div>

          {/* Size Picker */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#222222]">
                  SELECT SIZE
                </label>
                <span className="text-[11px] text-[#4A0E17] font-semibold cursor-pointer underline">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-semibold rounded border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#4A0E17] text-[#FAF6F0] border-[#4A0E17] shadow'
                        : 'bg-white text-[#222222] border-[#E8DFD5] hover:border-[#4A0E17]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={() => addToCart(product, product.color, selectedSize, quantity)}
                className="flex-1 py-4 bg-[#4A0E17] hover:bg-[#6B1724] text-[#FAF6F0] text-xs font-bold tracking-[0.2em] uppercase rounded shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#C5A059]" /> ADD TO BAG
              </button>
              <button
                onClick={() => {
                  addToCart(product, product.color, selectedSize, quantity);
                  onNavigate('/cart');
                }}
                className="flex-1 py-4 bg-[#C5A059] hover:bg-[#b08d48] text-[#222222] text-xs font-bold tracking-[0.2em] uppercase rounded shadow transition-colors cursor-pointer"
              >
                BUY NOW
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded border transition-colors cursor-pointer ${
                  inWishlist ? 'bg-[#4A0E17] text-white border-[#4A0E17]' : 'bg-white text-[#222222] border-[#E8DFD5] hover:border-[#4A0E17]'
                }`}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Delivery & PIN Checker */}
          <PinCodeChecker />

          {/* Collapsible Accordions */}
          <div className="border-t border-[#E8DFD5] pt-4 space-y-3">
            
            {/* Details */}
            <div className="border border-[#E8DFD5] rounded bg-white overflow-hidden">
              <button
                onClick={() => toggleAccordion('details')}
                className="w-full p-4 text-left font-serif font-bold text-sm text-[#222222] flex items-center justify-between cursor-pointer"
              >
                <span>PRODUCT DETAILS & STORY</span>
                {openAccordions.details ? <ChevronUp className="w-4 h-4 text-[#4A0E17]" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.details && (
                <div className="px-4 pb-4 text-xs text-[#222222]/80 leading-relaxed border-t border-[#FAF6F0] pt-3">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-4 mt-2 space-y-1">
                    <li>Heritage weave directly sourced from artisan weaving clusters.</li>
                    <li>Detailed with pure zari borders and intricate craftsmanship.</li>
                    <li>Includes authentication seal of boutique craftsmanship.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Fabric & Craft */}
            <div className="border border-[#E8DFD5] rounded bg-white overflow-hidden">
              <button
                onClick={() => toggleAccordion('fabric')}
                className="w-full p-4 text-left font-serif font-bold text-sm text-[#222222] flex items-center justify-between cursor-pointer"
              >
                <span>FABRIC & CRAFT SPECIFICATIONS</span>
                {openAccordions.fabric ? <ChevronUp className="w-4 h-4 text-[#4A0E17]" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.fabric && (
                <div className="px-4 pb-4 text-xs text-[#222222]/80 leading-relaxed border-t border-[#FAF6F0] pt-3 space-y-1">
                  <p><strong>Primary Fabric:</strong> {product.fabric}</p>
                  <p><strong>Traditional Craft:</strong> {product.craft || 'Handwoven'}</p>
                  <p><strong>Color Family:</strong> {product.color}</p>
                </div>
              )}
            </div>

            {/* Care Instructions */}
            <div className="border border-[#E8DFD5] rounded bg-white overflow-hidden">
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full p-4 text-left font-serif font-bold text-sm text-[#222222] flex items-center justify-between cursor-pointer"
              >
                <span>CARE INSTRUCTIONS</span>
                {openAccordions.care ? <ChevronUp className="w-4 h-4 text-[#4A0E17]" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.care && (
                <div className="px-4 pb-4 text-xs text-[#222222]/80 leading-relaxed border-t border-[#FAF6F0] pt-3">
                  <p>{product.careInstructions || 'Dry Clean Only. Wrap in white cotton or muslin cloth to protect zari shine.'}</p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="bg-white p-8 rounded-lg border border-[#E8DFD5] space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#E8DFD5]">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#222222]">CLIENT REVIEWS</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-sm text-[#222222]">{product.rating} OUT OF 5</span>
              <span className="text-xs text-[#222222]/40">Based on verified boutique purchases</span>
            </div>
          </div>
        </div>

        {/* Existing Reviews */}
        <div className="space-y-6">
          {productReviews.length === 0 ? (
            <p className="text-xs text-[#222222]/60 italic">No reviews submitted for this specific creation yet. Be the first to share your experience!</p>
          ) : (
            productReviews.map((rev) => (
              <div key={rev.id} className="p-4 bg-[#FAF6F0]/60 rounded border border-[#E8DFD5]/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-[#222222]">{rev.customerName}</span>
                    {rev.verified && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#222222]/40">{rev.date}</span>
                </div>
                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#222222]/80 leading-relaxed">{rev.review}</p>
              </div>
            ))
          )}
        </div>

        {/* Write a Review Form */}
        <form onSubmit={handleReviewSubmit} className="pt-6 border-t border-[#E8DFD5] space-y-4">
          <h4 className="font-serif text-lg font-bold text-[#222222]">SHARE YOUR BOUTIQUE EXPERIENCE</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#222222] mb-1 uppercase">YOUR NAME</label>
              <input
                type="text"
                required
                value={newReviewName}
                onChange={(e) => setNewReviewName(e.target.value)}
                placeholder="e.g. Radhika Verma"
                className="w-full px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#222222] mb-1 uppercase">RATING</label>
              <select
                value={newReviewRating}
                onChange={(e) => setNewReviewRating(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
              >
                <option value={5}>5 Stars - Exceptional</option>
                <option value={4}>4 Stars - Very Good</option>
                <option value={3}>3 Stars - Average</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#222222] mb-1 uppercase">YOUR REVIEW</label>
            <textarea
              required
              rows={3}
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              placeholder="Describe the fabric quality, weave, drape, and overall experience..."
              className="w-full px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#4A0E17] hover:bg-[#6B1724] text-[#FAF6F0] text-xs font-bold tracking-widest uppercase rounded cursor-pointer"
          >
            SUBMIT REVIEW
          </button>
        </form>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="text-center max-w-lg mx-auto mb-8 space-y-1">
            <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">CURATED RECOMMENDATIONS</span>
            <h3 className="font-serif text-3xl font-bold text-[#222222]">YOU MAY ALSO LOVE</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onNavigate={onNavigate}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}
