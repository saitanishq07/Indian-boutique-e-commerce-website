import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShoppingBag, Heart, Star, Check } from 'lucide-react';
import { formatPrice, calculateDiscount } from '../../utils/formatters';

export default function QuickViewModal({ product, onClose, onNavigate }) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'One Size');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.mrp);

  return (
    <div className="fixed inset-0 z-50 bg-[#222222]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF6F0] rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden relative flex flex-col md:flex-row my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#222222]/60 hover:text-[#222222] bg-white/80 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col items-center justify-between bg-white border-r border-[#E8DFD5]">
          <div className="w-full aspect-[3/4] overflow-hidden rounded mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-16 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === idx ? 'border-[#4A0E17]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#C5A059] font-bold uppercase tracking-widest mb-1">
              <span>{product.category}</span>
              {product.craft && <span>{product.craft} WEAVE</span>}
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#222222] mb-2">{product.name}</h2>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-sm text-[#222222] ml-1">{product.rating}</span>
              </div>
              <span className="text-xs text-[#222222]/40">({product.reviewCount} customer reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-bold text-2xl text-[#4A0E17]">{formatPrice(product.price)}</span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-sm text-[#222222]/40 line-through">{formatPrice(product.mrp)}</span>
              )}
              {discount > 0 && (
                <span className="text-xs font-bold text-[#C85A32] bg-[#C85A32]/10 px-2 py-0.5 rounded">
                  SAVE {discount}%
                </span>
              )}
            </div>

            <p className="text-xs text-[#222222]/80 leading-relaxed line-clamp-3 mb-6">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#222222] mb-2">
                  SELECT SIZE
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#4A0E17] text-[#FAF6F0] border-[#4A0E17]'
                          : 'bg-white text-[#222222] border-[#E8DFD5] hover:border-[#4A0E17]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#E8DFD5]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  addToCart(product, product.color, selectedSize, quantity);
                  onClose();
                }}
                className="flex-1 py-3 bg-[#4A0E17] hover:bg-[#6B1724] text-[#FAF6F0] text-xs font-bold tracking-widest uppercase rounded shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" /> ADD TO BAG
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded border transition-colors cursor-pointer ${
                  inWishlist ? 'bg-[#4A0E17] text-white border-[#4A0E17]' : 'bg-white text-[#222222] border-[#E8DFD5] hover:border-[#4A0E17]'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                onNavigate(`/product/${product.id}`);
              }}
              className="w-full text-center text-xs font-semibold tracking-wider text-[#4A0E17] hover:underline pt-2 block cursor-pointer"
            >
              VIEW COMPLETE PRODUCT DETAILS & SPECIFICATIONS →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
