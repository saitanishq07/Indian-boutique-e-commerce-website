import React from 'react';
import { MapPin, Sparkles, Award, Heart, Shield } from 'lucide-react';

export default function About({ onNavigate }) {
  const timeline = [
    { year: '2021', title: 'The Beginning', desc: 'AAVANI was conceived in Hyderabad as a boutique design studio working directly with master weavers in Varanasi and Kanchipuram.' },
    { year: '2023', title: 'Flagship Jubilee Hills Boutique', desc: 'Opened our first physical luxury boutique in Jubilee Hills, offering personalized bridal trousseau styling.' },
    { year: '2025', title: 'Pan-India Online Store', desc: 'Expanded digital access across India and overseas, bringing authentic craft directly to client homes.' },
    { year: '2026', title: 'AAVANI Digital Ecosystem', desc: 'Launched Demo #6 in TanovaX portfolio — a complete e-commerce experience integrated with full business Admin management.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">OUR HERITAGE & PHILOSOPHY</span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#222222]">
          ROOTED IN INDIA. <br />
          <span className="italic font-normal text-[#4A0E17]">DESIGNED FOR TODAY.</span>
        </h1>
        <p className="text-sm text-[#222222]/80 leading-relaxed">
          AAVANI began as a Hyderabad boutique bringing centuries of Indian textile traditions into contemporary, versatile wardrobes.
        </p>
      </div>

      {/* Hero Image */}
      <div className="w-full aspect-21/9 rounded-lg overflow-hidden border border-[#E8DFD5] relative shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=80"
          alt="AAVANI Weaving Heritage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8 text-white">
          <p className="font-serif text-xl sm:text-2xl italic max-w-lg">
            "Every thread woven in our looms carries the memory of an artisan and the celebration of an Indian woman."
          </p>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded border border-[#E8DFD5] space-y-3">
          <Sparkles className="w-6 h-6 text-[#C5A059]" />
          <h3 className="font-serif text-xl font-bold text-[#222222]">Authentic Craftsmanship</h3>
          <p className="text-xs text-[#222222]/70 leading-relaxed">
            We partner directly with GI-certified handloom artisan clusters in Varanasi, Kanchipuram, Kutch, and Lucknow.
          </p>
        </div>

        <div className="bg-white p-6 rounded border border-[#E8DFD5] space-y-3">
          <Award className="w-6 h-6 text-[#4A0E17]" />
          <h3 className="font-serif text-xl font-bold text-[#222222]">Thoughtful Silhouettes</h3>
          <p className="text-xs text-[#222222]/70 leading-relaxed">
            Respecting heritage drapes while engineering lightweight, breathable cuts for modern festivities and workdays.
          </p>
        </div>

        <div className="bg-white p-6 rounded border border-[#E8DFD5] space-y-3">
          <MapPin className="w-6 h-6 text-[#C5A059]" />
          <h3 className="font-serif text-xl font-bold text-[#222222]">Hyderabad Identity</h3>
          <p className="text-xs text-[#222222]/70 leading-relaxed">
            Headquartered in Jubilee Hills, Hyderabad, drawing inspiration from Deccan architecture, pearls, and royal hospitality.
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-[#FAF6F0] p-8 sm:p-12 rounded-lg border border-[#E8DFD5] space-y-8">
        <div className="text-center max-w-md mx-auto">
          <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">OUR JOURNEY</span>
          <h2 className="font-serif text-3xl font-bold text-[#222222]">THE AAVANI TIMELINE</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {timeline.map((item) => (
            <div key={item.year} className="bg-white p-6 rounded border border-[#E8DFD5] space-y-2 relative">
              <span className="font-serif text-3xl font-bold text-[#4A0E17] block">{item.year}</span>
              <h4 className="font-serif font-bold text-base text-[#222222]">{item.title}</h4>
              <p className="text-xs text-[#222222]/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="font-serif text-2xl font-bold text-[#222222]">EXPLORE OUR LATEST CREATIONS</h3>
        <button
          onClick={() => onNavigate('/shop')}
          className="px-8 py-3.5 bg-[#4A0E17] text-white text-xs font-bold tracking-widest uppercase rounded shadow cursor-pointer"
        >
          SHOP THE CATALOGUE
        </button>
      </div>

    </div>
  );
}
