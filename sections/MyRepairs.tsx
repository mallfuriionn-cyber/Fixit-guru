
import React, { useState } from 'react';
import { 
  Wrench, BookOpen, Leaf, Hammer, CheckCircle2, Clock, 
  AlertCircle, FileText, Download, ChevronRight, Search, 
  Filter, Zap, TrendingUp, Activity, DollarSign, Crown, Award, Star, Globe
} from 'lucide-react';
import { CharacterType, RepairProject, UserPath, VoltagePoint } from '../types';

interface Props { 
  lang: 'cs' | 'en'; 
  userTier?: UserPath;
}

const CHARACTER_CONFIG = {
  [CharacterType.KAREL]: { name: 'Karel', color: 'text-blue-600', icon: Wrench, bg: 'bg-blue-50' },
  [CharacterType.LUCIE]: { name: 'Lucie', color: 'text-amber-600', icon: BookOpen, bg: 'bg-amber-50' },
  [CharacterType.DASA]: { name: 'Dáša', color: 'text-emerald-600', icon: Leaf, bg: 'bg-emerald-50' },
  [CharacterType.FRANTISEK]: { name: 'František', color: 'text-orange-600', icon: Hammer, bg: 'bg-orange-50' },
};

const MOCK_REPAIRS: RepairProject[] = [
  { 
    id: '1', 
    title: 'Zesilovač Transiwatt 140', 
    specialist: CharacterType.KAREL, 
    date: new Date('2026-01-22'), 
    status: 'completed', 
    ecoSaving: 8.5, 
    summary: 'Restaurace legendárního zesilovače. Provedena výměna vyschlých elektrolytů (původní TE924 nahrazeny nízkoimpedančními Nichicon), nastavení klidového proudu na 25mA a kontrola symetrie koncového stupně.', 
    toolsUsed: ['Osciloskop Rigol', 'Pájecí stanice JBC', 'Multimetr Fluke'],
    voltageLog: [
      { time: '0s', value: 0 }, { time: '1s', value: 12 }, { time: '2s', value: 48 }, 
      { time: '3s', value: 48.2 }, { time: '4s', value: 48.1 }, { time: '5s', value: 48.2 }
    ],
    repairCost: 850
  },
  { 
    id: '2', 
    title: 'Kávovar Jura E8 Gen. 2', 
    specialist: CharacterType.LUCIE, 
    date: new Date('2026-01-15'), 
    status: 'completed', 
    ecoSaving: 14.2, 
    summary: 'Kompletní servis spařovací jednotky. Výměna těsnění pístu, promazání vodících drah potravinářskou vazelínou OKS 1110 a hloubková dekalcifikace systému.', 
    toolsUsed: ['Torx T15', 'Sada těsnění Jura'], 
    repairCost: 420 
  },
  { 
    id: '3', 
    title: 'Sanace Monstery Variegata', 
    specialist: CharacterType.DASA, 
    date: new Date('2026-01-10'), 
    status: 'ongoing', 
    ecoSaving: 2.5, 
    summary: 'Identifikována hniloba kořenového systému v důsledku přemokření. Provedena resekce poškozených částí, ošetření aktivním uhlím a přesazení do vzdušného substrátu (Aroid Mix).', 
    toolsUsed: ['Sterilní skalpel', 'Lupa 10x'], 
    repairCost: 150 
  },
  { 
    id: '4', 
    title: 'Cirkulárka HOP 400V', 
    specialist: CharacterType.FRANTISEK, 
    date: new Date('2026-01-05'), 
    status: 'completed', 
    ecoSaving: 45.0, 
    summary: 'Generální oprava pohonného ústrojí. Výměna ložisek 6205-2RS, napnutí klínových řemenů a instalace nového bezpečnostního vypínače s brzdou motoru.', 
    toolsUsed: ['Stahovák ložisek', 'Gola sada 1/2"', 'Zkoušečka'], 
    repairCost: 1850 
  },
  { 
    id: '5', 
    title: 'Smart TV Samsung 55" (LED)', 
    specialist: CharacterType.KAREL, 
    date: new Date('2025-12-28'), 
    status: 'completed', 
    ecoSaving: 22.0, 
    summary: 'Oprava podsvícení panelu. Identifikována jedna vadná LED dioda v sérii, provedena výměna celé lišty za novou s hliníkovým jádrem pro lepší odvod tepla.', 
    toolsUsed: ['LED Tester', 'Sada přísavek na panel'], 
    repairCost: 1100 
  },
];

