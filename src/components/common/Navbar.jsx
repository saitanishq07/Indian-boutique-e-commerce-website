import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ShoppingBag, Heart, User, Menu, X, Shield } from 'lucide-react';

export default function Navbar({ onNavigate, currentPath }) {
  const { cart, wishlist, setIsSearchOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const navLinks = [
    { label: 'NEW ARRIVALS', path: '/shop?category=new' },
    { label: 'SAREES', path: '/shop?category=Sarees' },
    { label: 'KURTIS', path: '/shop?category=Kurtis' },
    { label: 'LEHENGAS', path: '/shop?category=Lehengas' },
    { label: 'SALWAR SETS', path: '/shop?category=Salwar Sets' },
    { label: 'JEWELLERY', path: '/shop?category=Jewellery' },
    { label: 'FESTIVE', path: '/shop?occasion=Festive' },
    { label: 'LOOKBOOK', path: '/lookbook' },
    { label: 'JOURNAL', path: '/journal' }
  ];

  const handleLinkClick = (path) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-all">
      {/* Upper Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu icon */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#222222] hover:text-[#4A0E17]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo & Tagline */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <button 
              onClick={() => handleLinkClick('/')} 
              className="text-left group cursor-pointer"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold tracking-[0.25em] text-[#4A0E17] group-hover:text-[#6B1724] transition-colors">
                  AAVANI
                </span>
                <span className="hidden sm:inline-block text-[10px] font-sans tracking-[0.2em] text-[#C5A059] uppercase font-semibold border-l border-[#C5A059]/40 pl-2">
                  HYDERABAD
                </span>
              </div>
              <p className="text-[10px] tracking-[0.25em] text-[#222222]/70 uppercase font-medium mt-0.5">
                Tradition, Woven for Today.
              </p>
            </button>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#222222] hover:text-[#4A0E17] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Search collection"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline text-xs font-medium uppercase tracking-wider">Search</span>
            </button>

            {/* Account */}
            <button
              onClick={() => handleLinkClick('/account')}
              className="p-2 text-[#222222] hover:text-[#4A0E17] transition-colors cursor-pointer"
              title="Customer Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleLinkClick('/wishlist')}
              className="p-2 text-[#222222] hover:text-[#4A0E17] transition-colors relative cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A059] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => handleLinkClick('/cart')}
              className="p-2 text-[#222222] hover:text-[#4A0E17] transition-colors relative cursor-pointer"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#4A0E17] text-[#FAF6F0] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Quick Switch */}
            <button
              onClick={() => handleLinkClick('/admin')}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#4A0E17] bg-[#4A0E17]/10 hover:bg-[#4A0E17] hover:text-white rounded transition-all cursor-pointer border border-[#4A0E17]/20"
              title="Access Admin Dashboard"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Links (Desktop) */}
      <nav className="hidden lg:block border-t border-[#E8DFD5]/60 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-8 py-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.path)}
              className={`text-xs font-semibold tracking-[0.15em] transition-all uppercase hover:text-[#4A0E17] relative py-1 cursor-pointer ${
                currentPath === link.path ? 'text-[#4A0E17] font-bold border-b-2 border-[#4A0E17]' : 'text-[#222222]/80'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick('/shop?sale=true')}
            className="text-xs font-bold tracking-[0.15em] text-[#C85A32] hover:text-[#4A0E17] transition-all uppercase py-1 cursor-pointer"
          >
            SALE
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#222222]/50 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-[#FAF6F0] h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DFD5]">
                <span className="font-serif text-2xl font-bold tracking-widest text-[#4A0E17]">AAVANI</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[#222222]">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.path)}
                    className="block w-full text-left font-serif text-lg tracking-wider text-[#222222] hover:text-[#4A0E17] py-2 border-b border-[#E8DFD5]/40"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => handleLinkClick('/about')}
                  className="block w-full text-left font-serif text-lg tracking-wider text-[#222222] hover:text-[#4A0E17] py-2"
                >
                  ABOUT OUR BOUTIQUE
                </button>
                <button
                  onClick={() => handleLinkClick('/track-order')}
                  className="block w-full text-left font-serif text-lg tracking-wider text-[#222222] hover:text-[#4A0E17] py-2"
                >
                  TRACK ORDER
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8DFD5] space-y-3">
              <button
                onClick={() => handleLinkClick('/admin')}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#4A0E17] text-[#FAF6F0] text-xs font-semibold tracking-widest uppercase rounded"
              >
                <Shield className="w-4 h-4 text-[#C5A059]" />
                <span>OPEN ADMIN DASHBOARD</span>
              </button>
              <p className="text-[10px] text-center text-[#222222]/60 uppercase tracking-widest">
                Jubilee Hills, Hyderabad · India
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
