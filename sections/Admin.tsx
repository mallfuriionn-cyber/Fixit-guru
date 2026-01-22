
import React, { useState, useEffect } from 'react';
import { 
  Activity, Users, Crown, Trash2, Search, Edit3, Star, Layout, 
  ShieldAlert, BarChart2, Library, FileText, ChevronRight, X,
  Terminal, Database, RefreshCw, Zap, ShieldCheck, Eye, EyeOff,
  AlertTriangle, MessageSquare, Power
} from 'lucide-react';
import { UserProfile, UserRole, SynthesisPost, SynthesisPoll } from '../types';

interface Props { 
  lang: 'cs' | 'en'; 
  users: UserProfile[];
  onUpdateUser: (userId: string, data: Partial<UserProfile>) => void;
}

type AdminTab = 'dashboard' | 'users' | 'posts' | 'polls' | 'supervision';

// Mock data pro správu (v reálné app by šlo přes props/context)
const INITIAL_POSTS: Partial<SynthesisPost>[] = [
  { id: 'p1', title: 'Hluboká restaurace Transiwatt 140', author: 'Karel', category: 'Restituce', status: 'published', date: new Date() },
  { id: 'p2', title: 'Symbiotické pěstování: Houby a Rajčata', author: 'Dáša', category: 'Organic', status: 'published', date: new Date() },
];

