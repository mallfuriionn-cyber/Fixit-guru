
import React from 'react';
import { Gavel, Scale, AlertTriangle, FileText, Clock } from 'lucide-react';

interface Props { lang: 'cs' | 'en'; }

export const LegislationContent: React.FC<Props> = ({ lang }) => (
  <div className="space-y-4 max-w-xl mx-auto py-1">
    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-900/60 mb-2">
      {lang === 'cs' ? 'Právní průvodce Synthesis' : 'Synthesis Legal Guide'}
    </h4>
    <div className="space-y-2.5">
      {[
        { title: lang === 'cs' ? "Právo na opravu (EU)" : "Right to Repair (EU)", desc: lang === 'cs' ? "Zákony nutící výrobce konstruovat věci tak, aby se daly rozebrat běžným nářadím." : "Laws forcing manufacturers to build products that can be disassembled with common tools.", icon: Scale },
        { title: lang === 'cs' ? "Dostupnost dílů: 10 let" : "Parts Availability: 10y", desc: lang === 'cs' ? "Povinnost držet náhradní díly a doručit je do 15 pracovních dnů od objednání." : "Obligation to keep spare parts and deliver them within 15 working days.", icon: Clock },
        { title: lang === 'cs' ? "Boj s kazítky" : "Anti-Obsolescence", desc: lang === 'cs' ? "Zákaz záměrného snižování životnosti softwaru nebo hardwaru. Vaše právo na reklamaci." : "Ban on intentional reduction of SW/HW lifespan. Your right to claim compensation.", icon: AlertTriangle },
        { title: lang === 'cs' ? "Nárok na dokumentaci" : "Access to Schematics", desc: lang === 'cs' ? "Právo na servisní manuály a kódy, které dříve výrobci tajili. Lucie je pro vás vyhledá." : "Right to service manuals and codes previously hidden. Lucie will find them for you.", icon: FileText }
      ].map((law, idx) => (
        <div key={idx} className="p-5 rounded-[2.2rem] bg-white border border-black/[0.04] flex gap-5 items-center shadow-sm hover:border-amber-200 transition-all group">
          <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform"><law.icon className="w-6 h-6" /></div>
          <div className="flex-1">
            <h5 className="font-black text-[10.5px] text-amber-900 uppercase leading-none mb-1.5">{law.title}</h5>
            <p className="text-[8.5px] text-zinc-400 leading-tight uppercase tracking-tight">{law.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
