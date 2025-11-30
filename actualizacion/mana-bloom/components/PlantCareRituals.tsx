
import React, { useState, useRef, useEffect } from 'react';
import { PlantAction } from '../types';

interface Props {
  actions: PlantAction[];
  onAction: (action: PlantAction) => void;
}

export const PlantCareRituals: React.FC<Props> = ({ actions, onAction }) => {
  const [activeCooldowns, setActiveCooldowns] = useState<string[]>([]);
  
  // --- Hold Button Logic ---
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const HOLD_DURATION = 1000; // 1 second to cast

  const startHold = () => {
      if (completed) return;
      setIsHolding(true);
      startTimeRef.current = Date.now();
      
      const animate = () => {
          const elapsed = Date.now() - startTimeRef.current;
          const p = Math.min(elapsed / HOLD_DURATION, 1);
          setProgress(p);

          if (p < 1) {
              animationRef.current = requestAnimationFrame(animate);
              // Haptic feedback simulation during hold
              if (navigator.vibrate && Math.random() > 0.7) navigator.vibrate(5);
          } else {
              setCompleted(true);
              setIsHolding(false);
              triggerSuccess();
          }
      };
      animationRef.current = requestAnimationFrame(animate);
  };

  const endHold = () => {
      if (completed) return;
      setIsHolding(false);
      setProgress(0);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  const triggerSuccess = () => {
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]); // Success vibration
      // Trigger the actual action logic
      const waterAction = actions.find(a => a.id === 'water') || actions[0]; // Fallback to first if no water
      onAction(waterAction); // Actually perform action
      
      // Reset after animation
      setTimeout(() => {
          setCompleted(false);
          setProgress(0);
      }, 2000);
  };

  // --- Grid Click Logic ---
  const handleActionClick = (action: PlantAction) => {
      if (activeCooldowns.includes(action.id)) return;
      onAction(action);
      setActiveCooldowns(prev => [...prev, action.id]);
      setTimeout(() => {
          setActiveCooldowns(prev => prev.filter(id => id !== action.id));
      }, 5000);
  };

  return (
    <section className="px-4 mb-8">
      
      {/* --- SECTION 1: VÍNCULO VITAL (REAL PLANT CARE) --- */}
      <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
              <span className="text-emerald-400 text-lg">🌱</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Vínculo Vital</h3>
              <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <div 
             className={`relative w-full h-32 rounded-2xl overflow-hidden select-none touch-none transition-all duration-300
                ${completed ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)] scale-105' : 'bg-[#1a1629] border border-emerald-500/30 shadow-lg'}
             `}
             onMouseDown={startHold}
             onMouseUp={endHold}
             onMouseLeave={endHold}
             onTouchStart={startHold}
             onTouchEnd={endHold}
          >
               {/* Fluid Background Progress */}
               <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-75 ease-linear"
                  style={{ height: `${progress * 100}%`, opacity: completed ? 0 : 1 }}
               >
                   <div className="absolute top-0 left-0 right-0 h-2 bg-white/50 blur-[2px]"></div>
               </div>

               {/* Content */}
               <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                   {completed ? (
                       <div className="animate-in zoom-in duration-300 flex flex-col items-center text-mana-dark">
                           <span className="text-4xl mb-1">✨</span>
                           <span className="text-lg font-black uppercase">¡Vínculo Fortalecido!</span>
                           <span className="text-xs font-bold">+20 XP • +10 Hidratación</span>
                       </div>
                   ) : (
                       <>
                           <span className={`text-4xl mb-2 transition-transform duration-200 ${isHolding ? 'scale-110 animate-pulse' : ''}`}>
                               🚿
                           </span>
                           <h4 className="text-lg font-bold text-white">Regar Planta Real</h4>
                           <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                               {isHolding ? 'Canalizando energía...' : 'Mantén para cuidar'}
                           </p>
                       </>
                   )}
               </div>

               {/* Hint Text for Real World */}
               {!completed && !isHolding && (
                   <div className="absolute bottom-3 left-0 right-0 text-center">
                       <span className="text-[9px] text-slate-500 bg-black/30 px-2 py-1 rounded-full">
                           Registra tu acción del mundo real
                       </span>
                   </div>
               )}
          </div>
      </div>

      {/* --- SECTION 2: RITUALES DEL GUARDIÁN (USER SELF-CARE) --- */}
      <div>
        <div className="flex items-center gap-2 mb-3">
            <span className="text-purple-400 text-lg">🧘</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Rituales del Guardián</h3>
            <div className="h-px flex-1 bg-white/10"></div>
        </div>
        
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            Tu bienestar alimenta el jardín. Realiza estas micro-acciones para recargar tu energía y la de Ernesto.
        </p>

        <div className="grid grid-cols-4 gap-3">
            {actions.filter(a => a.type === 'ritual').map((action) => {
                const isCooldown = activeCooldowns.includes(action.id);
                return (
                    <button
                        key={action.id}
                        onClick={() => handleActionClick(action)}
                        disabled={isCooldown}
                        className={`aspect-square relative flex flex-col items-center justify-center rounded-2xl border transition-all duration-200 group
                            ${isCooldown 
                                ? 'bg-slate-800/50 border-transparent opacity-50 cursor-not-allowed' 
                                : `bg-[#1a1629] border-white/5 hover:border-${action.color}-500/50 hover:bg-[#201c30] active:scale-95`
                            }
                        `}
                    >
                        <span className={`text-2xl mb-1 filter drop-shadow-md transition-transform ${isCooldown ? 'grayscale' : 'group-hover:scale-110'}`}>
                            {action.icon}
                        </span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide text-center leading-none px-1 group-hover:text-white transition-colors">
                            {action.label}
                        </span>
                        
                        {/* Cooldown Overlay */}
                        {isCooldown && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl backdrop-blur-[1px]">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}
                    </button>
                )
            })}
        </div>
      </div>

    </section>
  );
};
