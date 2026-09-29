import React from 'react';
import { useApp } from '../../context/AppContext';
import { Image as ImageIcon, Plus } from 'lucide-react';

export default function BannersAdmin() {
  const { banners } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">HOMEPAGE BANNER MANAGEMENT</h1>
          <p className="text-xs text-slate-500 mt-0.5">Control hero banners, promotional subtitles, and campaign CTAs.</p>
        </div>
      </div>

      <div className="space-y-4">
        {banners.map(ban => (
          <div key={ban.id} className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-6">
            <img src={ban.image} alt={ban.title} className="w-full md:w-64 h-32 object-cover rounded bg-slate-100" />
            <div className="flex-1 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase">{ban.status}</span>
              <h3 className="font-serif font-bold text-xl text-slate-900">{ban.title}</h3>
              <p className="text-slate-600">{ban.subtitle}</p>
              <p className="font-mono text-slate-500">CTA: <strong>{ban.ctaText}</strong> → {ban.ctaLink}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
