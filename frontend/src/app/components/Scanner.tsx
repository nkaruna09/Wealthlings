import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Scan, ChevronLeft, Sparkles, Zap, Box } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onScanComplete: (brand: string) => void;
  onBack: () => void;
}

const BRAND_MOCKS = ["NIKE", "APPLE", "STARBUCKS", "TESLA", "DISNEY"];

export const Scanner: React.FC<Props> = ({ onScanComplete, onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedBrand, setDetectedBrand] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setIsScanning(true);
    const delay = 1500 + Math.random() * 1500;
    setTimeout(() => {
      const randomBrand = BRAND_MOCKS[Math.floor(Math.random() * BRAND_MOCKS.length)];
      setDetectedBrand(randomBrand);
    }, delay);
  };

  useEffect(() => {
    if (detectedBrand && progress < 100) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 1.5;
          return next > 100 ? 100 : next;
        });
      }, 30);
      return () => clearInterval(interval);
    }
    
    if (progress === 100) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#3B82F6', '#10B981', '#FFD700', '#9333EA'],
        zIndex: 200
      });
      setTimeout(() => {
        onScanComplete(detectedBrand!);
      }, 1500);
    }
  }, [detectedBrand, progress]);

  return (
    <div className="absolute inset-0 bg-slate-950 flex flex-col overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <Motion.div 
          animate={{ 
            background: [
              'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Header Overlay */}
      <div className="relative z-20 p-8 pt-12 flex items-center justify-between">
        <Motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onBack} 
          className="w-12 h-12 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/10"
        >
          <ChevronLeft size={24} />
        </Motion.button>
        <div className="bg-white/5 backdrop-blur-xl px-5 py-2.5 rounded-2xl text-white font-black text-[11px] uppercase tracking-widest border border-white/10 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          DNA Scanner
        </div>
        <div className="w-12 h-12 opacity-0" />
      </div>

      {/* Main Scanner View */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-8 -mt-12">
        
        {/* Viewfinder Wrapper */}
        <div className="relative w-full aspect-square max-w-[280px]">
          <ViewfinderCorner position="top-left" color={detectedBrand ? "border-emerald-500" : "border-ws-yellow"} />
          <ViewfinderCorner position="top-right" color={detectedBrand ? "border-emerald-500" : "border-ws-yellow"} />
          <ViewfinderCorner position="bottom-left" color={detectedBrand ? "border-emerald-500" : "border-ws-yellow"} />
          <ViewfinderCorner position="bottom-right" color={detectedBrand ? "border-emerald-500" : "border-ws-yellow"} />

          <Motion.div 
            animate={{ 
              scale: isScanning ? [1, 1.02, 1] : 1,
              borderColor: detectedBrand ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.1)'
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-full h-full border rounded-[3rem] flex items-center justify-center relative overflow-hidden bg-white/[0.02] backdrop-blur-[2px]"
          >
            <AnimatePresence>
              {isScanning && !detectedBrand && (
                <Motion.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-ws-yellow/50 to-transparent shadow-[0_0_20px_rgba(255,215,0,0.4)] z-10"
                />
              )}
            </AnimatePresence>

            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>

            <div className="relative z-20 text-center">
               <AnimatePresence mode="wait">
                 {detectedBrand ? (
                    <Motion.div 
                      key="detected"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-24 h-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_40px_rgba(16,185,129,0.3)] mb-6">
                        <Motion.div
                          animate={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5, repeat: 3 }}
                        >
                          <Box size={48} className="text-white" />
                        </Motion.div>
                      </div>
                      <Motion.h3 
                        initial={{ y: 10 }} 
                        animate={{ y: 0 }} 
                        className="text-white font-black text-3xl tracking-tighter"
                      >
                        {detectedBrand}
                      </Motion.h3>
                      <p className="text-emerald-400 font-bold text-[10px] uppercase tracking-widest mt-2">DNA Matched!</p>
                    </Motion.div>
                 ) : (
                    <Motion.div 
                      key="searching"
                      className="flex flex-col items-center opacity-40 px-8"
                    >
                      <Motion.div
                        animate={{ scale: isScanning ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-20 h-20 border-4 border-dashed border-white/20 rounded-full flex items-center justify-center mb-6"
                      >
                        <Scan size={40} className="text-white" />
                      </Motion.div>
                      <h4 className="text-white font-bold text-sm tracking-tight">Point at Brand Logo</h4>
                      <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-2">Scanning for Market DNA</p>
                    </Motion.div>
                 )}
               </AnimatePresence>
            </div>
          </Motion.div>
        </div>

        {/* Progress Section */}
        <AnimatePresence>
          {detectedBrand && (
            <Motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="mt-12 w-full max-w-[280px] space-y-4"
            >
              <div className="flex justify-between items-end mb-1 px-1">
                 <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest animate-pulse">Hatching...</span>
                 <span className="text-white font-black text-xs">{Math.floor(progress)}%</span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <Motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${progress}%` }} 
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                />
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="p-12 pb-20 flex flex-col items-center gap-6 relative z-10">
        <AnimatePresence mode="wait">
          {!isScanning ? (
            <Motion.button
              key="scan-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={startScan}
              className="px-10 py-5 bg-ws-yellow text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_15px_30px_rgba(255,215,0,0.3)] flex items-center gap-3"
            >
              <Scan size={20} />
              Start Extraction
            </Motion.button>
          ) : !detectedBrand ? (
            <Motion.div 
              key="scanning-status"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <Motion.div 
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 bg-ws-yellow rounded-full"
                  />
                ))}
              </div>
              <p className="text-ws-yellow font-black text-[10px] uppercase tracking-widest">Searching...</p>
            </Motion.div>
          ) : (
            <div className="h-10" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ViewfinderCorner = ({ position, color }: { position: string, color: string }) => {
  const positions: any = {
    'top-left': 'top-0 left-0 border-t-4 border-l-4 rounded-tl-3xl',
    'top-right': 'top-0 right-0 border-t-4 border-r-4 rounded-tr-3xl',
    'bottom-left': 'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-3xl',
    'bottom-right': 'bottom-0 right-0 border-b-4 border-r-4 rounded-br-3xl',
  };

  return (
    <Motion.div 
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [1, 0.5, 1]
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className={`absolute w-10 h-10 ${positions[position]} ${color} z-30 transition-colors duration-500`} 
    />
  );
};
