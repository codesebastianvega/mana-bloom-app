
import React, { useState, useEffect } from 'react';
import { PlantData } from '../types';

interface Props {
  plant: PlantData;
}

export const PlantStatus: React.FC<Props> = ({ plant }) => {
  // Mock Weather Engine (Simula clima real)
  const [weather, setWeather] = useState({ temp: 24, condition: 'Soleado', manaDensity: 'Normal' });
  const [suggestion, setSuggestion] = useState({ text: "Condiciones estables.", type: 'neutral' });

  useEffect(() => {
    // Simular variación de clima para el demo
    const conditions = [
        { temp: 30, cond: 'Ola de Calor', mana: 'Alta (Fuego)', advice: 'Ritual de Agua necesario' },
        { temp: 12, cond: 'Frente Frío', mana: 'Baja (Hielo)', advice: 'Busca calor o luz' },
        { temp: 22, cond: 'Lluvia Suave', mana: 'Pura (Agua)', advice: 'Momento de introspección' },
        { temp: 24, cond: 'Despejado', mana: 'Equilibrada', advice: 'Ideal para crecer' }
    ];
    // Pick random for demo vividness
    const w = conditions[Math.floor(Math.random() * conditions.length)];
    setWeather({ temp: w.temp, condition: w.cond, manaDensity: w.mana });
    
    // Logic for contextual advice
    if (w.temp > 28) setSuggestion({ text: "El calor agota tu mana. ¡Hidrátate!", type: 'warning' });
    else if (w.temp < 15) setSuggestion({ text: "Energía estancada por frío. ¡Muévete!", type: 'cold' });
    else setSuggestion({ text: "El flujo de mana es óptimo.", type: 'good' });

  }, []);

  const getConditionIcon = () => {
      if (weather.temp > 28) return '☀️';
      if (weather.temp < 15) return '❄️';
      if (weather.condition.includes('Lluvia')) return '🌧️';
      return '🌤️';
  };

  return (
    <section className="px-4 mb-6 animate-in slide-in-from-bottom-4 duration-700">
       
       {/* 1. Vitality & Mood Row */}
       <div className="grid grid-cols-2 gap-3 mb-3">
           {/* Vitality Card (Unified Health) */}
           <div className="bg-gradient-to-br from-[#1a1629] to-[#0f2e22] border border-emerald-500/30 rounded-2xl p-4 shadow-lg relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
               
               <div className="flex justify-between items-start mb-2 relative z-10">
                   <div className="flex flex-col">
                       <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">VITALIDAD</span>
                       <span className="text-2xl font-black text-white">{plant.stats.health}%</span>
                   </div>
                   <span className="text-2xl animate-pulse">❤️</span>
               </div>
               
               {/* Heartbeat Bar */}
               <div className="relative h-2 w-full bg-slate-900/50 rounded-full overflow-hidden">
                   <div className="absolute inset-0 bg-emerald-500/20 animate-pulse"></div>
                   <div className="h-full bg-gradient-to-r from-emerald-600 to-green-400 rounded-full transition-all duration-1000" style={{ width: `${plant.stats.health}%` }}></div>
               </div>
               <p className="text-[9px] text-emerald-200/60 mt-2 font-medium">Sistema de raíces fuerte.</p>
           </div>

           {/* Mood / Connection */}
           <div className="bg-[#1a1629] border border-white/10 rounded-2xl p-4 shadow-lg relative flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">VÍNCULO</span>
                    <span className="text-xs font-bold text-yellow-400">Feliz 😄</span>
                </div>
                <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">Confianza</span>
                        <div className="h-1 flex-1 bg-slate-800 rounded-full">
                            <div className="h-full bg-yellow-500 w-[90%] rounded-full"></div>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">Sincronía</span>
                        <div className="h-1 flex-1 bg-slate-800 rounded-full">
                            <div className="h-full bg-purple-500 w-[60%] rounded-full"></div>
                        </div>
                    </div>
                </div>
           </div>
       </div>

       {/* 2. Mana Weather & Evolution Row */}
       <div className="grid grid-cols-5 gap-3 mb-3">
           
           {/* Mana Weather (Real World Connection) - Spans 3 cols */}
           <div className="col-span-3 bg-gradient-to-br from-[#1a1629] to-blue-900/10 border border-blue-500/20 rounded-2xl p-3 relative overflow-hidden">
               <div className="flex justify-between items-start mb-1 relative z-10">
                   <div>
                       <p className="text-[9px] font-bold text-blue-300 uppercase tracking-wider mb-0.5">Clima de Mana</p>
                       <h3 className="text-lg font-bold text-white flex items-center gap-2">
                           {weather.temp}°C {getConditionIcon()}
                       </h3>
                       <p className="text-[10px] text-slate-400">{weather.condition}</p>
                   </div>
               </div>
               
               {/* Contextual Advice */}
               <div className={`mt-2 p-2 rounded-lg border flex items-start gap-2
                    ${suggestion.type === 'warning' ? 'bg-orange-900/20 border-orange-500/30 text-orange-200' : 
                      suggestion.type === 'cold' ? 'bg-blue-900/20 border-blue-500/30 text-blue-200' :
                      'bg-white/5 border-white/10 text-slate-300'}
               `}>
                   <span className="text-xs mt-0.5">💡</span>
                   <p className="text-[10px] leading-tight font-medium">{suggestion.text}</p>
               </div>
           </div>

           {/* Next Form Teaser (Evolution) - Spans 2 cols */}
           <div className="col-span-2 bg-[#0e0a1e] border border-purple-500/30 rounded-2xl p-3 relative flex flex-col items-center justify-center text-center shadow-inner">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
               <p className="text-[9px] font-bold text-purple-400 uppercase tracking-wider mb-2 relative z-10">Próxima Forma</p>
               
               {/* Silhouette */}
               <div className="relative w-12 h-12 mb-1 group cursor-help">
                   <div className="absolute inset-0 bg-white blur-xl opacity-10 animate-pulse"></div>
                   <div className="w-full h-full text-4xl grayscale brightness-0 opacity-70 filter blur-[2px] transition-all group-hover:blur-0 group-hover:brightness-50">
                       🌳
                   </div>
                   <div className="absolute bottom-0 right-0 text-[10px] font-bold text-purple-300 bg-purple-900/80 px-1 rounded">?</div>
               </div>
               <p className="text-[9px] text-slate-500 relative z-10">Nivel 7 Req.</p>
           </div>
       </div>

       {/* 3. Micro-Missions (Urgent) */}
       <div className="bg-[#1a1629] border border-dashed border-white/20 rounded-2xl p-4 relative overflow-hidden">
            <div className="flex justify-between items-center mb-3 relative z-10">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></span>
                    Micro-Misiones
                </h4>
            </div>
            
            <div className="space-y-2 relative z-10">
                {/* Mission 1 */}
                <button className="w-full flex items-center justify-between p-2 bg-purple-500/10 border border-purple-500/20 rounded-xl hover:bg-purple-500/20 transition-colors group">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1a1629] flex items-center justify-center text-lg border border-white/5">
                            🍃
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">Limpiar Hojas</p>
                            <p className="text-[9px] text-slate-400">Detectado polvo astral</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-900/50 px-2 py-1 rounded-lg">
                        +50 XP
                    </span>
                </button>

                 {/* Mission 2 */}
                 <button className="w-full flex items-center justify-between p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-colors group">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1a1629] flex items-center justify-center text-lg border border-white/5">
                            🌫️
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">Neblina</p>
                            <p className="text-[9px] text-slate-400">Aumentar humedad</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-900/50 px-2 py-1 rounded-lg">
                        +20 XP
                    </span>
                </button>
            </div>
       </div>

    </section>
  );
};
