import React, { useState } from 'react';
import { X, Plus, Trash2, Sparkles, Gift, Check } from 'lucide-react';
import { CookieProduct } from '../types/cookie';
import { CookieVisual } from './CookieVisual';

interface BoxBuilderModalProps {
  products: CookieProduct[];
  isOpen: boolean;
  onClose: () => void;
  onAddBundleToCart: (bundleName: string, items: { cookie: CookieProduct; count: number }[], price: number, boxNote?: string) => void;
}

export const BoxBuilderModal: React.FC<BoxBuilderModalProps> = ({
  products,
  isOpen,
  onClose,
  onAddBundleToCart,
}) => {
  if (!isOpen) return null;

  const [boxSize, setBoxSize] = useState<number>(5);
  const [selectedCookies, setSelectedCookies] = useState<CookieProduct[]>([]);
  const [greetingNote, setGreetingNote] = useState('');

  // Quick preset: Pre-fill with All-Star 5 (1 of each flavor)
  const handleSelectPreset5 = () => {
    setBoxSize(5);
    setSelectedCookies([...products]);
  };

  const handleAddCookieToBox = (cookie: CookieProduct) => {
    if (selectedCookies.length < boxSize) {
      setSelectedCookies([...selectedCookies, cookie]);
    }
  };

  const handleRemoveFromBox = (index: number) => {
    const updated = [...selectedCookies];
    updated.splice(index, 1);
    setSelectedCookies(updated);
  };

  const handleBoxSizeChange = (size: number) => {
    setBoxSize(size);
    if (selectedCookies.length > size) {
      setSelectedCookies(selectedCookies.slice(0, size));
    }
  };

  // Pricing math
  const rawTotal = selectedCookies.reduce((sum, c) => sum + c.price, 0);
  // Special combo discount: If 5 all-star or full box, discount applied
  const isAllStar5 = boxSize === 5 && selectedCookies.length === 5 && new Set(selectedCookies.map(c => c.id)).size === 5;
  const discount = isAllStar5 ? 3000 : selectedCookies.length >= 6 ? 4000 : 0;
  const finalPrice = Math.max(0, rawTotal - discount);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  const handleSaveAndAddToCart = () => {
    if (selectedCookies.length === 0) return;

    // Group items
    const groupedMap = new Map<string, { cookie: CookieProduct; count: number }>();
    selectedCookies.forEach((c) => {
      const existing = groupedMap.get(c.id);
      if (existing) {
        existing.count += 1;
      } else {
        groupedMap.set(c.id, { cookie: c, count: 1 });
      }
    });

    const items = Array.from(groupedMap.values());
    const name = isAllStar5
      ? 'Box of 5 (All-Star Taster Pack)'
      : `Custom Box of ${boxSize} (${selectedCookies.length} pcs)`;

    onAddBundleToCart(name, items, finalPrice, greetingNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
                Build Your Own Cookie Box
              </h2>
              <p className="text-xs text-stone-500">
                Pilih kombinasi rasa favoritmu atau kirimkan sebagai hadiah manis
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Step 1: Select Box Size & Presets */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                1. Pilih Ukuran Box
              </span>
              <button
                onClick={handleSelectPreset5}
                className="text-xs font-bold text-[#2C5282] hover:text-[#1E3A8A] flex items-center gap-1 cursor-pointer underline"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Pilih Otomatis: 5 Varian Lengkap (Hemat Rp 3.000)</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { size: 4, label: 'Box of 4', desc: 'Personal snack box' },
                { size: 5, label: 'Box of 5 (All-Star)', desc: '1 dari tiap varian', tag: 'Paling Populer' },
                { size: 6, label: 'Box of 6', desc: 'Pesta & Sharing (Hemat 4K)' },
              ].map((b) => (
                <button
                  key={b.size}
                  onClick={() => handleBoxSizeChange(b.size)}
                  className={`p-3 text-left rounded-2xl border transition-all cursor-pointer ${
                    boxSize === b.size
                      ? 'border-[#2C5282] bg-blue-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-stone-900">{b.label}</span>
                    {boxSize === b.size && <Check className="w-4 h-4 text-[#2C5282]" />}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">{b.desc}</div>
                  {b.tag && (
                    <span className="inline-block mt-1 text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                      {b.tag}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Box Container Slots */}
          <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border-2 border-dashed border-amber-900/20">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-stone-700">
                Isi Box ({selectedCookies.length} dari {boxSize} terisi)
              </span>
              {selectedCookies.length > 0 && (
                <button
                  onClick={() => setSelectedCookies([])}
                  className="text-stone-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Kosongkan</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {Array.from({ length: boxSize }).map((_, idx) => {
                const cookie = selectedCookies[idx];
                return (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-xl bg-white border border-stone-200 shadow-inner flex flex-col items-center justify-center p-2 group"
                  >
                    {cookie ? (
                      <>
                        <CookieVisual category={cookie.category} size="sm" />
                        <span className="text-[10px] font-bold text-stone-800 truncate w-full text-center mt-1">
                          {cookie.name}
                        </span>
                        <button
                          onClick={() => handleRemoveFromBox(idx)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center shadow hover:bg-rose-600 cursor-pointer"
                          title="Hapus slot"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center text-stone-300 flex flex-col items-center">
                        <Plus className="w-5 h-5 mb-1" />
                        <span className="text-[10px] font-medium text-stone-400">Slot #{idx + 1}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Cookie Flavors */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              2. Klik Varian Rasa untuk Memasukkan ke Box
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {products.map((p) => {
                const countInBox = selectedCookies.filter((c) => c.id === p.id).length;
                const isFull = selectedCookies.length >= boxSize;

                return (
                  <button
                    key={p.id}
                    disabled={isFull}
                    onClick={() => handleAddCookieToBox(p)}
                    className={`relative p-3 rounded-xl border text-center transition-all flex flex-col items-center ${
                      isFull
                        ? 'opacity-60 bg-stone-100 border-stone-200 cursor-not-allowed'
                        : 'bg-white hover:bg-amber-50/50 hover:border-amber-400 border-stone-200 cursor-pointer active:scale-95 shadow-xs'
                    }`}
                  >
                    {countInBox > 0 && (
                      <span className="absolute top-1 right-1 w-5 h-5 bg-[#2C5282] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                        {countInBox}
                      </span>
                    )}
                    <CookieVisual category={p.category} size="sm" />
                    <span className="mt-2 text-xs font-bold text-stone-900 block truncate w-full">
                      {p.name}
                    </span>
                    <span className="text-[11px] font-extrabold text-amber-700">
                      {formatRupiah(p.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Gift Message Card */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
              <span>Kartu Ucapan / Pesan Hadiah (Opsional, Free!):</span>
            </label>
            <input
              type="text"
              value={greetingNote}
              onChange={(e) => setGreetingNote(e.target.value)}
              placeholder="Contoh: Happy Birthday Sarah! Semoga suka cookies dari Maw ya :)"
              className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C5282] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 sm:p-6 bg-white border-t border-stone-200 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-stone-500">
              Total {selectedCookies.length} pcs
              {discount > 0 && (
                <span className="ml-1 text-emerald-600 font-semibold">(Hemat {formatRupiah(discount)})</span>
              )}
            </div>
            <div className="text-xl font-black text-stone-900 tabular-nums">
              {formatRupiah(finalPrice)}
            </div>
          </div>

          <button
            disabled={selectedCookies.length === 0}
            onClick={handleSaveAndAddToCart}
            className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer ${
              selectedCookies.length === 0
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-[#2C5282] hover:bg-[#1E3A8A] text-white'
            }`}
          >
            <span>Masukkan Box ke Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  );
};
