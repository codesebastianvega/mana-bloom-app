
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onNavigate: (view: 'home' | 'tasks' | 'garden' | 'profile' | 'social' | 'settings' | 'lore') => void;
}

export const NavHavenDrawer: React.FC<Props> = ({ isOpen, onClose, user, onNavigate }) => {
  const [settings, setSettings] = useState({
    darkMode: true,
    sounds: true,
    haptics: true,
    notifications: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    if (navigator.vibrate && settings.haptics) navigator.vibrate(10);
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNavClick = (view: 'home' | 'tasks' | 'garden' | 'profile' | 'social' | 'settings' | 'lore') => {
    if (navigator.vibrate && settings.haptics) navigator.vibrate(10);
    onNavigate(view);
    onClose();
  };

  // Mock progress calculation for the visual XP bar
  const xpPercent = (user.currentXp / user.maxXp) * 100;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div 
        className={`fixed inset-y-0 left-0 z-[70] w-[85%] max-w-[320px] bg-[#0e0a1e] border-r border-white/10 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col overflow-hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Ambient Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
             <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-900/20 to-transparent"></div>
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-900/10 rounded-full blur-[80px]"></div>
             <div className="absolute top-1/2 -left-20 w-40 h-40 bg-emerald-500/5 rounded-full blur-[60px]"></div>
        </div>
        
        {/* Header: Player Identity Card */}
        <div className="relative z-10 pt-8 pb-6 px-5 bg-white/5 border-b border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-4">
                <div className="relative group cursor-pointer" onClick={() => handleNavClick('profile')}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <img 
                        src={user.avatarUrl} 
                        alt="Profile" 
                        className="relative w-16 h-16 rounded-full border-2 border-[#1a1629] p-0.5 bg-gradient-to-tr from-amber-400 to-purple-500 object-cover"
                    />
                    <div className="absolute -bottom-1 right-0 bg-mana-dark border border-amber-500 text-[10px] text-amber-400 font-bold px-1.5 rounded-md shadow-md">
                        Lv.{user.level}
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-white leading-tight truncate">{user.name}</h2>
                    <p className="text-xs text-slate-400 mb-1">Mago Aprendiz</p>
                    
                    {/* XP Bar Mini */}
                    <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
                        <div 
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-500" 
                            style={{ width: `${xpPercent}%` }}
                        />
                    </div>
                    <p className="text-[9px] text-right text-slate-500 mt-0.5">{user.currentXp}/{user.maxXp} XP</p>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-2 mt-2">
                <button onClick={() => handleNavClick('home')} className="flex items-center justify-center gap-2 p-2 bg-black/20 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                    <span className="text-lg group-hover:scale-110 transition-transform">🏠</span>
                    <span className="text-xs text-slate-300 font-bold">Inicio</span>
                </button>
                <button onClick={() => handleNavClick('profile')} className="flex items-center justify-center gap-2 p-2 bg-black/20 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                    <span className="text-lg group-hover:scale-110 transition-transform">👤</span>
                    <span className="text-xs text-slate-300 font-bold">Perfil</span>
                </button>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar py-4 px-4 space-y-6">

            {/* Premium Banner (Enhanced) */}
            <div 
                onClick={() => handleNavClick('settings')}
                className="group relative bg-gradient-to-r from-amber-700/80 to-orange-800/80 rounded-2xl p-4 overflow-hidden shadow-lg border border-amber-500/20 cursor-pointer hover:scale-[1.02] transition-transform"
            >
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                 <div className="relative z-10 flex justify-between items-center">
                     <div>
                         <div className="flex items-center gap-1 mb-1">
                            <span className="text-amber-200 text-[10px] font-black uppercase tracking-widest bg-black/20 px-1.5 rounded">PRO</span>
                         </div>
                         <h3 className="text-sm font-bold text-white leading-tight">Grimorio Arcano</h3>
                         <p className="text-[10px] text-amber-100/80 mt-1">Desbloquea estadísticas avanzadas</p>
                     </div>
                     <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center border border-white/10 text-xl group-hover:rotate-12 transition-transform">
                         👑
                     </div>
                 </div>
            </div>

            {/* Core Navigation (Rich List) */}
            <section className="space-y-2">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">Navegación</h4>
                
                <button onClick={() => handleNavClick('garden')} className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all group">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-lg text-emerald-400 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(16,185,129,0.1)]">🌿</div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-200 group-hover:text-white">Jardín Zen</span>
                            <span className="block text-[10px] text-slate-500">Ernesto te espera</span>
                        </div>
                    </div>
                    <div className="text-[9px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                        Listo ✨
                    </div>
                </button>

                <button onClick={() => handleNavClick('tasks')} className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all group">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-lg text-blue-400 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.1)]">📜</div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-200 group-hover:text-white">Mis Misiones</span>
                            <span className="block text-[10px] text-slate-500">{user.stats.pendingTasks} pendientes</span>
                        </div>
                    </div>
                    {user.stats.pendingTasks > 0 && (
                        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                            {user.stats.pendingTasks}
                        </div>
                    )}
                </button>

                 <button onClick={() => handleNavClick('lore')} className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-amber-500/30 transition-all group">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-lg text-amber-400 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(245,158,11,0.1)]">📖</div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-200 group-hover:text-white">Historia (Lore)</span>
                            <span className="block text-[10px] text-slate-500">Capítulo 1 Desbloqueado</span>
                        </div>
                    </div>
                </button>

                <button onClick={() => handleNavClick('social')} className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-pink-500/30 transition-all group">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-lg text-pink-400 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(236,72,153,0.1)]">💬</div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-200 group-hover:text-white">Bosque Social</span>
                            <span className="block text-[10px] text-slate-500">3 amigos online</span>
                        </div>
                    </div>
                     <div className="flex -space-x-1">
                        <div className="w-4 h-4 rounded-full bg-slate-700 border border-[#0e0a1e]"></div>
                        <div className="w-4 h-4 rounded-full bg-slate-600 border border-[#0e0a1e]"></div>
                        <div className="w-4 h-4 rounded-full bg-green-500 border border-[#0e0a1e]"></div>
                    </div>
                </button>
            </section>

            {/* Settings & Toggles (Grouped Card) */}
            <section>
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">Sincronización</h4>
                <div className="bg-black/20 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
                    
                    {/* Toggle Row Helper */}
                    {[
                        { id: 'notifications', icon: '🔔', label: 'Alertas', active: settings.notifications, color: 'bg-blue-500' },
                        { id: 'sounds', icon: '🔊', label: 'Sonidos', active: settings.sounds, color: 'bg-emerald-500' },
                        { id: 'haptics', icon: '📳', label: 'Vibración', active: settings.haptics, color: 'bg-orange-500' },
                    ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="text-base text-slate-400">{item.icon}</span>
                                <span className="text-xs text-slate-300 font-medium">{item.label}</span>
                            </div>
                            <button 
                                onClick={() => toggleSetting(item.id as any)}
                                className={`w-8 h-4 rounded-full transition-colors relative ${item.active ? item.color : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow-md transition-transform ${item.active ? 'translate-x-4' : 'translate-x-0'}`}></div>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Support Links (Simple List) */}
            <section className="pt-2">
                <button onClick={() => handleNavClick('settings')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                    <span className="text-base">⚙️</span>
                    <span className="text-xs font-medium">Ajustes Avanzados</span>
                </button>
                <button onClick={() => handleNavClick('settings')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                    <span className="text-base">❓</span>
                    <span className="text-xs font-medium">Ayuda del Oráculo</span>
                </button>
            </section>

        </div>

        {/* Footer: Daily Wisdom & Logout */}
        <div className="relative z-10 p-5 border-t border-white/5 bg-black/20 backdrop-blur-md">
            {/* Random Tip */}
            <div className="mb-4 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 text-center">
                <p className="text-[10px] text-purple-300 italic">"La constancia es la magia más poderosa."</p>
            </div>

            <div className="flex justify-between items-center">
                <p className="text-[9px] text-slate-600 font-mono">v1.0.5 Beta</p>
                <button className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                    <span>🚪</span> Salir
                </button>
            </div>
        </div>
      </div>
    </>
  );
};
