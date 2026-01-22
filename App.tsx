
import React, { useState, useRef, useEffect, memo } from 'react';
import { CharacterType, Message, ChatSession, UserPath, UserProfile, CmdSection, DisplayMode, BgPattern, UITheme, AuthMode, ViewState, InnovationProposal, ProposalStatus, InnovationCategory } from './types.ts';
import { askGuru } from './geminiService.ts';
import { 
  Wrench, 
  BookOpen, 
  Leaf, 
  Hammer, 
  Mic, 
  ArrowUp,
  X,
  ChevronRight,
  HelpCircle,
  Info,
  Gavel,
  Eye,
  Beaker,
  Settings,
  LayoutGrid,
  ShieldCheck,
  Zap,
  ChevronDown,
  Archive,
  CheckCircle2,
  Globe,
  Fingerprint,
  LogIn,
  ShieldAlert,
  Scale,
  Cpu,
  Star,
  History,
  Terminal,
  RefreshCcw,
  Save,
  Activity,
  ArrowRight,
  Shield,
  Radar,
  Mail,
  Lock
} from 'lucide-react';

// Import Modular Contents
import { HelpContent } from './sections/Help.tsx';
import { AboutContent } from './sections/About.tsx';
import { EcoContent } from './sections/Eco.tsx';
import { LegislationContent } from './sections/Legislation.tsx';
import { AppearanceContent } from './sections/Appearance.tsx';
import { FeedbackContent } from './sections/Feedback.tsx';
import { ExpertContent } from './sections/Expert.tsx';
import { HistoryContent } from './sections/History.tsx';
import { AuthContent } from './sections/AuthContent.tsx';
import { AdminContent } from './sections/Admin.tsx';
import { MyRepairsContent } from './sections/MyRepairs.tsx';

// --- Localization Engine v2.52 ---
const translations = {
  cs: {
    appTitle: "FixIt Guru v2.52",
    tagline: "TERMINAL SYNC ULTIMATE",
    studioName: "Studio Synthesis",
    commandCenter: "Command Center",
    enterPortal: "VSTOUPIT DO PORTÁLU",
    integrityReady: "SYSTÉM AKTIVNÍ. TERMINAL v2.52 PŘIPRAVEN.",
    selectSpecialist: "ZVOLTE SPECIALISTU PRO RESTITUCI",
    identityPortal: "IDENTITY PORTAL",
    secureGate: "SECURE GATE ACCESS",
    backlogTitle: "KOMUNITNÍ IMPULS",
    legalLink: "LEGISLATIVA EU/CZ",
    termsLink: "OBCHODNÍ PODMÍNKY",
    statusOnline: "ONLINE",
    stats: { speed: "Rychlost", detail: "Detail" },
    ecoTicker: "DNES JSME SPOLEČNĚ ZACHRÁNILI 125.4 KG ELEKTROODPADU • DIGITÁLNÍ SVOBODA OPRAV JE VAŠE PRÁVO • STUDIO SYNTHESIS R&D UNIT 2026",
    menu: {
      myRepairs: { title: "Moje opravy" },
      history: { title: "Historie" },
      help: { title: "Nápověda" },
      eco: { title: "Eko-vize" },
      legislation: { title: "Legislativa" },
      appearance: { title: "Vzhled" },
      feedback: { title: "Zlepšení" },
      expert: { title: "Expert AI" },
      admin: { title: "Administrace" }
    },
    auth: {
      login: "Přihlášení",
      register: "Registrace",
      welcome: "Vítejte v Synthesis Identity Portálu",
      email: "E-mailový terminál",
      password: "Přístupový kód",
      pathBeginner: "Začátečník",
      pathExperienced: "Zkušený",
      pathPro: "Profík",
      gdpr: "Souhlasím s GDPR",
      liability: "Doložka o neručení",
      rights: "Právo na opravu",
      submit: "VSTOUPIT",
      create: "VYTVOŘIT IDENTITU",
      biometry: "OTISK PRSTU",
      google: "GOOGLE API"
    }
  },
  en: {
    appTitle: "FixIt Guru v2.52",
    tagline: "TERMINAL SYNC ULTIMATE",
    studioName: "Studio Synthesis",
    commandCenter: "Command Center",
    enterPortal: "ENTER PORTAL",
    integrityReady: "SYSTEM ACTIVE. TERMINAL v2.52 READY.",
    selectSpecialist: "SELECT SPECIALIST FOR RESTITUTION",
    identityPortal: "IDENTITY PORTAL",
    secureGate: "SECURE GATE ACCESS",
    backlogTitle: "COMMUNITY IMPULSE",
    legalLink: "LEGISLATION EU/CZ",
    termsLink: "TERMS & CONDITIONS",
    statusOnline: "ONLINE",
    stats: { speed: "Speed", detail: "Detail" },
    ecoTicker: "TODAY WE SAVED 125.4 KG OF E-WASTE TOGETHER • DIGITAL RIGHT TO REPAIR IS YOURS • STUDIO SYNTHESIS R&D UNIT 2026",
    menu: {
      myRepairs: { title: "My Repairs" },
      history: { title: "History" },
      help: { title: "Help" },
      eco: { title: "Eco-Vision" },
      legislation: { title: "Legislation" },
      appearance: { title: "Appearance" },
      feedback: { title: "Backlog" },
      expert: { title: "Expert AI" },
      admin: { title: "Admin" }
    },
    auth: {
      login: "Login",
      register: "Register",
      welcome: "Welcome to Synthesis Identity Portal",
      email: "Email Terminal",
      password: "Access Code",
      pathBeginner: "Beginner",
      pathExperienced: "Experienced",
      pathPro: "Pro",
      gdpr: "Agree to GDPR",
      liability: "Liability Waiver",
      rights: "Right to Repair",
      submit: "ENTER",
      create: "CREATE IDENTITY",
      biometry: "FINGERPRINT",
      google: "GOOGLE API"
    }
  }
};

