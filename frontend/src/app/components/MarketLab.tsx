import React from 'react';
import { motion as Motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Sparkles, Users, Wind, ShieldCheck } from 'lucide-react';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 200 },
  { name: 'Thu', value: 278 },
  { name: 'Fri', value: 189 },
  { name: 'Sat', value: 239 },
  { name: 'Sun', value: 349 },
];

export const MarketLab: React.FC = () => {
  return (
    <div className="p-6 space-y-8 pb-32">
      <Motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-2"
      >
        <h2 className="text-3xl font-black text-white tracking-tighter">Learn & Grow</h2>
        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest leading-none">The Market Laboratory</p>
      </Motion.div>

      {/* Chunky Graph Card */}
      <Motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 rounded-[3rem] space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={120} className="text-ws-blue" />
          </Motion.div>
        </div>

        <div className="flex items-center justify-between relative z-10">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="font-black text-white leading-none text-base">The Market Rollercoaster</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Historical Growth</p>
              </div>
           </div>
        </div>

        <div className="h-48 w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" hide />
              <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip 
                contentStyle={{ borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(30, 41, 59, 0.9)', color: '#fff', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', fontWeight: 'bold' }}
                itemStyle={{ color: '#3B82F6' }}
                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={8} 
                dot={{ r: 6, fill: '#3B82F6', strokeWidth: 4, stroke: '#1E293B' }}
                activeDot={{ r: 10, strokeWidth: 0 }}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/80 p-5 rounded-[2rem] border border-white/5 relative z-10">
           <p className="text-xs text-slate-300 font-medium leading-relaxed italic">
             "Notice how even when it goes down, the general trend is upward? Patience is the key to letting your Stocklings grow big!"
           </p>
        </div>
      </Motion.div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 gap-4">
        <TipCard 
           icon={<Users size={24} />} 
           title="Diversify Your Team" 
           desc="Teams are stronger! Multiple types help each other grow." 
           color="bg-ws-yellow/5 border-ws-yellow/20"
           iconBg="bg-ws-yellow/20"
           iconColor="text-ws-yellow"
           index={2}
        />
        <TipCard 
           icon={<Wind size={24} />} 
           title="Weather the Storm" 
           desc="The fog always clears. Keep your Stocklings safe and warm." 
           color="bg-ws-blue/5 border-ws-blue/20"
           iconBg="bg-ws-blue/20"
           iconColor="text-ws-blue"
           index={3}
        />
        <TipCard 
           icon={<ShieldCheck size={24} />} 
           title="Protection Shield" 
           desc="Having different archetypes acts as a protective shield." 
           color="bg-emerald-500/5 border-emerald-500/20"
           iconBg="bg-emerald-500/20"
           iconColor="text-emerald-500"
           index={4}
        />
      </div>
    </div>
  );
};

const TipCard = ({ icon, title, desc, color, iconBg, iconColor, index }: any) => (
  <Motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.02)' }}
    className={`p-6 rounded-[2.5rem] flex items-center gap-6 border glass-card transition-colors ${color}`}
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${iconBg} ${iconColor}`}>
      {icon}
    </div>
    <div>
      <h4 className="font-black text-white text-sm leading-tight mb-1">{title}</h4>
      <p className="text-[11px] text-slate-400 font-medium leading-tight">{desc}</p>
    </div>
  </Motion.div>
);
