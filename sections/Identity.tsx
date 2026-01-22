
import React, { useState } from 'react';
import { 
  User, Mail, Hammer, ShieldCheck, Key, Settings, 
  LogOut, ChevronRight, Zap, Bell, CheckCircle2, 
  Fingerprint, Package, Save, Globe, Eye,
  Lock, Shield, Crown, Award, Star, Trash2,
  MailQuestion, Send, Inbox, AlertCircle, Search, Users, X, MessageSquare, Info, ExternalLink, Activity, Trophy, Filter, Calendar as CalendarIcon, ClipboardList
} from 'lucide-react';
import { UserProfile, UserPath, TerminalMail, UserRole } from '../types';
import { MyRepairsContent } from './MyRepairs';

interface Props { 
  lang: 'cs' | 'en'; 
  user: UserProfile;
  allUsers: UserProfile[];
  onUpdateUser: (data: Partial<UserProfile>) => void;
  onLogout: () => void;
  onSendMessage: (toUserId: string, subject: string, body: string) => void;
}

type IdentityTab = 'profile' | 'messages' | 'repairs' | 'inventory' | 'privacy' | 'security';

export const IdentityContent: React.FC<Props> = ({ lang, user, allUsers, onUpdateUser, onLogout, onSendMessage }) => {
  const [activeTab, setActiveTab] = useState<IdentityTab>('profile');
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [showCredentialCard, setShowCredentialCard] = useState(false);
  
  const [msgTo, setMsgTo] = useState('');
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');
  const [userSearch, setUserSearch] = useState('');

  // Filtrování historie zpráv
  const [msgFilterSender, setMsgFilterSender] = useState('');
  const [msgFilterDate, setMsgFilterDate] = useState<'all' | 'today' | 'week' | 'month'>('all');
  
  const isCs = lang === 'cs';

  const filteredUsers = allUsers.filter(u => 
    u.id !== user.id && 
    (u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.id.toLowerCase().includes(userSearch.toLowerCase()))
  );

  const handleSend = () => {
    if (!msgTo || !msgBody.trim()) return;
    onSendMessage(msgTo, msgSubject || (isCs ? 'Bez předmětu' : 'No subject'), msgBody);
    setIsNewMessageOpen(false);
    setMsgTo('');
    setMsgSubject('');
    setMsgBody('');
    alert(isCs ? 'Zpráva odeslána do datastreamu.' : 'Message sent to datastream.');
  };

  const getRoleBadge = (role: UserRole) => {
    switch(role) {
      case UserRole.OWNER: return <div className="px-2 py-0.5 bg-zinc-950 text-white text-[7px] font-black rounded uppercase flex items-center gap-1 shadow-sm"><Crown className="w-2 h-2" /> Majitel - Guru</div>;
      case UserRole.ADMIN: return <div className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[7px] font-black rounded uppercase">Administrátor</div>;
      case UserRole.MODERATOR: return <div className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[7px] font-black rounded uppercase">Moderátor</div>;
      case UserRole.REGISTERED: return <div className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[7px] font-black rounded uppercase">Registrovaný</div>;
      default: return <div className="px-2 py-0.5 bg-zinc-100 text-zinc-400 text-[7px] font-black rounded uppercase">Uživatel</div>;
    }
  };

  // Logika filtrování zpráv
  const filteredMails = user.mail.filter(mail => {
    const matchesSender = mail.from.toLowerCase().includes(msgFilterSender.toLowerCase());
    
    const now = new Date();
    const mailDate = new Date(mail.timestamp);
    let matchesDate = true;

    if (msgFilterDate === 'today') {
      matchesDate = mailDate.toDateString() === now.toDateString();
    } else if (msgFilterDate === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = mailDate >= weekAgo;
    } else if (msgFilterDate === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      matchesDate = mailDate >= monthAgo;
    }

    return matchesSender && matchesDate;
  });

  const CredentialCard = () => (
    <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl relative">
        <div className="h-32 bg-zinc-950 relative overflow-hidden">
           <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 h-full">
                 {Array.from({ length: 32 }).map((_, i) => <div key={i} className="border border-white/10" />)}
              </div>
           </div>
           <div className="absolute bottom-4 left-8 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em]">Node Connection: Stable</span>
           </div>
           <button onClick={() => setShowCredentialCard(false)} className="absolute top-6 right-6 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all"><X className="w-5 h-5" /></button>
        </div>

        <div className="px-10 pb-12 -mt-16 relative z-10">
           <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1 shadow-2xl border-4 border-zinc-950 overflow-hidden">
                 {user.avatarUrl ? <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-[2.2rem]" /> : (
                   <div className="w-full h-full bg-zinc-100 flex items-center justify-center font-black text-4xl text-zinc-300">
                     {user.name[0]}
                   </div>
                 )}
              </div>
              
              <div className="space-y-1">
                 <h3 className="text-3xl font-black uppercase tracking-tighter text-zinc-950 flex items-center justify-center gap-2">
                    {user.name}
                    {user.role === UserRole.OWNER && <Star className="w-5 h-5 text-amber-500 fill-amber-500" />}
                 </h3>
                 <div className="flex justify-center mb-4">{getRoleBadge(user.role)}</div>
                 <div className="px-4 py-1.5 bg-zinc-50 border border-black/5 rounded-full text-[10px] font-mono font-black text-zinc-400">
                    ID: SY-{user.id.toUpperCase()}
                 </div>
              </div>

              <p className="text-[11px] text-zinc-500 font-medium italic max-w-xs">
                "{user.bio || (isCs ? 'Tento operátor zatím nemá vyplněnou technickou biografii.' : 'This operator has not filled their technical bio yet.')}"
              </p>

              <div className="grid grid-cols-2 gap-4 w-full pt-4">
                 <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center">
                    <Activity className="w-4 h-4 text-emerald-600 mb-1" />
                    <span className="text-lg font-black text-emerald-900">{user.wasteSavedTotal}kg</span>
                    <span className="text-[7px] font-black uppercase text-emerald-600/60">Restored Material</span>
                 </div>
                 <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col items-center">
                    <Zap className="w-4 h-4 text-amber-600 mb-1" />
                    <span className="text-lg font-black text-amber-900">{user.lightningCount}</span>
                    <span className="text-[7px] font-black uppercase text-amber-600/60">Synthesis Sparks</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-zinc-50 px-10 py-6 border-t border-black/5 flex justify-between items-center">
           <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase text-zinc-300">Auth Tier</span>
              <span className="text-[10px] font-black uppercase text-zinc-900">{user.path}</span>
           </div>
           <div className="flex items-center gap-2 text-[9px] font-black text-blue-600 uppercase">
              <Globe className="w-3 h-3" /> Synthesis Studio
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-full bg-white -m-6 md:-m-10 relative overflow-hidden min-h-[750px]">
      {showCredentialCard && <CredentialCard />}

      <div className="w-full md:w-72 border-b md:border-r border-black/[0.05] flex flex-row md:flex-col gap-1 p-3 md:p-4 bg-zinc-50/50 overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0">
        <div className="hidden md:flex p-6 mb-4 flex-col items-center text-center">
           <div className="w-24 h-24 rounded-[3rem] bg-zinc-950 text-white flex items-center justify-center font-black text-3xl shadow-2xl mb-4 relative group cursor-pointer overflow-hidden border-4 border-white ring-2 ring-black/5">
              {user.avatarUrl ? <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : user.name[0]}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] uppercase font-black">Změnit</div>
           </div>
           
           <div className="space-y-1">
             <h4 className="font-black text-[16px] uppercase tracking-tight truncate w-full flex items-center justify-center gap-1.5">
               {user.name}
               {user.role === UserRole.OWNER && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
             </h4>
             <div className="flex justify-center">{getRoleBadge(user.role)}</div>
             <button 
                onClick={() => setShowCredentialCard(true)}
                className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/5 rounded-full text-[9px] font-mono font-black text-zinc-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group"
             >
                ID: SY-{user.id.toUpperCase()}
                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
             </button>
           </div>
        </div>

        <div className="flex md:flex-col gap-1 w-full">
          {[
            { id: 'profile', icon: User, label: isCs ? 'Můj Profil' : 'My Profile' },
            { id: 'messages', icon: Inbox, label: isCs ? 'Zprávy' : 'Inbox' },
            { id: 'repairs', icon: ClipboardList, label: isCs ? 'Deník Restitucí' : 'Repair Log' },
            { id: 'inventory', icon: Package, label: isCs ? 'Můj Inventář' : 'My Inventory' },
            { id: 'privacy', icon: Shield, label: isCs ? 'Soukromí' : 'Privacy' },
            { id: 'security', icon: Key, label: isCs ? 'Zabezpečení' : 'Security' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as IdentityTab)}
              className={`flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'text-black bg-white shadow-sm ring-1 ring-black/5' : 'text-zinc-400 hover:text-black hover:bg-black/5'}`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
              {tab.id === 'messages' && user.mail.some(m => !m.isRead) && (
                <div className="w-2 h-2 rounded-full bg-red-500 ml-auto" />
              )}
            </button>
          ))}
        </div>

        <div className="md:mt-auto p-1 md:p-2 ml-auto md:ml-0">
           <button onClick={onLogout} className="flex md:w-full items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3 rounded-xl text-[10px] md:text-[11px] font-black uppercase text-red-500 hover:bg-red-50 transition-all">
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Odhlásit se</span>
           </button>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-10 space-y-8 custom-scroll overflow-y-auto bg-white">
        
        {activeTab === 'profile' && (
          <div className="space-y-10 animate-in fade-in duration-500">
             <header className="flex justify-between items-center border-b border-black/5 pb-6">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Profil Operátora</h3>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Nastavení osobní identity v síti Synthesis</p>
                </div>
                <button className="p-4 bg-zinc-950 text-white rounded-2xl shadow-xl hover:scale-105 transition-all"><Save className="w-5 h-5" /></button>
             </header>

             <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                   <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">Základní identifikace</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-300 ml-4 tracking-widest">Zobrazované jméno</label>
                      <input className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner" defaultValue={user.name} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-300 ml-4 tracking-widest">Kontaktní E-mail</label>
                      <input className="w-full bg-zinc-50 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner" defaultValue={user.email} />
                   </div>
                </div>
                <div className="p-6 rounded-[2rem] bg-zinc-50 border border-black/5 flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <Fingerprint className="w-6 h-6 text-zinc-300" />
                      <div>
                         <span className="text-[10px] font-black uppercase text-zinc-900">Unikátní Operator ID</span>
                         <p className="text-[11px] font-mono text-zinc-400">SY-{user.id.toUpperCase()}</p>
                      </div>
                   </div>
                   <button onClick={() => setShowCredentialCard(true)} className="text-[9px] font-black uppercase text-blue-600 hover:underline">Zobrazit veřejnou kartu</button>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                   <div className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">Biografie a Zkušenosti</h4>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-zinc-300 ml-4 tracking-widest">Technické bio</label>
                   <textarea 
                      className="w-full h-40 bg-zinc-50 border border-black/5 rounded-[2rem] px-6 py-5 text-sm font-medium outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner resize-none" 
                      placeholder="Např.: Specialista na audio techniku, 3D tisk a oživování vintage Tesla zařízení..." 
                      defaultValue={user.bio}
                   />
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                   <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900">Viditelnost v síti</h4>
                </div>
                <div className="p-8 rounded-[3rem] bg-white border border-black/5 flex items-center justify-between group hover:border-emerald-200 transition-all">
                   <div className="flex items-center gap-6">
                      <div className={`p-4 rounded-2xl transition-all ${user.isPublic ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-300'}`}>
                         <Globe className="w-6 h-6" />
                      </div>
                      <div>
                         <span className="text-[12px] font-black uppercase text-zinc-900">Veřejný profil operátora</span>
                         <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-tight">Pokud je zapnuto, ostatní vás mohou přizvat ke kolaborativní opravě.</p>
                      </div>
                   </div>
                   <button 
                      onClick={() => onUpdateUser({ isPublic: !user.isPublic })}
                      className={`w-14 h-8 rounded-full relative transition-all ${user.isPublic ? 'bg-emerald-500' : 'bg-zinc-200'}`}
                   >
                      <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${user.isPublic ? 'left-7 shadow-sm' : 'left-1'}`} />
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* TAB: MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-8 animate-in fade-in duration-500 relative h-full">
             <header className="flex justify-between items-center border-b border-black/5 pb-6">
                <div>
                   <h3 className="text-3xl font-black uppercase tracking-tighter">Komunikační Matrice</h3>
                   <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Historie a správa technických protokolů</p>
                </div>
                <button 
                  onClick={() => setIsNewMessageOpen(true)}
                  className="flex items-center gap-3 px-8 py-4 bg-zinc-950 text-white rounded-2xl text-[11px] font-black uppercase shadow-lg hover:bg-blue-600 transition-all group"
                >
                   <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Zahájit Přenos
                </button>
             </header>

             {/* FILTROVÁNÍ HISTORIE */}
             <div className="bg-zinc-50 border border-black/5 p-6 rounded-[2.5rem] flex flex-col md:flex-row gap-4 items-center shadow-inner">
                <div className="flex-1 w-full relative">
                   <Filter className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                   <input 
                      value={msgFilterSender}
                      onChange={e => setMsgFilterSender(e.target.value)}
                      placeholder={isCs ? "Filtrovat podle odesílatele..." : "Filter by sender..."}
                      className="w-full bg-white border border-black/5 rounded-[1.8rem] pl-14 pr-6 py-4 text-[11px] font-bold uppercase tracking-wider outline-none focus:border-blue-500 transition-all"
                   />
                </div>
                <div className="flex w-full md:w-auto gap-2 bg-white p-1.5 rounded-[1.8rem] border border-black/5">
                   {(['all', 'today', 'week', 'month'] as const).map(f => (
                     <button 
                       key={f}
                       onClick={() => setMsgFilterDate(f)}
                       className={`px-6 py-2.5 rounded-2xl text-[9px] font-black uppercase transition-all ${msgFilterDate === f ? 'bg-zinc-950 text-white shadow-md' : 'text-zinc-400 hover:text-black hover:bg-zinc-50'}`}
                     >
                       {f === 'all' ? (isCs ? 'Vše' : 'All') : f === 'today' ? (isCs ? 'Dnes' : 'Today') : f === 'week' ? (isCs ? 'Týden' : 'Week') : (isCs ? 'Měsíc' : 'Month')}
                     </button>
                   ))}
                </div>
             </div>

             {/* SEZNAM ZPRÁV */}
             <div className="space-y-4">
                {filteredMails.length === 0 ? (
                  <div className="py-24 text-center opacity-10 space-y-6">
                    <MailQuestion className="w-20 h-20 mx-auto" />
                    <p className="text-[12px] font-black uppercase tracking-[0.5em]">Žádné relace odpovídající filtrům</p>
                  </div>
                ) : (
                  filteredMails.map(mail => (
                    <div key={mail.id} className={`p-8 rounded-[3.5rem] bg-white border border-black/5 flex flex-col gap-6 group transition-all hover:shadow-2xl hover:border-blue-500/20 ${!mail.isRead ? 'border-blue-500/30 bg-blue-50/5' : ''}`}>
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm ${!mail.isRead ? 'bg-blue-600 text-white animate-pulse' : 'bg-zinc-100 text-zinc-400'}`}>
                               {mail.from[0]}
                            </div>
                            <div>
                               <div className="flex items-center gap-2">
                                  <span className="text-[13px] font-black uppercase text-zinc-900 leading-none">{mail.from}</span>
                                  {getRoleBadge(mail.fromRole)}
                               </div>
                               <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mt-1.5 flex items-center gap-1.5"><Fingerprint className="w-3 h-3" /> ID: SY-{mail.from.substring(0,4).toUpperCase()}</p>
                            </div>
                         </div>
                         <div className="flex flex-col items-end gap-1.5">
                            {mail.priority === 'high' && <span className="px-3 py-1 bg-red-100 text-red-600 text-[8px] font-black rounded-lg uppercase shadow-sm">Kritický</span>}
                            <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                               <CalendarIcon className="w-3 h-3" /> {new Date(mail.timestamp).toLocaleDateString()}
                            </span>
                         </div>
                      </div>
                      <div className="space-y-3 pl-2 border-l-2 border-black/5">
                        <h4 className="font-black text-[16px] uppercase tracking-tight text-zinc-800">{mail.subject}</h4>
                        <p className="text-[14px] text-zinc-500 font-medium leading-relaxed whitespace-pre-wrap">{mail.body}</p>
                      </div>
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                         <button className="px-6 py-2.5 bg-zinc-100 text-zinc-900 rounded-xl text-[10px] font-black uppercase hover:bg-zinc-950 hover:text-white transition-all">Odpovědět</button>
                         <button className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))
                )}
             </div>
          </div>
        )}

        {/* TAB: REPAIRS (NOVĚ INTEGROVÁNO) */}
        {activeTab === 'repairs' && (
           <div className="animate-in fade-in duration-500 h-full">
              <MyRepairsContent lang={lang} userTier={user.path} />
           </div>
        )}

        {activeTab === 'inventory' && (
           <div className="py-20 text-center space-y-4 opacity-20">
              <Package className="w-16 h-16 mx-auto" />
              <p className="text-[11px] font-black uppercase tracking-[0.4em]">Správa inventáře ve vývoji</p>
           </div>
        )}
      </div>
    </div>
  );
};
