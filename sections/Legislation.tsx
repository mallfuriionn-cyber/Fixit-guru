
import React, { useState } from 'react';
import { Gavel, Scale, Clock, FileText, ShieldAlert, AlertTriangle, Info, ShieldCheck, Globe, ArrowLeft, Phone, Mail, ExternalLink, Shield } from 'lucide-react';

interface Props { lang: 'cs' | 'en'; }

// Internal icon proxy for ChevronRight
const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

export const LegislationContent: React.FC<Props> = ({ lang }) => {
  const isCs = lang === 'cs';
  const [view, setView] = useState<'main' | 'scammed'>('main');

  if (view === 'scammed') {
    return (
      <div className="space-y-8 max-w-xl mx-auto py-2 animate-in fade-in slide-in-from-right-4 duration-500">
        <button 
          onClick={() => setView('main')}
          className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400 hover:text-black transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {isCs ? 'Zpět na legislativu' : 'Back to Legislation'}
        </button>

        <header className="flex flex-col gap-4 border-l-4 border-red-500 pl-6 py-2">
          <div className="flex items-center gap-3 text-red-600">
            <ShieldAlert className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-70">
              {isCs ? 'SPOTŘEBITELSKÝ ŠTÍT' : 'CONSUMER SHIELD'}
            </span>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">
            {isCs ? 'Cítím se podveden' : 'I feel cheated'}
          </h2>
          <p className="text-sm font-medium text-zinc-500">
            {isCs 
              ? 'Průvodce obranou proti neférovým obchodním praktikám.' 
              : 'Guide to defending against unfair business practices.'}
          </p>
        </header>

        <section className="space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
            {isCs ? 'Kroky k nápravě' : 'Steps to Redress'}
          </h4>
          <div className="space-y-3">
            {[
              { 
                t: isCs ? "1. Dokumentujte vše" : "1. Document Everything", 
                d: isCs ? "Snímky obrazovky webu, potvrzení objednávky a veškerou komunikaci s prodejcem." : "Screenshots of the site, order confirmations, and all communication." 
              },
              { 
                t: isCs ? "2. Písemná reklamace" : "2. Written Complaint", 
                d: isCs ? "Vždy komunikujte písemně (e-mail s doručenkou nebo doporučený dopis). Vyhněte se pouhému volání." : "Always communicate in writing. Avoid just calling." 
              },
              { 
                t: isCs ? "3. Předžalobní výzva" : "3. Pre-litigation Notice", 
                d: isCs ? "Pokud prodejce nekomunikuje, zašlete formální předžalobní výzvu. Často to stačí k vrácení peněz." : "If the seller is unresponsive, send a formal notice. Often enough for a refund." 
              }
            ].map((step, i) => (
              <div key={i} className="p-4 rounded-[1.8rem] bg-zinc-50 border border-black/5">
                <h5 className="font-black text-[10px] uppercase text-zinc-900 mb-1">{step.t}</h5>
                <p className="text-[9px] text-zinc-500 uppercase font-medium leading-tight">{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
            {isCs ? 'Důležité kontakty' : 'Important Contacts'}
          </h4>
          <div className="grid grid-cols-1 gap-3">
            <a href="https://adr.coi.cz" target="_blank" className="p-5 rounded-[2.2rem] bg-white border border-black/5 flex items-center gap-5 hover:shadow-lg transition-all group">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform"><Globe className="w-5 h-5" /></div>
              <div className="flex-1">
                <h5 className="font-black text-[10px] uppercase text-zinc-900 leading-none mb-1">ČOI - Mimosoudní řešení (ADR)</h5>
                <p className="text-[8px] text-zinc-400 uppercase font-bold tracking-tight">Bezplatné řešení sporů s obchodníky v ČR.</p>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-200" />
            </a>

            <a href="https://www.dtest.cz/poradna" target="_blank" className="p-5 rounded-[2.2rem] bg-white border border-black/5 flex items-center gap-5 hover:shadow-lg transition-all group">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform"><Phone className="w-5 h-5" /></div>
              <div className="flex-1">
                <h5 className="font-black text-[10px] uppercase text-zinc-900 leading-none mb-1">dTest - Spotřebitelská poradna</h5>
                <p className="text-[8px] text-zinc-400 uppercase font-bold tracking-tight">Odborná pomoc na lince 299 149 009.</p>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-200" />
            </a>

            <div className="p-5 rounded-[2.2rem] bg-red-50 border border-red-100 flex items-center gap-5">
              <div className="p-3 rounded-2xl bg-white text-red-600 shadow-sm"><Shield className="w-5 h-5" /></div>
              <div className="flex-1">
                <h5 className="font-black text-[10px] uppercase text-red-900 leading-none mb-1">Policie ČR (Linka 158)</h5>
                <p className="text-[8px] text-red-800/60 uppercase font-bold tracking-tight">Kontaktujte v případě podezření na trestný čin podvodu.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-xl mx-auto py-4 animate-in fade-in duration-500">
      {/* Header & Quote */}
      <header className="flex flex-col gap-4 border-l-4 border-amber-500 pl-6 py-2">
        <div className="flex items-center gap-3 text-amber-600">
          <Scale className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-70">
            {isCs ? 'LEGISLATIVA' : 'LEGISLATION'}
          </span>
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">
          {isCs ? 'Právní kompas a podmínky užití' : 'Legal Compass & Terms of Use'}
        </h2>
        <p className="text-lg font-light italic text-zinc-400 mt-1">
          {isCs 
            ? '„Váš štít v džungli zákonů a záruka transparentnosti.“' 
            : '"Your shield in the jungle of laws and guarantee of transparency."'}
        </p>
      </header>

      {/* Intro */}
      <section className="text-[11px] text-zinc-600 font-medium leading-relaxed bg-zinc-50 p-6 rounded-[2.5rem] border border-black/5">
        {isCs 
          ? 'Tato sekce poskytuje přehled o vašich právech jako spotřebitele a definuje právní rámec používání asistenčního systému FixIt Guru v2.1.'
          : 'This section provides an overview of your consumer rights and defines the legal framework for using the FixIt Guru v2.1 assistance system.'}
      </section>

      {/* EMERGENCY BUTTON */}
      <button 
        onClick={() => setView('scammed')}
        className="w-full p-7 rounded-[3rem] bg-red-600 text-white flex items-center justify-between shadow-2xl hover:bg-red-700 transition-all active:scale-[0.98] group relative overflow-hidden"
      >
        <div className="flex items-center gap-5 relative z-10">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md group-hover:rotate-12 transition-transform">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="text-left">
            <h4 className="text-[14px] font-black uppercase tracking-tighter leading-none">
              {isCs ? 'Cítím se podveden' : 'I feel cheated'}
            </h4>
            <p className="text-[8px] opacity-70 uppercase font-black tracking-widest mt-1.5">
              {isCs ? 'Neférový obchodník? Braňte se hned.' : 'Unfair merchant? Fight back now.'}
            </p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 opacity-30 group-hover:translate-x-1 transition-transform relative z-10" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] -translate-y-1/2 translate-x-1/2" />
      </button>

      {/* EU & CZ Directives */}
      <section className="space-y-5">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-4 h-4 text-blue-600" />
          <h3 className="font-black text-[12px] uppercase tracking-wider text-zinc-900">
            {isCs ? 'Evropské směrnice a český právní řád' : 'European Directives & Czech Law'}
          </h3>
        </div>
        
        <div className="space-y-3">
          {[
            {
              title: isCs ? "Dostupnost náhradních dílů (7–10 let)" : "Spare Parts Availability (7–10y)",
              desc: isCs 
                ? "Výrobci vybraných kategorií zboží mají zákonnou povinnost zajistit dostupnost klíčových náhradních dílů po dobu 7 až 10 let od ukončení prodeje."
                : "Manufacturers must ensure key spare parts availability for 7 to 10 years after the model sale ends.",
              icon: Clock
            },
            {
              title: isCs ? "Boj proti „kazítkům“" : "Anti-Obsolescence",
              desc: isCs 
                ? "Legislativa zakazuje záměrné snižování životnosti výrobků a omezování jejich funkčnosti po určité době používání."
                : "Legislation prohibits intentional reduction of product lifespan and functionality limitation over time.",
              icon: AlertTriangle
            },
            {
              title: isCs ? "Softwarová blokace" : "Software Locking",
              desc: isCs 
                ? "Směrnice omezují možnost výrobců blokovat zařízení při použití neoriginálních, ale kompatibilních náhradních dílů."
                : "Directives limit manufacturers' ability to block devices when using non-original but compatible spare parts.",
              icon: ShieldCheck
            },
            {
              title: isCs ? "Přístup k dokumentaci" : "Access to Documentation",
              desc: isCs 
                ? "Výrobci musí poskytovat servisní manuály a technická schémata nezávislým opravářům i koncovým uživatelům."
                : "Manufacturers must provide service manuals and technical schematics to independent repairers and end users.",
              icon: FileText
            }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-[2.2rem] bg-white border border-black/[0.04] flex gap-5 items-start shadow-sm hover:border-amber-200 transition-all">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 shrink-0 mt-1">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="font-black text-[10.5px] text-amber-900 uppercase leading-none">{item.title}</h5>
                <p className="text-[9px] text-zinc-500 leading-tight uppercase font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="p-8 rounded-[3rem] bg-zinc-950 text-white space-y-6 shadow-2xl border border-white/5 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <ShieldAlert className="w-8 h-8 text-red-500" />
          <h3 className="font-black text-[13px] uppercase tracking-[0.2em]">
            {isCs ? 'Právní doložka a omezení odpovědnosti' : 'Legal Disclaimer & Liability'}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4 relative z-10">
          {[
            {
              label: isCs ? "Informační charakter" : "Informational Character",
              text: isCs ? "Veškeré návody and rady mají pouze informativní charakter a slouží jako podpora pro kutilskou činnost." : "All guides and advice are for informational purposes only as DIY support."
            },
            {
              label: isCs ? "Vyloučení odpovědnosti" : "Exclusion of Liability",
              text: isCs ? "Provozovatel neručí za chyby v instrukcích. Jakákoliv oprava je prováděna na vlastní riziko uživatele." : "Operator is not liable for instruction errors. Any repair is at the user's own risk."
            },
            {
              label: isCs ? "Odpovědnost za škody" : "Damage Liability",
              text: isCs ? "Nepřebíráme odpovědnost za přímé či nepřímé škody na majetku, zdraví nebo ztrátu záruky." : "We accept no liability for direct or indirect damage to property, health, or loss of warranty."
            },
            {
              label: isCs ? "Bezpečnost především" : "Safety First",
              text: isCs ? "Uživatel je povinen dodržovat bezpečnostní zásady (vysoké napětí, těžká technika)." : "Users must follow safety principles (high voltage, heavy machinery)."
            }
          ].map((point, idx) => (
            <div key={idx} className="flex gap-4 items-start border-l border-white/10 pl-4 py-1">
              <div className="space-y-1">
                <span className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">{point.label}</span>
                <p className="text-[9px] opacity-70 leading-relaxed uppercase font-medium tracking-tight">{point.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/5 blur-[60px] -translate-y-1/2 translate-x-1/2" />
      </section>

      {/* Bottom Branding */}
      <div className="p-6 rounded-[2.5rem] bg-zinc-100 border border-black/5 flex items-center justify-center text-center">
         <p className="text-[9px] text-zinc-400 font-black uppercase tracking-[0.3em]">
           {isCs ? 'STUDIO SYNTHESIS | COMPLIANCE v2.1' : 'STUDIO SYNTHESIS | COMPLIANCE v2.1'}
         </p>
      </div>
    </div>
  );
};
