import React from 'react';
import { useApp } from '../../context/AppContext';
import { FolderTree, Layers, Plus } from 'lucide-react';

export default function CategoriesAdmin() {
  const { categories } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">CATEGORY & COLLECTION MANAGEMENT</h1>
          <p className="text-xs text-slate-500 mt-0.5">Organize product categories, seasonal edits, and homepage collections.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs p-4 space-y-3">
            <img src={cat.image} alt={cat.name} className="w-full h-32 object-cover rounded bg-slate-100" />
            <div>
              <span className="text-[10px] font-bold text-[#C5A059] uppercase">{cat.count} PRODUCTS</span>
              <h3 className="font-serif font-bold text-lg text-slate-900">{cat.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
