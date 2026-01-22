
import React from 'react';
import { Monitor, Sun, Moon, Zap, Palette, Type, Scan, MousePointer2, Layout, Boxes, Grid3X3, Waves, Share2 } from 'lucide-react';

interface Props {
  lang: 'cs' | 'en';
  displayMode: 'light' | 'dark' | 'amoled';
  setDisplayMode: (m: 'light' | 'dark' | 'amoled') => void;
  bgPattern: 'studio' | 'blueprint' | 'topographic' | 'neural';
  setBgPattern: (p: 'studio' | 'blueprint' | 'topographic' | 'neural') => void;
  accentColor: string;
  setAccentColor: (c: string) => void;
  hudTransparency: number;
  setHudTransparency: (v: number) => void;
  isBoldMode: boolean;
  setIsBoldMode: (v: boolean) => void;
  fontScale: number;
  setFontScale: (v: number) => void;
  ambientGlow: number;
  setAmbientGlow: (v: number) => void;
  isPulseMode: boolean;
  setIsPulseMode: (v: boolean) => void;
  isContrastBooster: boolean;
  setIsContrastBooster: (v: boolean) => void;
  markerSize: number;
  setMarkerSize: (v: number) => void;
  traceColor: string;
  setTraceColor: (c: string) => void;
}

export const AppearanceContent: React.FC<Props> = ({ 
  lang, displayMode, setDisplayMode, bgPattern, setBgPattern,
  accentColor, setAccentColor, hudTransparency, setHudTransparency,
  isBoldMode, setIsBoldMode, fontScale, setFontScale,
  ambientGlow, setAmbientGlow, isPulseMode, setIsPulseMode,
  isContrastBooster, setIsContrastBooster, markerSize, setMarkerSize,
  traceColor, setTraceColor
}) => {
  const isCs = lang === 'cs';

  const specialists = [
    { id: 'karel', name: 'Karel', color: '#2563eb', desc: isCs ? 'Technická modrá' : 'Technical Blue' },
    { id: 'lucie', name: 'Lucie', color: '#d97706', desc: isCs ? 'Metodická okrová' : 'Methodical Amber' },
    { id: 'dasa', name: 'Dáša', color: '#059669', desc: isCs ? 'Organická zelená' : 'Organic Green' },
    { id: 'frantisek', name: 'František', color: '#ea580c', desc: isCs ? 'Cihlová dílna' : 'Brick Workshop' },
  ];

  const patterns = [
    { id: 'studio', name: 'Studio', icon: Boxes },
    { id: 'blueprint', name: 'Blueprint', icon: Grid3X3 },
    { id: 'topographic', name: 'Topo', icon: Waves },
    { id: 'neural', name: 'Neural', icon: Share2 },
  ];

  return (
    <div className="space-y-12 max-w-xl mx-auto py-2 pb-20 animate-in fade-in duration-500">
      
      {/* 1. Display Mode Selection */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Monitor className="w-4 h-4 opacity-40" />
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
            {isCs ? '1. Režim zobrazení' : '1. Display Mode'}
          </h4>
        </div>
        <div className="grid grid-cols-3 gap-3 p-1.5 rounded-[2.5rem] bg-zinc-100/50 backdrop-blur-md border border-black/[0.03]">
          {[
            { id: 'light', name: 'Light', icon: Sun },
            { id: 'dark', name: 'Dark', icon: Moon },
            { id: 'amoled', name: 'Amoled', icon: Zap },
          ].map((mode) => (
            <button 
              key={mode.id}
              onClick={() => setDisplayMode(mode.id as any)}
              className={`flex items-center justify-center gap-3 py-4 rounded-[2rem] transition-all font-black uppercase text-[10px] tracking-widest ${displayMode === mode.id ? 'bg-white shadow-xl scale-[1.02] text-black' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
              <mode.icon className="w-4 h-4" />
              {mode.name}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Background Matrix */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Layout className="w-4 h-4 opacity-40" />
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
            {isCs ? '2. Background Matrix (Patterny)' : '2. Background Matrix (Patterns)'}
          </h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {patterns.map((p) => (
            <button 
              key={p.id}
              onClick={() => setBgPattern(p.id as any)}
              className={`flex flex-col items-center gap-3 p-5 rounded-[2.2rem] border transition-all ${bgPattern === p.id ? 'bg-white shadow-xl border-black/5 scale-105' : 'bg-zinc-50 border-transparent opacity-60 hover:opacity-100'}`}
            >
              <div className={`p-3 rounded-2xl ${bgPattern === p.id ? 'bg-black text-white' : 'bg-zinc-200 text-zinc-400'}`}>
                <p.icon className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest">{p.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Specialist Accent Color */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Palette className="w-4 h-4 opacity-40" />
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
            {isCs ? '3. Barevné téma specialistů' : '3. Specialist Accent Color'}
          </h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {specialists.map((spec) => (
            <button 
              key={spec.id} 
              onClick={() => { setAccentColor(spec.color); setTraceColor(spec.color); }}
              className={`flex flex-col items-center gap-3 p-4 rounded-[2.2rem] border transition-all ${accentColor === spec.color ? 'bg-white shadow-xl border-black/5 scale-105' : 'bg-zinc-50 border-transparent opacity-60 hover:opacity-100'}`}
            >
              <div className="w-10 h-10 rounded-full shadow-inner" style={{ backgroundColor: spec.color }} />
              <div className="text-center">
                <span className="text-[10px] font-black uppercase block leading-none">{spec.name}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Typography & Glow Control */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Type className="w-4 h-4 opacity-40" />
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
            {isCs ? '4. Typografie a HUD tuning' : '4. Typography & HUD Tuning'}
          </h4>
        </div>
        <div className="p-8 rounded-[3rem] bg-zinc-50 border border-black/5 space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500 tracking-widest">
              <span>Font Scale</span>
              <span>{fontScale}%</span>
            </div>
            <input 
              type="range" min="80" max="180" step="5" 
              value={fontScale} onChange={(e) => setFontScale(parseInt(e.target.value))} 
              className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: accentColor }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase text-zinc-900 tracking-widest">Ambient Glow</span>
              <span className="text-[8px] text-zinc-400 uppercase font-bold">{isCs ? 'Intenzita podsvícení HUD' : 'HUD backglow intensity'}</span>
            </div>
            <div className="w-32">
              <input 
                type="range" min="0" max="100" step="1" 
                value={ambientGlow} onChange={(e) => setAmbientGlow(parseInt(e.target.value))} 
                className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: accentColor }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reset Section */}
      <div className="flex justify-center pt-8">
        <button 
          onClick={() => {
            setDisplayMode('light');
            setBgPattern('studio');
            setAccentColor('#2563eb');
            setHudTransparency(0.98);
            setIsBoldMode(false);
            setFontScale(100);
            setAmbientGlow(50);
            setIsPulseMode(false);
            setIsContrastBooster(false);
            setMarkerSize(1.0);
            setTraceColor('#2563eb');
          }}
          className="flex items-center gap-3 px-10 py-5 rounded-full bg-black text-white text-[11px] font-black uppercase tracking-[0.4em] shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <MousePointer2 className="w-4 h-4" />
          {isCs ? 'Master Reset Synthesis' : 'Master Reset Synthesis'}
        </button>
      </div>
    </div>
  );
};
