
import React, { useMemo } from 'react';
import { UserProfile } from '../types';
import { MOCK_TASKS } from '../constants';

interface Props {
  user: UserProfile;
}

export const WelcomeHero: React.FC<Props> = ({ user }) => {
  
  // Dynamic Greeting Logic based on Time of Day
  const { greeting, atmosphere } = useMemo(() => {
      const hour = new Date().getHours();
      if (hour < 6) return { greeting: "La noche es profunda", atmosphere: "Las estrellas vigilan tu descanso." };
      if (hour < 12) return { greeting: "El rocío despierta", atmosphere: "La energía del sol naciente está contigo." };
      if (hour < 18) return { greeting: "El sol está en su cenit", atmosphere: "Es momento de cultivar y crecer." };
      return { greeting: "La niebla se levanta", atmosphere: "El bosque se prepara para el reposo." };
  }, []);

  // Find highest priority pending task
  const nextTask = MOCK_TASKS.find(t => t.status === 'pending' && t.priority === 'high') || 
                   MOCK_TASKS.find(t => t.status === 'pending');

  return (
    <section className="px-4 py-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-mana-card to-[#252433] border border-white/5 p-5 shadow-xl group">
        {/* Decorational Elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-mana-primary/20 rounded-full blur-3xl group-hover:bg-mana-primary/30 transition-colors duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-mana-secondary/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={user.avatarUrl} 
                  alt="Avatar" 
                  className="w-12 h-12 rounded-full border-2 border-mana-secondary object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-mana-dark rounded-full p-0.5">
                  <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-mana-dark animate-pulse"></div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">{greeting}, {user.name}.</h2>
                <p className="text-xs text-slate-400 italic animate-in fade-in slide-in-from-left-2 duration-700">
                    "{atmosphere}"
                </p>
              </div>
            </div>
          </div>

          {/* Smart Agenda / Next Task */}
          {nextTask ? (
             <div className="bg-black/20 border border-white/5 rounded-xl p-3 flex items-center justify-between backdrop-blur-sm hover:bg-black/30 transition-colors cursor-pointer group/task">
                 <div className="flex items-center gap-3 overflow-hidden">
                     <div className={`w-1 h-8 rounded-full ${nextTask.priority === 'high' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-500'}`}></div>
                     <div className="min-w-0">
                         <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-0.5 flex items-center gap-1">
                            Siguiente Paso
                            {nextTask.priority === 'high' && <span className="text-red-400 animate-pulse">●</span>}
                         </p>
                         <p className="text-sm font-medium text-white truncate group-hover/task:text-mana-secondary transition-colors pr-2">
                             {nextTask.title}
                         </p>
                     </div>
                 </div>
                 <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:bg-mana-secondary hover:border-mana-secondary hover:text-mana-dark transition-all shrink-0 active:scale-90">
                     ✓
                 </button>
             </div>
          ) : (
            <div className="bg-black/20 rounded-xl p-3 text-center border border-white/5">
                <p className="text-sm text-slate-300">El grimorio está en calma. Todo completado. ✨</p>
            </div>
          )}

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <span className="flex items-center gap-1 text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                <span className="text-mana-secondary">✓</span> Tareas
              </span>
              <span className="text-xl font-bold text-white">{user.stats.pendingTasks}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <span className="flex items-center gap-1 text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                <span className="text-orange-400">🔥</span> Racha
              </span>
              <span className="text-xl font-bold text-white">{user.stats.habitsStreak}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <span className="flex items-center gap-1 text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                <span className="text-yellow-400">🏆</span> Retos
              </span>
              <span className="text-xl font-bold text-white">{user.stats.challenges}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};