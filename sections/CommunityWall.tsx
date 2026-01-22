
import React, { useState } from 'react';
import { 
  FileText, BarChart2, Calendar, User, ChevronRight, 
  ArrowRight, Search, Zap, CheckCircle2, Globe, Clock, 
  MessageSquare, Tag, Bookmark, ArrowLeft, Share2, 
  MoreHorizontal, Printer, Heart, Send, AlertTriangle, 
  Activity, Code, ListOrdered
} from 'lucide-react';
import { SynthesisPost, SynthesisPoll, SynthesisComment } from '../types';

interface Props { lang: 'cs' | 'en'; }

// Komponenta pro renderování technického obsahu
const TechnicalContent: React.FC<{ text: string; lang: string }> = ({ text, lang }) => {
  const isCs = lang === 'cs';
  
  // Velmi jednoduchý parser pro speciální bloky (v reálné appce by byl robustnější)
  const lines = text.split('\n');
  
  return (
    <div className="space-y-6">
      {lines.map((line, i) => {
        const trimLine = line.trim();
        
        // Renderování nadpisů (začínají #)
        if (trimLine.startsWith('# ')) {
          return <h3 key={i} className="text-2xl font-black uppercase tracking-tighter mt-12 mb-4 border-b-2 border-black/5 pb-2">{trimLine.replace('# ', '')}</h3>;
        }

        // Renderování varování (začínají !)
        if (trimLine.startsWith('! ')) {
          return (
            <div key={i} className="p-6 rounded-[2rem] bg-red-50 border-2 border-red-100 flex gap-4 animate-pulse-soft">
              <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
              <div>
                <span className="text-[9px] font-black uppercase text-red-600 tracking-widest block mb-1">Safety Protocol</span>
                <p className="text-sm font-bold text-red-900 leading-tight">{trimLine.replace('! ', '')}</p>
              </div>
            </div>
          );
        }

        // Renderování měření (začínají @)
        if (trimLine.startsWith('@ ')) {
          return (
            <div key={i} className="p-5 rounded-[2rem] bg-blue-50 border border-blue-100 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-black uppercase text-blue-900 tracking-tight">{trimLine.replace('@ ', '')}</span>
              </div>
              <span className="text-[9px] font-black uppercase text-blue-400">Nominal Status</span>
            </div>
          );
        }

        // Renderování kódu/terminálu (začínají >)
        if (trimLine.startsWith('> ')) {
          return (
            <div key={i} className="p-6 rounded-2xl bg-zinc-900 text-emerald-400 font-mono text-xs overflow-x-auto shadow-2xl">
              <div className="flex gap-1.5 mb-3 opacity-30">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <code className="block">$ {trimLine.replace('> ', '')}</code>
            </div>
          );
        }

        // Renderování seznamu kroků (začínají - )
        if (trimLine.startsWith('- ')) {
          return (
            <div key={i} className="flex gap-4 pl-2">
              <div className="w-5 h-5 rounded bg-zinc-100 border border-black/5 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </div>
              <p className="text-[14px] text-zinc-700 font-medium">{trimLine.replace('- ', '')}</p>
            </div>
          );
        }

        // Standardní odstavec
        if (trimLine === '') return <div key={i} className="h-2" />;
        return <p key={i} className="text-[15px] text-zinc-800 leading-[1.8] font-medium">{trimLine}</p>;
      })}
    </div>
  );
};

