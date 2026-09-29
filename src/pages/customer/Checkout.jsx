import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';
import { ShieldCheck, Truck, CreditCard, CheckCircle2, ArrowRight, Lock } from 'lucide-react';

export default function Checkout({ onNavigate, setCompletedOrder }) {
  const { cart, appliedCoupon, placeOrder } = useApp();

  // Form State
  const [formData, setFormData] = useState({
    name: 'Ananya Reddy',
    email: 'ananya.reddy@example.com',
    phone: '+91 98490 12345',
    house: 'Plot 42, Road No. 10',
    street: 'Jubilee Hills',
    area: 'Near Peddamma Temple',
    city: 'Hyderabad',
    state: 'Telangana',
    pin: '500033',
    landmark: 'Opp. Olive Bistro'
  });

  const [deliveryOption, setDeliveryOption] = useState('Standard');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount;
      }
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const shipping = subtotal >= 2999 ? 0 : 149;
  const tax = Math.round((subtotal - discount) * 0.05);
  const grandTotal = Math.max(0, subtotal - discount + shipping + tax);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const customerDetails = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.house}, ${formData.street}, ${formData.area}`,
      city: formData.city,
      state: formData.state,
      pin: formData.pin,
      landmark: formData.landmark
    };

    const newOrder = placeOrder(customerDetails, deliveryOption, paymentMethod);
    setCompletedOrder(newOrder);
    onNavigate('/order-success');
  };

  if (cart.length === 0) {
    onNavigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-6">
        <div>
          <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">SECURE BOUTIQUE CHECKOUT</span>
          <h1 className="font-serif text-3xl font-bold text-[#222222]">FINALISE YOUR ORDER</h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
          <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Input Form Sections (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Step 1: Contact Information */}
          <div className="bg-white p-6 rounded border border-[#E8DFD5] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#222222] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A0E17] text-[#FAF6F0] text-xs flex items-center justify-center font-sans font-bold">1</span>
              CONTACT DETAILS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#222222] mb-1">FULL NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#222222] mb-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#222222] mb-1">MOBILE NUMBER</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Address */}
          <div className="bg-white p-6 rounded border border-[#E8DFD5] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#222222] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A0E17] text-[#FAF6F0] text-xs flex items-center justify-center font-sans font-bold">2</span>
              DELIVERY ADDRESS (INDIA)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#222222] mb-1">FLAT / HOUSE NO. / BUILDING</label>
                <input
                  type="text"
                  required
                  value={formData.house}
                  onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#222222] mb-1">STREET / ROAD NAME</label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#222222] mb-1">AREA / LOCALITY</label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#222222] mb-1">CITY</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#222222] mb-1">STATE</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#222222] mb-1">PIN CODE</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={formData.pin}
                  onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#222222] mb-1">LANDMARK (OPTIONAL)</label>
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD5] rounded focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Delivery Speed */}
          <div className="bg-white p-6 rounded border border-[#E8DFD5] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#222222] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A0E17] text-[#FAF6F0] text-xs flex items-center justify-center font-sans font-bold">3</span>
              DELIVERY OPTION
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`p-4 border rounded cursor-pointer flex items-start gap-3 ${deliveryOption === 'Standard' ? 'border-[#4A0E17] bg-[#FAF6F0]/50' : 'border-[#E8DFD5]'}`}>
                <input type="radio" name="delivery" checked={deliveryOption === 'Standard'} onChange={() => setDeliveryOption('Standard')} className="mt-1" />
                <div>
                  <p className="font-serif font-bold text-sm text-[#222222]">Standard Courier (3–5 Days)</p>
                  <p className="text-xs text-[#222222]/60 mt-0.5">Insured express delivery across India.</p>
                </div>
              </label>

              <label className={`p-4 border rounded cursor-pointer flex items-start gap-3 ${deliveryOption === 'Express' ? 'border-[#4A0E17] bg-[#FAF6F0]/50' : 'border-[#E8DFD5]'}`}>
                <input type="radio" name="delivery" checked={deliveryOption === 'Express'} onChange={() => setDeliveryOption('Express')} className="mt-1" />
                <div>
                  <p className="font-serif font-bold text-sm text-[#222222]">Priority Air Express (1–2 Days)</p>
                  <p className="text-xs text-[#222222]/60 mt-0.5">Recommended for immediate wedding schedules.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Step 4: Payment Method */}
          <div className="bg-white p-6 rounded border border-[#E8DFD5] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#222222] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A0E17] text-[#FAF6F0] text-xs flex items-center justify-center font-sans font-bold">4</span>
              PAYMENT METHOD
            </h3>
            <div className="space-y-3">
              <label className={`p-4 border rounded cursor-pointer flex items-center justify-between ${paymentMethod === 'UPI' ? 'border-[#4A0E17] bg-[#FAF6F0]/50' : 'border-[#E8DFD5]'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} />
                  <div>
                    <p className="font-serif font-bold text-sm text-[#222222]">UPI (Google Pay, PhonePe, Paytm, BHIM)</p>
                    <p className="text-xs text-[#222222]/60">Instant payment verification</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#C5A059]">RECOMMENDED</span>
              </label>

              <label className={`p-4 border rounded cursor-pointer flex items-center justify-between ${paymentMethod === 'Card' ? 'border-[#4A0E17] bg-[#FAF6F0]/50' : 'border-[#E8DFD5]'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'Card'} onChange={() => setPaymentMethod('Card')} />
                  <div>
                    <p className="font-serif font-bold text-sm text-[#222222]">Credit / Debit Card</p>
                    <p className="text-xs text-[#222222]/60">Visa, Mastercard, RuPay, Amex</p>
                  </div>
                </div>
              </label>

              <label className={`p-4 border rounded cursor-pointer flex items-center justify-between ${paymentMethod === 'COD' ? 'border-[#4A0E17] bg-[#FAF6F0]/50' : 'border-[#E8DFD5]'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                  <div>
                    <p className="font-serif font-bold text-sm text-[#222222]">Cash on Delivery (COD)</p>
                    <p className="text-xs text-[#222222]/60">Pay cash upon parcel delivery</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right: Order Summary & Place Order CTA (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded border border-[#E8DFD5] shadow-xs space-y-6 sticky top-28">
            <h3 className="font-serif text-xl font-bold text-[#222222] pb-3 border-b border-[#E8DFD5]">ITEMS IN ORDER</h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 items-center text-xs">
                  <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded bg-[#FAF6F0]" />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold text-[#222222] truncate">{item.name}</p>
                    <p className="text-[#222222]/60">Qty: {item.quantity} · {item.color}</p>
                    <p className="font-bold text-[#4A0E17] mt-0.5">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs border-t border-[#E8DFD5] pt-4 text-[#222222]/80">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-[#222222]">{formatPrice(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-emerald-700 font-bold"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between"><span>Shipping</span><span className="font-bold text-[#222222]">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
              <div className="flex justify-between"><span>GST Tax (5%)</span><span className="font-bold text-[#222222]">{formatPrice(tax)}</span></div>
              <div className="flex justify-between text-base font-serif font-bold text-[#4A0E17] border-t border-[#E8DFD5] pt-3">
                <span>TOTAL</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#4A0E17] hover:bg-[#6B1724] text-[#FAF6F0] text-xs font-bold tracking-[0.2em] uppercase rounded shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>PLACE DEMO ORDER</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059]" />
            </button>
            <p className="text-[10px] text-center text-[#222222]/50 italic">
              Demonstration order — no actual currency is charged.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
}
