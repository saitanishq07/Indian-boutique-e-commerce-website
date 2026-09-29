import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Store, ShieldCheck, Save, CreditCard, Truck } from 'lucide-react';

export default function SettingsAdmin() {
  const { showToast } = useApp();

  const [storeInfo, setStoreInfo] = useState({
    name: 'AAVANI Boutique',
    tagline: 'Tradition, Woven for Today.',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
    phone: '+91 98490 12345',
    email: 'concierge@aavaniboutique.com',
    gstin: '36AABCA1234F1Z5',
    freeShippingMin: 2999,
    standardShippingFee: 149,
    gstRate: 5
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Store settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">ADMIN SETTINGS</h1>
        <p className="text-xs text-slate-500 mt-0.5">Configure store information, shipping thresholds, taxes, and payment gateways.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Store Profile */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2">STORE PROFILE</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">BRAND NAME</label>
              <input type="text" value={storeInfo.name} onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">TAGLINE</label>
              <input type="text" value={storeInfo.tagline} onChange={(e) => setStoreInfo({ ...storeInfo, tagline: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">BOUTIQUE PHONE</label>
              <input type="text" value={storeInfo.phone} onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">SUPPORT EMAIL</label>
              <input type="email" value={storeInfo.email} onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">HYDERABAD STORE ADDRESS</label>
              <input type="text" value={storeInfo.address} onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded" />
            </div>
          </div>
        </div>

        {/* Shipping & GST */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2">LOGISTICS & TAXES</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">FREE SHIPPING MIN (₹)</label>
              <input type="number" value={storeInfo.freeShippingMin} onChange={(e) => setStoreInfo({ ...storeInfo, freeShippingMin: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded font-bold" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">STANDARD SHIPPING FEE (₹)</label>
              <input type="number" value={storeInfo.standardShippingFee} onChange={(e) => setStoreInfo({ ...storeInfo, standardShippingFee: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded font-bold" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">GST RATE (%)</label>
              <input type="number" value={storeInfo.gstRate} onChange={(e) => setStoreInfo({ ...storeInfo, gstRate: Number(e.target.value) })} className="w-full px-3 py-2 border border-slate-200 rounded font-bold" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-[#4A0E17] hover:bg-[#6B1724] text-white text-xs font-bold tracking-widest uppercase rounded shadow flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4 text-[#C5A059]" /> SAVE ALL SETTINGS
        </button>
      </form>
    </div>
  );
}
