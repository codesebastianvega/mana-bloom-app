
import React, { useState, useEffect } from 'react';
import { USER_DATA } from './constants';
import { StickyHeader } from './components/StickyHeader';
import { WelcomeHero } from './components/WelcomeHero';
import { PromoSlider } from './components/PromoSlider';
import { StatusSection } from './components/StatusSection';
import { RewardsSection } from './components/RewardsSection';
import { DailyChallenges } from './components/DailyChallenges';
import { MagicShopPreview } from './components/MagicShopPreview';
import { InventoryEvents } from './components/InventoryEvents';
import { TasksScreen } from './components/TasksScreen';
import { PlantScreen } from './components/PlantScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SocialScreen } from './components/SocialScreen';
import { GardenScreen } from './components/GardenScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { LoreScreen } from './components/LoreScreen'; // New Import
import { NavHavenDrawer } from './components/NavHavenDrawer';
import { FocusCrystalWidget } from './components/FocusCrystalWidget';
import { LevelUpModal } from './components/LevelUpModal';
import { RetentionModal } from './components/RetentionModal';
import { TutorialOverlay } from './components/TutorialOverlay'; // New Import
import { SocialTicker } from './components/SocialTicker'; // New Import

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'tasks' | 'plant' | 'garden' | 'profile' | 'social' | 'settings' | 'lore'>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false); // Tutorial State

  // Simulate Checks on Mount
  useEffect(() => {
      // 1. Check for First Time User (Tutorial)
      const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
      if (!hasSeenTutorial) {
          setTimeout(() => setShowTutorial(true), 1000);
      } else {
          // 2. Only show Welcome Back if not tutorial
          const timer = setTimeout(() => {
             // setShowWelcomeBack(true); // Disable auto retention for better UX during dev flow
          }, 3500);
          return () => clearTimeout(timer);
      }
  }, []);

  const handleTutorialComplete = () => {
      setShowTutorial(false);
      localStorage.setItem('hasSeenTutorial', 'true');
  };

  return (
    <div className="min-h-screen bg-mana-dark font-sans text-slate-200">
      
      {/* Onboarding Tutorial (Lumina) */}
      {showTutorial && (
          <TutorialOverlay onComplete={handleTutorialComplete} />
      )}

      {/* Level Up Modal (Overlay) */}
      {showLevelUp && (
          <LevelUpModal newLevel={USER_DATA.level + 1} onClose={() => setShowLevelUp(false)} />
      )}

      {/* Retention Reward Modal (Welcome Back) */}
      {showWelcomeBack && (
          <RetentionModal 
            onClose={() => setShowWelcomeBack(false)}
            onClaim={() => {
                setShowWelcomeBack(false);
                setTimeout(() => setShowLevelUp(true), 1500); // Demo chain
            }}
          />
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
          <SocialTicker /> {/* New Social Ticker */}
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
             {currentView !== 'garden' && currentView !== 'social' && currentView !== 'settings' && currentView !== 'lore' && <StickyHeader onOpenMenu={() => setIsDrawerOpen(true)} />}
             
             {currentView === 'tasks' ? (
                <TasksScreen />
             ) : currentView === 'plant' ? (
                <PlantScreen />
             ) : currentView === 'garden' ? (
                <GardenScreen />
             ) : currentView === 'profile' ? (
                <ProfileScreen onNavigate={(view) => setCurrentView(view as any)} />
             ) : currentView === 'settings' ? (
                <SettingsScreen user={USER_DATA} onBack={() => setCurrentView('profile')} />
             ) : currentView === 'lore' ? (
                <LoreScreen userLevel={USER_DATA.level} onBack={() => setCurrentView('home')} />
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
