import React from 'react';
import { motion as Motion } from 'framer-motion';
import { CloudLightning, AlertTriangle, ShieldCheck } from 'lucide-react';

interface MarketStormProps {
  onUsePotion: () => void;
  potionCount: number;
}

export const MarketStorm: React.FC<MarketStormProps> = ({ onUsePotion, potionCount }) => {
  return (
    <Motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-rose-900/30 border-2 border-rose-500/50 rounded-3xl p-5 relative overflow-hidden"
    >
      <div className="absolute -right-4 -top-4 text-rose-500/10 transform -rotate-12">
        <CloudLightning size={100} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-rose-500 p-1.5 rounded-lg text-white animate-pulse">
            <AlertTriangle size={16} />
          </div>
          <h3 className="text-sm font-black text-rose-100 uppercase italic tracking-tighter">Market Storm Active!</h3>
        </div>
        
        <p className="text-rose-100/70 text-[10px] mb-4 font-medium leading-tight">
          Stock prices are dropping fast. Use a <span className="text-rose-400 font-bold">Diversification Potion</span> to protect your pets!
        </p>
        
        <Motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onUsePotion}
          disabled={potionCount <= 0}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase transition-all shadow-lg ${
            potionCount > 0 
              ? 'bg-rose-500 text-white shadow-rose-900/40' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <ShieldCheck size={14} />
          Heal All ({potionCount})
        </Motion.button>
      </div>
    </Motion.div>
  );
};
