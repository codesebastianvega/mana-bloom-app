
import React, { useState } from 'react';
import { MOCK_FRIENDS, SOCIAL_FEED, COOP_CHALLENGES, SOCIAL_BADGES } from '../constants';
import { Friend } from '../types';

export const SocialScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'friends' | 'clans' | 'global'>('friends');
  const [selectedMapPin, setSelectedMapPin] = useState<number | null>(null);

  // Mock sending a gift
  const handleSendGift = (friendId: string, type: 'water' | 'sun') => {
      if (navigator.vibrate) navigator.vibrate([20, 50]);
      alert(`Enviaste ${type === 'water' ? '💧 Agua' : '☀️ Luz'} a tu aliado.`);
  };

  const getRankEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  // Mock Data for Map Pins (Snapchat style)
  const MAP_PINS = [
      { id: 1, x: 20, y: 30, user: 'Sofia', plant: 'Orquídea Lunar', avatar: 'https://picsum.photos/101/101' },
      { id: 2, x: 50, y: 50, user: 'Ryu', plant: 'Bonsai Etéreo', avatar: 'https://picsum.photos/104/104' },
      { id: 3, x: 75, y: 25, user: 'Elena', plant: 'Roble Ancestral', avatar: 'https://picsum.photos/103/103' },
      { id: 4, x: 60, y: 80, user: 'Marcos', plant: 'Cactus Solar', avatar: 'https://picsum.photos/102/102' },
      { id: 5, x: 15, y: 70, user: 'Tu', plant: 'Ernesto', avatar: 'https://picsum.photos/100/100', isMe: true },
  ];

  // Mock Data for Clans
  const MOCK_CLANS = [
      { id: 'c1', name: 'Solarios', members: 128, score: '450k', icon: '☀️', rank: 1, color: 'text-amber-400', border: 'border-amber-500/50' },
      { id: 'c2', name: 'Sombras', members: 94, score: '382k', icon: '🌑', rank: 2, color: 'text-purple-400', border: 'border-purple-500/50' },
      { id: 'c3', name: 'Marea', members: 65, score: '220k', icon: '🌊', rank: 3, color: 'text-blue-400', border: 'border-blue-500/50' },
  ];

  // Mock Data for Global Ranking
  const MOCK_GLOBAL = [
      { id: 'g1', name: 'Ryu', level: 45, xp: '1.2M', avatar: 'https://picsum.photos/104/104', rank: 1 },
      { id: 'g2', name: 'Sofia', level: 42, xp: '980k', avatar: 'https://picsum.photos/101/101', rank: 2 },
      { id: 'g3', name: 'Kael', level: 40, xp: '850k', avatar: 'https://picsum.photos/105/105', rank: 3 },
      { id: 'g4', name: 'Alex (Tú)', level: 12, xp: '2,450', avatar: 'https://picsum.photos/100/100', rank: 145, isMe: true },
  ];

  const getTabDescription = () => {
      switch(activeTab) {
          case 'friends': return "Tu círculo cercano. Envía regalos y mantén la racha.";
          case 'clans': return "Grupos organizados compitiendo por territorio y honor.";
          case 'global': return "Ranking mundial de los mejores jardineros de Mana Bloom.";
      }
  };

  const getRankDisplay = (rank: number) => {
      if (rank === 1) return <span className="text-xl">🥇</span>;
      if (rank === 2) return <span className="text-xl">🥈</span>;
      if (rank === 3) return <span className="text-xl">🥉</span>;
      return <span className="text-sm font-bold text-slate-500">#{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-mana-dark pb-24 relative overflow-x-hidden">
      
      {/* 1. HERO: GLOBAL RITUAL & LIVE STATUS */}
      <div className="relative overflow-hidden rounded-b-[2.5rem] bg-gradient-to-b from-[#1a1629] via-[#0f2e22] to-[#0e0a1e] pb-10 border-b border-white/5 shadow-2xl">
         {/* Background Map Effect */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none animate-pulse"></div>

         <div className="pt-6 px-5 relative z-10">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight">Bosque Etéreo</h1>
                    <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        128 Jardineros Conectados
                    </p>
                </div>
                <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:bg-white/10 transition-colors">
                    🔍
                </button>
            </div>

            {/* Community Goal Progress */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-6 relative overflow-hidden">
                 <div className="absolute left-0 top-0 h-full bg-emerald-500/10 w-[65%]"></div>
                 <div className="relative z-10 flex justify-between items-end">
                     <div>
                         <p className="text-[10px] text-slate-400 uppercase mb-1">Meta Global: Reforestación</p>
                         <p className="text-xl font-bold text-white">4,820 <span className="text-sm text-slate-400 font-normal">/ 5,000 Árboles</span></p>
                     </div>
                     <span className="text-2xl">🌳</span>
                 </div>
            </div>

            {/* Quick Stats Chips */}
            <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-[#1a1629]/80 border border-white/10 rounded-2xl p-3 flex flex-col items-center backdrop-blur-md">
                     <span className="text-lg mb-1">🔥</span>
                     <span className="text-xs font-bold text-white">5 Días</span>
                     <span className="text-[9px] text-slate-500 uppercase">Tu Racha</span>
                </div>
                <div className="bg-[#1a1629]/80 border border-white/10 rounded-2xl p-3 flex flex-col items-center backdrop-blur-md">
                     <span className="text-lg mb-1">🌱</span>
                     <span className="text-xs font-bold text-white">Nivel 3</span>
                     <span className="text-[9px] text-slate-500 uppercase">Clan</span>
                </div>
                <button className="bg-gradient-to-br from-mana-primary to-mana-accent border border-white/10 rounded-2xl p-3 flex flex-col items-center shadow-lg shadow-mana-primary/20 active:scale-95 transition-all">
                     <span className="text-lg mb-1">💌</span>
                     <span className="text-xs font-bold text-white">Invitar</span>
                     <span className="text-[9px] text-white/70 uppercase">+200 Mana</span>
                </button>
            </div>
         </div>
      </div>

      <div className="px-4 space-y-8 -mt-6 relative z-20">

        {/* 2. SNAPCHAT-STYLE MAP (Exploration) */}
        <section>
             <h3 className="text-sm font-bold text-white mb-3 px-1 flex items-center gap-2">
                 <span>🗺️</span> Mapa del Bosque
             </h3>
             <div className="aspect-[4/5] bg-[#0f172a] rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl group">
                 
                 {/* Map Background (Styled) */}
                 <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
                 
                 {/* Player Pins */}
                 {MAP_PINS.map((pin) => (
                     <button
                        key={pin.id}
                        onClick={() => setSelectedMapPin(selectedMapPin === pin.id ? null : pin.id)}
                        className={`absolute transition-all duration-500 flex flex-col items-center
                            ${selectedMapPin === pin.id ? 'z-20 scale-110' : 'z-10 scale-100 hover:scale-110'}
                        `}
                        style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                     >
                         {/* Avatar Pin */}
                         <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center overflow-hidden relative shadow-lg
                             ${pin.isMe ? 'border-emerald-400 shadow-emerald-500/50' : 'border-white shadow-black/50'}
                         `}>
                             <img src={pin.avatar} className="w-full h-full object-cover" alt={pin.user} />
                             {/* Pulse effect for self */}
                             {pin.isMe && <div className="absolute inset-0 bg-emerald-400/30 animate-ping"></div>}
                         </div>
                         
                         {/* Triangle pointer */}
                         <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] -mt-1
                             ${pin.isMe ? 'border-t-emerald-400' : 'border-t-white'}
                         `}></div>

                         {/* Info Popover */}
                         {selectedMapPin === pin.id && (
                             <div className="absolute bottom-12 bg-black/90 backdrop-blur-md border border-white/20 p-3 rounded-xl w-32 text-center animate-in zoom-in slide-in-from-bottom-2">
                                 <p className="text-xs font-bold text-white">{pin.user}</p>
                                 <p className="text-[10px] text-emerald-400 font-medium">{pin.plant}</p>
                                 <button className="mt-2 w-full py-1 bg-white/10 hover:bg-white/20 rounded text-[9px] text-white font-bold transition-colors">
                                     Visitar 🌿
                                 </button>
                             </div>
                         )}
                     </button>
                 ))}

                 {/* Map Controls Overlay */}
                 <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                     <button className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10">
                         📍
                     </button>
                     <button className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10">
                         ➕
                     </button>
                 </div>
             </div>
        </section>

        {/* 3. COOP CHALLENGES */}
        <section>
            <div className="flex items-center justify-between mb-1 px-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>⚔️</span> Conflictos & Retos
                </h3>
            </div>
            <p className="text-[10px] text-slate-400 mb-3 px-1">Participa para ganar recompensas exclusivas y subir el rango de tu clan.</p>
            
            <div className="space-y-3">
                {COOP_CHALLENGES.map(challenge => (
                    <div key={challenge.id} className="bg-[#1a1629] border border-white/10 rounded-2xl p-4 shadow-lg overflow-hidden relative group hover:border-white/20 transition-colors">
                         <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider
                             ${challenge.type === 'coop' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}
                         `}>
                             {challenge.type === 'coop' ? 'Cooperativo' : 'Competitivo'}
                         </div>
                         
                         <h4 className="text-base font-bold text-white mb-1">{challenge.title}</h4>
                         <p className="text-xs text-slate-400 mb-3 w-[85%]">{challenge.description}</p>
                         
                         {/* Progress */}
                         <div className="mb-2">
                             <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                 <span>{challenge.progress} / {challenge.goal}</span>
                                 <span>{Math.round((challenge.progress / challenge.goal) * 100)}%</span>
                             </div>
                             <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                 <div className={`h-full rounded-full bg-gradient-to-r ${challenge.type === 'coop' ? 'from-emerald-500 to-teal-400' : 'from-orange-500 to-red-400'}`} style={{ width: `${(challenge.progress / challenge.goal) * 100}%` }}></div>
                             </div>
                         </div>

                         <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                             <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                 <span>👥 {challenge.participants}</span>
                                 <span>⏰ {challenge.timeLeft}</span>
                             </div>
                             <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white transition-colors">
                                 Contribuir
                             </button>
                         </div>
                    </div>
                ))}
            </div>
        </section>

        {/* 4. SOCIAL HUB (Tabs & Lists) */}
        <section className="bg-white/5 border border-white/5 rounded-3xl p-4 min-h-[300px]">
             {/* Tabs */}
             <div className="flex p-1 bg-black/20 rounded-xl mb-2">
                 {['friends', 'clans', 'global'].map((tab) => (
                     <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${activeTab === tab ? 'bg-white/10 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                     >
                         {tab === 'friends' ? 'Aliados' : tab}
                     </button>
                 ))}
             </div>
             
             <p className="text-[10px] text-slate-400 text-center mb-4 min-h-[15px] animate-in fade-in">{getTabDescription()}</p>

             {/* CONTENT SWITCHER */}
             <div className="space-y-4 animate-in slide-in-from-bottom-2 fade-in duration-300">
                 
                 {/* A. FRIENDS LIST */}
                 {activeTab === 'friends' && (
                     <>
                        {MOCK_FRIENDS.map((friend) => (
                            <div key={friend.id} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="relative">
                                        <img src={friend.avatarUrl} alt={friend.name} className={`w-10 h-10 rounded-full border-2 ${friend.isPremium ? 'border-amber-400' : 'border-white/10'}`} />
                                        {friend.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1a1629] rounded-full animate-pulse"></div>}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-200 flex items-center gap-1">
                                            {friend.name}
                                            {friend.isPremium && <span className="text-[9px] text-amber-400">👑</span>}
                                        </h4>
                                        <p className="text-[10px] text-slate-500">Nivel {friend.level} • {friend.clan || 'Nómada'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleSendGift(friend.id, 'water')} className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white transition-colors active:scale-90">💧</button>
                                    <button onClick={() => handleSendGift(friend.id, 'sun')} className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-white transition-colors active:scale-90">☀️</button>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-3 border border-dashed border-white/10 rounded-xl text-slate-500 text-xs hover:bg-white/5 hover:text-slate-300 transition-colors">+ Invitar nuevos aliados</button>
                     </>
                 )}

                 {/* B. CLANS LIST */}
                 {activeTab === 'clans' && (
                     <div className="space-y-3">
                         {MOCK_CLANS.map((clan) => (
                             <div key={clan.id} className={`bg-[#1a1629] border ${clan.border} rounded-2xl p-3 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer`}>
                                 <div className="text-lg font-bold text-slate-500 w-4 text-center">{clan.rank}</div>
                                 <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center text-2xl border border-white/5">
                                     {clan.icon}
                                 </div>
                                 <div className="flex-1">
                                     <h4 className={`text-sm font-bold ${clan.color}`}>{clan.name}</h4>
                                     <p className="text-[10px] text-slate-400">{clan.members} Miembros • {clan.score} Mana</p>
                                 </div>
                                 <button className="px-3 py-1.5 bg-white/5 rounded-lg text-[10px] font-bold text-slate-300 hover:text-white hover:bg-white/10">Ver</button>
                             </div>
                         ))}
                         <button className="w-full py-3 bg-white/5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/10">Crear mi Clan (Nvl 10)</button>
                     </div>
                 )}

                 {/* C. GLOBAL RANKING */}
                 {activeTab === 'global' && (
                     <div className="space-y-2">
                         <div className="flex justify-between px-2 pb-2 border-b border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                             <span>Jardinero</span>
                             <span>Total XP</span>
                         </div>
                         {MOCK_GLOBAL.map((user) => (
                             <div key={user.id} className={`flex items-center justify-between p-2 rounded-xl ${user.isMe ? 'bg-mana-primary/20 border border-mana-primary/50' : 'hover:bg-white/5'}`}>
                                 <div className="flex items-center gap-3">
                                     <div className="w-6 text-center">{getRankDisplay(user.rank)}</div>
                                     <img src={user.avatar} className="w-8 h-8 rounded-full bg-black" alt={user.name} />
                                     <div>
                                         <p className={`text-xs font-bold ${user.isMe ? 'text-mana-primary' : 'text-white'}`}>{user.name}</p>
                                         <p className="text-[9px] text-slate-500">Nivel {user.level}</p>
                                     </div>
                                 </div>
                                 <span className="text-xs font-mono font-bold text-slate-300">{user.xp}</span>
                             </div>
                         ))}
                     </div>
                 )}

             </div>
        </section>

        {/* 5. ACTIVITY FEED */}
        <section>
            <div className="flex items-center justify-between mb-3 px-1">
                 <h3 className="text-sm font-bold text-white">Ecos del Bosque</h3>
            </div>
            <div className="relative pl-4 border-l border-white/10 space-y-6">
                {SOCIAL_FEED.map((item) => (
                    <div key={item.id} className="relative pl-4">
                        <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full border-4 border-mana-dark bg-[#1a1629] flex items-center justify-center overflow-hidden">
                             <img src={item.user.avatarUrl} className="w-full h-full object-cover opacity-80" alt="User" />
                        </div>
                        <div>
                             <p className="text-xs text-slate-300">
                                 <span className="font-bold text-white">{item.user.name}</span> {item.action}
                             </p>
                             {item.details && (
                                 <p className="text-[11px] text-slate-500 italic mt-0.5">"{item.details}"</p>
                             )}
                             <div className="flex items-center gap-3 mt-2">
                                 <span className="text-[10px] text-slate-600">{item.timeAgo}</span>
                                 <button className="text-[10px] text-slate-400 flex items-center gap-1 hover:text-mana-primary transition-colors">
                                     ❤️ {item.reactions}
                                 </button>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* 6. IA COACH */}
        <section className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-2xl p-4 flex gap-4 items-start">
             <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-xl border border-indigo-500/30">
                 🤖
             </div>
             <div>
                 <h4 className="text-xs font-bold text-indigo-200 uppercase mb-1">Coach Social</h4>
                 <p className="text-xs text-slate-300 leading-relaxed">
                     "Tu clan está muy cerca de ganar el torneo. Si invitas a <span className="text-white font-bold">Elena</span> a meditar contigo, podrían superar la meta hoy."
                 </p>
             </div>
        </section>

        {/* 7. BADGES */}
        <section>
             <h3 className="text-sm font-bold text-white mb-3 px-1">Insignias Sociales</h3>
             <div className="grid grid-cols-3 gap-3">
                 {SOCIAL_BADGES.map(badge => (
                     <div key={badge.id} className={`bg-white/5 border ${badge.isUnlocked ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/5 opacity-50 grayscale'} rounded-xl p-3 flex flex-col items-center text-center gap-2`}>
                         <span className="text-2xl drop-shadow-md">{badge.icon}</span>
                         <div>
                             <p className="text-[10px] font-bold text-slate-200">{badge.name}</p>
                             <p className="text-[8px] text-slate-500 leading-tight mt-1">{badge.description}</p>
                         </div>
                     </div>
                 ))}
             </div>
        </section>
        
        {/* 8. PREMIUM UPSELL */}
        <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl p-5 text-center relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
             <div className="relative z-10">
                 <h3 className="text-lg font-black text-white mb-2">Desbloquea el Bosque</h3>
                 <p className="text-xs text-amber-100 mb-4 px-4">Accede a clanes exclusivos, mapa interactivo y skins sociales únicas.</p>
                 <button className="w-full py-3 bg-white text-orange-700 text-xs font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
                     Ver Beneficios Premium
                 </button>
             </div>
        </div>

      </div>
    </div>
  );
};
