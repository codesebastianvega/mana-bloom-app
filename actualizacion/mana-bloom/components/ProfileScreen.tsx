
import React, { useState } from 'react';
import { USER_DATA, ACHIEVEMENTS, SHOP_CATEGORIES, SHOP_ITEMS } from '../constants';

interface Props {
  onNavigate?: (view: string) => void;
}

export const ProfileScreen: React.FC<Props> = ({ onNavigate }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const nextLevelXp = USER_DATA.maxXp - USER_DATA.currentXp;
  const progressPercent = (USER_DATA.currentXp / USER_DATA.maxXp) * 100;

  // Mock Archetype & Companion
  const archetype = "Alquimista Solar"; 
  const archetypeIcon = "☀️";
  const companion = "🐈‍⬛"; // Gato espectral

  // Mock Mana Flow Data (Last 14 days heat map)
  const manaFlow = Array.from({ length: 14 }).map((_, i) => ({
      day: i,
      intensity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
  }));

  const toggleCategory = (id: string) => {
      setExpandedCategory(expandedCategory === id ? null : id);
  };

  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.isUnlocked).slice(0, 3);

  return (
    <div className="min-h-screen bg-mana-dark pb-24 relative overflow-x-hidden">
        
      {/* --- 1. HERO: GRIMOIRE HEADER --- */}
      <div className="relative pt-8 px-5 pb-8 bg-[#13111f] border-b border-white/5 overflow-hidden shadow-2xl">
        {/* Background FX */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] pointer-events-none"></div>

        <div className="relative z-10">
            {/* Top Bar: Edit & Share */}
            <div className="absolute top-0 right-0 flex gap-2">
                <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                    ✎
                </button>
            </div>

            {/* Identity Row */}
            <div className="flex items-center gap-5 mb-6">
                {/* Avatar Container with Familiar */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-purple-600 rounded-full blur-md opacity-40 animate-pulse"></div>
                    <div className="relative w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 to-purple-500">
                        <img src={USER_DATA.avatarUrl} className="w-full h-full rounded-full object-cover border-4 border-[#13111f]" alt="Avatar" />
                        <div className="absolute -bottom-1 -right-1 bg-[#1a1629] border border-amber-500/30 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
                            Nv. {USER_DATA.level}
                        </div>
                    </div>
                    {/* Familiar (Pet) */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 flex items-center justify-center text-xl animate-bounce" style={{ animationDuration: '3s' }}>
                        {companion}
                    </div>
                </div>

                {/* Name & Archetype */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl font-black text-white tracking-tight">{USER_DATA.name}</h1>
                        <span className="text-xl filter drop-shadow-lg animate-pulse">{archetypeIcon}</span>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 mb-2">
                        <span className="text-[10px] text-amber-200 font-bold uppercase tracking-widest">{archetype}</span>
                    </div>
                    
                    <p className="text-[10px] text-slate-500">Miembro desde {USER_DATA.joinedAt}</p>
                </div>
            </div>

            {/* RPG Stats Grid (Attributes) */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                 <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center group hover:bg-white/10 transition-colors">
                     <span className="text-lg mb-1 group-hover:scale-110 transition-transform">🔥</span>
                     <span className="text-lg font-bold text-white leading-none">{USER_DATA.stats.habitsStreak}</span>
                     <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mt-1">Racha</span>
                 </div>
                 <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center group hover:bg-white/10 transition-colors">
                     <span className="text-lg mb-1 group-hover:scale-110 transition-transform">✨</span>
                     <span className="text-lg font-bold text-white leading-none">2.4k</span>
                     <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mt-1">Total XP</span>
                 </div>
                 <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center group hover:bg-white/10 transition-colors">
                     <span className="text-lg mb-1 group-hover:scale-110 transition-transform">🧘</span>
                     <span className="text-lg font-bold text-white leading-none">42</span>
                     <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mt-1">Rituales</span>
                 </div>
            </div>

            {/* Mana Flow (Activity Heatmap) */}
            <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Flujo de Mana (14 días)</span>
                    <span className="text-[10px] text-purple-400 font-medium">Alta Actividad</span>
                </div>
                <div className="flex justify-between gap-1">
                    {manaFlow.map((day, i) => (
                        <div 
                            key={i} 
                            className={`h-8 w-full rounded-sm transition-all hover:scale-110
                                ${day.intensity === 'high' ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 
                                  day.intensity === 'medium' ? 'bg-purple-500/40' : 
                                  'bg-white/5'}
                            `}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-20 space-y-6">

        {/* --- 2. MASTERY PATH (Global Progress) --- */}
        <section className="bg-[#1a1629] border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden">
             <div className="flex justify-between items-end mb-2 relative z-10">
                 <div>
                     <h3 className="text-sm font-bold text-white">Camino a la Maestría</h3>
                     <p className="text-[10px] text-slate-400">Próximo rango: <span className="text-amber-400 font-bold">Jardínista Místico</span></p>
                 </div>
                 <span className="text-xs font-mono text-slate-300">{Math.round(progressPercent)}%</span>
             </div>
             
             {/* Progress Bar with Node */}
             <div className="relative h-3 bg-slate-900 rounded-full mb-3 shadow-inner relative z-10">
                 <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                 {/* Target Node */}
                 <div className="absolute top-1/2 -translate-y-1/2 right-0 w-6 h-6 bg-[#1a1629] border-2 border-amber-500 rounded-full flex items-center justify-center text-[10px] z-10 shadow-lg">
                    🔒
                 </div>
             </div>
        </section>

        {/* --- 3. TROPHY CASE (Vitrina de Honor) --- */}
        <section>
            <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>🏆</span> Vitrina de Honor
                </h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {unlockedAchievements.map((ach) => (
                    <div key={ach.id} className="aspect-square bg-gradient-to-b from-[#1f1b2e] to-[#13111f] border border-amber-500/20 rounded-2xl p-2 flex flex-col items-center justify-center gap-2 shadow-lg group hover:border-amber-500/50 transition-colors relative overflow-hidden">
                        <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-3xl drop-shadow-md group-hover:scale-110 transition-transform">{ach.icon}</span>
                        <span className="text-[9px] font-bold text-amber-100 text-center leading-tight">{ach.title}</span>
                    </div>
                ))}
                {/* Empty Slot Placeholder */}
                {unlockedAchievements.length < 3 && (
                     <div className="aspect-square bg-white/5 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center opacity-50">
                         <span className="text-2xl opacity-50">🔒</span>
                     </div>
                )}
            </div>
        </section>

        {/* --- 4. LEGACY STATS (Detalle) --- */}
        <section className="bg-[#1a1629] border border-white/5 rounded-2xl p-4 flex justify-between divide-x divide-white/10">
            <div className="flex-1 text-center">
                <p className="text-lg font-bold text-white">124</p>
                <p className="text-[9px] text-slate-500 uppercase tracking-wide">Misiones</p>
            </div>
            <div className="flex-1 text-center">
                <p className="text-lg font-bold text-emerald-400">89%</p>
                <p className="text-[9px] text-slate-500 uppercase tracking-wide">Efectividad</p>
            </div>
            <div className="flex-1 text-center">
                <p className="text-lg font-bold text-purple-400">14</p>
                <p className="text-[9px] text-slate-500 uppercase tracking-wide">Días Perfectos</p>
            </div>
        </section>

        {/* --- 5. THE VAULT (Accordion Collections) --- */}
        <section>
            <h3 className="text-sm font-bold text-white mb-3 px-1 flex items-center gap-2">
                <span>🎒</span> La Bóveda
            </h3>
            
            <div className="space-y-2">
                {SHOP_CATEGORIES.map((cat) => {
                    const isExpanded = expandedCategory === cat.id;
                    const categoryItems = SHOP_ITEMS.filter(item => item.category === cat.id);
                    const hasItems = categoryItems.length > 0;

                    return (
                        <div key={cat.id} className="bg-[#1a1629] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300">
                            {/* Accordion Header */}
                            <button 
                                onClick={() => toggleCategory(cat.id)}
                                className={`w-full flex items-center justify-between p-4 transition-colors ${isExpanded ? 'bg-white/5' : 'hover:bg-white/5'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{cat.icon}</span>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-slate-200">{cat.label}</p>
                                        <p className="text-[10px] text-slate-500">{categoryItems.length} objetos en posesión</p>
                                    </div>
                                </div>
                                <span className={`text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                            </button>

                            {/* Expanded Content: Horizontal Slider */}
                            {isExpanded && (
                                <div className="border-t border-white/5 bg-black/20 p-4 animate-in slide-in-from-top-2">
                                    {hasItems ? (
                                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                                            {categoryItems.map(item => (
                                                <div key={item.id} className="min-w-[80px] flex flex-col items-center gap-2 group cursor-pointer">
                                                    <div className="w-14 h-14 bg-[#1a1629] border border-white/10 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:border-mana-primary/50 transition-all">
                                                        {item.image}
                                                    </div>
                                                    <span className="text-[10px] text-slate-400 text-center leading-tight line-clamp-2 w-full group-hover:text-white">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            ))}
                                            {/* 'Add More' Placeholder */}
                                            <div className="min-w-[80px] flex flex-col items-center gap-2 group cursor-pointer opacity-50 hover:opacity-100">
                                                <div className="w-14 h-14 border border-dashed border-white/20 rounded-xl flex items-center justify-center text-xl">
                                                    +
                                                </div>
                                                <span className="text-[10px] text-slate-500">Obtener más</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-slate-500 text-center py-2 italic">Tu bóveda está vacía...</p>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>

        {/* --- 6. MYSTIC MEMORIES (Journal Preview) --- */}
        <section>
             <h3 className="text-sm font-bold text-white mb-3 px-1 flex items-center gap-2">
                <span>📜</span> Memorias Recientes
            </h3>
            <div className="bg-[#1f1b2e] border border-l-4 border-l-purple-500 border-y-white/5 border-r-white/5 rounded-r-xl p-4 relative shadow-lg">
                <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl">✒️</div>
                <p className="text-xs text-purple-200 italic font-medium mb-2 leading-relaxed">
                    "Hoy sentí que Ernesto estaba más brillante. Quizás mi meditación de ayer funcionó. Debo mantener el foco..."
                </p>
                <div className="flex justify-between items-center mt-3">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Hace 2 horas</span>
                    <button 
                        onClick={() => onNavigate && onNavigate('lore')}
                        className="text-[10px] font-bold text-purple-400 hover:text-white transition-colors bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20"
                    >
                        Abrir Diario ›
                    </button>
                </div>
            </div>
        </section>

        {/* --- 5. PORTALS (Ex-Banners) --- */}
        <section className="grid grid-cols-3 gap-3 pt-4">
             <button className="aspect-[3/4] rounded-2xl bg-gradient-to-b from-emerald-900/50 to-black border border-emerald-500/20 flex flex-col items-center justify-end p-3 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl opacity-50 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0">🌿</div>
                 <span className="relative z-10 text-[10px] font-bold text-emerald-100 uppercase tracking-wider">Jardín</span>
             </button>
             <button className="aspect-[3/4] rounded-2xl bg-gradient-to-b from-amber-900/50 to-black border border-amber-500/20 flex flex-col items-center justify-end p-3 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl opacity-50 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0">🏆</div>
                 <span className="relative z-10 text-[10px] font-bold text-amber-100 uppercase tracking-wider">Logros</span>
             </button>
             <button className="aspect-[3/4] rounded-2xl bg-gradient-to-b from-purple-900/50 to-black border border-purple-500/20 flex flex-col items-center justify-end p-3 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl opacity-50 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0">🎟️</div>
                 <span className="relative z-10 text-[10px] font-bold text-purple-100 uppercase tracking-wider">Pases</span>
             </button>
        </section>

      </div>
    </div>
  );
};
