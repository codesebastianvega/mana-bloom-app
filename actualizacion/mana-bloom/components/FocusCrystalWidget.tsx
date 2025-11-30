import React, { useState, useEffect } from 'react';

export const FocusCrystalWidget: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setSessionCount(prev => prev + 1);
      setTimeLeft(25 * 60); // Reset
      // Mock completion feedback
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="px-4 mb-6">
      <div className="relative overflow-hidden rounded-2xl bg-[#1a1629] border border-mana-primary/30 p-4 shadow-xl shadow-mana-primary/10">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-mana-primary text-lg">💎</span> Cristal de Enfoque
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {isActive ? "Canalizando mana..." : "Inicia sesión de 25 min"}
            </p>
          </div>
          <div className="text-right">
             <span className={`text-2xl font-mono font-bold ${isActive ? 'text-mana-primary animate-pulse' : 'text-slate-200'}`}>
               {formatTime(timeLeft)}
             </span>
          </div>
        </div>

        {/* Crystal Visual / Animation */}
        <div className="mt-4 flex justify-center py-2">
           <button 
             onClick={toggleTimer}
             className={`relative w-20 h-20 flex items-center justify-center rounded-full transition-all duration-500
                ${isActive ? 'bg-mana-primary/20 shadow-[0_0_30px_rgba(139,92,246,0.4)] scale-110' : 'bg-white/5 hover:bg-white/10'}
             `}
           >
              <div className={`text-4xl transition-transform duration-[3s] ${isActive ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }}>
                 💠
              </div>
              {isActive && (
                <>
                    <div className="absolute inset-0 border-2 border-mana-primary rounded-full animate-ping opacity-20"></div>
                    <div className="absolute inset-0 border border-mana-secondary rounded-full animate-ping opacity-20 delay-150"></div>
                </>
              )}
           </button>
        </div>
        
        {/* Background FX */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-mana-primary/10 blur-[50px] rounded-full transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Session Counter */}
        <div className="absolute bottom-3 right-4 flex gap-1">
            {[...Array(4)].map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < sessionCount ? 'bg-mana-secondary' : 'bg-white/10'}`}></div>
            ))}
        </div>
      </div>
    </section>
  );
};