import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Zap, Heart, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { Creature } from '@/types/game';

interface CreatureProps {
  creature: Creature;
  size?: 'sm' | 'md' | 'lg';
}

export const CreatureVisual: React.FC<CreatureProps> = ({ creature, size = 'md' }) => {
  const scale = size === 'sm' ? 0.6 : size === 'lg' ? 1.5 : 1;
  
  // Visual representation based on type
  const renderCreatureBody = () => {
    switch (creature.type) {
      case 'Speed-Runner':
        return (
          <div className="relative">
            <Motion.div 
              animate={{ x: [-2, 2, -2], y: [0, -2, 0] }}
              transition={{ duration: 0.2, repeat: Infinity }}
              className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute top-4 left-6 w-4 h-4 bg-white rounded-full" />
              <div className="absolute top-4 right-6 w-4 h-4 bg-white rounded-full" />
              <div className="w-12 h-4 bg-blue-700 mt-8 rounded-full opacity-50" />
            </Motion.div>
            <Motion.div 
              animate={{ x: [-10, 10, -10] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="absolute -bottom-2 -left-4 flex gap-1"
            >
              <div className="w-4 h-2 bg-blue-300 rounded-full" />
              <div className="w-4 h-2 bg-blue-300 rounded-full" />
            </Motion.div>
          </div>
        );
      case 'Caffeine-Sprite':
        return (
          <div className="relative">
            <Motion.div 
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 0.95, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-green-600 rounded-[40%] flex items-center justify-center relative"
            >
              <div className="absolute top-4 left-6 w-3 h-3 bg-white rounded-full" />
              <div className="absolute top-4 right-6 w-3 h-3 bg-white rounded-full" />
              <Motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-16 h-16 bg-green-400/30 rounded-full absolute -top-4"
              />
            </Motion.div>
          </div>
        );
      case 'iCore-Golem':
        return (
          <div className="relative">
            <Motion.div 
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-24 h-24 bg-gray-400 rounded-lg flex items-center justify-center relative border-4 border-gray-500"
            >
              <div className="w-16 h-12 bg-gray-300 rounded-sm flex gap-2 items-center justify-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75" />
              </div>
            </Motion.div>
          </div>
        );
      case 'Volt-Dragon':
        return (
          <div className="relative">
            <Motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-24 h-20 bg-amber-500 rounded-tr-[50%] rounded-tl-[50%] rounded-br-[20%] rounded-bl-[20%] relative"
            >
              <Zap className="absolute top-2 left-1/2 -translate-x-1/2 text-white w-8 h-8" />
              <div className="absolute -bottom-4 left-2 w-4 h-8 bg-amber-600 rounded-full rotate-12" />
              <div className="absolute -bottom-4 right-2 w-4 h-8 bg-amber-600 rounded-full -rotate-12" />
            </Motion.div>
          </div>
        );
      case 'Golden-Archie':
        return (
          <div className="relative">
             <Motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-24 h-24 bg-red-600 rounded-2xl flex items-center justify-center relative"
            >
              <Star className="text-yellow-400 fill-yellow-400 w-12 h-12" />
              <div className="absolute -top-2 left-4 w-6 h-6 bg-yellow-400 rounded-full" />
              <div className="absolute -top-2 right-4 w-6 h-6 bg-yellow-400 rounded-full" />
            </Motion.div>
          </div>
        );
      default:
        return <div className="w-24 h-24 bg-slate-200 rounded-full" />;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4" style={{ transform: `scale(${scale})` }}>
      <div className="relative">
        {creature.status === 'sick' && (
          <Motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold whitespace-nowrap"
          >
            Feeling Sick...
          </Motion.div>
        )}
        {renderCreatureBody()}
      </div>
      
      <div className="text-center">
        <h3 className="font-black text-sm text-white">{creature.name}</h3>
        <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{creature.brand} ({creature.symbol})</p>
      </div>

      <div className="w-full max-w-[120px] space-y-1.5 mt-2">
        <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-tighter">
          <div className="flex items-center gap-1">
            <Heart className={`w-2 h-2 ${creature.health < 30 ? 'text-rose-500 fill-rose-500' : 'text-emerald-400 fill-emerald-400'}`} />
            <span>Health</span>
          </div>
          <span className={creature.health < 30 ? 'text-rose-500' : 'text-emerald-400'}>{Math.round(creature.health)}%</span>
        </div>
        <div className="h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-700/50">
          <Motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${creature.health}%` }}
            className={`h-full ${creature.health < 30 ? 'bg-rose-500' : 'bg-emerald-400'}`}
          />
        </div>

        <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-tighter">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-2 h-2 text-indigo-400" />
            <span>Price</span>
          </div>
          <span className={creature.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
            ${creature.currentPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
