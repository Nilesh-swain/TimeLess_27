import React from 'react';
import { 
  ArrowUpRight, Megaphone, Trash2, ShieldCheck, TreePine, Trophy,
  Zap, Crown, Target, Users2, Flame, Tent, ClipboardCheck,
  Eye, Presentation, BarChart3, Activity, Crosshair, Map
} from 'lucide-react';

const DUMMY_LEADERS = [
    { 
      id: 1, name: "Arjun Sharma", score: 2850, installs: 45, webinars: 12, verified: 120, 
      plantation: 42, rallies: 8, streak: 24, location: "New Delhi", image: "https://i.pravatar.cc/150?u=arjun" 
    },
    { 
      id: 2, name: "Priya Patel", score: 2120, installs: 32, webinars: 8, verified: 85, 
      plantation: 28, rallies: 4, streak: 12, location: "Mumbai", image: "https://i.pravatar.cc/150?u=priya" 
    },
    { 
      id: 3, name: "Rahul Verma", score: 1880, installs: 28, webinars: 5, verified: 40, 
      plantation: 15, rallies: 2, streak: 7, location: "Bangalore", image: "https://i.pravatar.cc/150?u=rahul" 
    }
];

export default function LeadershipPage() {
    const topLeader = DUMMY_LEADERS[0];
    const others = DUMMY_LEADERS.slice(1);

    return (
        <div className="min-h-screen bg-[#020403] text-gray-300 pb-24 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
            
            {/* --- ADVANCED HEADER: ATMOSPHERIC --- */}
            <div className="relative pt-28 pb-48 px-8 border-b border-white/[0.03]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[140px]" />
                    <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")` }} />
                </div>
                
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="group cursor-default flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-8 hover:border-emerald-500/30 transition-all">
                            <Activity className="text-emerald-500 animate-pulse" size={14} />
                            <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Prithvi Intelligence Agency</span>
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
                            Elite <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-700 italic">Guardians</span>
                        </h1>
                        <p className="text-gray-500 text-xs md:text-sm max-w-2xl font-bold uppercase tracking-[0.2em] leading-relaxed">
                            Synchronizing global civilian efforts. Rewarding ground-level climate defense through verifiable impact metrics.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">
                
                {/* --- ADVANCED IMPACT MATRIX --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
                    <ImpactMatrix icon={<Presentation />} label="Seminar" pts="+50" sub="Webinar/Talks" border="border-blue-500/20" glow="shadow-blue-500/5" />
                    <ImpactMatrix icon={<Megaphone />} label="Awareness" pts="+25" sub="Direct Outreach" border="border-yellow-500/20" glow="shadow-yellow-500/5" />
                    <ImpactMatrix icon={<TreePine />} label="Planting" pts="+100" sub="Reforestation" border="border-emerald-500/20" glow="shadow-emerald-500/5" />
                    <ImpactMatrix icon={<Tent />} label="Rallies" pts="+75" sub="Civil Action" border="border-red-500/20" glow="shadow-red-500/5" />
                    <ImpactMatrix icon={<Trash2 />} label="Install" pts="+30" sub="Bin Placement" border="border-cyan-500/20" glow="shadow-cyan-500/5" />
                    <ImpactMatrix icon={<ClipboardCheck />} label="Validation" pts="+15" sub="Data Integrity" border="border-purple-500/20" glow="shadow-purple-500/5" />
                    <ImpactMatrix icon={<Eye />} label="Supervise" pts="+10" sub="Dustbin Streak" border="border-orange-500/20" glow="shadow-orange-500/5" />
                </div>

                {/* --- THE CHAMPION TERMINAL --- */}
                <div className="bg-[#0a0c0b] rounded-[3.5rem] border border-white/5 overflow-hidden mb-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
                    <div className="flex flex-col lg:flex-row">
                        {/* Profile Section */}
                        <div className="lg:w-[40%] p-12 relative bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent">
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="relative group">
                                    <div className="absolute inset-[-10px] bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
                                    <img src={topLeader.image} className="w-48 h-48 rounded-[3rem] object-cover border-2 border-emerald-500/40 relative z-10" alt="champion"/>
                                    <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-black w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl z-20">
                                        <Trophy size={28} />
                                    </div>
                                </div>
                                <h2 className="text-4xl font-black text-white mt-10 tracking-tighter uppercase">{topLeader.name}</h2>
                                <div className="flex items-center gap-3 mt-4 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                    <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest leading-none">Status: Elite Overseer</span>
                                </div>
                            </div>
                        </div>

                        {/* Performance Matrix */}
                        <div className="flex-1 p-12 border-l border-white/[0.03] grid grid-cols-2 gap-6 bg-white/[0.01]">
                            <TerminalStat label="Accumulated Points" value={topLeader.score} icon={<BarChart3 />} color="text-emerald-500" />
                            <TerminalStat label="Dustbin Streak" value={`${topLeader.streak} Days`} icon={<Crosshair />} color="text-orange-500" />
                            <TerminalStat label="Plantation Log" value={`${topLeader.plantation} Units`} icon={<TreePine />} color="text-cyan-500" />
                            <TerminalStat label="Deployments" value={`${topLeader.rallies} Rallies`} icon={<Map />} color="text-red-500" />
                        </div>
                    </div>
                </div>

                {/* --- ADVANCED LEADERBOARD TABLE --- */}
                <div className="bg-[#0a0c0b] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                    <div className="px-10 py-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                        <div>
                            <h4 className="text-xs font-black text-white uppercase tracking-[0.4em]">Guardian Rankings</h4>
                            <p className="text-[10px] text-gray-600 font-bold uppercase mt-1">Showing top performers by deployment density</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 bg-emerald-500/5 px-4 py-2 rounded-xl border border-emerald-500/10">
                                <Users2 size={14} className="text-emerald-500" />
                                <span className="text-[10px] font-black text-white">12.8k Active</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02]">
                                <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5">
                                    <th className="px-10 py-6">ID</th>
                                    <th className="px-10 py-6">Guardian Profile</th>
                                    <th className="px-10 py-6">Deployment Hub</th>
                                    <th className="px-10 py-6">Integrity Rating</th>
                                    <th className="px-10 py-6">Aggregated Score</th>
                                    <th className="px-10 py-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {others.map((leader, index) => (
                                    <tr key={leader.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                                        <td className="px-10 py-8">
                                            <span className="text-lg font-black text-gray-700 group-hover:text-emerald-500 transition-colors">0{index + 2}</span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <img src={leader.image} className="w-12 h-12 rounded-2xl border border-white/10 group-hover:border-emerald-500/50 transition-all" />
                                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#0a0c0b] rounded-full" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-white uppercase text-sm tracking-tight">{leader.name}</p>
                                                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-1">{leader.location}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex gap-2">
                                                <MiniTag label={`${leader.plantation}T`} color="border-emerald-500/20 text-emerald-500" />
                                                <MiniTag label={`${leader.rallies}R`} color="border-red-500/20 text-red-500" />
                                                <MiniTag label={`${leader.streak}D`} color="border-orange-500/20 text-orange-500" />
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-1.5 max-w-[80px] bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400" style={{ width: `${(leader.verified/150)*100}%` }} />
                                                </div>
                                                <span className="text-[10px] font-black text-gray-500 tracking-tighter">{leader.verified}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="text-2xl font-black text-white tracking-tighter group-hover:text-emerald-400 transition-colors">{leader.score}</span>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-600 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                                                <ArrowUpRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- SUB-COMPONENTS ---

const ImpactMatrix = ({ icon, label, pts, sub, border, glow }) => (
    <div className={`bg-[#0d1110] p-6 rounded-[2rem] border ${border} ${glow} shadow-xl group hover:-translate-y-1 transition-all duration-300`}>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-5 text-white/70 group-hover:text-white transition-colors">
            {React.cloneElement(icon, { size: 20 })}
        </div>
        <h4 className="font-black text-white text-2xl tracking-tighter mb-1">{pts}</h4>
        <p className="text-[10px] text-white font-black uppercase tracking-widest">{label}</p>
        <p className="text-[8px] text-gray-600 font-bold uppercase tracking-wider mt-1">{sub}</p>
    </div>
);

const TerminalStat = ({ label, value, icon, color }) => (
    <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${color}`}>
            {React.cloneElement(icon, { size: 20 })}
        </div>
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">{label}</p>
        <span className="text-4xl font-black text-white tracking-tighter">{value}</span>
    </div>
);

const MiniTag = ({ label, color }) => (
    <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase border ${color} bg-white/[0.01]`}>
        {label}
    </span>
);