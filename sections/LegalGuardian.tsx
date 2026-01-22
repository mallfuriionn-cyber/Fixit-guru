
import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldAlert, Send, Camera, FileSearch, Trash2, FileSignature, 
  AlertCircle, Copy, CheckCircle2, Bookmark, Clock, ShieldCheck, 
  ArrowLeft, Loader2, FileText, Globe, ExternalLink, Activity, Info,
  Zap, Gavel, Scale, AlertTriangle, LifeBuoy, Ban, FileWarning, ChevronRight, HelpCircle
} from 'lucide-react';
import { CharacterType, Message } from '../types';
import { askGuru } from '../geminiService';

interface Props { lang: 'cs' | 'en'; onClose?: () => void; }

export const LegalGuardian: React.FC<Props> = ({ lang, onClose }) => {
  const isCs = lang === 'cs';
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const diagnosticCategories = [
    { 
      id: 'rejection', 
      label: isCs ? 'Zamítli mi reklamaci' : 'Claim Rejected', 
      desc: isCs ? 'Tvrdí, že je tam voda, nebo že jsem to rozbil sám.' : 'They claim water damage or user fault.', 
      icon: Ban, 
      color: 'text-red-500', 
      border: 'border-red-500/20', 
      bg: 'bg-red-500/10',
      prompt: isCs ? "Prodejce mi neuznal reklamaci. Prý je to moje chyba nebo oxidace. Jak se mám bránit?" : "The seller rejected my claim. They say it's my fault or oxidation. How to fight back?"
    },
    { 
      id: 'obsolescence', 
      label: isCs ? 'Rozbilo se to hned po záruce' : 'Broke after warranty', 
      desc: isCs ? 'Vypadá to na "kazítko" nebo plánované zastarávání.' : 'Suspected planned obsolescence.', 
      icon: Clock, 
      color: 'text-amber-500', 
      border: 'border-amber-500/20', 
      bg: 'bg-amber-500/10',
      prompt: isCs ? "Zařízení přestalo fungovat těsně po záruce. Mám podezření na kazítko." : "Device failed right after warranty. I suspect planned obsolescence."
    },
    { 
      id: 'software', 
      label: isCs ? 'Seká se to (chyba po aktualizaci)' : 'Software Slowdown', 
      desc: isCs ? 'Po poslední aktualizaci je to pomalé nebo něco nejde.' : 'Slow or broken after latest update.', 
      icon: Zap, 
      color: 'text-blue-500', 
      border: 'border-blue-500/20', 
      bg: 'bg-blue-500/10',
      prompt: isCs ? "Po aktualizaci softwaru je zařízení nepoužitelné nebo pomalé. Co s tím?" : "After a software update, the device is unusable or slow. Options?"
    },
    { 
      id: 'material', 
      label: isCs ? 'Špatná kvalita / Materiál' : 'Poor Material Quality', 
      desc: isCs ? 'Praskliny, špatné plasty nebo se to rozpadá.' : 'Cracks, poor plastics or falling apart.', 
      icon: Scale, 
      color: 'text-emerald-500', 
      border: 'border-emerald-500/20', 
      bg: 'bg-emerald-500/10',
      prompt: isCs ? "Výrobek se rozpadá nebo má vadný materiál už od začátku." : "Product is falling apart or has defective material since day one."
    },
  ];

  const handleSendMessage = async (customText?: string, promptOverride?: string) => {
    const textToSend = promptOverride || customText || inputText;
    if ((!textToSend.trim() && !pendingImage) || loading) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      character: CharacterType.REKLAMACE,
      timestamp: new Date(),
      imageUrl: pendingImage || undefined
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    setInputText('');
    setPendingImage(null);
    setLoading(true);
    
    try {
      const response = await askGuru(
        CharacterType.REKLAMACE,
        textToSend,
        chatMessages.map(m => ({ role: m.role, content: m.content })),
        pendingImage || undefined
      );
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        character: CharacterType.REKLAMACE,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[300] bg-[#050506] flex flex-col animate-in fade-in duration-500 overflow-hidden font-sans text-white">
      {/* Background HUD Matrix */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(220,38,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.1)_1px,transparent_1px)] bg-[size:40px:40px]" />
      
      {/* HUD Header */}
      <header className="h-14 px-6 bg-zinc-950/95 border-b border-red-900/30 backdrop-blur-2xl flex items-center justify-between shrink-0 relative z-20 shadow-xl">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 bg-white/5 hover:bg-red-600/20 rounded-lg transition-all text-zinc-400 hover:text-red-500 border border-white/5 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-600 text-white rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white leading-none">
                {isCs ? 'Pomocník s reklamací' : 'Claim Assistant'} <span className="text-red-600 text-glow">v2.80</span>
              </h2>
              <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-[0.3em] mt-1.5 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                {isCs ? 'Ochrana vašich práv' : 'Rights Protection Active'}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
           <div className="px-3 py-1 bg-red-950/30 border border-red-500/20 rounded-full text-[8px] font-black text-red-400 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-3 h-3" /> Law-Link: Aktivní
           </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-8 custom-scroll">
            {chatMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-12 animate-in zoom-in-95 duration-700">
                 <div className="space-y-4">
                    <div className="inline-block px-4 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-[8px] font-black text-red-500 uppercase tracking-[0.5em] mb-4">
                       {isCs ? 'Rychlá pomoc s prodejcem' : 'Quick Merchant Help'}
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
                       {isCs ? 'Co se stalo s vaším' : 'What happened to your'} <span className="text-red-600">{isCs ? 'výrobkem?' : 'product?'}</span>
                    </h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] leading-relaxed max-w-sm mx-auto opacity-70">
                       {isCs ? 'Klikněte na problém a já vám připravím, co prodejci napsat.' : 'Select a problem and I will prepare what to write to the seller.'}
                    </p>
                 </div>
                 
                 <div className="flex flex-col gap-2.5 w-full">
                    {diagnosticCategories.map(cat => (
                      <button 
                        key={cat.id} 
                        onClick={() => handleSendMessage(cat.label, cat.prompt)}
                        className={`flex items-center gap-5 px-6 h-[1.5cm] rounded-2xl bg-zinc-900/40 border ${cat.border} transition-all group hover:bg-zinc-900 hover:border-red-500/50 text-left relative overflow-hidden`}
                      >
                        <div className={`p-2.5 rounded-lg ${cat.bg} ${cat.color} shrink-0 group-hover:scale-110 transition-transform`}>
                           <cat.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-[13px] font-black uppercase text-white tracking-widest leading-none truncate">{cat.label}</h4>
                           <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-tight mt-1.5 truncate opacity-60 leading-none">{cat.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-red-500 transition-colors shrink-0" />
                      </button>
                    ))}
                 </div>

                 <div className="flex items-center gap-5 opacity-20">
                    <div className="h-px w-20 bg-zinc-800" />
                    <ShieldCheck className="w-5 h-5 text-white" />
                    <div className="h-px w-20 bg-zinc-800" />
                 </div>
              </div>
            ) : (
              chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                   <div className={`p-6 md:p-8 rounded-[2.5rem] text-[15px] font-medium leading-relaxed shadow-2xl relative border ${
                     msg.role === 'user' 
                     ? 'bg-red-600 text-white rounded-tr-none border-red-400/30 max-w-[85%] md:max-w-[60%]' 
                     : 'bg-zinc-900/90 border-red-900/40 text-red-50 rounded-tl-none backdrop-blur-2xl max-w-[95%] md:max-w-[75%]'
                   }`}>
                      {msg.imageUrl && (
                        <div className="relative mb-5 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                          <img src={msg.imageUrl} className="w-full h-auto" alt="Doklad" />
                        </div>
                      )}
                      <div className="whitespace-pre-wrap selection:bg-red-500/50">{msg.content}</div>
                      
                      {msg.role === 'assistant' && (
                        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                           <div className="flex items-center gap-3">
                              <div className="p-2 bg-red-600/20 rounded-lg">
                                <FileSignature className="w-4 h-4 text-red-500" />
                              </div>
                              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{isCs ? 'Rada od Synthesis' : 'Synthesis Advice'}</span>
                           </div>
                           <button 
                             onClick={() => handleCopy(msg.content, msg.id)} 
                             className="flex items-center gap-3 px-6 py-2.5 bg-white/5 hover:bg-red-600 border border-white/10 rounded-xl text-[9px] font-black text-white uppercase transition-all shadow-sm active:scale-95"
                           >
                              {copiedId === msg.id ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              {copiedId === msg.id ? (isCs ? 'Zkopírováno' : 'Zkopírovat') : (isCs ? 'Zkopírovat text pro prodejce' : 'Copy text for seller')}
                           </button>
                        </div>
                      )}
                   </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                 <div className="bg-red-950/10 border border-red-500/20 p-6 rounded-[2.5rem] rounded-tl-none flex items-center gap-4 backdrop-blur-xl animate-pulse">
                    <Loader2 className="w-5 h-5 text-red-500 animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-200">{isCs ? 'Hledám řešení ve vašem prospěch...' : 'Finding a solution in your favor...'}</span>
                 </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-5 md:p-8 bg-zinc-950/95 border-t border-red-900/20 backdrop-blur-3xl shrink-0">
             <div className="max-w-4xl mx-auto flex gap-4 items-center">
                <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setPendingImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }} />
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  className="p-5 bg-white/5 hover:bg-red-600/20 text-zinc-500 hover:text-red-500 rounded-2xl border border-white/5 transition-all shadow-inner"
                  title={isCs ? "Nahrát fotku/doklad" : "Upload photo/doc"}
                >
                  <Camera className="w-6 h-6" />
                </button>
                <div className="flex-1 relative">
                  <input 
                    value={inputText} 
                    onChange={e => setInputText(e.target.value)} 
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()} 
                    placeholder={isCs ? "Napište mi, co prodejce tvrdí..." : "Tell me what the seller claims..."} 
                    className="w-full bg-white/[0.02] border border-red-900/30 rounded-[1.8rem] px-8 py-5 text-[14px] font-medium outline-none focus:border-red-600 text-white placeholder:text-zinc-800 transition-all shadow-inner" 
                  />
                  {pendingImage && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-lg text-[8px] font-black text-white uppercase shadow-lg">
                       <FileText className="w-3.5 h-3.5" /> {isCs ? 'Foto' : 'Photo'}
                       <button onClick={() => setPendingImage(null)} className="ml-2 hover:opacity-50"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => handleSendMessage()} 
                  disabled={loading || (!inputText.trim() && !pendingImage)} 
                  className="p-5 bg-red-600 text-white rounded-full hover:bg-red-500 transition-all shadow-xl disabled:opacity-20 active:scale-90"
                >
                  <Send className="w-6 h-6" />
                </button>
             </div>
          </div>
        </div>

        {/* Sidebar Panel */}
        <aside className="hidden lg:flex w-80 border-l border-red-900/20 bg-zinc-950/70 p-8 flex-col gap-10 overflow-y-auto backdrop-blur-xl">
           <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 flex items-center gap-3 border-b border-red-500/10 pb-5">
                 <Bookmark className="w-4 h-4" /> {isCs ? 'VAŠE PRÁVA' : 'YOUR RIGHTS'}
              </h3>
              <div className="space-y-5">
                 {[
                   { t: "PRVNÍ ROK (12 MĚSÍCŮ)", d: "Prodejce musí dokázat, že jste věc rozbili vy. Pokud to nedokáže, musí opravit nebo vrátit peníze.", icon: ShieldCheck, c: "text-red-500" },
                   { t: "30 DNŮ NA OPRAVU", d: "Mají přesně měsíc. Pokud se do té doby neozvou, máte právo na vrácení peněz.", icon: Clock, c: "text-amber-500" },
                   { t: "PRÁVO NA OPRAVU", d: "Dostupnost dílů musí být zaručena po několik let od nákupu.", icon: Gavel, c: "text-blue-500" }
                 ].map((fact, i) => (
                   <div key={i} className="p-6 rounded-[2.2rem] bg-white/[0.03] border border-white/5 space-y-3 hover:bg-white/[0.05] transition-all">
                      <div className="flex items-center gap-3">
                        <fact.icon className={`w-4 h-4 ${fact.c}`} />
                        <span className="text-[9px] font-black uppercase text-white tracking-widest">{fact.t}</span>
                      </div>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase leading-relaxed tracking-tight">{fact.d}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="mt-auto space-y-4">
              <h4 className="text-[9px] font-black uppercase text-zinc-500 tracking-widest flex items-center gap-2 px-2">
                 <HelpCircle className="w-3.5 h-3.5" /> {isCs ? 'ODKAZY' : 'LINKS'}
              </h4>
               <button 
                 onClick={() => window.open('https://adr.coi.cz/cs', '_blank')} 
                 className="w-full p-7 rounded-[2.2rem] bg-red-600 text-white hover:bg-white hover:text-black transition-all group flex flex-col items-center text-center gap-3 shadow-2xl"
               >
                  <LifeBuoy className="w-8 h-8 group-hover:rotate-45 transition-transform" />
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-tight block leading-none">PŘEDAT ČOI</span>
                    <span className="text-[7px] font-black uppercase mt-1.5 block opacity-80 tracking-widest">Pomoc od státu (ADR)</span>
                  </div>
               </button>
           </div>

           <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5">
              <p className="text-[7px] text-zinc-700 font-black uppercase leading-tight text-center italic tracking-widest">
                UPOZORNĚNÍ: Synthesis Core poskytuje technické podklady, nikoliv advokátní zastoupení.
              </p>
           </div>
        </aside>
      </div>
      
      {/* Scanline FX */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,4px_100%]" />
    </div>
  );
};
