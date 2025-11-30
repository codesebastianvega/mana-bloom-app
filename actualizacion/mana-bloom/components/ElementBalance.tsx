
import React, { useState } from 'react';
import { PlantData, ElementStat } from '../types';

interface Props {
  balance: PlantData['elementalBalance'];
  personality: PlantData['personality'];
}

export const ElementBalance: React.FC<Props> = ({ balance, personality }) => {
  const [expandedElement, setExpandedElement] = useState<string | null>(null);

  const renderElementRow = (key: string, label: string, icon: string, data: ElementStat) => {
      const isExpanded = expandedElement === key;
      const colorMap: {[key:string]: string} = { fire: 'orange', water: 'blue', earth: 'emerald', air: 'slate' };
      const color = colorMap[key];

      // Custom CSS for liquid bar effect
      const barStyle = {
          width: `${data.value}%`,
          boxShadow: `0 0 10px var(--tw-color-${color}-500)`
      };

      return (
        <div 
            key={key}
            onClick={() => setExpandedElement(isExpanded ? null : key)}
            className={`relative mb-3 rounded-2xl overflow-hidden transition-all duration-300 border
                ${isExpanded 
                    ? `bg-[#1a1629] border-${color}-500/50 shadow-lg shadow-${color}-900/20` 
                    : `bg-[#1a1629]/60 border-white/5 hover:border-white/10`
                }
            `}
        >
            {/* Main Row */}
            <div className="p-3 flex items-center gap-4 relative z-10">
                {/* Icon Card */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-white/5 bg-gradient-to-br from-black/40 to-white/5`}>
                    {icon}
                </div>

                {/* Info & Bar */}
                <div className="flex-1">
                    <div className="flex justify-between items-end mb-1">
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">{label}</h4>
                        <span className={`text-xs font-mono font-bold text-${color}-400`}>{data.value}%</span>
                    </div>
                    
                    {/* Alchemical Liquid Bar */}
                    <div className="h-3 w-full bg-black/40 rounded-full border border-white/5 overflow-hidden relative">
                        {/* Liquid */}
                        <div 
                            className={`h-full rounded-full bg-gradient-to-r from-${color}-600 to-${color}-400 relative overflow-hidden`} 
                            style={barStyle}
                        >
                            {/* Bubbles / Shine effect */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40"></div>
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/20"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-4 pb-4 pt-1 animate-in slide-in-from-top-2">
                    <div className="grid grid-cols-2 gap-2 mb-3 mt-2">
                        <div className="bg-black/20 rounded-lg p-2 flex items-center gap-2 border border-white/5">
                            <span className="text-xs text-slate-500">⚔️</span>
                            <div>
                                <span className="block text-xs font-bold text-white">{data.tasksCount}</span>
                                <span className="text-[9px] text-slate-500 uppercase">Tareas</span>
                            </div>
                        </div>
                        <div className="bg-black/20 rounded-lg p-2 flex items-center gap-2 border border-white/5">
                             <span className="text-xs text-slate-500">🔄</span>
                            <div>
                                <span className="block text-xs font-bold text-white">{data.habitsCount}</span>
                                <span className="text-[9px] text-slate-500 uppercase">Hábitos</span>
                            </div>
                        </div>
                    </div>

                    <div className={`rounded-xl p-3 border border-${color}-500/20 bg-${color}-500/5`}>
                        <p className={`text-[9px] font-bold text-${color}-400 mb-1 uppercase tracking-wider`}>Consejo Alquímico</p>
                        <p className="text-xs text-slate-300 italic">"{data.advice}"</p>
                    </div>
                </div>
            )}
        </div>
      );
  };

  return (
    <section className="px-4 mb-24">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>⚗️</span> Balance Elemental
      </h3>
      
      {/* Personality Card - Holographic styling */}
      <div className="relative bg-gradient-to-br from-[#1a1629] to-[#252038] border border-white/10 rounded-3xl p-5 mb-6 overflow-hidden shadow-xl group">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
         
         <div className="flex justify-between items-start mb-4 relative z-10">
             <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">ESENCIA</span>
                <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{personality.type}</h4>
             </div>
             <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center border border-white/10 text-xl shadow-inner group-hover:scale-110 transition-transform">
                 🔮
             </div>
         </div>
         
         <p className="text-xs text-slate-300 leading-relaxed mb-4 relative z-10 border-l-2 border-blue-500/50 pl-3">
             {personality.description}
         </p>

         <div className="flex items-center gap-2 bg-black/20 rounded-lg p-2 relative z-10 border border-white/5">
             <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-blue-600 to-purple-500" style={{ width: `${personality.balancePercentage}%` }}></div>
             </div>
             <span className="text-[10px] font-bold text-slate-400">{personality.balancePercentage}% Sincronía</span>
         </div>
      </div>

      {/* Element Rows */}
      <div className="space-y-1">
        {renderElementRow('fire', 'Fuego', '🔥', balance.fire)}
        {renderElementRow('water', 'Agua', '💧', balance.water)}
        {renderElementRow('earth', 'Tierra', '⛰️', balance.earth)}
        {renderElementRow('air', 'Viento', '🌬️', balance.air)}
      </div>

    </section>
  );
};
