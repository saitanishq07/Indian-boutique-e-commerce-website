import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';
import { BarChart3, TrendingUp, Download, Calendar, DollarSign, Package } from 'lucide-react';

export default function ReportsAdmin() {
  const { orders, products, customers } = useApp();
  const [reportPeriod, setReportPeriod] = useState('This Month');

  const totalRevenue = 842650 + orders.reduce((a, b) => a + b.total, 0);
  const totalOrders = 284 + orders.length;
  const aov = Math.round(totalRevenue / totalOrders);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">REPORTS & BUSINESS ANALYTICS</h1>
          <p className="text-xs text-slate-500 mt-0.5">Executive financial performance reports, sales trends, and inventory audit logs.</p>
        </div>

        <button
          onClick={() => alert('Simulating export of financial CSV report...')}
          className="px-4 py-2 bg-slate-900 text-white text-xs font-bold uppercase rounded flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#C5A059]" /> EXPORT REPORT (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-2">
          <span className="text-slate-500 font-bold uppercase">GROSS REVENUE</span>
          <p className="font-serif text-3xl font-bold text-slate-900">{formatPrice(totalRevenue)}</p>
          <span className="text-emerald-600 font-bold">+16.4% YoY Growth</span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-2">
          <span className="text-slate-500 font-bold uppercase">TOTAL FULFILLED ORDERS</span>
          <p className="font-serif text-3xl font-bold text-slate-900">{totalOrders}</p>
          <span className="text-blue-600 font-bold">98.2% On-time delivery rate</span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-2">
          <span className="text-slate-500 font-bold uppercase">AVERAGE ORDER VALUE (AOV)</span>
          <p className="font-serif text-3xl font-bold text-slate-900">{formatPrice(aov)}</p>
          <span className="text-purple-600 font-bold">Premium boutique benchmark</span>
        </div>
      </div>
    </div>
  );
}
