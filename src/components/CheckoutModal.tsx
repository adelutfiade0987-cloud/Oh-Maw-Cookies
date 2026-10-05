import React, { useState } from 'react';
import { X, CheckCircle, Truck, Store, QrCode, CreditCard, Banknote, ShieldAlert, ArrowRight, MessageCircle } from 'lucide-react';
import { CartItem, OrderForm, PlacedOrder } from '../types/cookie';
import { OWNER_CONFIG } from '../data/cookies';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  onOrderSuccess: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<OrderForm>({
    customerName: '',
    phoneNumber: '',
    deliveryMethod: 'instant',
    address: '',
    deliveryDate: 'Hari Ini (Fresh Batch)',
    deliveryTimeSlot: 'Batch Siang (13:00 - 15:00)',
    giftCardMessage: '',
    paymentMethod: 'qris',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryFee =
    formData.deliveryMethod === 'pickup'
      ? 0
      : subtotal >= 50000
      ? 5000 // Subsidized
      : 12000;

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.customerName.trim()) {
      err.customerName = 'Nama pemesan wajib diisi';
    }
    if (!formData.phoneNumber.trim()) {
      err.phoneNumber = 'Nomor WhatsApp wajib diisi untuk konfirmasi pesanan';
    } else if (formData.phoneNumber.replace(/\D/g, '').length < 9) {
      err.phoneNumber = 'Nomor WhatsApp minimal 9 digit angka';
    }
    if (formData.deliveryMethod !== 'pickup' && !formData.address.trim()) {
      err.address = 'Alamat pengantaran wajib diisi';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newOrder: PlacedOrder = {
      orderId: `MAW-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      items,
      subtotal,
      discount,
      deliveryFee,
      total: grandTotal,
      customer: formData,
      status: 'received',
    };

    // Format broadcast for Owner WhatsApp
    const itemsList = items
      .map((it, idx) => {
        const name = it.type === 'single' ? it.product?.name : it.bundleConfig?.name;
        return `${idx + 1}. ${name} (${it.quantity}x) = ${formatRupiah(it.unitPrice * it.quantity)}`;
      })
      .join('%0A');

    const waText =
      `🔔 *NOTIFIKASI / BROADCAST PESANAN BARU OH MAW COOKIES* 🔔%0A` +
      `--------------------------------------------------%0A` +
      `📋 *ID Pesanan:* %23${newOrder.orderId}%0A` +
      `⏰ *Waktu Pemesanan:* ${newOrder.createdAt}%0A%0A` +
      `👤 *DATA PEMESAN:*%0A` +
      `• Nama: ${encodeURIComponent(formData.customerName)}%0A` +
      `• WhatsApp: ${encodeURIComponent(formData.phoneNumber)}%0A` +
      `• Metode: ${formData.deliveryMethod === 'pickup' ? 'Ambil Sendiri di Kitchen' : 'Kurir Delivery'}%0A` +
      `• Alamat: ${encodeURIComponent(formData.address || OWNER_CONFIG.kitchenAddress)}%0A` +
      `• Jadwal: ${encodeURIComponent(formData.deliveryDate)} - ${encodeURIComponent(formData.deliveryTimeSlot)}%0A%0A` +
      `🍪 *DETAIL VARIAN COOKIES:*%0A${itemsList}%0A%0A` +
      `💵 *RINCIAN PEMBAYARAN:*%0A` +
      `• Subtotal: ${formatRupiah(subtotal)}%0A` +
      (discount > 0 ? `• Diskon: -${formatRupiah(discount)}%0A` : '') +
      `• Ongkir: ${formatRupiah(deliveryFee)}%0A` +
      `• *TOTAL PEMBAYARAN: ${formatRupiah(grandTotal)}*%0A` +
      `• Metode Bayar: ${formData.paymentMethod.toUpperCase()}%0A` +
      (formData.notes ? `• Catatan: ${encodeURIComponent(formData.notes)}%0A` : '') +
      `--------------------------------------------------%0A` +
      `Halo Owner Maw Cookies (${OWNER_CONFIG.phoneDisplay}), saya ingin konfirmasi pesanan ini ya. Terima kasih!`;

    // Automatically trigger WhatsApp broadcast link to owner
    const waUrl = `https://wa.me/${OWNER_CONFIG.phoneWa}?text=${waText}`;
    window.open(waUrl, '_blank');

    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Broadcast Otomatis ke WhatsApp Owner ({OWNER_CONFIG.phoneDisplay})</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
              Checkout Pesanan Maw Cookies
            </h2>
            <p className="text-xs text-stone-500">
              Pesanan akan otomatis dirangkum dan diteruskan ke WhatsApp Owner untuk langsung diproses
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Section 1: Customer Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              1. Data Kontak Pemesan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="Contoh: Putri Ayuningtyas"
                  className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all ${
                    errors.customerName ? 'border-rose-500' : 'border-stone-200 focus:ring-2 focus:ring-[#2C5282]'
                  }`}
                />
                {errors.customerName && <p className="text-[10px] text-rose-600 mt-1">{errors.customerName}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Nomor WhatsApp Pemesan *
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="Contoh: 081234567890"
                  className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all ${
                    errors.phoneNumber ? 'border-rose-500' : 'border-stone-200 focus:ring-2 focus:ring-[#2C5282]'
                  }`}
                />
                {errors.phoneNumber && <p className="text-[10px] text-rose-600 mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Method */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              2. Metode Pengambilan / Pengiriman
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'instant' as const, label: 'Kurir Instan', desc: 'GoSend / GrabExpress (Fresh & Cepat)', icon: Truck },
                { id: 'sameday' as const, label: 'Paxel Sameday', desc: 'Aman dengan pendingin khusus', icon: Truck },
                { id: 'pickup' as const, label: 'Ambil di Kitchen', desc: 'Jl Sungai Bambu 2B, Tg Priok (Gratis)', icon: Store },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = formData.deliveryMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMethod: m.id })}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#2C5282] bg-blue-50/50 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-[#2C5282]' : 'text-stone-500'}`} />
                    <div className="text-xs font-bold text-stone-900">{m.label}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">{m.desc}</div>
                  </button>
                );
              })}
            </div>

            {formData.deliveryMethod !== 'pickup' ? (
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Alamat Lengkap Pengiriman *
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Contoh: Jl. Swasembada Timur No. 12, RT 02/05, Kebon Bawang, Tg Priok, Jakarta Utara"
                  className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-stone-50 focus:bg-white focus:outline-none transition-all ${
                    errors.address ? 'border-rose-500' : 'border-stone-200 focus:ring-2 focus:ring-[#2C5282]'
                  }`}
                />
                {errors.address && <p className="text-[10px] text-rose-600 mt-1">{errors.address}</p>}
              </div>
            ) : (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900">
                📍 <strong>Alamat Kitchen Maw Cookies:</strong> {OWNER_CONFIG.kitchenAddress} (Buka {OWNER_CONFIG.openingHours}). Cookies hangat akan disiapkan saat kamu tiba!
              </div>
            )}
          </div>

          {/* Section 3: Time Slot */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              3. Jadwal Batch Panggang & Pengiriman
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Pilihan Hari</label>
                <select
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C5282]"
                >
                  <option value="Hari Ini (Fresh Batch)">Hari Ini (Fresh Batch)</option>
                  <option value="Besok Pagi">Besok (Fresh Batch Pagi)</option>
                  <option value="Lusa">Lusa (Pre-Order)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Slot Waktu</label>
                <select
                  value={formData.deliveryTimeSlot}
                  onChange={(e) => setFormData({ ...formData, deliveryTimeSlot: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C5282]"
                >
                  <option value="Batch Siang (13:00 - 15:00)">Batch Siang (13:00 - 15:00 WIB)</option>
                  <option value="Batch Sore (16:00 - 18:00)">Batch Sore (16:00 - 18:00 WIB)</option>
                  <option value="Batch Pagi Besok (10:00 - 12:00)">Batch Pagi (10:00 - 12:00 WIB)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Payment Method */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              4. Metode Pembayaran
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'qris' as const, label: 'QRIS Instant', desc: 'Gopay/OVO/BCA/Dana', icon: QrCode },
                { id: 'bank_transfer' as const, label: 'Transfer Bank', desc: 'BCA / Mandiri', icon: CreditCard },
                { id: 'cod' as const, label: 'COD (Bayar di Tempat)', desc: 'Tunai saat kurir tiba', icon: Banknote },
              ].map((p) => {
                const Icon = p.icon;
                const isSelected = formData.paymentMethod === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: p.id })}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#2C5282] bg-blue-50/50 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-[#2C5282]' : 'text-stone-500'}`} />
                    <div className="text-xs font-bold text-stone-900">{p.label}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">{p.desc}</div>
                  </button>
                );
              })}
            </div>

            {formData.paymentMethod === 'qris' && (
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-center gap-3">
                <QrCode className="w-8 h-8 text-[#2C5282] shrink-0" />
                <div>
                  <div className="font-bold text-stone-900">QRIS Dinamis Otomatis</div>
                  <div className="text-[11px] text-stone-500">Kode QRIS akan langsung muncul di layar setelah klik konfirmasi pesanan.</div>
                </div>
              </div>
            )}
          </div>

          {/* Optional Note */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Catatan Pesanan Tambahan (Opsional)
            </label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Contoh: Tolong bungkus terpisah / kirim jangan kena hujan"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none"
            />
          </div>
        </form>

        {/* Modal Footer with Grand Total & WA action indicator */}
        <div className="p-4 sm:p-6 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-between sm:block">
            <div className="text-xs text-stone-500">
              Total Pembayaran (Termasuk Ongkir: {formatRupiah(deliveryFee)})
            </div>
            <div className="text-2xl font-black text-[#2C5282] tabular-nums">
              {formatRupiah(grandTotal)}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Kirim Broadcast ke WA Owner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
