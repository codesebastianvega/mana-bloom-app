
import React, { useState } from 'react';
import { MOCK_PLANT, PLANT_ACTIONS, MOCK_TASKS, USER_DATA } from '../constants';
import { PlantHero } from './PlantHero';
import { PlantStatus } from './PlantStatus';
import { PlantCareRituals } from './PlantCareRituals';
import { ElementBalance } from './ElementBalance';
import { PlantAction } from '../types';
import { GoogleGenAI } from "@google/genai";

export const PlantScreen: React.FC = () => {
  const [plant, setPlant] = useState(MOCK_PLANT);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [lastActivity, setLastActivity] = useState<string | null>("Regado hace 2h");
  
  // Soul Connection State
  const [isCommuning, setIsCommuning] = useState(false);
  const [plantMessage, setPlantMessage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleAction = (action: PlantAction) => {
    // 1. Calculate Cost
    if (action.cost.mana > 1000) { 
        alert("No tienes suficiente mana!");
        return;
    }

    // 2. Apply Effect
    setPlant(prev => {
        const newStats = { ...prev.stats };
        if (action.id === 'water') newStats.hydration = Math.min(100, newStats.hydration + 20);
        if (action.id === 'light') newStats.sunlight = Math.min(100, newStats.sunlight + 15);
        if (action.id === 'meditate') newStats.happiness = Math.min(100, newStats.happiness + 5);
        
        return {
            ...prev,
            stats: newStats,
            xp: Math.min(prev.maxXp, prev.xp + 5),
            ritualsCompleted: Math.min(prev.ritualsTotal, prev.ritualsCompleted + 1)
        };
    });

    setLastAction(`${action.label} activado`);
    setLastActivity(`${action.label} hace un momento`);
    setTimeout(() => setLastAction(null), 3000);

    // Haptic
    if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
  };

  const handleSpeak = async () => {
      setIsCommuning(true);
      setIsTyping(true);
      setPlantMessage(null);

      // AI Context Construction
      const recentTasks = MOCK_TASKS.slice(0, 3).map(t => t.title).join(", ");
      const context = `
        Estadísticas de la planta: Salud ${plant.stats.health}%, Felicidad ${plant.stats.happiness}%.
        Racha del usuario: ${USER_DATA.stats.habitsStreak} días.
        Tareas recientes del usuario: ${recentTasks}.
        Personalidad de la planta: ${plant.personality.type} (${plant.personality.description}).
        Etapa: ${plant.stage}.
      `;

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Actúa como 'Ernesto', un Bonsai Místico en una app de productividad. 
        El usuario ha venido a hablar contigo. Usa el contexto proporcionado para darle un consejo breve, místico y empático (máx 20 palabras).
        Si la salud es baja, pide cuidado suavemente. Si la racha es alta, felicítalo con metáforas de naturaleza.
        Contexto: ${context}.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        setPlantMessage(response.text.trim());
      } catch (error) {
        setPlantMessage("El viento susurra... pero no logro entender el mensaje. (Error de conexión)");
      } finally {
        setIsTyping(false);
      }
  };

  return (
    <div className="min-h-screen bg-mana-dark pb-24 relative overflow-x-hidden">
        
        {/* Toast Notification */}
        {lastAction && (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-mana-secondary text-mana-dark px-6 py-3 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(52,211,153,0.5)] animate-bounce flex items-center gap-2 border border-white/20">
                <span>✨</span> {lastAction}
            </div>
        )}

        {/* Soul Connection Modal */}
        {isCommuning && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-500" onClick={() => !isTyping && setIsCommuning(false)}>
                <div className="w-full max-w-sm bg-[#0e0a1e] border border-emerald-500/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)] text-center">
                    {/* Background FX */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full"></div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-900 to-black border-2 border-emerald-500/50 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(16,185,129,0.4)] mb-6 animate-pulse">
                            🌳
                        </div>
                        
                        <h3 className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-4">Comunión con Ernesto</h3>
                        
                        <div className="min-h-[80px] flex items-center justify-center">
                            {isTyping ? (
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
                                </div>
                            ) : (
                                <p className="text-xl font-medium text-white italic leading-relaxed animate-in zoom-in duration-300">
                                    "{plantMessage}"
                                </p>
                            )}
                        </div>

                        {!isTyping && (
                            <p className="text-[10px] text-slate-500 mt-8 animate-pulse">Toca cualquier parte para volver</p>
                        )}
                    </div>
                </div>
            </div>
        )}

        <main className="max-w-md mx-auto w-full">
            <PlantHero 
                plant={plant} 
                onSpeak={handleSpeak} 
                lastActivity={lastActivity} 
            />
            <PlantStatus plant={plant} />
            <PlantCareRituals actions={PLANT_ACTIONS} onAction={handleAction} />
            <ElementBalance balance={plant.elementalBalance} personality={plant.personality} />
        </main>
    </div>
  );
};
