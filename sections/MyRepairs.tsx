
import React, { useState } from 'react';
import { Wrench, BookOpen, Leaf, Hammer, CheckCircle2, Clock, AlertCircle, FileText, Download, ChevronRight, Search, Filter } from 'lucide-react';
import { CharacterType, RepairProject } from '../types';

interface Props { lang: 'cs' | 'en'; }

const CHARACTER_CONFIG = {
  [CharacterType.KAREL]: { name: 'Karel', color: 'text-blue-600', icon: Wrench, bg: 'bg-blue-50' },
  [CharacterType.LUCIE]: { name: 'Lucie', color: 'text-amber-600', icon: BookOpen, bg: 'bg-amber-50' },
  [CharacterType.DASA]: { name: 'Dáša', color: 'text-emerald-600', icon: Leaf, bg: 'bg-emerald-50' },
  [CharacterType.FRANTISEK]: { name: 'František', color: 'text-orange-600', icon: Hammer, bg: 'bg-orange-50' },
};

const MOCK_REPAIRS: RepairProject[] = [
  { id: '1', title: 'Restaurace Tesla B700', specialist: CharacterType.KAREL, date: new Date('2025-12-14'), status: 'completed', ecoSaving: 12.5, summary: 'Výměna vyschlých elektrolytických kondenzátorů v napájecí sekci a seřízení předpětí hlav hlavy.', toolsUsed: ['Pájecí stanice', 'Multimetr', 'IPA'] },
  { id: '2', title: 'Oprava kávovaru DeLonghi', specialist: CharacterType.LUCIE, date: new Date('2026-01-05'), status: 'completed', ecoSaving: 8.2, summary: 'Odvápnění topného tělesa a výměna těsnění pístu spařovací jednotky.', toolsUsed: ['Sada šroubováků', 'O-kroužky'] },
  { id: '3', title: 'Záchrana Monstery (HNILOBA)', specialist: CharacterType.DASA, date: new Date('2026-01-10'), status: 'ongoing', ecoSaving: 1.5, summary: 'Sanace kořenového systému a přesazení do substrátu s aktivním uhlím.', toolsUsed: ['Nůžky', 'Perlit'] },
  { id: '4', title: 'Renovace cirkulárky (Ložiska)', specialist: CharacterType.FRANTISEK, date: new Date('2025-11-20'), status: 'completed', ecoSaving: 45.0, summary: 'Lisování nových ložisek hřídele a kontrola statické rovnováhy kotouče.', toolsUsed: ['Stahovák', 'Momentový klíč'] },
];

export const MyRepairsContent: React.FC<Props> = ({ lang }) => {
  const isCs = lang === 'cs';
  const [search, setSearch] = useState('');

  const filteredRepairs = MOCK_REPAIRS.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col gap-4 border-l-4 border-blue-600 pl-6 py-2">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600/50">
          {isCs ? 'KNIHA RESTITUCÍ' : 'RESTITUTION LOG'}
        </span>
        <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
          {isCs ? 'Moje opravy' : 'My Repairs'}
        </h2>
      </header>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
          <input 
            placeholder={isCs ? "Hledat v archivech..." : "Search archives..."}
            className="w-full bg-zinc-50 border border-black/5 rounded-full pl-12 pr-6 py-4 text-xs font-bold outline-none focus:border-blue-600 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="p-4 bg-zinc-50 rounded-full border border-black/5 hover:bg-zinc-100 transition-all">
          <Filter className="w-5 h-5 text-zinc-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredRepairs.map((repair) => {
          const spec = CHARACTER_CONFIG[repair.specialist];
          return (
            <div key={repair.id} className="group p-6 rounded-[2.5rem] bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className={`p-5 rounded-3xl ${spec.bg} ${spec.color} shrink-0`}>
                <spec.icon className="w-8 h-8" />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors">{repair.title}</h3>
                  {repair.status === 'completed' ? (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="text-[8px] font-black uppercase">{isCs ? 'Hotovo' : 'Done'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                      <Clock className="w-3 h-3 animate-pulse" />
                      <span className="text-[8px] font-black uppercase">{isCs ? 'Probíhá' : 'Ongoing'}</span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none">
                  {repair.date.toLocaleDateString()} • {isCs ? 'Specialista' : 'Specialist'}: {spec.name}
                </p>
                <p className="text-[11px] text-zinc-500 font-medium line-clamp-2">
                  {repair.summary}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3 min-w-[120px]">
                <div className="text-right">
                  <span className="text-[14px] font-black block leading-none">+{repair.ecoSaving} kg</span>
                  <span className="text-[7px] text-emerald-600 font-black uppercase tracking-widest">ECO Restituto</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-zinc-50 rounded-xl text-zinc-400 hover:text-black hover:bg-zinc-100 transition-all" title={isCs ? "Protokol" : "Report"}>
                    <FileText className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 bg-zinc-50 rounded-xl text-zinc-400 hover:text-blue-600 hover:bg-blue-50 transition-all" title={isCs ? "Stáhnout" : "Download"}>
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-[3rem] bg-zinc-950 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">{isCs ? 'Celkový dopad operátora' : 'Total Operator Impact'}</h4>
            <span className="text-3xl font-black uppercase tracking-tighter">67.2 kg {isCs ? 'Materiálu' : 'Material'}</span>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
            <Zap className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px]" />
      </div>
    </div>
  );
};

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.71V20l6.91-9H4.14L10 2.21V8.14L3.14 17.14H10l-1.09 4.71L16 11h-6.14l6-6.14"/></svg>
);
