import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag, Check } from 'lucide-react';
import { CartItem } from '../types/cookie';
import { CookieVisual } from './CookieVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  discount: number;
  onApplyCoupon: (code: string) => boolean;
  appliedCoupon: string | null;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discount,
  onApplyCoupon,
  appliedCoupon,
  onRemoveCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const total = Math.max(0, subtotal - discount);

  // Free delivery subsidy milestone (Free shipping promo threshold at 50K)
  const subsidyThreshold = 50000;
  const subsidyProgress = Math.min(100, (subtotal / subsidyThreshold) * 100);
  const remainingForSubsidy = Math.max(0, subsidyThreshold - subtotal);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;
    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (!success) {
      setCouponError('Kode voucher tidak valid. Coba: MAWCHUNKY');
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#2C5282]" />
              <h2 className="text-lg font-bold text-stone-900">
                Keranjang Belanja ({items.reduce((acc, it) => acc + it.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/50 transition-colors cursor-pointer"
              aria-label="Tutup keranjang"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Subsidy Progress */}
          {items.length > 0 && (
            <div className="bg-amber-50 px-5 py-3 border-b border-amber-200/60 text-xs">
              <div className="flex items-center justify-between mb-1.5 font-medium text-amber-900">
                <span>
                  {remainingForSubsidy === 0 ? (
                    <strong className="text-emerald-700">🎉 Selamat! Kamu dapat subsidi ongkir!</strong>
                  ) : (
                    <>
                      Tambah <strong>{formatRupiah(remainingForSubsidy)}</strong> lagi untuk gratis ongkir
                    </>
                  )}
                </span>
                <span className="font-bold tabular-nums">{Math.round(subsidyProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-amber-200/70 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-600 rounded-full transition-all duration-300"
                  style={{ width: `${subsidyProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 text-stone-300" />
                </div>
                <p className="text-base font-bold text-stone-700">Keranjangmu masih kosong</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Aroma cookies yang baru keluar dari oven menunggumu. Pilih varian favoritmu sekarang!
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Lihat Menu Cookies
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/70 group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-white rounded-xl border border-stone-200/80 flex items-center justify-center shrink-0 p-1">
                    {item.type === 'single' && item.product ? (
                      <CookieVisual category={item.product.category} size="sm" />
                    ) : (
                      <div className="text-xl">🎁</div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-stone-900 truncate">
                          {item.type === 'single' ? item.product?.name : item.bundleConfig?.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-500 p-0.5 transition-colors cursor-pointer"
                          title="Hapus item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.type === 'bundle' && item.bundleConfig && (
                        <div className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                          {item.bundleConfig.items.map((i) => `${i.count}x ${i.cookie.name}`).join(', ')}
                        </div>
                      )}

                      <div className="text-xs font-extrabold text-[#2C5282] mt-1 tabular-nums">
                        {formatRupiah(item.unitPrice)}
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/50">
                      <div className="flex items-center bg-white rounded-lg p-0.5 border border-stone-200">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center rounded text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-[11px] font-bold text-stone-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center rounded text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-bold text-stone-900 tabular-nums">
                        {formatRupiah(item.unitPrice * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-stone-200 space-y-4">
              {/* Promo code box */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Voucher {appliedCoupon} aktif (-{formatRupiah(discount)})</span>
                    </div>
                    <button
                      onClick={onRemoveCoupon}
                      className="text-[11px] text-rose-600 hover:underline font-semibold cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Kupon promo (e.g. MAWCHUNKY)"
                        className="w-full pl-8 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2C5282] uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Pakai
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[10px] text-rose-600 mt-1">{couponError}</p>}
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal Produk</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{formatRupiah(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Diskon Promo</span>
                    <span className="tabular-nums">-{formatRupiah(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
                  <span>Total Belanja</span>
                  <span className="text-base text-[#2C5282] tabular-nums">{formatRupiah(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-[#2C5282] hover:bg-[#1E3A8A] text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
