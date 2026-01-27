import React, { useState, useEffect } from 'react';
import { 
  Globe, MapPin, Scan, Radio, Zap, Database, Bot, Shield, Droplets,
  Activity, Users2, ArrowRight, Fingerprint, MousePointer2,
  Box, Network, MessageSquare, BarChart3, AlertTriangle, Cpu, Trash2, Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [syncProgress, setSyncProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#010202] text-white font-sans selection:bg-emerald-500/50 overflow-x-hidden">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.03),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")` }} />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-scan" />
      </div>

      {/* --- HUD NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-10 py-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Fingerprint className="text-emerald-400" size={32} />
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-[0.2em] uppercase leading-none">PRITHVI<span className="text-emerald-500">LOK</span></span>
              <span className="text-[8px] font-bold text-emerald-500/50 tracking-[0.4em] uppercase">Climate OS v4.0.2</span>
            </div>
          </div>
          <button onClick={() => navigate("/dashboard")} className="px-8 py-2 bg-emerald-600 hover:bg-emerald-400 text-black rounded-sm font-black text-[10px] uppercase tracking-widest transition-all skew-x-[-15deg]">
             <span className="inline-block skew-x-[15deg]">Launch Console</span>
          </button>
        </div>
      </nav>

      {/* --- HERO: THE GLOBAL THREAT MONITOR (RESTORED) --- */}
      <section className="relative z-10 pt-48 pb-32 px-10 max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-6 text-left">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black tracking-[0.4em] mb-10 uppercase">
            <Radio size={12} className="animate-pulse" /> Decentralized Infrastructure Active
          </div>
          <h1 className="text-7xl md:text-[110px] font-black leading-[0.8] tracking-tighter uppercase mb-12">
            AWARENESS <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 italic">IS DATA.</span> <br/>
            DATA IS ACTION.
          </h1>
          <p className="text-xl text-gray-500 max-w-xl font-medium mb-12 leading-relaxed uppercase tracking-tighter">
            An ecosystem built for zero noise. No influencers. No ads. Just verifiable environmental intelligence and community-driven climate defense.
          </p>
          <button onClick={() => navigate("/dashboard")} className="px-12 py-5 bg-white text-black rounded-sm font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center gap-3 group">
             Initialize Protocol <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Global Monitor Visual (Restored Image/Map UI) */}
        <div className="lg:col-span-6 relative flex justify-center">
          <div className="relative z-10 w-full max-w-[500px] aspect-square bg-white/[0.01] border border-white/5 rounded-full p-8 backdrop-blur-3xl">
             <div className="absolute inset-0 border-[1px] border-emerald-500/10 rounded-full animate-ping-slow" />
             <div className="w-full h-full rounded-full border border-emerald-500/5 flex items-center justify-center relative overflow-hidden bg-emerald-500/[0.02]">
                <Globe className="text-emerald-500/10 w-3/4 h-3/4 animate-pulse" strokeWidth={0.5} />
                <DataPing top="25%" left="20%" label="AQI: 240 (HAZARD)" color="text-red-500" />
                <DataPing top="65%" left="75%" label="WQI: 7.2 (STABLE)" color="text-emerald-500" />
                <DataPing top="45%" left="55%" label="BIN_NODE_ACTIVE" color="text-blue-500" />
             </div>
          </div>
          
          {/* Tactical HUD Overlay (Restored) */}
          <div className="absolute -bottom-6 right-0 lg:-right-6 bg-[#0a0c0b] border border-white/10 p-6 rounded-2xl backdrop-blur-xl z-20 w-72 shadow-2xl">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} className="text-yellow-500 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-yellow-500">Threat Detect</span>
                </div>
                <span className="text-[8px] text-gray-600 font-black">ID: 992-X</span>
             </div>
             <p className="text-[10px] font-bold text-gray-400 mb-3 uppercase leading-relaxed">Urban Sector 07: Waste saturation detected by 12 nodes.</p>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-[68%] transition-all duration-1000" />
             </div>
          </div>
        </div>
      </section>

      {/* --- THE 6 DETAILED FEATURE SECTIONS --- */}
      <FeatureSection number="01" icon={<Box className="text-emerald-500" />} title="Smart Waste Logic" problem="Most maps ignore dustbins. People litter because finding a bin is harder than finding a cafe." solution="We map every local bin. Our app guides you to the nearest one and tells you exactly how to separate your waste so it actually gets recycled." />
      <FeatureSection number="02" icon={<MessageSquare className="text-blue-500" />} title="Eco-Social Space" problem="Social media is too noisy for serious action. Environmental groups struggle to coordinate through ads and distractions." solution="A dedicated, zero-noise forum for eco-clubs. Organize clean-ups and share local ecological alerts in a space built for mobilization." reverse />
      <FeatureSection number="03" icon={<BarChart3 className="text-purple-500" />} title="Real-Time Intel" problem="Air and water quality data is often hidden in complex reports that the average person never sees." solution="Live AQI and WQI dashboards. We pull data from localized sensors so you know exactly what you are breathing and drinking in real-time." />
      <FeatureSection number="04" icon={<Zap className="text-orange-500" />} title="Tip-Centric Design" problem="Climate change feels like a giant problem that one person can't fix, leading to people giving up." solution="Achievable daily actions. We give you small, localized steps to change your habits one day at a time without the stress." reverse />
      <FeatureSection number="05" icon={<Layers className="text-cyan-500" />} title="Nudge Economy" problem="Environmental work often feels like a thankless job that nobody notices." solution="A point system for participation. Earn digital credits for reporting full bins or joining local drives. Strategic gamification for real habit shifts." />
      <FeatureSection number="06" icon={<Shield className="text-red-500" />} title="Decentralized Hub" problem="Centralized platforms can be censored or shut down, putting your environmental data at risk." solution="Community-driven architecture with no government chokehold. Web3 ensures your movements and data remain safe and permanent." reverse />

      {/* --- SDG MANDATE --- */}
      <section id="mandate" className="px-10 py-32 bg-white/[0.01] border-y border-white/5 overflow-hidden relative z-10">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h3 className="text-6xl font-black uppercase tracking-tighter mb-10 leading-none">THE 7-GOAL <br/> <span className="text-emerald-500 italic">MANDATE.</span></h3>
            <div className="space-y-2">
              <SDGRow goal="06" title="Clean Water & Sanitation" tag="WQI Tracker" />
              <SDGRow goal="11" title="Sustainable Communities" tag="Civic Data" />
              <SDGRow goal="12" title="Responsible Consumption" tag="Waste Nudge" />
              <SDGRow goal="13" title="Climate Action" tag="Awareness Core" />
              <SDGRow goal="14" title="Life Below Water" tag="Runoff Security" />
              <SDGRow goal="15" title="Life on Land" tag="Ecosystem Map" />
              <SDGRow goal="17" title="Partnerships" tag="Decentralized Sync" />
            </div>
          </div>
          <div className="relative flex justify-center group">
             <div className="absolute inset-0 bg-emerald-500/10 blur-[120px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />
             <div className="relative p-16 bg-emerald-500 flex flex-col items-center justify-center rounded-[4rem] rotate-2 group-hover:rotate-0 transition-all duration-700 shadow-2xl">
                <Globe size={120} strokeWidth={3} className="text-black mb-8 animate-pulse" />
                <h4 className="text-4xl font-black uppercase tracking-tighter leading-none text-black text-center mb-4">Planetary <br/> Alignment</h4>
                <p className="font-black text-black/40 uppercase text-[10px] tracking-[0.3em]">United Nations Framework 2030</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- FINAL SYNC --- */}
      <section className="py-48 px-10 text-center relative z-10">
        <Cpu size={64} className="text-emerald-500 animate-spin-slow mx-auto mb-10" />
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 italic leading-none">Awaiting <span className="text-emerald-500 not-italic">Synchronization.</span></h2>
        <button onClick={() => navigate("/dashboard")} className="px-20 py-8 bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-emerald-500 transition-all skew-x-[-15deg]">
           <span className="inline-block skew-x-[15deg]">Initiate Sync Protocol</span>
        </button>
      </section>

      <footer className="px-10 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-black text-gray-700 uppercase tracking-[0.6em]">
        <span>PRITHVILOK INTELLIGENCE // v4.0.2</span>
        <span className="text-emerald-500/50 flex items-center gap-2 uppercase tracking-widest italic"><Shield size={10} /> Secure Node Active</span>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { top: 0% } 100% { top: 100% } }
        .animate-scan { animation: scan 6s linear infinite; }
        @keyframes spin-slow { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        @keyframes ping-slow { 75%, 100% { transform: scale(1.5); opacity: 0; } }
        .animate-ping-slow { animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}} />
    </div>
  );
};

