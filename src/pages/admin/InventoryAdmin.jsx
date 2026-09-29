import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Boxes, AlertTriangle, Plus, Minus, Search, CheckCircle, RefreshCw } from 'lucide-react';

export default function InventoryAdmin() {
  const { products, adjustStock } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adjustAmount, setAdjustAmount] = useState(5);
  const [adjustReason, setAdjustReason] = useState('Purchase');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdjustStock = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    adjustStock(selectedProduct.id, selectedProduct.sku, Number(adjustAmount), adjustReason);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">INVENTORY MANAGEMENT</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track real-time stock levels and perform inventory adjustments.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inventory by product title or SKU..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded focus:outline-none focus:border-[#4A0E17]"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <th className="p-4">SKU</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Threshold</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {filteredProducts.map(prod => (
                <tr key={prod.id} className="hover:bg-slate-50/80">
                  <td className="p-4 font-mono font-bold text-slate-700">{prod.sku}</td>
                  <td className="p-4 font-bold text-slate-900">{prod.name}</td>
                  <td className="p-4 font-semibold text-[#C5A059]">{prod.category}</td>
                  <td className="p-4 font-bold text-base text-[#4A0E17]">{prod.stock} units</td>
                  <td className="p-4 text-slate-500">{prod.lowStockThreshold || 5} units</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      prod.stock === 0 ? 'bg-rose-100 text-rose-800' :
                      prod.stock <= (prod.lowStockThreshold || 5) ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {prod.stock === 0 ? 'OUT OF STOCK' : prod.stock <= (prod.lowStockThreshold || 5) ? 'LOW STOCK' : 'IN STOCK'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold uppercase rounded hover:bg-[#4A0E17] transition-colors cursor-pointer"
                    >
                      ADJUST STOCK
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
              ADJUST STOCK: {selectedProduct.name}
            </h3>

            <p className="text-xs text-slate-600">
              Current Stock: <strong>{selectedProduct.stock} units</strong> (SKU: {selectedProduct.sku})
            </p>

            <form onSubmit={handleAdjustStock} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ADJUSTMENT QUANTITY (+ OR -)</label>
                <input
                  type="number"
                  required
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(Number(e.target.value))}
                  placeholder="e.g. 10 or -5"
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs font-bold focus:outline-none focus:border-[#4A0E17]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">REASON FOR ADJUSTMENT</label>
                <select
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#4A0E17]"
                >
                  <option value="Purchase">Purchase (New Batch Arrival)</option>
                  <option value="Return">Customer Return</option>
                  <option value="Damage">Damaged / Defective Stock</option>
                  <option value="Manual Adjustment">Manual Audit Correction</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4A0E17] text-white text-xs font-bold uppercase rounded cursor-pointer"
                >
                  SAVE ADJUSTMENT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
