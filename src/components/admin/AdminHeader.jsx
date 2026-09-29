import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, User, X, AlertTriangle, Package, ShoppingBag, Check } from 'lucide-react';

export default function AdminHeader({ onNavigate }) {
  const { products, orders, reviews } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const lowStockCount = products.filter(p => p.stock <= (p.lowStockThreshold || 5)).length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Confirmed').length;
  const pendingReviewsCount = reviews.filter(r => r.status === 'Pending').length;

  const totalNotifications = lowStockCount + pendingOrdersCount + pendingReviewsCount;

  // Global Admin Search Results
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase())).map(p => ({ type: 'Product', label: p.name, sub: `SKU: ${p.sku}`, path: `/admin/products?edit=${p.id}` })),
    ...orders.filter(o => o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer.name.toLowerCase().includes(searchQuery.toLowerCase())).map(o => ({ type: 'Order', label: `Order ${o.id}`, sub: `Customer: ${o.customer.name}`, path: `/admin/orders?id=${o.id}` }))
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      
      {/* Search Input Bar */}
      <div className="relative w-72 sm:w-96">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200 focus-within:border-[#4A0E17] focus-within:bg-white transition-colors">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, SKUs, orders, customers..."
            className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Global Admin Search Dropdown Results */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-2xl border border-slate-200 max-h-80 overflow-y-auto z-50 p-2 space-y-1">
            {searchResults.map((res, i) => (
              <div
                key={i}
                onClick={() => {
                  setSearchQuery('');
                  onNavigate(res.path);
                }}
                className="p-2 hover:bg-slate-50 rounded cursor-pointer flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-800 block">{res.label}</span>
                  <span className="text-[11px] text-slate-500">{res.sub}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A0E17] bg-[#4A0E17]/10 px-2 py-0.5 rounded">
                  {res.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Utilities */}
      <div className="flex items-center gap-4">
        
        {/* Notifications Drawer Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {totalNotifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalNotifications}
              </span>
            )}
          </button>

          {/* Notifications Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-slate-200 z-50 overflow-hidden">
              <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">ADMIN NOTIFICATIONS</span>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 space-y-2.5 max-h-80 overflow-y-auto text-xs">
                {lowStockCount > 0 && (
                  <div
                    onClick={() => { setShowNotifications(false); onNavigate('/admin/inventory'); }}
                    className="p-2.5 bg-amber-50 border border-amber-200 rounded flex items-start gap-2.5 cursor-pointer hover:bg-amber-100"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-900">{lowStockCount} Products Low on Stock</p>
                      <p className="text-[11px] text-amber-700">Requires inventory replenishment.</p>
                    </div>
                  </div>
                )}

                {pendingOrdersCount > 0 && (
                  <div
                    onClick={() => { setShowNotifications(false); onNavigate('/admin/orders'); }}
                    className="p-2.5 bg-blue-50 border border-blue-200 rounded flex items-start gap-2.5 cursor-pointer hover:bg-blue-100"
                  >
                    <ShoppingBag className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-blue-900">{pendingOrdersCount} Orders Awaiting Dispatch</p>
                      <p className="text-[11px] text-blue-700">Ready for packing and shipping.</p>
                    </div>
                  </div>
                )}

                {totalNotifications === 0 && (
                  <p className="text-center py-4 text-slate-500 italic">No new notifications.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-[#4A0E17] text-[#C5A059] flex items-center justify-center font-serif font-bold text-sm shadow-xs">
            A
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-bold text-slate-800 block leading-tight">Admin Manager</span>
            <span className="text-[10px] text-slate-500">admin@aavani.example</span>
          </div>
        </div>

      </div>
    </header>
  );
}
