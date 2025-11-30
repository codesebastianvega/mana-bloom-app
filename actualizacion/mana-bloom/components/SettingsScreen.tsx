
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface Props {
  user: UserProfile;
  onBack: () => void;
}

type SettingsTab = 'account' | 'app' | 'notifications' | 'support';

export const SettingsScreen: React.FC<Props> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('app');
  
  // Mock Form States
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState("mago@manabloom.com");
  const [wifiOnly, setWifiOnly] = useState(false);
  const [language, setLanguage] = useState("es");
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  
  // Notification States
  const [notifPush, setNotifPush] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);
  const [notifMarketing, setNotifMarketing] = useState(false);
  const [notifReminders, setNotifReminders] = useState(true);

  // Integrations Mock
  const integrations = [
      { id: 'google_fit', name: 'Google Fit', icon: '🏃', connected: false, premium: true },
      { id: 'strava', name: 'Strava', icon: '🚴', connected: false, premium: true },
      { id: 'notion', name: 'Notion', icon: '📓', connected: false, premium: true },
      { id: 'cal', name: 'Calendar', icon: '📅', connected: true, premium: false },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            {/* Profile Edit */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Identidad del Mago</h3>
                
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img src={user.avatarUrl} className="w-16 h-16 rounded-full border-2 border-mana-primary object-cover" alt="Profile" />
                        <button className="absolute bottom-0 right-0 bg-[#1a1629] border border-white/20 p-1.5 rounded-full text-[10px]">📷</button>
                    </div>
                    <div className="flex-1 space-y-2">
                        <input 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-mana-primary outline-none"
                            placeholder="Nombre de usuario"
                        />
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 focus:border-mana-primary outline-none"
                            placeholder="Email"
                        />
                    </div>
                </div>
                <button className="w-full py-2 bg-mana-primary/20 text-mana-primary border border-mana-primary/50 rounded-lg text-xs font-bold hover:bg-mana-primary/30 transition-colors">
                    Guardar Cambios
                </button>
            </div>

            {/* Subscription */}
            <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/10 border border-amber-500/20 rounded-2xl p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-20 text-4xl">👑</div>
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Estado de Membresía</h3>
                <p className="text-lg font-bold text-white mb-1">Plan Aprendiz (Gratis)</p>
                <p className="text-xs text-slate-400 mb-4">Sube de nivel para desbloquear la IA y el Bosque Social.</p>
                <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">
                    Gestionar Suscripción
                </button>
            </div>

            {/* Danger Zone */}
            <div className="border border-red-500/20 rounded-2xl p-4 space-y-3">
                <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest">Zona de Peligro</h3>
                <button className="w-full flex items-center justify-between p-3 bg-red-500/5 hover:bg-red-500/10 rounded-lg border border-red-500/10 transition-colors group">
                    <span className="text-sm text-red-300 group-hover:text-red-200">Cerrar Sesión</span>
                    <span className="text-xs">🚪</span>
                </button>
            </div>
          </div>
        );

      case 'app':
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
             
             {/* Apariencia / Theme */}
             <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Apariencia</h3>
                <div className="grid grid-cols-3 gap-2">
                    {['dark', 'light', 'system'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTheme(t as any)}
                            className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all
                                ${theme === t 
                                    ? 'bg-mana-primary/20 border-mana-primary text-white' 
                                    : 'bg-black/20 border-white/5 text-slate-500 hover:bg-white/5'
                                }
                            `}
                        >
                            <span className="text-lg mb-1">
                                {t === 'dark' ? '🌙' : t === 'light' ? '☀️' : '📱'}
                            </span>
                            <span className="text-[10px] font-bold uppercase">
                                {t === 'dark' ? 'Oscuro' : t === 'light' ? 'Claro' : 'Sistema'}
                            </span>
                        </button>
                    ))}
                </div>
             </div>

             {/* Integraciones */}
             <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Integraciones Místicas</h3>
                    <span className="text-[9px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">PREMIUM</span>
                </div>
                
                <div className="space-y-3">
                    {integrations.map((app) => (
                        <div key={app.id} className={`flex items-center justify-between p-3 rounded-xl border ${app.connected ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-black/20 border-white/5'} ${app.premium ? 'opacity-75' : ''}`}>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{app.icon}</span>
                                <div>
                                    <p className="text-sm font-bold text-white flex items-center gap-2">
                                        {app.name}
                                        {app.premium && <span className="text-[9px] text-amber-500">🔒</span>}
                                    </p>
                                    <p className="text-[10px] text-slate-500">
                                        {app.connected ? 'Conectado' : 'Sincronizar actividad'}
                                    </p>
                                </div>
                            </div>
                            <button className={`w-10 h-5 rounded-full relative transition-colors ${app.connected ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                                <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${app.connected ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </button>
                        </div>
                    ))}
                </div>
             </div>

             {/* Regional & Data */}
             <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Regional & Datos</h3>
                <div className="space-y-2">
                    <p className="text-sm font-medium text-white">Idioma</p>
                    <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-mana-primary outline-none"
                    >
                        <option value="es">Español (Latinoamérica)</option>
                        <option value="en">English</option>
                        <option value="pt">Português</option>
                    </select>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div>
                        <p className="text-sm font-medium text-white">Solo Wi-Fi</p>
                        <p className="text-[10px] text-slate-500">Ahorrar datos móviles</p>
                    </div>
                    <button 
                        onClick={() => setWifiOnly(!wifiOnly)}
                        className={`w-10 h-5 rounded-full transition-colors ${wifiOnly ? 'bg-mana-primary' : 'bg-slate-700'}`}
                    >
                        <div className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform translate-y-1 mx-1 ${wifiOnly ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </button>
                </div>
             </div>
          </div>
        );

      case 'notifications':
        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-5">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Canales de Alerta</h3>

                    {/* Push */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">🔔</div>
                            <div>
                                <p className="text-sm font-bold text-white">Notificaciones Push</p>
                                <p className="text-[10px] text-slate-500">Alertas en tiempo real</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setNotifPush(!notifPush)}
                            className={`w-10 h-5 rounded-full transition-colors ${notifPush ? 'bg-blue-500' : 'bg-slate-700'}`}
                        >
                            <div className={`w-3 h-3 bg-white rounded-full transition-transform transform translate-y-1 mx-1 ${notifPush ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </button>
                    </div>

                    {/* Email */}
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">✉️</div>
                            <div>
                                <p className="text-sm font-bold text-white">Resumen por Email</p>
                                <p className="text-[10px] text-slate-500">Reporte semanal de progreso</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setNotifEmail(!notifEmail)}
                            className={`w-10 h-5 rounded-full transition-colors ${notifEmail ? 'bg-purple-500' : 'bg-slate-700'}`}
                        >
                            <div className={`w-3 h-3 bg-white rounded-full transition-transform transform translate-y-1 mx-1 ${notifEmail ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </button>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-5">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tipos de Aviso</h3>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-200">Recordatorios de Hábitos</span>
                        <input type="checkbox" checked={notifReminders} onChange={() => setNotifReminders(!notifReminders)} className="accent-mana-primary w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-200">Eventos del Bosque</span>
                        <input type="checkbox" checked={true} readOnly className="accent-mana-primary w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-200">Novedades y Marketing</span>
                        <input type="checkbox" checked={notifMarketing} onChange={() => setNotifMarketing(!notifMarketing)} className="accent-mana-primary w-4 h-4" />
                    </div>
                </div>
            </div>
        );

      case 'support':
        return (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                {/* Beta Program */}
                <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-2xl p-4 flex items-center gap-4">
                    <div className="text-3xl">🧪</div>
                    <div>
                        <h4 className="text-sm font-bold text-purple-300">Programa Beta</h4>
                        <p className="text-xs text-slate-400 mb-2">Prueba funciones antes que nadie.</p>
                        <button className="text-[10px] font-bold bg-purple-500 text-white px-3 py-1 rounded-full hover:bg-purple-400 transition-colors">Unirme</button>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 border-b border-white/5 text-left transition-colors">
                        <span className="text-sm text-slate-200">Centro de Ayuda (FAQ)</span>
                        <span className="text-slate-500">›</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 border-b border-white/5 text-left transition-colors">
                        <span className="text-sm text-slate-200">Enviar Sugerencia</span>
                        <span className="text-slate-500">›</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 border-b border-white/5 text-left transition-colors">
                        <span className="text-sm text-slate-200">Calificar App</span>
                        <span className="text-slate-500">★★★★★</span>
                    </button>
                </div>

                {/* Legal Links */}
                <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-white/5 border border-white/5 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                        📜 Términos de Servicio
                    </button>
                    <button className="flex-1 py-3 bg-white/5 border border-white/5 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                        🔒 Política de Privacidad
                    </button>
                </div>

                <div className="pt-2 text-center space-y-1">
                    <p className="text-[9px] text-slate-600">Mana Bloom v1.0.5</p>
                    <p className="text-[9px] text-slate-700 font-mono">ID: {user.name}_82910</p>
                </div>
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0816] text-slate-200 flex flex-col">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0b0816]/95 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-4">
        <button 
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
            ←
        </button>
        <h1 className="text-lg font-bold text-white">Ajustes del Grimorio</h1>
      </header>

      {/* Tabs */}
      <div className="px-4 py-4">
          <div className="flex p-1 bg-white/5 rounded-xl overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('account')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'account' ? 'bg-mana-primary text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              >
                  Cuenta
              </button>
              <button 
                onClick={() => setActiveTab('app')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'app' ? 'bg-mana-primary text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              >
                  App & Datos
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'notifications' ? 'bg-mana-primary text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              >
                  Alertas
              </button>
              <button 
                onClick={() => setActiveTab('support')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'support' ? 'bg-mana-primary text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
              >
                  Ayuda
              </button>
          </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-12 overflow-y-auto no-scrollbar">
          {renderContent()}
      </div>

    </div>
  );
};
