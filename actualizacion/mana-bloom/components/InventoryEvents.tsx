import React from 'react';
import { EVENTS } from '../constants';

export const InventoryEvents: React.FC = () => {
  return (
    <section className="px-4 mb-24"> {/* Extra margin bottom for safe area */}
      
      {/* Inventory Snapshot */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
             <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <span>🎒</span> Inventario
             </h3>
             <button className="text-xs text-mana-primary">Abrir</button>
        </div>
        <div className="flex gap-2">
            <div className="flex-1 bg-white/5 border border-white/5 rounded-lg p-2 text-center">
                <span className="block text-lg font-bold text-white">12</span>
                <span className="text-[10px] text-slate-400">Pociones</span>
            </div>
            <div className="flex-1 bg-white/5 border border-white/5 rounded-lg p-2 text-center">
                <span className="block text-lg font-bold text-white">5</span>
                <span className="text-[10px] text-slate-400">Herram.</span>
            </div>
            <div className="flex-1 bg-white/5 border border-white/5 rounded-lg p-2 text-center">
                <span className="block text-lg font-bold text-white">3</span>
                <span className="text-[10px] text-slate-400">Cosm.</span>
            </div>
        </div>
      </div>

      {/* Events */}
      <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4 text-indigo-300">
            <span>📅</span>
            <h3 className="text-sm font-bold">Eventos Místicos</h3>
        </div>
        
        <div className="relative border-l border-white/10 ml-2 space-y-4">
            {EVENTS.map((event) => (
                <div key={event.id} className="relative pl-4">
                    <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-mana-dark ${event.type === 'season' ? 'bg-cyan-400' : 'bg-mana-primary'}`}></div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium text-white">{event.title}</p>
                            <p className="text-xs text-slate-400">{event.date}</p>
                        </div>
                        {event.type === 'season' && (
                            <span className="text-[10px] px-2 py-0.5 bg-cyan-900/50 text-cyan-300 rounded border border-cyan-500/20">
                                Temporada
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>

        <button className="mt-4 w-full flex items-center justify-center gap-2 text-xs text-slate-300 hover:text-white py-2 border-t border-white/5">
            Explorar Calendario <span>›</span>
        </button>
      </div>

    </section>
  );
};