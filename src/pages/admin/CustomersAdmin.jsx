import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';
import { Search, User, Mail, Phone, MapPin, Award } from 'lucide-react';

export default function CustomersAdmin() {
  const { customers } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">CUSTOMER MANAGEMENT</h1>
          <p className="text-xs text-slate-500 mt-0.5">Directory of registered boutique clients and purchase history.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers by name, email, or mobile..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded focus:outline-none focus:border-[#4A0E17]"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Location</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4">Tier Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {filteredCustomers.map(cust => (
                <tr key={cust.id} className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">{cust.name}</td>
                  <td className="p-4 text-slate-600">{cust.email}<br />{cust.phone}</td>
                  <td className="p-4 text-slate-600">{cust.location}</td>
                  <td className="p-4 font-bold">{cust.ordersCount} orders</td>
                  <td className="p-4 font-bold text-[#4A0E17]">{formatPrice(cust.totalSpent)}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 uppercase">
                      {cust.status || 'Active'}
                    </span>
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
