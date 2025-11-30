
import React, { useState } from 'react';
import { PlantData } from '../types';

interface Props {
  plant: PlantData;
  onUpdateName?: (newName: string) => void;
}

export const PlantHeader: React.FC<Props> = ({ plant, onUpdateName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(plant.name);

  const handleBlur = () => {
    setIsEditing(false);
    if (onUpdateName && tempName.trim() !== '') {
      onUpdateName(tempName);
    } else {
        setTempName(plant.name);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 bg-mana-dark/90 backdrop-blur-xl border-b border-white/5 transition-all duration-300 shadow-2xl">
      <div className="flex items-center justify-between">
        
        {/* Name and Stage */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md group-hover:bg-green-500/30 transition-all"></div>
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-black border border-green-500/30 flex items-center justify-center text-xl shadow-inner">
               🌿
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-mana-dark rounded-full flex items-center justify-center border border-white/10">
                <div className={`w-2 h-2 rounded-full ${plant.stats.health > 80 ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 h-6">
                {isEditing ? (
                    <input 
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
                        autoFocus
                        className="bg-white/10 text-lg font-bold text-white rounded px-1 outline-none border border-mana-primary min-w-[100px]"
                    />
                ) : (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 group"
                    >
                        <h1 className="text-lg font-bold text-white leading-none group-hover:text-mana-primary transition-colors">{plant.name}</h1>
                        <span className="text-[10px] text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">✎</span>
                    </button>
                )}
            </div>
            <p className="text-xs text-slate-400 font-medium">
                Etapa: <span className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">{plant.stage}</span>
            </p>
          </div>
        </div>

        {/* Streak & Weather */}
        <div className="text-right">
             <div className="inline-flex items-center justify-end gap-1.5 bg-orange-950/30 border border-orange-500/20 px-2 py-0.5 rounded-full mb-1">
                <span className="text-xs font-bold text-orange-400">{plant.streak} días</span>
                <span className="text-xs animate-bounce">🔥</span>
             </div>
             <div className="flex items-center justify-end gap-1.5 text-[10px] text-slate-500 font-mono">
                <span>24°C • Soleado</span>
             </div>
        </div>
      </div>
    </header>
  );
};
