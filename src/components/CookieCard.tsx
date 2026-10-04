import React, { useState } from 'react';
import { Plus, Minus, Eye, Sparkles } from 'lucide-react';
import { CookieProduct } from '../types/cookie';
import { CookieVisual } from './CookieVisual';

interface CookieCardProps {
  product: CookieProduct;
  quantityInCart: number;
  onAddToCart: (product: CookieProduct) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onOpenDetail: (product: CookieProduct) => void;
}

export const CookieCard: React.FC<CookieCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onOpenDetail,
}) => {
  const [viewMode, setViewMode] = useState<'top' | 'cut'>('top');

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Visual Header / Presentation Area */}
      <div className="relative aspect-square w-full bg-[#FAF7F2] p-6 flex items-center justify-center overflow-hidden border-b border-stone-100">
        {/* Subtle Status Label (Single text tag without pill nesting) */}
        <div className="absolute top-3 left-3 z-10">
          {product.isNew && (
            <span className="text-[11px] font-bold tracking-wider uppercase text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Varian Baru
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="text-[11px] font-bold tracking-wider uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Terfavorit
            </span>
          )}
        </div>

        {/* View Mode Switcher (Whole Cookie vs Molten Lava Core) */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-xs p-0.5 rounded-lg border border-stone-200 shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode('top')}
            className={`px-2 py-1 text-[10px] font-semibold rounded transition-colors cursor-pointer ${
              viewMode === 'top' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Tampilan Utuh"
          >
            Utuh
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cut')}
            className={`px-2 py-1 text-[10px] font-semibold rounded transition-colors cursor-pointer ${
              viewMode === 'cut' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Lihat Isian Lava Meleleh"
          >
            Lava Cut
          </button>
        </div>

        {/* Render Cookie Visual with active view */}
        <div
          onClick={() => onOpenDetail(product)}
          className="cursor-pointer transition-transform duration-200 group-hover:scale-105"
          title={`Lihat detail ${product.name}`}
        >
          <CookieVisual category={product.category} view={viewMode} size="lg" />
        </div>

        {/* Peek indicator when cut view is active */}
        {viewMode === 'cut' && (
          <div className="absolute bottom-2 inset-x-0 text-center">
            <span className="text-[10px] font-medium text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-full">
              ✨ {product.insideFilling}
            </span>
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Metadata: Category & Weight unboxed */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-stone-400">Maw Fresh Cookie</span>
            <span aria-hidden="true">·</span>
            <span>~{product.weightGrams}g</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onOpenDetail(product)}
            className="text-lg font-bold text-stone-900 hover:text-amber-800 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Subtitle / User description */}
          <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Action Module */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-semibold text-stone-400">Harga Satuan</div>
            <div className="text-base font-extrabold text-stone-900 tabular-nums">
              {formatRupiah(product.price)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDetail(product)}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Lihat Detail & Resep"
            >
              <Eye className="w-4 h-4" />
            </button>

            {quantityInCart === 0 ? (
              <button
                onClick={() => onAddToCart(product)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2C5282] hover:bg-[#1E3A8A] text-white text-xs font-semibold rounded-xl shadow-xs transition-transform active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Pesan</span>
              </button>
            ) : (
              <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200">
                <button
                  onClick={() => onUpdateQuantity(product.id, quantityInCart - 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-stone-700 hover:bg-stone-200 shadow-xs transition-colors cursor-pointer"
                  aria-label="Kurangi jumlah"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-xs font-bold text-stone-900 tabular-nums">
                  {quantityInCart}
                </span>
                <button
                  onClick={() => onUpdateQuantity(product.id, quantityInCart + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#2C5282] text-white hover:bg-[#1E3A8A] shadow-xs transition-colors cursor-pointer"
                  aria-label="Tambah jumlah"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
