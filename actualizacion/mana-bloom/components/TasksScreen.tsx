
import React, { useState } from 'react';
import { MOCK_TASKS } from '../constants';
import { TaskFilters } from './TaskFilters';
import { TaskCard } from './TaskCard';
import { CreateTaskModal } from './CreateTaskModal';
import { ConfettiFX } from './ConfettiFX'; 
import { Task } from '../types';
import { GoogleGenAI } from "@google/genai";

export const TasksScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isGeneratingMagic, setIsGeneratingMagic] = useState(false);
  
  // --- View Preferences State (Gear Menu) ---
  const [showViewSettings, setShowViewSettings] = useState(false);
  const [viewConfig, setViewConfig] = useState({
      compactMode: false,
      hideCompleted: false,
      showProgressBar: true
  });

  // --- Actions Menu State (Three Dots) ---
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());
  
  // Confetti State
  const [confetti, setConfetti] = useState<{trigger: boolean, x: number, y: number}>({ trigger: false, x: 0, y: 0 });

  // --- Handlers ---

  const handleCompleteTask = (taskId: string, e?: React.MouseEvent | React.TouchEvent) => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    
    if (e) {
        if ('touches' in e) {
             x = e.touches[0].clientX;
             y = e.touches[0].clientY;
        } else if ('clientX' in e) {
             x = (e as React.MouseEvent).clientX;
             y = (e as React.MouseEvent).clientY;
        }
    }

    setConfetti({ trigger: true, x, y });
    if (navigator.vibrate) navigator.vibrate([50, 50, 50]);

    setTasks(prevTasks => prevTasks.map(t => 
      t.id === taskId ? { ...t, status: 'completed' } : t
    ));
    
    setTimeout(() => setConfetti({ trigger: false, x: 0, y: 0 }), 2000);
  };

  const handleDeleteTask = (taskId: string) => {
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
      if (navigator.vibrate) navigator.vibrate([20, 50]);
  };

  const handleFocusTask = (task: Task) => {
      alert(`🔮 Iniciando sesión de foco para: ${task.title}`);
  };

  const handleCreateTask = async (newTaskData: any) => {
      setIsGeneratingMagic(true);
      let magicWarning = "";

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Actúa como un guía de juego de rol de fantasía irónico y místico. 
        Genera una "advertencia mágica" o broma muy breve (máximo 12 palabras) para una tarea creada por el usuario.
        Título: "${newTaskData.title}".
        Tipo: "${newTaskData.type}".
        Dificultad: "${newTaskData.difficulty}".
        Responde SOLAMENTE con el texto de la advertencia, sin comillas ni explicaciones.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        magicWarning = response.text.trim();
      } catch (error) {
        console.error("Error generating magic warning:", error);
        const fallbacks = [
            "El destino observa tus pasos...",
            "Cuidado con los bugs del vacío.",
            "Una tarea peligrosa, procede con cautela.",
            "La magia requiere sacrificio."
        ];
        magicWarning = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }

      const newTask: Task = {
          id: `t-${Date.now()}`,
          title: newTaskData.title,
          description: newTaskData.description,
          warning: magicWarning, 
          type: newTaskData.type,
          priority: newTaskData.priority,
          difficulty: newTaskData.difficulty,
          element: newTaskData.element,
          rewards: { xp: 50, mana: 20 },
          status: 'pending',
          tags: newTaskData.tags,
          dueDate: newTaskData.dueDate || 'Hoy',
          subtasks: newTaskData.subtasks || []
      };
      
      setTasks([newTask, ...tasks]);
      setIsGeneratingMagic(false);
      setShowCreateModal(false);
  };

  // --- Bulk Action Handlers (Menu) ---

  const handlePurifyGraveyard = () => {
      const completedCount = tasks.filter(t => t.status === 'completed').length;
      if (completedCount === 0) {
          alert("El cementerio ya está limpio.");
          return;
      }
      if (confirm(`¿Purificar ${completedCount} misiones completadas?`)) {
          setTasks(prev => prev.filter(t => t.status !== 'completed'));
          if (navigator.vibrate) navigator.vibrate([50, 100]);
          setShowActionMenu(false);
      }
  };

  const handleProcrastinate = () => {
      const todayTasks = tasks.filter(t => t.status === 'pending' && t.dueDate === 'Hoy');
      if (todayTasks.length === 0) {
          alert("No tienes misiones para hoy.");
          return;
      }
      
      setTasks(prev => prev.map(t => {
          if (t.status === 'pending' && t.dueDate === 'Hoy') {
              return { ...t, dueDate: 'Mañana' };
          }
          return t;
      }));
      alert(`Has postergado ${todayTasks.length} misiones. La magia del tiempo te da un respiro.`);
      setShowActionMenu(false);
  };

  const handleShareQuests = () => {
      const pending = tasks.filter(t => t.status === 'pending');
      const text = `📜 **Tablón de Misiones Mana Bloom**\n\n${pending.map(t => `[ ] ${t.title} (${t.priority})`).join('\n')}\n\n✨ *Forjado en el Grimorio*`;
      
      navigator.clipboard.writeText(text).then(() => {
          alert("Misiones copiadas al portapapeles mágico.");
          setShowActionMenu(false);
      });
  };

  const toggleSelectionMode = () => {
      setIsSelectionMode(!isSelectionMode);
      setSelectedTaskIds(new Set()); // Clear selection on toggle
      setShowActionMenu(false);
  };

  // --- Selection Mode Logic ---

  const handleToggleSelection = (taskId: string) => {
      const newSelection = new Set(selectedTaskIds);
      if (newSelection.has(taskId)) {
          newSelection.delete(taskId);
      } else {
          newSelection.add(taskId);
      }
      setSelectedTaskIds(newSelection);
  };

  const handleBulkDelete = () => {
      if (selectedTaskIds.size === 0) return;
      if (confirm(`¿Eliminar ${selectedTaskIds.size} misiones seleccionadas?`)) {
          setTasks(prev => prev.filter(t => !selectedTaskIds.has(t.id)));
          setIsSelectionMode(false);
          setSelectedTaskIds(new Set());
      }
  };

  const handleBulkComplete = () => {
      if (selectedTaskIds.size === 0) return;
      setTasks(prev => prev.map(t => selectedTaskIds.has(t.id) ? { ...t, status: 'completed' } : t));
      setIsSelectionMode(false);
      setSelectedTaskIds(new Set());
      setConfetti({ trigger: true, x: window.innerWidth/2, y: window.innerHeight/2 });
      setTimeout(() => setConfetti({ trigger: false, x: 0, y: 0 }), 2000);
  };


  const getSmartCategory = (task: Task): 'boss' | 'important' | 'minor' => {
      if (task.priority === 'high' || task.dueDate === 'Hoy') return 'boss';
      if (task.priority === 'medium') return 'important';
      return 'minor';
  };

  // --- Filtering & Sorting ---

  const filteredTasks = tasks.filter(task => {
    // Filter by Tab logic
    if (activeTab === 'all') return true;
    
    // Smart Categories Filters
    if (activeTab === 'boss') return getSmartCategory(task) === 'boss';
    if (activeTab === 'important') return getSmartCategory(task) === 'important';
    if (activeTab === 'minor') return getSmartCategory(task) === 'minor';

    // Type Filters
    return task.type === activeTab;
  });

  const pendingTasks = filteredTasks.filter(t => t.status !== 'completed');
  const completedTasks = filteredTasks.filter(t => t.status === 'completed');

  // Grouping for Display (Only relevant if viewing 'all' or specific categories)
  const bossTasks = pendingTasks.filter(t => getSmartCategory(t) === 'boss');
  const importantTasks = pendingTasks.filter(t => getSmartCategory(t) === 'important');
  const minorTasks = pendingTasks.filter(t => getSmartCategory(t) === 'minor');

  // Quest Progress Math
  const totalDailyTasks = filteredTasks.length;
  const completedCount = completedTasks.length;
  const progressPercentage = totalDailyTasks > 0 ? (completedCount / totalDailyTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-mana-dark pb-24 relative overflow-x-hidden" onClick={() => { setShowViewSettings(false); setShowActionMenu(false); }}>
      
      {/* Confetti Layer */}
      <ConfettiFX trigger={confetti.trigger} x={confetti.x} y={confetti.y} />

      {/* Unified Sticky Header Area */}
      <div className="sticky top-0 z-40 bg-mana-dark/95 backdrop-blur-md border-b border-white/5 shadow-2xl shadow-black/20">
        
        {/* Title Row */}
        <header className="px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Libro de Misiones</h1>
            <p className="text-xs text-slate-400">{pendingTasks.length} encargos activos</p>
          </div>
          <div className="flex items-center gap-2 relative">
            
            {/* 1. GEAR BUTTON (Visualization Settings) */}
            <button 
                onClick={(e) => { e.stopPropagation(); setShowViewSettings(!showViewSettings); setShowActionMenu(false); }}
                className={`p-2 rounded-full transition-colors ${showViewSettings ? 'bg-white/10 text-white' : 'hover:bg-white/10 text-slate-300'}`}
            >
              <span className="text-lg">⚙️</span>
            </button>
            
            {/* View Settings Popover */}
            {showViewSettings && (
                <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute top-12 right-0 w-60 bg-[#1a1629] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200"
                >
                    <p className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Visualización</p>
                    
                    {/* Toggle: Compact Mode */}
                    <button 
                        onClick={() => setViewConfig({...viewConfig, compactMode: !viewConfig.compactMode})}
                        className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/5 rounded-lg transition-colors group"
                    >
                        <div className="flex items-center gap-2 text-sm text-slate-200">
                            <span>📦</span> Modo Compacto
                        </div>
                        <div className={`w-8 h-4 rounded-full relative transition-colors ${viewConfig.compactMode ? 'bg-mana-primary' : 'bg-slate-700'}`}>
                             <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${viewConfig.compactMode ? 'translate-x-4' : ''}`}></div>
                        </div>
                    </button>

                    {/* Toggle: Hide Completed */}
                    <button 
                        onClick={() => setViewConfig({...viewConfig, hideCompleted: !viewConfig.hideCompleted})}
                        className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/5 rounded-lg transition-colors group"
                    >
                        <div className="flex items-center gap-2 text-sm text-slate-200">
                            <span>👻</span> Ocultar Completadas
                        </div>
                        <div className={`w-8 h-4 rounded-full relative transition-colors ${viewConfig.hideCompleted ? 'bg-mana-primary' : 'bg-slate-700'}`}>
                             <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${viewConfig.hideCompleted ? 'translate-x-4' : ''}`}></div>
                        </div>
                    </button>

                    {/* Toggle: Progress Bar */}
                    <button 
                        onClick={() => setViewConfig({...viewConfig, showProgressBar: !viewConfig.showProgressBar})}
                        className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/5 rounded-lg transition-colors group"
                    >
                        <div className="flex items-center gap-2 text-sm text-slate-200">
                            <span>📊</span> Barra de Progreso
                        </div>
                         <div className={`w-8 h-4 rounded-full relative transition-colors ${viewConfig.showProgressBar ? 'bg-mana-primary' : 'bg-slate-700'}`}>
                             <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${viewConfig.showProgressBar ? 'translate-x-4' : ''}`}></div>
                        </div>
                    </button>
                </div>
            )}

            {/* 2. THREE DOTS (Bulk Actions) */}
            <button 
                onClick={(e) => { e.stopPropagation(); setShowActionMenu(!showActionMenu); setShowViewSettings(false); }}
                className={`p-2 rounded-full transition-colors ${showActionMenu ? 'bg-white/10 text-white' : 'hover:bg-white/10 text-slate-300'}`}
            >
              <span className="text-lg">⋮</span>
            </button>

            {/* Actions Menu Popover */}
            {showActionMenu && (
                <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute top-12 right-0 w-64 bg-[#1a1629] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200"
                >
                    <p className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gestión del Grimorio</p>
                    
                    <button onClick={handlePurifyGraveyard} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left group">
                        <span className="text-lg group-hover:scale-110 transition-transform">🧹</span>
                        <div>
                            <p className="text-sm font-medium text-slate-200">Purificar Cementerio</p>
                            <p className="text-[9px] text-slate-500">Borrar todas las completadas</p>
                        </div>
                    </button>

                    <button onClick={handleProcrastinate} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left group">
                        <span className="text-lg group-hover:scale-110 transition-transform">⏳</span>
                        <div>
                            <p className="text-sm font-medium text-slate-200">La Gran Procrastinación</p>
                            <p className="text-[9px] text-slate-500">Mover tareas de hoy a mañana</p>
                        </div>
                    </button>

                    <button onClick={handleShareQuests} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-left group">
                        <span className="text-lg group-hover:scale-110 transition-transform">📤</span>
                        <div>
                            <p className="text-sm font-medium text-slate-200">Compartir Misiones</p>
                            <p className="text-[9px] text-slate-500">Copiar lista al portapapeles</p>
                        </div>
                    </button>

                    <div className="my-1 border-t border-white/5"></div>

                    <button onClick={toggleSelectionMode} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-mana-primary/20 rounded-lg transition-colors text-left group">
                        <span className="text-lg group-hover:scale-110 transition-transform">☑️</span>
                        <p className="text-sm font-medium text-slate-200">Selección Múltiple</p>
                    </button>
                </div>
            )}

          </div>
        </header>

        {/* Filters Row */}
        <TaskFilters 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onOpenAdvanced={() => setShowFilters(true)}
        />
      </div>

      <div className={`px-4 py-4 space-y-6 transition-all duration-300 ${isSelectionMode ? 'pb-28' : ''}`}>

        {/* 1. Quest Progress Bar (Daily) - Conditional Render */}
        {totalDailyTasks > 0 && viewConfig.showProgressBar && (
            <div className="bg-[#1a1629] border border-white/10 rounded-xl p-3 shadow-inner animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progreso Diario</span>
                    <span className="text-xs font-bold text-white">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-mana-secondary to-teal-500 transition-all duration-1000 ease-out relative"
                        style={{ width: `${progressPercentage}%` }}
                    >
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]"></div>
                    </div>
                </div>
            </div>
        )}

        {/* Empty State */}
        {pendingTasks.length === 0 && activeTab === 'all' && (
          <div className="py-12 flex flex-col items-center justify-center text-center opacity-60">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                <span className="text-2xl">✨</span>
             </div>
             <h3 className="text-lg font-bold text-white mb-1">Todo está tranquilo</h3>
             <p className="text-sm text-slate-400">Disfruta el silencio o crea una nueva aventura.</p>
          </div>
        )}

        {/* --- GROUP 1: JEFES DE ZONA (High Priority + Urgent) --- */}
        {bossTasks.length > 0 && (
            <section className="animate-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-2 mb-3 bg-red-900/10 p-2 rounded-lg border border-red-500/20">
                    <span className="text-xl animate-pulse">🔥</span>
                    <div>
                        <h2 className="text-sm font-black text-red-400 uppercase tracking-widest">Jefes de Zona</h2>
                        {!viewConfig.compactMode && <p className="text-[9px] text-red-300/70">Alta Prioridad / Vence Hoy</p>}
                    </div>
                </div>
                {bossTasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onComplete={() => handleCompleteTask(task.id)}
                      onDelete={() => handleDeleteTask(task.id)}
                      onFocus={() => handleFocusTask(task)}
                      compact={viewConfig.compactMode}
                      isSelectionMode={isSelectionMode}
                      isSelected={selectedTaskIds.has(task.id)}
                      onToggleSelection={() => handleToggleSelection(task.id)}
                    />
                ))}
            </section>
        )}

        {/* --- GROUP 2: MISIONES IMPORTANTES (Medium Priority) --- */}
        {importantTasks.length > 0 && (
            <section className="animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-3 pl-2 border-l-2 border-indigo-500">
                    <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">Misiones Importantes</h2>
                    <span className="text-xs text-slate-500 font-normal">({importantTasks.length})</span>
                </div>
                {importantTasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onComplete={() => handleCompleteTask(task.id)}
                      onDelete={() => handleDeleteTask(task.id)}
                      onFocus={() => handleFocusTask(task)}
                      compact={viewConfig.compactMode}
                      isSelectionMode={isSelectionMode}
                      isSelected={selectedTaskIds.has(task.id)}
                      onToggleSelection={() => handleToggleSelection(task.id)}
                    />
                ))}
            </section>
        )}

        {/* --- GROUP 3: ENCARGOS MENORES (Low Priority) --- */}
        {minorTasks.length > 0 && (
            <section className="animate-in slide-in-from-bottom-6 duration-500">
                 <div className="flex items-center gap-2 mb-3 pl-2 border-l-2 border-slate-600 opacity-80">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Encargos Menores</h2>
                </div>
                {minorTasks.map(task => (
                    <div key={task.id} className="opacity-90 hover:opacity-100 transition-opacity">
                        <TaskCard 
                          task={task} 
                          onComplete={() => handleCompleteTask(task.id)}
                          onDelete={() => handleDeleteTask(task.id)}
                          onFocus={() => handleFocusTask(task)}
                          compact={viewConfig.compactMode}
                          isSelectionMode={isSelectionMode}
                          isSelected={selectedTaskIds.has(task.id)}
                          onToggleSelection={() => handleToggleSelection(task.id)}
                        />
                    </div>
                ))}
            </section>
        )}

        {/* 4. Completed Section - Conditional Render */}
        {completedTasks.length > 0 && !viewConfig.hideCompleted && (
            <section className="pt-6 opacity-50 hover:opacity-80 transition-opacity duration-300">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-px bg-white/10 flex-1"></div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Cementerio de Tareas</span>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>
                {completedTasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task}
                      onDelete={() => handleDeleteTask(task.id)} 
                      compact={viewConfig.compactMode}
                      isSelectionMode={isSelectionMode}
                      isSelected={selectedTaskIds.has(task.id)}
                      onToggleSelection={() => handleToggleSelection(task.id)}
                    />
                ))}
            </section>
        )}
      </div>

      {/* FAB (Only show when NOT in selection mode) */}
      {!isSelectionMode && (
        <button 
            onClick={() => setShowCreateModal(true)}
            className="fixed bottom-24 right-5 w-14 h-14 bg-gradient-to-r from-mana-primary to-mana-accent rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center justify-center text-white z-40 hover:scale-110 active:scale-95 transition-all"
        >
            <span className="text-2xl font-bold">+</span>
        </button>
      )}

      {/* FLOATING BULK ACTIONS TOOLBAR (Only in Selection Mode) */}
      {isSelectionMode && (
          <div className="fixed bottom-24 left-4 right-4 z-50 animate-in slide-in-from-bottom-10">
              <div className="bg-[#1a1629] border border-white/20 rounded-2xl p-3 shadow-2xl flex items-center gap-3">
                  <div className="bg-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-white">
                      {selectedTaskIds.size}
                  </div>
                  <div className="h-6 w-px bg-white/10"></div>
                  
                  <button 
                    onClick={handleBulkComplete}
                    disabled={selectedTaskIds.size === 0}
                    className="flex-1 py-2 bg-mana-secondary/20 hover:bg-mana-secondary/30 text-mana-secondary rounded-lg text-xs font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                      <span>✓</span> Completar
                  </button>
                  
                  <button 
                    onClick={handleBulkDelete}
                    disabled={selectedTaskIds.size === 0}
                    className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                      <span>🗑️</span> Borrar
                  </button>

                  <button 
                    onClick={toggleSelectionMode}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
                  >
                      ✕
                  </button>
              </div>
          </div>
      )}

      {/* Create Task Modal */}
      {showCreateModal && (
          <CreateTaskModal 
            onClose={() => !isGeneratingMagic && setShowCreateModal(false)}
            onSave={handleCreateTask}
            isLoading={isGeneratingMagic}
          />
      )}

      {/* Advanced Filter Modal (Mock) */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="w-full max-w-sm bg-mana-card border border-white/10 rounded-2xl p-5 shadow-2xl relative animate-in slide-in-from-bottom-10">
                <button 
                    onClick={() => setShowFilters(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    ✕
                </button>
                <h3 className="text-lg font-bold text-white mb-4">Filtros Avanzados</h3>
                <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl text-center text-slate-400 text-sm">
                        Opciones de filtrado mágico pronto...
                    </div>
                </div>
                <div className="flex gap-3 mt-6">
                    <button onClick={() => setShowFilters(false)} className="flex-1 py-3 text-sm font-bold text-slate-400 hover:text-white">
                        Limpiar
                    </button>
                    <button onClick={() => setShowFilters(false)} className="flex-1 py-3 rounded-xl bg-mana-primary text-white text-sm font-bold shadow-lg">
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};
