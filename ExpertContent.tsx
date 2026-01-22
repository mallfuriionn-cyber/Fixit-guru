
import React from 'react';
import { Settings, Activity, BrainCircuit, Microscope } from 'lucide-react';

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
}) => (
  <div className="space-y-6 max-w-xl mx-auto py-1">
    <div className="p-7 rounded-[3rem] bg-zinc-950 text-white space-y-6 shadow-2xl relative overflow-hidden group">
      <div className="flex justify-between items-center relative z-10">
        <Activity className="w-8 h-8 text-red-500 animate-pulse" />
        <span className="text-[12px] font-mono text-zinc-500 uppercase tracking-widest">
          Core Status: {testStage || 'Nominal'}
        </span>
      </div>
      <button onClick={runSynthesisTest} disabled={isTesting} className="w-full py-5 rounded-[2rem] bg-white text-black text-[13px] font-black uppercase hover:bg-red-500 hover:text-white transition-all relative z-10 shadow-lg active:scale-95">
        {lang === 'cs' ? 'Spustit Synthesis Integrity Test' : 'Run Synthesis Integrity Test'}
      </button>
      <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/5 blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-red-600/10 transition-colors" />
    </div>
    
    <div className="p-7 rounded-[3rem] bg-zinc-50 border border-black/5 space-y-7">
      <div className="space-y-5">
        <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500">
          <span>Personality Gain (Odbornost)</span>
          <span>{Math.round(personalityGain * 100)}%</span>
        </div>
        <input type="range" min="0" max="1" step="0.05" value={personalityGain} onChange={(e) => setPersonalityGain(parseFloat(e.target.value))} className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
        <p className="text-[8.5px] text-zinc-400 uppercase leading-tight italic">
          {lang === 'cs' ? 'Ladění intenzity odborného žargonu specialistů.' : 'Tuning the intensity of specialist technical jargon.'}
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500">
          <span>AI Cadence (Kecavost)</span>
          <span>{Math.round(aiCadence * 100)}%</span>
        </div>
        <input type="range" min="0" max="1" step="0.05" value={aiCadence} onChange={(e) => setAiCadence(parseFloat(e.target.value))} className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
        <p className="text-[8.5px] text-zinc-400 uppercase leading-tight italic">
          {lang === 'cs' ? 'Hloubka vysvětlování a počet rad mimo hlavní kontext.' : 'Depth of explanation and secondary advice frequency.'}
        </p>
      </div>
    </div>
    
    <div className="p-6 rounded-[2.5rem] bg-white border border-black/5 flex items-center gap-6 shadow-sm">
      <Microscope className="w-7 h-7 text-zinc-400 shrink-0" />
      <div>
        <h5 className="text-[10px] font-black uppercase text-zinc-500 leading-none mb-1.5">Sensor Calibration v2.24</h5>
        <p className="text-[8.5px] text-zinc-400 uppercase leading-none">
          {lang === 'cs' ? 'Senzitivita optických a akustických senzorů synchronizována.' : 'Optical and acoustic sensor sensitivity synchronized.'}
        </p>
      </div>
    </div>
  </div>
);
