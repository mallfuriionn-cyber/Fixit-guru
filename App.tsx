
import React, { useState, useRef, useEffect, memo } from 'react';
import { 
  CharacterType, Message, ChatSession, UserPath, UserProfile, 
  CmdSection, DisplayMode, BgPattern, UITheme, AuthMode, ViewState, UserRole, TerminalMail
} from './types';
import { askGuru, checkSafety } from './geminiService';
import { 
  Wrench, BookOpen, Leaf, Hammer, ArrowUp, X, LayoutGrid, Fingerprint, Activity, 
  ArrowRight, Radar, Mail, Lock, ChevronRight, Zap, Globe, ShieldCheck, 
  Microscope, Cpu, Sliders, RefreshCcw, Trash2, AlertTriangle, User, LogOut, Settings,
  Shield, Bell, Layout, FileText, LayoutList, ShieldAlert, CheckCircle2, Info, Users, Crown, Star, History, ClipboardList, Save, Send,
  Camera, Mic, ShieldQuestion, Paperclip, Code, UserPlus, Search, Download, Radio, Boxes, Power, ArrowLeftRight
} from 'lucide-react';

// Sekce
import { HelpContent } from './sections/Help';
import { AboutContent } from './sections/About';
import { EcoContent } from './sections/Eco';
import { LegislationContent } from './sections/Legislation';
import { AppearanceContent } from './sections/Appearance';
import { FeedbackContent } from './sections/Feedback';
import { ExpertContent } from './sections/Expert';
import { HistoryContent } from './sections/History';
import { AdminContent } from './sections/Admin';
import { MyRepairsContent } from './sections/MyRepairs';
import { IdentityContent } from './sections/Identity';
import { CommunityWall } from './sections/CommunityWall';
import { LegalGuardian } from './sections/LegalGuardian';

interface AppearanceConfig {
  displayMode: DisplayMode;
  bgPattern: BgPattern;
  accentColor: string;
  fontScale: number;
  hudTransparency: number;
  isBoldMode: boolean;
  activeTheme: UITheme;
}

const STORAGE_KEY = 'synthesis_appearance_v285';
const USER_KEY = 'synthesis_user_v285';
const ALL_USERS_KEY = 'synthesis_all_users_v285';
const SESSIONS_KEY = 'synthesis_sessions_v285';

const translations = {
  cs: {
    appTitle: "Opravář Guru",
    appVersion: "v2.89",
    studioName: "STUDIO SYNTHESIS",
    commandCenter: "HLAVNÍ PANEL",
    identity: "OPERÁTOR",
    enterPortal: "SOUHLASÍM A VSTOUPIT",
    integrityReady: "SYSTÉM PŘIPRAVEN",
    consentTitle: "BEZPEČNOSTNÍ PROTOKOL",
    consentDesc: "Vstupem potvrzujete, že si dáváte pozor. Studio Synthesis neručí za to, když se do něčeho vrtáte neodborně.",
    protocolSaved: "NASTAVENÍ ULOŽENO",
    safetyAlert: "⚠️ POZOR NA ELEKTRIKU!",
    recording: "NAHRÁVÁM...",
    menu: {
      wall: { title: "Komunita", desc: "Novinky a rady od ostatních" },
      history: { title: "Historie", desc: "Co jsme už řešili" },
      help: { title: "Nápověda", desc: "Jak to celé funguje" },
      eco: { title: "Eko-stopa", desc: "Kolik jsme toho ušetřili" },
      legislation: { title: "Právo a SOS", desc: "Pravidla a pomoc s prodejci" },
      appearance: { title: "Vzhled", desc: "Nastavení barev a písma" },
      feedback: { title: "Návrhy", desc: "Co bychom měli vylepšit" },
      expert: { title: "Nastavení", desc: "Ladění systému" },
      admin: { title: "Správa", desc: "Administrace" },
      identity: { title: "Můj Profil", desc: "Kdo jsem v systému" }
    }
  },
  en: {
    appTitle: "FixIt Guru",
    appVersion: "v2.89",
    studioName: "STUDIO SYNTHESIS",
    commandCenter: "COMMAND CENTER",
    identity: "OPERATOR",
    enterPortal: "I AGREE & ENTER",
    integrityReady: "CORE INTEGRITY: NOMINAL",
    consentTitle: "LIABILITY PROTOCOL",
    consentDesc: "By entering, you confirm that Studio Synthesis holds no liability for any property damage or personal injury.",
    protocolSaved: "PROTOCOL SYNCED",
    safetyAlert: "⚠️ HIGH VOLTAGE RISK!",
    recording: "RECORDING...",
    menu: {
      wall: { title: "Wall", desc: "News & Community" },
      history: { title: "History", desc: "Neural Archive" },
      help: { title: "Help", desc: "Methodology" },
      eco: { title: "Eco-Vision", desc: "Merit Meter" },
      legislation: { title: "Rights & Protection", desc: "Legislation & assistants" },
      appearance: { title: "HUD", desc: "UI Tuning" },
      feedback: { title: "Innovation", desc: "Backlog" },
      expert: { title: "Expert", desc: "Calibration" },
      admin: { title: "Admin", desc: "Oversight" },
      identity: { title: "Profile", desc: "Log & Identity" }
    }
  }
};

