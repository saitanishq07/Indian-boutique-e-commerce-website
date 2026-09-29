import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice, formatDate } from '../../utils/formatters';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  AlertTriangle, 
  Clock, 
  ArrowUpRight, 
  ChevronRight,
  Eye,
  CheckCircle,
  BarChart3
} from 'lucide-react';

export default function DashboardOverview({ onNavigate }) {
  const { products, orders, customers } = useApp();
  const [chartPeriod, setChartPeriod] = useState('30Days');

  // Realistic mock data calculations
  const totalSales = 842650 + orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = 284 + orders.length;
  const totalCustomersCount = 1426 + customers.length;
  const totalProductsCount = products.length;
  const lowStockCount = products.filter(p => p.stock <= (p.lowStockThreshold || 5)).length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Confirmed').length;

  // Chart dataset based on period
  const chartData = {
    '7Days': [
      { day: 'Mon', sales: 42000, orders: 12 },
      { day: 'Tue', sales: 58000, orders: 18 },
      { day: 'Wed', sales: 34000, orders: 9 },
      { day: 'Thu', sales: 72000, orders: 24 },
      { day: 'Fri', sales: 89000, orders: 31 },
      { day: 'Sat', sales: 115000, orders: 42 },
      { day: 'Sun', sales: 98000, orders: 36 }
    ],
    '30Days': [
      { day: 'Week 1', sales: 185000, orders: 62 },
      { day: 'Week 2', sales: 210000, orders: 74 },
      { day: 'Week 3', sales: 245000, orders: 88 },
      { day: 'Week 4', sales: 202650, orders: 60 }
    ],
    '3Months': [
      { day: 'July', sales: 720000, orders: 240 },
      { day: 'August', sales: 810000, orders: 275 },
      { day: 'September', sales: 842650, orders: 284 }
    ],
    '1Year': [
      { day: 'Q1', sales: 1850000, orders: 620 },
      { day: 'Q2', sales: 2200000, orders: 780 },
      { day: 'Q3', sales: 2542650, orders: 890 },
      { day: 'Q4', sales: 3100000, orders: 1120 }
    ]
  };

  const currentChart = chartData[chartPeriod] || chartData['30Days'];
  const maxSale = Math.max(...currentChart.map(c => c.sales));

  const categoryBreakdown = [
    { name: 'Sarees', share: 45, color: '#4A0E17' },
    { name: 'Kurtis', share: 22, color: '#C85A32' },
    { name: 'Lehengas', share: 18, color: '#C5A059' },
    { name: 'Salwar Sets', share: 10, color: '#163319' },
    { name: 'Jewellery', share: 5, color: '#1E3F66' }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Welcome */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">Good morning, Admin</h1>
          <p className="text-xs text-slate-500 mt-0.5">Here is your AAVANI Hyderabad boutique business performance overview.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/admin/products/new')}
            className="px-4 py-2 bg-[#4A0E17] hover:bg-[#6B1724] text-white text-xs font-bold tracking-wider uppercase rounded shadow cursor-pointer"
          >
            + ADD PRODUCT
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">TOTAL SALES</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-slate-900">{formatPrice(totalSales)}</p>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +14.2% vs last month
          </span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">ORDERS</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-slate-900">{totalOrdersCount}</p>
          <span className="text-[10px] text-slate-500">Total demo orders</span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">CUSTOMERS</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-slate-900">{totalCustomersCount.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-emerald-600 font-bold">+28 new this week</span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">PRODUCTS</span>
            <Package className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-slate-900">{totalProductsCount}</p>
          <span className="text-[10px] text-slate-500">Active catalog</span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">LOW STOCK</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-amber-700">{lowStockCount}</p>
          <span className="text-[10px] text-amber-700 font-bold">Requires reorder</span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">PENDING ORDERS</span>
            <Clock className="w-4 h-4 text-rose-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-rose-700">{pendingOrdersCount}</p>
          <span className="text-[10px] text-rose-700 font-bold">Awaiting packing</span>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sales Performance Bar Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">REVENUE & SALES PERFORMANCE</h3>
              <p className="text-xs text-slate-500">Gross revenue generated across boutique channels.</p>
            </div>

            {/* Period Selector */}
            <div className="flex bg-slate-100 p-1 rounded-md text-xs font-medium">
              {[
                { id: '7Days', label: '7 Days' },
                { id: '30Days', label: '30 Days' },
                { id: '3Months', label: '3 Months' },
                { id: '1Year', label: '1 Year' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setChartPeriod(p.id)}
                  className={`px-3 py-1 rounded transition-all cursor-pointer ${
                    chartPeriod === p.id ? 'bg-white text-[#4A0E17] font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-4 pt-4 border-b border-slate-100 px-2">
            {currentChart.map((item, idx) => {
              const heightPercent = Math.max(15, Math.round((item.sales / maxSale) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] font-bold text-[#4A0E17] opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatPrice(item.sales)}
                  </div>
                  <div
                    className="w-full bg-[#4A0E17] hover:bg-[#6B1724] rounded-t transition-all duration-500 relative cursor-pointer"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[11px] text-slate-600 font-semibold">{item.day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Average Order Value (AOV): <strong>₹4,890</strong></span>
            <span>Conversion Rate: <strong>3.4%</strong></span>
          </div>
        </div>

        {/* Sales by Category (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900">SALES BY CATEGORY</h3>
            <p className="text-xs text-slate-500">Revenue contribution per product category.</p>
          </div>

          <div className="space-y-4">
            {categoryBreakdown.map(cat => (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-800">
                  <span>{cat.name}</span>
                  <span>{cat.share}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.share}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top Products & Recent Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Top Products Table (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-slate-900">TOP SELLING CREATIONS</h3>
            <button onClick={() => onNavigate('/admin/products')} className="text-xs font-bold text-[#4A0E17] hover:underline cursor-pointer">
              VIEW ALL
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase">
                  <th className="py-2">Product</th>
                  <th className="py-2">Units Sold</th>
                  <th className="py-2">Revenue</th>
                  <th className="py-2">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                {products.slice(0, 5).map(prod => (
                  <tr key={prod.id} className="hover:bg-slate-50">
                    <td className="py-3 flex items-center gap-2">
                      <img src={prod.images[0]} alt={prod.name} className="w-8 h-10 object-cover rounded" />
                      <span className="font-semibold line-clamp-1">{prod.name}</span>
                    </td>
                    <td className="py-3 font-bold">42</td>
                    <td className="py-3 font-bold text-[#4A0E17]">{formatPrice(prod.price * 42)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        prod.stock <= 5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {prod.stock} in stock
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders Table (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-slate-900">RECENT ORDERS</h3>
            <button onClick={() => onNavigate('/admin/orders')} className="text-xs font-bold text-[#4A0E17] hover:underline cursor-pointer">
              MANAGE ORDERS
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase">
                  <th className="py-2">Order ID</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Status</th>
                  <th className="py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                {orders.slice(0, 5).map(ord => (
                  <tr key={ord.id} className="hover:bg-slate-50">
                    <td className="py-3 font-bold font-mono text-[#4A0E17]">{ord.id}</td>
                    <td className="py-3">{ord.customer.name}</td>
                    <td className="py-3 font-bold">{formatPrice(ord.total)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                        ord.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => onNavigate(`/admin/orders?id=${ord.id}`)}
                        className="p-1 text-slate-600 hover:text-[#4A0E17] cursor-pointer"
                        title="View Order Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
