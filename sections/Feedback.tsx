
import React, { useState } from 'react';
import { Beaker, BrainCircuit, Loader2, Zap, ChevronRight, User, History, ArrowRight } from 'lucide-react';
import { CharacterType, InnovationProposal, UserPath, ProposalStatus, InnovationCategory, UserProfile } from '../types';
import { askGuru } from '../geminiService';

interface Props { lang: 'cs' | 'en'; currentUser?: UserProfile | null; }

const Wrench = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1-2.79 2.79L15 12.1l-5.1-5.1 3.77-3.77a2 2 0 0 1 2.79 2.79l-1.76 1.77Z"/><path d="M5 21v-4a2 2 0 0 1 2-2h4"/><path d="m3 7 2 2"/><path d="m9 3 2 2"/></svg>
);

const BookOpen = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

const Leaf = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C10.9 14.51 12 15 13 17c1 2 1.1 2.22 1 3"/><path d="M14 13c0-3 2-6 6-7"/></svg>
);

const Hammer = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86c0-1.38.63-2.68 1.71-3.51a1.21 1.21 0 0 0-.01-1.92L19.26 1c-.39-.39-1.02-.39-1.41 0l-3.23 3.23a1.2 1.2 0 0 0 0 1.7c.83.83 2.13.83 2.96 0l.27-.27c.4-.4.92-.62 1.48-.62h.43c.4 0 .78.15 1.07.44l.85.85c.29.29.44.67.44 1.07v.22c0 .56-.22 1.09-.62 1.48l-1.25 1.25c-.29.29-.29.77 0 1.06l1.25 1.25c.29.29.77.29 1.06 0l1.25-1.25a.75.75 0 0 0 0-1.06z"/></svg>
);

const CHARACTER_CONFIG = {
  [CharacterType.KAREL]: { name: 'Karel', color: 'text-blue-600', icon: Wrench, bg: 'bg-blue-50' },
  [CharacterType.LUCIE]: { name: 'Lucie', color: 'text-amber-600', icon: BookOpen, bg: 'bg-amber-50' },
  [CharacterType.DASA]: { name: 'Dáša', color: 'text-emerald-600', icon: Leaf, bg: 'bg-emerald-50' },
  [CharacterType.FRANTISEK]: { name: 'František', color: 'text-orange-600', icon: Hammer, bg: 'bg-orange-50' },
};