const CHARACTER_CONFIG: Record<CharacterType, any> = {
  [CharacterType.KAREL]: { 
    name: 'Karel', color: 'text-blue-400', icon: Wrench, hex: '#3b82f6', desc: 'TECHNICKÝ MOZEK', 
    detail: 'Elektronika / Schémata', dna: 'dna-karel',
    consent: 'Rozumím, že budu pracovat s elektrikou a dávám si pozor na statickou elektřinu.'
  },
  [CharacterType.LUCIE]: { 
    name: 'Lucie', color: 'text-amber-400', icon: BookOpen, hex: '#f59e0b', desc: 'TRPĚLIVÁ RÁDKYNĚ', 
    detail: 'Manuály / Návody', dna: 'dna-lucie',
    consent: 'Budu sledovat návod krok za krokem a nic nepřeskočím.'
  },
  [CharacterType.DASA]: { 
    name: 'Dáša', color: 'text-emerald-400', icon: Leaf, hex: '#10b981', desc: 'ZAHRADA A PŘÍRODA', 
    detail: 'Kytky / Eko-rady', dna: 'dna-dasa',
    consent: 'Respektuji přírodu a nepoužívám zbytečnou chemii.'
  },
  [CharacterType.FRANTISEK]: { 
    name: 'František', color: 'text-orange-400', icon: Hammer, hex: '#f97316', desc: 'CHLAP NA HRUBOU PRÁCI', 
    detail: 'Stavba / Dřevo', dna: 'dna-frantisek',
    consent: 'Beru si rukavice a brýle. Bezpečnost je u mě na prvním místě.'
  },
  [CharacterType.REKLAMACE]: { 
    name: 'Reklamace', color: 'text-red-400', icon: ShieldAlert, hex: '#ef4444', desc: 'STRÁŽCE VAŠICH PRÁV', 
    detail: 'Právo / SOS Pomoc', dna: 'dna-reklamace',
    consent: 'Vím, že asistent mi dává rady, ne právní zastoupení.'
  },
};

const INITIAL_USERS: UserProfile[] = [
  {
    id: 'u-guru',
    name: 'Mallfurion',
    email: 'mallfurion@synthesis.studio',
    bio: 'Hlavní operátor a zakladatel sítě Synthesis.',
    isPublic: true,
    path: UserPath.PRO,
    role: UserRole.OWNER,
    wasteSavedTotal: 245.8,
    moneySavedTotal: 124500,
    lastSpecialist: CharacterType.KAREL,
    biometryEnabled: true,
    gdprAccepted: true,
    liabilityAccepted: true,
    inventory: [],
    mail: [],
    lightningCount: 156,
    isAdmin: true
  }
];

const SynthesisLogo = memo(() => (
  <div className="flex items-center gap-1 shrink-0">
    <Wrench className="w-4 h-4 text-white" />
    <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
  </div>
));

