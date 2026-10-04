import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Flame, Zap, Shield, Check } from 'lucide-react';
import { CookieProduct } from '../types/cookie';
import { CookieVisual } from './CookieVisual';

interface CookieDetailModalProps {
  product: CookieProduct | null;
  quantityInCart: number;
  onClose: () => void;
  onAddToCart: (product: CookieProduct, quantity: number) => void;
}

export const CookieDetailModal: React.FC<CookieDetailModalProps> = ({
  product,
  quantityInCart,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState<'top' | 'cut'>('cut'); // Default to cut view to showcase the molten filling!

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Top Showcase Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#FAF7F2] p-6 rounded-2xl border border-amber-900/10">
            <div className="relative flex flex-col items-center">
              <CookieVisual category={product.category} view={viewMode} size="xl" />

              {/* View Switcher Controls */}
              <div className="mt-3 flex items-center gap-1.5 bg-white p-1 rounded-xl shadow-xs border border-stone-200">
                <button
                  type="button"
                  onClick={() => setViewMode('top')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'top' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Kuki Utuh
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('cut')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'cut' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Isian Meleleh (Lava Cut)
                </button>
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-stone-500">
                <span>OH MAW SIGNATURE</span>
                <span aria-hidden="true">·</span>
                <span>Fresh Bake</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
                {product.name}
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                {product.subtitle}
              </p>
              <div className="pt-2 text-2xl font-extrabold text-[#2C5282] tabular-nums">
                {formatRupiah(product.price)}
              </div>
            </div>
          </div>

          {/* Taste Characteristics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Profil Rasa & Tekstur
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                <div className="text-[11px] text-stone-500">Kemanisan</div>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full ${
                        level <= product.tasteProfile.sweetness ? 'bg-amber-500' : 'bg-stone-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                <div className="text-[11px] text-stone-500">Richness / Gurih</div>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full ${
                        level <= product.tasteProfile.richness ? 'bg-amber-600' : 'bg-stone-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                <div className="text-[11px] text-stone-500">Gooeyness / Lumer</div>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full ${
                        level <= product.tasteProfile.gooeyness ? 'bg-rose-500' : 'bg-stone-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Inside & Topping Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/60">
              <span className="font-bold text-amber-900 block mb-0.5">Isian Dalam (Inside):</span>
              <span className="text-stone-700">{product.insideFilling}</span>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-0.5">Topping Luar:</span>
              <span className="text-stone-700">{product.topping}</span>
            </div>
          </div>

          {/* Detailed Story */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-4">
            {product.description}
          </p>

          {/* Ingredients & Allergens */}
          <div className="text-xs space-y-1 text-stone-500 border-t border-stone-100 pt-4">
            <div>
              <strong className="text-stone-700">Komposisi Pilihan:</strong> {product.ingredients.join(', ')}.
            </div>
            <div>
              <strong className="text-stone-700">Informasi Alergen:</strong> Mengandung {product.allergens.join(', ')}.
            </div>
          </div>
        </div>

        {/* Purchase Module at Bottom of Modal */}
        <div className="sticky bottom-0 bg-white border-t border-stone-200 p-4 sm:p-6 flex items-center justify-between gap-4">
          <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center text-sm font-bold text-stone-900 tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2C5282] text-white hover:bg-[#1E3A8A] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-[#2C5282] hover:bg-[#1E3A8A] text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span>Tambah ke Keranjang · {formatRupiah(product.price * quantity)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