const CHARACTER_CONFIG: Record<CharacterType, any> = {
  [CharacterType.KAREL]: { 
    name: 'Karel', role: 'Hardware God', color: 'text-blue-600', glow: 'glow-blue', icon: Wrench, bg: 'bg-blue-50', hex: '#2563eb',
    stats: { speed: 100, detail: 40 }, anim: 'animate-wrench', desc: 'PCB & DIAGNOSTIKA'
  },
  [CharacterType.LUCIE]: { 
    name: 'Lucie', role: 'Mentor', color: 'text-amber-600', glow: 'glow-amber', icon: BookOpen, bg: 'bg-amber-50', hex: '#d97706',
    stats: { speed: 40, detail: 100 }, anim: 'animate-book', desc: 'MANUÁLY & POSTUPY'
  },
  [CharacterType.DASA]: { 
    name: 'Dáša', role: 'Organic Fanatic', color: 'text-emerald-600', glow: 'glow-emerald', icon: Leaf, bg: 'bg-emerald-50', hex: '#059669',
    stats: { speed: 60, detail: 80 }, anim: 'animate-leaf', desc: 'BOTANIKA & EKO'
  },
  [CharacterType.FRANTISEK]: { 
    name: 'František', role: 'Master of Force', color: 'text-orange-600', glow: 'glow-orange', icon: Hammer, bg: 'bg-orange-50', hex: '#ea580c',
    stats: { speed: 80, detail: 50 }, anim: 'animate-hammer', desc: 'STAVBA & SÍLA'
  },
};

const MOCK_BACKLOG: InnovationProposal[] = [
  { id: 'b1', title: 'Smell Detection v3.0', category: InnovationCategory.RESEARCH, specialist: CharacterType.KAREL, description: '', author: 'Synthesis_Lab', authorTier: UserPath.PRO, votes: 156, status: ProposalStatus.DEVELOPMENT, timestamp: new Date() },
  { id: 'b2', title: 'AR Vision Glasses', category: InnovationCategory.FEATURE, specialist: CharacterType.LUCIE, description: '', author: 'Optic_Dev', authorTier: UserPath.PRO, votes: 142, status: ProposalStatus.PENDING, timestamp: new Date() },
  { id: 'b3', title: 'Podpora Bluetooth multimetrů', category: InnovationCategory.OPTIMIZATION, specialist: CharacterType.KAREL, description: '', author: 'Volt_Hunter', authorTier: UserPath.PRO, votes: 89, status: ProposalStatus.PENDING, timestamp: new Date() },
];

