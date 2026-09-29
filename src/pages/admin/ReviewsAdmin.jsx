import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Check, EyeOff, Trash2 } from 'lucide-react';

export default function ReviewsAdmin() {
  const { reviews, moderateReview } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">REVIEW MODERATION</h1>
        <p className="text-xs text-slate-500 mt-0.5">Approve or hide customer product reviews before displaying on storefront.</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <th className="p-4">Customer</th>
                <th className="p-4">Product</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Review Content</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Moderate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {reviews.map(rev => (
                <tr key={rev.id} className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">{rev.customerName}</td>
                  <td className="p-4 text-slate-700">{rev.productName}</td>
                  <td className="p-4 font-bold text-amber-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {rev.rating} / 5
                  </td>
                  <td className="p-4 text-slate-600 max-w-xs">{rev.review}</td>
                  <td className="p-4 text-slate-500">{rev.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      rev.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {rev.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => moderateReview(rev.id, 'Published')}
                      className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold uppercase hover:bg-emerald-700 cursor-pointer"
                    >
                      APPROVE
                    </button>
                    <button
                      onClick={() => moderateReview(rev.id, 'Hidden')}
                      className="px-2.5 py-1 bg-slate-200 text-slate-700 rounded text-[10px] font-bold uppercase hover:bg-slate-300 cursor-pointer"
                    >
                      HIDE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
