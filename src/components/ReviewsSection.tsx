import React from 'react';
import { Star, Heart, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../data/cookies';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-20 border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wider uppercase mb-2">
              <span>Customer Love</span>
              <span aria-hidden="true">·</span>
              <span>4.9 / 5.0 Rating</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-stone-900">
              Kata Penikmat Oh Maw Cookies
            </h2>
          </div>

          <div className="text-xs text-stone-500">
            Lebih dari <strong>1.500+ cookies</strong> dipanggang dan dinikmati setiap bulannya.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-stone-700 text-sm leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-stone-900 flex items-center gap-1">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-amber-800 font-medium">{rev.flavor}</div>
                </div>
                <span className="text-[10px] text-stone-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