export const CommunityWall: React.FC<Props> = ({ lang }) => {
  const isCs = lang === 'cs';
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const [posts, setPosts] = useState<SynthesisPost[]>([
    { 
      id: 'p1', 
      title: 'Hluboká restaurace Transiwatt 140', 
      excerpt: 'Karel sdílí své zkušenosti s oživováním československé hi-fi legendy. Od formování kondenzátorů po precizní nastavení symetrie napájení.', 
      content: `# Diagnostika vstupního stavu
Tento konkrétní kus z roku 1984 vykazoval silný brum v levém kanálu a nesymetrii na výstupu (+12V DC na svorkách reproduktoru). 

! POZOR: Před měřením vnitřních obvodů Transiwatt 140 se ujistěte, že máte připojenou umělou zátěž (8 Ohm / 100W). Bez zátěže hrozí zničení koncových tranzistorů při rozkmitání.

Materiál PETG je pro většinu mechanických dílů ideální volbou díky své houževnatosti a tepelné odolnosti. Pokud však tisknete ozubená kola, doporučujeme zvážit Nylon (PA) s příměsí karbonových vláken.

# Technické parametry (Karel Optimized)
@ Klidový proud: 25mA (nastaveno trimrem R142)
@ Napájecí větev: +/- 42V DC
@ Offset na výstupu: < 10mV

> measure --offset --channel-left --output terminal

# Postup práce
- Vizuální kontrola: Hledejte tzv. "hovňáky" (oranžové kondenzátory hovnivály), ty musí jít bezpodmínečně ven.
- Formování filtrů: Postupné zvyšování napětí přes regulační autotransformátor po dobu 4 hodin.
- Výměna budičů: Původní tranzistory nahrazeny nízkošumovými BC550C pro snížení hladiny šumu o 12dB.`,
      category: 'Restituce', 
      author: 'Karel', 
      status: 'published', 
      date: new Date('2026-01-22'),
      comments: [
        { id: 'c1', author: 'Mallfurion', content: 'Skvělá práce Karle. Ty budiče dělají u TW140 opravdu hodně. Zkoušel jsi i úpravu zpětné vazby?', date: new Date('2026-01-23') },
        { id: 'c2', author: 'Technik_X', content: 'Mám tu jeden kus v podobném stavu. Můžeš poslat detailnější fotku toho nastavení trimrů?', date: new Date('2026-01-23') }
      ]
    },
    { 
      id: 'p2', 
      title: 'Symbiotické pěstování: Houby a Rajčata', 
      excerpt: 'Dášin revoluční přístup k využití mykorhizních hub pro zvýšení rezistence rajčat proti plísni bramborové bez gramu chemie.', 
      content: `# Organická synergie
Houby nejsou jen ozdobou lesa, jsou to nervová soustava země. V Studio Synthesis experimentujeme s inokulací kořenů rajčat kmeny Glomus intraradices.

! Nikdy nepoužívejte fungicidy v záhonu s mykorhizou. Jediný postřik zabije roky budovanou síť hyf.

# Metodika inokulace
- Přidejte hrst mykorhizního přípravku přímo do výsadbové jamky.
- Ujistěte se, že kořeny sazenice jsou v přímém kontaktu s granulátem.
- První dva týdny zalévejte jen odstátou dešťovou vodou bez hnojiv.

# Naměřené hodnoty
@ PH substrátu: 6.2 (Optimální pro mykorhizu)
@ Index biodiverzity: +24% (Zvýšený výskyt prospěšných půdních organismů)

Rajčata s touto podporou vykazují až o 40% vyšší odolnost proti suchu a jejich plody mají prokazatelně vyšší obsah lykopenu.`,
      category: 'Organic', 
      author: 'Dáša', 
      status: 'published', 
      date: new Date('2026-01-20'),
      comments: [
        { id: 'c3', author: 'Sara_Botanist', content: 'Dášo, zkoušela jsi to i u paprik? Slyšela jsem, že jsou na mykorhizu ještě citlivější.', date: new Date('2026-01-21') }
      ]
    },
    { 
      id: 'p3', 
      title: 'Bezpečnost v dílně: ESD Standard v2.80', 
      excerpt: 'Lucie připravila přísný metodický list pro každého, kdo sahá do útrob moderní elektroniky. Proč je váš vlněný svetr nepřítelem číslo jedna.', 
      content: `# Neviditelný zabiják
Elektrostatický výboj (ESD) může zničit CMOS součástku, aniž byste cítili sebemenší kopnutí. 100V stačí k proražení hradla MOSFETu, zatímco člověk cítí výboj až od 3000V.

! VŽDY používejte ESD náramek připojený k zemnícímu bodu budovy přes 1MOhm odpor.

# Seznam nezbytného vybavení
- ESD podložka (dvouvrstvá, disipativní)
- Zemnící náramek s pružným kabelem
- Antistatický kartáček na čištění PCB
- Ionizátor vzduchu (pro kritické operace)

# Metodický postup (Step-Lock)
- Odložte veškerý oděv z umělých vláken (vlnu, polyester).
- Připevněte náramek na zápěstí a prověřte kontinuitu testerem.
- Vyjměte součástku z antistatického obalu až v momentě, kdy jste sami uzemněni.

@ Potenciál pracovní plochy: 0V (GND-Sync)
@ Relativní vlhkost: 45% (Ideální prevence statiky)`,
      category: 'Metodika', 
      author: 'Lucie', 
      status: 'published', 
      date: new Date('2026-01-18'),
      comments: []
    },
  ]);

  const [polls, setPolls] = useState<SynthesisPoll[]>([
    { 
      id: 'poll1', 
      question: 'Kterého specialistu máme posílit příští měsíc?', 
      options: [
        { id: 'o1', label: 'Karla (Víc schémat PCB)', votes: 124 },
        { id: 'o2', label: 'Dášu (Hydroponické moduly)', votes: 86 },
        { id: 'o3', label: 'Františka (Stavba z kontejnerů)', votes: 52 }
      ],
      totalVotes: 262,
      isActive: true
    }
  ]);

  const handleVote = (pollId: string, optionId: string) => {
    setPolls(prev => prev.map(p => {
      if (p.id === pollId) {
        return {
          ...p,
          options: p.options.map(o => o.id === optionId ? { ...o, votes: o.votes + 1 } : o),
          totalVotes: p.totalVotes + 1,
          userVotedOptionId: optionId
        };
      }
      return p;
    }));
  };

  const handleAddComment = () => {
    if (!commentText.trim() || !selectedPostId) return;
    
    const newComment: SynthesisComment = {
      id: Date.now().toString(),
      author: 'Mallfurion', 
      content: commentText,
      date: new Date()
    };

    setPosts(prev => prev.map(p => {
      if (p.id === selectedPostId) {
        return {
          ...p,
          comments: [...(p.comments || []), newComment]
        };
      }
      return p;
    }));
    setCommentText('');
  };

  const selectedPost = posts.find(p => p.id === selectedPostId);

  if (selectedPost) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 pb-20 max-w-4xl mx-auto">
        <button 
          onClick={() => setSelectedPostId(null)}
          className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400 hover:text-black transition-all mb-8 bg-zinc-50 px-4 py-2 rounded-full border border-black/5"
        >
          <ArrowLeft className="w-4 h-4" />
          {isCs ? 'Zpět na zeď' : 'Back to Wall'}
        </button>

        <article className="space-y-10">
          <header className="space-y-6">
            <div className="flex items-center gap-4">
               <span className="px-4 py-1.5 bg-zinc-950 text-white rounded-full text-[10px] font-black uppercase tracking-widest">{selectedPost.category}</span>
               <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-black uppercase">
                  <Calendar className="w-4 h-4" /> {selectedPost.date.toLocaleDateString()}
               </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight text-zinc-900">
              {selectedPost.title}
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-black/5">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center font-black text-xl text-zinc-900 border border-black/5">
                    {selectedPost.author[0]}
                  </div>
                  <div>
                    <span className="block text-[11px] font-black uppercase text-zinc-900 leading-none">{selectedPost.author}</span>
                    <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest mt-1 block">Synthesis Expert</span>
                  </div>
               </div>
               <div className="flex gap-2">
                  <button className="p-3 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-all"><Share2 className="w-5 h-5" /></button>
                  <button className="p-3 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-all"><Bookmark className="w-5 h-5" /></button>
               </div>
            </div>
          </header>

          <div className="max-w-none">
             <p className="text-lg font-bold text-zinc-600 leading-relaxed mb-12 border-l-4 border-blue-500 pl-6 italic">
               {selectedPost.excerpt}
             </p>
             <TechnicalContent text={selectedPost.content || ""} lang={lang} />
          </div>

          <footer className="pt-12 border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400 hover:text-red-500 transition-colors">
                   <Heart className="w-4 h-4" /> 128 Líbí se mi
                </button>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400">
                   <MessageSquare className="w-4 h-4" /> {selectedPost.comments?.length || 0} {isCs ? 'Komentářů' : 'Comments'}
                </div>
             </div>
             <button className="flex items-center gap-3 px-8 py-4 bg-zinc-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                Stáhnout jako PDF <Printer className="w-4 h-4" />
             </button>
          </footer>

          {/* Sekce komentářů */}
          <section className="pt-16 space-y-8">
            <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              {isCs ? 'Diskuze k článku' : 'Discussion'}
            </h3>

            {/* Formulář pro nový komentář */}
            <div className="p-6 bg-zinc-50 rounded-[2.5rem] border border-black/5 space-y-4">
              <textarea 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={isCs ? "Přidejte svůj technický postřeh..." : "Add your technical observation..."}
                className="w-full bg-white border border-black/5 rounded-[1.8rem] p-6 text-sm font-medium outline-none focus:border-blue-500 transition-all resize-none shadow-inner"
                rows={3}
              />
              <div className="flex justify-end">
                <button 
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="px-8 py-3 bg-zinc-950 text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-zinc-950 transition-all"
                >
                  {isCs ? 'Odeslat komentář' : 'Post comment'} <Send className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Seznam komentářů */}
            <div className="space-y-6">
              {selectedPost.comments && selectedPost.comments.length > 0 ? (
                selectedPost.comments.map(comment => (
                  <div key={comment.id} className="flex gap-4 p-6 bg-white border border-black/5 rounded-[2rem] animate-in fade-in duration-300">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center font-black text-xs text-zinc-400 shrink-0 uppercase border border-black/5">
                      {comment.author[0]}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-tight text-zinc-900">{comment.author}</span>
                        <span className="text-[8px] font-black text-zinc-300 uppercase">{comment.date.toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 opacity-20 space-y-3">
                  <MessageSquare className="w-12 h-12 mx-auto" />
                  <p className="text-[10px] font-black uppercase tracking-widest">{isCs ? 'Zatím žádné komentáře' : 'No comments yet'}</p>
                </div>
              )}
            </div>
          </section>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col gap-4 border-l-4 border-zinc-950 pl-6 py-2">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Synthesis Feed</span>
        <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
          {isCs ? 'Komunitní zeď' : 'Community Wall'}
        </h2>
      </header>

      {/* Ticker pro novinky */}
      <div className="bg-zinc-950 text-white py-3 px-6 rounded-full flex items-center gap-4 overflow-hidden shadow-xl">
         <span className="text-[10px] font-black uppercase text-blue-400 shrink-0">BLESKOVKA:</span>
         <div className="flex gap-10 whitespace-nowrap animate-marquee">
            <span className="text-[10px] font-bold uppercase tracking-tight italic">Nová verze jader Gemini 3 Pro nasazena do všech specialistů.</span>
            <span className="text-[10px] font-bold uppercase tracking-tight italic">Workshop: Restaurování vintage hi-fi techniky v sobotu v 18:00.</span>
            <span className="text-[10px] font-bold uppercase tracking-tight italic">Úspěšně zachráněno 12 tun elektroodpadu tento měsíc v síti Synthesis.</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sloupec s články */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between mb-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">{isCs ? 'Nejnovější články' : 'Latest Posts'}</h4>
              <Search className="w-4 h-4 text-zinc-300" />
           </div>
           
           {posts.map(post => (
             <div 
               key={post.id} 
               onClick={() => setSelectedPostId(post.id)}
               className="group p-8 rounded-[3rem] bg-white border border-black/5 hover:shadow-xl transition-all cursor-pointer"
             >
                <div className="flex justify-between items-start mb-4">
                   <span className="px-3 py-1 bg-zinc-50 rounded-full text-[9px] font-black uppercase text-zinc-400">{post.category}</span>
                   <div className="flex items-center gap-2 text-zinc-300 text-[9px] font-black uppercase">
                      <Clock className="w-3 h-3" /> {post.date.toLocaleDateString()}
                   </div>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-blue-600 transition-colors mb-3">{post.title}</h3>
                <p className="text-[11px] text-zinc-500 font-medium leading-relaxed mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-black uppercase">{post.author[0]}</div>
                      <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{post.author}</span>
                   </div>
                   <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2 text-[9px] font-black text-zinc-300 uppercase">
                        <MessageSquare className="w-3 h-3" /> {post.comments?.length || 0}
                     </div>
                     <button className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-900 group-hover:gap-4 transition-all">
                        {isCs ? 'Číst více' : 'Read more'} <ArrowRight className="w-4 h-4" />
                     </button>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Sloupec s anketami a mini-widgety */}
        <div className="space-y-8">
           <div className="space-y-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">{isCs ? 'Aktivní ankety' : 'Active Polls'}</h4>
              {polls.map(poll => (
                <div key={poll.id} className="p-8 rounded-[3rem] bg-zinc-50 border border-black/5 space-y-6 shadow-sm">
                   <div className="flex items-center gap-3">
                      <BarChart2 className="w-5 h-5 text-purple-600" />
                      <h5 className="font-black text-[13px] uppercase tracking-tight leading-none">{poll.question}</h5>
                   </div>

                   <div className="space-y-3">
                      {poll.options.map(opt => {
                        const isSelected = poll.userVotedOptionId === opt.id;
                        const percentage = Math.round((opt.votes / poll.totalVotes) * 100);
                        return (
                          <button 
                            key={opt.id}
                            onClick={() => !poll.userVotedOptionId && handleVote(poll.id, opt.id)}
                            disabled={!!poll.userVotedOptionId}
                            className={`w-full text-left p-4 rounded-2xl border transition-all relative overflow-hidden group/opt ${
                              isSelected ? 'bg-zinc-900 border-zinc-900 text-white' : 
                              poll.userVotedOptionId ? 'bg-white border-zinc-100 opacity-60' : 'bg-white border-black/5 hover:border-black'
                            }`}
                          >
                             {poll.userVotedOptionId && (
                               <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" style={{ width: `${percentage}%` }} />
                             )}
                             <div className="flex justify-between items-center relative z-10">
                                <span className="text-[10px] font-bold uppercase">{opt.label}</span>
                                {poll.userVotedOptionId && (
                                  <span className="text-[10px] font-black">{percentage}%</span>
                                )}
                             </div>
                             {isSelected && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />}
                          </button>
                        );
                      })}
                   </div>
                   <div className="text-[9px] font-black text-zinc-300 uppercase tracking-widest text-center">
                      Celkem {poll.totalVotes} technických hlasů
                   </div>
                </div>
              ))}
           </div>

           {/* Newsletter Widget */}
           <div className="p-8 rounded-[3rem] bg-blue-600 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                 <Zap className="w-8 h-8 text-white mb-4" />
                 <h4 className="text-lg font-black uppercase tracking-tight mb-2">Synthesis Bulletin</h4>
                 <p className="text-[10px] font-medium uppercase opacity-70 leading-relaxed mb-6">Získejte týdenní nálož schémat a eko-vychytávek do e-mailu.</p>
                 <div className="flex gap-2">
                    <input className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-[10px] font-bold placeholder:text-white/40 outline-none" placeholder="Váš e-mail..." />
                    <button className="p-3 bg-white text-blue-600 rounded-xl hover:scale-105 transition-all"><ArrowRight className="w-5 h-5" /></button>
                 </div>
              </div>
              <Globe className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 rotate-12" />
           </div>

           {/* Tags Cloud */}
           <div className="p-8 rounded-[3rem] bg-white border border-black/5 space-y-4">
              <h4 className="text-[10px] font-black uppercase text-zinc-300 tracking-widest flex items-center gap-2"><Tag className="w-3 h-3" /> Populární tagy</h4>
              <div className="flex flex-wrap gap-2">
                 {['#3dprint', '#restitution', '#vintage', '#low-power', '#bio-garden', '#fixit'].map(tag => (
                   <span key={tag} className="text-[9px] font-bold text-zinc-400 hover:text-black transition-colors cursor-pointer">{tag}</span>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
