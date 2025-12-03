
import React, { useState, useRef } from 'react';
import { Task, Subtask } from '../types';

interface Props {
  task: Task;
  onComplete?: () => void;
  onDelete?: () => void;
  onFocus?: () => void;
  compact?: boolean; 
  // Selection Mode Props
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onToggleSelection?: () => void;
}

export const TaskCard: React.FC<Props> = ({ 
    task, 
    onComplete, 
    onDelete, 
    onFocus, 
    compact = false,
    isSelectionMode = false,
    isSelected = false,
    onToggleSelection
}) => {
  // Swipe Logic State
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Expand & Subtask Logic State
  const [isExpanded, setIsExpanded] = useState(false);
  const isSwipeAction = useRef(false); // Ref to distinguish tap vs swipe
  
  // Local state for subtasks to demonstrate interactivity
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks || []);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const COMPLETE_THRESHOLD = 100; // Pixel distance to trigger completion (Right)
  const DELETE_THRESHOLD = -100; // Pixel distance to trigger delete (Left)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (task.status === 'completed' || isSelectionMode) return; // Disable swipe in selection mode
    setStartX(e.targetTouches[0].clientX);
    setIsSwiping(true);
    isSwipeAction.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null || task.status === 'completed' || isSelectionMode) return;
    const touchX = e.targetTouches[0].clientX;
    const diff = touchX - startX;

    // Elastic resistance logic
    const dampedDiff = diff; 

    setCurrentX(dampedDiff);
    if (Math.abs(diff) > 5) isSwipeAction.current = true;
  };

  const handleTouchEnd = () => {
    if (task.status === 'completed' || isSelectionMode) return;
    
    if (currentX > COMPLETE_THRESHOLD && onComplete) {
      setCurrentX(500); // Fly off screen
      setTimeout(() => {
        onComplete();
        setCurrentX(0); 
      }, 200);
    } else if (currentX < DELETE_THRESHOLD && onDelete) {
      setCurrentX(-500); // Fly off screen left
      setTimeout(() => {
        onDelete();
        setCurrentX(0);
      }, 200);
    } else {
      setCurrentX(0);
    }
    setStartX(null);
    setIsSwiping(false);
  };

  const handleCardClick = () => {
    // If in selection mode, toggle selection instead of expanding
    if (isSelectionMode && onToggleSelection) {
        onToggleSelection();
        return;
    }

    if (!isSwipeAction.current && (task.description || subtasks.length > 0 || task.status !== 'completed')) {
      setIsExpanded(!isExpanded);
    }
  };

  const toggleSubtask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSubtasks(prev => prev.map(st => st.id === id ? { ...st, completed: !st.completed } : st));
  };

  const addSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    const newSt: Subtask = {
      id: `st-${Date.now()}`,
      title: newSubtaskTitle,
      completed: false
    };
    setSubtasks([...subtasks, newSt]);
    setNewSubtaskTitle('');
  };

  // Helper Functions
  const getElementLabel = () => {
    switch (task.element) {
      case 'fire': return '🔥';
      case 'water': return '💧';
      case 'air': return '🌬️';
      case 'earth': return '⛰️';
      case 'void': return '✨';
      default: return '•';
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'bg-red-500 shadow-red-500/50';
      case 'medium': return 'bg-orange-400 shadow-orange-400/50';
      case 'low': return 'bg-green-500 shadow-green-500/50';
      default: return 'bg-slate-500';
    }
  };

  const getTypeLabel = () => {
    switch(task.type) {
      case 'mission': return 'Misión';
      case 'habit': return 'Hábito';
      case 'ritual': return 'Ritual';
      default: return 'Tarea';
    }
  };

  const completedSubtasks = subtasks.filter(st => st.completed).length;

  return (
    <div className={`relative ${compact ? 'mb-2' : 'mb-3'} rounded-2xl select-none transition-all flex items-center gap-3`}>
      
      {/* SELECTION CHECKBOX (Only visible in Selection Mode) */}
      {isSelectionMode && (
          <div className="pl-2 animate-in slide-in-from-left-2 fade-in duration-200">
              <button 
                onClick={(e) => { e.stopPropagation(); onToggleSelection && onToggleSelection(); }}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                    ${isSelected 
                        ? 'bg-mana-primary border-mana-primary text-white' 
                        : 'border-slate-500 bg-transparent'
                    }`}
              >
                  {isSelected && <span className="text-xs font-bold">✓</span>}
              </button>
          </div>
      )}

      <div className="flex-1 relative">
        {/* 1. Background Action Layers (Swipe) */}
        {!isSelectionMode && (
            <>
                <div 
                    className="absolute inset-0 bg-mana-secondary rounded-2xl flex items-center pl-6 transition-opacity"
                    style={{ opacity: currentX > 10 ? 1 : 0 }}
                >
                    <div className="flex items-center gap-2 text-mana-dark font-bold text-sm transform" 
                        style={{ transform: `scale(${Math.min(currentX / COMPLETE_THRESHOLD, 1.2)})` }}>
                    <span className="text-xl">✓</span>
                    </div>
                </div>
                <div 
                    className="absolute inset-0 bg-red-500/20 rounded-2xl flex items-center justify-end pr-6 transition-opacity border border-red-500/30"
                    style={{ opacity: currentX < -10 ? 1 : 0 }}
                >
                    <div className="flex items-center gap-2 text-red-400 font-bold text-sm transform" 
                        style={{ transform: `scale(${Math.min(Math.abs(currentX) / Math.abs(DELETE_THRESHOLD), 1.2)})` }}>
                    <span className="text-xl">🗑️</span>
                    </div>
                </div>
            </>
        )}

        {/* 3. Foreground Content Layer */}
        <div 
            ref={cardRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleCardClick}
            className={`relative z-10 w-full transition-all duration-300 ease-out border rounded-2xl
            ${task.status === 'completed' 
                ? 'bg-white/5 border-white/5 opacity-60' 
                : 'bg-mana-card glass-panel border-white/10 active:scale-[0.98] cursor-pointer'
            }
            ${isSelected ? 'border-mana-primary ring-1 ring-mana-primary bg-mana-primary/10' : ''}
            `}
            style={{ 
            transform: `translateX(${currentX}px)`,
            transition: isSwiping ? 'none' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
        >
            <div className={`${compact ? 'p-3' : 'p-4 pl-4'}`}>
            <div className="flex items-start justify-between gap-3">
                
                {/* Priority Indicator */}
                <div className={`${compact ? 'pt-1.5' : 'pt-2'}`}>
                <div className={`w-2.5 h-2.5 rounded-full ${getPriorityColor()} shadow-[0_0_8px_currentColor]`} />
                </div>

                <div className="flex-1 min-w-0">
                
                {/* COMPACT MODE HEADER */}
                {compact ? (
                    <div className="flex items-center gap-2 mb-0.5">
                        <h3 className={`font-semibold text-sm leading-tight truncate ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                            {task.title}
                        </h3>
                        {task.dueDate && task.status !== 'completed' && (
                            <span className={`text-[9px] flex items-center gap-0.5 ${task.priority === 'high' ? 'text-mana-danger' : 'text-slate-400'}`}>
                            🕒 {task.dueDate}
                            </span>
                        )}
                    </div>
                ) : (
                    /* NORMAL MODE HEADER */
                    <>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                            <span className="text-xs">{getElementLabel()}</span>
                            {getTypeLabel()}
                            </span>
                            {task.dueDate && task.status !== 'completed' && (
                            <span className={`text-[10px] flex items-center gap-1 ${task.priority === 'high' ? 'text-mana-danger' : 'text-slate-400'}`}>
                                • <span>🕒</span> {task.dueDate}
                            </span>
                            )}
                        </div>

                        <h3 className={`font-semibold text-sm leading-tight mb-2 truncate pr-2 ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                            {task.title}
                        </h3>

                        {/* Tags & Warning */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {task.warning && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-yellow-900/30 text-yellow-500 border border-yellow-500/20">
                                ⚠️ {task.warning}
                            </span>
                            )}
                            {task.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                                #{tag}
                            </span>
                            ))}
                        </div>

                        {/* Rewards */}
                        {task.status !== 'completed' ? (
                            <div className="flex items-center gap-3 text-xs">
                            <span className="flex items-center gap-1 text-mana-primary font-medium">
                                ⚡ {task.rewards.xp} XP
                            </span>
                            <span className="flex items-center gap-1 text-cyan-400 font-medium">
                                💧 {task.rewards.mana} Mana
                            </span>
                            {subtasks.length > 0 && (
                                <span className="flex items-center gap-1 text-slate-400 font-medium ml-1 pl-2 border-l border-white/10">
                                📋 {completedSubtasks}/{subtasks.length}
                                </span>
                            )}
                            </div>
                        ) : (
                            <div className="text-xs text-mana-secondary flex items-center gap-1">
                            ✓ Completado (+{task.rewards.xp} XP)
                            </div>
                        )}
                    </>
                )}
                </div>

                {/* Right Side: Action Button + Expand Chevron */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                    {/* Hide Done button in Selection Mode to avoid confusion */}
                    {!isSelectionMode && (
                        <button 
                            onClick={(e) => {
                            e.stopPropagation();
                            if (onComplete && task.status !== 'completed') onComplete();
                            }}
                            className={`rounded-full border flex items-center justify-center transition-all duration-300
                            ${compact ? 'w-6 h-6' : 'w-8 h-8'}
                            ${task.status === 'completed'
                                ? 'bg-mana-secondary text-mana-dark border-mana-secondary'
                                : 'border-slate-500 text-transparent hover:border-mana-secondary hover:text-mana-secondary'
                            }`}
                        >
                            <span className={`${compact ? 'text-xs' : 'text-sm'} font-bold`}>✓</span>
                        </button>
                    )}

                {(task.description || subtasks.length > 0 || task.status !== 'completed') && !isSelectionMode && (
                    <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="text-slate-500 transform transition-transform duration-300"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                )}
                </div>
            </div>

            {/* EXPANDED CONTENT: Always shows full details regardless of compact mode when expanded */}
            {isExpanded && !isSelectionMode && (
                <div className="mt-4 pt-3 border-t border-white/5 animate-in slide-in-from-top-2 fade-in duration-200">
                    
                    {/* 1. Start Focus Button */}
                    {task.status !== 'completed' && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); onFocus && onFocus(); }}
                            className="w-full mb-4 py-2 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-blue-300 hover:border-blue-400 active:scale-95 transition-all shadow-lg shadow-blue-900/10"
                        >
                            <span className="animate-pulse">💎</span> Iniciar Foco
                        </button>
                    )}

                    {/* Compact Mode Catch-up: Show elements hidden in compact mode */}
                    {compact && (
                        <div className="flex gap-4 text-xs text-slate-400 mb-3 border-b border-white/5 pb-2">
                            <span className="flex items-center gap-1">⚡ {task.rewards.xp} XP</span>
                            <span className="flex items-center gap-1">💧 {task.rewards.mana} Mana</span>
                            <span className="flex items-center gap-1">{getElementLabel()} {getTypeLabel()}</span>
                        </div>
                    )}

                    {/* 2. Description */}
                    {task.description && (
                    <div className="mb-4 bg-black/20 p-3 rounded-lg border border-white/5">
                        <p className="text-xs text-slate-300 leading-relaxed">
                        {task.description}
                        </p>
                    </div>
                    )}

                    {/* 3. Subtasks */}
                    <div className="space-y-2">
                    {subtasks.length > 0 && <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Subtareas</h4>}
                    
                    {subtasks.map(subtask => (
                        <div 
                        key={subtask.id} 
                        onClick={(e) => toggleSubtask(subtask.id, e)}
                        className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors group"
                        >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${subtask.completed ? 'bg-mana-secondary border-mana-secondary text-mana-dark' : 'border-slate-500 group-hover:border-slate-300'}`}>
                            {subtask.completed && <span className="text-[10px]">✓</span>}
                        </div>
                        <span className={`text-xs ${subtask.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                            {subtask.title}
                        </span>
                        </div>
                    ))}

                    {/* Add Subtask Input */}
                    {task.status !== 'completed' && (
                        <form onSubmit={addSubtask} className="flex items-center gap-2 mt-2 pt-1 border-t border-white/5 pl-1">
                        <span className="text-slate-500 text-lg leading-none">+</span>
                        <input 
                            type="text" 
                            value={newSubtaskTitle}
                            onChange={(e) => setNewSubtaskTitle(e.target.value)}
                            placeholder="Añadir paso..." 
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 bg-transparent text-xs text-white placeholder:text-slate-600 focus:outline-none py-1"
                        />
                        </form>
                    )}
                    </div>
                </div>
            )}
            </div>
        </div>
    </div>
  );
};