const FeatureSection = ({ number, icon, title, problem, solution, reverse }) => (
  <section className={`py-32 px-10 border-t border-white/5 relative z-10 ${reverse ? 'bg-white/[0.01]' : ''}`}>
    <div className={`max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
      <div>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-emerald-500 font-black italic text-2xl">{number}</span>
          <div className="h-[1px] w-20 bg-emerald-500/30"></div>
        </div>
        <h3 className="text-5xl font-black uppercase tracking-tighter mb-10 leading-none">{title}</h3>
        <div className="space-y-8 text-left uppercase">
          <div>
            <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-3">Problem</h4>
            <p className="text-gray-400 text-lg leading-relaxed tracking-tight font-medium">{problem}</p>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3">Solution</h4>
            <p className="text-white text-lg leading-relaxed tracking-tight font-bold">{solution}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center group relative">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-all" />
        <div className="relative p-20 bg-white/[0.02] border border-white/5 rounded-[4rem] group-hover:border-emerald-500/30 transition-all">
          {React.cloneElement(icon, { size: 100, strokeWidth: 1.5 })}
        </div>
      </div>
    </div>
  </section>
);

const SDGRow = ({ goal, title, tag }) => (
  <div className="flex items-center justify-between py-5 border-b border-white/5 group hover:bg-white/[0.01] px-4 transition-all">
    <div className="flex items-center gap-8">
      <span className="text-[10px] font-black text-gray-700 uppercase group-hover:text-emerald-500 transition-colors">G-{goal}</span>
      <span className="text-sm font-black uppercase tracking-tight text-white/80 group-hover:text-white transition-colors">{title}</span>
    </div>
    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-sm border border-white/5">{tag}</span>
  </div>
);

const DataPing = ({ top, left, label, color }) => (
  <div className="absolute flex flex-col items-center" style={{ top, left }}>
    <div className={`w-2 h-2 rounded-full animate-ping ${color.replace('text', 'bg')}`} />
    <div className={`mt-2 px-2 py-1 bg-black/90 backdrop-blur-md rounded-sm text-[7px] font-black uppercase tracking-widest whitespace-nowrap border border-white/10 ${color}`}>
      {label}
    </div>
  </div>
);

export default LandingPage;