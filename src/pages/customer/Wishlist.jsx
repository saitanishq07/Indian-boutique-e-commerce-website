import React from 'react';
import { useApp } from '../../context/AppContext';
import ProductCard from '../../components/customer/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export default function Wishlist({ onNavigate }) {
  const { wishlist, products } = useApp();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-[#FAF6F0] rounded-full border border-[#E8DFD5] flex items-center justify-center mx-auto">
          <Heart className="w-10 h-10 text-[#4A0E17]" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-[#222222]">YOUR WISHLIST IS WAITING</h2>
          <p className="text-xs text-[#222222]/60">Save your favorite silk sarees, Anarkalis, and temple jewelry creations.</p>
        </div>
        <button
          onClick={() => onNavigate('/shop')}
          className="px-8 py-3.5 bg-[#4A0E17] hover:bg-[#6B1724] text-[#FAF6F0] text-xs font-bold tracking-[0.2em] uppercase rounded shadow cursor-pointer"
        >
          EXPLORE COLLECTION
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-[#E8DFD5] pb-6">
        <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">SAVED FAVOURITES</span>
        <h1 className="font-serif text-3xl font-bold text-[#222222]">MY WISHLIST ({wishlistProducts.length})</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onNavigate={onNavigate}
            onQuickView={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
