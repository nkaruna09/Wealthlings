import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Archetype } from '@/types/stocklings';

interface Props {
  archetype: Archetype;
  color: string;
  mood: 'happy' | 'tired' | 'nervous';
  size?: 'sm' | 'md' | 'lg';
  isAffectedByStorm?: boolean;
}

export const StocklingVisual: React.FC<Props> = ({ archetype, color, mood, size = 'md', isAffectedByStorm }) => {
  const scale = size === 'sm' ? 0.6 : size === 'lg' ? 1.4 : 1;
  
  const getWiggle = () => {
    if (mood === 'nervous') return { x: [-2, 2, -2], transition: { repeat: Infinity, duration: 0.1 } };
    if (mood === 'happy') return { y: [0, -10, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } };
    return { x: [0, 2, 0], transition: { repeat: Infinity, duration: 4 } };
  };

  const renderBody = () => {
    switch (archetype) {
      case 'Steady Guardian':
        return (
          <div className="relative">
            <div className="w-24 h-16 rounded-t-full" style={{ backgroundColor: color }} />
            <div className="w-28 h-8 rounded-full -mt-4" style={{ backgroundColor: color, filter: 'brightness(0.9)' }} />
            <div className="absolute -top-2 left-8 w-4 h-4 rounded-full bg-white opacity-40" />
          </div>
        );
      case 'Trend Chaser':
        return (
          <div className="relative">
             <div className="w-16 h-24 rounded-full" style={{ backgroundColor: color }} />
             <div className="absolute -top-4 -left-2 w-6 h-12 rounded-full rotate-[-20deg]" style={{ backgroundColor: color }} />
             <div className="absolute -top-4 -right-2 w-6 h-12 rounded-full rotate-[20deg]" style={{ backgroundColor: color }} />
          </div>
        );
      case 'Giant':
        return (
          <div className="w-24 h-24 rounded-2xl" style={{ backgroundColor: color }} />
        );
      case 'Sprinter':
        return (
          <div className="w-16 h-16 rounded-full rotate-45" style={{ backgroundColor: color, borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%' }} />
        );
      case 'Diversifier':
        return (
          <div className="w-20 h-20 rounded-full blur-[1px]" style={{ 
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            border: `4px dashed ${color}44`
          }} />
        );
      default:
        return <div className="w-20 h-20 rounded-full" style={{ backgroundColor: color }} />;
    }
  };

  return (
    <Motion.div 
      animate={getWiggle()}
      style={{ scale, filter: isAffectedByStorm ? 'grayscale(0.6) opacity(0.8)' : 'none' }}
      className="relative flex items-center justify-center"
    >
      {renderBody()}
      
      {/* Eyes */}
      <div className="absolute flex gap-4 top-1/2 -translate-y-1/2">
        <div className="w-3 h-3 bg-slate-900 rounded-full relative">
          {mood === 'happy' && <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />}
          {mood === 'tired' && <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-900" />}
        </div>
        <div className="w-3 h-3 bg-slate-900 rounded-full relative">
          {mood === 'happy' && <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />}
          {mood === 'tired' && <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-900" />}
        </div>
      </div>

      {/* Mouth */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2">
        {mood === 'happy' && <div className="w-4 h-2 border-b-2 border-slate-900 rounded-full" />}
        {mood === 'nervous' && <div className="w-4 h-0.5 bg-slate-900" />}
        {mood === 'tired' && <div className="w-2 h-2 border-t-2 border-slate-900 rounded-full" />}
      </div>
    </Motion.div>
  );
};
