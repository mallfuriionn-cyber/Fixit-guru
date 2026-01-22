
import React from 'react';
import { HelpCircle, Wrench, BookOpen, Navigation, AudioLines, Microscope, Waves } from 'lucide-react';

interface Props { lang: 'cs' | 'en'; }

export const HelpContent: React.FC<Props> = ({ lang }) => (
  <div className="space-y-6 max-w-xl mx-auto py-1">
    <div className="space-y-4">
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
        {lang === 'cs' ? 'Metodika Synthesis' : 'Synthesis Methodology'}
      </h4>
      <div className="grid grid-cols-1 gap-2.5">
        <div className="p-4 rounded-3xl bg-blue-50 border border-blue-100 flex gap-4 items-center">
          <Wrench className="w-5 h-5 text-blue-600 shrink-0"/>
          <div>
            <h5 className="font-black text-[9px] uppercase tracking-widest text-blue-900">
              {lang === 'cs' ? 'KAREL: Hardware God' : 'KAREL: Hardware God'}
            </h5>
            <p className="text-[8.5px] text-blue-800/70 leading-tight">
              {lang === 'cs' 
                ? 'Rychlá schémata, napětí a přímá řešení pro experty. Karel předpokládá, že víte, co držíte v ruce.' 
                : 'Quick schematics, voltages and direct solutions for experts. Karel assumes you know your tools.'}
            </p>
          </div>
        </div>
        <div className="p-4 rounded-3xl bg-amber-50 border border-amber-100 flex gap-4 items-center">
          <BookOpen className="w-5 h-5 text-amber-600 shrink-0"/>
          <div>
            <h5 className="font-black text-[9px] uppercase tracking-widest text-amber-900">
              {lang === 'cs' ? 'LUCIE: Mentor' : 'LUCIE: Mentor'}
            </h5>
            <p className="text-[8.5px] text-amber-800/70 leading-tight">
              {lang === 'cs' 
                ? 'Step-Lock proces, příprava nářadí a vedení za ruku. Lucie vysvětlí i to, co Karel zamlčel.' 
                : 'Step-Lock process, tool prep and hand-holding guidance. Lucie explains what Karel left out.'}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
        {lang === 'cs' ? 'Vocal Link (Hlasové povely)' : 'Vocal Link (Voice Commands)'}
      </h4>
      <div className="bg-zinc-900 rounded-3xl p-5 text-blue-400 font-mono text-[9px] space-y-1.5 shadow-2xl">
        <div className="flex justify-between border-b border-white/10 pb-1">
          <span>"Lucie, další krok"</span>
          <span className="opacity-40">{lang === 'cs' ? 'Posun v procesu' : 'Step forward'}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-1">
          <span>"Karlo, ukaž schéma napětí"</span>
          <span className="opacity-40">{lang === 'cs' ? 'Zobrazení dat' : 'Show data'}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-1">
          <span>"Dášo, identifikuj rostlinu"</span>
          <span className="opacity-40">{lang === 'cs' ? 'AR Vision start' : 'AR Vision start'}</span>
        </div>
        <div className="flex justify-between">
          <span>"Synthesis, SOS"</span>
          <span className="opacity-40">{lang === 'cs' ? 'Nouzová pomoc' : 'Emergency aid'}</span>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
        {lang === 'cs' ? 'AR & Akustická SOS' : 'AR & Acoustic SOS'}
      </h4>
      <div className="p-4 rounded-3xl bg-white border border-black/5 flex gap-4 items-center shadow-sm">
        <Waves className="w-5 h-5 text-blue-500 shrink-0"/>
        <p className="text-[8.5px] text-zinc-500 leading-tight">
          {lang === 'cs' 
            ? 'Nahrajte zvuk motoru či ložiska. Karel provede frekvenční analýzu a identifikuje blížící se mechanickou závadu.' 
            : 'Record engine or bearing sound. Karel performs frequency analysis to identify upcoming mechanical failure.'}
        </p>
      </div>
    </div>
  </div>
);
