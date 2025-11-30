import React, { useState } from 'react';

export const RewardsSection: React.FC = () => {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
    // In a real app, trigger confetti or API call here
  };

  return (
    <section className="px-4 mb-8">
      <div className="relative bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/20 rounded-2xl p-4 overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          
          <div className="flex items-center gap-3">
             <div className="bg-orange-500/10 p-2 rounded-full border border-orange-500/30 text-orange-400">
                <span className="text-xl">🔥</span>
             </div>
             <div>
                <h3 className="text-sm font-bold text-white">Racha de 12 días</h3>
                <p className="text-xs text-orange-200/70">¡Sigue así!</p>
             </div>
          </div>

          {claimed ? (
             <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 text-xs font-bold animate-in zoom-in duration-300">
                <span>Reclamado</span>
                <span className="text-lg">✨</span>
             </div>
          ) : (
            <button 
                onClick={handleClaim}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg shadow-orange-500/20 text-xs font-bold active:scale-95 transition-transform"
            >
                <span>🎁</span>
                Reclamar
            </button>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center">
             <button className="text-xs text-slate-400 flex items-center gap-2 hover:text-white transition-colors">
                <span>👥</span>
                Ver recompensas sociales
             </button>
        </div>
      </div>
    </section>
  );
};