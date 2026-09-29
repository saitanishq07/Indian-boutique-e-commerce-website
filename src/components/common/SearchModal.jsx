import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export default function SearchModal({ onNavigate }) {
  const { isSearchOpen, setIsSearchOpen, products } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Banarasi saree',
    'Wedding lehenga',
    'Green kurti',
    'Chikankari',
    'Temple jewellery',
    'Handloom saree'
  ];

  const categoryTags = ['Sarees', 'Kurtis', 'Lehengas', 'Salwar Sets', 'Jewellery', 'Dupattas'];

  const filteredProducts = query.trim() === '' ? [] : products.filter(p => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.craft && p.craft.toLowerCase().includes(q)) ||
      (p.fabric && p.fabric.toLowerCase().includes(q)) ||
      (p.color && p.color.toLowerCase().includes(q))
    );
  });

  const handleProductClick = (productId) => {
    setIsSearchOpen(false);
    onNavigate(`/product/${productId}`);
  };

  const handleTagClick = (tag) => {
    setQuery(tag);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#222222]/80 backdrop-blur-md flex justify-center pt-12 px-4 sm:px-6 transition-all animate-fade-in">
      <div className="w-full max-w-4xl bg-[#FAF6F0] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Search Input Bar */}
        <div className="p-6 border-b border-[#E8DFD5] flex items-center gap-4 bg-white">
          <Search className="w-6 h-6 text-[#4A0E17]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Banarasi sarees, Chikankari kurtas, Lehengas..."
            className="w-full font-serif text-xl sm:text-2xl text-[#222222] placeholder-[#222222]/40 bg-transparent focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-[#222222]/50 hover:text-[#222222]">
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-[#4A0E17] hover:bg-[#FAF6F0] rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          
          {/* Default State: Popular Suggestions */}
          {query.trim() === '' && (
            <>
              <div>
                <h4 className="text-xs font-semibold tracking-[0.2em] text-[#C5A059] uppercase mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> POPULAR SEARCHES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => handleTagClick(term)}
                      className="px-4 py-2 bg-white border border-[#E8DFD5] hover:border-[#4A0E17] hover:text-[#4A0E17] text-xs font-medium tracking-wider text-[#222222] rounded-full transition-all cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold tracking-[0.2em] text-[#222222]/60 uppercase mb-3">
                  EXPLORE CATEGORIES
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categoryTags.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setIsSearchOpen(false);
                        onNavigate(`/shop?category=${cat}`);
                      }}
                      className="p-3 bg-white border border-[#E8DFD5] hover:bg-[#4A0E17] hover:text-[#FAF6F0] text-left text-sm font-serif tracking-wider text-[#222222] rounded transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span>{cat}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Dynamic Search Results */}
          {query.trim() !== '' && (
            <div>
              <p className="text-xs font-medium tracking-wider text-[#222222]/60 uppercase mb-4">
                FOUND {filteredProducts.length} RESULTS FOR "{query}"
              </p>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-serif text-lg text-[#222222]/70">No creations matching your search.</p>
                  <p className="text-xs text-[#222222]/50 mt-1">Try searching for "Silk", "Saree", "Banarasi", or "Chikankari".</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="flex items-center gap-3 p-3 bg-white border border-[#E8DFD5] rounded hover:border-[#4A0E17] transition-all cursor-pointer group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
                          {product.category}
                        </span>
                        <h5 className="font-serif font-semibold text-sm text-[#222222] group-hover:text-[#4A0E17] truncate">
                          {product.name}
                        </h5>
                        <p className="text-xs font-bold text-[#4A0E17] mt-1">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
