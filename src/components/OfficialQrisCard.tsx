import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Download, ShieldCheck, Smartphone, CheckCircle2 } from 'lucide-react';
import { PAYMENT_CONFIG } from '../data/cookies';

interface OfficialQrisCardProps {
  amount?: number;
  className?: string;
  showInstructions?: boolean;
}

export const OfficialQrisCard: React.FC<OfficialQrisCardProps> = ({
  amount,
  className = '',
  showInstructions = true,
}) => {
  const [copiedNmid, setCopiedNmid] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCopyNmid = () => {
    navigator.clipboard.writeText(PAYMENT_CONFIG.qris.nmid);
    setCopiedNmid(true);
    setTimeout(() => setCopiedNmid(false), 2500);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Authentic QRIS Card Frame matching WhatsApp Image 2026-10-05 at 21.06.01 */}
      <div
        ref={cardRef}
        className="relative w-full max-w-[340px] sm:max-w-[360px] bg-white rounded-3xl shadow-xl border-2 border-stone-200 overflow-hidden text-stone-900 select-none"
      >
        {/* Top-Left Red Diagonal Accent */}
        <div className="absolute top-0 left-0 w-28 h-28 bg-[#DE2839] -translate-x-14 -translate-y-14 rotate-45 pointer-events-none" />

        {/* Bottom-Right Red Diagonal Accent */}
        <div className="absolute bottom-0 right-0 w-28 h-28 bg-[#DE2839] translate-x-14 translate-y-14 rotate-45 pointer-events-none" />

        {/* Card Header: QRIS & GPN Logos */}
        <div className="relative z-10 px-5 pt-5 pb-2 flex items-center justify-between">
          {/* QRIS Logo */}
          <div className="flex items-center gap-1.5">
            <div className="flex flex-col">
              <span className="font-display font-black tracking-tighter text-xl text-stone-900 leading-none">
                <span className="text-[#DE2839]">Q</span>RIS
              </span>
              <span className="text-[7.5px] font-bold text-stone-700 leading-tight uppercase tracking-tight mt-0.5">
                QR Code Standar<br />Pembayaran Nasional
              </span>
            </div>
          </div>

          {/* GPN Logo */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              {/* Red Eagle Silhouette */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#DE2839]" fill="currentColor">
                <path d="M12 2L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8L12 2Z" />
              </svg>
              <span className="font-black text-sm tracking-wider text-[#1E3A8A]">GPN</span>
            </div>
          </div>
        </div>

        {/* Merchant Identity */}
        <div className="relative z-10 px-5 pt-2 text-center">
          <h3 className="font-display font-black text-lg sm:text-xl tracking-tight text-stone-900 uppercase">
            {PAYMENT_CONFIG.qris.merchantName}
          </h3>
          <div className="text-[11px] font-mono text-stone-700 font-bold mt-0.5 flex items-center justify-center gap-1">
            <span>NMID: {PAYMENT_CONFIG.qris.nmid}</span>
          </div>
          <div className="text-[11px] font-mono text-stone-400 font-semibold">
            {PAYMENT_CONFIG.qris.terminal}
          </div>
        </div>

        {/* QR Code Container */}
        <div className="relative z-10 p-4 sm:p-5 flex flex-col items-center justify-center">
          <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-sm flex items-center justify-center">
            <QRCodeSVG
              value={PAYMENT_CONFIG.qris.qrPayload}
              size={210}
              level="H"
              marginSize={1}
              fgColor="#111827"
              bgColor="#FFFFFF"
            />
          </div>

          {amount && amount > 0 && (
            <div className="mt-2.5 text-center">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">
                Nominal Pembayaran
              </span>
              <span className="text-xl font-black text-[#2C5282] font-mono tabular-nums">
                {formatRupiah(amount)}
              </span>
            </div>
          )}
        </div>

        {/* Card Footer: ASPi & Print Info */}
        <div className="relative z-10 px-5 pb-5 pt-1 space-y-2 border-t border-stone-100 bg-stone-50/50">
          <div className="text-center">
            <div className="text-[10px] font-black tracking-wide text-stone-800 uppercase">
              SATU QRIS UNTUK SEMUA
            </div>
            <div className="text-[9px] text-stone-500">
              Cek aplikasi penyelenggara di: <span className="font-medium text-stone-700">{PAYMENT_CONFIG.qris.aspiUrl}</span>
            </div>
          </div>

          <div className="flex items-end justify-between pt-1 text-[8.5px] text-stone-400 font-mono">
            <div>
              <div>Dicetak oleh: {PAYMENT_CONFIG.qris.printedBy}</div>
              <div>Versi cetak: {PAYMENT_CONFIG.qris.printVersion}</div>
            </div>

            {/* Steps indicator */}
            <div className="text-right">
              <div className="text-[7.5px] font-semibold text-stone-600 mb-1">Cara pembayaran QRIS:</div>
              <div className="flex items-center gap-1.5 justify-end">
                <div className="w-5 h-5 rounded-full bg-[#DE2839] text-white flex items-center justify-center text-[8px] font-bold" title="1. Buka Aplikasi QRIS">
                  1
                </div>
                <span className="text-stone-300">›</span>
                <div className="w-5 h-5 rounded-full bg-[#DE2839] text-white flex items-center justify-center text-[8px] font-bold" title="2. Scan & Cek">
                  2
                </div>
                <span className="text-stone-300">›</span>
                <div className="w-5 h-5 rounded-full bg-[#DE2839] text-white flex items-center justify-center text-[8px] font-bold" title="3. Bayar">
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons below card */}
      <div className="mt-3.5 flex items-center gap-2">
        <button
          onClick={handleCopyNmid}
          className="px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
        >
          {copiedNmid ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-400" />}
          <span>{copiedNmid ? 'NMID Tersalin!' : 'Salin NMID'}</span>
        </button>

        <a
          href="https://aspi-qris.id"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl text-xs font-medium transition-colors"
        >
          Info Penyelenggara
        </a>
      </div>

      {showInstructions && (
        <p className="mt-2 text-[11px] text-stone-500 text-center max-w-xs">
          Bisa di-scan menggunakan <strong>BCA, BSI Mobile, GoPay, ShopeePay, OVO, Dana</strong>, atau m-banking apa saja.
        </p>
      )}
    </div>
  );
};
