
import React from 'react';
import { Monitor, Sun, Moon, Zap, Palette, Type, MousePointer2, Layout, Sliders, Activity } from 'lucide-react';
import { DisplayMode, BgPattern, UITheme } from '../types';

interface Props {
  lang: 'cs' | 'en';
  displayMode: DisplayMode;
  setDisplayMode: (m: DisplayMode) => void;
  bgPattern: BgPattern;
  setBgPattern: (p: BgPattern) => void;
  accentColor: string;
  setAccentColor: (c: string) => void;
  hudTransparency: number;
  setHudTransparency: (v: number) => void;
  isBoldMode: boolean;
  setIsBoldMode: (v: boolean) => void;
  fontScale: number;
  setFontScale: (v: number) => void;
  activeTheme: UITheme;
  setActiveTheme: (v: UITheme) => void;
}

export const AppearanceContent: React.FC<Props> = (props) => {
  const isCs = props.lang === 'cs';

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col gap-2 border-l-4 border-zinc-900 pl-6 py-2">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">TECHNICAL PROFILE</span>
        <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">{isCs ? 'Vizuální parametry' : 'Visual Parameters'}</h2>
      </header>

      {/* 1. Terminal Modes */}
      <section className="space-y-5">
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
          <Monitor className="w-3 h-3" /> {isCs ? '1. Režim terminálu' : '1. Terminal Mode'}
        </h4>
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-[2rem] bg-zinc-100">
          {(['light', 'dark', 'amoled'] as DisplayMode[]).map(m => (
            <button 
              key={m} 
              onClick={() => props.setDisplayMode(m)} 
              className={`py-4 rounded-2xl text-[10px] font-black uppercase transition-all ${props.displayMode === m ? 'bg-white shadow-xl text-black' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      {/* 2. HUD Calibration */}
      <section className="space-y-5">
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
          <Sliders className="w-3 h-3" /> {isCs ? '2. Kalibrace HUDu' : '2. HUD Calibration'}
        </h4>
        <div className="p-8 rounded-[3rem] bg-zinc-50 border border-black/5 space-y-8">
           <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <span>HUD Transparency</span>
                <span className="text-zinc-900">{Math.round(props.hudTransparency * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0.3" 
                max="1.0" 
                step="0.01" 
                value={props.hudTransparency} 
                onChange={e => props.setHudTransparency(parseFloat(e.target.value))} 
                className="w-full accent-black h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer" 
              />
           </div>

           <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <span>Font Scale</span>
                <span className="text-zinc-900">{props.fontScale}%</span>
              </div>
              <input 
                type="range" 
                min="80" 
                max="150" 
                step="5" 
                value={props.fontScale} 
                onChange={e => props.setFontScale(parseInt(e.target.value))} 
                className="w-full accent-black h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer" 
              />
           </div>

           <div className="flex items-center justify-between pt-4 border-t border-black/5">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase">{isCs ? 'Vysoký kontrast' : 'High Contrast'}</span>
                <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mt-1">Bold Interface</span>
              </div>
              <button 
                onClick={() => props.setIsBoldMode(!props.isBoldMode)} 
                className={`w-12 h-6 rounded-full transition-all relative ${props.isBoldMode ? 'bg-zinc-950' : 'bg-zinc-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${props.isBoldMode ? 'left-7' : 'left-1'}`} />
              </button>
           </div>
        </div>
      </section>

      {/* 3. Neural Patterns */}
      <section className="space-y-5">
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
          <Activity className="w-3 h-3" /> {isCs ? '3. Vizuální matrice' : '3. Neural Matrix'}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {(['studio', 'blueprint', 'topographic', 'neural'] as BgPattern[]).map(p => (
            <button 
              key={p} 
              onClick={() => props.setBgPattern(p)}
              className={`p-6 rounded-[2rem] border transition-all text-left group ${props.bgPattern === p ? 'bg-zinc-950 text-white shadow-2xl border-zinc-900' : 'bg-white border-black/5 text-zinc-400'}`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.1em]">{p}</span>
                <Zap className={`w-4 h-4 transition-colors ${props.bgPattern === p ? 'text-blue-400' : 'text-zinc-100 group-hover:text-zinc-300'}`} />
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="pt-10 flex justify-center border-t border-black/5">
        <p className="text-[8px] text-zinc-300 font-black uppercase tracking-[0.5em] text-center max-w-xs">
          {isCs ? 'Všechny změny jsou okamžitě aplikovány na Neural Core v2.40.' : 'All changes are instantly applied to Neural Core v2.40.'}
        </p>
      </div>
    </div>
  );
};
