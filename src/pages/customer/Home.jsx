import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ProductCard from '../../components/customer/ProductCard';
import QuickViewModal from '../../components/customer/QuickViewModal';
import { REGIONAL_CRAFTS } from '../../data/regionalCrafts';
import { ArrowRight, Sparkles, ChevronRight, Heart, Crown, Award, MapPin } from 'lucide-react';

export default function Home({ onNavigate }) {
  const { products, categories } = useApp();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const featuredProducts = products.slice(0, 8);

  const occasionCards = [
    { title: 'Wedding', desc: 'Banarasi silk & Zardozi brocades', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80', query: 'Wedding' },
    { title: 'Haldi', desc: 'Marigold organza & sunshine silks', image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80', query: 'Haldi' },
    { title: 'Mehendi', desc: 'Intricate Chikankari & emerald greens', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80', query: 'Mehendi' },
    { title: 'Diwali', desc: 'Rich jewel tones & temple gold', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', query: 'Festive' },
    { title: 'Navratri', desc: 'Vibrant Bandhani & mirrorwork drapes', image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80', query: 'Festive' },
    { title: 'Festive Dinner', desc: 'Understated Chikankari & linen co-ords', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80', query: 'Party' }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Editorial Luxury Hero Section */}
      <section className="relative bg-gradient-to-r from-[#350A10] via-[#4A0E17] to-[#222222] text-[#FAF6F0] overflow-hidden py-16 sm:py-24 border-b border-[#C5A059]/30">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF6F0]/10 backdrop-blur-md border border-[#C5A059]/40 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FAF6F0]">HYDERABAD HERITAGE BOUTIQUE</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06]">
              TRADITION, <br />
              <span className="italic text-[#E7D5B1] font-normal">WOVEN FOR TODAY.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#FAF6F0]/85 leading-relaxed font-normal max-w-lg">
              Discover thoughtfully crafted Indian fashion, handwoven Banarasi silks, Lucknowi Chikankari, and regal Hyderabad pearl jewelry for every story and celebration.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('/shop?category=new')}
                className="px-8 py-4 bg-[#C5A059] hover:bg-[#b08d48] text-[#222222] text-xs font-bold tracking-[0.2em] uppercase rounded shadow-xl transition-all flex items-center gap-3 cursor-pointer group"
              >
                <span>SHOP NEW ARRIVALS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('/shop?occasion=Festive')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-[#FAF6F0] border border-[#FAF6F0]/30 text-xs font-bold tracking-[0.2em] uppercase rounded backdrop-blur-md transition-all cursor-pointer"
              >
                EXPLORE FESTIVE
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-8 text-xs text-[#FAF6F0]/70">
              <div>
                <span className="block font-serif text-lg font-bold text-[#C5A059]">100% Handloom</span>
                <span className="text-[10px] text-[#FAF6F0]/60">Authentic Indian Weaves</span>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div>
                <span className="block font-serif text-lg font-bold text-[#C5A059]">Free Express Shipping</span>
                <span className="text-[10px] text-[#FAF6F0]/60">Orders Above ₹2,999</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Res Editorial Model Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Gold Frame Accent */}
              <div className="absolute -inset-3 rounded-2xl border border-[#C5A059]/40 transform rotate-1 hidden sm:block pointer-events-none" />

              {/* Main Model Image Card */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[#C5A059]/30 bg-[#222222]">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"
                  alt="AAVANI Boutique Indian Fashion Editorial"
                  className="w-full aspect-[4/5] object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle Image Bottom Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div className="bg-black/60 backdrop-blur-md p-3.5 rounded-lg border border-[#C5A059]/30 w-full flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest block">HERITAGE WEAVE</span>
                      <p className="font-serif font-bold text-sm text-white">Kashi Banarasi Silk Saree</p>
                    </div>
                    <button
                      onClick={() => onNavigate('/product/prod-1')}
                      className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#b08d48] text-[#222222] text-[10px] font-bold uppercase rounded tracking-wider cursor-pointer"
                    >
                      VIEW
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Badge Accent */}
              <div className="absolute -bottom-4 -left-4 bg-[#4A0E17] text-[#FAF6F0] border border-[#C5A059] p-3 rounded-lg shadow-xl hidden sm:flex items-center gap-2 text-xs">
                <Crown className="w-4 h-4 text-[#C5A059]" />
                <span className="font-serif font-bold tracking-wide">Handcrafted in Hyderabad</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Featured Categories (Editorial Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">CURATED CATEGORIES</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">ESSENTIAL BOUTIQUE EDITS</h2>
          <p className="text-xs text-[#222222]/60">Hand-selected drapes and silhouettes designed for modern elegance.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(`/shop?category=${cat.name}`)}
              className="group relative h-96 rounded-md overflow-hidden cursor-pointer shadow-md border border-[#E8DFD5]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-6 text-white flex flex-col justify-end">
                <span className="text-[10px] font-semibold tracking-widest text-[#C5A059] uppercase">COLLECTION</span>
                <h3 className="font-serif text-2xl font-bold tracking-wide mt-1 group-hover:text-[#C5A059] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/80 mt-1 line-clamp-1">{cat.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#C5A059] opacity-90 group-hover:translate-x-1 transition-all">
                  <span>DISCOVER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Festive Campaign Banner ("THE FESTIVE EDIT") */}
      <section className="bg-[#4A0E17] text-[#FAF6F0] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-[0.3em] text-[#C5A059] uppercase">FESTIVE CAMPAIGN 2026</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              THE FESTIVE EDIT <br />
              <span className="italic font-normal text-[#E7D5B1]">Celebration begins with what you wear.</span>
            </h2>
            <p className="text-sm text-[#FAF6F0]/80 leading-relaxed font-light">
              From intimate family pujas to grand sangeet evenings, our festive edit celebrates pure silk textiles, rich zardozi work, and radiant color stories.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/shop?occasion=Festive')}
                className="px-8 py-4 bg-[#C5A059] hover:bg-[#b08d48] text-[#222222] text-xs font-bold tracking-[0.2em] uppercase rounded shadow transition-colors cursor-pointer"
              >
                SHOP FESTIVE COLLECTION
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
              alt="Festive Edit Saree"
              className="w-full h-80 object-cover rounded-lg shadow-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80"
              alt="Festive Edit Anarkali"
              className="w-full h-80 object-cover rounded-lg shadow-xl mt-8"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals / Just In (8 Products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 pb-4 border-b border-[#E8DFD5]">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">FRESH FROM BOUTIQUE</span>
            <h2 className="font-serif text-3xl font-bold text-[#222222] mt-1">JUST IN</h2>
          </div>
          <button
            onClick={() => onNavigate('/shop')}
            className="text-xs font-bold tracking-widest text-[#4A0E17] hover:text-[#6B1724] uppercase flex items-center gap-1 mt-3 sm:mt-0 cursor-pointer"
          >
            <span>VIEW ALL 128 CREATIONS</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onNavigate={onNavigate}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* Shop By Indian Occasion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-lg mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">INDIAN OCCASION SHOPPING</span>
          <h2 className="font-serif text-3xl font-bold text-[#222222]">SHOP BY OCCASION</h2>
          <p className="text-xs text-[#222222]/60">Tailored outfits for every sacred ritual and celebration.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {occasionCards.map((occ) => (
            <div
              key={occ.title}
              onClick={() => onNavigate(`/shop?occasion=${occ.query}`)}
              className="group text-center cursor-pointer"
            >
              <div className="w-full aspect-square rounded-full overflow-hidden mb-3 border-2 border-[#E8DFD5] group-hover:border-[#4A0E17] transition-all shadow-sm">
                <img
                  src={occ.image}
                  alt={occ.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h4 className="font-serif font-bold text-base text-[#222222] group-hover:text-[#4A0E17] transition-colors">
                {occ.title}
              </h4>
              <p className="text-[10px] text-[#222222]/60 line-clamp-1 mt-0.5">{occ.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Crafted Across India Regional Heritage */}
      <section className="bg-[#FAF6F0] border-y border-[#E8DFD5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">ARTISAN WEAVING CLUSTERS</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">CRAFTED ACROSS INDIA</h2>
            <p className="text-xs text-[#222222]/60">Honoring centuries of textile heritage and handloom traditions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REGIONAL_CRAFTS.slice(0, 4).map((craft) => (
              <div
                key={craft.id}
                className="bg-white p-6 rounded border border-[#E8DFD5] shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#C5A059] uppercase tracking-wider mb-2">
                    <span>{craft.region}</span>
                    <span className="text-[#222222]/40">{craft.originYear}</span>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#222222]">{craft.name}</h4>
                  <p className="text-xs text-[#222222]/70 leading-relaxed mt-2">{craft.description}</p>
                </div>
                <button
                  onClick={() => onNavigate(`/shop?craft=${craft.name}`)}
                  className="text-xs font-bold tracking-widest text-[#4A0E17] hover:underline uppercase pt-3 block cursor-pointer"
                >
                  EXPLORE {craft.name.toUpperCase()} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From Hyderabad, With Love */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#222222] text-[#FAF6F0] rounded-lg p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] uppercase tracking-widest">
              <MapPin className="w-4 h-4" /> HYDERABAD BOUTIQUE FLAGSHIP
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">FROM HYDERABAD, WITH LOVE.</h2>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/80 leading-relaxed font-light">
              "Rooted in the royal culture of Hyderabad and inspired by India’s diverse textile traditions. Visit our flagship boutique in Jubilee Hills for bespoke bridal styling consultations."
            </p>
          </div>
          <button
            onClick={() => onNavigate('/about')}
            className="px-8 py-4 bg-[#4A0E17] hover:bg-[#6B1724] text-[#FAF6F0] text-xs font-bold tracking-[0.2em] uppercase rounded shadow transition-colors cursor-pointer shrink-0"
          >
            OUR HERITAGE STORY
          </button>
        </div>
      </section>

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
