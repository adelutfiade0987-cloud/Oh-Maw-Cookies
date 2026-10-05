import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, ArrowRight, Eye, EyeOff } from 'lucide-react';
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
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate secret owner PIN: MCookies 223
    if (pin.trim() === OWNER_CONFIG.adminPin) {
      setError(null);
      setPin('');
      onSuccess();
    } else {
      setError('PIN Akses Owner tidak sesuai. Akses hanya untuk pemilik.');
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
            Akses Khusus Owner
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Halaman ini khusus untuk pemilik Oh Maw Cookies untuk melihat laporan penjualan, mengunduh data rekap, dan kelola pesanan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              PIN Rahasia Owner
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type={showPin ? 'text' : 'password'}
                autoFocus
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(null);
                }}
                placeholder="Masukkan PIN Owner..."
                className="w-full pl-10 pr-10 py-2.5 text-center text-sm font-semibold tracking-wider bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C5282]"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 cursor-pointer"
                title={showPin ? 'Sembunyikan' : 'Tampilkan'}
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-[11px] text-rose-600 mt-1.5 text-center font-medium bg-rose-50 p-1.5 rounded-lg border border-rose-200">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#2C5282] hover:bg-[#1E3A8A] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Buka Dashboard Owner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Autentikasi Terenkripsi · Maw Cookies</span>
        </div>
      </div>
    </div>
  );
};
