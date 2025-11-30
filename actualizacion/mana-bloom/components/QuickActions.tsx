
import React from 'react';
import { PlantAction } from '../types';

interface Props {
  actions: PlantAction[];
  onAction: (action: PlantAction) => void;
}

export const QuickActions: React.FC<Props> = ({ actions, onAction }) => {
  return (
    <section className="px-4 mb-6">
      <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
         <span>✨</span> Acciones Rápidas
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
          {actions.map(action => (
              <button
                 key={action.id}
                 onClick={() => onAction(action)}
                 className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 active:scale-95 transition-all group"
              >
                  <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{action.icon}</span>
                  <span className="text-xs font-medium text-slate-200">{action.label}</span>
                  <div className="mt-1 px-2 py-0.5 bg-black/30 rounded text-[10px] text-cyan-300 font-mono">
                      {action.cost.mana > 0 ? `-${action.cost.mana} 💧` : 'Gratis'}
                  </div>
              </button>
          ))}
      </div>
    </section>
  );
};
