import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { formatPrice, calculateDiscount } from '../../utils/formatters';

export default function ProductCard({ product, onNavigate, onQuickView }) {
  const { toggleWishlist, isInWishlist, addToCart } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.mrp);

  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images?.[1] || primaryImage;

  return (
    <div 
      className="group relative bg-white border border-[#E8DFD5]/80 rounded-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#4A0E17]/40 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.badge && (
          <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm shadow-sm ${
            product.badge === 'HANDLOOM' ? 'bg-[#163319] text-[#FAF6F0]' :
            product.badge === 'BESTSELLER' ? 'bg-[#C5A059] text-[#222222]' :
            product.badge === 'FESTIVE' ? 'bg-[#4A0E17] text-[#FAF6F0]' :
            product.badge === 'NEW' ? 'bg-[#C85A32] text-white' :
            'bg-[#222222] text-[#FAF6F0]'
          }`}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-[#4A0E17] text-[#FAF6F0] rounded-sm shadow-sm">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 cursor-pointer ${
          inWishlist 
            ? 'bg-[#4A0E17] text-white shadow-md' 
            : 'bg-white/90 text-[#222222] hover:bg-white hover:text-[#4A0E17] shadow-sm backdrop-blur-sm'
        }`}
        title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
      </button>

      {/* Image Container with Dual Image Swap */}
      <div 
        className="relative w-full aspect-[3/4] overflow-hidden bg-[#FAF6F0] cursor-pointer"
        onClick={() => onNavigate(`/product/${product.id}`)}
      >
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Desktop Hover Quick Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2.5 px-3 bg-white hover:bg-[#FAF6F0] text-[#222222] text-xs font-bold tracking-wider uppercase rounded shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#4A0E17]" /> QUICK VIEW
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-2.5 bg-[#4A0E17] hover:bg-[#6B1724] text-[#FAF6F0] rounded shadow transition-colors cursor-pointer"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#222222]/60 uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            {product.craft && <span className="font-semibold text-[#C5A059]">{product.craft}</span>}
          </div>

          <h3 
            onClick={() => onNavigate(`/product/${product.id}`)}
            className="font-serif font-semibold text-base text-[#222222] group-hover:text-[#4A0E17] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1 text-xs text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-[#222222]">{product.rating}</span>
            <span className="text-[#222222]/40 text-[10px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Swatches */}
        <div className="pt-3 border-t border-[#FAF6F0] mt-3 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-base text-[#4A0E17]">
                {formatPrice(product.price)}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-[#222222]/40 line-through">
                  {formatPrice(product.mrp)}
                </span>
              )}
            </div>
          </div>

          {/* Mobile Quick Add */}
          <button
            onClick={() => addToCart(product)}
            className="sm:hidden p-2 text-[#4A0E17] bg-[#FAF6F0] rounded-full border border-[#4A0E17]/20"
            title="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