const SynthesisLogo = memo(({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative">
      <Wrench className="w-5 h-5 text-zinc-900" />
      <Leaf className="w-3 h-3 text-emerald-500 absolute -bottom-1 -right-1 rotate-12" />
    </div>
  </div >
));

const App: React.FC = () => {
  const [lang, setLang] = useState<'cs' | 'en'>(navigator.language.startsWith('cs') ? 'cs' : 'en');
  const t = (translations as any)[lang];
  const isCs = lang === 'cs';

  const [view, setView] = useState<ViewState>('landing');
  const [activeCmdSection, setActiveCmdSection] = useState<CmdSection>('none');
  const [activeChar, setActiveChar] = useState<CharacterType>(CharacterType.KAREL);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [inputText, setInputText] = useState('');
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [selectedPath, setSelectedPath] = useState<UserPath>(UserPath.EXPERIENCED);

  // Identity Portal Fields
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [gdprChecked, setGdprChecked] = useState(false);
  const [liabilityChecked, setLiabilityChecked] = useState(false);
  const [rightsChecked, setRightsChecked] = useState(false);

  // UI States
  const [displayMode, setDisplayMode] = useState<DisplayMode>('light');
  const [bgPattern, setBgPattern] = useState<BgPattern>('studio');
  const [accentColor, setAccentColor] = useState('#2563eb');
  const [fontScale, setFontScale] = useState(100);
  const [hudTransparency, setHudTransparency] = useState(0.98);
  const [isBoldMode, setIsBoldMode] = useState(false);
  const [ambientGlow, setAmbientGlow] = useState(50);
  const [isPulseMode, setIsPulseMode] = useState(false);
  const [isContrastBooster, setIsContrastBooster] = useState(false);
  const [markerSize, setMarkerSize] = useState(1.0);
  const [traceColor, setTraceColor] = useState('#2563eb');

  const [isTesting, setIsTesting] = useState(false);
  const [testStage, setTestStage] = useState('NOMINAL');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view === 'chat') chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, view]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: inputText, character: activeChar, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);
    try {
      const guruResponse = await askGuru(activeChar, inputText, messages.map(m => ({ role: m.role, content: m.content })));
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: guruResponse, character: activeChar, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const enterPortal = (forceLogin: boolean = false) => {
    if (forceLogin || !currentUser) {
       if (view === 'landing' && (!gdprChecked || !liabilityChecked || !rightsChecked)) {
          const section = document.getElementById('identity-portal');
          section?.scrollIntoView({ behavior: 'smooth' });
          return;
       }
       setCurrentUser({
         name: emailInput.split('@')[0] || (isCs ? "Anonymní Operátor" : "Anonymous Operator"),
         path: selectedPath,
         wasteSavedTotal: 0,
         lastSpecialist: activeChar,
         biometryEnabled: false,
         gdprAccepted: true,
         liabilityAccepted: true
       });
    }
    setAccentColor(CHARACTER_CONFIG[activeChar].hex);
    setView('chat');
  };

  const runSynthesisTest = () => {
    setIsTesting(true);
    setTestStage('TESTING...');
    setTimeout(() => {
      setIsTesting(false);
      setTestStage('PASS');
    }, 2000);
  };

  const SectionWindow = ({ section }: { section: CmdSection }) => {
    if (section === 'none') return null;
    const renderContent = () => {
      switch(section) {
        case 'myRepairs': return <MyRepairsContent lang={lang} />;
        case 'history': return <HistoryContent lang={lang} sessions={chatHistory} characterConfig={CHARACTER_CONFIG} onSelect={(session) => { setMessages(session.messages); setAccentColor(CHARACTER_CONFIG[session.character].hex); setActiveCmdSection('none'); setView('chat'); }} onDelete={(id) => setChatHistory(prev => prev.filter(s => s.id !== id))} />;
        case 'help': return <HelpContent lang={lang} />;
        case 'about': return <AboutContent lang={lang} />;
        case 'eco': return <EcoContent lang={lang} />;
        case 'legislation': return <LegislationContent lang={lang} />;
        case 'appearance': return (
          <AppearanceContent 
            lang={lang} 
            displayMode={displayMode} 
            setDisplayMode={setDisplayMode} 
            bgPattern={bgPattern} 
            setBgPattern={setBgPattern} 
            accentColor={accentColor} 
            setAccentColor={setAccentColor} 
            hudTransparency={hudTransparency} 
            setHudTransparency={setHudTransparency} 
            isBoldMode={isBoldMode} 
            setIsBoldMode={setIsBoldMode} 
            fontScale={fontScale} 
            setFontScale={setFontScale} 
            ambientGlow={ambientGlow} 
            setAmbientGlow={setAmbientGlow} 
            isPulseMode={isPulseMode} 
            setIsPulseMode={setIsPulseMode} 
            isContrastBooster={isContrastBooster} 
            setIsContrastBooster={setIsContrastBooster} 
            markerSize={markerSize} 
            setMarkerSize={setMarkerSize} 
            traceColor={traceColor} 
            setTraceColor={setTraceColor} 
            activeTheme="default"
            setActiveTheme={() => {}}
          />
        );
        case 'feedback': return <FeedbackContent lang={lang} currentUser={currentUser} />;
        case 'expert': return (
          <ExpertContent 
            lang={lang} 
            personalityGain={0.6} 
            setPersonalityGain={()=>{}} 
            aiCadence={0.5} 
            setAiCadence={()=>{}} 
            isTesting={isTesting} 
            runSynthesisTest={runSynthesisTest} 
            testStage={testStage} 
          />
        );
        case 'admin': return <AdminContent lang={lang} />;
        default: return null;
      }
    };
    const sectionTitle = (t.menu as any)[section]?.title || "";
    return (
      <div className="fixed inset-0 z-[200] bg-white/5 backdrop-blur-[60px] flex items-center justify-center p-4">
        <div className="bg-white w-full h-full border border-black/5 apple-shadow overflow-hidden flex flex-col rounded-[3rem]">
          <div className="p-8 border-b flex justify-between items-center shrink-0">
            <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">{sectionTitle}</h3>
            <button onClick={() => setActiveCmdSection('none')} className="p-4 rounded-full hover:bg-black/5 transition-all"><X className="w-8 h-8" /></button>
          </div>
          <div className="p-10 overflow-y-auto custom-scroll flex-1 max-w-5xl mx-auto w-full">{renderContent()}</div>
        </div>
      </div>
    );
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-[#fbfbfd] text-zinc-900 custom-scroll overflow-x-hidden relative">
      {/* 1. Header (Terminal Sync v2.52) */}
      <header className="h-24 px-10 flex justify-between items-center border-b border-black/5 sticky top-0 z-[100] bg-white/80 backdrop-blur-2xl transition-all">
        <div className="flex items-center gap-8">
          <SynthesisLogo className="scale-150" />
          <div className="flex flex-col">
            <span className="font-black text-sm uppercase tracking-[0.3em] leading-none">{t.studioName}</span>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2">{t.tagline} v2.52</span>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-end gap-1">
             <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full status-pulse shadow-sm`} style={{ backgroundColor: CHARACTER_CONFIG[activeChar].hex }} />
                <span className="text-[11px] font-black uppercase tracking-widest">{CHARACTER_CONFIG[activeChar].name} {t.statusOnline}</span>
             </div>
             <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest leading-none">Node: Alpha-Sync Ready</span>
          </div>
          <div className="h-8 w-px bg-zinc-200" />
          <button onClick={() => setIsCommandCenterOpen(true)} className="group p-4 bg-zinc-50 rounded-[1.5rem] hover:bg-black hover:text-white transition-all shadow-sm">
            <Radar className="w-6 h-6 group-hover:rotate-45 transition-transform" />
          </button>
        </div>
      </header>

      {/* 2. Hero Section: Specialist Nodes */}
      <section className="max-w-7xl mx-auto px-8 py-24 space-y-24">
        <div className="text-center space-y-6">
          <h1 className="text-8xl font-black uppercase tracking-tighter leading-none animate-in fade-in slide-in-from-top-6 duration-1000">
            {t.appTitle}
          </h1>
          <div className="flex items-center justify-center gap-4">
             <div className="h-px w-20 bg-zinc-200" />
             <p className="text-zinc-400 font-black uppercase tracking-[0.8em] text-[11px] whitespace-nowrap">{t.integrityReady}</p>
             <div className="h-px w-20 bg-zinc-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {Object.entries(CHARACTER_CONFIG).map(([key, cfg]) => {
            const isActive = activeChar === key;
            return (
              <button 
                key={key}
                onClick={() => setActiveChar(key as CharacterType)}
                className={`specialist-card relative flex flex-col p-12 rounded-[4rem] border text-left min-h-[460px] ${isActive ? 'bg-white border-black/5 shadow-[0_40px_100px_rgba(0,0,0,0.08)] scale-105 z-10 ' + cfg.glow : 'bg-zinc-50/50 border-transparent opacity-30 hover:opacity-80 hover:bg-white'}`}
              >
                <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-10 transition-all duration-700 ${isActive ? cfg.bg + ' ' + cfg.color + ' ' + cfg.anim : 'bg-zinc-100 text-zinc-400'}`}>
                  <cfg.icon className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight leading-none mb-3">{cfg.name}</h3>
                <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-8 leading-none">{cfg.desc}</p>
                
                {/* Dynamic Stats Module */}
                <div className={`space-y-5 mt-auto transition-all duration-700 overflow-hidden ${isActive ? 'max-h-56 opacity-100 py-4' : 'max-h-0 opacity-0'}`}>
                  {Object.entries(cfg.stats).map(([sKey, sVal]) => (
                    <div key={sKey} className="space-y-2.5">
                      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-50">
                        <span>{(t.stats as any)[sKey]}</span>
                        <span>{sVal}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden shadow-inner">
                        <div className={`h-full transition-all duration-1000 bg-current rounded-full`} style={{ width: `${sVal}%`, color: cfg.hex }} />
                      </div>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-zinc-50 flex items-center gap-3">
                     <Activity className="w-4 h-4 text-zinc-300" />
                     <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">Neural Sync: Active</span>
                  </div>
                </div>

                {isActive && (
                  <div className="absolute top-8 right-8 p-3 bg-black text-white rounded-full animate-in zoom-in-50 duration-500 shadow-2xl">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-8">
          <button onClick={() => enterPortal()} className="group px-24 py-10 bg-blue-600 text-white rounded-full font-black uppercase tracking-[0.6em] shadow-[0_30px_60px_rgba(37,99,235,0.3)] hover:bg-black hover:scale-105 active:scale-95 transition-all text-[12px] relative overflow-hidden">
            <span className="relative z-10">{t.enterPortal}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
          <div className="flex items-center gap-3 opacity-20 group cursor-default">
             <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform animate-bounce" />
             <span className="text-[9px] font-black uppercase tracking-widest">Identify Portal Required</span>
          </div>
        </div>
      </section>

      {/* 3. Identity Portal (Secure Gate Access) */}
      <section id="identity-portal" className="max-w-4xl mx-auto px-10 py-32 border-t border-black/5 scroll-mt-24">
        <div className="space-y-20">
          <div className="flex flex-col items-center text-center gap-8 animate-in fade-in duration-700">
            <div className="p-8 bg-zinc-950 text-white rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.2)] relative overflow-hidden group">
               <Fingerprint className="w-12 h-12 relative z-10 group-hover:scale-110 transition-transform" />
               <div className="absolute inset-0 bg-blue-600/20 blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="space-y-3">
              <h2 className="text-6xl font-black uppercase tracking-tight leading-none">{t.identityPortal}</h2>
              <p className="text-zinc-400 font-bold uppercase tracking-[0.5em] text-[11px]">{t.auth.welcome}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { id: UserPath.BEGINNER, label: t.auth.pathBeginner, icon: Info, color: 'text-emerald-500', desc: 'Step-Lock Protocol' },
               { id: UserPath.EXPERIENCED, label: t.auth.pathExperienced, icon: Cpu, color: 'text-blue-500', desc: 'Hybrid Expert Mode' },
               { id: UserPath.PRO, label: t.auth.pathPro, icon: Zap, color: 'text-zinc-900', desc: 'Raw Synthesis Feed' }
             ].map(path => (
               <button 
                 key={path.id}
                 onClick={() => setSelectedPath(path.id)}
                 className={`p-10 rounded-[4rem] border transition-all text-left space-y-5 ${selectedPath === path.id ? 'bg-white border-black/5 shadow-[0_30px_80px_rgba(0,0,0,0.05)] scale-105 z-10' : 'bg-zinc-50 border-transparent opacity-50 hover:opacity-100 hover:bg-white'}`}
               >
                 <div className={`p-5 rounded-3xl inline-flex shadow-sm ${selectedPath === path.id ? path.color.replace('text-', 'bg-') + ' text-white' : 'bg-zinc-200 text-zinc-400'}`}>
                   <path.icon className="w-7 h-7" />
                 </div>
                 <div className="flex flex-col">
                   <span className="font-black text-[14px] uppercase tracking-wide leading-none">{path.label}</span>
                   <span className="text-[9px] font-black uppercase opacity-30 tracking-widest mt-2 leading-none">{path.desc}</span>
                 </div>
               </button>
             ))}
          </div>

          <div className="space-y-10 bg-white p-16 rounded-[5rem] shadow-[0_50px_100px_rgba(0,0,0,0.06)] border border-black/5 hud-transparency relative overflow-hidden group">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-zinc-300 ml-6 tracking-widest">{t.auth.email}</label>
                <div className="relative">
                   <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
                   <input 
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="operator@synthesis.studio" 
                    className="w-full bg-zinc-50 border border-black/5 rounded-[2rem] pl-16 pr-8 py-6 text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner" 
                   />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-zinc-300 ml-6 tracking-widest">{t.auth.password}</label>
                <div className="relative">
                   <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
                   <input 
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-zinc-50 border border-black/5 rounded-[2rem] pl-16 pr-8 py-6 text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner" 
                   />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 relative z-10">
               {[
                 { id: 'gdpr', checked: gdprChecked, set: setGdprChecked, label: t.auth.gdpr, icon: CheckCircle2, color: 'text-emerald-500' },
                 { id: 'liability', checked: liabilityChecked, set: setLiabilityChecked, label: t.auth.liability, icon: ShieldAlert, color: 'text-red-500' },
                 { id: 'rights', checked: rightsChecked, set: setRightsChecked, label: t.auth.rights, icon: Scale, color: 'text-blue-500' }
               ].map(box => (
                 <label key={box.id} className={`flex items-center gap-5 p-6 rounded-[2.2rem] border transition-all group cursor-pointer ${box.checked ? 'bg-white border-black/5 shadow-md' : 'bg-zinc-50 border-transparent opacity-60'}`}>
                    <input type="checkbox" checked={box.checked} onChange={e => box.set(e.target.checked)} className="peer hidden" />
                    <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${box.checked ? 'bg-zinc-950 border-zinc-950 shadow-sm' : 'border-zinc-200'}`}>
                       <CheckCircle2 className={`w-4 h-4 text-white opacity-0 ${box.checked ? 'opacity-100' : ''}`} />
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-tighter transition-colors ${box.checked ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-700'}`}>{box.label}</span>
                 </label>
               ))}
            </div>
            
            <div className="pt-8 flex items-center gap-8 relative z-10">
              <div className="h-px flex-1 bg-zinc-100" />
              <span className="text-[10px] font-black uppercase text-zinc-300 tracking-[0.5em] whitespace-nowrap">{t.secureGate}</span>
              <div className="h-px flex-1 bg-zinc-100" />
            </div>

            <div className="grid grid-cols-2 gap-8 relative z-10">
               <button onClick={() => enterPortal(true)} className="flex items-center justify-center gap-5 py-6 rounded-[2.5rem] bg-zinc-50 text-zinc-500 text-[12px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm group">
                 <Radar className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" /> {t.auth.biometry}
               </button>
               <button onClick={() => enterPortal(true)} className="flex items-center justify-center gap-5 py-6 rounded-[2.5rem] bg-zinc-50 text-zinc-500 text-[12px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm group">
                 <LogIn className="w-7 h-7 text-amber-600 group-hover:text-white transition-colors" /> {t.auth.google}
               </button>
            </div>
            
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/[0.03] blur-[120px] pointer-events-none group-hover:bg-blue-600/[0.05] transition-all duration-1000" />
          </div>
        </div>
      </section>

      {/* 4. Footer: Community Impulse & Global Eko-ticker */}
      <footer className="mt-24 border-t border-black/5 bg-zinc-50/30">
        <div className="max-w-7xl mx-auto px-10 py-24 grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2 space-y-16">
             <div className="flex items-center gap-6">
               <div className="p-4 bg-purple-50 text-purple-600 rounded-[1.5rem] shadow-sm"><Beaker className="w-8 h-8" /></div>
               <div className="flex flex-col">
                 <h4 className="text-3xl font-black uppercase tracking-tight leading-none">{t.backlogTitle}</h4>
                 <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mt-2">Synthesis Neural Feedback Engine</span>
               </div>
             </div>
             <div className="grid grid-cols-1 gap-6">
                {MOCK_BACKLOG.map(p => (
                  <div key={p.id} className="p-8 rounded-[4rem] bg-white border border-black/5 flex items-center gap-10 group hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:scale-[1.02] transition-all cursor-help relative overflow-hidden">
                    <div className={`p-6 rounded-[2rem] ${CHARACTER_CONFIG[p.specialist].bg} ${CHARACTER_CONFIG[p.specialist].color} group-hover:rotate-12 transition-transform shadow-sm`}>
                      {React.createElement(CHARACTER_CONFIG[p.specialist].icon, { className: "w-8 h-8" })}
                    </div>
                    <div className="flex-1">
                      <h5 className="text-[15px] font-black uppercase text-zinc-900 group-hover:text-blue-600 transition-colors tracking-tight leading-none">{p.title}</h5>
                      <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mt-2 inline-block opacity-50">Operator: {p.author} • {p.status}</span>
                    </div>
                    <div className="flex items-center gap-4 px-6 py-4 bg-zinc-50 rounded-full border border-black/[0.02]">
                       <Zap className="w-5 h-5 text-amber-500 fill-current" />
                       <span className="text-sm font-black tracking-tighter">{p.votes}</span>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-16">
             <div className="flex flex-col gap-5">
                <a href="#" className="flex items-center justify-between p-8 bg-zinc-950 text-white rounded-[4rem] shadow-2xl hover:bg-black hover:scale-105 transition-all group">
                   <div className="flex items-center gap-6">
                      <Globe className="w-8 h-8 text-blue-400 group-hover:rotate-12 transition-transform" />
                      <span className="text-[12px] font-black uppercase tracking-[0.3em]">{t.legalLink}</span>
                   </div>
                   <ArrowRight className="w-6 h-6 opacity-30 group-hover:translate-x-2 transition-transform" />
                </a>
                <a href="#" className="flex items-center justify-between p-8 bg-white border border-black/5 rounded-[4rem] hover:shadow-2xl hover:border-black/10 transition-all group">
                   <div className="flex items-center gap-6">
                      <Archive className="w-8 h-8 text-zinc-400 group-hover:scale-110 transition-transform" />
                      <span className="text-[12px] font-black uppercase tracking-[0.3em]">{t.termsLink}</span>
                   </div>
                   <ArrowRight className="w-6 h-6 opacity-30 group-hover:translate-x-2 transition-transform" />
                </a>
             </div>
             <div className="pt-16 flex flex-col items-center gap-8 opacity-30 border-t border-black/[0.05]">
                <SynthesisLogo className="scale-[2.0]" />
                <div className="text-center space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[1em]">STUDIO SYNTHESIS RESEARCH UNIT 2026</p>
                  <p className="text-[8px] font-black uppercase tracking-[0.5em] opacity-40 leading-none">{t.tagline}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Global Eko Ticker (v2.52 Smooth) */}
        <div className="h-16 bg-zinc-950 flex items-center overflow-hidden border-t border-white/5 relative">
           <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
           <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
           <div className="animate-ticker text-white text-[11px] font-black uppercase tracking-[0.6em] flex gap-24 items-center">
              <span className="flex items-center gap-5"><Leaf className="w-5 h-5 text-emerald-500" /> {t.ecoTicker}</span>
              <span className="flex items-center gap-5"><Zap className="w-5 h-5 text-blue-500" /> {t.ecoTicker}</span>
              <span className="flex items-center gap-5"><Activity className="w-5 h-5 text-purple-500" /> {t.ecoTicker}</span>
              <span className="flex items-center gap-5"><Radar className="w-5 h-5 text-blue-400" /> {t.ecoTicker}</span>
           </div>
        </div>
      </footer>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-700 ${displayMode === 'dark' ? 'bg-[#0f0f11] text-white' : displayMode === 'amoled' ? 'bg-black text-white' : 'bg-[#fbfbfd] text-zinc-900'}`} style={{ fontSize: `${fontScale}%` }}>
      {view === 'landing' ? (
        <LandingPage />
      ) : (
        <div className="flex flex-col h-screen overflow-hidden hud-transparency relative">
          <div className={`absolute inset-0 opacity-10 pointer-events-none ${bgPattern === 'blueprint' ? 'bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]' : bgPattern === 'topographic' ? 'bg-[url("https://www.transparenttextures.com/patterns/topography.png")] bg-repeat' : ''}`} />
          
          <header className="p-6 border-b border-black/5 flex justify-between items-center backdrop-blur-md sticky top-0 z-50 bg-white/80">
            <div className="flex items-center gap-4">
              <SynthesisLogo />
              <div className="flex flex-col">
                <span className="font-black uppercase tracking-tighter leading-none">{t.studioName}</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                  {currentUser?.name || 'Operator'} [{currentUser?.path || 'GUEST'}]
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 mr-6">
                <button onClick={() => setActiveCmdSection('eco')} className="text-[10px] font-black uppercase text-emerald-600 hover:opacity-70 transition-opacity">Eco: 42.5kg Saved</button>
                <div className="w-px h-4 bg-zinc-200" />
                <span className="text-[10px] font-black uppercase text-zinc-400">{CHARACTER_CONFIG[activeChar].name} Node Active</span>
              </div>
              <button onClick={() => setIsCommandCenterOpen(true)} className="p-3 bg-zinc-50 rounded-2xl hover:bg-black hover:text-white transition-all shadow-sm">
                <Radar className="w-6 h-6" />
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8 space-y-8 custom-scroll z-10">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-10">
                <div className={`p-16 rounded-[5rem] ${CHARACTER_CONFIG[activeChar].bg} ${CHARACTER_CONFIG[activeChar].color} shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)]`}>
                  {React.createElement(CHARACTER_CONFIG[activeChar].icon, { className: "w-32 h-32 " + CHARACTER_CONFIG[activeChar].anim })}
                </div>
                <div className="text-center space-y-4">
                  <h2 className="text-6xl font-black uppercase tracking-tighter">FixIt Protocol Active</h2>
                  <p className="text-[12px] font-black uppercase tracking-[0.6em] text-zinc-400">Node initialized. Awaiting technical data feed...</p>
                </div>
              </div>
            )}
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-500 slide-in-from-bottom-2`}>
                <div className={`max-w-[80%] p-8 rounded-[3.5rem] shadow-sm relative ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm shadow-xl' : 'bg-white border border-black/5 text-zinc-900 rounded-tl-sm'}`}>
                  <p className="text-[16px] font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <div className={`text-[9px] font-black uppercase tracking-widest mt-6 opacity-40 flex items-center gap-3 ${msg.role === 'user' ? 'text-white' : 'text-zinc-400'}`}>
                    <span className="px-2 py-0.5 rounded bg-current/10">{msg.role === 'user' ? 'Operator' : CHARACTER_CONFIG[msg.character].name}</span>
                    <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-zinc-50 border border-black/5 p-6 rounded-[2.5rem] flex items-center gap-5 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce" />
                  <span className="text-[12px] font-black uppercase text-zinc-400 tracking-widest">Synthesis Core Thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </main>

          <footer className="p-8 border-t border-black/5 bg-white/50 backdrop-blur-xl z-10">
            <div className="max-w-5xl mx-auto flex gap-6">
              <div className="flex-1 relative group">
                <input 
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={isCs ? "Zadejte technickou instrukci pro Synthesis Node..." : "Enter technical instruction for Synthesis Node..."}
                  className="w-full bg-zinc-50 border border-black/5 rounded-full px-12 py-7 text-sm font-medium outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner group-hover:border-zinc-300"
                />
                <button className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-zinc-300 hover:text-black transition-colors">
                  <Mic className="w-7 h-7" />
                </button>
              </div>
              <button 
                onClick={handleSend}
                disabled={loading || !inputText.trim()}
                className="p-7 bg-blue-600 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:hover:scale-100 flex items-center justify-center group"
              >
                <ArrowUp className="w-8 h-8 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </footer>
        </div>
      )}

      {isCommandCenterOpen && (
        <div className="fixed inset-0 z-[150] bg-white/5 backdrop-blur-[120px] flex flex-col animate-in fade-in duration-700 overflow-hidden">
          <div className="p-12 flex justify-between items-center shrink-0">
             <div className="flex items-center gap-8">
                <div className="w-10 h-10 rounded-full animate-pulse shadow-[0_0_30px_rgba(0,0,0,0.1)] border-2 border-white" style={{ backgroundColor: accentColor }} />
                <h2 className="text-5xl font-black uppercase tracking-[0.5em] leading-none">{t.commandCenter}</h2>
             </div>
             <button onClick={() => setIsCommandCenterOpen(false)} className="p-8 rounded-full bg-black/5 hover:bg-black/10 transition-all active:scale-90"><X className="w-12 h-12" /></button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-12 overflow-y-auto custom-scroll">
             <div className="w-full max-w-5xl divide-y divide-black/5">
                {[
                  { id: 'myRepairs', title: isCs ? 'Moje opravy' : 'My Repairs', icon: Archive, color: 'text-blue-500', desc: 'Secure technical logs' },
                  { id: 'history', title: isCs ? 'Historie' : 'History', icon: History, color: 'text-zinc-400', desc: 'Archived session feed' },
                  { id: 'help', title: isCs ? 'Nápověda' : 'Help', icon: HelpCircle, color: 'text-blue-600', desc: 'Protocol methodology' },
                  { id: 'eco', title: isCs ? 'Eko-vize' : 'Eco-Vision', icon: Leaf, color: 'text-emerald-600', desc: 'Merit analytics' },
                  { id: 'legislation', title: isCs ? 'Legislativa' : 'Legislation', icon: Gavel, color: 'text-amber-600', desc: 'EU Right to Repair' },
                  { id: 'appearance', title: isCs ? 'Vzhled' : 'Appearance', icon: Eye, color: 'text-zinc-900', desc: 'HUD customization' },
                  { id: 'feedback', title: isCs ? 'Zlepšení' : 'Backlog', icon: Beaker, color: 'text-purple-600', desc: 'Community innovation' },
                  { id: 'expert', title: isCs ? 'Expert AI' : 'Expert AI', icon: Settings, color: 'text-red-600', desc: 'Core neural tuning' },
                  { id: 'admin', title: isCs ? 'Administrace' : 'Admin', icon: ShieldCheck, color: 'text-zinc-900', desc: 'Node control panel' },
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => { setActiveCmdSection(item.id as CmdSection); setIsCommandCenterOpen(false); }}
                    className="w-full py-10 flex items-center gap-12 group hover:bg-black/[0.03] transition-all px-12 rounded-[3rem] text-left"
                  >
                    <div className="p-6 rounded-[2rem] bg-zinc-50 group-hover:bg-white group-hover:shadow-2xl transition-all shadow-sm">
                      <item.icon className={`w-10 h-10 ${item.color} group-hover:scale-125 transition-transform duration-700`} />
                    </div>
                    <div className="flex-1">
                      <span className="text-3xl font-black uppercase tracking-tight block leading-none">{item.title}</span>
                      <span className="text-[12px] font-black uppercase text-zinc-300 tracking-widest mt-2 opacity-60 group-hover:opacity-100 transition-opacity leading-none">{item.desc}</span>
                    </div>
                    <ArrowRight className="w-8 h-8 text-zinc-200 group-hover:text-black group-hover:translate-x-3 transition-all opacity-40 group-hover:opacity-100" />
                  </button>
                ))}
             </div>
          </div>
          <div className="p-12 text-center opacity-10">
            <p className="text-[10px] font-black uppercase tracking-[0.8em]">STUDIO SYNTHESIS | ULTIMATE COMMAND HUD v2.52</p>
          </div>
        </div>
      )}
      {activeCmdSection !== 'none' && <SectionWindow section={activeCmdSection} />}
    </div>
  );
};

export default App;
