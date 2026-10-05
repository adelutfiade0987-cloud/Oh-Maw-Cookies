import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Cookie,
  Wallet,
  Calendar,
  MessageCircle,
  Copy,
  Check,
  Eye,
  RefreshCw,
  Store,
  MapPin,
  Phone,
  FileSpreadsheet,
  ChevronRight,
  Filter,
  Download,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { PlacedOrder } from '../types/cookie';
import { OWNER_CONFIG, HISTORICAL_MONTHLY_SALES, MonthlySalesData } from '../data/cookies';
import { MawLogo } from './MawLogo';
import { CookieVisual } from './CookieVisual';

interface OwnerDashboardProps {
  orders: PlacedOrder[];
  onUpdateOrderStatus: (orderId: string, newStatus: PlacedOrder['status']) => void;
  onSwitchToBuyerMode: () => void;
  onLogout: () => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  orders,
  onUpdateOrderStatus,
  onSwitchToBuyerMode,
  onLogout,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-10');
  const [selectedOrderForBc, setSelectedOrderForBc] = useState<PlacedOrder | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const showDownloadNotice = (msg: string) => {
    setDownloadSuccessToast(msg);
    setTimeout(() => setDownloadSuccessToast(null), 3000);
  };

  // Format currency helper
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Compute live October statistics incorporating real customer orders
  const currentMonthData = HISTORICAL_MONTHLY_SALES.find((m) => m.monthKey === '2026-10')!;
  const newOrdersTotalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const newOrdersCount = orders.length;

  // Aggregate live cookies count from live orders
  let liveCookiesCount = 0;
  orders.forEach((o) => {
    o.items.forEach((it) => {
      if (it.type === 'single') {
        liveCookiesCount += it.quantity;
      } else if (it.type === 'bundle' && it.bundleConfig) {
        it.bundleConfig.items.forEach((b) => {
          liveCookiesCount += b.count * it.quantity;
        });
      }
    });
  });

  const liveMonthRevenue = currentMonthData.revenue + newOrdersTotalRevenue;
  const liveMonthBuyers = currentMonthData.buyersCount + newOrdersCount;
  const liveMonthCookies = currentMonthData.cookiesSold + liveCookiesCount;
  const averageOrderValue = Math.round(liveMonthRevenue / Math.max(1, liveMonthBuyers));

