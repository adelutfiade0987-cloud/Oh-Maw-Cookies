import React, { useState } from 'react';
import { Zap, Flame, Coffee, Sparkles, Thermometer, ShieldCheck } from 'lucide-react';
import { WARMING_TIPS } from '../data/cookies';
import { CookieVisual } from './CookieVisual';

export const WarmingGuide: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState(0);

  return (
    <section id="tasting-guide" className="py-16 sm:py-20 bg-[#F5EFEB] border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* Metadata unboxed text */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-800 tracking-wider uppercase mb-2">
            <span>The Ooey-Gooey Secret</span>
            <span aria-hidden="true">·</span>
            <span>Melted Lava Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900">
            Cara Menikmati Sensasi Lava Lumer
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Oh Maw Cookies dipanggang dengan teknik khusus sehingga bagian dalam tetap lembut dan lumer. Hangatkan sebentar sebelum dinikmati untuk pengalaman terbaik!
          </p>
        </div>

        {/* Interactive Method Tabs & Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
          {/* Left Column: 3 Heating Methods */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Pilih Alat Pemanas di Rumahmu
            </h3>

            <div className="space-y-3">
              {WARMING_TIPS.map((tip, idx) => {
                const isSelected = activeMethod === idx;
                const Icon = idx === 0 ? Zap : idx === 1 ? Flame : Coffee;

                return (
                  <div
                    key={tip.method}
                    onClick={() => setActiveMethod(idx)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#2C5282] bg-blue-50/40 shadow-xs ring-1 ring-[#2C5282]'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-[#2C5282] text-white' : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                            {tip.method}
                          </h4>
                          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                            ⏱️ {tip.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-2.5 text-xs text-stone-600 leading-relaxed pl-13">
                      {tip.instruction}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Storage Tips */}
            <div className="pt-4 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <span className="font-bold text-stone-800 block">Suhu Ruang</span>
                <span className="text-[11px] text-stone-500">Tahan 5 - 7 Hari</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <span className="font-bold text-stone-800 block">Kulkas / Chiller</span>
                <span className="text-[11px] text-stone-500">Tahan s/d 14 Hari</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl">
                <span className="font-bold text-stone-800 block">Freezer Beku</span>
                <span className="text-[11px] text-stone-500">Tahan s/d 1 Bulan</span>
              </div>
            </div>
          </div>

          {/* Right Column: Molten Cross Section Demonstration */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#FAF7F2] rounded-2xl border border-amber-900/10 text-center">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Hasil Setelah Dihangatkan
            </span>

            {/* Visual of melted cookie cut */}
            <div className="my-4 relative">
              <CookieVisual category="velvet" view="cut" size="xl" />
              {/* Steaming warm hint */}
              <div className="absolute -top-4 inset-x-0 flex justify-center gap-2 text-amber-400 opacity-70 animate-bounce">
                <span>♨️</span>
                <span>♨️</span>
              </div>
            </div>

            <p className="text-xs font-semibold text-stone-700">
              Red Velvet dengan Molten Cream Cheese Lava
            </p>
            <p className="text-[11px] text-stone-500 mt-1 max-w-xs">
              Isian cream cheese dan chocolate lava akan meleleh sempurna berpadu adonan butter yang lembut!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
