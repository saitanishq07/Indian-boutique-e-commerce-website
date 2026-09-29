import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice, formatDate } from '../../utils/formatters';
import { Search, Package, CheckCircle2, Truck, Clock, MapPin } from 'lucide-react';

export default function TrackOrder({ initialOrderId = '', onNavigate }) {
  const { orders } = useApp();
  const [orderInput, setOrderInput] = useState(initialOrderId || 'AAV-2026-1048');
  const [phoneInput, setPhoneInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);

  useEffect(() => {
    if (orderInput) {
      const found = orders.find(o => o.id.toLowerCase() === orderInput.trim().toLowerCase());
      if (found) setSearchedOrder(found);
    }
  }, [orderInput, orders]);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const found = orders.find(o => o.id.toLowerCase() === orderInput.trim().toLowerCase());
    setSearchedOrder(found || null);
  };

  const steps = ['Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

  const getStepIndex = (status) => {
    if (status === 'Confirmed') return 0;
    if (status === 'Packed') return 1;
    if (status === 'Shipped') return 2;
    if (status === 'Out for Delivery') return 3;
    if (status === 'Delivered') return 4;
    return 0;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="text-center space-y-2">
        <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">REAL-TIME ORDER TRACKING</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#222222]">TRACK YOUR BOUTIQUE PARCEL</h1>
        <p className="text-xs text-[#222222]/60">Enter your order reference number to view live shipment timeline.</p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleTrackSubmit} className="bg-white p-6 rounded-lg border border-[#E8DFD5] shadow-xs flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-xs font-bold text-[#222222] mb-1 uppercase">ORDER NUMBER</label>
          <input
            type="text"
            required
            value={orderInput}
            onChange={(e) => setOrderInput(e.target.value)}
            placeholder="e.g. AAV-2026-1048"
            className="w-full px-3 py-2.5 text-xs border border-[#E8DFD5] rounded font-mono uppercase focus:outline-none focus:border-[#4A0E17]"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-[#222222] mb-1 uppercase">MOBILE NUMBER (OPTIONAL)</label>
          <input
            type="text"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            placeholder="+91 98490 12345"
            className="w-full px-3 py-2.5 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-[#4A0E17] hover:bg-[#6B1724] text-[#FAF6F0] text-xs font-bold tracking-widest uppercase rounded shadow cursor-pointer transition-colors"
          >
            TRACK STATUS
          </button>
        </div>
      </form>

      {/* Order Tracking Display */}
      {searchedOrder ? (
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E8DFD5] shadow-md space-y-8">
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-[#E8DFD5] gap-4">
            <div>
              <span className="text-xs text-[#222222]/50">ORDER REFERENCE</span>
              <h3 className="font-serif font-bold text-2xl text-[#4A0E17]">{searchedOrder.id}</h3>
              <p className="text-xs text-[#222222]/60 mt-0.5">Placed on {formatDate(searchedOrder.createdAt)}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#222222]/50 block">STATUS</span>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs rounded uppercase mt-1">
                {searchedOrder.status}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="py-4">
            <h4 className="font-serif font-bold text-base text-[#222222] mb-6">SHIPMENT PROGRESS</h4>
            
            <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0">
              {steps.map((stepName, index) => {
                const currentIdx = getStepIndex(searchedOrder.status);
                const isCompleted = index <= currentIdx;
                
                return (
                  <div key={stepName} className="flex sm:flex-col items-center gap-3 sm:gap-2 flex-1 text-center relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      isCompleted ? 'bg-[#4A0E17] text-[#FAF6F0] shadow-md' : 'bg-[#FAF6F0] text-[#222222]/40 border border-[#E8DFD5]'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4 text-[#C5A059]" /> : index + 1}
                    </div>
                    <span className={`text-xs font-bold ${isCompleted ? 'text-[#222222]' : 'text-[#222222]/40'}`}>
                      {stepName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Address Details */}
          <div className="bg-[#FAF6F0] p-4 rounded border border-[#E8DFD5] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold text-[#C5A059] block mb-1 uppercase">DELIVERY ADDRESS</span>
              <p className="text-[#222222]">
                <strong>{searchedOrder.customer.name}</strong><br />
                {searchedOrder.customer.address}<br />
                {searchedOrder.customer.city}, {searchedOrder.customer.state} - {searchedOrder.customer.pin}
              </p>
            </div>
            <div>
              <span className="font-bold text-[#C5A059] block mb-1 uppercase">PAYMENT SUMMARY</span>
              <p className="text-[#222222]">
                Method: <strong>{searchedOrder.paymentMethod}</strong><br />
                Payment Status: <strong>{searchedOrder.paymentStatus}</strong><br />
                Total Amount: <strong>{formatPrice(searchedOrder.total)}</strong>
              </p>
            </div>
          </div>

        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded border border-[#E8DFD5]">
          <p className="font-serif text-lg text-[#222222]">Order reference "{orderInput}" not found.</p>
          <p className="text-xs text-[#222222]/50 mt-1">Please check the order ID or test with demo order <strong>AAV-2026-1048</strong>.</p>
        </div>
      )}

    </div>
  );
}
