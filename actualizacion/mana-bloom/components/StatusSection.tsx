import React from 'react';
import { UserProfile } from '../types';

interface Props {
  user: UserProfile;
}

export const StatusSection: React.FC<Props> = ({ user }) => {
  const xpPercentage = (user.currentXp / user.maxXp) * 100;

  return (
    <section className="px-4 mb-6">
      {/* Active Buff Notification */}
      <div className="mb-4 flex items-center justify-between bg-mana-primary/10 border border-mana-primary/20 rounded-lg p-3">
        <div className="flex items-center gap-2 text-mana-primary">
            <span className="text-lg">⏳</span>
            <span className="text-xs font-medium">Rituales listos en 15 min</span>
        </div>
        <span className="text-[10px] text-slate-400 bg-mana-dark/50 px-2 py-0.5 rounded-md">
            +5% Bonus
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Level Card */}
        <div className="bg-mana-card border border-white/5 p-4 rounded-xl flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 text-xs font-medium uppercase">Nivel</span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-mana-primary to-mana-accent">
                    {user.level}
                </span>
            </div>
            <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>{user.currentXp} XP</span>
                    <span>{user.maxXp} XP</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-mana-secondary to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${xpPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-rows-3 gap-2">
            <div className="bg-mana-card border border-white/5 px-3 py-2 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
                        <span className="text-[10px]">⚡</span>
                    </div>
                    <span className="text-xs text-slate-300">Mana</span>
                </div>
                <span className="text-sm font-bold text-white">{user.resources.mana}</span>
            </div>
            
            <div className="bg-mana-card border border-white/5 px-3 py-2 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-900/30 flex items-center justify-center text-yellow-400">
                         <span className="text-[10px]">🪙</span>
                    </div>
                    <span className="text-xs text-slate-300">Coins</span>
                </div>
                <span className="text-sm font-bold text-white">{user.resources.coins}</span>
            </div>

            <div className="bg-mana-card border border-white/5 px-3 py-2 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-pink-900/30 flex items-center justify-center text-pink-400">
                        <span className="text-[10px]">💎</span>
                    </div>
                    <span className="text-xs text-slate-300">Gems</span>
                </div>
                <span className="text-sm font-bold text-white">{user.resources.gems}</span>
            </div>
        </div>
      </div>
    </section>
  );
};