const VoltageChart = ({ data }: { data: VoltagePoint[] }) => (
  <div className="h-16 flex items-end gap-1 mt-4 px-2">
    {data.map((p, i) => {
      const height = (p.value / 60) * 100; // Normalized for 48V rail
      return (
        <div key={i} className="flex-1 bg-blue-500/20 group relative rounded-t-sm transition-all hover:bg-blue-500" style={{ height: `${Math.max(5, height)}%` }}>
           <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[7px] font-black px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-1">{p.value}V</div>
        </div>
      );
    })}
  </div>
);

export const MyRepairsContent: React.FC<Props> = ({ lang, userTier = UserPath.PRO }) => {
  const isPro = userTier === UserPath.PRO || userTier === UserPath.EXPERIENCED;
  const isCs = lang === 'cs';
  const [search, setSearch] = useState('');

  const filteredRepairs = MOCK_REPAIRS.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Dynamic Header for Mallfurion */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-l-4 border-blue-600 pl-6 py-2">
        <div>
           <div className="flex items-center gap-2 mb-2">
             <Crown className="w-4 h-4 text-amber-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600/50">MALLFURION PERSONAL LOG</span>
           </div>
           <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
             {isCs ? 'Technické Restituce' : 'Technical Restitutions'}
           </h2>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-amber-50 rounded-2xl border border-amber-100 shadow-sm">
           <Award className="w-5 h-5 text-amber-600" />
           <span className="text-[10px] font-black uppercase text-amber-700 tracking-widest">FIXIT GURU STATUS AKTIVNÍ</span>
        </div>
      </header>

      {/* Global Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="p-7 rounded-[3rem] bg-zinc-950 text-white shadow-2xl flex flex-col justify-between overflow-hidden relative group">
            <span className="text-[28px] font-black leading-none relative z-10 tracking-tighter">245,8 kg</span>
            <span className="text-[8px] font-black uppercase tracking-widest opacity-40 relative z-10 mt-2">Měřič Odpadu</span>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[40px] group-hover:bg-blue-600/20 transition-all" />
         </div>
         <div className="p-7 rounded-[3rem] bg-emerald-600 text-white shadow-2xl flex flex-col justify-between overflow-hidden relative">
            <span className="text-[28px] font-black leading-none relative z-10 tracking-tighter">124 500 Kč</span>
            <span className="text-[8px] font-black uppercase tracking-widest opacity-40 relative z-10 mt-2">Ušetřeno Celkem</span>
            <DollarSign className="absolute -bottom-4 -right-4 w-20 h-20 text-white/5 rotate-12" />
         </div>
         <div className="p-7 rounded-[3rem] bg-white border border-black/5 flex flex-col justify-between shadow-sm group hover:shadow-xl transition-all">
            <div className="flex items-center gap-3">
               <span className="text-[28px] font-black leading-none tracking-tighter">156</span>
               <Zap className="w-8 h-8 text-amber-500 fill-amber-500 animate-pulse" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mt-2">Blesky Syntézy</span>
         </div>
         <div className="p-7 rounded-[3rem] bg-zinc-50 border border-black/5 flex flex-col justify-between shadow-inner">
            <span className="text-[28px] font-black leading-none tracking-tighter">42</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300 mt-2">Dokončených Oprav</span>
         </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
          <input 
            placeholder={isCs ? "Hledat v technických protokolech..." : "Search technical protocols..."}
            className="w-full bg-zinc-50 border border-black/5 rounded-[2.5rem] pl-14 pr-8 py-5 text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="px-8 bg-zinc-50 rounded-full border border-black/5 hover:bg-zinc-950 hover:text-white transition-all shrink-0">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Repair Feed */}
      <div className="space-y-6">
        {filteredRepairs.map((repair) => {
          const spec = CHARACTER_CONFIG[repair.specialist];
          return (
            <div key={repair.id} className="group p-8 md:p-10 rounded-[3.5rem] md:rounded-[4.5rem] bg-white border border-black/5 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
                <div className={`p-6 md:p-7 rounded-[2.5rem] ${spec.bg} ${spec.color} shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                  {React.createElement(spec.icon, { className: "w-8 h-8 md:w-10 md:h-10" })}
                </div>
                
                <div className="flex-1 space-y-4 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-950 group-hover:text-blue-600 transition-colors truncate">{repair.title}</h3>
                      <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[8px] font-black uppercase border ${repair.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm' : 'bg-amber-50 text-amber-600 border-amber-100 shadow-sm'}`}>
                        {repair.status === 'completed' ? (isCs ? 'RESTITUOVÁNO' : 'RESTITUTED') : (isCs ? 'V PROCESU' : 'ONGOING')}
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em]">{repair.date.toLocaleDateString()}</span>
                  </div>

                  <p className="text-[14px] text-zinc-500 font-medium leading-relaxed max-w-2xl">
                    {repair.summary}
                  </p>

                  {/* PRO DATA: VOLTAGE/TECHNICAL LOG */}
                  {isPro && repair.voltageLog && (
                    <div className="pt-6 mt-6 border-t border-zinc-100">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black uppercase text-zinc-400 flex items-center gap-2"><Activity className="w-4 h-4" /> Power Rail Diagnostics</span>
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black rounded-lg uppercase tracking-widest">Calibrated: Synthesis Standard</span>
                       </div>
                       <VoltageChart data={repair.voltageLog} />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                     {repair.toolsUsed.map(t => (
                       <span key={t} className="px-4 py-1.5 bg-zinc-50 border border-black/5 rounded-xl text-[9px] font-black uppercase text-zinc-400 hover:text-black transition-colors">{t}</span>
                     ))}
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-8 w-full lg:w-48 pt-6 border-t lg:border-t-0 lg:pt-0 border-black/5">
                   <div className="text-left lg:text-right">
                      <span className="text-2xl md:text-3xl font-black block leading-none tracking-tighter">+{repair.ecoSaving}kg</span>
                      <span className="text-[9px] text-emerald-600 font-black uppercase tracking-widest mt-1 block">EKO-MERIT</span>
                   </div>
                   <button className="flex items-center justify-between px-6 py-4 bg-zinc-950 text-white rounded-[1.8rem] hover:bg-blue-600 transition-all group/btn gap-4 shrink-0 shadow-xl">
                      <span className="text-[10px] font-black uppercase tracking-widest">{isCs ? 'PROTOKOL' : 'PROTOCOL'}</span>
                      <Download className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-y-1 transition-all" />
                   </button>
                </div>
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-zinc-50 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          );
        })}
      </div>
      
      {/* Global Progress Dashboard Footer */}
      <div className="p-8 md:p-12 rounded-[4rem] md:rounded-[5rem] bg-blue-600 text-white flex flex-col lg:flex-row items-center justify-between gap-10 group overflow-hidden relative shadow-[0_40px_100px_rgba(37,99,235,0.2)]">
         <div className="flex items-center gap-6 md:gap-10 relative z-10 text-center lg:text-left">
            <div className="p-5 md:p-6 bg-white/10 rounded-[2.5rem] backdrop-blur-xl border border-white/20 shadow-2xl hidden sm:block shrink-0">
               <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <div className="flex flex-col">
               <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">{isCs ? 'Dopad Komunity Studio Synthesis' : 'Studio Synthesis Community Impact'}</span>
               <p className="text-[10px] md:text-[11px] font-black text-white/50 uppercase tracking-[0.3em] mt-3">{isCs ? 'O 32% vyšší efektivita oprav než v roce 2024' : '32% higher efficiency than in 2024'}</p>
            </div>
         </div>
         <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full lg:w-auto">
           <button className="flex-1 px-10 py-5 bg-white text-blue-600 rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">
              {isCs ? 'Exportovat Celý Deník' : 'Export Full Logbook'}
           </button>
           <button className="flex-1 px-10 py-5 bg-blue-900/40 border border-white/20 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all">
              {isCs ? 'Sdílet Úspěchy' : 'Share Successes'}
           </button>
         </div>
         <Globe className="absolute -bottom-20 -left-20 w-80 h-80 text-white/5 opacity-50" />
      </div>

      <div className="flex justify-center pt-6 opacity-30">
         <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-400">RESTITUTION CORE v2.80 • ENCRYPTED DATASTREAM</p>
      </div>
    </div>
  );
};