  // Max revenue for bar scaling
  const maxMonthlyRevenue = Math.max(...HISTORICAL_MONTHLY_SALES.map((m) => m.revenue), liveMonthRevenue);

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'all') return true;
    return o.status === statusFilter;
  });

  // Copy broadcast template
  const generateBroadcastText = (order: PlacedOrder) => {
    const itemsList = order.items
      .map((it, idx) => {
        const name = it.type === 'single' ? it.product?.name : it.bundleConfig?.name;
        return `${idx + 1}. ${name} (${it.quantity}x) = ${formatRupiah(it.unitPrice * it.quantity)}`;
      })
      .join('\n');

    return `🔔 *BROADCAST PESANAN RESMI OH MAW COOKIES* 🔔\n` +
      `--------------------------------------------------\n` +
      `📋 *ID Pesanan:* #${order.orderId}\n` +
      `⏰ *Waktu Pemesanan:* ${order.createdAt}\n\n` +
      `👤 *DATA PEMESAN:*\n` +
      `• Nama: ${order.customer.customerName}\n` +
      `• WhatsApp: ${order.customer.phoneNumber}\n` +
      `• Metode: ${order.customer.deliveryMethod === 'pickup' ? 'Ambil di Kitchen' : 'Kurir Delivery'}\n` +
      `• Alamat: ${order.customer.address || 'Ambil di Kitchen Jl Sungai Bambu 2B, Tg Priok'}\n` +
      `• Jadwal: ${order.customer.deliveryDate} - ${order.customer.deliveryTimeSlot}\n\n` +
      `🍪 *DETAIL VARIAN COOKIES:*\n${itemsList}\n\n` +
      `💵 *RINCIAN PEMBAYARAN:*\n` +
      `• Subtotal: ${formatRupiah(order.subtotal)}\n` +
      (order.discount > 0 ? `• Diskon: -${formatRupiah(order.discount)}\n` : '') +
      `• Ongkir: ${formatRupiah(order.deliveryFee)}\n` +
      `• *TOTAL PEMBAYARAN: ${formatRupiah(order.total)}*\n` +
      `• Pembayaran: ${order.customer.paymentMethod.toUpperCase()}\n` +
      (order.customer.notes ? `• Catatan: ${order.customer.notes}\n` : '') +
      `--------------------------------------------------\n` +
      `Diteruskan ke WhatsApp Owner: ${OWNER_CONFIG.phoneDisplay}\n` +
      `Kitchen: ${OWNER_CONFIG.kitchenAddress}`;
  };

  const copyBroadcastToClipboard = (order: PlacedOrder) => {
    const text = generateBroadcastText(order);
    navigator.clipboard.writeText(text);
    setCopiedOrderId(order.orderId);
    setTimeout(() => setCopiedOrderId(null), 2500);
  };

  // 1. Export Orders to CSV (Excel compatible with UTF-8 BOM)
  const handleDownloadOrdersCsv = () => {
    const headers = [
      'No Pesanan',
      'Waktu Pemesanan',
      'Nama Pemesan',
      'Nomor WhatsApp',
      'Metode Pengiriman',
      'Alamat Pengiriman',
      'Jadwal Batch',
      'Rincian Menu',
      'Subtotal (IDR)',
      'Diskon (IDR)',
      'Ongkir (IDR)',
      'Total Pembayaran (IDR)',
      'Metode Pembayaran',
      'Status Pesanan',
      'Catatan',
    ];

    const rows = orders.map((o) => {
      const itemsDetail = o.items
        .map((it) => {
          const name = it.type === 'single' ? it.product?.name : it.bundleConfig?.name;
          return `${it.quantity}x ${name}`;
        })
        .join('; ');

      const deliveryDesc = o.customer.deliveryMethod === 'pickup' ? 'Ambil di Kitchen' : 'Kurir Delivery';

      return [
        `"${o.orderId}"`,
        `"${o.createdAt}"`,
        `"${o.customer.customerName.replace(/"/g, '""')}"`,
        `"${o.customer.phoneNumber}"`,
        `"${deliveryDesc}"`,
        `"${(o.customer.address || OWNER_CONFIG.kitchenAddress).replace(/"/g, '""')}"`,
        `"${o.customer.deliveryDate} - ${o.customer.deliveryTimeSlot}"`,
        `"${itemsDetail.replace(/"/g, '""')}"`,
        o.subtotal,
        o.discount,
        o.deliveryFee,
        o.total,
        `"${o.customer.paymentMethod.toUpperCase()}"`,
        `"${o.status.toUpperCase()}"`,
        `"${(o.customer.notes || '-').replace(/"/g, '""')}"`,
      ].join(',');
    });

    // Add UTF-8 BOM \uFEFF for seamless Excel & Sheets opening
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Laporan_Penjualan_Maw_Cookies_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showDownloadNotice('✓ Laporan seluruh pesanan berhasil diunduh (Excel / CSV)!');
  };

  // 2. Export Monthly Sales Summary to CSV
  const handleDownloadMonthlySummaryCsv = () => {
    const headers = [
      'Periode Bulan',
      'Tahun',
      'Pemasukan Kotor (IDR)',
      'Jumlah Pembeli / Transaksi',
      'Cookies Terjual (Pcs)',
      'Rata-rata Order (AOV)',
      'Varian Paling Diminati',
    ];

    const rows = HISTORICAL_MONTHLY_SALES.map((m) => {
      const isCurrent = m.monthKey === '2026-10';
      const rev = isCurrent ? liveMonthRevenue : m.revenue;
      const buyers = isCurrent ? liveMonthBuyers : m.buyersCount;
      const cookies = isCurrent ? liveMonthCookies : m.cookiesSold;
      const aov = Math.round(rev / Math.max(1, buyers));

      return [
        `"${m.monthName}"`,
        m.year,
        rev,
        buyers,
        cookies,
        aov,
        `"${m.topFlavor}"`,
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Rekapitulasi_Bulanan_Maw_Cookies_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showDownloadNotice('✓ Rekapitulasi penjualan bulanan berhasil diunduh!');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-stone-900 pb-20">
      {/* Toast Notice for Download */}
      {downloadSuccessToast && (
        <div className="fixed top-20 right-4 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-stone-700 flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      {/* Top Bar for Owner Portal */}
      <header className="sticky top-0 z-30 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MawLogo size="md" />
            <div className="hidden sm:block h-5 w-px bg-stone-300 mx-1" />
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2C5282]">
                Owner Analytics & Order Portal
              </span>
              <span className="text-[11px] text-stone-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-400" />
                {OWNER_CONFIG.kitchenAddress}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download Sales Report Button in Header */}
            <button
              onClick={handleDownloadOrdersCsv}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Download Data Penjualan Lengkap (Format CSV/Excel)"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline">Download Hasil Penjualan</span>
              <span className="md:hidden">Unduh Data</span>
            </button>

            <button
              onClick={onSwitchToBuyerMode}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              <Store className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Lihat Toko (Mode Pembeli)</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3 py-2 text-xs font-medium text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Banner with Owner Info & Dispatch Target */}
        <div className="bg-[#2C5282] text-white rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SISTEM NOTIFIKASI & BROADCAST WHATSAPP AKTIF</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">
              Dashboard Penjualan Maw Cookies
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              Semua pesanan baru dari website otomatis dibuatkan format broadcast dan ditujukan ke WhatsApp Owner:{' '}
              <strong className="text-white underline">{OWNER_CONFIG.phoneDisplay}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-blue-900/40 p-3 rounded-2xl border border-blue-400/20 text-xs">
            <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[10px] text-blue-200 uppercase font-semibold">Tujuan Broadcast WA</div>
              <div className="font-bold text-white font-mono">{OWNER_CONFIG.phoneDisplay}</div>
            </div>
          </div>
        </div>

        {/* Section 1: KPI Metrics for Current Month (Oktober 2026) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Ringkasan Penjualan Bulan Ini (Oktober 2026)
              </h2>
              <p className="text-xs text-stone-500">
                Data terakumulasi otomatis dari data histori dan pesanan baru yang masuk
              </p>
            </div>
            <div className="text-xs text-stone-500 flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>Bulan Berjalan</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: Total Revenue */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Pemasukan Bulan Ini</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-stone-900 tabular-nums">
                {formatRupiah(liveMonthRevenue)}
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+9.3% vs September ({formatRupiah(HISTORICAL_MONTHLY_SALES[4].revenue)})</span>
              </div>
            </div>

            {/* Metric 2: Total Buyers */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Jumlah Pembeli</span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2C5282] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-stone-900 tabular-nums">
                {liveMonthBuyers} <span className="text-sm font-normal text-stone-500">Pelanggan</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-blue-700 font-semibold">
                <span>+{newOrdersCount} pembeli baru di sesi ini</span>
              </div>
            </div>

            {/* Metric 3: Total Cookies Sold */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Kuki Terjual</span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Cookie className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-stone-900 tabular-nums">
                {liveMonthCookies} <span className="text-sm font-normal text-stone-500">Pcs</span>
              </div>
              <div className="mt-2 text-[11px] text-stone-500">
                Paling laku: <strong className="text-stone-800">Matcha & Double Choco</strong>
              </div>
            </div>

            {/* Metric 4: Average Order Value */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between text-stone-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Rata-rata Order (AOV)</span>
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-stone-900 tabular-nums">
                {formatRupiah(averageOrderValue)}
              </div>
              <div className="mt-2 text-[11px] text-stone-500">
                Didominasi pembelian Box of 5 (All-Star)
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Grafik Penjualan Bulanan (Monthly Sales & Revenue Chart) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wider uppercase mb-1">
                <span>Grafik Performa Bulanan</span>
                <span aria-hidden="true">·</span>
                <span>Tahun 2026</span>
              </div>
              <h3 className="text-xl font-display font-bold text-stone-900">
                Tren Pemasukan & Jumlah Pembeli Per Bulan
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#2C5282] rounded-sm" />
                <span className="text-stone-600">Pemasukan (Rp)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-amber-400 rounded-full" />
                <span className="text-stone-600">Jumlah Pembeli</span>
              </div>
              <button
                onClick={handleDownloadMonthlySummaryCsv}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-xl font-semibold transition-colors cursor-pointer text-xs"
                title="Unduh Rekap Penjualan Bulanan (CSV)"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-700" />
                <span>Unduh Rekap Bulanan (.csv)</span>
              </button>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-4">
            <div className="grid grid-cols-6 gap-2 sm:gap-6 items-end h-64 border-b border-stone-200 pb-3">
              {HISTORICAL_MONTHLY_SALES.map((item) => {
                const isCurrent = item.monthKey === '2026-10';
                const revenueValue = isCurrent ? liveMonthRevenue : item.revenue;
                const buyersValue = isCurrent ? liveMonthBuyers : item.buyersCount;
                const heightPercent = Math.round((revenueValue / maxMonthlyRevenue) * 100);

                return (
                  <div key={item.monthKey} className="flex flex-col items-center h-full justify-end group">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 text-white text-[10px] p-2 rounded-lg absolute -translate-y-24 pointer-events-none z-20 text-center shadow-lg whitespace-nowrap">
                      <div className="font-bold">{item.monthName} 2026</div>
                      <div className="text-amber-300">{formatRupiah(revenueValue)}</div>
                      <div className="text-stone-300">{buyersValue} Pembeli</div>
                      <div className="text-[9px] text-stone-400">Favorit: {item.topFlavor}</div>
                    </div>

                    {/* Buyers badge above bar */}
                    <span className="text-[10px] sm:text-xs font-bold text-stone-700 mb-1 tabular-nums">
                      {buyersValue} org
                    </span>

                    {/* Bar element */}
                    <div className="w-full max-w-[48px] bg-stone-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-48">
                      <div
                        className={`w-full rounded-t-xl transition-all duration-500 ${
                          isCurrent
                            ? 'bg-[#2C5282] group-hover:bg-[#1E3A8A]'
                            : 'bg-stone-400 group-hover:bg-[#2C5282]'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    {/* Month Label */}
                    <span
                      className={`mt-2 text-xs font-semibold text-center truncate w-full ${
                        isCurrent ? 'text-[#2C5282] font-bold' : 'text-stone-500'
                      }`}
                    >
                      {item.monthName}
                    </span>

                    {/* Revenue below label */}
                    <span className="text-[10px] font-mono text-stone-500 tabular-nums hidden sm:block">
                      {Math.round(revenueValue / 1000)}k
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Comparison Analysis Table */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Rincian Tabel Riwayat Penjualan
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500">
                    <th className="py-2.5 font-semibold">Periode Bulan</th>
                    <th className="py-2.5 font-semibold text-right">Pemasukan Kotor</th>
                    <th className="py-2.5 font-semibold text-right">Jumlah Pembeli</th>
                    <th className="py-2.5 font-semibold text-right">Cookies Terjual</th>
                    <th className="py-2.5 font-semibold text-right">Varian Paling Diminati</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {HISTORICAL_MONTHLY_SALES.map((m) => {
                    const isOct = m.monthKey === '2026-10';
                    const rev = isOct ? liveMonthRevenue : m.revenue;
                    const buyers = isOct ? liveMonthBuyers : m.buyersCount;
                    const cookies = isOct ? liveMonthCookies : m.cookiesSold;

                    return (
                      <tr
                        key={m.monthKey}
                        className={`hover:bg-stone-50 ${isOct ? 'bg-amber-50/50 font-bold' : ''}`}
                      >
                        <td className="py-3 text-stone-900 flex items-center gap-1.5">
                          {isOct && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                          <span>{m.monthName} 2026</span>
                          {isOct && (
                            <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded">
                              Aktif
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-right font-mono tabular-nums text-stone-900">
                          {formatRupiah(rev)}
                        </td>
                        <td className="py-3 text-right font-mono tabular-nums text-stone-700">
                          {buyers} transaksi
                        </td>
                        <td className="py-3 text-right font-mono tabular-nums text-stone-700">
                          {cookies} pcs
                        </td>
                        <td className="py-3 text-right text-stone-600">
                          {m.topFlavor}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 3: Live Orders List & Broadcast Viewer */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Feed Pesanan Masuk ({filteredOrders.length})</span>
              </div>
              <h3 className="text-xl font-display font-bold text-stone-900">
                Kelola Pesanan & Format Broadcast WhatsApp
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleDownloadOrdersCsv}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/90 rounded-xl font-semibold transition-colors cursor-pointer text-xs"
                title="Unduh Seluruh Data Pesanan Masuk (Excel / CSV)"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>Unduh Data Pesanan (.csv)</span>
              </button>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl">
              {['all', 'received', 'baking', 'ready', 'completed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                    statusFilter === st
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {st === 'all'
                    ? 'Semua'
                    : st === 'received'
                    ? 'Diterima'
                    : st === 'baking'
                    ? 'Dipanggang'
                    : st === 'ready'
                    ? 'Siap'
                    : 'Selesai'}
                </button>
              ))}
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500">
                  <th className="py-3 px-2 font-semibold">ID & Waktu</th>
                  <th className="py-3 px-2 font-semibold">Nama & WA Pembeli</th>
                  <th className="py-3 px-2 font-semibold">Metode & Alamat</th>
                  <th className="py-3 px-2 font-semibold">Rincian Menu</th>
                  <th className="py-3 px-2 font-semibold text-right">Total Bayar</th>
                  <th className="py-3 px-2 font-semibold text-center">Status</th>
                  <th className="py-3 px-2 font-semibold text-right">Aksi Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-stone-400">
                      Tidak ada pesanan dengan filter ini.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const statusColors = {
                      received: 'bg-blue-50 text-blue-700 border-blue-200',
                      baking: 'bg-amber-50 text-amber-800 border-amber-200',
                      ready: 'bg-purple-50 text-purple-700 border-purple-200',
                      delivering: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                      completed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                    };

                    const waBuyerUrl = `https://wa.me/${order.customer.phoneNumber.replace(/\D/g, '')}?text=Halo%20kak%20${encodeURIComponent(order.customer.customerName)},%20kami%20dari%20Oh%20Maw%20Cookies%20mengenai%20pesanan%20%23${order.orderId}`;

                    return (
                      <tr key={order.orderId} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3.5 px-2">
                          <div className="font-bold text-stone-900 font-mono">#{order.orderId}</div>
                          <div className="text-[10px] text-stone-400">{order.createdAt}</div>
                        </td>

                        <td className="py-3.5 px-2">
                          <div className="font-bold text-stone-900">{order.customer.customerName}</div>
                          <a
                            href={waBuyerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-emerald-600 hover:text-emerald-700 font-mono flex items-center gap-1 mt-0.5"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>{order.customer.phoneNumber}</span>
                          </a>
                        </td>

                        <td className="py-3.5 px-2 max-w-[200px]">
                          <span className="font-semibold text-stone-800 block capitalize">
                            {order.customer.deliveryMethod === 'pickup' ? 'Ambil di Kitchen' : 'Kurir Delivery'}
                          </span>
                          <span className="text-[10px] text-stone-500 line-clamp-1">
                            {order.customer.address || OWNER_CONFIG.kitchenAddress}
                          </span>
                        </td>

                        <td className="py-3.5 px-2">
                          <div className="space-y-0.5">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="text-[11px] text-stone-700">
                                <strong className="tabular-nums">{it.quantity}x</strong>{' '}
                                {it.type === 'single' ? it.product?.name : it.bundleConfig?.name}
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="py-3.5 px-2 text-right">
                          <div className="font-extrabold text-[#2C5282] font-mono tabular-nums">
                            {formatRupiah(order.total)}
                          </div>
                          <div className="text-[10px] text-stone-400 uppercase">
                            {order.customer.paymentMethod}
                          </div>
                        </td>

                        <td className="py-3.5 px-2 text-center">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              onUpdateOrderStatus(order.orderId, e.target.value as PlacedOrder['status'])
                            }
                            className={`text-[10px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                              statusColors[order.status]
                            }`}
                          >
                            <option value="received">Diterima</option>
                            <option value="baking">Dipanggang</option>
                            <option value="ready">Siap Kirim</option>
                            <option value="completed">Selesai</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-2 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedOrderForBc(order)}
                              className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                              title="Lihat Format Broadcast"
                            >
                              <Eye className="w-3.5 h-3.5 text-stone-500" />
                              <span className="hidden sm:inline">Format BC</span>
                            </button>

                            <button
                              onClick={() => copyBroadcastToClipboard(order)}
                              className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg transition-colors cursor-pointer"
                              title="Salin Teks Broadcast Pesanan"
                            >
                              {copiedOrderId === order.orderId ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Broadcast Detail Modal */}
      {selectedOrderForBc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-[#FAF7F2]">
              <div>
                <h3 className="font-bold text-stone-900 text-base">
                  Format Broadcast Pesanan #{selectedOrderForBc.orderId}
                </h3>
                <p className="text-xs text-stone-500">
                  Format pesan yang dikirimkan ke WhatsApp Owner: {OWNER_CONFIG.phoneDisplay}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrderForBc(null)}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-full cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 font-mono text-xs whitespace-pre-wrap text-stone-800 leading-relaxed selection:bg-amber-200">
                {generateBroadcastText(selectedOrderForBc)}
              </div>
            </div>

            <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                onClick={() => copyBroadcastToClipboard(selectedOrderForBc)}
                className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedOrderId === selectedOrderForBc.orderId ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Teks Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Pesan Broadcast</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/${OWNER_CONFIG.phoneWa}?text=${encodeURIComponent(
                  generateBroadcastText(selectedOrderForBc)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Buka di WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
