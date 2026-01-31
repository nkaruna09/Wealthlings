import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Heart, Trophy, Zap, Shield, Sparkles } from 'lucide-react';
import { Stockling } from '@/types/stocklings';
import { StocklingVisual } from './StocklingVisual';

interface Props {
  stockling: Stockling;
  hasShield?: boolean;
  inventoryPotions: number;
  onHeal: (id: string) => void;
}

export const StocklingCard: React.FC<Props> = ({ stockling, hasShield, inventoryPotions, onHeal }) => {
  return (
    <Motion.div 
      whileTap={{ scale: 0.95 }}
      className={`glass-card min-w-[280px] p-6 rounded-[2.5rem] relative overflow-hidden transition-all duration-500 ${stockling.isAffectedByStorm ? 'bg-indigo-900/40' : ''}`}
    >
      {/* Fog Overlay */}
      {stockling.isAffectedByStorm && (
        <Motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-indigo-500/10 backdrop-blur-[1.5px] pointer-events-none z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent animate-pulse" />
        </Motion.div>
      )}

      {/* Shield Beam */}
      {stockling.isAffectedByStorm && hasShield && (
        <Motion.div 
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 z-20 pointer-events-none border-4 border-mint-400 rounded-[2.5rem] shadow-[inset_0_0_20px_rgba(16,185,129,0.3)]"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-mint-400/40 to-transparent blur-md" />
        </Motion.div>
      )}

      <div className="relative z-20">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <h3 className="text-xl font-black text-white tracking-tight leading-none mb-1">{stockling.name}</h3>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1">
               {stockling.brand} • {stockling.sector}
            </span>
          </div>
          <div className="bg-slate-800/80 w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm">
            <span className="text-lg">{stockling.icon}</span>
          </div>
        </div>

        <div className="h-40 flex items-center justify-center mb-6">
          <StocklingVisual 
            archetype={stockling.archetype} 
            color={stockling.color} 
            mood={stockling.mood}
            isAffectedByStorm={stockling.isAffectedByStorm && !hasShield}
          />
        </div>

        <div className="space-y-4">
          {/* Health Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
              <span className="flex items-center gap-1">
                <Heart size={10} className={stockling.health < 40 ? 'text-rose-400' : 'text-rose-500 fill-rose-500'} />
                Confidence
              </span>
              <span className={stockling.health < 40 ? 'text-rose-500' : 'text-slate-200'}>{stockling.health}%</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <Motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stockling.health}%` }}
                className={`h-full ${stockling.health < 40 ? 'bg-rose-400' : 'bg-rose-500'}`}
              />
            </div>
          </div>

          {/* Actions & Stats */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full flex items-center gap-1 text-[10px] font-black">
                <Trophy size={10} />
                LVL {stockling.level}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {inventoryPotions > 0 && stockling.health < 100 && (
                <Motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onHeal(stockling.id)}
                  className="w-10 h-10 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-900/40"
                >
                  <Heart size={18} />
                </Motion.button>
              )}
              {hasShield && stockling.isAffectedByStorm && (
                <div className="w-10 h-10 bg-mint-400 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-mint-900/40">
                    <Shield size={18} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Motion.div>
  );
};
