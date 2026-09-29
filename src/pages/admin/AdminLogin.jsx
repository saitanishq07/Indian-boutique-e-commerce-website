import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLogin({ onNavigate }) {
  const { adminLogin } = useApp();
  const [email, setEmail] = useState('admin@aavani.example');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const success = adminLogin(email, password);
    if (success) {
      onNavigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials. Use admin@aavani.example / Admin@123');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1E293B] rounded-xl shadow-2xl border border-slate-700/60 p-8 space-y-6">
        
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-[#4A0E17] text-[#C5A059] rounded-xl flex items-center justify-center mx-auto shadow-lg font-serif font-bold text-2xl border border-[#C5A059]/40">
            A
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-wider text-white">AAVANI ADMIN</h1>
          <p className="text-xs text-slate-400">Boutique Management & Executive Dashboard</p>
        </div>

        {/* Demo Credentials Alert */}
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> DEMO CREDENTIALS
          </p>
          <p>Email: <strong className="font-mono text-white">admin@aavani.example</strong></p>
          <p>Password: <strong className="font-mono text-white">Admin@123</strong></p>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 uppercase">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#0F172A] border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 uppercase">PASSWORD</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#0F172A] border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#4A0E17] hover:bg-[#6B1724] text-white text-xs font-bold tracking-widest uppercase rounded shadow transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#C5A059]/30"
          >
            <span>LOGIN TO DASHBOARD</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Back to Customer Storefront
          </button>
        </div>

      </div>
    </div>
  );
}
