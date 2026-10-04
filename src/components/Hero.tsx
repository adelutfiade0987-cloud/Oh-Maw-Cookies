import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Flame } from 'lucide-react';
import { CookieProduct } from '../types/cookie';
import { CookieVisual } from './CookieVisual';

interface HeroProps {
  products: CookieProduct[];
  onSelectCookie: (cookie: CookieProduct) => void;
  onAddToCart: (cookie: CookieProduct) => void;
  onOpenBoxBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  products,
  onSelectCookie,
  onAddToCart,
  onOpenBoxBuilder,
}) => {
  const [activeTab, setActiveTab] = useState<'tray' | 'stack'>('tray');
  const [hoveredCookieId, setHoveredCookieId] = useState<string | null>(null);

  const hoveredCookie = products.find((p) => p.id === hoveredCookieId) || products[0];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-amber-900/10">
      {/* Warm bakery ambient lighting gradient */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/70 via-[#FAF7F2] to-[#FAF7F2]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Metadata trust indicator without pills */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wider uppercase">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Fresh From The Oven Daily</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>100% Pure Butter</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Halal Ingredients</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-stone-900 leading-[1.12] text-balance">
              Chunky, gooey, and{' '}
              <span className="text-[#2C5282] underline decoration-amber-400 decoration-wavy decoration-2">
                melt-in-your-mouth
              </span>{' '}
              artisan cookies.
            </h1>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Dibuat dengan butter premium dan isian cokelat melimpah. Nikmati sensasi lava meleleh dari varian legendaris{' '}
              <strong className="text-stone-900 font-semibold">Clasic</strong>,{' '}
              <strong className="text-[#0284C7] font-semibold">Kuki Monster</strong>,{' '}
              <strong className="text-[#DC2626] font-semibold">Red Velvet</strong>, hingga dua varian terbaru:{' '}
              <strong className="text-[#451A03] font-semibold">Double Choco</strong> dan{' '}
              <strong className="text-[#65A30D] font-semibold">Matcha</strong>.
            </p>

            {/* Value Points */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-xs text-stone-600 border-t border-amber-900/10">
              <div className="flex items-start gap-2">
                <Flame className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900">Ooey-Gooey</div>
                  <div className="text-[11px] text-stone-500">Inti cokelat lava lumer</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900">Tanpa Pengawet</div>
                  <div className="text-[11px] text-stone-500">Panggang segar tiap hari</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900">Mulai 7K</div>
                  <div className="text-[11px] text-stone-500">Harga ramah kantong</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-amber-600/20 transition-all duration-200 active:scale-95"
              >
                <span>Pilih Varian Cookies</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenBoxBuilder}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-stone-50 text-stone-800 rounded-xl font-semibold text-sm border border-stone-200 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Buat Custom Box</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase (Interactive Tray inspired by WA0046 & WA0043) */}
          <div className="lg:col-span-6">
            <div className="relative bg-stone-900/5 rounded-3xl p-4 sm:p-6 border border-stone-200 shadow-xl overflow-hidden backdrop-blur-sm">
              {/* Top View Toggle Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200/80">
                <div className="text-xs font-semibold text-stone-700">
                  {activeTab === 'tray' ? 'Baking Paper Tray View' : 'Signature Cookie Tower'}
                </div>

                <div className="flex items-center gap-1 bg-stone-200/70 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab('tray')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      activeTab === 'tray' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Baking Tray
                  </button>
                  <button
                    onClick={() => setActiveTab('stack')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      activeTab === 'stack' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Cookie Stack
                  </button>
                </div>
              </div>

              {/* Showcase Container */}
              {activeTab === 'tray' ? (
                /* Tray View: Recreating WA0046 parchment tray layout */
                <div className="relative mt-4 aspect-4/3 sm:aspect-16/11 bg-[#F5EFEB] rounded-2xl p-5 shadow-inner border border-amber-900/10 flex flex-col justify-between overflow-hidden">
                  {/* Parchment Paper Sheet */}
                  <div className="absolute inset-3 bg-[#FFFDF8] rounded-xl shadow-md border border-stone-200/60 -rotate-1 pointer-events-none" />

                  {/* Stamp & Notice */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                    <span className="font-semibold text-amber-800">OH MAW BAKERY OVEN #01</span>
                    <span>TAP COOKIE TO VIEW</span>
                  </div>

                  {/* 5 Cookies arranged just like user photo WA0046 */}
                  <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-4 my-auto items-center justify-items-center">
                    {/* Top Left: Matcha */}
                    <div
                      className="cursor-pointer text-center group"
                      onClick={() => onSelectCookie(products[4])}
                      onMouseEnter={() => setHoveredCookieId(products[4].id)}
                    >
                      <div className="relative">
                        <CookieVisual category="matcha" size="md" />
                        <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow">
                          NEW
                        </span>
                      </div>
                      <div className="mt-1 text-xs font-bold text-stone-800 group-hover:text-amber-800">Matcha · 9K</div>
                    </div>

                    {/* Center: Clasic */}
                    <div
                      className="cursor-pointer text-center group scale-105"
                      onClick={() => onSelectCookie(products[0])}
                      onMouseEnter={() => setHoveredCookieId(products[0].id)}
                    >
                      <div className="relative">
                        <CookieVisual category="clasic" size="md" />
                        <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow">
                          FAV
                        </span>
                      </div>
                      <div className="mt-1 text-xs font-bold text-stone-800 group-hover:text-amber-800">Clasic · 7K</div>
                    </div>

                    {/* Top Right: Red Velvet */}
                    <div
                      className="cursor-pointer text-center group"
                      onClick={() => onSelectCookie(products[2])}
                      onMouseEnter={() => setHoveredCookieId(products[2].id)}
                    >
                      <CookieVisual category="velvet" size="md" />
                      <div className="mt-1 text-xs font-bold text-stone-800 group-hover:text-amber-800">Red Velvet · 8K</div>
                    </div>

                    {/* Bottom Left: Double Choco */}
                    <div
                      className="cursor-pointer text-center group col-start-1"
                      onClick={() => onSelectCookie(products[3])}
                      onMouseEnter={() => setHoveredCookieId(products[3].id)}
                    >
                      <div className="relative">
                        <CookieVisual category="choco" size="md" />
                        <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow">
                          NEW
                        </span>
                      </div>
                      <div className="mt-1 text-xs font-bold text-stone-800 group-hover:text-amber-800">Double Choco · 8K</div>
                    </div>

                    {/* Bottom Center: Quick Add Active Cookie Button */}
                    <div className="text-center col-start-2">
                      <button
                        onClick={() => onAddToCart(hoveredCookie)}
                        className="px-3 py-1.5 bg-[#2C5282] hover:bg-[#1E3A8A] text-white text-xs font-bold rounded-lg shadow-sm transition-transform active:scale-95 whitespace-nowrap cursor-pointer"
                      >
                        + Tambah {hoveredCookie.name}
                      </button>
                    </div>

                    {/* Bottom Right: Kuki Monster */}
                    <div
                      className="cursor-pointer text-center group col-start-3"
                      onClick={() => onSelectCookie(products[1])}
                      onMouseEnter={() => setHoveredCookieId(products[1].id)}
                    >
                      <CookieVisual category="monster" size="md" />
                      <div className="mt-1 text-xs font-bold text-stone-800 group-hover:text-amber-800">Kuki Monster · 7K</div>
                    </div>
                  </div>

                  {/* Active cookie preview caption */}
                  <div className="relative z-10 bg-amber-50/90 rounded-lg px-3 py-2 border border-amber-200/60 text-xs flex items-center justify-between">
                    <span className="text-stone-700 truncate">
                      <strong className="text-stone-900">{hoveredCookie.name}</strong>: {hoveredCookie.subtitle}
                    </span>
                    <button
                      onClick={() => onSelectCookie(hoveredCookie)}
                      className="ml-2 text-amber-700 hover:text-amber-900 font-semibold shrink-0 underline cursor-pointer"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              ) : (
                /* Stack View: Recreating WA0043 cookie stack on saucer */
                <div className="relative mt-4 aspect-4/3 sm:aspect-16/11 bg-[#EAE4DC] rounded-2xl p-5 shadow-inner border border-stone-200 flex flex-col items-center justify-center overflow-hidden">
                  {/* Subtle tiled subway grid background */}
                  <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:32px_16px]" />

                  {/* Ceramic Saucer Plate at base */}
                  <div className="absolute bottom-6 w-52 sm:w-64 h-8 bg-white rounded-[50%] shadow-lg border-2 border-stone-300" />
                  <div className="absolute bottom-7 w-44 sm:w-56 h-4 bg-stone-100 rounded-[50%] border-t border-purple-800/10" />

                  {/* Stack of 5 cookies vertically stacked (Matcha at base, then Choco, Velvet, Clasic, Monster with Gorio on top) */}
                  <div className="relative z-10 flex flex-col-reverse items-center -space-y-12 sm:-space-y-14 mb-4">
                    {/* Base 1: Matcha */}
                    <div
                      onClick={() => onSelectCookie(products[4])}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      title="Matcha (9K)"
                    >
                      <CookieVisual category="matcha" size="md" />
                    </div>
                    {/* Level 2: Double Choco */}
                    <div
                      onClick={() => onSelectCookie(products[3])}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      title="Double Choco (8K)"
                    >
                      <CookieVisual category="choco" size="md" />
                    </div>
                    {/* Level 3: Red Velvet */}
                    <div
                      onClick={() => onSelectCookie(products[2])}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      title="Red Velvet (8K)"
                    >
                      <CookieVisual category="velvet" size="md" />
                    </div>
                    {/* Level 4: Clasic */}
                    <div
                      onClick={() => onSelectCookie(products[0])}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      title="Clasic (7K)"
                    >
                      <CookieVisual category="clasic" size="md" />
                    </div>
                    {/* Level 5: Kuki Monster with Oreo on top */}
                    <div
                      onClick={() => onSelectCookie(products[1])}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      title="Kuki Monster (7K)"
                    >
                      <CookieVisual category="monster" size="md" />
                    </div>
                  </div>

                  <span className="relative z-10 text-[11px] font-semibold text-stone-600 bg-white/80 px-2 py-0.5 rounded shadow-sm">
                    All 5 Signature Flavors Stacked
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
