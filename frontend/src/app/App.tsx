import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Scan, Beaker, Shield, CloudRain, Trash2, ShoppingBag, Heart, Zap } from 'lucide-react';
import { Toaster, toast } from 'sonner';

import { Stockling, Archetype, Inventory } from '@/types/stocklings';
import { StocklingCard } from '@/app/components/StocklingCard';
import { Scanner } from '@/app/components/Scanner';
import { MarketLab } from '@/app/components/MarketLab';
import { Store } from '@/app/components/Store';
import '@/styles/fonts.css';

const INITIAL_STOCKLINGS: Stockling[] = [
  {
    id: '1',
    name: 'Berty',
    brand: 'GENERAL MILLS',
    sector: 'Consumer',
    archetype: 'Steady Guardian',
    level: 5,
    health: 92,
    mood: 'happy',
    isAffectedByStorm: false,
    color: '#10B981',
    icon: '🥣'
  },
  {
    id: '2',
    name: 'Glitch',
    brand: 'ROBLOX',
    sector: 'Gaming',
    archetype: 'Trend Chaser',
    level: 12,
    health: 78,
    mood: 'happy',
    isAffectedByStorm: false,
    color: '#3B82F6',
    icon: '🎮'
  },
  {
    id: '3',
    name: 'Titan',
    brand: 'APPLE',
    sector: 'Tech',
    archetype: 'Giant',
    level: 3,
    health: 95,
    mood: 'happy',
    isAffectedByStorm: false,
    color: '#94A3B8',
    icon: '🍎'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'scanner' | 'lab' | 'store'>('dashboard');
  const [stocklings, setStocklings] = useState<Stockling[]>(INITIAL_STOCKLINGS);
  const [isStormActive, setIsStormActive] = useState(false);
  const [coins, setCoins] = useState(2450);
  const [inventory, setInventory] = useState<Inventory>({ potions: 2, snacks: 0 });
  
  const uniqueArchetypes = new Set(stocklings.map(s => s.archetype));
  const hasDiversificationShield = uniqueArchetypes.size >= 3;

  // Simulate periodic storms and coin earning
  useEffect(() => {
    const stormTimer = setInterval(() => {
       if (!isStormActive && Math.random() > 0.8) triggerStorm();
    }, 20000);

    const coinTimer = setInterval(() => {
       setCoins(prev => prev + 10);
    }, 60000);

    return () => {
      clearInterval(stormTimer);
      clearInterval(coinTimer);
    };
  }, [isStormActive]);

  const triggerStorm = () => {
    setIsStormActive(true);
    setStocklings(prev => prev.map(s => {
      if (s.archetype === 'Trend Chaser' || s.archetype === 'Sprinter') {
        return { ...s, isAffectedByStorm: true, mood: 'nervous', health: Math.max(10, s.health - 20) };
      }
      return s;
    }));
    
    toast.info("A Sector Fog is rolling in...", {
      description: hasDiversificationShield 
        ? "Your diversification shield is protecting your team!" 
        : "Your Trend Chasers are taking damage! Use potions or diversify!",
      duration: 6000,
    });

    setTimeout(() => {
      setIsStormActive(false);
      setStocklings(prev => prev.map(s => ({ ...s, isAffectedByStorm: false, mood: 'happy' })));
      toast.success("The Fog has cleared!", { icon: '☀️' });
    }, 12000);
  };

  const handlePurchase = (type: 'healing' | 'xp' | 'bundle', cost: number) => {
    setCoins(prev => prev - cost);
    if (type === 'healing') {
      setInventory(prev => ({ ...prev, potions: prev.potions + 1 }));
      toast.success("Bought 1 Healing Potion!");
    } else if (type === 'xp') {
      setInventory(prev => ({ ...prev, snacks: prev.snacks + 1 }));
      toast.success("Bought 1 Super Snack!");
    } else if (type === 'bundle') {
      setInventory(prev => ({ potions: prev.potions + 3, snacks: prev.snacks + 1 }));
      toast.success("Bought Mega Bundle!");
    }
  };

  const handleHeal = (id: string) => {
    if (inventory.potions <= 0) return;
    setInventory(prev => ({ ...prev, potions: prev.potions - 1 }));
    setStocklings(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, health: Math.min(100, s.health + 50), mood: 'happy' };
      }
      return s;
    }));
    toast.success("Used Healing Potion!", { icon: '💖' });
  };

  const handleScanComplete = (brand: string) => {
    const newStockling: Stockling = {
      id: Math.random().toString(),
      name: 'Flash',
      brand: brand,
      sector: 'Market DNA',
      archetype: 'Sprinter',
      level: 1,
      health: 100,
      mood: 'happy',
      isAffectedByStorm: false,
      color: '#FFD700',
      icon: '✨'
    };
    setStocklings(prev => [newStockling, ...prev]);
    setActiveTab('dashboard');
    toast.success(`${brand} DNA extracted!`);
  };

  const releaseStockling = (id: string) => {
    setStocklings(prev => prev.filter(s => s.id !== id));
    toast.error("Stockling released.");
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-0 md:p-6 select-none overflow-hidden">
      <div className="w-full max-w-[430px] h-full md:h-[844px] bg-[#0F172A] md:rounded-[3.5rem] md:shadow-[0_0_0_12px_#1e293b,0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col border border-slate-800">
        <Toaster position="top-center" richColors expand={true} theme="dark" />
        
        {/* Notch Area */}
        <div className="h-10 w-full flex items-center justify-between px-10 shrink-0 bg-[#0F172A]/80 backdrop-blur-md z-40">
           <div className="text-[12px] font-black text-white/60">9:41</div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full border-2 border-white/20" />
             <div className="w-4 h-2.5 bg-white/40 rounded-[2px]" />
           </div>
        </div>

        {/* Header - Hidden when scanning for more immersion */}
        <header className={`px-8 pt-6 pb-2 flex items-center justify-between shrink-0 bg-[#0F172A]/80 backdrop-blur-md z-40 transition-opacity ${activeTab === 'scanner' ? 'opacity-0' : 'opacity-100'}`}>
           <Motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex items-center gap-3"
           >
              <div className="w-10 h-10 bg-ws-yellow rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                 <Shield size={20} className="text-slate-900" />
              </div>
              <div>
                <h1 className="text-xl font-black text-white tracking-tighter leading-none">Stocklings</h1>
                <div className="flex items-center gap-1.5 mt-1">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   <p className="text-[8px] font-black uppercase text-emerald-500 tracking-widest">Market Live</p>
                </div>
              </div>
           </Motion.div>
           
           <Motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex items-center gap-2"
           >
              <div className="bg-slate-800/80 px-4 py-1.5 rounded-full flex items-center gap-2 border border-slate-700">
                 <span className="text-xs">🪙</span>
                 <span className="text-[12px] font-black text-white">{coins.toLocaleString()}</span>
              </div>
           </Motion.div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <Motion.div 
                key="dashboard" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                className="p-6 space-y-8"
              >
                {isStormActive && (
                   <Motion.div 
                     initial={{ scale: 0.9, opacity: 0, rotateX: 45 }} 
                     animate={{ scale: 1, opacity: 1, rotateX: 0 }} 
                     className="bg-indigo-900/40 border border-indigo-500/30 rounded-[2.5rem] p-6 text-white relative overflow-hidden backdrop-blur-sm shadow-2xl"
                   >
                     <div className="absolute top-0 right-0 p-4 opacity-10"><CloudRain size={80} /></div>
                     <div className="relative z-10 flex items-center gap-4">
                        <Motion.div 
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center animate-pulse shadow-lg shadow-indigo-500/40"
                        >
                           <CloudRain size={28} />
                        </Motion.div>
                        <div>
                           <h4 className="font-black italic uppercase text-[10px] tracking-widest text-indigo-400">Atmosphere Alert</h4>
                           <h3 className="text-lg font-black tracking-tight leading-none mt-1">Volatility Fog Inbound</h3>
                           <p className="text-[10px] font-medium mt-1 opacity-60">High-risk sectors are taking damage</p>
                        </div>
                     </div>
                   </Motion.div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-white tracking-tighter">My Team</h2>
                    <div className="flex gap-2">
                       <Motion.div 
                         whileHover={{ scale: 1.05 }}
                         className="bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-black border border-rose-500/20 shadow-sm"
                       >
                          <Heart size={12} className="fill-rose-400/20" />
                          {inventory.potions} Potions
                       </Motion.div>
                    </div>
                  </div>

                  <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8 -mx-6 px-6">
                    {stocklings.map((s, idx) => (
                      <Motion.div 
                        key={s.id} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative"
                      >
                         <StocklingCard 
                            stockling={s} 
                            hasShield={hasDiversificationShield} 
                            inventoryPotions={inventory.potions}
                            onHeal={handleHeal}
                         />
                         {s.isAffectedByStorm && (
                           <Motion.button 
                             initial={{ scale: 0 }}
                             animate={{ scale: 1 }}
                             whileTap={{ scale: 0.9 }} 
                             onClick={() => releaseStockling(s.id)} 
                             className="absolute -top-3 -right-3 w-10 h-10 bg-slate-800 text-rose-500 rounded-xl flex items-center justify-center shadow-xl z-30 border border-slate-700"
                           >
                              <Trash2 size={18} />
                           </Motion.button>
                         )}
                      </Motion.div>
                    ))}
                  </div>
                </div>

                <Motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`p-6 rounded-[2.5rem] flex items-center justify-between gap-4 glass-card ${hasDiversificationShield ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-slate-800/40 border-white/5'}`}
                >
                   <div className="flex items-center gap-4">
                     <Motion.div 
                       animate={hasDiversificationShield ? { scale: [1, 1.1, 1] } : {}}
                       transition={{ duration: 2, repeat: Infinity }}
                       className={`w-12 h-12 rounded-2xl flex items-center justify-center ${hasDiversificationShield ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-600'}`}
                     >
                        <Shield size={24} />
                     </Motion.div>
                     <div>
                        <h4 className="font-black text-white text-sm tracking-tight leading-none">
                          {hasDiversificationShield ? 'Team Shield: ACTIVE' : 'Team Shield: OFFLINE'}
                        </h4>
                        <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">
                          {hasDiversificationShield ? 'Volatility protection online' : 'Collect 3+ archetypes to activate'}
                        </p>
                     </div>
                   </div>
                   {hasDiversificationShield && <Zap size={16} className="text-emerald-500 animate-pulse" />}
                </Motion.div>
              </Motion.div>
            )}

            {activeTab === 'lab' && (
              <Motion.div key="lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-20">
                <MarketLab />
              </Motion.div>
            )}

            {activeTab === 'store' && (
              <Motion.div key="store" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-20">
                <Store coins={coins} onPurchase={handlePurchase} />
              </Motion.div>
            )}
            
            {activeTab === 'scanner' && (
              <Motion.div key="scanner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[60]">
                <Scanner onScanComplete={handleScanComplete} onBack={() => setActiveTab('dashboard')} />
              </Motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Nav Bar */}
        <nav className="h-22 bg-[#0F172A]/95 backdrop-blur-2xl border-t border-white/5 flex items-center justify-between px-6 pb-6 shrink-0 z-50">
           <NavButton 
             active={activeTab === 'dashboard'} 
             icon={<LayoutGrid size={22} />} 
             label="Team" 
             onClick={() => setActiveTab('dashboard')} 
           />
           <NavButton 
             active={activeTab === 'store'} 
             icon={<ShoppingBag size={22} />} 
             label="Store" 
             onClick={() => setActiveTab('store')} 
           />
           <NavButton 
             active={activeTab === 'scanner'} 
             icon={<Scan size={22} />} 
             label="Scan" 
             onClick={() => setActiveTab('scanner')} 
           />
           <NavButton 
             active={activeTab === 'lab'} 
             icon={<Beaker size={22} />} 
             label="Lab" 
             onClick={() => setActiveTab('lab')} 
           />
        </nav>

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full" />
      </div>
    </div>
  );
}

const NavButton = ({ active, icon, label, onClick }: any) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center gap-1.5 transition-all duration-300 w-16 ${active ? 'text-ws-blue' : 'text-slate-500'}`}
  >
    <Motion.div 
      animate={active ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
      className={`w-10 h-10 rounded-2xl flex items-center justify-center ${active ? 'bg-ws-blue/10' : ''}`}
    >
      {icon}
    </Motion.div>
    <span className={`text-[9px] font-black uppercase tracking-widest leading-none ${active ? 'opacity-100' : 'opacity-60'}`}>
      {label}
    </span>
  </button>
);
