
import React from 'react';
import { History, ChevronRight, MessageSquare, Calendar, Trash2 } from 'lucide-react';
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
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-30">
        <History className="w-16 h-16" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">
          {isCs ? 'Historie je prázdná' : 'History is empty'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-xl mx-auto px-2">
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 border-b border-black/[0.05] pb-2">
        {isCs ? 'Archivované restituce' : 'Archived Restitutions'}
      </h4>
      <div className="divide-y divide-black/[0.05]">
        {sessions.map((session) => {
          const config = characterConfig[session.character];
          const CharIcon = config.icon;
          const lastMsg = session.messages[session.messages.length - 1]?.content || "";
          
          return (
            <div key={session.id} className="group relative">
              <button 
                onClick={() => onSelect(session)}
                className="w-full py-6 flex items-center gap-5 transition-all hover:bg-black/[0.02] -mx-4 px-4 rounded-[1rem] text-left group"
              >
                <div className={`p-3 rounded-2xl ${config.bg} ${config.color} shrink-0 group-hover:rotate-6 transition-transform`}>
                  <CharIcon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-black text-[12px] uppercase text-zinc-900 leading-none">{config.name}</span>
                    <span className="text-[9px] text-zinc-300 font-bold uppercase tracking-widest">{new Date(session.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 uppercase font-bold truncate pr-4 opacity-70">
                    {lastMsg || (isCs ? "Prázdná relace" : "Empty session")}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-200 group-hover:text-black transition-colors shrink-0" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(session.id); }}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
