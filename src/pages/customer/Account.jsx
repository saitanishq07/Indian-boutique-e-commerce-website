import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice, formatDate } from '../../utils/formatters';
import { User, Package, Heart, MapPin, CreditCard, LogOut, CheckCircle, Truck, Clock } from 'lucide-react';

export default function Account({ onNavigate }) {
  const { orders, wishlist, products } = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  const customerProfile = {
    name: 'Ananya Reddy',
    email: 'ananya.reddy@example.com',
    phone: '+91 98490 12345',
    memberSince: '2024',
    tier: 'VIP Client'
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-[#FAF6F0] rounded-full border border-[#E8DFD5] flex items-center justify-center mx-auto">
          <User className="w-8 h-8 text-[#4A0E17]" />
        </div>
        <div>
          <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">CLIENT PORTAL</span>
          <h2 className="font-serif text-3xl font-bold text-[#222222] mt-1">WELCOME TO AAVANI</h2>
          <p className="text-xs text-[#222222]/60 mt-1">Sign in to manage your boutique orders, saved addresses, and trousseau wishlist.</p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => setIsLoggedIn(true)}
            className="w-full py-3.5 bg-[#4A0E17] hover:bg-[#6B1724] text-[#FAF6F0] text-xs font-bold tracking-[0.2em] uppercase rounded shadow cursor-pointer"
          >
            SIGN IN (DEMO)
          </button>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="w-full py-3.5 bg-white border border-[#4A0E17] text-[#4A0E17] text-xs font-bold tracking-[0.2em] uppercase rounded hover:bg-[#FAF6F0] cursor-pointer"
          >
            CREATE ACCOUNT
          </button>
        </div>
        <p className="text-[11px] text-[#222222]/50 italic">No real authentication required for demonstration.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Account Header */}
      <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E8DFD5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#4A0E17] text-[#FAF6F0] rounded-full flex items-center justify-center font-serif font-bold text-xl shadow">
            {customerProfile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-[#222222]">{customerProfile.name}</h1>
              <span className="text-[10px] font-bold text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/30 uppercase">
                {customerProfile.tier}
              </span>
            </div>
            <p className="text-xs text-[#222222]/60">{customerProfile.email} · {customerProfile.phone}</p>
          </div>
        </div>

        <button
          onClick={() => setIsLoggedIn(false)}
          className="text-xs text-rose-700 hover:text-rose-900 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8DFD5] space-x-6 overflow-x-auto">
        {[
          { id: 'orders', label: 'MY ORDERS', icon: Package },
          { id: 'addresses', label: 'SAVED ADDRESSES', icon: MapPin },
          { id: 'payments', label: 'SAVED PAYMENTS', icon: CreditCard }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs font-bold tracking-widest uppercase flex items-center gap-2 cursor-pointer border-b-2 transition-all ${
                activeTab === tab.id ? 'border-[#4A0E17] text-[#4A0E17]' : 'border-transparent text-[#222222]/60 hover:text-[#222222]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="p-8 text-center bg-white rounded border border-[#E8DFD5]">
              <p className="font-serif text-lg text-[#222222]">No order history found.</p>
            </div>
          ) : (
            orders.map(ord => (
              <div key={ord.id} className="bg-white p-6 rounded-lg border border-[#E8DFD5] space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8DFD5] gap-2">
                  <div>
                    <span className="text-xs text-[#222222]/50">ORDER NO.</span>
                    <h3 className="font-serif font-bold text-lg text-[#4A0E17]">{ord.id}</h3>
                    <span className="text-[11px] text-[#222222]/60">Placed on {formatDate(ord.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-xs font-bold uppercase rounded ${
                      ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                      ord.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-900'
                    }`}>
                      STATUS: {ord.status}
                    </span>

                    <button
                      onClick={() => onNavigate(`/track-order?orderId=${ord.id}`)}
                      className="px-4 py-2 bg-[#FAF6F0] hover:bg-[#4A0E17] hover:text-white border border-[#4A0E17]/20 text-[#4A0E17] text-xs font-bold tracking-wider uppercase rounded transition-colors cursor-pointer"
                    >
                      TRACK ORDER
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {ord.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-xs py-1">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-14 object-cover rounded bg-[#FAF6F0]" />
                        <div>
                          <p className="font-serif font-bold text-[#222222]">{item.name}</p>
                          <p className="text-[#222222]/60">Qty: {item.quantity} · {item.color}</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#4A0E17]">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#FAF6F0] flex justify-between items-center text-xs text-[#222222]/80 font-medium">
                  <span>Payment: <strong>{ord.paymentMethod} ({ord.paymentStatus})</strong></span>
                  <span className="text-base font-serif font-bold text-[#4A0E17]">Total: {formatPrice(ord.total)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded border border-[#4A0E17] space-y-2 relative">
            <span className="absolute top-4 right-4 text-[10px] font-bold text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded">
              DEFAULT ADDRESS
            </span>
            <h4 className="font-serif font-bold text-base text-[#222222]">Jubilee Hills Residence</h4>
            <p className="text-xs text-[#222222]/80 leading-relaxed">
              Ananya Reddy<br />
              Plot 42, Road No. 10, Jubilee Hills<br />
              Hyderabad, Telangana 500033<br />
              Phone: +91 98490 12345
            </p>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="bg-white p-6 rounded border border-[#E8DFD5] space-y-3">
          <h4 className="font-serif font-bold text-base text-[#222222]">Saved Payment Options</h4>
          <div className="p-4 bg-[#FAF6F0] rounded border border-[#E8DFD5] text-xs flex justify-between items-center">
            <div>
              <p className="font-bold text-[#222222]">UPI ID: ananya.reddy@upi</p>
              <p className="text-[#222222]/60">Verified Primary UPI</p>
            </div>
            <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Active</span>
          </div>
        </div>
      )}

    </div>
  );
}
