import React, { useState } from 'react';
import { checkDeliveryPin } from '../../utils/formatters';
import { Truck, CheckCircle, AlertCircle } from 'lucide-react';

export default function PinCodeChecker() {
  const [pin, setPin] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!pin) return;
    const res = checkDeliveryPin(pin);
    setResult(res);
  };

  return (
    <div className="bg-white p-4 rounded-md border border-[#E8DFD5] space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#222222]">
        <Truck className="w-4 h-4 text-[#C5A059]" />
        <span>DELIVERY & COD AVAILABILITY</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, ''));
            setResult(null);
          }}
          placeholder="Enter 6-digit PIN code (e.g. 500033)"
          className="flex-1 px-3 py-2 text-xs border border-[#E8DFD5] rounded bg-[#FAF6F0]/50 focus:outline-none focus:border-[#4A0E17]"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#4A0E17] hover:bg-[#6B1724] text-[#FAF6F0] text-xs font-bold tracking-widest uppercase rounded transition-colors cursor-pointer"
        >
          CHECK
        </button>
      </form>

      {result && (
        <div className={`p-3 rounded text-xs leading-relaxed flex items-start gap-2.5 ${
          result.available ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-rose-50 border border-rose-200 text-rose-900'
        }`}>
          {result.available ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div>
            {result.available ? (
              <>
                <p className="font-semibold text-emerald-800">Delivery Available to {pin}</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Estimated Delivery: <strong>{result.estimatedDays}</strong> · Cash on Delivery Available.
                </p>
              </>
            ) : (
              <p>{result.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
