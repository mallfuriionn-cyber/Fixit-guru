
import React from 'react';
import { Info, History, Wrench, BookOpen, Leaf, Hammer } from 'lucide-react';

interface Props { lang: 'cs' | 'en'; }

export const AboutContent: React.FC<Props> = ({ lang }) => (
  <div className="space-y-6 max-w-xl mx-auto py-1">
    <div className="flex items-center gap-3 border-l-4 border-blue-600 pl-4 py-1">
       <h2 className="text-xl font-black uppercase tracking-tighter">
         {lang === 'cs' ? 'Manifest Synthesis 2026' : 'Synthesis Manifesto 2026'}
       </h2>
    </div>
    <p className="text-[10.5px] text-zinc-600 font-medium leading-relaxed italic">
      {lang === 'cs' 
        ? 'Naším cílem je svět bez zbytečného odpadu, kde oprava není jen úspora peněz, ale vyjádření úcty k materiálu a planetě. Vracíme dovednosti do lidských rukou.' 
        : 'Our goal is a world without unnecessary waste, where repair is not just saving money, but expressing respect for material and the planet.'}
    </p>
    
    <div className="space-y-3">
      <span className="text-[8px] font-black uppercase text-zinc-400 block tracking-widest">
        {lang === 'cs' ? 'Rodokmen asistentů' : 'Assistant Lineage'}
      </span>
      <div className="grid grid-cols-1 gap-2.5">
        {[
          { name: 'Karel', role: 'Hardware God', icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-50', desc: lang === 'cs' ? 'Technická data, PCB a diagnostika. Žádné zbytečné řeči.' : 'Tech data, PCB and diagnostics. No small talk.' },
          { name: 'Lucie', role: 'Knowledge Base', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50', desc: lang === 'cs' ? 'Mentor, Step-Lock procesy. Vždy vypíše nářadí a vede vás krok za krokem.' : 'Mentor, Step-Lock processes. Lists tools and guides you step-by-step.' },
          { name: 'Dáša', role: 'Green Fanatic', icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50', desc: lang === 'cs' ? 'Botanika a eko-vychytávky. Diagnostika rostlin bez chemie.' : 'Botany and eco-hacks. Plant diagnostics without chemicals.' },
          { name: 'František', role: 'Master of Force', icon: Hammer, color: 'text-orange-600', bg: 'bg-orange-50', desc: lang === 'cs' ? 'Drsný praktik. Stavby, dřevo a nekompromisní bezpečnost.' : 'Raw practitioner. Construction, wood and uncompromising safety.' },
        ].map((char) => (
          <div key={char.name} className="p-4 rounded-[2.2rem] bg-zinc-50 border border-black/5 flex gap-5 items-center hover:bg-white hover:shadow-md transition-all">
            <div className={`p-3 rounded-2xl ${char.bg} ${char.color} shadow-inner shrink-0`}><char.icon className="w-6 h-6" /></div>
            <div>
              <h4 className="font-black text-[10px] uppercase text-zinc-900 leading-none mb-1">{char.name} <span className="text-[7px] text-zinc-400 ml-2">[{char.role}]</span></h4>
              <p className="text-[8.5px] text-zinc-500 leading-tight">{char.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="p-5 rounded-[2.5rem] bg-blue-50 border border-blue-100 flex items-center gap-4">
       <div className="p-2.5 rounded-2xl bg-white shadow-sm"><History className="w-5 h-5 text-blue-600" /></div>
       <div className="flex-1">
          <h5 className="text-[9px] font-black uppercase text-blue-900">Synthesis Roadmap 2026+</h5>
          <p className="text-[8.5px] text-blue-800/60 uppercase leading-tight">Integrace globálních skladů náhradních dílů a 3D katalog pro tisk chybějících krytek a knoflíků.</p>
       </div>
    </div>
  </div>
);
