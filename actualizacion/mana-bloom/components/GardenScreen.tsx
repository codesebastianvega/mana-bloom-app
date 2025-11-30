
import React, { useState, useEffect } from 'react';
import { GARDEN_ITEMS, INITIAL_GARDEN_LAYOUT, USER_DATA, MOCK_FRIENDS } from '../constants';
import { GardenObject, GardenItem } from '../types';

export const GardenScreen: React.FC = () => {
  const GRID_SIZE = 6;
  const [objects, setObjects] = useState<GardenObject[]>(INITIAL_GARDEN_LAYOUT);
  const [mode, setMode] = useState<'view' | 'build'>('view');
  const [selectedTile, setSelectedTile] = useState<{x: number, y: number} | null>(null);
  const [selectedObject, setSelectedObject] = useState<GardenObject | null>(null);
  const [buildCategory, setBuildCategory] = useState<'plants' | 'decor' | 'paths' | 'special'>('plants');
  const [activeTab, setActiveTab] = useState<'inventory' | 'shop'>('inventory');

  // Simulated Interaction Feedback
  const handleInteraction = (obj: GardenObject, action: string) => {
      if (navigator.vibrate) navigator.vibrate(20);
      alert(`Acción: ${action} en objeto ${obj.id}`);
      setSelectedObject(null);
  };

  // Build Logic
  const handlePlaceItem = (item: GardenItem) => {
      if (!selectedTile) {
          alert("Selecciona una parcela primero.");
          return;
      }
      // Check if occupied
      const isOccupied = objects.find(o => o.x === selectedTile.x && o.y === selectedTile.y);
      if (isOccupied) {
          alert("Parcela ocupada.");
          return;
      }

      if (navigator.vibrate) navigator.vibrate(50);
      const newObj: GardenObject = {
          id: `new-${Date.now()}`,
          itemId: item.id,
          x: selectedTile.x,
          y: selectedTile.y,
          health: 100,
      };
      setObjects([...objects, newObj]);
  };

  const handleRemoveObject = () => {
      if (selectedObject) {
          if (confirm("¿Eliminar este objeto?")) {
              setObjects(objects.filter(o => o.id !== selectedObject.id));
              setSelectedObject(null);
          }
      }
  };

  // Helper to render isometric positioning
  // X axis goes down-right, Y axis goes down-left
  const getIsoPosition = (x: number, y: number) => {
      // Center of screen is roughly 50% left, 20% top
      const topOffset = 15; 
      const tileWidth = 12; // Percent
      const tileHeight = 6; // Percent

      const left = 50 + (x - y) * (tileWidth / 2);
      const top = topOffset + (x + y) * (tileHeight / 2);
      const zIndex = x + y; // Depth sorting

      return { left: `${left}%`, top: `${top}%`, zIndex };
  };

  return (
    <div className="min-h-screen bg-[#0e0a1e] relative overflow-hidden flex flex-col">
      
      {/* --- 1. HUD (Heads Up Display) --- */}
      <div className="absolute top-0 left-0 right-0 z-50 px-4 py-4 flex flex-col gap-2 pointer-events-none">
          
          {/* Top Bar: Resources & Mode */}
          <div className="flex justify-between items-start pointer-events-auto">
              {/* Resources */}
              <div className="flex gap-2">
                  <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 border border-white/10">
                      <span className="text-xs">💧</span>
                      <span className="text-xs font-bold text-blue-300">{USER_DATA.resources.mana}</span>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 border border-white/10">
                      <span className="text-xs">🪙</span>
                      <span className="text-xs font-bold text-amber-300">{USER_DATA.resources.coins}</span>
                  </div>
              </div>

              {/* Mode Toggle */}
              <div className="flex bg-black/60 backdrop-blur-md rounded-xl p-1 border border-white/10">
                  <button 
                    onClick={() => setMode('view')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${mode === 'view' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}
                  >
                      👁️ Ver
                  </button>
                  <button 
                    onClick={() => { setMode('build'); setSelectedObject(null); }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${mode === 'build' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-400'}`}
                  >
                      🔨 Construir
                  </button>
              </div>
          </div>

          {/* Active Challenge Banner */}
          <div className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 backdrop-blur-md border border-white/10 rounded-lg p-2 flex items-center justify-between pointer-events-auto w-fit self-center">
              <div className="flex items-center gap-2">
                  <span className="text-xs">🌸</span>
                  <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-purple-200 uppercase">Festival Sakura</span>
                      <span className="text-[10px] text-white">Planta 3 cerezos</span>
                  </div>
              </div>
              <button className="ml-3 px-2 py-1 bg-white/10 rounded text-[9px] font-bold text-white hover:bg-white/20">Ver</button>
          </div>
      </div>

      {/* --- 2. ISOMETRIC VIEWPORT --- */}
      <div className="flex-1 relative overflow-hidden cursor-move">
          
          {/* Atmosphere Layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1629] to-[#0e0a1e] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
          
          {/* The Grid */}
          <div className="absolute inset-0 top-20 transition-transform duration-500 scale-100">
              {Array.from({ length: GRID_SIZE }).map((_, x) => (
                  Array.from({ length: GRID_SIZE }).map((_, y) => {
                      const pos = getIsoPosition(x, y);
                      const isSelected = selectedTile?.x === x && selectedTile?.y === y;
                      const objectOnTile = objects.find(o => o.x === x && o.y === y);
                      const itemDetails = objectOnTile ? GARDEN_ITEMS.find(i => i.id === objectOnTile.itemId) : null;

                      return (
                          <div 
                            key={`${x}-${y}`}
                            className="absolute w-[80px] h-[80px] flex items-center justify-center transition-all duration-200"
                            style={{ 
                                left: `calc(${pos.left} - 40px)`, 
                                top: pos.top, 
                                zIndex: pos.zIndex 
                            }}
                          >
                              {/* Ground Tile (Diamond Shape via CSS) */}
                              <div 
                                onClick={() => {
                                    setSelectedTile({x, y});
                                    if (objectOnTile && mode === 'view') setSelectedObject(objectOnTile);
                                    else if (mode === 'build' && objectOnTile) setSelectedObject(objectOnTile);
                                }}
                                className={`w-[60px] h-[60px] rotate-45 border-2 transition-colors cursor-pointer shadow-2xl
                                    ${isSelected 
                                        ? 'bg-emerald-500/40 border-emerald-400 z-10 scale-105' 
                                        : 'bg-[#151221] border-white/5 hover:border-white/20 hover:bg-white/5'
                                    }
                                `}
                              ></div>

                              {/* Object Render */}
                              {itemDetails && (
                                  <div 
                                    className={`absolute -top-8 pointer-events-none transition-all duration-300
                                        ${isSelected && mode === 'build' ? 'animate-bounce' : ''}
                                    `}
                                  >
                                      <span className="text-5xl filter drop-shadow-lg">{itemDetails.icon}</span>
                                      {/* Need Water Indicator */}
                                      {objectOnTile.health && objectOnTile.health < 50 && (
                                          <div className="absolute -top-2 right-0 bg-blue-500 text-white text-[10px] px-1 rounded-full animate-pulse">💧</div>
                                      )}
                                  </div>
                              )}
                          </div>
                      );
                  })
              ))}
          </div>

          {/* AI Coach Floater */}
          <button className="absolute top-1/2 right-4 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/40 animate-pulse hover:scale-110 transition-transform z-40">
              <span className="text-xl">🤖</span>
          </button>

      </div>

      {/* --- 3. BOTTOM INTERFACE --- */}
      
      {/* BUILD MODE PALETTE */}
      {mode === 'build' && (
          <div className="bg-[#1a1629] border-t border-white/10 p-4 pb-24 animate-in slide-in-from-bottom-10 z-50">
              <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-2">
                      {(['plants', 'decor', 'paths'] as const).map(cat => (
                          <button 
                            key={cat}
                            onClick={() => setBuildCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase ${buildCategory === cat ? 'bg-white text-black' : 'bg-white/5 text-slate-400'}`}
                          >
                              {cat === 'plants' ? 'Plantas' : cat === 'decor' ? 'Decor' : 'Caminos'}
                          </button>
                      ))}
                  </div>
                  {selectedObject && (
                      <button 
                        onClick={handleRemoveObject}
                        className="text-red-400 text-xs font-bold flex items-center gap-1 bg-red-900/20 px-2 py-1 rounded hover:bg-red-900/40"
                      >
                          🗑️ Quitar
                      </button>
                  )}
              </div>

              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {GARDEN_ITEMS.filter(i => i.type === buildCategory).map(item => (
                      <button 
                        key={item.id}
                        onClick={() => handlePlaceItem(item)}
                        className="min-w-[70px] flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 active:scale-95 transition-all"
                      >
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-[9px] font-bold text-slate-300 truncate w-full text-center">{item.name}</span>
                          <span className={`text-[9px] ${item.currency === 'gems' ? 'text-pink-400' : 'text-amber-400'}`}>
                              {item.cost} {item.currency === 'gems' ? '💎' : '🪙'}
                          </span>
                      </button>
                  ))}
              </div>
          </div>
      )}

      {/* VIEW MODE OVERLAY (Visitors & Shop) */}
      {mode === 'view' && (
          <div className="absolute bottom-24 left-0 right-0 px-4 flex justify-between items-end pointer-events-none">
              {/* Visitors List */}
              <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-3 pointer-events-auto max-w-[60%]">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Visitantes Recientes</p>
                  <div className="flex -space-x-2">
                      {MOCK_FRIENDS.slice(0, 3).map(f => (
                          <img key={f.id} src={f.avatarUrl} className="w-8 h-8 rounded-full border-2 border-[#1a1629]" alt={f.name} />
                      ))}
                      <button className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#1a1629] flex items-center justify-center text-[10px] text-white font-bold">
                          +2
                      </button>
                  </div>
                  <button className="mt-2 w-full py-1 bg-emerald-900/50 text-emerald-400 text-[10px] font-bold rounded hover:bg-emerald-900/80">
                      Visitar Amigos
                  </button>
              </div>

              {/* Shop Button */}
              <button className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center text-2xl text-white pointer-events-auto hover:scale-110 transition-transform">
                  🛒
              </button>
          </div>
      )}

      {/* OBJECT CONTEXT MODAL (Interaction) */}
      {selectedObject && mode === 'view' && (
          <div className="absolute bottom-0 left-0 right-0 z-[60] bg-[#1a1629] border-t border-white/10 rounded-t-3xl p-5 animate-in slide-in-from-bottom-full">
              <div className="flex gap-4">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl border border-white/10">
                      {GARDEN_ITEMS.find(i => i.id === selectedObject.itemId)?.icon}
                  </div>
                  <div className="flex-1">
                      <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold text-white">{GARDEN_ITEMS.find(i => i.id === selectedObject.itemId)?.name}</h3>
                          <button onClick={() => setSelectedObject(null)} className="text-slate-500 hover:text-white">✕</button>
                      </div>
                      <p className="text-xs text-slate-400 mb-1">{GARDEN_ITEMS.find(i => i.id === selectedObject.itemId)?.description}</p>
                      <p className="text-[10px] text-emerald-400 font-mono mb-3">Edad: 5 días • Plantado: 12/05/24</p>
                      
                      {/* Status Bar */}
                      {selectedObject.health !== undefined && (
                          <div className="mb-4">
                              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                                  <span>Salud</span>
                                  <span>{selectedObject.health}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-green-500 w-[80%]"></div>
                              </div>
                          </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                          <button onClick={() => handleInteraction(selectedObject, 'Regar')} className="flex-1 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-xl text-xs font-bold hover:bg-blue-500/30">
                              💧 Regar
                          </button>
                          <button onClick={() => handleInteraction(selectedObject, 'Podar')} className="flex-1 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold hover:bg-emerald-500/30">
                              ✂️ Podar
                          </button>
                          <button onClick={() => handleInteraction(selectedObject, 'Cantar')} className="flex-1 py-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-bold hover:bg-purple-500/30">
                              🎵 Cantar
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};
