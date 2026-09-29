import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';
import { Plus, Ticket, Edit2, Trash2, Check, X } from 'lucide-react';

export default function CouponsAdmin() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const [formData, setFormData] = useState({
    code: 'FESTIVE20',
    discountType: 'percentage',
    discountValue: 20,
    minOrder: 3999,
    maxDiscount: 2000,
    expiry: '2026-12-31',
    usageLimit: 500,
    status: 'Active'
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (editingCoupon) {
      updateCoupon(editingCoupon.id, formData);
    } else {
      addCoupon(formData);
    }
    setShowModal(false);
    setEditingCoupon(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">COUPON MANAGEMENT</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage promotional discount codes and cart checkout offers.</p>
        </div>
        <button
          onClick={() => { setEditingCoupon(null); setShowModal(true); }}
          className="px-5 py-2.5 bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#C5A059]" /> ADD NEW COUPON
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <th className="p-4">Coupon Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Min Order</th>
                <th className="p-4">Max Discount</th>
                <th className="p-4">Usage</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {coupons.map(coup => (
                <tr key={coup.id} className="hover:bg-slate-50/80">
                  <td className="p-4 font-mono font-bold text-base text-[#4A0E17]">{coup.code}</td>
                  <td className="p-4 font-bold">
                    {coup.discountType === 'percentage' ? `${coup.discountValue}% OFF` : `₹${coup.discountValue} OFF`}
                  </td>
                  <td className="p-4">{formatPrice(coup.minOrder)}</td>
                  <td className="p-4">{coup.maxDiscount ? formatPrice(coup.maxDiscount) : 'No limit'}</td>
                  <td className="p-4 text-slate-600">{coup.usageCount || 0} / {coup.usageLimit || '∞'}</td>
                  <td className="p-4 text-slate-600">{coup.expiry}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      coup.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {coup.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingCoupon(coup);
                        setFormData(coup);
                        setShowModal(true);
                      }}
                      className="p-1 text-slate-600 hover:text-[#4A0E17]"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteCoupon(coup.id)}
                      className="p-1 text-rose-600 hover:text-rose-800"
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

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
              {editingCoupon ? `EDIT COUPON: ${editingCoupon.code}` : 'CREATE PROMO COUPON'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase">COUPON CODE</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-slate-200 rounded font-mono font-bold text-sm uppercase focus:outline-none focus:border-[#4A0E17]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">TYPE</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">DISCOUNT VALUE</label>
                  <input
                    type="number"
                    required
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">MIN ORDER (₹)</label>
                  <input
                    type="number"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">EXPIRY DATE</label>
                  <input
                    type="date"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-300 rounded">CANCEL</button>
                <button type="submit" className="px-4 py-2 bg-[#4A0E17] text-white font-bold rounded">SAVE COUPON</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