export const FeedbackContent: React.FC<Props> = ({ lang, currentUser }) => {
  const isCs = lang === 'cs';
  const [view, setView] = useState<'list' | 'form'>('list');
  const [isBrainstorming, setIsBrainstorming] = useState(false);
  const [proposals, setProposals] = useState<InnovationProposal[]>([
    { id: 'b1', title: 'Acoustic AI Diagnostics', category: InnovationCategory.RESEARCH, specialist: CharacterType.KAREL, description: 'Modul pro frekvenční analýzu zvuku motorů a ložisek pomocí mikrofonu smartphonu pro včasnou detekci mechanického opotřebení.', author: 'Synthesis_Lab', authorTier: UserPath.PRO, votes: 215, status: ProposalStatus.DEVELOPMENT, timestamp: new Date() },
    { id: 'b2', title: 'AR Pinpoint Overlay', category: InnovationCategory.FEATURE, specialist: CharacterType.LUCIE, description: 'Vizuální vrstva rozšířené reality, která v reálném čase označuje měřící body na desce plošných spojů podle načteného schématu.', author: 'Optic_Dev', authorTier: UserPath.PRO, votes: 184, status: ProposalStatus.PENDING, timestamp: new Date() },
    { id: 'b3', title: 'Bio-Digital Soil Sensors', category: InnovationCategory.RESEARCH, specialist: CharacterType.DASA, description: 'Integrace levných ESP32 senzorů pro kontinuální monitoring PH a vlhkosti půdy s přímým napojením na Dášin diagnostický algoritmus.', author: 'Eco_Maker', authorTier: UserPath.PRO, votes: 142, status: ProposalStatus.PENDING, timestamp: new Date() },
    { id: 'b4', title: 'Stress-Load Calculator', category: InnovationCategory.OPTIMIZATION, specialist: CharacterType.FRANTISEK, description: 'Dynamický výpočet nosnosti dřevěných konstrukcí při rekonstrukcích krovů na základě vizuální analýzy stavu trámů.', author: 'HardWork_Pavel', authorTier: UserPath.EXPERIENCED, votes: 98, status: ProposalStatus.PENDING, timestamp: new Date() },
  ]);

  const [newProp, setNewProp] = useState({ title: '', description: '', category: InnovationCategory.FEATURE, specialist: CharacterType.KAREL });

  const handleBrainstorm = async () => {
    setIsBrainstorming(true);
    const prompt = `Jsi inovační asistent Studio Synthesis. Rozpracuj tento nápad technicky pro komunitní backlog: "${newProp.title}"`;
    try {
      const res = await askGuru(CharacterType.LUCIE, prompt, [], undefined, undefined, 'gemini-3-flash-preview');
      setNewProp(prev => ({ ...prev, description: res }));
    } catch(e) {
      console.error(e);
    } finally {
      setIsBrainstorming(false);
    }
  };

  if (view === 'form') {
    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700 pb-16">
        <header className="flex flex-col gap-4 border-l-4 border-purple-500 pl-6 py-2">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-600/50">COMMUNITY-ENGINE</span>
          <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">{isCs ? 'Navrhnout inovaci' : 'Propose Innovation'}</h2>
        </header>

        <div className="space-y-6 bg-white p-10 rounded-[4rem] border border-black/5 shadow-xl">
          <div className="space-y-3">
             <label className="text-[10px] font-black uppercase text-zinc-300 ml-6 tracking-widest">Téma podnětu</label>
             <input className="w-full bg-zinc-50 border border-black/5 rounded-[2.2rem] px-8 py-6 text-sm font-bold outline-none focus:border-purple-600 focus:bg-white transition-all shadow-inner" placeholder="Pojmenujte svůj impuls..." value={newProp.title} onChange={e => setNewProp({...newProp, title: e.target.value})} />
          </div>

          <button onClick={handleBrainstorm} disabled={isBrainstorming} className="w-full py-6 bg-zinc-950 text-white rounded-[2rem] text-[11px] font-black uppercase flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg group">
            {isBrainstorming ? <Loader2 className="animate-spin w-5 h-5" /> : <BrainCircuit className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />} 
            {isCs ? 'AI BRAINSTORMING PROTOCOL' : 'AI BRAINSTORMING PROTOCOL'}
          </button>

          <div className="space-y-3">
             <label className="text-[10px] font-black uppercase text-zinc-300 ml-6 tracking-widest">Technický detail</label>
             <textarea className="w-full h-48 bg-zinc-50 border border-black/5 rounded-[2.5rem] px-8 py-8 text-sm font-medium outline-none focus:border-purple-600 focus:bg-white transition-all shadow-inner custom-scroll" placeholder="Popište technickou podstatu vize..." value={newProp.description} onChange={e => setNewProp({...newProp, description: e.target.value})} />
          </div>

          <div className="pt-4 flex gap-4">
             <button className="flex-1 py-6 bg-purple-600 text-white rounded-[2rem] text-[11px] font-black uppercase shadow-xl shadow-purple-900/10 hover:bg-purple-700 transition-all" onClick={() => setView('list')}>
                {isCs ? 'ULOŽIT DO REGISTRU' : 'SAVE TO REGISTRY'}
             </button>
             <button className="px-10 py-6 bg-zinc-100 text-zinc-400 rounded-[2rem] text-[11px] font-black uppercase hover:bg-zinc-200 transition-all" onClick={() => setView('list')}>
                {isCs ? 'ZRUŠIT' : 'CANCEL'}
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
         <div className="flex items-center gap-6">
            <div className="p-4 bg-purple-100 text-purple-600 rounded-[1.5rem]"><Zap className="w-8 h-8" /></div>
            <div className="flex flex-col">
               <h4 className="text-3xl font-black uppercase tracking-tight leading-none">{isCs ? 'KOMUNITNÍ BACKLOG' : 'COMMUNITY BACKLOG'}</h4>
               <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mt-2">Synthesis Evolution Engine</span>
            </div>
         </div>
         <button onClick={() => setView('form')} className="px-10 py-5 bg-purple-600 text-white rounded-full text-[11px] font-black uppercase shadow-xl hover:scale-105 transition-all">
            {isCs ? 'NAVŔHNOUT' : 'PROPOSE'}
         </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {proposals.map(p => {
          const spec = (CHARACTER_CONFIG as any)[p.specialist];
          return (
            <div key={p.id} className="p-8 rounded-[4rem] bg-white border border-black/5 flex items-center gap-10 group hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:scale-[1.01] transition-all cursor-help relative overflow-hidden">
               <div className={`p-6 rounded-[2rem] ${spec.bg} ${spec.color} group-hover:rotate-12 transition-transform shadow-sm`}>
                  {React.createElement(spec.icon, { className: "w-8 h-8" })}
               </div>
               <div className="flex-1">
                  <h5 className="text-[17px] font-black uppercase text-zinc-900 group-hover:text-purple-600 transition-colors tracking-tight leading-none">{p.title}</h5>
                  <div className="flex items-center gap-4 mt-3">
                     <span className="text-[10px] font-black uppercase text-zinc-300 tracking-widest">By {p.author}</span>
                     <div className="w-1 h-1 rounded-full bg-zinc-200" />
                     <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{p.status}</span>
                  </div>
               </div>
               <div className="flex items-center gap-4 px-8 py-4 bg-zinc-50 rounded-full border border-black/[0.02]">
                  <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="text-lg font-black tracking-tighter">{p.votes}</span>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/[0.02] blur-[40px] pointer-events-none group-hover:bg-purple-500/[0.05] transition-all" />
            </div>
          );
        })}
      </div>
      
      <div className="p-10 rounded-[4rem] bg-zinc-50 border border-black/5 flex items-center justify-between group">
         <div className="flex items-center gap-8">
            <History className="w-12 h-12 text-zinc-300 group-hover:rotate-180 transition-transform duration-1000" />
            <div className="flex flex-col">
               <span className="text-[13px] font-black uppercase text-zinc-900">Archivované milníky</span>
               <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Sledujte evoluci systému od verze 1.0</p>
            </div>
         </div>
         <ArrowRight className="w-8 h-8 text-zinc-200 group-hover:translate-x-3 transition-transform" />
      </div>
    </div>
  );
};
