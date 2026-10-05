import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';
import { OWNER_CONFIG } from '../data/cookies';

interface OwnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const OwnerAuthModal: React.FC<OwnerAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === OWNER_CONFIG.adminPin || pin.trim().toLowerCase() === 'mawcookies') {
      setError(null);
      onSuccess();
    } else {
      setError('PIN tidak valid. Gunakan PIN default: 1234');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden p-6 sm:p-7">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 bg-amber-100 text-amber-900 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-display font-bold text-stone-900">
            Portal Khusus Owner
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Masukkan PIN keamanan untuk melihat grafik penjualan, laporan bulanan, dan kelola pesanan masuk.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              PIN / Sandi Owner
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="password"
                maxLength={10}
                autoFocus
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(null);
                }}
                placeholder="Masukkan PIN (Default: 1234)"
                className="w-full pl-10 pr-3.5 py-2.5 text-center text-sm tracking-widest bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C5282]"
              />
            </div>
            {error ? (
              <p className="text-[11px] text-rose-600 mt-1.5 text-center font-medium">{error}</p>
            ) : (
              <p className="text-[11px] text-stone-400 mt-1.5 text-center">
                PIN default: <span className="font-mono font-bold text-stone-600">1234</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#2C5282] hover:bg-[#1E3A8A] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Masuk ke Dashboard Owner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Akses Terproteksi · Maw Cookies Internal</span>
        </div>
      </div>
    </div>
  );
};
