import React from 'react';
import { Settings, Activity, BrainCircuit, Microscope, ShieldCheck, Gauge, Key, Cpu, Zap, Sliders, Globe } from 'lucide-react';

interface Props {
  lang: 'cs' | 'en';
  personalityGain: number;
  setPersonalityGain: (v: number) => void;
  aiCadence: number;
  setAiCadence: (v: number) => void;
  isTesting: boolean;
  runSynthesisTest: () => void;
  testStage: string;
}

export const ExpertContent: React.FC<Props> = ({ 
  lang, personalityGain, setPersonalityGain, aiCadence, setAiCadence, isTesting, runSynthesisTest, testStage 
}) => {
  const isCs = lang === 'cs';

  const handleKeySelection = async () => {
    if (typeof (window as any).aistudio?.openSelectKey === 'function') {
      await (window as any).aistudio.openSelectKey();
    } else {
      alert(isCs ? "Správa klíčů je dostupná pouze v prostředí Synthesis Studio." : "Key management is only available in the Synthesis Studio environment.");
    }
  };

  return (
    <div className="space-y-10 max-w-xl mx-auto py-2">
      {/* 🛡️ Kontrola integrity */}
      <section className="p-8 rounded-[3rem] bg-zinc-950 text-white space-y-7 shadow-2xl relative overflow-hidden group border border-white/5">
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-red-500 animate-pulse" />
            <h5 className="font-black text-[12px] uppercase tracking-[0.2em]">{isCs ? 'Kontrola Integrity' : 'Integrity Check'}</h5>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">
            {testStage || 'Nominal'}
          </span>
        </div>
        <button 
          onClick={runSynthesisTest} 
          disabled={isTesting} 
          className="w-full py-6 rounded-[2rem] bg-white text-black text-[14px] font-black uppercase hover:bg-red-500 hover:text-white transition-all relative z-10 shadow-xl active:scale-95 flex items-center justify-center gap-3"
        >
          <ShieldCheck className="w-5 h-5" />
          {isCs ? 'Spustit Synthesis Test' : 'Run Synthesis Test'}
        </button>
        <p className="text-[9px] text-zinc-500 uppercase tracking-tight relative z-10 text-center font-bold opacity-60 leading-relaxed">
          {isCs 
            ? 'Prověřuje logické vazby mezi expertními daty Karla a metodickými postupy Lucie.' 
            : 'Verifies logical connections between Karel\'s expert data and Lucie\'s methodical steps.'}
        </p>
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-red-600/20 transition-all duration-1000" />
      </section>

      {/* 🔑 API & Model Management */}
      <section className="space-y-4">
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
          <Key className="w-3 h-3" /> {isCs ? 'Brána & Výkon' : 'Gateway & Performance'}
        </h4>
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={handleKeySelection}
            className="p-6 rounded-[2.5rem] bg-zinc-50 border border-black/5 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-5">
              <div className="p-3 bg-zinc-900 rounded-2xl text-white group-hover:rotate-12 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h5 className="font-black text-[11px] uppercase text-zinc-900 leading-none">{isCs ? 'Volba API klíče' : 'Select API Key'}</h5>
                <p className="text-[8px] text-zinc-400 uppercase font-bold mt-1 tracking-tighter">
                  {isCs ? 'Osobní klíč z Google AI Studio' : 'Personal key from Google AI Studio'}
                </p>
              </div>
            </div>
            <Zap className="w-5 h-5 text-zinc-200 group-hover:text-amber-500 transition-colors" />
          </button>

          <div className="p-6 rounded-[2.5rem] bg-zinc-50 border border-black/5 flex items-center gap-5">
            <div className="p-3 bg-white rounded-2xl shadow-sm"><BrainCircuit className="w-6 h-6 text-zinc-400" /></div>
            <div className="flex-1">
              <h5 className="font-black text-[11px] uppercase text-zinc-900 leading-none mb-1.5">{isCs ? 'Aktivní Model' : 'Active Model'}</h5>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded-md bg-zinc-900 text-white text-[8px] font-black uppercase">Gemini 3 Pro</span>
                <span className="px-2 py-0.5 rounded-md bg-zinc-200 text-zinc-500 text-[8px] font-black uppercase opacity-50 italic">Veo-3.1 Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧠 Kalibrace a Tuning */}
      <section className="space-y-4">
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
          <Sliders className="w-3 h-3" /> {isCs ? 'Kalibrace & Jádro' : 'Calibration & Core'}
        </h4>
        <div className="p-8 rounded-[3rem] bg-zinc-50 border border-black/5 space-y-8">
          <div className="space-y-5">
            <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500 tracking-widest">
              <span>Personality Gain (Žargon)</span>
              <span className="text-zinc-900">{Math.round(personalityGain * 100)}%</span>
            </div>
            <input type="range" min="0" max="1" step="0.05" value={personalityGain} onChange={(e) => setPersonalityGain(parseFloat(e.target.value))} className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
            <p className="text-[9px] text-zinc-400 uppercase leading-tight italic font-medium">Ladění intenzity odborného žargonu specialistů.</p>
          </div>

          <div className="space-y-5">
            <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500 tracking-widest">
              <span>AI Cadence (Odezva)</span>
              <span className="text-zinc-900">{Math.round(aiCadence * 100)}%</span>
            </div>
            <input type="range" min="0" max="1" step="0.05" value={aiCadence} onChange={(e) => setAiCadence(parseFloat(e.target.value))} className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
            <p className="text-[9px] text-zinc-400 uppercase leading-tight italic font-medium">Hloubka vysvětlování a frekvence dodatečných rad.</p>
          </div>
        </div>
      </section>

      {/* 📂 Regional & Sensor Settings */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 rounded-[2.5rem] bg-white border border-black/5 flex flex-col gap-3 shadow-sm">
          <Microscope className="w-6 h-6 text-zinc-300" />
          <div>
            <h5 className="text-[10px] font-black uppercase text-zinc-900 leading-none mb-1">Vision v2.1</h5>
            <p className="text-[8px] text-zinc-400 uppercase font-bold leading-tight">Kalibrace makro-analýzy.</p>
          </div>
        </div>
        <div className="p-6 rounded-[2.5rem] bg-white border border-black/5 flex flex-col gap-3 shadow-sm">
          <Globe className="w-6 h-6 text-blue-400 opacity-40" />
          <div>
            <h5 className="text-[10px] font-black uppercase text-zinc-900 leading-none mb-1">Region: CZ</h5>
            <p className="text-[8px] text-zinc-400 uppercase font-bold leading-tight">Lokalizace náhradních dílů.</p>
          </div>
        </div>
      </div>

      {/* Footer / Version */}
      <div className="p-6 rounded-[2.5rem] bg-zinc-100 border border-black/5 flex items-center justify-center text-center">
         <p className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.3em]">
           {isCs ? '[v2.32 - FINAL EXPERT DEFINITION] • 2026' : '[v2.32 - FINAL EXPERT DEFINITION] • 2026'}
         </p>
      </div>
    </div>
  );
};
