
import React, { useState, useEffect } from 'react';
import { PlantData } from '../types';

interface Props {
  plant: PlantData;
  onSpeak?: () => void;
  lastActivity?: string | null;
}

export const PlantHero: React.FC<Props> = ({ plant, onSpeak, lastActivity }) => {
  const [activeStat, setActiveStat] = useState<string | null>(null);
  const [treeInteract, setTreeInteract] = useState(false);
  const [particles, setParticles] = useState<{id: number, top: number, left: number, delay: number}[]>([]);

  // Generate ambient mana particles
  useEffect(() => {
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const handleTreeClick = () => {
    setTreeInteract(true);
    if (navigator.vibrate) navigator.vibrate(15);
    setTimeout(() => setTreeInteract(false), 300);
  };

  const getStatInfo = (label: string) => {
      switch(label) {
          case 'Humedad': return 'Nivel de agua. Baja 5% cada hora.';
          case 'Luz': return 'Exposición solar. Necesaria para fotosíntesis.';
          case 'Nutrientes': return 'Calidad del suelo. Afecta crecimiento.';
          case 'Pureza': return 'Limpieza de aura. Evita plagas mágicas.';
          default: return '';
      }
  };

  const getAuraColor = () => {
      if (plant.stats.health > 80) return 'bg-emerald-500/20';
      if (plant.stats.health > 50) return 'bg-yellow-500/20';
      return 'bg-red-500/20';
  };

  return (
    <section className="px-4 py-4 relative">
      
      {/* 1. Unified Identity & Activity Card */}
      <div className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-blue-500/40 via-emerald-500/40 to-purple-500/40 mb-6 shadow-2xl">
        <div className="bg-[#13111f] rounded-[23px] p-5 relative overflow-hidden">
             {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[60px] opacity-30 transition-colors duration-1000 ${getAuraColor()}`}></div>
            
            <div className="relative z-10">
                
                {/* Top Row: Identity & Stats */}
                <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-emerald-500/30 flex items-center justify-center text-2xl shadow-inner">
                            🌿
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#13111f] rounded-full flex items-center justify-center border border-white/10">
                                <div className={`w-2 h-2 rounded-full ${plant.stats.health > 80 ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                            </div>
                        </div>
                        
                        {/* Name & Stage */}
                        <div>
                            <h1 className="text-xl font-bold text-white leading-none mb-1">{plant.name}</h1>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-slate-400 uppercase tracking-wide">Etapa:</span>
                                <span className="text-xs font-bold text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]">{plant.stage}</span>
                            </div>
                        </div>
                    </div>

                    {/* Streak & Weather */}
                    <div className="flex flex-col items-end gap-1">
                         <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                            <span className="text-[10px] font-bold text-orange-400">{plant.streak} días</span>
                            <span className="text-[10px] animate-bounce">🔥</span>
                         </div>
                         <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                            <span>24°C</span> • <span>Soleado</span>
                         </div>
                    </div>
                </div>

                {/* Bottom Row: Activity & Alerts */}
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">MI JARDÍN</h2>
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                                 <span className="text-emerald-400 font-bold animate-pulse">●</span>
                                 <span className="font-medium">
                                    {lastActivity ? lastActivity : `Todo tranquilo`}
                                 </span>
                            </div>
                             <div className="text-[10px] text-slate-500 pl-4">
                                Próximo: {plant.nextStageEta}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold text-slate-300 flex items-center gap-1.5 transition-colors active:scale-95 group">
                            <span className="text-xs group-hover:animate-swing">🔔</span> Alertas
                        </button>
                    </div>
                </div>

            </div>
        </div>
      </div>

      {/* 2. Main Visual Area (Stats Left, Tree Right) */}
      <div className="flex justify-between items-center mb-6 relative">
         
         {/* Stats Column */}
         <div className="w-[40%] z-20">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 pl-1">Signos</h3>

            <div className="space-y-3">
               {[
                 { label: 'Humedad', val: plant.stats.hydration, color: 'bg-blue-500' },
                 { label: 'Luz', val: plant.stats.sunlight, color: 'bg-yellow-500' },
                 { label: 'Nutrientes', val: plant.stats.nutrients, color: 'bg-emerald-500' },
                 { label: 'Pureza', val: plant.stats.purity, color: 'bg-purple-500' },
               ].map((stat, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveStat(activeStat === stat.label ? null : stat.label)}
                    className="relative"
                  >
                      <div className={`bg-mana-card border ${activeStat === stat.label ? 'border-white/30 bg-white/5' : 'border-white/5'} rounded-2xl px-2 py-2 flex items-center justify-between cursor-pointer transition-all active:scale-95`}>
                        <div className="flex items-center gap-2 w-full">
                             <div className="w-1.5 h-8 bg-slate-800 rounded-full overflow-hidden flex-shrink-0">
                                 <div className={`w-full ${stat.color} rounded-full absolute bottom-0 transition-all duration-1000`} style={{ height: `${stat.val}%`, position: 'relative' }}></div>
                             </div>
                             <div>
                                 <span className="block text-[9px] font-bold text-slate-400 uppercase leading-none mb-0.5">{stat.label}</span>
                                 <span className="block text-xs font-bold text-white leading-none">{stat.val}%</span>
                             </div>
                        </div>
                      </div>
                      
                      {activeStat === stat.label && (
                          <div className="absolute left-0 bottom-full mb-2 w-[150px] bg-black/90 border border-white/20 p-2 rounded-lg z-30 text-[10px] text-slate-200 animate-in fade-in zoom-in duration-200 shadow-xl">
                              {getStatInfo(stat.label)}
                          </div>
                      )}
                  </div>
               ))}
            </div>
         </div>

         {/* Interactive Tree Area */}
         <div className="w-[60%] relative flex justify-center items-center h-64">
             
             {/* DYNAMIC AURA & PARTICLES */}
             <div className={`absolute inset-0 rounded-full blur-[60px] opacity-40 transition-colors duration-1000 ${getAuraColor()}`}></div>
             
             {/* Ambient Particles */}
             {particles.map(p => (
                 <div 
                    key={p.id}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
                    style={{ 
                        top: `${p.top}%`, 
                        left: `${p.left}%`, 
                        animationDelay: `${p.delay}s`,
                        animationDuration: '3s'
                    }}
                 />
             ))}

             {/* Living Tree */}
             <div 
                onClick={handleTreeClick}
                className={`relative w-48 h-48 transition-all duration-500 cursor-pointer select-none z-10 flex items-center justify-center
                    ${treeInteract ? 'scale-110 brightness-125' : 'scale-100 animate-blob'}
                `}
                style={{ animationDuration: '7s' }} // Slow breathing
             >
                <div className="text-[130px] leading-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transform hover:rotate-1 transition-transform">
                    🌳
                </div>
             </div>

             {/* Soul Connection / Speak Button */}
             <button 
                onClick={(e) => { e.stopPropagation(); onSpeak && onSpeak(); }}
                className="absolute top-0 right-4 z-20 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center gap-1 shadow-lg hover:bg-white/20 active:scale-90 transition-all group"
             >
                <span className="text-lg group-hover:animate-bounce">💬</span>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Conectar</span>
             </button>
             
             {/* Inventory Shortcut */}
             <button className="absolute bottom-0 right-4 z-20 bg-[#1a1629]/80 backdrop-blur-md border border-white/20 text-emerald-400 px-3 py-1 rounded-xl text-[10px] font-bold tracking-wider hover:bg-emerald-500/10 transition-colors shadow-lg flex items-center gap-1">
                <span>🎒</span> BAG
             </button>
         </div>
      </div>

      {/* 3. Evolution / Growth Path */}
      <div className="bg-[#1a1629] border border-white/5 rounded-2xl p-4 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent"></div>
          
          <div className="relative z-10 flex justify-between items-end mb-2">
            <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Evolución</h4>
                <p className="text-[10px] text-slate-400">Progreso hacia <span className="text-emerald-300 font-bold">{plant.nextStage}</span></p>
            </div>
            <span className="text-sm font-black text-yellow-500">{plant.globalStageProgress}%</span>
          </div>
          
          <div className="relative z-10 h-3 bg-slate-900 rounded-full overflow-hidden shadow-inner border border-white/5">
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-600 to-yellow-400 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-1"
                    style={{ width: `${plant.globalStageProgress}%` }}
                >
                    <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-ping"></div>
                </div>
          </div>
      </div>

    </section>
  );
};
