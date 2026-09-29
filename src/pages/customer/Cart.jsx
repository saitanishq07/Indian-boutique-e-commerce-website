import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';
import { ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight, Sparkles, Check, Gift } from 'lucide-react';

export default function Cart({ onNavigate }) {
  const { cart, removeFromCart, updateCartQty, appliedCoupon, applyCoupon, removeCoupon, products, addToCart } = useApp();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  // Shipping calculation logic
  const freeShippingThreshold = 2999;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = subtotal > 0 ? (isFreeShipping ? 0 : 149) : 0;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const tax = Math.round((subtotal - discountAmount) * 0.05); // 5% GST
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + tax);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  // Smart Upsell Logic
  const hasSaree = cart.some(i => i.category === 'Sarees');
  const hasKurti = cart.some(i => i.category === 'Kurtis');

  const upsellProducts = products.filter(p => {
    if (hasSaree) return p.category === 'Jewellery' || p.category === 'Handbags' || p.category === 'Dupattas';
    if (hasKurti) return p.category === 'Dupattas' || p.category === 'Jewellery';
    return p.featured;
  }).slice(0, 3);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-[#FAF6F0] rounded-full border border-[#E8DFD5] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 text-[#4A0E17]" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-[#222222]">YOUR BAG IS WAITING</h2>
          <p className="text-xs text-[#222222]/60">Explore our handcrafted Indian sarees, kurtis, and jewellery.</p>
        </div>
        <button
          onClick={() => onNavigate('/shop')}
          className="px-8 py-3.5 bg-[#4A0E17] hover:bg-[#6B1724] text-[#FAF6F0] text-xs font-bold tracking-[0.2em] uppercase rounded shadow cursor-pointer"
        >
          EXPLORE BOUTIQUE COLLECTION
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title & Free Shipping Bar */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#222222]">SHOPPING BAG ({cart.length} ITEMS)</h1>
        
        {/* Free Shipping Progress Indicator */}
        <div className="mt-4 p-4 bg-[#FAF6F0] rounded border border-[#E8DFD5] flex items-center gap-3">
          <Gift className="w-5 h-5 text-[#C5A059] shrink-0" />
          <div className="flex-1 text-xs">
            {isFreeShipping ? (
              <span className="font-bold text-emerald-800">
                Congratulations! You qualify for FREE EXPRESS SHIPPING across India.
              </span>
            ) : (
              <span>
                Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more to unlock <strong>FREE SHIPPING</strong>!
              </span>
            )}
            <div className="w-full bg-[#E8DFD5] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#4A0E17] h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Cart Items (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, idx) => (
            <div
              key={`${item.id}-${item.color}-${item.size}-${idx}`}
              className="p-4 sm:p-5 bg-white border border-[#E8DFD5] rounded flex gap-4 sm:gap-6 items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded bg-[#FAF6F0] shrink-0"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">{item.category}</span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#222222] truncate">{item.name}</h3>
                
                <div className="text-xs text-[#222222]/60 space-x-3">
                  <span>Color: <strong>{item.color}</strong></span>
                  <span>Size: <strong>{item.size}</strong></span>
                </div>

                <div className="font-bold text-sm sm:text-base text-[#4A0E17] pt-1">
                  {formatPrice(item.price)}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center border border-[#E8DFD5] rounded bg-[#FAF6F0]/50">
                    <button
                      onClick={() => updateCartQty(idx, item.quantity - 1)}
                      className="p-1.5 text-[#222222] hover:bg-[#E8DFD5] cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-[#222222]">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQty(idx, item.quantity + 1)}
                      className="p-1.5 text-[#222222] hover:bg-[#E8DFD5] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(idx)}
                    className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>

              {/* Item Total */}
              <div className="text-right font-serif font-bold text-base text-[#222222] hidden sm:block">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}

          {/* Smart Cart Upsell Section */}
          {upsellProducts.length > 0 && (
            <div className="bg-[#FAF6F0] p-6 rounded border border-[#E8DFD5] space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#222222] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                {hasSaree ? 'COMPLETE YOUR LOOK WITH PAIRING JEWELLERY & POTLIS' : 'RECOMMENDED PAIRINGS'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {upsellProducts.map(up => (
                  <div key={up.id} className="bg-white p-3 rounded border border-[#E8DFD5] flex flex-col justify-between">
                    <div className="flex gap-3 items-center mb-2">
                      <img src={up.images[0]} alt={up.name} className="w-12 h-16 object-cover rounded" />
                      <div className="min-w-0">
                        <p className="font-serif font-bold text-xs text-[#222222] truncate">{up.name}</p>
                        <p className="text-xs font-bold text-[#4A0E17]">{formatPrice(up.price)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(up)}
                      className="w-full py-1.5 bg-[#4A0E17] hover:bg-[#6B1724] text-white text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer"
                    >
                      + ADD PAIRING
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Summary & Checkout (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded border border-[#E8DFD5] shadow-xs space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#222222] pb-3 border-b border-[#E8DFD5]">ORDER SUMMARY</h3>

            {/* Coupon Application Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#222222] uppercase tracking-wider block">PROMO / COUPON CODE</label>
              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2 font-bold">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>COUPON {appliedCoupon.code} APPLIED</span>
                  </div>
                  <button onClick={removeCoupon} className="text-[11px] font-bold text-rose-700 hover:underline cursor-pointer">
                    REMOVE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. AAVANI10, WELCOME500"
                    className="flex-1 px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17] uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4A0E17] text-white text-xs font-bold uppercase rounded cursor-pointer"
                  >
                    APPLY
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
              <p className="text-[10px] text-[#222222]/50 italic">Try code <strong>AAVANI10</strong> or <strong>WELCOME500</strong> for demo discount.</p>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 text-xs border-t border-[#E8DFD5] pt-4 text-[#222222]/80">
              <div className="flex justify-between">
                <span>Bag Subtotal</span>
                <span className="font-bold text-[#222222]">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-bold text-[#222222]">{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-bold text-[#222222]">{formatPrice(tax)}</span>
              </div>

              <div className="flex justify-between text-base font-serif font-bold text-[#4A0E17] border-t border-[#E8DFD5] pt-3">
                <span>TOTAL AMOUNT</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => onNavigate('/checkout')}
              className="w-full py-4 bg-[#4A0E17] hover:bg-[#6B1724] text-[#FAF6F0] text-xs font-bold tracking-[0.2em] uppercase rounded shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
