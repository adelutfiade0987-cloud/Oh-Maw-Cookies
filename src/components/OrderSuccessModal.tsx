import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, Copy, Check, QrCode, Clock, Share2, ChefHat, Sparkles, MapPin } from 'lucide-react';
import { PlacedOrder } from '../types/cookie';
import { OWNER_CONFIG } from '../data/cookies';

interface OrderSuccessModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedBroadcast, setCopiedBroadcast] = useState(false);
  const [isPaidSimulated, setIsPaidSimulated] = useState(false);

  useEffect(() => {
    // Launch celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2C5282', '#FDE047', '#E11D48', '#65A30D', '#D97706'],
    });
  }, []);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Generate WhatsApp message broadcast string
  const itemsText = order.items
    .map((item, idx) => {
      const name = item.type === 'single' ? item.product?.name : item.bundleConfig?.name;
      return `${idx + 1}. ${name} (${item.quantity}x) = ${formatRupiah(item.unitPrice * item.quantity)}`;
    })
    .join('%0A');

  const waText =
    `🔔 *NOTIFIKASI / BROADCAST PESANAN BARU OH MAW COOKIES* 🔔%0A` +
    `--------------------------------------------------%0A` +
    `📋 *ID Pesanan:* %23${order.orderId}%0A` +
    `⏰ *Waktu Pemesanan:* ${encodeURIComponent(order.createdAt)}%0A%0A` +
    `👤 *DATA PEMESAN:*%0A` +
    `• Nama: ${encodeURIComponent(order.customer.customerName)}%0A` +
    `• WhatsApp: ${encodeURIComponent(order.customer.phoneNumber)}%0A` +
    `• Metode: ${order.customer.deliveryMethod === 'pickup' ? 'Ambil Sendiri di Kitchen' : 'Kurir Delivery'}%0A` +
    `• Alamat: ${encodeURIComponent(order.customer.address || OWNER_CONFIG.kitchenAddress)}%0A` +
    `• Jadwal Batch: ${encodeURIComponent(order.customer.deliveryDate)} - ${encodeURIComponent(order.customer.deliveryTimeSlot)}%0A%0A` +
    `🍪 *DETAIL VARIAN COOKIES:*%0A${itemsText}%0A%0A` +
    `💵 *RINCIAN PEMBAYARAN:*%0A` +
    `• Subtotal: ${formatRupiah(order.subtotal)}%0A` +
    (order.discount > 0 ? `• Diskon: -${formatRupiah(order.discount)}%0A` : '') +
    `• Ongkir: ${formatRupiah(order.deliveryFee)}%0A` +
    `• *TOTAL AKHIR: ${formatRupiah(order.total)}*%0A` +
    `• Metode Pembayaran: ${order.customer.paymentMethod.toUpperCase()}%0A` +
    (order.customer.notes ? `• Catatan: ${encodeURIComponent(order.customer.notes)}%0A` : '') +
    `--------------------------------------------------%0A` +
    `Kitchen: ${encodeURIComponent(OWNER_CONFIG.kitchenAddress)}%0A` +
    `Halo Owner Oh Maw Cookies (${OWNER_CONFIG.phoneDisplay}), pesanan saya ini sudah dibuat melalui website. Mohon dicek ya min, terima kasih!`;

  const waUrl = `https://wa.me/${OWNER_CONFIG.phoneWa}?text=${waText}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(label);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleCopyBroadcast = () => {
    const rawItems = order.items
      .map((it, idx) => {
        const name = it.type === 'single' ? it.product?.name : it.bundleConfig?.name;
        return `${idx + 1}. ${name} (${it.quantity}x) = ${formatRupiah(it.unitPrice * it.quantity)}`;
      })
      .join('\n');

    const rawText =
      `🔔 BROADCAST PESANAN BARU OH MAW COOKIES 🔔\n` +
      `No. Pesanan: #${order.orderId}\n` +
      `Waktu: ${order.createdAt}\n` +
      `Nama: ${order.customer.customerName} (${order.customer.phoneNumber})\n` +
      `Alamat: ${order.customer.address || OWNER_CONFIG.kitchenAddress}\n` +
      `Rincian Menu:\n${rawItems}\n` +
      `Total: ${formatRupiah(order.total)} (${order.customer.paymentMethod.toUpperCase()})\n` +
      `Kitchen: ${OWNER_CONFIG.kitchenAddress}`;

    navigator.clipboard.writeText(rawText);
    setCopiedBroadcast(true);
    setTimeout(() => setCopiedBroadcast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Success Banner */}
        <div className="bg-[#FAF7F2] p-6 text-center border-b border-stone-100">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Pesanan Berhasil Disimpan & Dibuatkan Broadcast
          </span>
          <h2 className="text-2xl font-display font-bold text-stone-900 mt-1">
            Pesanan #{order.orderId} Diterima!
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
            Terima kasih kak <strong className="text-stone-900">{order.customer.customerName}</strong>! Notifikasi broadcast pesanan ditujukan langsung ke WhatsApp Owner ({OWNER_CONFIG.phoneDisplay}).
          </p>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
          {/* WhatsApp Owner Callout */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-emerald-950 text-sm">WhatsApp Owner Dituju</div>
                <div className="text-[11px] text-emerald-800 font-mono">{OWNER_CONFIG.phoneDisplay}</div>
              </div>
            </div>

            <button
              onClick={handleCopyBroadcast}
              className="px-3 py-1.5 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copiedBroadcast ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBroadcast ? 'Tersalin' : 'Salin BC'}</span>
            </button>
          </div>

          {/* Kitchen Address Notice */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-600 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-800 block text-xs">Lokasi Kitchen & Pickup:</strong>
              <span>{OWNER_CONFIG.kitchenAddress}</span>
            </div>
          </div>

          {/* Live Order Tracker */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
            <div className="flex items-center justify-between mb-3 text-stone-700 font-semibold">
              <span className="flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-[#2C5282]" />
                Status Batch Hari Ini
              </span>
              <span className="text-[11px] text-amber-700 font-bold bg-amber-100/70 px-2 py-0.5 rounded">
                Sedang Dipanggang
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1 text-center">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#2C5282] text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <span className="text-[10px] font-bold text-stone-800 mt-1">Diterima</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold animate-pulse">
                  2
                </div>
                <span className="text-[10px] font-bold text-amber-900 mt-1">Oven Bake</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-[10px]">
                  3
                </div>
                <span className="text-[10px] text-stone-400 mt-1">Boxing</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-[10px]">
                  4
                </div>
                <span className="text-[10px] text-stone-400 mt-1">Antar/Ambil</span>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          {order.customer.paymentMethod === 'qris' && (
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-stone-200 text-center space-y-3">
              <div className="font-bold text-stone-900 flex items-center justify-center gap-1.5">
                <QrCode className="w-4 h-4 text-[#2C5282]" />
                <span>Pindai QRIS Resmi Oh Maw Cookies</span>
              </div>
              <div className="w-40 h-40 mx-auto bg-white p-3 rounded-xl border border-stone-300 shadow-sm flex flex-col items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-stone-900">
                  <path
                    fill="currentColor"
                    d="M0 0h35v35H0V0zm5 5v25h25V5H5zm5 5h15v15H10V10zm55-10h35v35H65V0zm5 5v25h25V5H70zm5 5h15v15H75V10zM0 65h35v35H0V65zm5 5v25h25V70H5zm5 5h15v15H10V75zm50-10h10v10H60V65zm25 0h15v10H85V65zm-15 15h15v10H70V80zm20 0h10v20H90V80zm-40 0h15v15H50V80zm10 15h15v5H60V95zm-20-50h10v10H40V45zm20 0h10v10H60V45zm-10 15h10v15H50V60z"
                  />
                </svg>
                <span className="text-[9px] font-mono text-stone-500 mt-1">NMID: ID1029384756</span>
              </div>
              <div className="text-base font-extrabold text-[#2C5282] tabular-nums">
                {formatRupiah(order.total)}
              </div>
              <p className="text-[11px] text-stone-500">
                Mendukung Gopay, ShopeePay, OVO, Dana, BCA Mobile & Semua Bank
              </p>
              {!isPaidSimulated ? (
                <button
                  type="button"
                  onClick={() => setIsPaidSimulated(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Saya Sudah Scan & Bayar
                </button>
              ) : (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <Check className="w-4 h-4" />
                  <span>Bukti bayar tersimpan!</span>
                </div>
              )}
            </div>
          )}

          {order.customer.paymentMethod === 'bank_transfer' && (
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <span className="font-bold text-stone-900 block">Nomor Rekening Pembayaran:</span>
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200">
                <div>
                  <div className="font-bold text-stone-900">BCA - 8405-1234-99</div>
                  <div className="text-[10px] text-stone-500">a.n. Oh Maw Cookies Bakery</div>
                </div>
                <button
                  onClick={() => copyToClipboard('8405123499', 'bca')}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs font-bold text-stone-700 flex items-center gap-1 cursor-pointer"
                >
                  {copiedAccount === 'bca' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAccount === 'bca' ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>

              <div className="text-right text-xs">
                Total Transfer: <strong className="text-sm text-[#2C5282]">{formatRupiah(order.total)}</strong>
              </div>
            </div>
          )}

          {order.customer.paymentMethod === 'cod' && (
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-amber-900 text-xs">
              💵 <strong>Cash on Delivery (COD):</strong> Mohon siapkan uang pas sebesar <strong>{formatRupiah(order.total)}</strong> saat kurir tiba di alamatmu.
            </div>
          )}

          {/* Itemized Receipt Details */}
          <div className="border border-stone-200 rounded-2xl p-4 bg-white space-y-2">
            <span className="font-bold text-stone-800 block text-xs">Ringkasan Menu Pesanan:</span>
            {order.items.map((it) => (
              <div key={it.id} className="flex justify-between text-stone-600 text-[11px]">
                <span>
                  {it.quantity}x {it.type === 'single' ? it.product?.name : it.bundleConfig?.name}
                </span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  {formatRupiah(it.unitPrice * it.quantity)}
                </span>
              </div>
            ))}
            <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-xs text-stone-900">
              <span>Total Akhir</span>
              <span className="text-sm text-[#2C5282] tabular-nums">{formatRupiah(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Kirim Broadcast ke WA Owner ({OWNER_CONFIG.phoneDisplay})</span>
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
