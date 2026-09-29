import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';
import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Lookbook({ onNavigate }) {
  const { products } = useApp();
  const [activeHotspot, setActiveHotspot] = useState(null);

  const lookbooks = [
    {
      id: 'look-1',
      title: 'THE FESTIVE EDIT 2026',
      subtitle: 'Brocade heritage & gold threadwork woven for grand celebrations.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80',
      hotspots: [
        { top: '35%', left: '45%', productId: 'prod-1' },
        { top: '65%', left: '55%', productId: 'prod-8' }
      ]
    },
    {
      id: 'look-2',
      title: 'THE WEDDING & BRIDAL TROUSSEAU',
      subtitle: 'Opulent crimson velvets and handcrafted Zardozi lehengas.',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=80',
      hotspots: [
        { top: '40%', left: '50%', productId: 'prod-5' },
        { top: '75%', left: '60%', productId: 'prod-9' }
      ]
    },
    {
      id: 'look-3',
      title: 'EVERYDAY ELEGANCE & CHIKANKARI',
      subtitle: 'Featherlight Lucknowi shadow embroidery and crisp cotton straight kurtas.',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80',
      hotspots: [
        { top: '40%', left: '50%', productId: 'prod-4' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">EDITORIAL FASHION STORIES</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#222222]">AAVANI LOOKBOOK</h1>
        <p className="text-xs text-[#222222]/60">Click product hotspots on our fashion edits to discover and shop exact pieces.</p>
      </div>

      <div className="space-y-16">
        {lookbooks.map(look => (
          <div key={look.id} className="bg-white rounded-lg border border-[#E8DFD5] overflow-hidden shadow-xl">
            <div className="p-6 sm:p-8 bg-[#FAF6F0] border-b border-[#E8DFD5] flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">SEASONAL EDIT</span>
                <h2 className="font-serif text-2xl font-bold text-[#222222]">{look.title}</h2>
                <p className="text-xs text-[#222222]/70 mt-0.5">{look.subtitle}</p>
              </div>
              <span className="text-xs font-bold text-[#4A0E17] uppercase tracking-widest hidden sm:inline">
                INTERACTIVE HOTSPOTS AVAILABLE
              </span>
            </div>

            {/* Lookbook Image Container with Interactive Hotspots */}
            <div className="relative w-full aspect-16/9 bg-[#222222]">
              <img
                src={look.image}
                alt={look.title}
                className="w-full h-full object-cover object-top opacity-90"
              />

              {/* Hotspot Pins */}
              {look.hotspots.map((spot, idx) => {
                const prod = products.find(p => p.id === spot.productId);
                if (!prod) return null;
                const isSelected = activeHotspot === `${look.id}-${idx}`;

                return (
                  <div
                    key={idx}
                    className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: spot.top, left: spot.left }}
                  >
                    <button
                      onClick={() => setActiveHotspot(isSelected ? null : `${look.id}-${idx}`)}
                      className="relative w-8 h-8 rounded-full bg-[#4A0E17] text-[#FAF6F0] border-2 border-[#C5A059] flex items-center justify-center font-bold text-xs shadow-2xl animate-pulse cursor-pointer"
                    >
                      +
                    </button>

                    {/* Popover Hotspot Card */}
                    {isSelected && (
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 bg-white p-3 rounded-lg shadow-2xl border border-[#C5A059] z-30 text-left space-y-2 animate-fade-in">
                        <img src={prod.images[0]} alt={prod.name} className="w-full h-28 object-cover rounded bg-[#FAF6F0]" />
                        <div>
                          <span className="text-[10px] font-bold text-[#C5A059] uppercase">{prod.category}</span>
                          <h4 className="font-serif font-bold text-sm text-[#222222] truncate">{prod.name}</h4>
                          <p className="font-bold text-xs text-[#4A0E17] mt-0.5">{formatPrice(prod.price)}</p>
                        </div>
                        <button
                          onClick={() => onNavigate(`/product/${prod.id}`)}
                          className="w-full py-1.5 bg-[#4A0E17] text-white text-[10px] font-bold uppercase rounded flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>SHOP ITEM</span>
                          <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
