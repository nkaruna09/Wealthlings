import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ShoppingBag, Zap, Heart, Sparkles, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  coins: number;
  onPurchase: (type: 'healing' | 'xp', cost: number) => void;
}

export const Store: React.FC<Props> = ({ coins, onPurchase }) => {
  const items = [
    {
      id: 'healing',
      name: 'Healing Potion',
      desc: 'Restores 50% health to one Stockling!',
      cost: 500,
      icon: <Heart className="text-rose-400" size={32} />,
      color: 'bg-rose-500/10 border-rose-500/20'
    },
    {
      id: 'xp',
      name: 'Super Snack',
      desc: 'Instantly gain +1 Level!',
      cost: 1200,
      icon: <Zap className="text-yellow-400" size={32} />,
      color: 'bg-yellow-500/10 border-yellow-500/20'
    },
    {
      id: 'bundle',
      name: 'Mega Bundle',
      desc: '3 Potions + 1 Snack (Save 200 🪙)',
      cost: 2500,
      icon: <Sparkles className="text-ws-blue" size={32} />,
      color: 'bg-blue-500/10 border-blue-500/20'
    }
  ];

  const handleBuy = (item: any) => {
    if (coins < item.cost) {
      toast.error("Not enough coins!", {
        description: `You need ${item.cost - coins} more 🪙 to buy this.`
      });
      return;
    }
    onPurchase(item.id, item.cost);
  };

  return (
    <div className="p-6 space-y-8 pb-32">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-white tracking-tighter">Market Store</h2>
        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest leading-none">Gear up for the next fog</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <Motion.div 
            key={item.id}
            whileHover={{ y: -5 }}
            className={`p-6 rounded-[2.5rem] border flex items-center justify-between gap-6 glass-card ${item.color}`}
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center shrink-0 shadow-inner">
                {item.icon}
              </div>
              <div>
                <h4 className="font-black text-white text-base leading-tight mb-1">{item.name}</h4>
                <p className="text-[11px] text-slate-400 font-medium leading-tight max-w-[150px]">{item.desc}</p>
              </div>
            </div>
            
            <button 
              onClick={() => handleBuy(item)}
              className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-ws-yellow transition-colors shrink-0"
            >
              {item.cost} 🪙
            </button>
          </Motion.div>
        ))}
      </div>

      <div className="glass-card p-8 rounded-[3rem] relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-slate-900">
         <div className="relative z-10">
            <h3 className="text-xl font-black text-white mb-2">Want more coins?</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
              Coins are earned by holding your Stocklings through storms. The longer you hold, the more you earn!
            </p>
            <div className="flex items-center gap-4 text-xs font-black uppercase text-ws-yellow">
               <span className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-ws-yellow rounded-full animate-pulse" />
                 Earning Rate: 10 🪙 / min
               </span>
            </div>
         </div>
      </div>
    </div>
  );
};
