
import React, { useState, useEffect } from 'react';
import { SOCIAL_FEED } from '../constants';

export const SocialTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
        setIsVisible(false); // Fade out
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % SOCIAL_FEED.length);
            setIsVisible(true); // Fade in
        }, 500);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const item = SOCIAL_FEED[currentIndex];

  return (
    <div className="w-full bg-[#13111f]/80 backdrop-blur-sm border-b border-white/5 py-1.5 flex justify-center items-center overflow-hidden">
        <div 
            className={`flex items-center gap-2 text-[10px] transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-400">
                <span className="font-bold text-slate-200">{item.user.name}</span> {item.action}
            </span>
            <span className="text-slate-600 border-l border-white/10 pl-2">hace {item.timeAgo}</span>
        </div>
    </div>
  );
};