const FormattedChatMessage: React.FC<{ 
  content: string; 
  role: 'user' | 'assistant';
  activeChar: CharacterType | null;
  onSwitchChar: (target: CharacterType) => void;
}> = ({ content, role, activeChar, onSwitchChar }) => {
  if (role === 'user') return <p className="text-[14px] font-medium leading-relaxed">{content}</p>;
  
  const processBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-black text-white">{part.slice(2, -2)}</strong>;
      return part;
    });
  };

  const shouldSuggestLucie = activeChar === CharacterType.KAREL && 
    (content.toLowerCase().includes('lucie') || content.toLowerCase().includes('lucii'));

  const lines = content.split('\n');
  return (
    <div className="space-y-4">
      {lines.map((line, i) => {
        const trimLine = line.trim();
        if (!trimLine) return <div key={i} className="h-1" />;
        if (trimLine.startsWith('# ')) return <h4 key={i} className="text-xs font-black uppercase tracking-widest text-white border-b border-white/10 pb-1 mt-4 mb-2 flex items-center gap-2"><div className="w-1 h-3 bg-white rounded-full" />{trimLine.replace('# ', '')}</h4>;
        if (trimLine.startsWith('! ')) return <div key={i} className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 flex gap-3 my-2"><ShieldAlert className="w-4 h-4 text-red-500 shrink-0" /><p className="text-[12px] font-bold text-red-100 leading-tight">{trimLine.replace('! ', '')}</p></div>;
        if (trimLine.startsWith('@ ')) return <div key={i} className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between"><div className="flex items-center gap-3"><Activity className="w-4 h-4 text-blue-400 shrink-0" /><span className="text-[11px] font-black uppercase text-blue-100">{trimLine.replace('@ ', '')}</span></div><div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" /></div>;
        return <p key={i} className="text-[14px] font-medium leading-relaxed text-zinc-300">{processBold(line)}</p>;
      })}

      {shouldSuggestLucie && (
        <div className="pt-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
           <button 
             onClick={() => onSwitchChar(CharacterType.LUCIE)}
             className="w-full py-5 rounded-2xl bg-amber-500 text-black font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-white hover:scale-[1.02] transition-all shadow-[0_20px_40px_rgba(245,158,11,0.2)] group"
           >
             <div className="p-1.5 bg-black/10 rounded-lg">
                <ArrowLeftRight className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
             </div>
             <span>Zapnout Lucii: Pomůže mi s návodem</span>
           </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<'cs' | 'en'>(navigator.language.startsWith('cs') ? 'cs' : 'en');
  const t = (translations as any)[lang];
  const isCs = lang === 'cs';

  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(ALL_USERS_KEY);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [view, setView] = useState<ViewState>('landing');
  const [activeCmdSection, setActiveCmdSection] = useState<CmdSection>('none');
  const [activeChar, setActiveChar] = useState<CharacterType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [pendingImage, setPendingImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : allUsers[0];
  });

  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem(SESSIONS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [appearance, setAppearance] = useState<AppearanceConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      displayMode: 'dark', bgPattern: 'studio', accentColor: '#3b82f6', fontScale: 100, hudTransparency: 0.98, isBoldMode: false, activeTheme: 'default'
    };
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
      setAllUsers(prev => prev.map(u => u.id === currentUser.id ? currentUser : u));
    }
  }, [currentUser]);

  useEffect(() => {
    if (activeSessionId && messages.length > 0) {
      setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages } : s));
    } else if (!activeSessionId && messages.length > 0 && activeChar) {
      const newId = Date.now().toString();
      const newSession: ChatSession = {
        id: newId, character: activeChar, messages, timestamp: new Date(),
        title: messages[0].content.substring(0, 40) + (messages[0].content.length > 40 ? '...' : '')
      };
      setSessions(prev => [newSession, ...prev]);
      setActiveSessionId(newId);
    }
  }, [messages, activeSessionId, activeChar]);

  const handleUpdateUser = (data: Partial<UserProfile>) => {
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, ...data } : null);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(USER_KEY);
    setView('landing');
    setActiveCmdSection('none');
    setIsCommandCenterOpen(false);
  };

  const handleConfirmAndEnter = () => {
    if (!activeChar) return;
    setMessages([]);
    setActiveSessionId(null);
    setView('chat');
  };

  const handleLoadSession = (session: ChatSession) => {
    setActiveChar(session.character);
    setMessages(session.messages);
    setActiveSessionId(session.id);
    setView('chat');
    setActiveCmdSection('none');
    setIsCommandCenterOpen(false);
  };

  const handleSwitchSpecialist = (target: CharacterType) => {
    setActiveChar(target);
    const systemNotice: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `# Předání slova: ${CHARACTER_CONFIG[target].name}\nPrávě jsem se připojila k hovoru. Přebírám to jako expertka na ${CHARACTER_CONFIG[target].desc}. S čím přesně potřebujete pomoct?`,
      character: target,
      timestamp: new Date(),
      isSafetyWarning: false
    };
    setMessages(prev => [...prev, systemNotice]);
  };

  const handleSend = async () => {
    if ((!inputText.trim() && !pendingImage) || !activeChar) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: inputText, character: activeChar, timestamp: new Date(), imageUrl: pendingImage || undefined };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputText;
    const currentImage = pendingImage;
    setInputText('');
    setPendingImage(null);
    setLoading(true);
    try {
      const guruResponse = await askGuru(activeChar, currentInput || (isCs ? "[Vložena fotka]" : "[Media analysis]"), messages.map(m => ({ role: m.role, content: m.content })), currentImage || undefined);
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: guruResponse, character: activeChar, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const LandingView = () => (
    <div className="h-screen w-full flex flex-col relative overflow-hidden bg-[#050506] text-white">
      <div 
        className={`active-aura absolute top-1/2 left-1/2 rounded-full blur-[180px] opacity-30 pointer-events-none transition-all duration-1000 w-[120vh] h-[120vh] -translate-x-1/2 -translate-y-1/2`}
        style={{ 
          backgroundColor: activeChar ? CHARACTER_CONFIG[activeChar].hex : '#3b82f6',
        }}
      />

      <header className="h-12 px-6 md:px-10 flex justify-between items-center bg-black/20 backdrop-blur-3xl border-b border-white/[0.03] z-50 shrink-0">
        <div className="flex items-center gap-3">
           <SynthesisLogo />
           <div className="flex flex-col">
              <span className="font-black text-[9px] uppercase tracking-[0.4em] text-white leading-none">{t.studioName}</span>
              <span className="text-[6px] font-black text-blue-500 uppercase tracking-widest mt-1">ZABEZPEČENÝ PŘÍSTUP</span>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={() => setActiveCmdSection('identity')} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
             <Fingerprint className="w-3 h-3 text-blue-400" /> {currentUser?.name || t.identity}
           </button>
           <button onClick={() => setIsCommandCenterOpen(true)} className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-600 transition-all">
             <LayoutGrid className="w-3.5 h-3.5" />
           </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-evenly py-2 px-4 relative z-10 overflow-hidden">
        <div className="text-center space-y-1 animate-in fade-in slide-in-from-top-4 duration-1000">
           <div className="inline-block px-3 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 text-[8px] font-black uppercase tracking-[0.3em]">
              VERZE {t.appVersion}
           </div>
           <h1 className="text-5xl md:text-7xl font-black uppercase tracking-[-0.05em] text-white leading-none drop-shadow-2xl">
              OPRAVÁŘ <span className="text-blue-500">GURU</span>
           </h1>
           <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.6em] mt-1">{t.integrityReady}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-10 w-full max-w-2xl animate-in fade-in zoom-in-95 duration-700 delay-200">
          {Object.entries(CHARACTER_CONFIG)
            .filter(([key]) => key !== CharacterType.REKLAMACE)
            .map(([key, cfg]) => {
            const isActive = activeChar === key;
            return (
              <button 
                key={key} 
                onClick={() => setActiveChar(key as CharacterType)}
                className={`card-perspective group relative flex flex-col items-center justify-center text-center gap-2 rounded-[2rem] p-2 transition-all duration-500 ${isActive ? 'active' : ''}`}
              >
                 {isActive && (
                   <div className={`absolute inset-0 z-0 pointer-events-none rounded-[2rem] ${cfg.dna}`} />
                 )}
                 <div className={`p-4 md:p-5 rounded-[1.8rem] transition-all duration-700 relative z-10 flex items-center justify-center ${isActive ? 'bg-white text-black scale-110 shadow-2xl' : cfg.color + ' group-hover:scale-105'}`}>
                    {React.createElement(cfg.icon, { className: "w-8 h-8 md:w-12 md:h-12 floating-accent" })}
                 </div>
                 <div className="relative z-10 px-1">
                    <span className={`text-lg md:text-2xl font-black uppercase tracking-tighter block leading-none transition-all duration-500 ${isActive ? 'text-white' : 'text-zinc-300'}`}>{cfg.name}</span>
                    <span className={`text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] mt-1.5 block transition-all duration-500 ${isActive ? cfg.color : 'text-zinc-500 opacity-60'}`}>{cfg.desc}</span>
                 </div>
              </button>
            );
          })}
        </div>

        {/* SOS BUTTON */}
        <div className="absolute bottom-12 right-12 z-50 animate-in fade-in zoom-in duration-1000">
           <button 
             onClick={() => setActiveCmdSection('legal')}
             className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-red-600 transition-all group backdrop-blur-xl shadow-2xl"
           >
              <ShieldAlert className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white transition-colors">
                {isCs ? 'Pomocník s reklamací' : 'Claim Assistant'}
              </span>
           </button>
        </div>

        <div className={`w-full max-w-lg transition-all duration-700 transform ${activeChar ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
           <div className="bg-white/5 backdrop-blur-3xl p-5 md:p-7 rounded-[3rem] border border-white/10 shadow-2xl space-y-4 relative overflow-hidden group/gate">
              <div className="flex items-start gap-4 relative z-10 text-left">
                 <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 group-hover/gate:rotate-6 transition-transform shrink-0">
                    <ShieldAlert className="w-6 h-6 text-red-500" />
                 </div>
                 <div className="flex-1">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white leading-none">{t.consentTitle}</h3>
                    <p onClick={() => setActiveCmdSection('legislation')} className="text-[8px] text-zinc-300 font-bold leading-tight mt-2 uppercase tracking-tighter opacity-80 cursor-pointer hover:text-blue-400 transition-colors">{t.consentDesc}</p>
                    <p onClick={() => setActiveCmdSection('legislation')} className="text-[8.5px] text-zinc-100 font-black leading-tight mt-1.5 uppercase tracking-tighter cursor-pointer hover:text-blue-300 transition-colors">{activeChar ? CHARACTER_CONFIG[activeChar].consent : ''}</p>
                 </div>
              </div>
              <button onClick={handleConfirmAndEnter} className={`w-full py-5 rounded-[1.8rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl transition-all flex items-center justify-center gap-4 group/btn active:scale-95 ${activeChar ? 'bg-white text-black hover:bg-blue-500 hover:text-white' : 'bg-white/5 text-white/20'}`}>
                 {t.enterPortal} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
              </button>
           </div>
        </div>
      </main>

      <footer className="h-8 md:h-10 px-10 border-t border-white/[0.05] flex items-center justify-between bg-black/40 backdrop-blur-md shrink-0 z-50">
         <p className="text-[6px] font-black text-zinc-700 uppercase tracking-[0.5em]">SYNTHESIS TERMINAL v2.89 • 2026</p>
         <div className="flex gap-6">
            <button onClick={() => setActiveCmdSection('legislation')} className="text-[6px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">Právní podmínky</button>
            <button onClick={() => setActiveCmdSection('legislation')} className="text-[6px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">Zásady ochrany</button>
         </div>
      </footer>
    </div>
  );

  const SectionWindow = ({ section }: { section: CmdSection }) => {
    if (section === 'none') return null;
    
    if (section === 'legal') {
      return <LegalGuardian lang={lang} onClose={() => setActiveCmdSection('none')} />;
    }

    const renderContent = () => {
      switch(section) {
        case 'wall': return <CommunityWall lang={lang} />;
        case 'identity': return <IdentityContent lang={lang} user={currentUser!} allUsers={allUsers} onUpdateUser={handleUpdateUser} onLogout={handleLogout} onSendMessage={()=>{}} />;
        case 'history': return <HistoryContent lang={lang} sessions={sessions} onSelect={handleLoadSession} onDelete={id => setSessions(prev => prev.filter(s => s.id !== id))} characterConfig={CHARACTER_CONFIG} />;
        case 'help': return <HelpContent lang={lang} />;
        case 'about': return <AboutContent lang={lang} />;
        case 'eco': return <EcoContent lang={lang} />;
        case 'legislation': return <LegislationContent lang={lang} onOpenLegal={() => setActiveCmdSection('legal')} />;
        case 'appearance': return <AppearanceContent lang={lang} {...appearance} setDisplayMode={m => setAppearance(p => ({...p, displayMode: m}))} setBgPattern={p => setAppearance(prev => ({...prev, bgPattern: p}))} setAccentColor={c => setAppearance(prev => ({...prev, accentColor: c}))} setHudTransparency={v => setAppearance(prev => ({...prev, hudTransparency: v}))} setIsBoldMode={v => setAppearance(prev => ({...prev, isBoldMode: v}))} setFontScale={v => setAppearance(prev => ({...prev, fontScale: v}))} setActiveTheme={tValue => setAppearance(prev => ({...prev, activeTheme: tValue}))} />;
        case 'feedback': return <FeedbackContent lang={lang} currentUser={currentUser} />;
        case 'expert': return <ExpertContent lang={lang} personalityGain={0.6} setPersonalityGain={()=>{}} aiCadence={0.5} setAiCadence={()=>{}} isTesting={false} runSynthesisTest={()=>{}} testStage="NOMINÁLNÍ" />;
        case 'admin': return <AdminContent lang={lang} users={allUsers} onUpdateUser={(id, data) => setAllUsers(prev => prev.map(u => u.id === id ? { ...u, ...data } : u))} />;
        default: return null;
      }
    };

    return (
      <div className="fixed inset-0 z-[200] hud-glass flex items-center justify-center p-0 md:p-8 animate-in fade-in duration-300">
        <div className={`w-full h-full border border-white/10 overflow-hidden flex flex-col rounded-none md:rounded-[3rem] shadow-2xl bg-[#0a0a0c] text-white`}>
          <div className="h-16 px-8 border-b border-white/10 flex justify-between items-center bg-black/40 backdrop-blur-xl shrink-0">
            <h3 className="text-lg font-black uppercase tracking-[0.4em] text-white">{(t.menu as any)[section]?.title}</h3>
            <button onClick={() => setActiveCmdSection('none')} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll p-6 md:p-10 max-w-6xl mx-auto w-full">{renderContent()}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={`h-full transition-all duration-700 bg-[#050506] text-white ${appearance.isBoldMode ? 'font-bold' : ''}`}>
      {view === 'landing' ? <LandingView /> : (
        <div className="flex flex-col h-full overflow-hidden relative bg-[#050506]">
          <header className="h-14 px-6 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-3xl sticky top-0 z-50 shrink-0">
            <div className="flex items-center gap-3">
              <SynthesisLogo />
              <span className="font-black uppercase text-[10px] tracking-[0.3em] hidden sm:block text-white">{t.studioName}</span>
            </div>
            <div className="flex items-center gap-2">
               <button onClick={() => setIsCommandCenterOpen(true)} className="p-2 bg-white/5 rounded-xl hover:bg-blue-600 transition-all border border-white/10 text-white"><Radar className="w-4 h-4" /></button>
               <button onClick={() => setView('landing')} className="p-2 bg-white/5 rounded-xl hover:bg-red-500 transition-all border border-white/10 text-white"><Power className="w-4 h-4" /></button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scroll bg-black/10">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                <div className={`max-w-[85%] p-5 md:p-6 rounded-[2.5rem] shadow-2xl relative ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : (msg.isSafetyWarning ? 'bg-red-900/40 border-2 border-red-500/50 text-red-100 rounded-tl-sm' : 'bg-white/[0.03] border border-white/10 text-zinc-100 rounded-tl-sm backdrop-blur-md')}`}>
                  {msg.imageUrl && <img src={msg.imageUrl} className="w-full h-auto rounded-2xl mb-4 shadow-2xl border border-white/10" alt="Diagnostika" />}
                  <FormattedChatMessage 
                    content={msg.content} 
                    role={msg.role} 
                    activeChar={activeChar}
                    onSwitchChar={handleSwitchSpecialist}
                  />
                </div>
              </div>
            ))}
            {loading && <div className="p-3 bg-white/5 text-blue-400 rounded-full max-w-fit animate-pulse text-[8px] font-black uppercase px-6 border border-blue-500/20 backdrop-blur-md">Probíhá analýza...</div>}
            <div ref={chatEndRef} />
          </main>

          <footer className="p-4 md:p-6 border-t border-white/5 bg-black/40 backdrop-blur-3xl shrink-0">
            <div className="max-w-4xl mx-auto flex gap-3 items-center">
              <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setPendingImage(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }} />
              <div className="flex gap-1.5">
                 <button onClick={() => fileInputRef.current?.click()} className="p-4 bg-white/5 hover:bg-white/10 text-zinc-400 rounded-2xl border border-white/10 transition-all"><Camera className="w-4 h-4" /></button>
                 <button onClick={() => setInputText('')} className="p-4 bg-white/5 text-zinc-400 rounded-2xl border border-white/10"><Mic className="w-4 h-4" /></button>
              </div>
              <input 
                value={inputText} 
                onChange={e => setInputText(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSend()} 
                placeholder={isCs ? "Zeptejte se na opravu..." : "Ask about repair..."} 
                className="flex-1 bg-white/[0.03] border border-white/10 text-white rounded-full px-8 py-5 text-sm font-medium outline-none focus:border-blue-500 focus:bg-white/5 transition-all shadow-inner placeholder:text-zinc-600" 
              />
              <button onClick={handleSend} disabled={loading || (!inputText.trim() && !pendingImage)} className="p-5 bg-white text-black rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 transition-all disabled:opacity-20"><ArrowUp className="w-6 h-6" /></button>
            </div>
          </footer>
        </div>
      )}

      {isCommandCenterOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-3xl flex flex-col animate-in fade-in duration-500">
           <div className="h-20 px-10 flex justify-between items-center border-b border-white/5 shrink-0 bg-black/40">
              <h2 className="text-xl font-black uppercase tracking-[0.5em] text-white">{t.commandCenter}</h2>
              <button onClick={() => setIsCommandCenterOpen(false)} className="p-3 hover:bg-white/10 rounded-full text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
           </div>
           <div className="flex-1 overflow-y-auto custom-scroll py-10">
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-10 pb-10">
                {Object.entries(t.menu).map(([key, item]: any) => (
                  <button key={key} onClick={() => { setActiveCmdSection(key as CmdSection); setIsCommandCenterOpen(false); }} className="p-8 rounded-[3.5rem] bg-white/[0.03] border border-white/5 hover:bg-blue-600/90 hover:border-blue-400 transition-all text-left flex justify-between items-center group relative overflow-hidden shadow-2xl">
                    <div className="flex flex-col relative z-10">
                      <span className="text-xl font-black uppercase tracking-widest group-hover:translate-x-3 transition-transform text-white">{item.title}</span>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mt-2 group-hover:text-blue-100">{item.desc}</span>
                    </div>
                    <ChevronRight className="w-6 h-6 text-white/10 group-hover:text-white group-hover:translate-x-1 transition-all relative z-10" />
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-400/20 transition-colors" />
                  </button>
                ))}
              </div>
           </div>
        </div>
      )}
      {activeCmdSection !== 'none' && <SectionWindow section={activeCmdSection} />}
    </div>
  );
}
