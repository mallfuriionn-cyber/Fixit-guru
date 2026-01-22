
import React, { useState, useMemo } from 'react';
import { 
  Layout, 
  Settings, 
  FileCode, 
  Terminal, 
  Users, 
  ShieldCheck, 
  Database, 
  Activity, 
  Box, 
  ChevronRight, 
  Search, 
  Plus, 
  Save, 
  RefreshCcw, 
  Trash2, 
  ExternalLink,
  Code2,
  Lock,
  Eye,
  ArrowLeft,
  Server,
  Cloud,
  Layers,
  Monitor,
  Shield,
  BadgeCheck,
  UserCog,
  MoreVertical,
  Mail,
  Zap,
  Star,
  Crown
} from 'lucide-react';

interface Props { lang: 'cs' | 'en'; }

type AdminTab = 'dashboard' | 'functions' | 'code' | 'users' | 'security';

interface AdminUser {
  id: string;
  name: string;
  role: 'Owner' | 'Admin' | 'Operator' | 'Guest';
  email: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen: string;
  avatar?: string;
}

export const AdminContent: React.FC<Props> = ({ lang }) => {
  const isCs = lang === 'cs';
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock System Stats
  const stats = [
    { label: isCs ? 'Aktivní relace' : 'Active Sessions', value: '1,284', delta: '+12%', icon: Users, color: 'text-blue-500' },
    { label: isCs ? 'Zpracované dotazy' : 'Queries Processed', value: '42.5k', delta: '+8%', icon: Terminal, color: 'text-emerald-500' },
    { label: isCs ? 'Integrita jádra' : 'Core Integrity', value: '99.98%', delta: '0%', icon: ShieldCheck, color: 'text-purple-500' },
    { label: isCs ? 'Využití API' : 'API Usage', value: '24.1%', delta: '-2%', icon: Activity, color: 'text-amber-500' },
  ];

  const files = [
    { name: 'App.tsx', size: '24.5 KB', lastModified: '2026-02-15', status: 'Active' },
    { name: 'geminiService.ts', size: '12.1 KB', lastModified: '2026-02-14', status: 'Active' },
    { name: 'types.ts', size: '4.2 KB', lastModified: '2026-02-10', status: 'Active' },
    { name: 'sections/Feedback.tsx', size: '18.9 KB', lastModified: '2026-02-15', status: 'Active' },
    { name: 'sections/Admin.tsx', size: '15.4 KB', lastModified: '2026-02-15', status: 'Draft' },
    { name: 'index.html', size: '2.1 KB', lastModified: '2026-01-20', status: 'Active' },
  ];

  const appFunctions = [
    { id: 'diag', name: isCs ? 'Diagnostický Modul' : 'Diagnostic Module', status: 'enabled', version: 'v2.4.2', lastDeploy: '2h ago' },
    { id: 'ar', name: isCs ? 'AR Vision Layer' : 'AR Vision Layer', status: 'enabled', version: 'v1.1.0', lastDeploy: '1d ago' },
    { id: 'speech', name: isCs ? 'Synthesis Speech' : 'Synthesis Speech', status: 'maintenance', version: 'v0.9.5', lastDeploy: '5m ago' },
    { id: 'eco', name: isCs ? 'Eco Tracker Core' : 'Eco Tracker Core', status: 'enabled', version: 'v2.0.1', lastDeploy: '1w ago' },
  ];

  const adminUsers: AdminUser[] = [
    { id: '1', name: 'Mallfurion', role: 'Owner', email: 'mallfurion@synthesis.studio', status: 'online', lastSeen: 'Právě teď' },
    { id: '2', name: 'Synthesis_Bot', role: 'Admin', email: 'core@synthesis.studio', status: 'online', lastSeen: 'Právě teď' },
    { id: '3', name: 'Karel_Senior', role: 'Operator', email: 'karel.dev@fixit.guru', status: 'busy', lastSeen: 'před 5m' },
    { id: '4', name: 'Anonymní_Host', role: 'Guest', email: 'guest@fixit.guru', status: 'online', lastSeen: 'před 2m' },
    { id: '5', name: 'Lucie_Lead', role: 'Operator', email: 'lucie.qa@fixit.guru', status: 'offline', lastSeen: 'včera' },
  ];

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const Sidebar = () => (
    <div className="w-64 border-r border-black/[0.05] flex flex-col gap-1 p-2 bg-zinc-50/50">
      <div className="px-4 py-4 mb-2">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Main Menu</h4>
      </div>
      {[
        { id: 'dashboard', label: isCs ? 'Nástěnka' : 'Dashboard', icon: Layout },
        { id: 'functions', label: isCs ? 'Funkce' : 'Functions', icon: Box },
        { id: 'code', label: isCs ? 'Kód & Soubory' : 'Code & Files', icon: FileCode },
        { id: 'users', label: isCs ? 'Uživatelé' : 'Users', icon: Users },
        { id: 'security', label: isCs ? 'Zabezpečení' : 'Security', icon: ShieldCheck },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => { setActiveTab(item.id as AdminTab); setSelectedFile(null); }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-black text-white shadow-lg shadow-black/10 scale-[1.02]' : 'text-zinc-400 hover:text-black hover:bg-black/5'}`}
        >
          <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-white' : 'text-zinc-400'}`} />
          {item.label}
        </button>
      ))}
      <div className="mt-auto p-4">
         <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
            <span className="text-[8px] font-black uppercase text-purple-600 block mb-1">Owner Node</span>
            <div className="flex items-center gap-2">
               <Crown className="w-3 h-3 text-amber-500" />
               <span className="text-[10px] font-black uppercase text-zinc-900">Mallfurion</span>
            </div>
         </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="p-6 rounded-[2.5rem] bg-white border border-black/5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-zinc-50 ${s.color} group-hover:scale-110 transition-transform`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-black ${s.delta.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{s.delta}</span>
            </div>
            <h5 className="text-[24px] font-black tracking-tighter leading-none mb-1">{s.value}</h5>
            <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-end px-2">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
              {isCs ? 'Nedávná Aktivita Systému' : 'Recent System Activity'}
            </h4>
            <button className="text-[9px] font-black uppercase text-blue-600 hover:underline">Zobrazit logy</button>
          </div>
          <div className="bg-white rounded-[3rem] border border-black/5 overflow-hidden">
            <div className="divide-y divide-black/[0.03]">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="p-6 flex items-center gap-4 hover:bg-zinc-50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-zinc-800 uppercase leading-none mb-1">
                      {isCs ? 'Deploy verze v2.4.8 úspěšně dokončen' : 'Deploy of version v2.4.8 completed'}
                    </p>
                    <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">Operator: Synthesis_Lab • 12:42:01</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 px-2">
            {isCs ? 'Zatížení Serveru' : 'Server Load'}
          </h4>
          <div className="bg-zinc-950 p-8 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center relative z-10">
              <Server className="w-8 h-8 text-blue-400" />
              <div className="text-right">
                <span className="text-[10px] font-black uppercase opacity-40 block mb-1">Node Status</span>
                <span className="text-[10px] font-black uppercase text-emerald-400">Online / Stable</span>
              </div>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-60">
                  <span>CPU Usage</span>
                  <span>42%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '42%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-60">
                  <span>Memory</span>
                  <span>1.4 GB / 4.0 GB</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: '35%' }} />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-600/10 blur-[80px]" />
          </div>
        </div>
      </div>
    </div>
  );

  const FunctionsList = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end px-2">
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
          {isCs ? 'Správa Aplikačních Modulů' : 'Manage Application Modules'}
        </h4>
        <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg">
          <Plus className="w-3 h-3" />
          {isCs ? 'Přidat Modul' : 'Add Module'}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {appFunctions.map((f) => (
          <div key={f.id} className="p-6 rounded-[3rem] bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all flex items-center gap-6 group">
            <div className={`p-4 rounded-3xl ${f.status === 'enabled' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              <Box className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h5 className="text-[13px] font-black uppercase tracking-tight text-zinc-900 leading-none">{f.name}</h5>
                <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded-md border ${f.status === 'enabled' ? 'text-emerald-500 border-emerald-500 bg-emerald-50/50' : 'text-amber-500 border-amber-500 bg-amber-50/50'}`}>
                  {f.status}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[8px] text-zinc-400 font-bold uppercase">Version: {f.version}</span>
                <span className="text-[8px] text-zinc-300 font-bold uppercase">•</span>
                <span className="text-[8px] text-zinc-400 font-bold uppercase">Last Deploy: {f.lastDeploy}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-zinc-50 rounded-2xl text-zinc-400 hover:text-black hover:bg-zinc-100 transition-all"><Settings className="w-4 h-4" /></button>
              <button className="p-3 bg-zinc-50 rounded-2xl text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const UserManagement = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end px-2">
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
          {isCs ? 'Správa Uživatelských Profilů' : 'Manage User Profiles'}
        </h4>
        <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg">
          <Plus className="w-3 h-3" />
          {isCs ? 'Pozvat Operátora' : 'Invite Operator'}
        </button>
      </div>

      <div className="bg-white rounded-[3rem] border border-black/5 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black/[0.03] bg-zinc-50/50">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Operator</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Role</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Last Seen</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.03]">
            {adminUsers.map((u) => (
              <tr key={u.id} className="group hover:bg-zinc-50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black relative ${u.role === 'Owner' ? 'bg-purple-600 text-white shadow-lg' : 'bg-zinc-100 text-zinc-400'}`}>
                      {u.name.charAt(0)}
                      {u.status === 'online' && <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-black uppercase text-zinc-900 leading-none">{u.name}</span>
                        {u.role === 'Owner' && <Crown className="w-3 h-3 text-amber-500" />}
                      </div>
                      <span className="text-[9px] text-zinc-400 font-bold lowercase mt-1">{u.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    {u.role === 'Owner' ? (
                      <div className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100 flex items-center gap-1.5 shadow-sm">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-black uppercase tracking-widest">{isCs ? 'Majitel' : 'Owner'}</span>
                      </div>
                    ) : u.role === 'Admin' ? (
                      <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Admin</span>
                      </div>
                    ) : u.role === 'Guest' ? (
                      <div className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-400 border border-zinc-200 flex items-center gap-1.5">
                        <UserCog className="w-3.5 h-3.5 opacity-40" />
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Guest</span>
                      </div>
                    ) : (
                      <div className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200 flex items-center gap-1.5">
                        <UserCog className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Operator</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6 text-[11px] font-bold text-zinc-400">{u.lastSeen}</td>
                <td className="px-8 py-6">
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${u.status === 'online' ? 'text-emerald-500 border-emerald-500 bg-emerald-50' : u.status === 'busy' ? 'text-amber-500 border-amber-500 bg-amber-50' : 'text-zinc-300 border-zinc-200'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2.5 bg-white border border-black/5 rounded-xl text-zinc-400 hover:text-black hover:shadow-md transition-all"><Mail className="w-4 h-4" /></button>
                    <button className="p-2.5 bg-white border border-black/5 rounded-xl text-zinc-400 hover:text-black hover:shadow-md transition-all"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CodeEditor = ({ fileName, onClose }: { fileName: string, onClose: () => void }) => (
    <div className="fixed inset-0 z-[300] bg-white flex flex-col animate-in fade-in duration-500">
      <header className="h-20 border-b border-black/5 flex items-center justify-between px-8 bg-zinc-50/50 shrink-0">
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="p-3 bg-white border border-black/5 rounded-2xl hover:bg-black hover:text-white transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tighter leading-none">{fileName}</h3>
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-1">Synthesis Code Editor v1.2</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 mr-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-black uppercase text-emerald-600 tracking-widest">Live Preview Ready</span>
          </div>
          <button className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">
            <Save className="w-4 h-4" />
            {isCs ? 'Uložit Změny' : 'Save Changes'}
          </button>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 bg-[#0d0d0f] p-8 overflow-y-auto custom-scroll font-mono text-sm leading-relaxed text-blue-100/80">
          <div className="space-y-1">
            <div className="flex gap-8"><span className="w-8 opacity-20 select-none">1</span><span className="text-purple-400">import</span> React, {'{ useState }'} <span className="text-purple-400">from</span> <span className="text-emerald-400">'react'</span>;</div>
            <div className="flex gap-8"><span className="w-8 opacity-20 select-none">2</span><span className="text-purple-400">import</span> {'{ Layout, Code2 }'} <span className="text-purple-400">from</span> <span className="text-emerald-400">'lucide-react'</span>;</div>
            <div className="flex gap-8"><span className="w-8 opacity-20 select-none">3</span></div>
            <div className="flex gap-8"><span className="w-8 opacity-20 select-none">4</span><span className="text-purple-400">export const</span> App: React.FC = () =&gt; {'{'}</div>
            <div className="flex gap-8"><span className="w-8 opacity-20 select-none">5</span>  <span className="text-purple-400">const</span> [state, setState] = useState(null);</div>
            <div className="flex gap-8"><span className="w-8 opacity-20 select-none">6</span></div>
            <div className="flex gap-8"><span className="w-8 opacity-20 select-none">7</span>  <span className="text-zinc-500 italic">// Synthesis Portal v2.51 Implementation</span></div>
            <div className="flex gap-8"><span className="w-8 opacity-20 select-none">8</span>  <span className="text-purple-400">return</span> (</div>
            <div className="flex gap-8"><span className="w-8 opacity-20 select-none">9</span>    &lt;div className=<span className="text-emerald-400">"portal-container"</span>&gt;</div>
            <div className="flex gap-8"><span className="w-8 opacity-20 select-none">10</span>      &lt;Layout /&gt;</div>
            <div className="flex gap-8"><span className="w-8 opacity-20 select-none">11</span>    &lt;/div&gt;</div>
            <div className="flex gap-8"><span className="w-8 opacity-20 select-none">12</span>  );</div>
            <div className="flex gap-8"><span className="w-8 opacity-20 select-none">13</span>{'}'}</div>
          </div>
        </div>
        <div className="w-[400px] border-l border-black/5 bg-zinc-50 p-8 flex flex-col">
           <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Live Preview</h5>
           <div className="flex-1 bg-white rounded-3xl shadow-xl border border-black/5 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <Monitor className="w-12 h-12 text-zinc-900" />
              <h6 className="text-xl font-black uppercase tracking-tighter">Synthesis Portal</h6>
              <p className="text-[10px] text-zinc-400 font-bold leading-relaxed uppercase">Náhled rozhraní se automaticky aktualizuje po uložení kódu.</p>
           </div>
        </div>
      </div>
    </div>
  );

  const CodeBrowser = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end px-2">
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
          {isCs ? 'Průzkumník Souborů' : 'File Explorer'}
        </h4>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
            <input 
              placeholder={isCs ? "Hledat soubor..." : "Search files..."}
              className="bg-white border border-black/5 rounded-full pl-10 pr-4 py-3 text-[10px] font-bold outline-none focus:border-black transition-all w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-3 bg-white border border-black/5 rounded-full hover:bg-zinc-50 transition-all"><RefreshCcw className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="bg-white rounded-[3rem] border border-black/5 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black/[0.03] bg-zinc-50/50">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Name</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Size</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Modified</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.03]">
            {filteredFiles.map((f, i) => (
              <tr key={i} className="group hover:bg-zinc-50 transition-colors cursor-pointer" onClick={() => setSelectedFile(f.name)}>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <FileCode className="w-5 h-5 text-blue-500" />
                    <span className="text-[12px] font-black uppercase text-zinc-900 group-hover:text-blue-600 transition-colors">{f.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-[11px] font-bold text-zinc-400">{f.size}</td>
                <td className="px-8 py-6 text-[11px] font-bold text-zinc-400">{f.lastModified}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2.5 bg-white border border-black/5 rounded-xl text-zinc-400 hover:text-black hover:shadow-md transition-all"><Eye className="w-4 h-4" /></button>
                    <button className="p-2.5 bg-white border border-black/5 rounded-xl text-zinc-400 hover:text-blue-600 hover:shadow-md transition-all"><Code2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex h-full bg-white -m-10 relative overflow-hidden">
      {selectedFile && <CodeEditor fileName={selectedFile} onClose={() => setSelectedFile(null)} />}
      
      <Sidebar />
      <div className="flex-1 overflow-y-auto custom-scroll p-10 bg-zinc-50/30">
        <header className="flex justify-between items-end mb-10">
          <div>
             <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">
               {activeTab === 'dashboard' ? (isCs ? 'Administrace' : 'Administration') : 
                activeTab === 'functions' ? (isCs ? 'Správa Funkcí' : 'Functions Manager') :
                activeTab === 'code' ? (isCs ? 'Prohlížeč Kódu' : 'Code Explorer') :
                activeTab === 'users' ? (isCs ? 'Správa Operátorů' : 'Operator Database') :
                (isCs ? 'Bezpečnostní Brána' : 'Security Gate')}
             </h3>
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Synthesis Node: Alpha-Prime</span>
             </div>
          </div>
          <div className="flex gap-3">
             <button className="p-4 bg-white border border-black/5 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all"><RefreshCcw className="w-5 h-5 text-zinc-400" /></button>
             <button className="flex items-center gap-3 px-8 py-4 bg-zinc-950 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:scale-105 transition-all">
                <Save className="w-4 h-4" />
                {isCs ? 'Uložit Vše' : 'Commit All'}
             </button>
          </div>
        </header>

        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'functions' && <FunctionsList />}
        {activeTab === 'code' && <CodeBrowser />}
        {activeTab === 'users' && <UserManagement />}
        
        {activeTab === 'security' && (
          <div className="py-20 text-center opacity-20">
            <Lock className="w-20 h-20 mx-auto mb-4" />
            <h5 className="text-xl font-black uppercase">{isCs ? 'Brána je aktivní' : 'Gate is active'}</h5>
          </div>
        )}
      </div>
    </div>
  );
};
