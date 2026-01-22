import React from 'react';
import { Target, ShieldCheck, Leaf, LayoutGrid, Users, Globe, Wrench, BookOpen, Hammer, History } from 'lucide-react';

interface Props { lang: 'cs' | 'en'; }

export const AboutContent: React.FC<Props> = ({ lang }) => {
  const isCs = lang === 'cs';

  return (
    <div className="space-y-10 max-w-xl mx-auto py-4">
      {/* Header Section */}
      <header className="flex flex-col gap-4 border-l-4 border-blue-600 pl-6 py-2">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600/50">
          {isCs ? 'MANIFEST 2026' : 'MANIFESTO 2026'}
        </span>
        <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
          {isCs ? 'Vize Studio Synthesis' : 'Studio Synthesis Vision'}
        </h2>
        <p className="text-xl font-light italic text-zinc-400 mt-2">
          {isCs ? '"Věci se nevyhazují, věci se opravují."' : '"Things are not thrown away, things are repaired."'}
        </p>
      </header>

      {/* Intro Text */}
      <section className="bg-zinc-50 p-6 rounded-[2.5rem] border border-black/5">
        <p className="text-[11px] text-zinc-600 font-medium leading-relaxed">
          {isCs 
            ? 'Projekt FixIt Guru v2.1 nevznikl jako pouhá aplikace, ale jako manifest proti plánovanému zastarávání. Věříme, že v digitálním věku má každý právo na přístup k expertním znalostem, které mu umožní udržet jeho věci v chodu.'
            : 'FixIt Guru v2.1 was not created as a mere application, but as a manifesto against planned obsolescence. We believe that in the digital age, everyone has the right to access expert knowledge that allows them to keep their things running.'}
        </p>
      </section>

      {/* Main Points */}
      <div className="space-y-6">
        {/* 1. Demokracie znalostí */}
        <div className="flex gap-6 items-start">
          <div className="p-3 bg-blue-50 rounded-2xl shrink-0">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-2">
            <h4 className="font-black text-[12px] uppercase tracking-wider text-zinc-900">
              {isCs ? '1. Demokracie znalostí' : '1. Democracy of Knowledge'}
            </h4>
            <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-medium">
              {isCs 
                ? 'Naším cílem je demokratizace AI expertízy pro každou domácí dílnu. Chceme, aby se kutilství stalo dostupným pro každého, bez ohledu na předchozí zkušenosti. Každý uživatel má mít k dispozici nástroje, které dříve vlastnily jen velké servisy.'
                : 'Our goal is the democratization of AI expertise for every home workshop. We want DIY to become accessible to everyone, regardless of previous experience.'}
            </p>
          </div>
        </div>

        {/* 2. Restituce techniky */}
        <div className="flex gap-6 items-start">
          <div className="p-3 bg-emerald-50 rounded-2xl shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="space-y-2">
            <h4 className="font-black text-[12px] uppercase tracking-wider text-zinc-900">
              {isCs ? '2. Restituce techniky' : '2. Technical Restitution'}
            </h4>
            <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-medium">
              {isCs 
                ? 'Vize 2026 směřuje k restituci techniky – navrácení kontroly nad stroji do rukou jejich majitelů. Bojujeme za právo na opravu v digitálním věku. Pokud věc vlastníte, měli byste mít možnost ji i opravit.'
                : 'Vision 2026 points toward technical restitution – returning control over machines to their owners. We fight for the right to repair in the digital age.'}
            </p>
          </div>
        </div>

        {/* 3. Ekologická odpovědnost */}
        <div className="flex gap-6 items-start">
          <div className="p-3 bg-amber-50 rounded-2xl shrink-0">
            <Leaf className="w-6 h-6 text-amber-600" />
          </div>
          <div className="space-y-2">
            <h4 className="font-black text-[12px] uppercase tracking-wider text-zinc-900">
              {isCs ? '3. Ekologická odpovědnost' : '3. Ecological Responsibility'}
            </h4>
            <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-medium">
              {isCs 
                ? 'Každá úspěšná oprava je vítězstvím pro planetu. Náš Dashboard zásluh transparentně sleduje reálný dopad vaší práce: Měřič odpadu (zachráněný materiál), Finanční úspora (peníze zůstávající v komunitě) a Zelený bonus (podpora biodiverzity).'
                : 'Every successful repair is a victory for the planet. Our Merit Dashboard transparently tracks your impact: Waste Meter, Financial Savings, and Green Bonus.'}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Tým Synthesis */}
      <section className="space-y-4 pt-4 border-t border-black/5">
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
          <LayoutGrid className="w-3 h-3" /> {isCs ? '4. Tým Synthesis' : '4. Team Synthesis'}
        </h4>
        <div className="grid grid-cols-1 gap-3">
          <div className="p-4 rounded-[2rem] bg-zinc-50 border border-black/5 flex gap-4 items-center">
            <Wrench className="w-5 h-5 text-blue-600 shrink-0"/>
            <p className="text-[9px] text-zinc-500 font-bold uppercase leading-tight">
              <span className="text-zinc-900">Karel (Hardware God):</span> {isCs ? 'Technická preciznost a diagnostika pro experty.' : 'Technical precision and diagnostics for experts.'}
            </p>
          </div>
          <div className="p-4 rounded-[2rem] bg-zinc-50 border border-black/5 flex gap-4 items-center">
            <BookOpen className="w-5 h-5 text-amber-600 shrink-0"/>
            <p className="text-[9px] text-zinc-500 font-bold uppercase leading-tight">
              <span className="text-zinc-900">Lucie (Step-Lock Mentor):</span> {isCs ? 'Trpělivé vedení, metodika a práce s manuály.' : 'Patient guidance, methodology, and manual work.'}
            </p>
          </div>
          <div className="p-4 rounded-[2rem] bg-zinc-50 border border-black/5 flex gap-4 items-center">
            <Leaf className="w-5 h-5 text-emerald-600 shrink-0"/>
            <p className="text-[9px] text-zinc-500 font-bold uppercase leading-tight">
              <span className="text-zinc-900">Dáša (Organic Fanatic):</span> {isCs ? 'Soulad s přírodou a organické pěstování.' : 'Harmony with nature and organic growing.'}
            </p>
          </div>
          <div className="p-4 rounded-[2rem] bg-zinc-50 border border-black/5 flex gap-4 items-center">
            <Hammer className="w-5 h-5 text-orange-600 shrink-0"/>
            <p className="text-[9px] text-zinc-500 font-bold uppercase leading-tight">
              <span className="text-zinc-900">František (Master of Force):</span> {isCs ? 'Hrubá síla, stavba a nekompromisní bezpečnost.' : 'Brute force, construction, and uncompromising safety.'}
            </p>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <div className="p-6 rounded-[2.5rem] bg-blue-600 text-white flex items-center gap-5 shadow-xl">
         <div className="p-3 rounded-2xl bg-white/10 shrink-0"><History className="w-6 h-6" /></div>
         <div className="flex-1">
            <h5 className="text-[10px] font-black uppercase mb-1">Synthesis Vision 2026</h5>
            <p className="text-[9px] opacity-80 uppercase leading-tight font-bold">
              {isCs ? 'Budoucnost, kde každý kousek techniky dostane druhou šanci.' : 'A future where every piece of tech gets a second chance.'}
            </p>
         </div>
      </div>
    </div>
  );
};
