import React from 'react';
import { MapPin, Phone, Instagram, Clock, Heart } from 'lucide-react';
import { MawLogo } from './MawLogo';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#211E1C] text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <MawLogo size="md" className="brightness-125" />
            <p className="text-xs text-stone-400 leading-relaxed">
              Toko artisan soft & chunky cookies rumahan berkualitas premium. Dipanggang segar setiap hari dengan bahan-bahan bersertifikasi halal dan tanpa bahan pengawet.
            </p>
          </div>

          {/* Col 2: Varian */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Varian Rasa
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#menu" className="hover:text-white transition-colors">Clasic Cookie (7K)</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Kuki Monster Blue (7K)</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Red Velvet Cream Cheese (8K)</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Double Choco Lava (8K - NEW)</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Matcha Choco Chunks (9K - NEW)</a></li>
            </ul>
          </div>

          {/* Col 3: Kitchen & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Kitchen & Jam Buka
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Senin - Minggu</span>
                  <span>10:00 - 20:00 WIB</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>Jl. Cempaka Putih Timur No. 45, Jakarta Pusat</span>
              </div>
            </div>
          </div>

          {/* Col 4: Hubungi Kami */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Layanan Pesanan
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp: +62 812-3456-7890
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-stone-300">@ohmawcookies</span>
              </div>
              <p className="text-[11px] text-stone-500 pt-2">
                Melayani pesanan hampers kantor, ulang tahun, arisan, & custom gift box.
              </p>
            </div>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Oh Maw Cookies. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Baked with love & pure butter</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
