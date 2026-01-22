import React, { useState } from 'react';
import { HelpCircle, Wrench, BookOpen, Leaf, Hammer, AudioLines, Waves, Mic, Eye, Zap, ShieldAlert, ChevronRight, ArrowLeft, Info, FileText, Activity, Moon, Shield } from 'lucide-react';

interface Props { lang: 'cs' | 'en'; }

type HelpView = 'main' | 'diagnostics' | 'voice' | 'methodology';

export const HelpContent: React.FC<Props> = ({ lang }) => {
  const isCs = lang === 'cs';
  const [view, setView] = useState<HelpView>('main');

  const BackButton = () => (
    <button 
      onClick={() => setView('main')}
      className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400 hover:text-black transition-colors mb-6"
    >
      <ArrowLeft className="w-4 h-4" />
      {isCs ? 'Zpět na nápovědu' : 'Back to Help'}
    </button>
  );

  if (view === 'diagnostics') {
    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
        <BackButton />
        <header className="flex flex-col gap-4 border-l-4 border-blue-500 pl-6 py-2">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600/50">TECH-DEEP-DIVE</span>
          <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">
            {isCs ? 'Jak funguje diagnostika?' : 'How Diagnostics Work?'}
          </h2>
        </header>

        <section className="space-y-8">
          <div className="p-8 rounded-[3rem] bg-white border border-black/5 space-y-4 shadow-sm">
            <div className="flex items-center gap-4 text-blue-600">
              <AudioLines className="w-8 h-8" />
              <h4 className="font-black text-[14px] uppercase tracking-tight">{isCs ? 'Akustická analýza' : 'Acoustic Analysis'}</h4>
            </div>
            <p className="text-[11px] text-zinc-600 font-medium leading-relaxed">
              {isCs 
                ? 'Karel využívá Fast Fourier Transform (FFT) k analýze zvukového spektra vašeho stroje. Po nahrání krátkého vzorku (5-10s) systém porovná frekvenční špičky s databází známých závad ložisek, opotřebení uhlíků nebo nevyvážených hřídelí.' 
                : 'Karel uses Fast Fourier Transform (FFT) to analyze your machines sound spectrum. After recording a 5-10s sample, the system compares frequency peaks with a database of known bearing or shaft faults.'}
            </p>
          </div>

          <div className="p-8 rounded-[3rem] bg-zinc-950 text-white space-y-4 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-4 text-emerald-400 relative z-10">
              <Eye className="w-8 h-8" />
              <h4 className="font-black text-[14px] uppercase tracking-tight">{isCs ? 'Vision AR Scan' : 'Vision AR Scan'}</h4>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium leading-relaxed relative z-10">
              {isCs 
                ? 'Náš vizuální procesor v reálném čase identifikuje komponenty na PCB deskách. Algoritmus detekuje nafouklé elektrolytické kondenzátory, známky oxidace nebo vypálené cesty. Na displeji se následně vykreslí AR vrstva s označením kritických bodů.' 
                : 'Our visual processor identifies components on PCB boards in real-time. The algorithm detects swollen capacitors, oxidation, or burnt traces, rendering an AR layer with critical markers.'}
            </p>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px]" />
          </div>
        </section>
      </div>
    );
  }

  if (view === 'voice') {
    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
        <BackButton />
        <header className="flex flex-col gap-4 border-l-4 border-blue-500 pl-6 py-2">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600/50">VOCAL-LINK-PROTOCOLS</span>
          <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">
            {isCs ? 'Hlasové protokoly' : 'Voice Protocols'}
          </h2>
        </header>

        <section className="space-y-4">
          <div className="p-6 rounded-[2.5rem] bg-zinc-50 border border-black/5">
             <h5 className="text-[10px] font-black uppercase text-zinc-400 mb-4 tracking-widest">{isCs ? 'Aktivní příkazy' : 'Active Commands'}</h5>
             <div className="space-y-4">
               {[
                 { c: '"Lucie, další krok"', d: isCs ? "Potvrdí splnění úkolu a Lucie přečte instrukce pro další fázi opravy." : "Confirms task completion and Lucie reads next stage instructions." },
                 { c: '"Karlo, schéma PCB"', d: isCs ? "Vykreslí technické schéma aktuálně detekované součástky." : "Draws technical schematics for the currently detected component." },
                 { c: '"Dášo, stav půdy"', d: isCs ? "Aktivuje analýzu vlhkosti a PH z obrazu kamery (vyžaduje kalibraci barev)." : "Activates soil moisture and pH analysis via camera (color calibration required)." },
                 { c: '"Synthesis, SOS"', d: isCs ? "Nouzový protokol. Vypne všechny vedlejší procesy a vyhledá nejbliší první pomoc nebo havarijní kontakt." : "Emergency protocol. Shuts down side processes and finds nearest first aid or emergency contact." }
               ].map((cmd, i) => (
                 <div key={i} className="flex flex-col gap-1 border-b border-black/5 pb-3 last:border-0">
                   <span className="text-[12px] font-black text-blue-600 font-mono tracking-tight">{cmd.c}</span>
                   <span className="text-[9px] text-zinc-500 uppercase font-bold">{cmd.d}</span>
                 </div>
               ))}
             </div>
          </div>
        </section>
      </div>
    );
  }

  if (view === 'methodology') {
    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
        <BackButton />
        <header className="flex flex-col gap-4 border-l-4 border-blue-500 pl-6 py-2">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600/50">SYNTHESIS-METHODOLOGY</span>
          <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">
            {isCs ? 'Metodika specialistů' : 'Specialist Methodology'}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {/* LUCIE */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
              <BookOpen className="w-3 h-3" /> {isCs ? 'Lucie: Step-Lock Logic' : 'Lucie: Step-Lock Logic'}
            </h4>
            <div className="p-6 rounded-[2.5rem] bg-amber-50 border border-amber-100 space-y-3 shadow-sm">
              <p className="text-[11px] text-amber-900 font-bold uppercase leading-tight italic">Mentor & Metodik</p>
              <p className="text-[11px] text-zinc-600 font-medium leading-relaxed">
                {isCs 
                  ? 'Lucie využívá systém Step-Lock. Ten nenechá uživatele přejít k dalšímu bodu, dokud neproběhne vizuální validace nebo hlasové potvrzení. Tím eliminujeme 98 % fatálních chyb při zpětné montáži jemné mechaniky.' 
                  : 'Lucie uses the Step-Lock system. It prevents moving to the next point without visual validation or voice confirmation, eliminating 98% of fatal assembly errors.'}
              </p>
            </div>
          </div>

          {/* KAREL */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
              <Wrench className="w-3 h-3" /> {isCs ? 'Karel: Expert Mode' : 'Karel: Expert Mode'}
            </h4>
            <div className="p-6 rounded-[2.5rem] bg-blue-50 border border-blue-100 space-y-3 shadow-sm">
              <p className="text-[11px] text-blue-900 font-bold uppercase leading-tight italic">Hardware God & Diagnostik</p>
              <p className="text-[11px] text-zinc-600 font-medium leading-relaxed">
                {isCs 
                  ? 'Karel pracuje v režimu přímého toku dat. Neřeší metodiku, ale čisté parametry. Pokud detekuje nesrovnalost v měření (např. zkrat), automaticky přebírá kontrolu nad HUD displejem a zvýrazní nebezpečnou oblast.' 
                  : 'Karel works in raw data flow mode. He doesn\'t deal with methodology, just pure parameters. If he detects a measurement anomaly (e.g. short circuit), he automatically takes over HUD control.'}
              </p>
            </div>
          </div>

          {/* DÁŠA */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
              <Leaf className="w-3 h-3" /> {isCs ? 'Dáša: Organic & Lunar Sync' : 'Dáša: Organic & Lunar Sync'}
            </h4>
            <div className="p-6 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 space-y-3 shadow-sm">
              <p className="text-[11px] text-emerald-900 font-bold uppercase leading-tight italic">Organic Specialist</p>
              <p className="text-[11px] text-zinc-600 font-medium leading-relaxed">
                {isCs 
                  ? 'Dášina metodika je založena na biodynamických principech. Synchronizuje doporučení s aktuální fází měsíce (Lunární Tracker) a upřednostňuje biologickou rovnováhu před chemií. Její Vision modul analyzuje spektrum listů pro včasnou detekci nutričních deficitů.' 
                  : 'Dasha\'s methodology is based on biodynamic principles. It synchronizes recommendations with the current moon phase (Lunar Tracker) and prioritizes biological balance over chemicals. Her Vision module analyzes leaf spectrum for early detection of nutritional deficits.'}
              </p>
            </div>
          </div>

          {/* FRANTIŠEK */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
              <Hammer className="w-3 h-3" /> {isCs ? 'František: Force-Safety Protocol' : 'František: Force-Safety Protocol'}
            </h4>
            <div className="p-6 rounded-[2.5rem] bg-orange-50 border border-orange-100 space-y-3 shadow-sm">
              <p className="text-[11px] text-orange-900 font-bold uppercase leading-tight italic">Master of Force</p>
              <p className="text-[11px] text-zinc-600 font-medium leading-relaxed">
                {isCs 
                  ? 'František prosazuje protokol "Bezpečnostní hrubé síly". Každý úkon vyžadující demolici nebo těžkou manipulaci začíná kontrolou OOPP (osobní ochranné pracovní pomůcky). Jeho algoritmy vypočítávají strukturní integritu, aby se předešlo neřízenému zhroucení při bouracích pracích.' 
                  : 'František promotes the "Safety Brute Force" protocol. Every task requiring demolition or heavy manipulation begins with a PPE check. His algorithms calculate structural integrity to prevent uncontrolled collapse during demolition work.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-xl mx-auto py-2 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex flex-col gap-4 border-l-4 border-blue-500 pl-6 py-2">
        <div className="flex items-center gap-3 text-blue-600">
          <HelpCircle className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-70">
            {isCs ? 'CENTRUM NÁPOVĚDY' : 'HELP CENTER'}
          </span>
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">
          {isCs ? 'Jak ovládnout Studio Synthesis' : 'Mastering Studio Synthesis'}
        </h2>
      </header>

      {/* Navigation Grid */}
      <div className="grid grid-cols-1 gap-4">
        <button 
          onClick={() => setView('diagnostics')}
          className="p-7 rounded-[3rem] bg-white border border-black/5 flex items-center justify-between group hover:shadow-xl hover:border-blue-200 transition-all text-left"
        >
          <div className="flex items-center gap-6">
            <div className="p-3.5 bg-blue-50 rounded-2xl text-blue-600 group-hover:rotate-12 transition-transform"><Activity className="w-8 h-8" /></div>
            <div>
              <h4 className="font-black text-[13px] uppercase tracking-tight text-zinc-900 leading-none">{isCs ? 'Jak funguje diagnostika?' : 'How diagnostics work?'}</h4>
              <p className="text-[9px] text-zinc-400 uppercase font-bold mt-2 tracking-tighter">{isCs ? 'Frekvenční analýza & Vision AR.' : 'Frequency analysis & Vision AR.'}</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-zinc-200 group-hover:text-blue-600 transition-colors" />
        </button>

        <button 
          onClick={() => setView('voice')}
          className="p-7 rounded-[3rem] bg-white border border-black/5 flex items-center justify-between group hover:shadow-xl hover:border-zinc-300 transition-all text-left"
        >
          <div className="flex items-center gap-6">
            <div className="p-3.5 bg-zinc-950 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform"><Mic className="w-8 h-8" /></div>
            <div>
              <h4 className="font-black text-[13px] uppercase tracking-tight text-zinc-900 leading-none">{isCs ? 'Hlasové protokoly' : 'Voice Protocols'}</h4>
              <p className="text-[9px] text-zinc-400 uppercase font-bold mt-2 tracking-tighter">{isCs ? 'Kompletní seznam hands-free povelů.' : 'Full list of hands-free commands.'}</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-zinc-200 group-hover:text-black transition-colors" />
        </button>

        <button 
          onClick={() => setView('methodology')}
          className="p-7 rounded-[3rem] bg-white border border-black/5 flex items-center justify-between group hover:shadow-xl hover:border-amber-200 transition-all text-left"
        >
          <div className="flex items-center gap-6">
            <div className="p-3.5 bg-amber-50 rounded-2xl text-amber-600 group-hover:rotate-6 transition-transform"><FileText className="w-8 h-8" /></div>
            <div>
              <h4 className="font-black text-[13px] uppercase tracking-tight text-zinc-900 leading-none">{isCs ? 'Metodika specialistů' : 'Specialist Methodology'}</h4>
              <p className="text-[9px] text-zinc-400 uppercase font-bold mt-2 tracking-tighter">{isCs ? 'Step-Lock proces & Expert mode.' : 'Step-Lock process & Expert mode.'}</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-zinc-200 group-hover:text-amber-600 transition-colors" />
        </button>
      </div>

      {/* Quick Team Reference */}
      <section className="space-y-4 pt-4">
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2 px-2">
          <Zap className="w-3 h-3" /> {isCs ? 'Rychlý přehled rolí' : 'Quick Role Reference'}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-[2rem] bg-blue-50 border border-blue-100 flex flex-col gap-2">
            <span className="font-black text-[10px] uppercase text-blue-900">KAREL</span>
            <span className="text-[8px] text-blue-800/60 uppercase font-bold leading-tight">Hard-tech, PCB, Schémata, Měření.</span>
          </div>
          <div className="p-4 rounded-[2rem] bg-amber-50 border border-amber-100 flex flex-col gap-2">
            <span className="font-black text-[10px] uppercase text-amber-900">LUCIE</span>
            <span className="text-[8px] text-amber-800/60 uppercase font-bold leading-tight">Manuály, Postupy, Nářadí, Step-Lock.</span>
          </div>
          <div className="p-4 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex flex-col gap-2">
            <span className="font-black text-[10px] uppercase text-emerald-900">DÁŠA</span>
            <span className="text-[8px] text-emerald-800/60 uppercase font-bold leading-tight">Zahrada, Bio, Lunární cykly.</span>
          </div>
          <div className="p-4 rounded-[2rem] bg-orange-50 border border-orange-100 flex flex-col gap-2">
            <span className="font-black text-[10px] uppercase text-orange-900">FRANTIŠEK</span>
            <span className="text-[8px] text-orange-800/60 uppercase font-bold leading-tight">Stavba, Síla, Dřevo, Bezpečnost.</span>
          </div>
        </div>
      </section>

      {/* Footer / Version */}
      <div className="p-6 rounded-[2.5rem] bg-zinc-100 border border-black/5 flex items-center justify-center text-center">
         <p className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.3em]">
           {isCs ? '[v2.35 - METHODOLOGY EXPANSION] • 2026' : '[v2.35 - METHODOLOGY EXPANSION] • 2026'}
         </p>
      </div>
    </div>
  );
};