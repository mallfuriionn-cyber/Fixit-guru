
import React from 'react';
import { Beaker, Ear, Eye, Navigation } from 'lucide-react';

interface Props { lang: 'cs' | 'en'; }

export const FeedbackContent: React.FC<Props> = ({ lang }) => (
  <div className="space-y-6 max-w-xl mx-auto py-1">
    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-900/60 mb-2">
      {lang === 'cs' ? 'Budoucí Funkce (Innovation Backlog)' : 'Future Functions (Innovation Backlog)'}
    </h4>
    <div className="p-6 rounded-[2.5rem] bg-purple-50 border border-purple-100 flex gap-6 items-center shadow-sm hover:scale-[1.02] transition-transform group">
      <Ear className="w-8 h-8 text-purple-600 shrink-0 animate-pulse"/>
      <div>
        <h5 className="font-black text-[11px] uppercase text-purple-900 leading-none mb-1.5">Smell Detection v3.0</h5>
        <p className="text-[9px] text-purple-800/60 uppercase leading-tight">
          {lang === 'cs' 
            ? 'Rozpoznávání pachů spálených součástek přes externí senzory a upozornění na nebezpečí.' 
            : 'Recognizing burnt component smells via external sensors and danger alerts.'}
        </p>
      </div>
    </div>
    <div className="p-6 rounded-[2.5rem] bg-zinc-50 border border-black/5 flex gap-6 items-center shadow-sm hover:bg-white transition-all group">
      <Eye className="w-8 h-8 text-zinc-400 shrink-0 group-hover:text-blue-500"/>
      <div>
        <h5 className="font-black text-[11px] uppercase text-zinc-900 leading-none mb-1.5">AR Vision Glasses</h5>
        <p className="text-[9px] text-zinc-400 uppercase leading-tight">
          {lang === 'cs' 
            ? 'Přímé promítání schémat do brýlí. Uvidíte napětí přímo na vodičích v reálném světě.' 
            : 'Direct schematic projection. See voltage directly on wires in the real world.'}
        </p>
      </div>
    </div>
    <div className="p-6 rounded-[2.5rem] bg-white border border-black/5 flex gap-6 items-center shadow-sm">
      <Navigation className="w-8 h-8 text-purple-400 shrink-0"/>
      <div className="flex-1">
        <h5 className="font-black text-[11px] uppercase text-zinc-900 leading-none mb-1.5">
          {lang === 'cs' ? 'Kniha Přání' : 'Wishlist'}
        </h5>
        <p className="text-[9px] text-zinc-400 uppercase leading-tight">
          {lang === 'cs' ? 'Zde zapisujeme vaše požadavky na nové specialisty. Synthesis v2.24 naslouchá.' : 'We record your requests for new specialists here. Synthesis v2.24 is listening.'}
        </p>
      </div>
    </div>
  </div>
);
