import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#222222] text-[#FAF6F0] shadow-2xl rounded-sm border-l-4 border-[#C5A059] animate-bounce-short">
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
      {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
      <span className="text-sm font-medium tracking-wide">{toast.message}</span>
    </div>
  );
}
