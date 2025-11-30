
import React from 'react';

interface Props {
  onClose: () => void;
  onClaim: () => void;
}

export const RetentionModal: React.FC<Props> = ({ onClose, onClaim }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="w-full max-w-sm bg-gradient-to-br from-[#1a1629] to-indigo-900/40 border border-white/10 rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Magical Background FX */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="w-20 h-20 mx-auto bg-gradient-to-b from-amber-400/20 to-transparent rounded-full flex items-center justify-center text-4xl mb-4 animate-bounce border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            🎁
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">¡El Bosque te extrañaba!</h3>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            La magia se acumuló durante tu ausencia. Aquí tienes un regalo de bienvenida por regresar a cuidar tu jardín.
        </p>
        
        <div className="flex justify-center gap-3 mb-8">
            <div className="bg-black/40 px-5 py-3 rounded-2xl border border-blue-500/30 flex flex-col items-center min-w-[80px]">
                <span className="text-xl mb-1">⚡</span>
                <span className="text-lg font-bold text-blue-400">+100</span>
                <span className="text-[9px] text-slate-400 uppercase tracking-wider">Mana</span>
            </div>
            <div className="bg-black/40 px-5 py-3 rounded-2xl border border-green-500/30 flex flex-col items-center min-w-[80px]">
                <span className="text-xl mb-1">🌱</span>
                <span className="text-lg font-bold text-green-400">+3</span>
                <span className="text-[9px] text-slate-400 uppercase tracking-wider">Semillas</span>
            </div>
        </div>

        <button 
          onClick={onClaim}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
            Recoger y Continuar ✨
        </button>
        <button 
          onClick={onClose}
          className="mt-4 text-xs text-slate-500 hover:text-white transition-colors"
        >
            Guardar para luego
        </button>
      </div>
    </div>
  );
};
