import React from 'react';
import { formatPrice, formatDate } from '../../utils/formatters';
import { CheckCircle, Truck, Package, ArrowRight, Home } from 'lucide-react';

export default function OrderSuccess({ order, onNavigate }) {
  if (!order) {
    onNavigate('/');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      
      {/* Confirmation Card */}
      <div className="bg-white p-8 sm:p-12 rounded-lg border border-[#E8DFD5] shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">ORDER CONFIRMATION</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#222222] mt-1">
            YOUR ORDER IS CONFIRMED
          </h1>
          <p className="text-xs text-[#222222]/70 mt-2 font-medium">
            Thank you, <strong>{order.customer.name}</strong>. We are carefully preparing your boutique items in Hyderabad.
          </p>
        </div>

        {/* Order Details Badge */}
        <div className="bg-[#FAF6F0] p-4 rounded border border-[#E8DFD5] text-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-[#222222]/50 block">ORDER NUMBER</span>
            <span className="font-bold text-[#4A0E17] text-sm">{order.id}</span>
          </div>
          <div>
            <span className="text-[#222222]/50 block">DATE</span>
            <span className="font-bold text-[#222222]">{formatDate(order.createdAt)}</span>
          </div>
          <div>
            <span className="text-[#222222]/50 block">TOTAL PAID</span>
            <span className="font-bold text-[#4A0E17] text-sm">{formatPrice(order.total)}</span>
          </div>
          <div>
            <span className="text-[#222222]/50 block">ESTIMATED DELIVERY</span>
            <span className="font-bold text-emerald-800">3–5 Business Days</span>
          </div>
        </div>

        {/* Items Summary */}
        <div className="text-left pt-4 border-t border-[#E8DFD5] space-y-3">
          <h4 className="font-serif font-bold text-sm text-[#222222]">ORDERED ITEMS</h4>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs py-2 border-b border-[#FAF6F0]">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-10 h-14 object-cover rounded" />
                <div>
                  <p className="font-serif font-bold text-[#222222]">{item.name}</p>
                  <p className="text-[#222222]/60">Qty: {item.quantity} · {item.color} · {item.size}</p>
                </div>
              </div>
              <span className="font-bold text-[#4A0E17]">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate(`/track-order?orderId=${order.id}`)}
            className="px-8 py-3.5 bg-[#4A0E17] hover:bg-[#6B1724] text-[#FAF6F0] text-xs font-bold tracking-widest uppercase rounded shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Truck className="w-4 h-4 text-[#C5A059]" /> TRACK ORDER STATUS
          </button>
          <button
            onClick={() => onNavigate('/')}
            className="px-8 py-3.5 bg-white border border-[#4A0E17] text-[#4A0E17] hover:bg-[#FAF6F0] text-xs font-bold tracking-widest uppercase rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" /> CONTINUE SHOPPING
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-[#222222]/50 italic pt-4">
          Demo order — no real payment has been processed. You can view this order live in the Admin Dashboard!
        </p>
      </div>
    </div>
  );
}
