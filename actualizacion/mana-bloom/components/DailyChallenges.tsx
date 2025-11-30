import React from 'react';
import { DAILY_CHALLENGES } from '../constants';

export const DailyChallenges: React.FC = () => {
  return (
    <section className="px-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Desafíos Diarios</h2>
        <span className="text-xs text-slate-500">Se reinician en 4h</span>
      </div>

      <div className="space-y-3">
        {DAILY_CHALLENGES.map((challenge) => (
            <div key={challenge.id} className="bg-mana-card border border-white/5 p-3 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-lg">
                        {challenge.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-slate-200">{challenge.title}</span>
                            <span className="text-xs font-bold text-mana-secondary">{challenge.reward}</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500">
                             <span>Progreso</span>
                             <span>{challenge.progress} / {challenge.total}</span>
                        </div>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-mana-primary to-mana-accent"
                        style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    ></div>
                </div>
            </div>
        ))}
      </div>
      
      <button className="w-full mt-3 text-center text-xs text-slate-400 hover:text-white py-2">
        Ver todos los desafíos
      </button>
    </section>
  );
};