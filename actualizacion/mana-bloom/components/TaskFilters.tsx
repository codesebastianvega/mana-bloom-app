
import React from 'react';

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenAdvanced: () => void;
}

export const TaskFilters: React.FC<Props> = ({ activeTab, onTabChange, onOpenAdvanced }) => {
  const tabs = [
    { id: 'all', label: 'Todos' },
    { id: 'boss', label: '🔥 Jefes' },
    { id: 'important', label: '⚔️ Importantes' },
    { id: 'minor', label: '🛡️ Menores' },
    { id: 'habit', label: 'Hábitos' },
    { id: 'ritual', label: 'Rituales' },
  ];

  return (
    <div className="px-4 pb-3 space-y-3">
      {/* Search & Filter Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
             <span>🔍</span>
          </div>
          <input 
            type="text" 
            placeholder="Buscar encantamientos..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-mana-primary transition-colors"
          />
        </div>
        <button 
          onClick={onOpenAdvanced}
          className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>

      {/* Horizontal Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all duration-300
              ${activeTab === tab.id 
                ? 'bg-mana-primary/20 border-mana-primary text-mana-primary shadow-[0_0_10px_rgba(139,92,246,0.2)]' 
                : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
