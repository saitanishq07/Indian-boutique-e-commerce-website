import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Share2, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#222222] text-[#FAF6F0] pt-16 pb-12 border-t-4 border-[#4A0E17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#FAF6F0]/10">
          
          {/* Brand Info & Hyderabad Location */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => onNavigate('/')} className="text-left cursor-pointer">
              <span className="font-serif text-3xl font-bold tracking-[0.2em] text-[#FAF6F0]">AAVANI</span>
              <p className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-semibold mt-1">
                TRADITION, WOVEN FOR TODAY.
              </p>
            </button>
            <p className="text-xs text-[#FAF6F0]/70 leading-relaxed max-w-sm">
              Rooted in the royal culture of Hyderabad and inspired by India’s rich textile heritage. Handcrafted Banarasi silks, delicate Chikankari, and timeless heritage jewelry.
            </p>
            
            <div className="space-y-2 pt-2 text-xs text-[#FAF6F0]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>+91 98490 12345 / 040-2355-8899</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>concierge@aavaniboutique.com</span>
              </div>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h4 className="font-serif text-base tracking-wider text-[#C5A059] mb-4 uppercase">COLLECTIONS</h4>
            <ul className="space-y-2.5 text-xs text-[#FAF6F0]/70">
              <li><button onClick={() => onNavigate('/shop?category=Sarees')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Banarasi & Silk Sarees</button></li>
              <li><button onClick={() => onNavigate('/shop?category=Kurtis')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Lucknowi Chikankari</button></li>
              <li><button onClick={() => onNavigate('/shop?category=Lehengas')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Wedding & Bridal Lehengas</button></li>
              <li><button onClick={() => onNavigate('/shop?category=Salwar Sets')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Festive Anarkali Suits</button></li>
              <li><button onClick={() => onNavigate('/shop?category=Jewellery')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Temple & Pearl Jewellery</button></li>
              <li><button onClick={() => onNavigate('/shop?occasion=Festive')} className="hover:text-[#C5A059] transition-colors cursor-pointer">The Festive Edit 2026</button></li>
            </ul>
          </div>

          {/* Boutique Services */}
          <div>
            <h4 className="font-serif text-base tracking-wider text-[#C5A059] mb-4 uppercase">CLIENT CARE</h4>
            <ul className="space-y-2.5 text-xs text-[#FAF6F0]/70">
              <li><button onClick={() => onNavigate('/track-order')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Track Your Order</button></li>
              <li><button onClick={() => onNavigate('/account')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Customer Account</button></li>
              <li><button onClick={() => onNavigate('/about')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Our Heritage Story</button></li>
              <li><button onClick={() => onNavigate('/lookbook')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Lookbook 2026</button></li>
              <li><button onClick={() => onNavigate('/journal')} className="hover:text-[#C5A059] transition-colors cursor-pointer">AAVANI Journal</button></li>
              <li><button onClick={() => onNavigate('/admin')} className="hover:text-[#C5A059] transition-colors flex items-center gap-1 cursor-pointer text-[#C5A059] font-medium"><ShieldCheck className="w-3.5 h-3.5" /> Admin Login Portal</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-base tracking-wider text-[#C5A059] mb-4 uppercase">JOIN THE CLUB</h4>
            <p className="text-xs text-[#FAF6F0]/70 mb-3 leading-relaxed">
              Subscribe for private festive previews, bespoke craft stories, and VIP invitations.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to AAVANI updates!'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-[#FAF6F0]/5 border border-[#FAF6F0]/20 text-xs text-[#FAF6F0] placeholder-[#FAF6F0]/40 rounded focus:outline-none focus:border-[#C5A059]"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#C5A059] hover:bg-[#b08d48] text-[#222222] text-xs font-bold tracking-widest uppercase rounded transition-colors cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Attribution & Payment Logos */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF6F0]/60">
          <p>© 2026 AAVANI Boutique. All Rights Reserved. Demo storefront.</p>
          
          <div className="flex items-center space-x-6 text-[11px]">
            <span>UPI Instant Payment</span>
            <span>·</span>
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>Cards accepted</span>
          </div>

          <p className="text-xs font-medium text-[#C5A059] tracking-wider">
            Designed & Developed by <span className="text-[#FAF6F0] font-bold">TanovaX</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
