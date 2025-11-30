import React, { useState } from 'react';
import { SHOP_CATEGORIES, SHOP_ITEMS } from '../constants';

export const MagicShopPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('potions');

  const filteredItems = SHOP_ITEMS.filter(item => item.category === activeTab).slice(0, 2);
  const activeCategoryColor = activeTab === 'potions' ? 'text-blue-400' 
                            : activeTab === 'plants' ? 'text-green-400'
                            : activeTab === 'tools' ? 'text-slate-300'
                            : activeTab === 'cosmetics' ? 'text-fuchsia-400'
                            : 'text-orange-400';

  return (
    <section className="px-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Tienda Mágica</h2>
        <button className={`text-xs font-bold flex items-center gap-1 ${activeCategoryColor}`}>
          Ver tienda <span>›</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-2">
        {SHOP_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
                <button 
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs whitespace-nowrap transition-all
                        ${isActive 
                            ? 'bg-white/10 border-mana-primary text-white' 
                            : 'bg-transparent border-white/5 text-slate-400 hover:text-white'
                        }`}
                >
                    <span>{cat.icon}</span>
                    {cat.label}
                </button>
            )
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredItems.map(item => (
            <div key={item.id} className="group bg-mana-card border border-white/5 rounded-xl p-3 hover:border-white/20 transition-colors">
                <div className="aspect-square bg-black/20 rounded-lg mb-3 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                    {item.image}
                </div>
                <h4 className="text-sm font-medium text-slate-200 truncate">{item.name}</h4>
                <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs font-bold ${item.currency === 'gems' ? 'text-pink-400' : 'text-yellow-400'}`}>
                        {item.price} {item.currency === 'gems' ? '💎' : '🪙'}
                    </span>
                    <button className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-slate-300">
                        Ver
                    </button>
                </div>
            </div>
        ))}
         {/* Fallback if list is short to fill grid visually */}
         {filteredItems.length < 2 && (
             <div className="bg-mana-card/50 border border-white/5 border-dashed rounded-xl p-3 flex flex-col items-center justify-center text-slate-600">
                <span className="text-xs">Más ítems pronto</span>
             </div>
         )}
      </div>
    </section>
  );
};