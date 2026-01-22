import React, { useState } from 'react';
import { Leaf, Trash2, Coins, ShieldCheck, Activity, Globe, Zap, TreeDeciduous, Recycle, Wind, Sun, Sprout, ArrowLeft, ChevronRight, BookOpen, Fingerprint, Heart, CloudRain, Infinity } from 'lucide-react';

interface Props { lang: 'cs' | 'en'; }

export const EcoContent: React.FC<Props> = ({ lang }) => {
  const isCs = lang === 'cs';
  const [view, setView] = useState<'dashboard' | 'manifesto'>('dashboard');

  if (view === 'manifesto') {
    return (
      <div className="space-y-12 max-w-xl mx-auto py-2 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
        <button 
          onClick={() => setView('dashboard')}
          className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400 hover:text-black transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {isCs ? 'Zpět na Dashboard' : 'Back to Dashboard'}
        </button>

        <header className="flex flex-col gap-4 border-l-4 border-emerald-600 pl-6 py-2">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600/50">
            {isCs ? 'HLUBOKÁ EKO-FILOZOFIE' : 'DEEP ECO-PHILOSOPHY'}
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
            {isCs ? 'Zelený manifest Synthesis' : 'Synthesis Green Manifesto'}
          </h2>
          <p className="text-sm font-medium text-zinc-500 italic">
            {isCs ? '„Oprava není jen technický úkon. Je to politický akt odporu proti kultuře jednorázovosti.“' : '"Repair is not just a technical task. It is a political act of resistance against the throwaway culture."'}
          </p>
        </header>

        {/* Cirkulární Renesance */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-xl"><Recycle className="w-5 h-5 text-emerald-700" /></div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-900">
              {isCs ? 'Cirkulární renesance' : 'Circular Renaissance'}
            </h4>
          </div>
          <p className="text-[11px] text-zinc-600 font-medium leading-relaxed bg-zinc-50 p-6 rounded-[2.5rem] border border-black/5">
            {isCs 
              ? 'Věříme, že lineární model "vytěžit-vyrobit-vyhodit" je reliktem minulosti. Studio Synthesis prosazuje Cirkulární renesanci, kde je každý produkt vnímán jako dočasná forma materiálu, která musí být po skončení své primární funkce transformována nebo opravena. Odmítáme koncept odpadu – v přírodě nic jako "odpad" neexistuje, vše je zdrojem pro něco jiného.'
              : 'We believe the linear "extract-make-dispose" model is a relic of the past. Studio Synthesis promotes a Circular Renaissance, where every product is seen as a temporary form of material. We reject the concept of waste.'}
          </p>
        </section>

        {/* Hluboká ekologie v dílně */}
        <div className="grid grid-cols-1 gap-6">
          <div className="p-8 rounded-[3rem] bg-emerald-50 border border-emerald-100 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Sun className="w-6 h-6 text-amber-500" />
              <h5 className="font-black text-[12px] uppercase text-emerald-900 tracking-wider">{isCs ? 'Energetická stopa' : 'Energy Footprint'}</h5>
            </div>
            <p className="text-[10px] text-emerald-800/80 leading-relaxed uppercase font-bold">
              {isCs 
                ? 'Výroba nového smartphonu spotřebuje tolik energie jako jeho provoz po dobu 10 let. Každá minuta, kterou strávíte opravou s Karlem, přímo snižuje globální poptávku po energeticky náročné výrobě. Šetříte tisíce litrů vody spotřebované při těžbě lithia a tuny CO2, které by vyprodukoval zaoceánský tanker vezoucí váš nový nákup.'
                : 'Producing a new smartphone uses as much energy as running it for 10 years. Every minute you spend repairing directly reduces global energy demand.'}
            </p>
          </div>

          <div className="p-8 rounded-[3rem] bg-zinc-900 text-white space-y-4 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
              <CloudRain className="w-6 h-6 text-blue-400" />
              <h5 className="font-black text-[12px] uppercase text-emerald-400 tracking-wider">{isCs ? 'Etika materiálů' : 'Material Ethics'}</h5>
            </div>
            <p className="text-[10px] text-zinc-400 leading-relaxed uppercase font-bold relative z-10">
              {isCs 
                ? 'Kovy uvnitř vaší elektroniky mají duši – byly vytrženy ze země za cenu obrovských environmentálních jizev. Považujeme za neetické tyto materiály pohřbívat na skládkách. FixIt Guru v2.1 vám dává nástroje k uctění těchto zdrojů tím, že jim vdechne nový život. Každý vyčištěný kontakt je modlitbou za čistší oceány.'
                : 'The metals inside your electronics have a soul. We consider it unethical to bury these materials in landfills. FixIt Guru v2.1 gives you tools to honor these resources.'}
            </p>
            <Infinity className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 rotate-12" />
          </div>
        </div>

        {/* Dášino organické desatero */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-xl"><Sprout className="w-5 h-5 text-emerald-700" /></div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-900">
              {isCs ? 'Dášino organické desatero' : "Dasha's Organic Decalogue"}
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { t: "Nula chemie", d: "Léčíme přírodu výhradně přírodou a biologickou rovnováhou." },
              { t: "Respekt k cyklům", d: "Sázíme, stříháme a léčíme v souladu s lunárními fázemi." },
              { t: "Biodiverzita", d: "Hmyzí hotel je víc než anglický trávník. Život potřebuje chaos." },
              { t: "Voda je zlato", d: "Retence dešťovky a mulčování. Nedovolíme půdě vyschnout." },
              { t: "Semínková suverenita", d: "Uchováváme staré odrůdy. Odmítáme patentovaný život." },
              { t: "Léčba světlem", d: "Využíváme fotosyntézu na maximum. Každý list je solární panel." }
            ].map((point, i) => (
              <div key={i} className="p-5 rounded-[2.2rem] bg-white border border-black/5 flex flex-col gap-2 hover:shadow-md transition-shadow">
                <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest leading-none">{point.t}</span>
                <p className="text-[9px] text-zinc-500 uppercase font-bold leading-tight">{point.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Závěrečné slovo Guru */}
        <section className="p-10 rounded-[4rem] bg-emerald-600 text-white space-y-6 shadow-2xl relative overflow-hidden text-center">
          <div className="relative z-10 space-y-4">
            <Globe className="w-12 h-12 mx-auto opacity-50 mb-2" />
            <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">
              {isCs ? 'Staňte se strážcem planety' : 'Become a Guardian of the Planet'}
            </h3>
            <p className="text-[11px] font-bold uppercase leading-relaxed tracking-tight max-w-sm mx-auto">
              {isCs 
                ? 'FixIt Guru není jen aplikace na opravu praček. Je to brána k nové existenci. K existenci, kde člověk není jen spotřebitel, ale tvůrce a ochránce. Vaše ruce jsou nejmocnějším nástrojem ekologické revoluce.'
                : 'FixIt Guru is more than a repair app. It is a gateway to a new existence. Your hands are the most powerful tool of the ecological revolution.'}
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent" />
        </section>

        <footer className="flex justify-center pt-4">
          <p className="text-[8px] text-zinc-300 font-black uppercase tracking-[0.5em]">
            {isCs ? 'STUDIO SYNTHESIS | GREEN CORE v2.31' : 'STUDIO SYNTHESIS | GREEN CORE v2.31'}
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-xl mx-auto py-4 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex flex-col gap-4 border-l-4 border-emerald-500 pl-6 py-2">
        <div className="flex items-center gap-3 text-emerald-600">
          <Leaf className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-70">
            {isCs ? 'EKO-VIZE' : 'ECO-VISION'}
          </span>
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">
          {isCs ? 'Vaše dílna, plíce planety' : 'Your workshop, the lungs of the planet'}
        </h2>
        <p className="text-lg font-light italic text-zinc-400 mt-1">
          {isCs 
            ? '„Každý zachráněný tranzistor je vítězstvím pro přírodu.“' 
            : '"Every saved transistor is a victory for nature."'}
        </p>
      </header>

      {/* Intro */}
      <section className="text-[11px] text-zinc-600 font-medium leading-relaxed bg-zinc-50 p-6 rounded-[2.5rem] border border-black/5">
        {isCs 
          ? 'V rámci projektu FixIt Guru v2.1 nevnímáme opravy jen jako technickou nutnost, ale jako přímý akt ochrany životního prostředí. Každý sroubek, který neutáhnete na nové věci, ale na té staré, šetří kousek světa.'
          : 'Within FixIt Guru v2.1, we see repairs not just as technical necessity, but as a direct act of environmental protection.'}
      </section>

      {/* MANIFESTO LINK BUTTON */}
      <button 
        onClick={() => setView('manifesto')}
        className="w-full p-7 rounded-[3rem] bg-emerald-950 text-white flex items-center justify-between shadow-2xl hover:bg-black transition-all active:scale-[0.98] group relative overflow-hidden"
      >
        <div className="flex items-center gap-5 relative z-10">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md group-hover:rotate-12 transition-transform">
            <BookOpen className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="text-left">
            <h4 className="text-[14px] font-black uppercase tracking-tighter leading-none">
              {isCs ? 'Zelený Manifest Synthesis' : 'Synthesis Green Manifesto'}
            </h4>
            <p className="text-[8px] opacity-70 uppercase font-black tracking-widest mt-1.5">
              {isCs ? 'Hluboká filozofie oprav a ekologie.' : 'Deep philosophy of repairs and ecology.'}
            </p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 opacity-30 group-hover:translate-x-1 transition-transform relative z-10" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] -translate-y-1/2 translate-x-1/2" />
      </button>

      {/* Dashboard Zásluh */}
      <section className="space-y-5">
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-900/40 flex items-center gap-2">
          <Activity className="w-3 h-3" /> {isCs ? 'Dashboard zásluh' : 'Merit Dashboard'}
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Waste Meter */}
          <div className="p-7 rounded-[2.5rem] bg-zinc-950 text-white shadow-2xl relative overflow-hidden group col-span-2 sm:col-span-1">
            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-[32px] font-black block leading-none tracking-tighter">42.5 kg</span>
              <p className="text-[8px] opacity-40 uppercase tracking-[0.2em] font-bold">
                {isCs ? 'Měřič odpadu' : 'Waste Meter'}
              </p>
            </div>
            <p className="text-[8px] mt-4 opacity-60 leading-tight uppercase font-medium">
              {isCs 
                ? 'Materiál (kov, plast, elektro), který díky vám neskončil na skládce.' 
                : 'Material (metal, plastic, electronics) saved from landfill.'}
            </p>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/15 blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-600/25 transition-all" />
          </div>

          <div className="grid grid-rows-2 gap-4 col-span-2 sm:col-span-1">
            {/* Savings */}
            <div className="p-7 rounded-[2.5rem] bg-emerald-600 text-white flex flex-col justify-center shadow-xl group overflow-hidden relative">
              <span className="text-[22px] font-black leading-none tracking-tighter">15 400 Kč</span>
              <p className="text-[8px] opacity-70 uppercase font-bold mt-1">
                {isCs ? 'Finanční úspora' : 'Financial Saving'}
              </p>
              <Coins className="absolute -bottom-2 -right-2 w-12 h-12 text-white/10 group-hover:rotate-12 transition-transform" />
            </div>

            {/* Green Bonus */}
            <div className="p-6 rounded-[2.5rem] bg-white border border-black/5 flex items-center gap-5 shadow-sm hover:border-emerald-200 transition-all">
              <div className="p-2.5 bg-emerald-50 rounded-2xl">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-black uppercase leading-none text-zinc-900">
                  12 {isCs ? 'rostlin' : 'plants'}
                </span>
                <p className="text-[8px] text-zinc-400 uppercase leading-none mt-1.5 font-bold">
                  {isCs ? 'Dášin zelený bonus' : "Dasha's Green Bonus"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4 text-emerald-600" />
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-900">
            {isCs ? 'Proč na tom záleží?' : 'Why does it matter?'}
          </h4>
        </div>
        <div className="p-7 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 relative overflow-hidden">
          <p className="text-[10px] text-emerald-800 font-bold uppercase italic leading-relaxed relative z-10">
            {isCs 
              ? 'Každý zachráněný kus techniky snižuje globální emise CO2 o miliony tun ročně. Vaše dílna je centrem udržitelného rozvoje.' 
              : 'Every piece of tech saved reduces global CO2 emissions by millions of tons. Your workshop is a hub for sustainable development.'}
          </p>
          <Zap className="absolute -bottom-6 -right-6 w-24 h-24 text-emerald-600/10 rotate-12" />
        </div>
      </section>

      {/* Footer / Version */}
      <div className="p-6 rounded-[2.5rem] bg-zinc-100 border border-black/5 flex items-center justify-center text-center">
         <p className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.3em]">
           {isCs ? '[v2.31 - EKO-VIZE EXPANDED] • 2026' : '[v2.31 - ECO-VISION EXPANDED] • 2026'}
         </p>
      </div>
    </div>
  );
};