
import React from 'react';

interface Props {
  onOpenMenu?: () => void;
}

export const StickyHeader: React.FC<Props> = ({ onOpenMenu }) => {
  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 bg-mana-dark/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-mana-primary to-mana-accent rounded-lg p-1.5 shadow-lg shadow-mana-primary/20">
            {/* Simple Logo Placeholder */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-bold tracking-wide text-white leading-none">MANA BLOOM</h1>
          <div className="mt-1 flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-full border border-white/5 w-fit">
            <span className="text-[10px] animate-pulse">🌸</span>
            <span className="text-[10px] text-emerald-300 font-medium truncate max-w-[120px]">
              Ernesto está floreciendo
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white">
          <span className="text-xl">🔔</span>
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-mana-accent rounded-full border border-mana-dark"></span>
        </button>
        <button 
            onClick={onOpenMenu}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
};
