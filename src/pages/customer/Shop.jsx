import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import ProductCard from '../../components/customer/ProductCard';
import QuickViewModal from '../../components/customer/QuickViewModal';
import { SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';

export default function Shop({ onNavigate, initialCategory = '', initialOccasion = '', initialCraft = '' }) {
  const { products } = useApp();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);
  const [selectedCraft, setSelectedCraft] = useState(initialCraft);
  const [selectedFabric, setSelectedFabric] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter options
  const categoriesList = ['Sarees', 'Kurtis', 'Lehengas', 'Salwar Sets', 'Dupattas', 'Jewellery', 'Co-ord Sets', 'Handbags'];
  const fabricsList = ['Silk', 'Cotton', 'Chanderi', 'Organza', 'Linen', 'Georgette', 'Chiffon', 'Velvet'];
  const craftsList = ['Banarasi', 'Kalamkari', 'Ikat', 'Chikankari', 'Bandhani', 'Ajrakh', 'Handloom'];
  const occasionsList = ['Wedding', 'Festive', 'Party', 'Office', 'Casual'];
  const colorsList = ['Wine', 'Pink', 'Ivory', 'Green', 'Maroon', 'Yellow', 'Blue', 'Gold', 'Terracotta', 'Red'];
  const sizesList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

  // Dynamic Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory && p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      if (selectedOccasion && p.occasion.toLowerCase() !== selectedOccasion.toLowerCase()) return false;
      if (selectedCraft && (!p.craft || p.craft.toLowerCase() !== selectedCraft.toLowerCase())) return false;
      if (selectedFabric && (!p.fabric || p.fabric.toLowerCase() !== selectedFabric.toLowerCase())) return false;
      if (selectedColor && (!p.color || p.color.toLowerCase() !== selectedColor.toLowerCase())) return false;
      if (selectedSize && (!p.sizes || !p.sizes.includes(selectedSize))) return false;

      if (priceRange === 'under2000' && p.price >= 2000) return false;
      if (priceRange === '2000-5000' && (p.price < 2000 || p.price > 5000)) return false;
      if (priceRange === '5000-10000' && (p.price < 5000 || p.price > 10000)) return false;
      if (priceRange === '10000-20000' && (p.price < 10000 || p.price > 20000)) return false;
      if (priceRange === '20000plus' && p.price < 20000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCategory, selectedOccasion, selectedCraft, selectedFabric, selectedColor, selectedSize, priceRange, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedOccasion('');
    setSelectedCraft('');
    setSelectedFabric('');
    setSelectedColor('');
    setSelectedSize('');
    setPriceRange('all');
  };

  const hasActiveFilters = selectedCategory || selectedOccasion || selectedCraft || selectedFabric || selectedColor || selectedSize || priceRange !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Shop Header */}
      <div className="border-b border-[#E8DFD5] pb-8 mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">CURATED BOUTIQUE COLLECTION</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#222222] mt-1">
            {selectedCategory ? selectedCategory.toUpperCase() : selectedOccasion ? `${selectedOccasion.toUpperCase()} COLLECTION` : 'SHOP ALL'}
          </h1>
          <p className="text-xs text-[#222222]/60 mt-1">
            Showing {filteredProducts.length} authentic handcrafted creations.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2 bg-white border border-[#E8DFD5] text-xs font-semibold tracking-wider text-[#222222] rounded flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#4A0E17]" />
            <span>FILTERS {hasActiveFilters && '(ACTIVE)'}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#222222]/60 uppercase font-semibold hidden sm:inline">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white border border-[#E8DFD5] text-xs font-semibold text-[#222222] rounded focus:outline-none focus:border-[#4A0E17] cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="flex gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6 sticky top-28 bg-white p-5 rounded border border-[#E8DFD5]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5]">
            <span className="font-serif font-bold text-lg text-[#222222]">FILTERS</span>
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="text-[11px] text-[#4A0E17] font-bold hover:underline cursor-pointer">
                CLEAR ALL
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">CATEGORY</h4>
            <div className="space-y-1.5 text-xs text-[#222222]/80">
              <button
                onClick={() => setSelectedCategory('')}
                className={`block w-full text-left py-1 ${!selectedCategory ? 'font-bold text-[#4A0E17]' : 'hover:text-[#4A0E17]'}`}
              >
                All Categories
              </button>
              {categoriesList.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                  className={`block w-full text-left py-1 flex items-center justify-between cursor-pointer ${
                    selectedCategory === cat ? 'font-bold text-[#4A0E17]' : 'hover:text-[#4A0E17]'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-[#4A0E17]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Craft Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">CRAFT & WEAVE</h4>
            <div className="space-y-1 text-xs text-[#222222]/80">
              {craftsList.map(craft => (
                <button
                  key={craft}
                  onClick={() => setSelectedCraft(selectedCraft === craft ? '' : craft)}
                  className={`block w-full text-left py-1 cursor-pointer ${
                    selectedCraft === craft ? 'font-bold text-[#4A0E17]' : 'hover:text-[#4A0E17]'
                  }`}
                >
                  {craft}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">FABRIC</h4>
            <div className="space-y-1 text-xs text-[#222222]/80">
              {fabricsList.map(fab => (
                <button
                  key={fab}
                  onClick={() => setSelectedFabric(selectedFabric === fab ? '' : fab)}
                  className={`block w-full text-left py-1 cursor-pointer ${
                    selectedFabric === fab ? 'font-bold text-[#4A0E17]' : 'hover:text-[#4A0E17]'
                  }`}
                >
                  {fab}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">OCCASION</h4>
            <div className="space-y-1 text-xs text-[#222222]/80">
              {occasionsList.map(occ => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(selectedOccasion === occ ? '' : occ)}
                  className={`block w-full text-left py-1 cursor-pointer ${
                    selectedOccasion === occ ? 'font-bold text-[#4A0E17]' : 'hover:text-[#4A0E17]'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">PRICE RANGE</h4>
            <div className="space-y-1.5 text-xs text-[#222222]/80">
              {[
                { label: 'All Prices', val: 'all' },
                { label: 'Under ₹2,000', val: 'under2000' },
                { label: '₹2,000 – ₹5,000', val: '2000-5000' },
                { label: '₹5,000 – ₹10,000', val: '5000-10000' },
                { label: '₹10,000 – ₹20,000', val: '10000-20000' },
                { label: '₹20,000+', val: '20000plus' }
              ].map(p => (
                <button
                  key={p.val}
                  onClick={() => setPriceRange(p.val)}
                  className={`block w-full text-left py-0.5 cursor-pointer ${
                    priceRange === p.val ? 'font-bold text-[#4A0E17]' : 'hover:text-[#4A0E17]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded border border-[#E8DFD5] space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#222222]">NO CREATIONS FOUND</h3>
              <p className="text-xs text-[#222222]/60">Try clearing some filters to explore our full boutique collection.</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-[#4A0E17] text-[#FAF6F0] text-xs font-bold uppercase tracking-wider rounded cursor-pointer"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="w-full max-w-xs bg-[#FAF6F0] h-full shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD5]">
              <span className="font-serif font-bold text-xl text-[#4A0E17]">BOUTIQUE FILTERS</span>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-[#222222]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-[#C5A059] mb-2 uppercase">CATEGORY</h4>
                {categoriesList.map(c => (
                  <button key={c} onClick={() => setSelectedCategory(selectedCategory === c ? '' : c)} className={`block py-1 ${selectedCategory === c ? 'font-bold text-[#4A0E17]' : ''}`}>{c}</button>
                ))}
              </div>

              <div>
                <h4 className="font-bold text-[#C5A059] mb-2 uppercase">CRAFT</h4>
                {craftsList.map(c => (
                  <button key={c} onClick={() => setSelectedCraft(selectedCraft === c ? '' : c)} className={`block py-1 ${selectedCraft === c ? 'font-bold text-[#4A0E17]' : ''}`}>{c}</button>
                ))}
              </div>

              <div>
                <h4 className="font-bold text-[#C5A059] mb-2 uppercase">OCCASION</h4>
                {occasionsList.map(o => (
                  <button key={o} onClick={() => setSelectedOccasion(selectedOccasion === o ? '' : o)} className={`block py-1 ${selectedOccasion === o ? 'font-bold text-[#4A0E17]' : ''}`}>{o}</button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DFD5] flex gap-3">
              <button onClick={clearAllFilters} className="flex-1 py-2.5 border border-[#4A0E17] text-[#4A0E17] font-bold text-xs rounded">CLEAR</button>
              <button onClick={() => setMobileFilterOpen(false)} className="flex-1 py-2.5 bg-[#4A0E17] text-white font-bold text-xs rounded">APPLY</button>
            </div>
          </div>
        </div>
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
