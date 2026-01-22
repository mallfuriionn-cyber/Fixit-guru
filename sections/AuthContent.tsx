
import React, { useState } from 'react';
import { Mail, Lock, Fingerprint, LogIn, CheckCircle2, ShieldAlert, Scale, X, Cpu, Info } from 'lucide-react';
import { UserPath, CharacterType } from '../types';

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
  lang, displayMode, authMode, setAuthMode, selectedPath, setSelectedPath, onAuth, translations: t 
}) => {
  const isCs = lang === 'cs';
  const [gdprChecked, setGdprChecked] = useState(false);
  const [liabilityChecked, setLiabilityChecked] = useState(false);
  const [rightsChecked, setRightsChecked] = useState(false);

  const canSubmit = authMode === 'login' || (gdprChecked && liabilityChecked && rightsChecked);

  const handleAction = (type: 'biometry' | 'google' | 'form') => {
    if (authMode === 'register' && !canSubmit) {
      alert(isCs ? "Pro aktivaci portálu musíte potvrdit všechny legislativní doložky." : "You must confirm all legal clauses to activate the portal.");
      return;
    }
    onAuth(type);
  };

  return (
    <div className="space-y-7">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
            {authMode === 'login' ? t.auth.login : t.auth.register}
          </h2>
          <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-1">Synthesis Identity v2.48</span>
        </div>
        <button onClick={() => setAuthMode('none')} className="p-3 rounded-full hover:bg-black/5 text-zinc-400 transition-all"><X className="w-8 h-8" /></button>
      </div>

      {/* Volba operačního profilu (Tiers) - Pouze pro Registraci */}
      {authMode === 'register' && (
        <div className="space-y-4">
          <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 px-4">Volba operačního profilu (User Tiers)</label>
          <div className="grid grid-cols-1 gap-2">
            <button 
              onClick={() => setSelectedPath(UserPath.BEGINNER)}
              className={`p-5 rounded-[2.2rem] border text-left transition-all flex items-center gap-4 ${selectedPath === UserPath.BEGINNER ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-zinc-50 border-transparent opacity-60'}`}
            >
              <div className={`p-3 rounded-2xl ${selectedPath === UserPath.BEGINNER ? 'bg-emerald-500 text-white' : 'bg-zinc-200 text-zinc-400'}`}>
                <Info className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-[10px] uppercase block leading-none">{t.auth.pathBeginner} (Guided Path)</span>
                <p className="text-[8px] text-zinc-400 uppercase font-bold mt-1">Plné vedení Lucií, Step-Lock proces, detailní logy.</p>
              </div>
            </button>

            <button 
              onClick={() => setSelectedPath(UserPath.EXPERIENCED)}
              className={`p-5 rounded-[2.2rem] border text-left transition-all flex items-center gap-4 ${selectedPath === UserPath.EXPERIENCED ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-zinc-50 border-transparent opacity-60'}`}
            >
              <div className={`p-3 rounded-2xl ${selectedPath === UserPath.EXPERIENCED ? 'bg-blue-500 text-white' : 'bg-zinc-200 text-zinc-400'}`}>
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-[10px] uppercase block leading-none">{t.auth.pathExperienced} (Hybrid Path)</span>
                <p className="text-[8px] text-zinc-400 uppercase font-bold mt-1">Spolupráce Karel & Lucie, technická dokumentace s výkladem.</p>
              </div>
            </button>

            <button 
              onClick={() => setSelectedPath(UserPath.PRO)}
              className={`p-5 rounded-[2.2rem] border text-left transition-all flex items-center gap-4 ${selectedPath === UserPath.PRO ? 'bg-zinc-900 border-black shadow-lg' : 'bg-zinc-50 border-transparent opacity-60'}`}
            >
              <div className={`p-3 rounded-2xl ${selectedPath === UserPath.PRO ? 'bg-white text-black' : 'bg-zinc-200 text-zinc-400'}`}>
                <ZapIcon className="w-5 h-5" />
              </div>
              <div>
                <span className={`font-black text-[10px] uppercase block leading-none ${selectedPath === UserPath.PRO ? 'text-white' : ''}`}>{t.auth.pathPro} (Expert Path)</span>
                <p className={`text-[8px] uppercase font-bold mt-1 ${selectedPath === UserPath.PRO ? 'text-zinc-500' : 'text-zinc-400'}`}>Surová data od Karla, žádné prodlevy, správa vlastních API.</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 px-4">{t.auth.email}</label>
          <div className={`flex items-center gap-4 px-6 py-4 rounded-[2rem] border ${displayMode === 'light' ? 'bg-zinc-50 border-black/5' : 'bg-white/5 border-white/10'}`}>
            <Mail className="w-5 h-5 opacity-40" />
            <input type="email" placeholder="operator@synthesis.studio" className="bg-transparent border-none outline-none flex-1 text-sm font-medium placeholder-zinc-300" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 px-4">{t.auth.password}</label>
          <div className={`flex items-center gap-4 px-6 py-4 rounded-[2rem] border ${displayMode === 'light' ? 'bg-zinc-50 border-black/5' : 'bg-white/5 border-white/10'}`}>
            <Lock className="w-5 h-5 opacity-40" />
            <input type="password" placeholder="••••••••" className="bg-transparent border-none outline-none flex-1 text-sm font-medium placeholder-zinc-300" />
          </div>
        </div>
      </div>

      {/* Compliance Section v2.48 */}
      {authMode === 'register' && (
        <div className="space-y-3 bg-zinc-50 p-6 rounded-[2.5rem] border border-black/[0.03]">
          <h5 className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-2">Právní doložky a Compliance</h5>
          <label className="flex items-start gap-4 cursor-pointer group">
            <input type="checkbox" checked={gdprChecked} onChange={(e) => setGdprChecked(e.target.checked)} className="peer hidden" />
            <div className="w-5 h-5 rounded-lg border-2 border-zinc-200 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 flex items-center justify-center transition-all mt-0.5"><CheckCircle2 className="w-3.5 text-white opacity-0 peer-checked:opacity-100" /></div>
            <span className="text-[9px] font-black uppercase text-zinc-500 leading-tight pt-1">{t.auth.gdpr}</span>
          </label>
          <label className="flex items-start gap-4 cursor-pointer group">
            <input type="checkbox" checked={liabilityChecked} onChange={(e) => setLiabilityChecked(e.target.checked)} className="peer hidden" />
            <div className="w-5 h-5 rounded-lg border-2 border-zinc-200 peer-checked:bg-red-500 peer-checked:border-red-500 flex items-center justify-center transition-all mt-0.5"><ShieldAlert className="w-3.5 text-white opacity-0 peer-checked:opacity-100" /></div>
            <span className="text-[9px] font-black uppercase text-zinc-500 leading-tight pt-1">{t.auth.liability}</span>
          </label>
          <label className="flex items-start gap-4 cursor-pointer group">
            <input type="checkbox" checked={rightsChecked} onChange={(e) => setRightsChecked(e.target.checked)} className="peer hidden" />
            <div className="w-5 h-5 rounded-lg border-2 border-zinc-200 peer-checked:bg-blue-500 peer-checked:border-blue-500 flex items-center justify-center transition-all mt-0.5"><Scale className="w-3.5 text-white opacity-0 peer-checked:opacity-100" /></div>
            <span className="text-[9px] font-black uppercase text-zinc-500 leading-tight pt-1">{t.auth.rights}</span>
          </label>
        </div>
      )}

      <button 
        onClick={() => handleAction('form')} 
        className={`w-full py-5 rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.5em] transition-all active:scale-95 shadow-xl ${canSubmit ? (displayMode === 'light' ? 'bg-black text-white' : 'bg-white text-black') : 'bg-zinc-200 text-zinc-400'}`}
      >
        {authMode === 'login' ? t.auth.submit : t.auth.create}
      </button>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-zinc-200" />
        <span className="text-[8px] font-black text-zinc-300 uppercase">{t.auth.secureGate}</span>
        <div className="h-px flex-1 bg-zinc-200" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => handleAction('biometry')} className="flex items-center justify-center gap-3 py-4 rounded-[2rem] border border-black/5 bg-zinc-50 hover:bg-white hover:shadow-lg transition-all text-[9px] font-black uppercase tracking-widest text-zinc-600">
          <Fingerprint className="w-5 h-5 text-blue-600" /> {t.auth.biometry}
        </button>
        <button onClick={() => handleAction('google')} className="flex items-center justify-center gap-3 py-4 rounded-[2rem] border border-black/5 bg-zinc-50 hover:bg-white hover:shadow-lg transition-all text-[9px] font-black uppercase tracking-widest text-zinc-600">
          <LogIn className="w-5 h-5 text-amber-600" /> {t.auth.google}
        </button>
      </div>

      <div className="pt-4 text-center">
        <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-[9px] font-black uppercase text-zinc-400 hover:text-black transition-colors underline underline-offset-4 tracking-widest">
          {authMode === 'login' ? "Potřebuji novou identitu" : "Již mám přístupový kód"}
        </button>
      </div>
    </div>
  );
};

const ZapIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.71V20l6.91-9H4.14L10 2.21V8.14L3.14 17.14H10l-1.09 4.71L16 11h-6.14l6-6.14"/></svg>
);
