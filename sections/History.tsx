
import React from 'react';
import { History, ChevronRight, MessageSquare, Calendar, Trash2, ArrowUpRight, Clock, Activity, Zap, RefreshCcw } from 'lucide-react';
import { ChatSession, CharacterType } from '../types';

interface Props {
  lang: 'cs' | 'en';
  sessions: ChatSession[];
  onSelect: (session: ChatSession) => void;
  onDelete: (id: string) => void;
  characterConfig: any;
}

export const HistoryContent: React.FC<Props> = ({ lang, sessions, onSelect, onDelete, characterConfig }) => {
  const isCs = lang === 'cs';

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 opacity-20">
        <History className="w-20 h-20" />
        <p className="text-[12px] font-black uppercase tracking-[0.5em]">
          {isCs ? 'Archiv neuronových relací je prázdný' : 'Neural session archive is empty'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-2 animate-in fade-in duration-500">
      <header className="flex justify-between items-end mb-10 border-b border-black/[0.05] pb-8">
         <div>
            <div className="flex items-center gap-3 text-blue-600 mb-2">
               <History className="w-5 h-5" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-70">NEURAL-ARCHIVE-V2</span>
            </div>
            <h4 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
              {isCs ? 'Archivovaných relací' : 'Archived Sessions'}
            </h4>
         </div>
         <span className="text-[11px] font-black uppercase text-zinc-300 tracking-widest">{sessions.length} Záznamů</span>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {sessions.map((session) => {
          const config = characterConfig[session.character];
          const CharIcon = config.icon;
          const lastMsg = session.messages[session.messages.length - 1]?.content || "";
          
          return (
            <div key={session.id} className="group p-8 rounded-[4rem] bg-white border border-black/5 hover:border-blue-500/30 hover:shadow-2xl transition-all relative overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-10 relative z-10">
                 {/* Left Specialist Info */}
                 <div className="flex items-center gap-6 lg:w-72 shrink-0">
                    <div className={`p-6 rounded-[1.8rem] ${config.bg} ${config.color} shadow-inner group-hover:scale-110 transition-transform duration-700`}>
                      <CharIcon className="w-8 h-8" />
                    </div>
                    <div>
                       <h5 className="font-black text-[16px] uppercase text-zinc-900 leading-none">{config.name}</h5>
                       <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2">{config.desc}</p>
                    </div>
                 </div>

                 {/* Center Preview Content */}
                 <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-3">
                       <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full flex items-center gap-2">
                          <MessageSquare className="w-3 h-3" /> {session.messages.length} zpráv
                       </span>
                       <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest flex items-center gap-2">
                          <Clock className="w-3 h-3" /> {new Date(session.timestamp).toLocaleTimeString()}
                       </span>
                    </div>
                    <p className="text-[15px] text-zinc-800 uppercase font-black truncate leading-none opacity-90 group-hover:text-blue-600 transition-colors">
                       {session.title || (isCs ? "Neznámý technický protokol" : "Unknown technical protocol")}
                    </p>
                    <p className="text-[11px] text-zinc-400 font-medium italic mt-3 truncate max-w-md">
                       "{lastMsg}"
                    </p>
                 </div>

                 {/* Right Action Terminal */}
                 <div className="flex items-center gap-3 lg:pl-10 border-l-0 lg:border-l border-black/5">
                    <button 
                      onClick={() => onSelect(session)}
                      className="flex-1 lg:flex-none flex items-center gap-3 px-10 py-5 bg-zinc-950 text-white rounded-[1.5rem] text-[11px] font-black uppercase hover:bg-blue-600 transition-all shadow-xl group/btn"
                    >
                       <RefreshCcw className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-700" />
                       {isCs ? 'OŽIVIT' : 'RESUME'}
                    </button>
                    <button 
                      onClick={() => onDelete(session.id)}
                      className="p-5 bg-red-50 text-red-600 rounded-[1.5rem] hover:bg-red-600 hover:text-white transition-all shadow-sm group/del"
                    >
                       <Trash2 className="w-5 h-5 group-hover/del:scale-110 transition-transform" />
                    </button>
                 </div>
              </div>
              
              {/* HUD Background Decorations */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/[0.02] blur-[80px] pointer-events-none group-hover:bg-blue-500/[0.05] transition-all" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-zinc-950/[0.01] rounded-full blur-[40px]" />
            </div>
          );
        })}
      </div>
      
      <div className="pt-10 flex justify-center opacity-30">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">NEURAL PERSISTENCE v2.75 • STUDIO SYNTHESIS</p>
      </div>
    </div>
  );
};
