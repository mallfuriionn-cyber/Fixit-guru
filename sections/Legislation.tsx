
import React, { useState } from 'react';
import { 
  Gavel, Scale, AlertTriangle, FileText, Clock, ShieldAlert, 
  ChevronRight, Zap, FileSignature, ShieldCheck, Globe, 
  MapPin, ScrollText, BadgeCheck, ArrowLeft, BookOpen, 
  ShieldX, Terminal, Info
} from 'lucide-react';

interface Props { 
  lang: 'cs' | 'en'; 
  onOpenLegal?: () => void;
}

type LegalSubView = 'main' | 'eu' | 'cz' | 'tos';

export const LegislationContent: React.FC<Props> = ({ lang, onOpenLegal }) => {
  const isCs = lang === 'cs';
  const [view, setView] = useState<LegalSubView>('main');

  const BackButton = () => (
    <button 
      onClick={() => setView('main')}
      className="flex items-center gap-2 text-[10px] font-black uppercase text-red-500 hover:text-white transition-all mb-6 group"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      {isCs ? 'Zpět do knihovny' : 'Back to Library'}
    </button>
  );

  if (view === 'eu') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
        <BackButton />
        <header className="flex flex-col gap-4 border-l-4 border-blue-500 pl-6 py-2">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500/50">EUROPEAN-CORE-V2</span>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">EU: Právo na opravu</h2>
        </header>
        <div className="grid grid-cols-1 gap-4">
           {[
             { t: "Směrnice o ekodesignu", d: "Výrobci jsou povinni zajistit dostupnost náhradních dílů (displeje, baterie, klávesnice) po dobu 5-10 let." },
             { t: "Cirkulární ekonomika", d: "Zákaz softwarového párování dílů, které znemožňuje opravu neautorizovaným servisům." },
             { t: "Standard USB-C", d: "Sjednocení nabíjecích rozhraní pro snížení elektroodpadu v celé EU." }
           ].map((p, i) => (
             <div key={i} className="p-6 rounded-[2.2rem] bg-white/5 border border-white/10 space-y-2">
                <h5 className="text-[12px] font-black text-blue-400 uppercase tracking-tight">{p.t}</h5>
                <p className="text-[10px] text-zinc-400 font-bold uppercase leading-relaxed">{p.d}</p>
             </div>
           ))}
        </div>
      </div>
    );
  }

  if (view === 'cz') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
        <BackButton />
        <header className="flex flex-col gap-4 border-l-4 border-emerald-500 pl-6 py-2">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500/50">CZECH-COMPLIANCE</span>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">CZ: Zákonná Ochrana</h2>
        </header>
        <div className="grid grid-cols-1 gap-4">
           {[
             { t: "§ 2161 NOZ (Jakost)", d: "Věc musí být bez vad při převzetí. Prvních 12 měsíců se má za to, že vada existovala již při převzetí." },
             { t: "§ 19 Zákona o ochraně spotřebitele", d: "Lhůta 30 dnů na vyřízení reklamace. Při nedodržení vzniká právo na odstoupení od smlouvy." },
             { t: "Mimosoudní řešení (ADR)", d: "Česká obchodní inspekce jako prostředník pro řešení sporů s prodejci." }
           ].map((p, i) => (
             <div key={i} className="p-6 rounded-[2.2rem] bg-white/5 border border-white/10 space-y-2">
                <h5 className="text-[12px] font-black text-emerald-400 uppercase tracking-tight">{p.t}</h5>
                <p className="text-[10px] text-zinc-400 font-bold uppercase leading-relaxed">{p.d}</p>
             </div>
           ))}
        </div>
      </div>
    );
  }

  if (view === 'tos') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
        <BackButton />
        <header className="flex flex-col gap-4 border-l-4 border-zinc-500 pl-6 py-2">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500/50">TERMS-OF-SERVICE-V2.61</span>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Podmínky Služby</h2>
        </header>
        <div className="space-y-4 font-mono text-[9px] text-zinc-400 uppercase leading-relaxed p-8 bg-zinc-950 rounded-[3rem] border border-white/5 shadow-2xl">
           <div className="p-6 border-b border-white/10 space-y-2">
              <span className="text-white font-black">1. ROZSAH SLUŽEB</span>
              <p>FixIt Guru je expertní poradenský systém. Studio Synthesis poskytuje pouze technické a legislativní informace. Nejsme certifikovaný servisní subjekt.</p>
           </div>
           <div className="p-6 border-b border-white/10 space-y-2">
              <span className="text-white font-black">2. VYLOUČENÍ ODPOVĚDNOSTI</span>
              <p>Veškeré opravy provádíte na vlastní nebezpečí. Studio Synthesis neručí za ztrátu záruky, poškození majetku, úraz elektrickým proudem ani fatální chyby při montáži.</p>
           </div>
           <div className="p-6 border-b border-white/10 space-y-2">
              <span className="text-white font-black">3. BEZPEČNOSTNÍ PROTOKOL</span>
              <p>Uživatel je povinen dodržovat ESD ochranu, používat dielektrické nářadí a nikdy nepracovat na zařízení pod napětím 230V bez odborné asistence.</p>
           </div>
           <div className="p-6 space-y-2">
              <span className="text-white font-black">4. OCHRANA KNOW-HOW</span>
              <p>Diagnostické postupy a unikátní instrukce Lucie a Karla jsou duševním vlastnictvím Studio Synthesis. Jakékoliv komerční zneužití je zakázáno.</p>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto py-2 animate-in fade-in duration-500">
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-3 text-red-500">
          <Scale className="w-6 h-6" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-70">
            {isCs ? 'COMPLIANCE CORE v2.61' : 'COMPLIANCE CORE v2.61'}
          </h4>
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter text-white leading-none">
          {isCs ? 'Právo na opravu & Ochrana' : 'Right to Repair & Protection'}
        </h2>
        <p className="text-[12px] text-zinc-500 font-medium leading-relaxed italic">
          {isCs 
            ? '„Váš digitální štít proti plánovanému zastarávání a nekalým praktikám prodejců.“'
            : '"Your digital shield against planned obsolescence and unfair merchant practices."'}
        </p>
      </div>

      {/* EMERGENCY ACTION - V2.61 REDESIGN (DARK TECH) */}
      <div className="p-px rounded-[2.5rem] bg-gradient-to-b from-red-500/40 to-transparent shadow-2xl overflow-hidden group">
        <button 
          onClick={onOpenLegal}
          className="w-full p-8 rounded-[2.5rem] bg-zinc-950 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-red-950/40 transition-all duration-500 text-left relative overflow-hidden"
        >
          <div className="flex items-center gap-6 relative z-10">
            <div className="p-4 bg-red-500/10 text-red-500 rounded-3xl border border-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-all shadow-inner">
              <ShieldAlert className="w-8 h-8 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h5 className="font-black text-xl md:text-2xl uppercase tracking-tighter text-white">{isCs ? 'Cítím se podveden' : 'I feel cheated'}</h5>
              <p className="text-[10px] text-red-500/70 uppercase font-black tracking-widest">
                {isCs ? 'Spustit krizový protokol Legal Guardian' : 'Launch emergency Legal Guardian protocol'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-8 h-8 text-white/10 group-hover:text-white group-hover:translate-x-2 transition-all relative z-10" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[40px] group-hover:bg-red-500/10 transition-all" />
        </button>
      </div>

      <div className="space-y-4 pt-4">
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-600 pl-2">
          {isCs ? 'Právní Knihovna Synthesis' : 'Synthesis Legal Library'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => setView('eu')}
            className="p-8 rounded-[3rem] bg-white/5 border border-white/5 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all text-left flex flex-col gap-4 group"
          >
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl w-fit group-hover:scale-110 transition-transform">
               <Globe className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-[14px] font-black uppercase text-white tracking-tight leading-none">{isCs ? 'EU Legislativa' : 'EU Legislation'}</h5>
              <p className="text-[9px] text-zinc-500 uppercase font-bold mt-2 tracking-widest">Right to Repair (R2R)</p>
            </div>
          </button>

          <button 
            onClick={() => setView('cz')}
            className="p-8 rounded-[3rem] bg-white/5 border border-white/5 hover:bg-emerald-600/10 hover:border-emerald-500/30 transition-all text-left flex flex-col gap-4 group"
          >
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl w-fit group-hover:scale-110 transition-transform">
               <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-[14px] font-black uppercase text-white tracking-tight leading-none">{isCs ? 'CZ Legislativa' : 'CZ Legislation'}</h5>
              <p className="text-[9px] text-zinc-500 uppercase font-bold mt-2 tracking-widest">NOZ & Ochrana spotřebitele</p>
            </div>
          </button>

          <button 
            onClick={() => setView('tos')}
            className="col-span-1 md:col-span-2 p-8 rounded-[3rem] bg-white/5 border border-white/5 hover:bg-zinc-100/10 hover:border-white/30 transition-all text-left flex items-center justify-between group"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/5 text-white rounded-2xl group-hover:rotate-6 transition-transform">
                <ScrollText className="w-7 h-7" />
              </div>
              <div>
                <h5 className="text-[16px] font-black uppercase text-white tracking-tighter leading-none">{isCs ? 'Podmínky Služby' : 'Terms of Service'}</h5>
                <p className="text-[9px] text-zinc-500 uppercase font-bold mt-2 tracking-widest">Synthesis Protocol v2.61</p>
              </div>
            </div>
            <BadgeCheck className="w-8 h-8 text-white/20 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4">
         <p className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.5em]">
           STUDIO SYNTHESIS | LEGAL FRAMEWORK v2.61
         </p>
         <div className="p-5 bg-white/5 rounded-[2rem] border border-white/5 text-[9px] text-zinc-500 font-bold uppercase text-center max-w-md italic leading-relaxed">
            Upozornění: Reklamační asistent poskytuje technické a legislativní podklady. Nenahrazuje právní zastoupení.
         </div>
      </div>
    </div>
  );
};
