
import React, { useState, useEffect } from 'react';
import { TaskType, TaskPriority, TaskElement, TaskDifficulty } from '../types';

interface Props {
  onClose: () => void;
  onSave: (taskData: any) => void;
  isLoading?: boolean;
}

export const CreateTaskModal: React.FC<Props> = ({ onClose, onSave, isLoading = false }) => {
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TaskType>('task');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [difficulty, setDifficulty] = useState<TaskDifficulty>('easy');
  const [element, setElement] = useState<TaskElement>('fire');
  const [duration, setDuration] = useState<number>(30); // minutes
  const [dueDate, setDueDate] = useState<string>('Hoy');
  const [isHabitRepeat, setIsHabitRepeat] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  // Subtasks State
  const [subtasks, setSubtasks] = useState<{id: string, title: string, completed: boolean}[]>([]);
  const [subtaskInput, setSubtaskInput] = useState('');

  // Derived State for Rewards
  const [estimatedXp, setEstimatedXp] = useState(0);
  const [estimatedMana, setEstimatedMana] = useState(0);

  // Haptic Feedback Helper
  const triggerHaptic = () => {
    if (navigator.vibrate) navigator.vibrate(10);
  };

  // Calculate Rewards on changes
  useEffect(() => {
    let baseXp = 10;
    let baseMana = 5;

    // Priority Multiplier
    if (priority === 'medium') { baseXp += 10; baseMana += 5; }
    if (priority === 'high') { baseXp += 30; baseMana += 15; }

    // Type Multiplier
    if (type === 'mission') { baseXp *= 2; baseMana *= 2; }
    if (type === 'ritual') { baseXp *= 1.5; baseMana *= 1.2; }

    // Difficulty Multiplier
    let diffMultiplier = 1;
    if (difficulty === 'medium') diffMultiplier = 1.5;
    if (difficulty === 'hard') diffMultiplier = 2.5;
    if (difficulty === 'legendary') diffMultiplier = 5;

    setEstimatedXp(Math.floor(baseXp * diffMultiplier));
    setEstimatedMana(Math.floor(baseMana * diffMultiplier));
  }, [type, priority, difficulty]);

  const handleSave = () => {
    triggerHaptic();
    onSave({
      title,
      description,
      type,
      priority,
      difficulty,
      element,
      duration,
      dueDate,
      isHabitRepeat,
      tags,
      subtasks
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
    }
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subtaskInput.trim()) return;
    setSubtasks([...subtasks, { id: `st-${Date.now()}`, title: subtaskInput.trim(), completed: false }]);
    setSubtaskInput('');
  };

  const removeSubtask = (id: string) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  // UI Helpers
  const getElementDescription = (el: TaskElement) => {
    switch(el) {
        case 'fire': return 'Creatividad y acción rápida.';
        case 'water': return 'Flujo, calma y enfoque.';
        case 'earth': return 'Constancia y fuerza.';
        case 'air': return 'Claridad mental y velocidad.';
        default: return 'Energía pura del vacío.';
    }
  };

  const getElementColor = (el: TaskElement, isActive: boolean) => {
      if (!isActive) return 'bg-white/5 border-white/10 text-slate-400 opacity-60';
      switch(el) {
          case 'fire': return 'bg-orange-900/40 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)] ring-1 ring-orange-500/50';
          case 'water': return 'bg-blue-900/40 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] ring-1 ring-blue-500/50';
          case 'earth': return 'bg-green-900/40 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)] ring-1 ring-green-500/50';
          case 'air': return 'bg-slate-700/40 border-slate-300 text-slate-200 shadow-[0_0_15px_rgba(203,213,225,0.3)] ring-1 ring-slate-400/50';
          default: return 'bg-purple-900/40 border-purple-500 text-purple-400';
      }
  };

  const getElementIcon = (el: string) => {
    switch(el) {
        case 'fire': return <div className="text-2xl mb-1">🔥</div>;
        case 'water': return <div className="text-2xl mb-1">💧</div>;
        case 'earth': return <div className="text-2xl mb-1">⛰️</div>;
        case 'air': return <div className="text-2xl mb-1">🌬️</div>;
        default: return <div className="text-2xl mb-1">✨</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={!isLoading ? onClose : undefined} />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#0e0a1e] border border-white/10 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-mana-primary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-mana-secondary/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/5 backdrop-blur-xl sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Forjar Misión</h2>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Nueva Tarea</p>
          </div>
          {!isLoading && (
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                  ✕
              </button>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          
          {/* 1. Title & Description Input */}
          <div className="space-y-4">
             <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nombre de la misión..." 
                disabled={isLoading}
                className="w-full bg-transparent text-2xl font-bold text-white placeholder:text-slate-600 focus:outline-none border-b-2 border-white/10 focus:border-mana-primary pb-2 transition-colors disabled:opacity-50"
                autoFocus
             />
             <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe el objetivo o añade notas..." 
                disabled={isLoading}
                className="w-full bg-white/5 rounded-xl p-3 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none border border-transparent focus:border-white/10 resize-none min-h-[80px] disabled:opacity-50"
                rows={3}
             />
          </div>

          {/* 2. Date Selector (Chips) */}
          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Fecha Límite</label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {['Hoy', 'Mañana', 'Fin de semana', 'Próx. Semana'].map(date => (
                    <button
                        key={date}
                        onClick={() => setDueDate(date)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-all
                            ${dueDate === date 
                                ? 'bg-mana-accent text-mana-dark border-mana-accent shadow-[0_0_10px_rgba(255,202,40,0.3)]' 
                                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        {date}
                    </button>
                ))}
            </div>
          </div>

          {/* 3. Type & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tipo de Misión</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['task', 'habit', 'mission', 'ritual'].map((t) => (
                        <button
                            key={t}
                            disabled={isLoading}
                            onClick={() => { setType(t as TaskType); triggerHaptic(); }}
                            className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-wide border transition-all
                                ${type === t 
                                    ? 'bg-mana-primary text-white border-mana-primary shadow-lg shadow-mana-primary/20' 
                                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                                }`}
                        >
                            {t === 'task' ? 'Tarea' : t === 'habit' ? 'Hábito' : t === 'mission' ? 'Misión' : 'Ritual'}
                        </button>
                    ))}
                  </div>
              </div>

              <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Dificultad</label>
                  <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'easy', label: 'Fácil', color: 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10' },
                        { id: 'medium', label: 'Normal', color: 'text-blue-400 border-blue-500/50 bg-blue-500/10' },
                        { id: 'hard', label: 'Difícil', color: 'text-orange-400 border-orange-500/50 bg-orange-500/10' },
                        { id: 'legendary', label: 'Épico', color: 'text-purple-400 border-purple-500/50 bg-purple-500/10' }
                      ].map((diff) => (
                          <button
                            key={diff.id}
                            disabled={isLoading}
                            onClick={() => { setDifficulty(diff.id as TaskDifficulty); triggerHaptic(); }}
                            className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all border
                                ${difficulty === diff.id 
                                    ? `${diff.color} shadow-lg scale-105` 
                                    : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'
                                }`}
                          >
                              {diff.label}
                          </button>
                      ))}
                  </div>
              </div>
          </div>

          {/* 4. Element Selector (Visual Cards) */}
          <div className="space-y-3">
             <div className="flex justify-between items-center">
                 <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Afinidad Elemental</label>
                 <span className="text-[10px] text-mana-primary font-medium animate-pulse">{getElementDescription(element)}</span>
             </div>
             <div className="grid grid-cols-4 gap-3">
                {[
                    { id: 'fire', label: 'Fuego' },
                    { id: 'water', label: 'Agua' },
                    { id: 'earth', label: 'Tierra' },
                    { id: 'air', label: 'Aire' }
                ].map((el) => {
                    const isActive = element === el.id;
                    return (
                        <button
                            key={el.id}
                            disabled={isLoading}
                            onClick={() => { setElement(el.id as TaskElement); triggerHaptic(); }}
                            className={`aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 relative overflow-hidden group
                                ${getElementColor(el.id as TaskElement, isActive)}
                            `}
                        >
                            <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                                {getElementIcon(el.id)}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider">{el.label}</span>
                        </button>
                    )
                })}
             </div>
          </div>

          {/* 5. Subtasks (Checklist) */}
          <div className="space-y-3">
             <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Lista de Pasos (Subtareas)</label>
             <div className="bg-[#151221] rounded-xl border border-white/5 overflow-hidden">
                 {subtasks.length > 0 && (
                     <div className="divide-y divide-white/5">
                         {subtasks.map(st => (
                             <div key={st.id} className="flex items-center justify-between p-3 group">
                                 <div className="flex items-center gap-3">
                                     <div className="w-4 h-4 rounded border border-slate-600"></div>
                                     <span className="text-sm text-slate-300">{st.title}</span>
                                 </div>
                                 <button onClick={() => removeSubtask(st.id)} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                                     ✕
                                 </button>
                             </div>
                         ))}
                     </div>
                 )}
                 <form onSubmit={handleAddSubtask} className="flex items-center gap-3 p-3 bg-white/5">
                     <span className="text-slate-500">+</span>
                     <input 
                        type="text"
                        value={subtaskInput}
                        onChange={(e) => setSubtaskInput(e.target.value)}
                        placeholder="Añadir paso..."
                        className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none"
                     />
                 </form>
             </div>
          </div>

          {/* 6. Settings Row (Priority, Duration, Repeat) */}
          <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Prioridad</label>
                  <select 
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as TaskPriority)}
                      className="w-full bg-white/5 text-xs text-white p-2 rounded-lg border border-white/10 outline-none focus:border-white/30"
                  >
                      <option value="low" className="bg-mana-dark">Baja</option>
                      <option value="medium" className="bg-mana-dark">Media</option>
                      <option value="high" className="bg-mana-dark">Alta</option>
                  </select>
              </div>
              <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Duración</label>
                  <select 
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full bg-white/5 text-xs text-white p-2 rounded-lg border border-white/10 outline-none focus:border-white/30"
                  >
                        <option value={15} className="bg-mana-dark">15m</option>
                        <option value={30} className="bg-mana-dark">30m</option>
                        <option value={60} className="bg-mana-dark">1h</option>
                        <option value={120} className="bg-mana-dark">2h</option>
                  </select>
              </div>
              <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase">Repetir</label>
                  <button 
                    onClick={() => setIsHabitRepeat(!isHabitRepeat)}
                    className={`w-full p-2 rounded-lg border text-xs font-bold transition-colors ${isHabitRepeat ? 'bg-mana-secondary/20 border-mana-secondary text-mana-secondary' : 'bg-white/5 border-white/10 text-slate-500'}`}
                  >
                      {isHabitRepeat ? 'Sí' : 'No'}
                  </button>
              </div>
          </div>

          {/* 7. Tags Input */}
          <div className="space-y-2">
                 <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Etiquetas</label>
                 <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded bg-mana-card border border-white/10 text-[10px] text-slate-300 flex items-center gap-1">
                            #{tag} <button onClick={() => setTags(tags.filter(t => t !== tag))}>✕</button>
                        </span>
                    ))}
                    <input 
                        className="bg-transparent text-xs text-slate-400 focus:outline-none focus:text-white min-w-[100px]"
                        placeholder="+ etiqueta..."
                        value={tagInput}
                        disabled={isLoading}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                 </div>
          </div>

        </div>

        {/* Footer: Reward Preview & Actions */}
        <div className="p-5 border-t border-white/10 bg-[#13111f]">
            {/* Reward Banner */}
            <div className="mb-4 flex items-center justify-between bg-gradient-to-r from-mana-primary/10 to-transparent p-3 rounded-xl border border-mana-primary/20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-mana-primary/20 flex items-center justify-center text-mana-primary text-sm">✨</div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Recompensas</p>
                        <p className="text-xs font-bold text-white flex gap-3">
                            <span>+{estimatedXp} XP</span>
                            <span className="text-cyan-300">+{estimatedMana} Mana</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button 
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 py-3.5 rounded-xl border border-white/10 text-slate-300 text-sm font-bold hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                    Cancelar
                </button>
                <button 
                    onClick={handleSave}
                    disabled={!title.trim() || isLoading}
                    className="flex-[2] py-3.5 rounded-xl bg-gradient-to-r from-mana-primary to-mana-accent text-white text-sm font-bold shadow-lg shadow-mana-primary/25 hover:shadow-mana-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                    {isLoading ? (
                        <span className="animate-pulse">Forjando Misión... ✨</span>
                    ) : (
                        <>
                            <span>⚔️</span>
                            Crear Misión
                        </>
                    )}
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};
