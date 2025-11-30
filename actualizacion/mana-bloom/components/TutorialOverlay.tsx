
import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

export const TutorialOverlay: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Steps configuration
  const steps = [
      {
          text: "¡Saludos, viajero! Soy Lumina, el espíritu de este bosque.",
          position: "center", // Center screen
          highlight: null
      },
      {
          text: "Este lugar se alimenta de tu energía. Tus tareas y hábitos son el agua que da vida.",
          position: "bottom",
          highlight: ".task-section" // CSS selector mock
      },
      {
          text: "Mira a Ernesto. Es pequeño ahora, pero crecerá con tu constancia.",
          position: "top", // Pointing to hero
          highlight: ".plant-hero"
      },
      {
          text: "¡Adelante! Completa tu primera tarea y observa la magia.",
          position: "center",
          highlight: null
      }
  ];

  const currentStep = steps[step];

  const handleNext = () => {
      if (step < steps.length - 1) {
          setStep(step + 1);
      } else {
          setIsVisible(false);
          setTimeout(onComplete, 500); // Wait for fade out
      }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-auto flex flex-col transition-opacity duration-500">
        
        {/* Dark Backdrop with Spotlight Effect (Mocked via CSS masks if needed, simple blur for now) */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        {/* Lumina Character Container */}
        <div className={`absolute w-full flex justify-center px-6 transition-all duration-500 ease-in-out
            ${currentStep.position === 'center' ? 'top-1/2 -translate-y-1/2' : 
              currentStep.position === 'top' ? 'top-32' : 
              'bottom-32'}
        `}>
            <div className="relative max-w-xs w-full">
                
                {/* Lumina Visual */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-24 h-24 flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-[40px] animate-pulse"></div>
                    <div className="w-12 h-12 bg-white rounded-full shadow-[0_0_50px_rgba(34,211,238,0.8)] relative z-10 flex items-center justify-center text-2xl">
                        ✨
                    </div>
                </div>

                {/* Dialog Box */}
                <div className="bg-[#13111f] border border-cyan-500/50 rounded-2xl p-6 pt-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center relative animate-in zoom-in slide-in-from-bottom-4 duration-300">
                    <p className="text-lg text-cyan-100 font-medium leading-relaxed mb-6 font-serif">
                        "{currentStep.text}"
                    </p>
                    
                    <button 
                        onClick={handleNext}
                        className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white font-bold shadow-lg hover:scale-105 transition-transform"
                    >
                        {step === steps.length - 1 ? "Comenzar Viaje ✨" : "Siguiente ›"}
                    </button>
                    
                    <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#13111f] border-b border-r border-cyan-500/50 transform rotate-45"></div>
                </div>
            </div>
        </div>
    </div>
  );
};
