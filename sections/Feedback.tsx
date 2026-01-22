
import React, { useState, useMemo } from 'react';
import { 
  Beaker, 
  Ear, 
  Eye, 
  Navigation, 
  Plus, 
  ArrowLeft, 
  BrainCircuit, 
  Sparkles, 
  Loader2, 
  Target, 
  Lightbulb, 
  Send, 
  X,
  Wrench,
  BookOpen,
  Leaf,
  Hammer,
  Bug,
  Zap,
  Microscope,
  ChevronRight,
  ChevronDown,
  User,
  Clock,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { CharacterType, InnovationProposal, UserPath, ProposalStatus, InnovationCategory, UserProfile } from '../types';
import { askGuru } from '../geminiService';

interface Props { 
  lang: 'cs' | 'en'; 
  currentUser?: UserProfile | null;
}

const CHARACTER_CONFIG = {
  [CharacterType.KAREL]: { name: 'Karel', color: 'text-blue-600', icon: Wrench, bg: 'bg-blue-50' },
  [CharacterType.LUCIE]: { name: 'Lucie', color: 'text-amber-600', icon: BookOpen, bg: 'bg-amber-50' },
  [CharacterType.DASA]: { name: 'Dáša', color: 'text-emerald-600', icon: Leaf, bg: 'bg-emerald-50' },
  [CharacterType.FRANTISEK]: { name: 'František', color: 'text-orange-600', icon: Hammer, bg: 'bg-orange-50' },
};

const CATEGORY_CONFIG = {
  [InnovationCategory.FEATURE]: { label: 'Nová Funkce', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' },
  [InnovationCategory.BUG]: { label: 'Hlášení Chyby', icon: Bug, color: 'text-red-600', bg: 'bg-red-50' },
  [InnovationCategory.OPTIMIZATION]: { label: 'Optimalizace', icon: Beaker, color: 'text-blue-600', bg: 'bg-blue-50' },
  [InnovationCategory.RESEARCH]: { label: 'Výzkum & Vývoj', icon: Microscope, color: 'text-zinc-600', bg: 'bg-zinc-100' },
};

const INITIAL_PROPOSALS: InnovationProposal[] = [
  { id: '1', title: 'Smell Detection v3.0', category: InnovationCategory.RESEARCH, specialist: CharacterType.KAREL, description: 'Senzorická analýza plynů při přehřívání PCB. Detekuje specifické chemické složení kouře z taveného PVC a elektrolytů.', author: 'Synthesis_Lab', authorTier: UserPath.PRO, votes: 156, status: ProposalStatus.DEVELOPMENT, timestamp: new Date('2025-10-01') },
  { id: '2', title: 'AR Vision Glasses', category: InnovationCategory.FEATURE, specialist: CharacterType.LUCIE, description: 'HUD vrstva pro přímou identifikaci součástek. Umožňuje automatické zvýraznění pinů procesoru v reálném čase.', author: 'Optic_Dev', authorTier: UserPath.PRO, votes: 142, status: ProposalStatus.PENDING, timestamp: new Date('2025-11-15') },
  { id: '3', title: 'Chyba v Step-Locku u retro vysavačů', category: InnovationCategory.BUG, specialist: CharacterType.LUCIE, description: 'Lucie přeskakuje krok čištění filtru u modelu ETA 400. To může vést k poškození motoru.', author: 'Vysavac_Guru', authorTier: UserPath.EXPERIENCED, votes: 89, status: ProposalStatus.PENDING, timestamp: new Date('2026-01-05') },
  { id: '4', title: 'Optimalizace Dášiny analýzy PH', category: InnovationCategory.OPTIMIZATION, specialist: CharacterType.DASA, description: 'Zrychlení detekce barevného spektra u lakmusových papírků pomocí neuronové sítě.', author: 'Bio_Hacker', authorTier: UserPath.PRO, votes: 67, status: ProposalStatus.DEVELOPMENT, timestamp: new Date('2025-12-20') },
  { id: '5', title: 'Databáze 3D modelů pro Františka', category: InnovationCategory.FEATURE, specialist: CharacterType.FRANTISEK, description: 'Knihovna pro tisk náhradních dílů k cirkulárkám a stavebním strojům.', author: 'Wood_Master', authorTier: UserPath.EXPERIENCED, votes: 45, status: ProposalStatus.PENDING, timestamp: new Date('2026-01-10') },
  { id: '6', title: 'Podpora Bluetooth multimetrů', category: InnovationCategory.OPTIMIZATION, specialist: CharacterType.KAREL, description: 'Automatické načítání naměřených hodnot do HUDu bez nutnosti ručního zápisu.', author: 'Volt_Hunter', authorTier: UserPath.PRO, votes: 38, status: ProposalStatus.PENDING, timestamp: new Date('2026-01-12') },
  { id: '7', title: 'Hlasové SOS pro nevidomé opraváře', category: InnovationCategory.RESEARCH, specialist: CharacterType.LUCIE, description: 'Hmatová a zvuková navigace v prostoru zařízení pro inkluzivní opravy.', author: 'Access_Dev', authorTier: UserPath.PRO, votes: 24, status: ProposalStatus.PENDING, timestamp: new Date('2026-01-14') }
];

export const FeedbackContent: React.FC<Props> = ({ lang, currentUser }) => {
  const isCs = lang === 'cs';
  const [view, setView] = useState<'list' | 'form'>('list');
  const [selectedProposal, setSelectedProposal] = useState<InnovationProposal | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isBrainstorming, setIsBrainstorming] = useState(false);
  const [proposals, setProposals] = useState<InnovationProposal[]>(INITIAL_PROPOSALS);
  
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: InnovationCategory.FEATURE,
    specialist: CharacterType.KAREL,
    problem: '',
    impact: ''
  });

  const sortedProposals = useMemo(() => {
    return [...proposals].sort((a, b) => b.votes - a.votes);
  }, [proposals]);

  const displayedProposals = showAll ? sortedProposals : sortedProposals.slice(0, 5);

  const handleVote = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setProposals(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, votes: p.userVoted ? p.votes - 1 : p.votes + 1, userVoted: !p.userVoted };
      }
      return p;
    }));
  };

  const handleBrainstorm = async () => {
    if (!newProposal.title && !newProposal.description) {
      alert(isCs ? "Zadejte aspoň téma nebo náznak nápadu do názvu." : "Enter at least a topic or a hint of an idea in the title.");
      return;
    }
    
    setIsBrainstorming(true);
    try {
      const prompt = `Jsi inovační asistent Studia Synthesis. Uživatel chce navrhnout vylepšení pro specialisty (Karel, Lucie, Dáša, František).
      Nápad/Téma: "${newProposal.title}"
      Základní popis: "${newProposal.description}"
      Typ podnětu: ${newProposal.category}
      
      Tvým úkolem je nápad technicky rozpracovat. Vrať výsledek v tomto formátu (v češtině):
      NÁZEV: [vystižný profi název]
      POPIS: [detailní technický popis fungování nebo hlášení chyby]
      PROBLÉM: [jaký konkrétní problém to v dílně/zahradě řeší]
      DOPAD: [odhadovaný přínos pro uživatele nebo stabilitu systému]`;

      const response = await askGuru(CharacterType.LUCIE, prompt, [], undefined, undefined, 'gemini-3-flash-preview');
      
      const lines = response.split('\n');
      const getVal = (key: string) => {
        const line = lines.find(l => l.toUpperCase().includes(key));
        return line ? line.split(':')[1]?.trim() : "";
      };

      setNewProposal(prev => ({
        ...prev,
        title: getVal('NÁZEV') || prev.title,
        description: getVal('POPIS') || response.replace(/NÁZEV:.*|PROBLÉM:.*|DOPAD:.*/gi, '').trim(),
        problem: getVal('PROBLÉM'),
        impact: getVal('DOPAD')
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsBrainstorming(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const proposal: InnovationProposal = {
      id: Math.random().toString(36).substr(2, 9),
      title: newProposal.title,
      category: newProposal.category,
      specialist: newProposal.specialist,
      description: newProposal.description,
      // Metadata added to description text if not explicitly in object
      author: currentUser?.name || 'Operator',
      authorTier: currentUser?.path || UserPath.PRO,
      votes: 1,
      status: ProposalStatus.PENDING,
      timestamp: new Date(),
      userVoted: true
    };
    // Special hack to store problem/impact inside the object if needed, 
    // or we can just append it to description as we did before.
    // For the detail view, we'll assume they are stored as [PROBLÉM]: tags if appended.
    if (newProposal.problem || newProposal.impact) {
        proposal.description += `\n\n[PROBLÉM]: ${newProposal.problem}\n[DOPAD]: ${newProposal.impact}`;
    }

    setProposals([proposal, ...proposals]);
    alert(isCs ? "Uloženo do backlogu." : "Saved to backlog.");
    setView('list');
    setNewProposal({ title: '', description: '', category: InnovationCategory.FEATURE, specialist: CharacterType.KAREL, problem: '', impact: '' });
  };

  const getStatusInfo = (status: ProposalStatus) => {
    switch (status) {
      case ProposalStatus.PENDING: return { label: isCs ? 'Čeká' : 'Pending', color: 'text-zinc-400', icon: Clock };
      case ProposalStatus.DEVELOPMENT: return { label: isCs ? 'Vývoj' : 'Dev', color: 'text-blue-500', icon: Hammer };
      case ProposalStatus.DEPLOYED: return { label: isCs ? 'Live' : 'Live', color: 'text-emerald-500', icon: CheckCircle2 };
    }
  };

  // UI for Detailed Proposal Window
  const DetailView = ({ proposal, onClose }: { proposal: InnovationProposal, onClose: () => void }) => {
    const cat = CATEGORY_CONFIG[proposal.category];
    const spec = CHARACTER_CONFIG[proposal.specialist];
    const status = getStatusInfo(proposal.status);
    
    // Parse problem and impact if they are in the description
    const problemMatch = proposal.description.match(/\[PROBLÉM\]:\s*(.*)/i);
    const impactMatch = proposal.description.match(/\[DOPAD\]:\s*(.*)/i);
    const cleanDesc = proposal.description.replace(/\[PROBLÉM\]:.*|\[DOPAD\]:.*/gi, '').trim();

    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
        <div className="bg-white w-full max-w-lg rounded-[3.5rem] p-8 border border-black/5 shadow-2xl relative z-10 custom-scroll overflow-y-auto max-h-[90vh] space-y-8">
          <header className="flex justify-between items-start">
            <div className="space-y-2">
               <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded-lg ${cat.bg} ${cat.color} flex items-center gap-1.5`}>
                    <cat.icon className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{cat.label}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-lg ${spec.bg} ${spec.color} flex items-center gap-1.5`}>
                    <spec.icon className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{spec.name}</span>
                  </div>
               </div>
               <h3 className="text-2xl font-black uppercase tracking-tight leading-none text-zinc-900">{proposal.title}</h3>
               <div className="flex items-center gap-4 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(proposal.timestamp).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><status.icon className={`w-3 h-3 ${status.color}`} /> {status.label}</span>
               </div>
            </div>
            <button onClick={onClose} className="p-3 bg-zinc-50 rounded-full hover:bg-zinc-100 transition-colors"><X className="w-6 h-6" /></button>
          </header>

          <div className="space-y-6">
            <section className="space-y-3">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">Technický popis</h4>
               <p className="text-sm font-medium leading-relaxed text-zinc-600 whitespace-pre-line bg-zinc-50 p-6 rounded-[2rem] border border-black/[0.03]">
                 {cleanDesc}
               </p>
            </section>

            <div className="grid grid-cols-1 gap-4">
               {problemMatch && (
                 <div className="p-6 rounded-[2.5rem] bg-purple-50 border border-purple-100 flex gap-5 items-start">
                    <Target className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                    <div>
                      <h5 className="text-[10px] font-black uppercase text-purple-900 mb-1">Řešený Problém</h5>
                      <p className="text-[11px] font-bold text-purple-800/70 uppercase leading-snug">{problemMatch[1]}</p>
                    </div>
                 </div>
               )}
               {impactMatch && (
                 <div className="p-6 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 flex gap-5 items-start">
                    <Lightbulb className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                    <div>
                      <h5 className="text-[10px] font-black uppercase text-emerald-900 mb-1">Očekávaný Dopad</h5>
                      <p className="text-[11px] font-bold text-emerald-800/70 uppercase leading-snug">{impactMatch[1]}</p>
                    </div>
                 </div>
               )}
            </div>
          </div>

          <footer className="pt-6 border-t border-black/[0.05] flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="p-2.5 bg-zinc-100 rounded-2xl"><User className="w-5 h-5 text-zinc-400" /></div>
                <div>
                  <span className="text-[10px] font-black uppercase text-zinc-900 block leading-none">{proposal.author}</span>
                  <span className="text-[8px] text-zinc-400 font-black uppercase tracking-widest mt-1">Synthesis Operator [{proposal.authorTier}]</span>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <span className="text-xl font-black">{proposal.votes}</span>
                <button 
                  onClick={() => handleVote(proposal.id)}
                  className={`p-4 rounded-2xl transition-all active:scale-90 ${proposal.userVoted ? 'bg-purple-600 text-white' : 'bg-zinc-100 text-zinc-400'}`}
                >
                  <Zap className={`w-5 h-5 ${proposal.userVoted ? 'fill-current' : ''}`} />
                </button>
             </div>
          </footer>
        </div>
      </div>
    );
  };

  if (view === 'form') {
    return (
      <div className="space-y-6 max-w-md mx-auto py-2 animate-in fade-in slide-in-from-right-4 duration-500">
        <button 
          onClick={() => setView('list')}
          className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400 hover:text-black transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {isCs ? 'Zpět na přehled' : 'Back to Overview'}
        </button>

        <header className="border-l-4 border-purple-500 pl-4 py-1">
          <h2 className="text-xl font-black uppercase tracking-tight">
            {isCs ? 'Přidat technický podnět' : 'Add Technical Input'}
          </h2>
          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest opacity-60">Synthesis R&D Protocol v2.1</p>
        </header>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase text-zinc-400 ml-2 tracking-widest">{isCs ? 'Typ podnětu' : 'Input Category'}</label>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setNewProposal({...newProposal, category: key as InnovationCategory})}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all ${newProposal.category === key ? 'bg-white border-purple-500 shadow-sm' : 'bg-zinc-50 border-transparent opacity-60'}`}
                  >
                    <cfg.icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                    <span className="text-[8px] font-black uppercase tracking-tight">{cfg.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase text-zinc-400 ml-2 tracking-widest">{isCs ? 'Název podnětu' : 'Input Title'}</label>
              <input 
                required
                placeholder={isCs ? "např. Detekce zkratu AR..." : "e.g. AR Short Circuit..."} 
                className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-purple-500 transition-all"
                value={newProposal.title}
                onChange={e => setNewProposal({...newProposal, title: e.target.value})}
              />
            </div>

            <div className="flex gap-1">
              {Object.entries(CHARACTER_CONFIG).map(([type, config]) => (
                <button 
                  key={type}
                  type="button"
                  onClick={() => setNewProposal({...newProposal, specialist: type as CharacterType})}
                  className={`flex-1 p-2 rounded-xl border transition-all flex flex-col items-center gap-1 ${newProposal.specialist === type ? 'bg-white border-purple-500 shadow-sm' : 'bg-transparent border-transparent opacity-40'}`}
                >
                  <config.icon className={`w-4 h-4 ${config.color}`} />
                  <span className="text-[7px] font-black uppercase">{config.name}</span>
                </button>
              ))}
            </div>

            <button 
              type="button"
              onClick={handleBrainstorm}
              disabled={isBrainstorming}
              className={`w-full py-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all group ${isBrainstorming ? 'bg-zinc-100 border-zinc-200 text-zinc-400' : 'bg-white border-purple-200 text-purple-600 hover:bg-purple-50 active:scale-95'}`}
            >
              {isBrainstorming ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
              <span className="text-[9px] font-black uppercase tracking-widest">
                {isBrainstorming ? (isCs ? 'Generuji detaily...' : 'Generating...') : (isCs ? 'Brainstorming s AI' : 'Brainstorm with AI')}
              </span>
              {!isBrainstorming && <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />}
            </button>

            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase text-zinc-400 ml-2 tracking-widest">{isCs ? 'Detailní popis' : 'Detailed Description'}</label>
              <textarea 
                placeholder={isCs ? "Popište podrobně vaši vizi nebo problém..." : "Describe your vision or problem in detail..."}
                className="w-full h-24 bg-zinc-50 border border-black/5 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-purple-500 resize-none transition-all"
                value={newProposal.description}
                onChange={e => setNewProposal({...newProposal, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="relative">
                <Target className="absolute left-3 top-3 w-3 h-3 text-zinc-300" />
                <input 
                  placeholder={isCs ? "Jaký problém to řeší?" : "What problem does it solve?"}
                  className="w-full bg-zinc-50 border border-black/5 rounded-xl pl-9 pr-4 py-3 text-[10px] font-bold outline-none focus:border-purple-500"
                  value={newProposal.problem}
                  onChange={e => setNewProposal({...newProposal, problem: e.target.value})}
                />
              </div>
              <div className="relative">
                <Lightbulb className="absolute left-3 top-3 w-3 h-3 text-zinc-300" />
                <input 
                  placeholder={isCs ? "Jaký to bude mít dopad?" : "What will be the impact?"}
                  className="w-full bg-zinc-50 border border-black/5 rounded-xl pl-9 pr-4 py-3 text-[10px] font-bold outline-none focus:border-purple-500"
                  value={newProposal.impact}
                  onChange={e => setNewProposal({...newProposal, impact: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full py-4 rounded-xl bg-purple-600 text-white text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl hover:bg-purple-700 transition-colors">
            <Send className="w-4 h-4" /> {isCs ? 'Uložit do registru Synthesis' : 'Save to Synthesis Registry'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-xl mx-auto py-1 animate-in fade-in duration-500">
      {selectedProposal && <DetailView proposal={selectedProposal} onClose={() => setSelectedProposal(null)} />}
      
      <div className="flex justify-between items-end">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-900/60">
          {isCs ? 'Innovation Backlog (Dle reakcí)' : 'Innovation Backlog (By Reactions)'}
        </h4>
        <button 
          onClick={() => setView('form')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          <Plus className="w-3 h-3" />
          {isCs ? 'Navrhnout inovaci' : 'New Innovation'}
        </button>
      </div>

      <div className="space-y-2">
        {displayedProposals.map((p) => {
          const cat = CATEGORY_CONFIG[p.category];
          const spec = CHARACTER_CONFIG[p.specialist];
          return (
            <div 
              key={p.id} 
              onClick={() => setSelectedProposal(p)}
              className="p-5 rounded-[2.5rem] bg-white border border-black/5 shadow-sm hover:border-purple-100 hover:shadow-xl transition-all flex gap-5 items-center group cursor-pointer"
            >
              <div className="flex flex-col items-center gap-1 shrink-0">
                <button 
                  onClick={(e) => handleVote(p.id, e)}
                  className={`p-3 rounded-xl transition-all active:scale-90 ${p.userVoted ? 'bg-purple-600 text-white shadow-md' : 'bg-zinc-100 text-zinc-400 hover:text-purple-600'}`}
                >
                  <Zap className={`w-4 h-4 ${p.userVoted ? 'fill-current' : ''}`} />
                </button>
                <span className="text-[11px] font-black">{p.votes}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <div className={`px-2 py-0.5 rounded-md ${cat.bg} ${cat.color} flex items-center gap-1`}>
                    <cat.icon className="w-3 h-3" />
                    <span className="text-[7.5px] font-black uppercase tracking-widest">{cat.label}</span>
                  </div>
                  <div className={`px-2 py-0.5 rounded-md ${spec.bg} ${spec.color} flex items-center gap-1`}>
                    <spec.icon className="w-3 h-3" />
                    <span className="text-[7.5px] font-black uppercase tracking-widest">{spec.name}</span>
                  </div>
                  <span className="text-[7px] text-zinc-300 font-bold ml-auto">{new Date(p.timestamp).toLocaleDateString()}</span>
                </div>
                <h5 className="text-[12px] font-black uppercase text-zinc-900 leading-none mb-2 group-hover:text-purple-600 transition-colors tracking-tight">
                  {p.title}
                </h5>
                <p className="text-[10px] text-zinc-400 uppercase leading-tight line-clamp-2 font-medium">
                  {p.description.replace(/\[PROBLÉM\]:.*|\[DOPAD\]:.*/gi, '').trim()}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-200 group-hover:text-purple-500 transition-colors" />
            </div>
          );
        })}
      </div>

      {!showAll && sortedProposals.length > 5 && (
        <button 
          onClick={() => setShowAll(true)}
          className="w-full py-4 rounded-2xl bg-zinc-50 border border-black/5 text-zinc-400 hover:text-black hover:border-black/10 transition-all flex items-center justify-center gap-2 group"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">{isCs ? 'Zobrazit dalších' : 'Show more'} ({sortedProposals.length - 5})</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </button>
      )}

      {showAll && (
        <button 
          onClick={() => setShowAll(false)}
          className="w-full py-4 rounded-2xl bg-zinc-50 border border-black/5 text-zinc-400 hover:text-black transition-all flex items-center justify-center gap-2"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">{isCs ? 'Zobrazit méně' : 'Show less'}</span>
        </button>
      )}

      <div className="pt-4 text-center">
        <p className="text-[7px] text-zinc-300 font-black uppercase tracking-[0.5em]">
          Studio Synthesis • Community Feedback Unit • 2026
        </p>
      </div>
    </div>
  );
};
