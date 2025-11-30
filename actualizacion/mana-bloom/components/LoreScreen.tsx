
import React, { useState } from 'react';
import { LORE_CHAPTERS } from '../constants';
import { LoreChapter } from '../types';

interface Props {
  onBack: () => void;
  userLevel: number;
}

export const LoreScreen: React.FC<Props> = ({ onBack, userLevel }) => {
  const [selectedChapter, setSelectedChapter] = useState<LoreChapter | null>(null);

  // Filter valid chapters
  const chapters = LORE_CHAPTERS;

  return (
    <div className="min-h-screen bg-[#0b0816] text-slate-200 flex flex-col relative">
      
      {/* Detail View Overlay */}
      {selectedChapter && (
          <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex flex-col animate-in fade-in duration-300">
              <div className="flex-1 overflow-y-auto p-8 max-w-lg mx-auto w-full">
                  <button onClick={() => setSelectedChapter(null)} className="mb-6 text-slate-400 hover:text-white flex items-center gap-2">
                      ← Volver al índice
                  </button>
                  
                  <div className="flex justify-center mb-8">
                      <span className="text-6xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-pulse">
                          {selectedChapter.image}
                      </span>
                  </div>

                  <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-purple-200 mb-2 text-center font-serif tracking-tight">
                      {selectedChapter.title}
                  </h2>
                  <div className="flex justify-center items-center gap-2 mb-8">
                      <span className="h-px w-10 bg-white/20"></span>
                      <p className="text-xs text-amber-500 font-bold uppercase tracking-widest">Capítulo {selectedChapter.chapterNumber}</p>
                      <span className="h-px w-10 bg-white/20"></span>
                  </div>

                  <p className="text-lg leading-relaxed text-slate-300 font-serif drop-shadow-md text-justify">
                      {selectedChapter.content}
                  </p>

                  <div className="mt-12 p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                      <p className="text-[10px] text-slate-500 uppercase">Recompensa de lectura</p>
                      <p className="text-sm font-bold text-emerald-400">+50 Sabiduría XP</p>
                  </div>
              </div>
          </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0b0816]/95 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <button 
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
                ←
            </button>
            <h1 className="text-lg font-bold text-white">Grimorio Perdido</h1>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold text-amber-400">
            Temp. 1
        </div>
      </header>

      {/* Content List */}
      <div className="flex-1 px-4 py-6 space-y-6 max-w-lg mx-auto w-full">
          
          <div className="bg-gradient-to-b from-purple-900/20 to-transparent p-6 rounded-3xl border border-purple-500/20 text-center mb-8">
              <h2 className="text-2xl font-serif text-white mb-2">El Origen de la Semilla</h2>
              <p className="text-sm text-purple-200/70 italic">
                  "Todo gran bosque comienza con un pequeño hábito."
              </p>
          </div>

          <div className="relative border-l-2 border-white/10 ml-4 space-y-8 pb-10">
              {chapters.map((chapter, index) => {
                  const isLocked = userLevel < chapter.unlockLevel && !chapter.isUnlocked;
                  
                  return (
                    <div key={chapter.id} className="relative pl-8 group">
                        {/* Timeline Node */}
                        <div 
                            className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 
                                ${isLocked 
                                    ? 'bg-[#0b0816] border-slate-700' 
                                    : 'bg-amber-500 border-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                                }
                            `}
                        ></div>

                        {/* Card */}
                        <button 
                            onClick={() => !isLocked && setSelectedChapter(chapter)}
                            disabled={isLocked}
                            className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden
                                ${isLocked 
                                    ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed' 
                                    : 'bg-[#1a1629] border-white/10 hover:border-amber-500/50 hover:bg-white/10 active:scale-[0.98] shadow-lg'
                                }
                            `}
                        >
                             {isLocked ? (
                                 <div className="flex items-center justify-between">
                                     <div>
                                         <h3 className="text-sm font-bold text-slate-500 mb-1">Capítulo {chapter.chapterNumber}: ???</h3>
                                         <p className="text-xs text-slate-600">Requiere Nivel {chapter.unlockLevel}</p>
                                     </div>
                                     <span className="text-2xl opacity-30">🔒</span>
                                 </div>
                             ) : (
                                 <>
                                     <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:scale-110 transition-transform duration-500">
                                         {chapter.image}
                                     </div>
                                     <div className="relative z-10">
                                         <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1 block">Capítulo {chapter.chapterNumber}</span>
                                         <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">{chapter.title}</h3>
                                         <p className="text-xs text-slate-400 line-clamp-2">{chapter.content}</p>
                                         <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
                                             <span className="bg-white/10 px-2 py-0.5 rounded">3 min lectura</span>
                                         </div>
                                     </div>
                                 </>
                             )}
                        </button>
                    </div>
                  )
              })}

              {/* Season 2 Teaser */}
              <div className="relative pl-8 opacity-50">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-[#0b0816] border-slate-800"></div>
                  <div className="p-5 border border-dashed border-white/10 rounded-2xl text-center">
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1">Temporada 2</p>
                      <p className="text-sm text-slate-600">La Sequía del Vacío</p>
                      <p className="text-[10px] text-slate-700 mt-2">Próximamente...</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