export const AdminContent: React.FC<Props> = ({ lang, users, onUpdateUser }) => {
  const isCs = lang === 'cs';
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [userSearch, setUserSearch] = useState('');
  const [logs, setLogs] = useState<{t: string, m: string, s: 'info' | 'warn' | 'err'}[]>([]);
  
  // Simulace logů
  useEffect(() => {
    const newLogs = [
      { t: new Date().toLocaleTimeString(), m: 'Neural Core v2.89 started', s: 'info' },
      { t: new Date().toLocaleTimeString(), m: 'API Authentication successful', s: 'info' },
      { t: new Date().toLocaleTimeString(), m: 'Operator Mallfurion elevated to OWNER', s: 'warn' },
    ] as any;
    setLogs(newLogs);
  }, []);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  const handleSystemAction = (action: string) => {
    const msg = isCs ? `Spouštím: ${action}` : `Executing: ${action}`;
    setLogs(prev => [{ t: new Date().toLocaleTimeString(), m: msg, s: 'warn' }, ...prev]);
    if (action === 'reboot') {
      alert(isCs ? "Restartuji Synthesis Jádro..." : "Rebooting Synthesis Core...");
      window.location.reload();
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch(role) {
      case UserRole.OWNER: return 'text-amber-500';
      case UserRole.ADMIN: return 'text-blue-500';
      case UserRole.MODERATOR: return 'text-orange-500';
      case UserRole.REGISTERED: return 'text-emerald-500';
      default: return 'text-zinc-400';
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-white -m-6 md:-m-10 relative overflow-hidden min-h-[850px]">
      {/* Sidebar - Synthesis CMS */}
      <div className="w-full md:w-72 border-b md:border-r border-black/[0.05] flex flex-row md:flex-col gap-1 p-3 md:p-4 bg-zinc-50/50 shrink-0">
        <div className="hidden md:flex items-center gap-3 px-6 mb-8 mt-4">
           <div className="p-3 bg-zinc-950 text-white rounded-2xl shadow-xl"><ShieldCheck className="w-5 h-5" /></div>
           <div className="flex flex-col">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Synthesis Overseer</h4>
              <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Admin Node v2.89</span>
           </div>
        </div>
        
        <div className="flex md:flex-col gap-1 w-full">
          {[
            { id: 'dashboard', icon: Activity, label: isCs ? 'Nástěnka' : 'Dashboard' },
            { id: 'users', icon: Users, label: isCs ? 'Operátoři' : 'Operators' },
            { id: 'posts', icon: FileText, label: isCs ? 'Správa Obsahu' : 'Content' },
            { id: 'polls', icon: BarChart2, label: isCs ? 'Ankety & Hlasy' : 'Polls' },
            { id: 'supervision', icon: Terminal, label: isCs ? 'Dozor & Logy' : 'Supervision' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-3 md:gap-4 px-6 py-4 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'text-black bg-white shadow-xl ring-1 ring-black/5' : 'text-zinc-400 hover:text-black hover:bg-black/5'}`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
              {tab.id === 'supervision' && <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse ml-auto" />}
            </button>
          ))}
        </div>

        <div className="hidden md:flex flex-col gap-2 mt-auto p-4 border-t border-black/5">
           <span className="text-[8px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-2 px-2">Kritické úkony</span>
           <button onClick={() => handleSystemAction('reboot')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase text-zinc-500 hover:bg-zinc-950 hover:text-white transition-all">
              <RefreshCw className="w-3.5 h-3.5" /> Force Reboot
           </button>
           <button onClick={() => handleSystemAction('wipe')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase text-red-500 hover:bg-red-50 transition-all">
              <Database className="w-3.5 h-3.5" /> Wipe Cache
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-12 space-y-10 custom-scroll overflow-y-auto bg-white">
        
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-12 animate-in fade-in duration-500">
             <header className="flex justify-between items-end border-b border-black/5 pb-8">
                <div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter">Status: Nominální</h3>
                  <p className="text-[11px] font-black uppercase text-zinc-400 mt-2 tracking-widest">Relace sítě Synthesis v reálném čase</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-[9px] font-black uppercase">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                   Core Online
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-10 rounded-[4rem] bg-zinc-950 text-white flex flex-col justify-between shadow-2xl overflow-hidden relative group h-64">
                   <span className="text-7xl font-black relative z-10 tracking-tighter">{users.length}</span>
                   <span className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40 relative z-10">Autorizovaných Operátorů</span>
                   <Users className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-10 rounded-[4rem] bg-blue-600 text-white flex flex-col justify-between shadow-xl h-64 relative overflow-hidden group">
                   <span className="text-7xl font-black tracking-tighter">2.89</span>
                   <span className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40">Build Verze Jádra</span>
                   <Zap className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10 group-hover:rotate-12 transition-transform" />
                </div>
                <div className="p-10 rounded-[4rem] bg-zinc-50 border border-black/5 flex flex-col justify-between shadow-inner h-64">
                   <span className="text-7xl font-black tracking-tighter text-zinc-900">4</span>
                   <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-300">Aktivních Specialistů</span>
                </div>
             </div>

             <div className="p-8 rounded-[3rem] bg-zinc-50 border border-black/5 flex items-center justify-between group">
                <div className="flex items-center gap-6">
                   <div className="p-4 bg-white rounded-2xl shadow-sm"><Activity className="w-6 h-6 text-blue-600" /></div>
                   <div>
                      <h5 className="font-black text-[13px] uppercase tracking-tight">Využití Hardware akcelerace</h5>
                      <div className="flex items-center gap-4 mt-2">
                         <div className="w-48 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                            <div className="w-[64%] h-full bg-blue-600" />
                         </div>
                         <span className="text-[10px] font-black">64%</span>
                      </div>
                   </div>
                </div>
                <button className="px-6 py-3 bg-zinc-950 text-white rounded-xl text-[9px] font-black uppercase hover:bg-blue-600 transition-all">Detail výkonu</button>
             </div>
          </div>
        )}

        {/* USERS MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                   <h3 className="text-3xl font-black uppercase tracking-tighter">Řízení Hierarchie</h3>
                   <p className="text-[10px] font-black uppercase text-zinc-400 mt-1 tracking-widest">Autorizace a správa rolí v matrice</p>
                </div>
                <div className="relative w-full sm:w-80">
                   <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
                   <input 
                      value={userSearch}
                      onChange={e => setUserSearch(e.target.value)}
                      placeholder="Identifikovat operátora..." 
                      className="w-full bg-zinc-50 border border-black/5 rounded-[2rem] pl-14 pr-8 py-4 text-sm font-bold outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                   />
                </div>
             </header>

             <div className="bg-white rounded-[3.5rem] border border-black/5 overflow-hidden shadow-sm">
                <div className="grid grid-cols-12 gap-4 px-10 py-6 bg-zinc-50 border-b border-black/5 text-[9px] font-black uppercase text-zinc-400 tracking-[0.2em]">
                   <div className="col-span-5">Operátor / ID</div>
                   <div className="col-span-3">Úroveň Oprávnění</div>
                   <div className="col-span-2 text-center">Eco Merit</div>
                   <div className="col-span-2 text-right">Akce</div>
                </div>
                {filteredUsers.map(u => (
                  <div key={u.id} className="grid grid-cols-12 gap-4 px-10 py-10 items-center border-b border-black/5 last:border-0 hover:bg-zinc-50/40 transition-colors group">
                     <div className="col-span-5 flex items-center gap-5">
                        <div className="w-14 h-14 rounded-[1.5rem] bg-zinc-100 flex items-center justify-center font-black text-2xl text-zinc-400 border border-black/5 group-hover:scale-105 transition-transform shadow-inner overflow-hidden">
                           {u.avatarUrl ? <img src={u.avatarUrl} className="w-full h-full object-cover" /> : u.name[0]}
                        </div>
                        <div>
                           <h5 className="font-black text-[16px] uppercase tracking-tight flex items-center gap-2">
                              {u.name}
                              {u.role === UserRole.OWNER && <Star className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />}
                           </h5>
                           <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest block mt-1">{u.email}</span>
                        </div>
                     </div>
                     <div className="col-span-3">
                        <select 
                          value={u.role}
                          onChange={(e) => onUpdateUser(u.id, { role: e.target.value as UserRole })}
                          className={`w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3 text-[10px] font-black uppercase outline-none focus:border-blue-500 transition-all ${getRoleColor(u.role)}`}
                          disabled={u.role === UserRole.OWNER}
                        >
                           <option value={UserRole.GUEST}>Uživatel</option>
                           <option value={UserRole.REGISTERED}>Registrovaný</option>
                           <option value={UserRole.MODERATOR}>Moderátor</option>
                           <option value={UserRole.ADMIN}>Administrátor</option>
                           <option value={UserRole.OWNER}>Majitel - Fixit Guru</option>
                        </select>
                     </div>
                     <div className="col-span-2 text-center">
                        <div className="flex flex-col items-center">
                           <span className="text-xl font-black leading-none text-emerald-600">{u.wasteSavedTotal}kg</span>
                           <span className="text-[7px] font-black uppercase text-zinc-300 mt-1.5">Zásluhy</span>
                        </div>
                     </div>
                     <div className="col-span-2 flex justify-end gap-3">
                        <button className="p-4 bg-zinc-50 rounded-2xl text-zinc-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Edit3 className="w-5 h-5" /></button>
                        <button className="p-4 bg-zinc-50 rounded-2xl text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-all"><Trash2 className="w-5 h-5" /></button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* CONTENT MANAGEMENT */}
        {activeTab === 'posts' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <header>
                <h3 className="text-3xl font-black uppercase tracking-tighter">Moderace Vědomostí</h3>
                <p className="text-[10px] font-black uppercase text-zinc-400 mt-1 tracking-widest">Správa článků a technických příspěvků na Synthesis Wall</p>
             </header>

             <div className="space-y-4">
                {INITIAL_POSTS.map(post => (
                  <div key={post.id} className="p-8 rounded-[3rem] bg-white border border-black/5 flex items-center justify-between group hover:shadow-xl transition-all">
                     <div className="flex items-center gap-6">
                        <div className="p-4 bg-zinc-50 rounded-2xl text-zinc-400 group-hover:text-blue-600 transition-colors"><FileText className="w-6 h-6" /></div>
                        <div>
                           <h5 className="font-black text-[15px] uppercase tracking-tight">{post.title}</h5>
                           <div className="flex items-center gap-3 mt-1.5">
                              <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Autor: {post.author}</span>
                              <div className="w-1 h-1 bg-zinc-200 rounded-full" />
                              <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{post.category}</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-zinc-50 text-zinc-400 rounded-xl text-[9px] font-black uppercase hover:bg-zinc-950 hover:text-white transition-all">Skrýt</button>
                        <button className="px-5 py-2.5 bg-red-50 text-red-500 rounded-xl text-[9px] font-black uppercase hover:bg-red-500 hover:text-white transition-all">Smazat</button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* SUPERVISION & LOGS */}
        {activeTab === 'supervision' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <header className="flex justify-between items-center">
                <div>
                   <h3 className="text-3xl font-black uppercase tracking-tighter">Systémový Dozor</h3>
                   <p className="text-[10px] font-black uppercase text-zinc-400 mt-1 tracking-widest">Monitorování vnitřních procesů a API komunikace</p>
                </div>
                <button onClick={() => setLogs([])} className="px-6 py-3 bg-zinc-100 text-zinc-500 rounded-xl text-[9px] font-black uppercase hover:bg-zinc-200 transition-all flex items-center gap-2">
                   <Trash2 className="w-3.5 h-3.5" /> Vyčistit Konzoli
                </button>
             </header>

             <div className="bg-zinc-950 rounded-[2.5rem] p-10 font-mono text-[11px] min-h-[400px] shadow-2xl relative overflow-hidden group">
                <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
                   <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                   <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                   <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                   <span className="ml-4 text-zinc-500 uppercase tracking-widest text-[9px]">Synthesis Terminal v2.89 @ mallfurion-node</span>
                </div>
                <div className="space-y-2.5">
                   {logs.map((log, i) => (
                     <div key={i} className="flex gap-6 animate-in slide-in-from-left-2 duration-300">
                        <span className="text-zinc-600 shrink-0">[{log.t}]</span>
                        <span className={log.s === 'err' ? 'text-red-400' : log.s === 'warn' ? 'text-amber-400' : 'text-emerald-400'}>
                           {log.s.toUpperCase()}: {log.m}
                        </span>
                     </div>
                   ))}
                   <div className="flex gap-4 animate-pulse">
                      <span className="text-zinc-600">[{new Date().toLocaleTimeString()}]</span>
                      <span className="text-blue-400">WAITING FOR INPUT...</span>
                      <span className="w-2 h-4 bg-blue-400" />
                   </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-[3rem] bg-white border border-black/5 flex items-center gap-6">
                   <div className="p-4 bg-amber-50 rounded-2xl text-amber-600"><AlertTriangle className="w-7 h-7" /></div>
                   <div>
                      <h5 className="font-black text-[13px] uppercase tracking-tight text-zinc-900">Detekované anomálie</h5>
                      <p className="text-[10px] font-black text-zinc-400 uppercase mt-1">Všechny senzory v normě</p>
                   </div>
                </div>
                <div className="p-8 rounded-[3rem] bg-white border border-black/5 flex items-center gap-6">
                   <div className="p-4 bg-blue-50 rounded-2xl text-blue-600"><MessageSquare className="w-7 h-7" /></div>
                   <div>
                      <h5 className="font-black text-[13px] uppercase tracking-tight text-zinc-900">Fronta zpráv</h5>
                      <p className="text-[10px] font-black text-zinc-400 uppercase mt-1">0 čekajících přenosů</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'polls' && (
           <div className="space-y-8 animate-in fade-in duration-500">
              <header>
                 <h3 className="text-3xl font-black uppercase tracking-tighter">Průzkumy Veřejného Mínění</h3>
                 <p className="text-[10px] font-black uppercase text-zinc-400 mt-1 tracking-widest">Správa komunitních anket a prioritizace vývoje</p>
              </header>
              <div className="py-24 text-center opacity-20 space-y-4">
                 <BarChart2 className="w-16 h-16 mx-auto text-zinc-400" />
                 <p className="text-[11px] font-black uppercase tracking-[0.5em]">Modul pro správu anket bude aktivní v v2.90</p>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};
