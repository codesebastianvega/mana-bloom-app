
import React, { useEffect } from 'react';

interface Props {
  newLevel: number;
  onClose: () => void;
}

export const LevelUpModal: React.FC<Props> = ({ newLevel, onClose }) => {
  
  useEffect(() => {
    // Trigger vibration if available
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
  }, []);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}>
        <div className="relative w-full max-w-sm text-center">
            
            {/* Burst Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/20 to-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>

            {/* Level Badge */}
            <div className="relative z-10 mb-6 animate-in zoom-in slide-in-from-bottom-10 duration-700 delay-150">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-400 to-orange-600 rounded-full p-1 shadow-[0_0_50px_rgba(245,158,11,0.6)]">
                    <div className="w-full h-full bg-[#1a1629] rounded-full flex items-center justify-center border-4 border-amber-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-spin" style={{ animationDuration: '20s' }}></div>
                        <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-amber-200 drop-shadow-lg">
                            {newLevel}
                        </span>
                    </div>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg border border-white/20 whitespace-nowrap">
                    Level Up
                </div>
            </div>

            {/* Title */}
            <h2 className="relative z-10 text-3xl font-black text-white italic tracking-tighter mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-4 delay-300 fill-mode-backwards">
                ¡ASCENSIÓN!
            </h2>
            <p className="relative z-10 text-sm text-amber-200 mb-8 animate-in slide-in-from-bottom-4 delay-500 fill-mode-backwards">
                Tu poder mágico ha crecido.
            </p>

            {/* Rewards Grid */}
            <div className="relative z-10 grid grid-cols-3 gap-3 mb-8 animate-in slide-in-from-bottom-4 delay-700 fill-mode-backwards">
                <div className="bg-white/10 border border-white/10 rounded-2xl p-3 flex flex-col items-center gap-1 backdrop-blur-md">
                    <span className="text-2xl">⚡</span>
                    <span className="text-xs font-bold text-white">+500</span>
                    <span className="text-[8px] text-slate-300 uppercase">Mana Max</span>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-2xl p-3 flex flex-col items-center gap-1 backdrop-blur-md">
                    <span className="text-2xl">🪙</span>
                    <span className="text-xs font-bold text-white">+1000</span>
                    <span className="text-[8px] text-slate-300 uppercase">Monedas</span>
                </div>
                <div className="bg-gradient-to-br from-purple-600/40 to-indigo-600/40 border border-purple-400/50 rounded-2xl p-3 flex flex-col items-center gap-1 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    <span className="text-2xl">🎁</span>
                    <span className="text-xs font-bold text-white">Unlock</span>
                    <span className="text-[8px] text-purple-200 uppercase">Nueva Semilla</span>
                </div>
            </div>

            {/* Button */}
            <button 
                onClick={onClose}
                className="relative z-10 w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-white font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all animate-in fade-in delay-1000 fill-mode-backwards"
            >
                Reclamar Poder
            </button>

        </div>
    </div>
  );
};
