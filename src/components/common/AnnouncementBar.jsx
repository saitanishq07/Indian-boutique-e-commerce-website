import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-[#4A0E17] text-[#FAF6F0] py-2 px-4 text-xs tracking-wider uppercase flex items-center justify-between font-medium border-b border-[#6B1724]">
      <div className="flex-1 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>FREE SHIPPING ABOVE ₹2,999 | EASY RETURNS | COD AVAILABLE</span>
        <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
      </div>
      <button 
        onClick={() => setDismissed(true)} 
        className="text-[#FAF6F0]/70 hover:text-white transition-colors p-1"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
