import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';
import { Plus, Search, Edit2, Copy, Trash2, Eye, Check, X, Save, ArrowLeft, Layers } from 'lucide-react';

export default function ProductsAdmin({ onNavigate, editProductId = null, isNewMode = false }) {
  const { products, addProduct, updateProduct, deleteProduct, duplicateProduct, categories } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingId, setEditingId] = useState(editProductId);

  // Form State for Create / Edit Product
  const initialForm = {
    name: '',
    sku: '',
    category: 'Sarees',
    subcategory: 'Silk Sarees',
    description: '',
    price: 4990,
    mrp: 6990,
    gst: 5,
    fabric: 'Silk',
    craft: 'Banarasi',
    color: 'Wine',
    sizes: ['One Size'],
    occasion: 'Wedding',
    stock: 10,
    lowStockThreshold: 5,
    status: 'Active',
    badge: 'HANDLOOM',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'],
    variants: [
      { sku: 'AAV-VAR-001', color: 'Wine', size: 'One Size', price: 4990, stock: 10 }
    ]
  };

  const [formData, setFormData] = useState(initialForm);

  // Filter products list
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = !selectedCategory || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleEditClick = (product) => {
    setFormData({
      ...product,
      variants: product.variants || [{ sku: `${product.sku}-1`, color: product.color, size: product.sizes?.[0] || 'One Size', price: product.price, stock: product.stock }]
    });
    setEditingId(product.id);
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, formData);
      setEditingId(null);
    } else {
      addProduct(formData);
      setFormData(initialForm);
    }
  };

  // Render Product Form View if creating or editing
  if (isNewMode || editingId) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setEditingId(null); onNavigate('/admin/products'); }}
              className="p-2 text-slate-500 hover:text-slate-900 rounded bg-white border border-slate-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="font-serif text-2xl font-bold text-slate-900">
              {editingId ? `EDIT PRODUCT: ${formData.name}` : 'CREATE NEW PRODUCT'}
            </h1>
          </div>
          <button
            onClick={handleSaveSubmit}
            className="px-6 py-2.5 bg-[#4A0E17] hover:bg-[#6B1724] text-white text-xs font-bold tracking-wider uppercase rounded shadow flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#C5A059]" /> SAVE PRODUCT
          </button>
        </div>

        <form onSubmit={handleSaveSubmit} className="space-y-8">
          
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900 pb-2 border-b border-slate-100">BASIC INFORMATION</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">PRODUCT NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kashi Banarasi Silk Saree"
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#4A0E17]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">SKU</label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="AAV-SAR-001"
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs font-mono focus:outline-none focus:border-[#4A0E17]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">CATEGORY</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#4A0E17]"
                >
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">BADGE</label>
                <select
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#4A0E17]"
                >
                  <option value="NEW">NEW</option>
                  <option value="BESTSELLER">BESTSELLER</option>
                  <option value="HANDLOOM">HANDLOOM</option>
                  <option value="FESTIVE">FESTIVE</option>
                  <option value="LIMITED">LIMITED</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">STATUS</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#4A0E17]"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block font-bold text-slate-700 mb-1">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900 pb-2 border-b border-slate-100">PRICING & STOCK</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">SELLING PRICE (₹)</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs font-bold text-[#4A0E17] focus:outline-none focus:border-[#4A0E17]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">MRP (₹)</label>
                <input
                  type="number"
                  value={formData.mrp}
                  onChange={(e) => setFormData({ ...formData, mrp: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#4A0E17]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">TOTAL STOCK</label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#4A0E17]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">LOW STOCK THRESHOLD</label>
                <input
                  type="number"
                  value={formData.lowStockThreshold}
                  onChange={(e) => setFormData({ ...formData, lowStockThreshold: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
            </div>
          </div>

          {/* Boutique Attributes */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900 pb-2 border-b border-slate-100">BOUTIQUE ATTRIBUTES</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">FABRIC</label>
                <input type="text" value={formData.fabric} onChange={(e) => setFormData({ ...formData, fabric: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded text-xs" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">CRAFT / WEAVE</label>
                <input type="text" value={formData.craft} onChange={(e) => setFormData({ ...formData, craft: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded text-xs" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">COLOR</label>
                <input type="text" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded text-xs" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">OCCASION</label>
                <input type="text" value={formData.occasion} onChange={(e) => setFormData({ ...formData, occasion: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded text-xs" />
              </div>
            </div>
          </div>

          {/* Product Variants Table */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>PRODUCT VARIANTS MATRIX (COLOR & SIZE)</span>
              <button
                type="button"
                onClick={() => {
                  const newVar = { sku: `${formData.sku}-V${formData.variants.length + 1}`, color: formData.color, size: 'M', price: formData.price, stock: 5 };
                  setFormData({ ...formData, variants: [...formData.variants, newVar] });
                }}
                className="text-xs font-bold text-[#4A0E17] hover:underline cursor-pointer"
              >
                + ADD VARIANT ROW
              </button>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase">
                    <th className="py-2">Variant SKU</th>
                    <th className="py-2">Color</th>
                    <th className="py-2">Size</th>
                    <th className="py-2">Price (₹)</th>
                    <th className="py-2">Stock</th>
                    <th className="py-2 text-right">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {formData.variants.map((v, idx) => (
                    <tr key={idx}>
                      <td className="py-2">
                        <input type="text" value={v.sku} onChange={(e) => {
                          const updated = [...formData.variants];
                          updated[idx].sku = e.target.value;
                          setFormData({ ...formData, variants: updated });
                        }} className="px-2 py-1 border border-slate-200 rounded font-mono text-xs w-28" />
                      </td>
                      <td className="py-2">
                        <input type="text" value={v.color} onChange={(e) => {
                          const updated = [...formData.variants];
                          updated[idx].color = e.target.value;
                          setFormData({ ...formData, variants: updated });
                        }} className="px-2 py-1 border border-slate-200 rounded text-xs w-24" />
                      </td>
                      <td className="py-2">
                        <input type="text" value={v.size} onChange={(e) => {
                          const updated = [...formData.variants];
                          updated[idx].size = e.target.value;
                          setFormData({ ...formData, variants: updated });
                        }} className="px-2 py-1 border border-slate-200 rounded text-xs w-20" />
                      </td>
                      <td className="py-2">
                        <input type="number" value={v.price} onChange={(e) => {
                          const updated = [...formData.variants];
                          updated[idx].price = Number(e.target.value);
                          setFormData({ ...formData, variants: updated });
                        }} className="px-2 py-1 border border-slate-200 rounded text-xs w-24 font-bold text-[#4A0E17]" />
                      </td>
                      <td className="py-2">
                        <input type="number" value={v.stock} onChange={(e) => {
                          const updated = [...formData.variants];
                          updated[idx].stock = Number(e.target.value);
                          setFormData({ ...formData, variants: updated });
                        }} className="px-2 py-1 border border-slate-200 rounded text-xs w-20 font-bold" />
                      </td>
                      <td className="py-2 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, variants: formData.variants.filter((_, i) => i !== idx) });
                          }}
                          className="text-rose-600 hover:text-rose-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </form>
      </div>
    );
  }

  // Product List Table View
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">PRODUCT MANAGEMENT</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage your online boutique catalog, prices, and variant stocks.</p>
        </div>

        <button
          onClick={() => onNavigate('/admin/products/new')}
          className="px-5 py-2.5 bg-[#4A0E17] hover:bg-[#6B1724] text-white text-xs font-bold tracking-wider uppercase rounded shadow flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#C5A059]" /> ADD NEW PRODUCT
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product title or SKU..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded focus:outline-none focus:border-[#4A0E17]"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-48 px-3 py-2 text-xs border border-slate-200 rounded focus:outline-none focus:border-[#4A0E17] cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <th className="p-4">Image</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Selling Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {filteredProducts.map(prod => (
                <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <img src={prod.images[0]} alt={prod.name} className="w-10 h-14 object-cover rounded bg-slate-100" />
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{prod.name}</span>
                    <span className="text-[11px] text-slate-500">{prod.fabric} · {prod.craft || 'Handloom'}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-600 font-semibold">{prod.sku}</td>
                  <td className="p-4 font-semibold text-[#C5A059]">{prod.category}</td>
                  <td className="p-4 font-bold text-[#4A0E17]">{formatPrice(prod.price)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      prod.stock === 0 ? 'bg-rose-100 text-rose-800' :
                      prod.stock <= (prod.lowStockThreshold || 5) ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {prod.stock} in stock
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      prod.status === 'Active' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {prod.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEditClick(prod)}
                      className="p-1.5 text-slate-600 hover:text-[#4A0E17] cursor-pointer"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => duplicateProduct(prod.id)}
                      className="p-1.5 text-slate-600 hover:text-blue-600 cursor-pointer"
                      title="Duplicate Product"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
