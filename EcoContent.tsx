
import React from 'react';
import { Leaf, Trash2, Coins, ShieldCheck, Zap } from 'lucide-react';

interface Props { lang: 'cs' | 'en'; }

export const EcoContent: React.FC<Props> = ({ lang }) => (
  <div className="space-y-6 max-w-xl mx-auto py-1">
    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900/40">
      {lang === 'cs' ? 'Měřič restituce materiálů' : 'Material Restitution Meter'}
    </h4>
    <div className="grid grid-cols-2 gap-3">
       <div className="p-6 rounded-[2.5rem] bg-zinc-950 text-white shadow-xl relative overflow-hidden">
         <div className="relative z-10 flex flex-col gap-1">
            <span className="text-[28px] font-black block leading-none">42.5 kg</span>
            <p className="text-[7.5px] opacity-40 uppercase tracking-widest">
              {lang === 'cs' ? 'Ušetřený odpad celkem' : 'Total Waste Saved'}
            </p>
         </div>
         <div className="mt-5 space-y-2 relative z-10">
           <div className="flex justify-between text-[7.5px] uppercase font-black">
             <span className="opacity-60">{lang === 'cs' ? 'Drahé kovy' : 'Precious Metals'}</span>
             <span className="text-blue-400">1.2 kg</span>
           </div>
           <div className="flex justify-between text-[7.5px] uppercase font-black">
             <span className="opacity-60">{lang === 'cs' ? 'Recyklovatelné plasty' : 'Recyclable Plastics'}</span>
             <span className="text-emerald-400">18.4 kg</span>
           </div>
           <div className="flex justify-between text-[7.5px] uppercase font-black">
             <span className="opacity-60">{lang === 'cs' ? 'Železo / Slitiny' : 'Iron / Alloys'}</span>
             <span className="text-zinc-400">22.9 kg</span>
           </div>
         </div>
         <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 blur-[50px] -translate-y-1/2 translate-x-1/2" />
       </div>
       <div className="grid grid-rows-2 gap-3">
          <div className="p-6 rounded-[2.5rem] bg-emerald-600 text-white flex flex-col justify-center shadow-lg">
            <span className="text-[20px] font-black leading-none">15.4k CZK</span>
            <p className="text-[8px] opacity-60 uppercase">
              {lang === 'cs' ? 'Finanční svoboda' : 'Financial Freedom'}
            </p>
          </div>
          <div className="p-6 rounded-[2.5rem] bg-white border border-black/5 flex items-center gap-4 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase leading-none">Green Bonus</span>
              <p className="text-[8px] text-zinc-400 uppercase leading-none mt-1.5">
                128 {lang === 'cs' ? 'rostlin zachráněno' : 'plants saved'}
              </p>
            </div>
          </div>
       </div>
    </div>
    
    <div className="p-6 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 flex gap-5 items-center">
      <div className="p-3.5 rounded-2xl bg-white shadow-sm shrink-0"><Zap className="w-6 h-6 text-emerald-600" /></div>
      <div>
        <h4 className="font-black text-[9.5px] uppercase text-emerald-900 leading-none mb-1.5">
          {lang === 'cs' ? 'Dášin Organický Report' : 'Dasa\'s Organic Report'}
        </h4>
        <p className="text-[8.5px] text-emerald-800/60 uppercase leading-tight">
          {lang === 'cs' 
            ? 'Vaše zahrada prosperuje bez agresivní chemie. Index biodiverzity: +14% díky absenci pesticidů.' 
            : 'Your garden thrives without aggressive chemicals. Biodiversity index: +14% due to no pesticides.'}
        </p>
      </div>
    </div>
  </div>
);
