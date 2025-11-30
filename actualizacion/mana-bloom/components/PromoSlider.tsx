

import React from 'react';
import { PROMO_BANNERS } from '../constants';

interface Props {
  onNavigate: (view: string) => void;
}

export const PromoSlider: React.FC<Props> = ({ onNavigate }) => {
  const handleBannerClick = (id: string, type: string) => {
    if (!onNavigate) return;
    if (type === 'lore') onNavigate('lore');
    if (type === 'garden') onNavigate('garden');
    if (type === 'inventory') onNavigate('profile'); 
    if (type === 'premium') onNavigate('settings');
  };

  return (
    <section className="mb-6">
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 no-scrollbar">
        {PROMO_BANNERS.map((banner) => (
          <button 
            key={banner.id} 
            onClick={() => handleBannerClick(banner.id, banner.type)}
            className={`snap-center shrink-0 w-[85%] sm:w-[300px] h-36 rounded-2xl bg-gradient-to-r ${banner.imageGradient} p-5 flex flex-col justify-between relative overflow-hidden shadow-lg text-left transition-transform active:scale-95`}
          >
            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-white mb-1">{banner.title}</h3>
              <p className="text-xs text-white/80">{banner.subtitle}</p>
            </div>

            <div className="relative z-10 w-fit px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm border border-white/20 text-xs font-semibold text-white flex items-center gap-1 hover:bg-white/30 transition-colors">
              {banner.ctaText} <span>›</span>
            </div>
          </button>
        ))}
      </div>
      
      {/* Pagination dots visual */}
      <div className="flex justify-center gap-2 -mt-2">
        {PROMO_BANNERS.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-mana-primary' : 'bg-white/20'}`} />
        ))}
      </div>
    </section>
  );
};
