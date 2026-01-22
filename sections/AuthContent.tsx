
import React, { useState } from 'react';
import { Mail, Lock, Fingerprint, LogIn, CheckCircle2, ShieldAlert, Scale, Cpu, Info, Zap } from 'lucide-react';
import { UserPath } from '../types';

interface Props {
  lang: 'cs' | 'en';
  displayMode: 'light' | 'dark' | 'amoled';
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'none' | 'login' | 'register') => void;
  selectedPath: UserPath;
  setSelectedPath: (path: UserPath) => void;
  onAuth: (type: 'biometry' | 'google' | 'form') => void;
  translations: any;
}

export const AuthContent: React.FC<Props> = ({ 
  lang, displayMode, authMode, selectedPath, setSelectedPath, onAuth, translations: t 
}) => {
  const isCs = lang === 'cs';
  const [gdprChecked, setGdprChecked] = useState(false);
  const [liabilityChecked, setLiabilityChecked] = useState(false);
  const [rightsChecked, setRightsChecked] = useState(false);

  return (
    <div className="space-y-20">
      {/* Identity Portal Header */}
      <div className="flex flex-col items-center text-center gap-8 animate-in fade-in duration-700">
        <div className="p-8 bg-zinc-950 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
           <Fingerprint className="w-12 h-12 relative z-10" />
           <div className="absolute inset-0 bg-blue-600/20 blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="space-y-3">
          <h2 className="text-6xl font-black uppercase tracking-tight leading-none">{t.identityPortal}</h2>
          <p className="text-zinc-400 font-bold uppercase tracking-[0.5em] text-[11px]">{t.auth.welcome}</p>
        </div>
      </div>

      {/* Path Selector - Tier Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { id: UserPath.BEGINNER, label: t.auth.pathBeginner, icon: Info, color: 'text-emerald-500', desc: 'Guided Path & Safety' },
           { id: UserPath.EXPERIENCED, label: t.auth.pathExperienced, icon: Cpu, color: 'text-blue-500', desc: 'Hybrid Expert Logic' },
           { id: UserPath.PRO, label: t.auth.pathPro, icon: Zap, color: 'text-zinc-900', desc: 'Raw Synthesis Feed' }
         ].map(path => (
           <button 
             key={path.id}
             onClick={() => setSelectedPath(path.id)}
             className={`p-10 rounded-[4rem] border transition-all text-left space-y-5 ${selectedPath === path.id ? 'bg-white border-black/5 shadow-[0_30px_80px_rgba(0,0,0,0.05)] scale-105 z-10' : 'bg-zinc-50 border-transparent opacity-50 hover:opacity-100 hover:bg-white'}`}
           >
             <div className={`p-5 rounded-3xl inline-flex transition-all duration-500 ${selectedPath === path.id ? 'bg-zinc-950 text-white' : 'bg-zinc-200 text-zinc-400'}`}>
               <path.icon className="w-7 h-7" />
             </div>
             <div className="flex flex-col">
               <span className="font-black text-[14px] uppercase tracking-wide leading-none">{path.label}</span>
               <span className="text-[9px] font-black uppercase opacity-30 tracking-widest mt-2 leading-none">{path.desc}</span>
             </div>
           </button>
         ))}
      </div>

      {/* Form & Compliance Section */}
      <div className="space-y-10 bg-white p-16 rounded-[5rem] shadow-[0_50px_100px_rgba(0,0,0,0.08)] border border-black/5 hud-transparency relative overflow-hidden group">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-zinc-300 ml-6 tracking-widest">{t.auth.email}</label>
            <div className="relative">
               <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
               <input placeholder="operator@synthesis.studio" className="w-full bg-zinc-50 border border-black/5 rounded-[2rem] pl-16 pr-8 py-6 text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner" />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-zinc-300 ml-6 tracking-widest">{t.auth.password}</label>
            <div className="relative">
               <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
               <input type="password" placeholder="••••••••" className="w-full bg-zinc-50 border border-black/5 rounded-[2rem] pl-16 pr-8 py-6 text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner" />
            </div>
          </div>
        </div>

        {/* Compliance Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 relative z-10">
           {[
             { id: 'gdpr', checked: gdprChecked, set: setGdprChecked, label: t.auth.gdpr, icon: CheckCircle2, color: 'text-emerald-500' },
             { id: 'liability', checked: liabilityChecked, set: setLiabilityChecked, label: t.auth.liability, icon: ShieldAlert, color: 'text-red-500' },
             { id: 'rights', checked: rightsChecked, set: setRightsChecked, label: t.auth.rights, icon: Scale, color: 'text-blue-500' }
           ].map(box => (
             <label key={box.id} className={`flex items-center gap-5 p-6 rounded-[2.2rem] border transition-all cursor-pointer ${box.checked ? 'bg-white border-black/5 shadow-md' : 'bg-zinc-50 border-transparent opacity-60'}`}>
                <input type="checkbox" checked={box.checked} onChange={e => box.set(e.target.checked)} className="peer hidden" />
                <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${box.checked ? 'bg-zinc-950 border-zinc-950 shadow-sm' : 'border-zinc-200'}`}>
                   <CheckCircle2 className={`w-4 h-4 text-white opacity-0 ${box.checked ? 'opacity-100' : ''}`} />
                </div>
                <span className={`text-[11px] font-black uppercase tracking-tighter transition-colors ${box.checked ? 'text-zinc-900' : 'text-zinc-400'}`}>{box.label}</span>
             </label>
           ))}
        </div>
        
        {/* Secure Gate UI */}
        <div className="pt-8 flex items-center gap-8 relative z-10">
          <div className="h-px flex-1 bg-zinc-100" />
          <span className="text-[10px] font-black uppercase text-zinc-300 tracking-[0.5em] whitespace-nowrap">{t.auth.secureGate}</span>
          <div className="h-px flex-1 bg-zinc-100" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
           <button onClick={() => onAuth('biometry')} className="flex items-center justify-center gap-5 py-6 rounded-[2.5rem] bg-zinc-50 text-zinc-500 text-[12px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm group">
             <Fingerprint className="w-7 h-7 text-blue-600 group-hover:scale-110 transition-transform" /> {t.auth.biometry}
           </button>
           <button onClick={() => onAuth('google')} className="flex items-center justify-center gap-5 py-6 rounded-[2.5rem] bg-zinc-50 text-zinc-500 text-[12px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm group">
             <LogIn className="w-7 h-7 text-amber-600 group-hover:scale-110 transition-transform" /> {t.auth.google}
           </button>
        </div>
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/[0.03] blur-[120px] pointer-events-none group-hover:bg-blue-600/[0.05] transition-all duration-1000" />
      </div>
    </div>
  );
};
