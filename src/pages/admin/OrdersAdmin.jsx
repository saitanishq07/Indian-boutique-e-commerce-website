import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice, formatDate } from '../../utils/formatters';
import { Search, Eye, CheckCircle2, Package, Truck, X, Clock, MapPin, User, Check, ShieldAlert } from 'lucide-react';

export default function OrdersAdmin({ initialOrderId = null }) {
  const { orders, updateOrderStatus } = useApp();
  const [selectedStatusTab, setSelectedStatusTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrderModal, setActiveOrderModal] = useState(
    initialOrderId ? orders.find(o => o.id === initialOrderId) : null
  );

  const statusTabs = ['All', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(o => {
    const matchesTab = selectedStatusTab === 'All' || o.status === selectedStatusTab;
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.customer.phone.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">ORDER MANAGEMENT</h1>
          <p className="text-xs text-slate-500 mt-0.5">Process customer orders, update shipment statuses, and track fulfillment.</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex border-b border-slate-200 space-x-6 overflow-x-auto">
          {statusTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedStatusTab(tab)}
              className={`pb-3 text-xs font-bold uppercase cursor-pointer border-b-2 transition-all ${
                selectedStatusTab === tab ? 'border-[#4A0E17] text-[#4A0E17]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab} ({tab === 'All' ? orders.length : orders.filter(o => o.status === tab).length})
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, customer name, or phone number..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded focus:outline-none focus:border-[#4A0E17]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Items</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {filteredOrders.map(ord => (
                <tr key={ord.id} className="hover:bg-slate-50/80">
                  <td className="p-4 font-mono font-bold text-[#4A0E17]">{ord.id}</td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{ord.customer.name}</span>
                    <span className="text-[11px] text-slate-500">{ord.customer.city}</span>
                  </td>
                  <td className="p-4 text-slate-600">{formatDate(ord.createdAt)}</td>
                  <td className="p-4 font-bold">{ord.items.length} items</td>
                  <td className="p-4 font-bold text-slate-900">{formatPrice(ord.total)}</td>
                  <td className="p-4">
                    <span className="text-slate-700 font-semibold">{ord.paymentMethod}</span>
                    <span className="block text-[10px] text-emerald-700 font-bold">{ord.paymentStatus}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                      ord.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      ord.status === 'Packed' ? 'bg-indigo-100 text-indigo-800' :
                      ord.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setActiveOrderModal(ord)}
                      className="px-3 py-1.5 bg-[#4A0E17] text-white text-[11px] font-bold rounded uppercase hover:bg-[#6B1724] cursor-pointer"
                    >
                      MANAGE ORDER
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Order View Modal */}
      {activeOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 relative my-auto">
            <button
              onClick={() => setActiveOrderModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs text-[#C5A059] font-bold uppercase tracking-wider">BOUTIQUE FULFILLMENT</span>
              <h2 className="font-serif text-2xl font-bold text-slate-900">ORDER {activeOrderModal.id}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Placed on {formatDate(activeOrderModal.createdAt)}</p>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded border border-slate-200 text-xs">
              <div>
                <span className="font-bold text-slate-500 uppercase block mb-1">CLIENT CONTACT</span>
                <p className="font-bold text-slate-900">{activeOrderModal.customer.name}</p>
                <p className="text-slate-600">{activeOrderModal.customer.email}</p>
                <p className="text-slate-600">{activeOrderModal.customer.phone}</p>
              </div>
              <div>
                <span className="font-bold text-slate-500 uppercase block mb-1">SHIPPING ADDRESS</span>
                <p className="text-slate-800">{activeOrderModal.customer.address}</p>
                <p className="text-slate-800">{activeOrderModal.customer.city}, {activeOrderModal.customer.state} - {activeOrderModal.customer.pin}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm text-slate-900">ORDERED ITEMS</h4>
              <div className="border border-slate-200 rounded divide-y divide-slate-100">
                {activeOrderModal.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-14 object-cover rounded" />
                      <div>
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-slate-500">Qty: {item.quantity} · {item.color} · {item.size}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#4A0E17]">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Status Transitions */}
            <div className="bg-[#FAF6F0] p-4 rounded border border-[#E8DFD5] space-y-3">
              <span className="font-bold text-xs uppercase text-[#4A0E17] block">UPDATE ORDER fulfillment STATUS</span>
              <div className="flex flex-wrap gap-2">
                {['Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'].map(st => (
                  <button
                    key={st}
                    onClick={() => {
                      updateOrderStatus(activeOrderModal.id, st);
                      setActiveOrderModal({ ...activeOrderModal, status: st });
                    }}
                    className={`px-3 py-1.5 text-xs font-bold uppercase rounded cursor-pointer transition-colors ${
                      activeOrderModal.status === st
                        ? 'bg-[#4A0E17] text-white'
                        : 'bg-white text-slate-700 border border-slate-300 hover:border-[#4A0E17]'
                    }`}
                  >
                    MARK AS {st.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
