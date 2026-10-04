import React from 'react';
import { ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
import { MawLogo } from './MawLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBoxBuilder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenBoxBuilder,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-amber-900/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2 group transition-transform active:scale-95">
          <MawLogo size="md" />
        </a>

        {/* Zone 2: Navigation Links (single-line clean typography with hover underlines) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
          <a href="#menu" className="hover:text-amber-900 transition-colors hover:underline underline-offset-4 decoration-amber-500/40">
            Daftar Varian
          </a>
          <button
            onClick={onOpenBoxBuilder}
            className="flex items-center gap-1.5 hover:text-amber-900 transition-colors hover:underline underline-offset-4 decoration-amber-500/40 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Paket Box</span>
          </button>
          <a href="#tasting-guide" className="hover:text-amber-900 transition-colors hover:underline underline-offset-4 decoration-amber-500/40">
            Cara Menikmati
          </a>
          <a href="#reviews" className="hover:text-amber-900 transition-colors hover:underline underline-offset-4 decoration-amber-500/40">
            Ulasan
          </a>
          <a href="#contact" className="hover:text-amber-900 transition-colors hover:underline underline-offset-4 decoration-amber-500/40">
            Kontak & Lokasi
          </a>
        </nav>

        {/* Zone 3: Primary Actions (Cart + Quick WhatsApp) */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/6281234567890?text=Halo%20Oh%20Maw%20Cookies,%20saya%20ingin%20tanya%20varian%20cookies%20fresh%20hari%20ini"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200/60"
            title="Chat WhatsApp Maw Cookies"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-[#2C5282] hover:bg-[#1E3A8A] text-white rounded-xl font-medium text-xs sm:text-sm shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
            aria-label="Keranjang Belanja"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Keranjang</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center bg-amber-400 text-stone-900 text-[11px] font-bold h-5 min-w-[20px] px-1 rounded-full tabular-nums shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
