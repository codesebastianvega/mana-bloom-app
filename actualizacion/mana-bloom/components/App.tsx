
import React, { useState, useEffect } from 'react';
import { USER_DATA } from '../constants';
import { StickyHeader } from './StickyHeader';
import { WelcomeHero } from './WelcomeHero';
import { PromoSlider } from './PromoSlider';
import { StatusSection } from './StatusSection';
import { RewardsSection } from './RewardsSection';
import { DailyChallenges } from './DailyChallenges';
import { MagicShopPreview } from './MagicShopPreview';
import { InventoryEvents } from './InventoryEvents';
import { TasksScreen } from './TasksScreen';
import { PlantScreen } from './PlantScreen';
import { ProfileScreen } from './ProfileScreen';
import { SocialScreen } from './SocialScreen';
import { GardenScreen } from './GardenScreen';
import { SettingsScreen } from './SettingsScreen';
import { NavHavenDrawer } from './NavHavenDrawer';
import { FocusCrystalWidget } from './FocusCrystalWidget';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'tasks' | 'plant' | 'garden' | 'profile' | 'social' | 'settings'>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  // Simulate "Welcome Back" Retention Reward
  // In a real app, logic would check lastLoginDate > 3 days
  useEffect(() => {
      const timer = setTimeout(() => {
          setShowWelcomeBack(true);
      }, 2500); // Show after a short delay for demo purposes
      return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-mana-dark font-sans text-slate-200">
      
      {/* Retention Reward Modal (Welcome Back) */}
      {showWelcomeBack && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
              <div className="w-full max-w-sm bg-gradient-to-br from-[#1a1629] to-indigo-900/40 border border-white/10 rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
                  {/* Magical Background FX */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
                  
                  <div className="w-20 h-20 mx-auto bg-gradient-to-b from-amber-400/20 to-transparent rounded-full flex items-center justify-center text-4xl mb-4 animate-bounce border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                      🎁
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">¡El Bosque te extrañaba!</h3>
                  <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                      La magia se acumuló durante tu ausencia. Aquí tienes un regalo de bienvenida por regresar a cuidar tu jardín.
                  </p>
                  
                  <div className="flex justify-center gap-3 mb-8">
                      <div className="bg-black/40 px-5 py-3 rounded-2xl border border-blue-500/30 flex flex-col items-center min-w-[80px]">
                          <span className="text-xl mb-1">⚡</span>
                          <span className="text-lg font-bold text-blue-400">+100</span>
                          <span className="text-[9px] text-slate-400 uppercase tracking-wider">Mana</span>
                      </div>
                      <div className="bg-black/40 px-5 py-3 rounded-2xl border border-green-500/30 flex flex-col items-center min-w-[80px]">
                          <span className="text-xl mb-1">🌱</span>
                          <span className="text-lg font-bold text-green-400">+3</span>
                          <span className="text-[9px] text-slate-400 uppercase tracking-wider">Semillas</span>
                      </div>
                  </div>

                  <button 
                    onClick={() => setShowWelcomeBack(false)}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                      Recoger y Continuar ✨
                  </button>
                  <button 
                    onClick={() => setShowWelcomeBack(false)}
                    className="mt-4 text-xs text-slate-500 hover:text-white transition-colors"
                  >
                      Guardar para luego
                  </button>
              </div>
          </div>
      )}

      {/* Navigation Drawer */}
      <NavHavenDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        user={USER_DATA}
        onNavigate={(view) => setCurrentView(view as any)}
      />

      {currentView === 'home' ? (
        <>
          <StickyHeader onOpenMenu={() => setIsDrawerOpen(true)} />
          <main className="max-w-md mx-auto w-full pb-24">
            <WelcomeHero user={USER_DATA} />
            <FocusCrystalWidget />
            <PromoSlider onNavigate={(view) => setCurrentView(view as any)} />
            <StatusSection user={USER_DATA} />
            <RewardsSection />
            <DailyChallenges />
            <MagicShopPreview />
            <InventoryEvents />
          </main>
        </>
      ) : (
        <>
             {/* Render header logic handled inside specific screens or conditionally here */}
             {currentView !== 'garden' && currentView !== 'social' && currentView !== 'settings' && <StickyHeader onOpenMenu={() => setIsDrawerOpen(true)} />}
             
             {currentView === 'tasks' ? (
                <TasksScreen />
             ) : currentView === 'plant' ? (
                <PlantScreen />
             ) : currentView === 'garden' ? (
                <GardenScreen />
             ) : currentView === 'profile' ? (
                <ProfileScreen />
             ) : currentView === 'settings' ? (
                <SettingsScreen user={USER_DATA} onBack={() => setCurrentView('profile')} />
             ) : (
                <SocialScreen />
             )}
        </>
      )}

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 pb-5 pt-2 px-6 transition-colors duration-300 ${currentView === 'garden' ? 'bg-black/80 backdrop-blur-md border-t-0' : 'bg-mana-dark/90 backdrop-blur-xl'}`}>
        <div className="max-w-md mx-auto flex items-center justify-between">
            <button 
                onClick={() => setCurrentView('home')}
                className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-mana-primary' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <span className="text-xl">🏠</span>
                <span className="text-[10px] font-medium">Inicio</span>
            </button>

            <button 
                onClick={() => setCurrentView('tasks')}
                className={`flex flex-col items-center gap-1 ${currentView === 'tasks' ? 'text-mana-primary' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <span className="text-xl">📝</span>
                <span className="text-[10px] font-medium">Tareas</span>
            </button>

            {/* Central Magic Button (Always Plant Dashboard) */}
            <div className="relative -top-5">
                <button 
                    onClick={() => setCurrentView('plant')}
                    className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95
                        ${currentView === 'plant' 
                            ? 'bg-mana-secondary text-mana-dark shadow-mana-secondary/40' 
                            : 'bg-mana-card text-mana-accent shadow-mana-accent/20'
                        }`}
                >
                    <span className="text-xl">🌱</span>
                </button>
            </div>

            <button 
                onClick={() => setCurrentView('social')}
                className={`flex flex-col items-center gap-1 ${currentView === 'social' ? 'text-mana-primary' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${currentView === 'social' ? 'bg-mana-primary text-white' : 'bg-slate-800'}`}>
                    <span className="text-xs">💬</span>
                </div>
                <span className="text-[10px] font-medium">Social</span>
            </button>

            <button 
                onClick={() => setCurrentView('profile')}
                className={`flex flex-col items-center gap-1 ${currentView === 'profile' ? 'text-mana-primary' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <span className="text-xl">👤</span>
                <span className="text-[10px] font-medium">Perfil</span>
            </button>
        </div>
      </div>

    </div>
  );
};

export default App;
