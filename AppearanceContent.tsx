
import React from 'react';
import { Eye, Monitor } from 'lucide-react';

interface Props {
  lang: 'cs' | 'en';
  activeTheme: 'default' | 'grandma' | 'workshop';
  setActiveTheme: (t: 'default' | 'grandma' | 'workshop') => void;
  hudTransparency: number;
  setHudTransparency: (v: number) => void;
  isBoldMode: boolean;
  setIsBoldMode: (v: boolean) => void;
}

export const AppearanceContent: React.FC<Props> = ({ 
  lang, activeTheme, setActiveTheme, hudTransparency, setHudTransparency, isBoldMode, setIsBoldMode 
}) => (
  <div className="space-y-6 max-w-xl mx-auto py-1">
    <div className="space-y-3">
      <span className="text-[8px] font-black uppercase text-zinc-400 block text-center tracking-widest">
        {lang === 'cs' ? 'Tematické HUD moduly' : 'Thematic HUD Modules'}
      </span>
      <div className="p-1.5 rounded-[2rem] bg-zinc-100 flex gap-1.5 shadow-inner">
        {['Default', 'Babička', 'Workshop'].map((id) => (
          <button key={id} onClick={() => setActiveTheme(id.toLowerCase() as any)} className={`flex-1 py-4 rounded-2xl text-[9.5px] font-black uppercase transition-all ${activeTheme === id.toLowerCase() ? 'bg-white shadow-md text-black scale-[1.02]' : 'text-zinc-400 hover:text-zinc-600'}`}>
            {id}
          </button>
        ))}
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      <div className="p-6 rounded-[2.5rem] bg-zinc-50 border border-black/5 space-y-5">
        <div className="flex justify-between text-[8px] font-black uppercase">
          <span className="text-zinc-400">HUD Transparency</span>
          <span>{Math.round(hudTransparency * 100)}%</span>
        </div>
        <input type="range" min="0.3" max="1" step="0.01" value={hudTransparency} onChange={(e) => setHudTransparency(parseFloat(e.target.value))} className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black" />
      </div>
      <div className="flex items-center justify-between p-6 rounded-[2.5rem] bg-zinc-50 border border-black/5">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase text-zinc-900">Bold Mode</span>
          <span className="text-[7.5px] text-zinc-400 uppercase tracking-tighter">
            {lang === 'cs' ? 'Vysoký kontrast' : 'High Contrast'}
          </span>
        </div>
        <button onClick={() => setIsBoldMode(!isBoldMode)} className={`w-11 h-6 rounded-full transition-all relative ${isBoldMode ? 'bg-black' : 'bg-zinc-200'}`}>
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isBoldMode ? 'left-6' : 'left-1'}`} />
        </button>
      </div>
    </div>

    <div className="p-6 rounded-[2.5rem] bg-zinc-950 text-white flex gap-6 items-center shadow-2xl overflow-hidden relative group">
       <Monitor className="w-7 h-7 text-blue-400 shrink-0 relative z-10" />
       <div className="relative z-10">
         <h5 className="text-[10px] font-black uppercase leading-none mb-1.5">Dark Workshop Mode</h5>
         <p className="text-[8.5px] opacity-40 uppercase leading-tight tracking-tight">
           {lang === 'cs' ? 'OLED black rozhraní šetřící zrak i baterii při práci v dílně.' : 'OLED black interface saving eyes and battery in the workshop.'}
         </p>
       </div>
       <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[40px] group-hover:bg-blue-600/10 transition-colors" />
    </div>
  </div>
);
