import React, { useState, useEffect } from "react";
import {
  Globe,
  Radio,
  Zap,
  Shield,
  ArrowRight,
  Fingerprint,
  Cpu,
  Activity,
  TrendingUp,
  BarChart3,
  Layers
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- LOCAL IMAGE ASSETS ---
// These paths match the depth you provided: ../../../assets/
import img01 from "../../../assets/img03.jpeg";
import img02 from "../../../assets/img02.jpeg";
import img03 from "../../../assets/img01.jpeg";

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#000101] text-white font-sans selection:bg-emerald-500/50 overflow-x-hidden">
      
      {/* --- BACKGROUND HUD LAYER --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(16,185,129,0.07),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")` }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* --- HUD NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[100] bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-8 py-5 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
            <Fingerprint className="text-emerald-400" size={28} />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-[0.3em] uppercase leading-none">
                PRITHVI<span className="text-emerald-500">LOK</span>
              </span>
              <span className="text-[7px] font-bold text-emerald-500/40 tracking-[0.5em] uppercase">Intelligence Terminal</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button onClick={() => navigate("/dashboard")} className="px-6 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all skew-x-[-15deg]">
              <span className="inline-block skew-x-[15deg]">Launch Console</span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 pt-32 pb-20 px-6 md:px-10 max-w-[1600px] mx-auto">
        
        {/* ANALYTICS HEADER */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-[10px] font-black tracking-[0.5em] text-emerald-500 uppercase">Atmospheric Data Stream Active</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Weekly <br /> <span className="text-emerald-500 italic">Analysis.</span>
            </h1>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-8 backdrop-blur-md rounded-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[9px] font-black text-gray-500 tracking-widest uppercase">System Forecast</span>
              <Layers size={14} className="text-emerald-500 opacity-50" />
            </div>
            <div className="text-4xl font-black text-emerald-400 font-mono tracking-tighter flex items-baseline gap-2">
              AQI: 142 <span className="text-xs text-emerald-500/40 font-sans tracking-widest uppercase">Target: Stable</span>
            </div>
            <div className="w-full h-[2px] bg-white/5 mt-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-emerald-500 animate-loading-bar" style={{width: '30%'}} />
            </div>
          </div>
        </div>

        {/* --- DATA VISUALIZATION SECTION --- */}
        <section className="grid lg:grid-cols-12 gap-6 mb-40">
          {/* Trend Graph Container */}
          <div className="lg:col-span-8 bg-white/[0.01] border border-white/10 p-10 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-emerald-500/20">LOG_SEQUENCE: 882-X</div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-12">AQI Trend: Last 7 Cycles</h3>
            
            <div className="relative h-72 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200">
                {/* Horizontal Grid */}
                {[0, 50, 100, 150].map(y => (
                  <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="white" strokeOpacity="0.03" strokeWidth="1" />
                ))}
                {/* Animated Trend Line */}
                <path
                  d="M0,160 Q100,130 200,150 T400,70 T600,110 T800,40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray="1000"
                  strokeDashoffset={isLoaded ? "0" : "1000"}
                  className="drop-shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all duration-[3000ms] ease-out"
                />
              </svg>
              <div className="flex justify-between mt-8 text-[10px] font-black text-gray-600 tracking-[0.2em] uppercase font-mono">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>

          {/* Predictions Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <PredictiveCard day="TOMORROW" aqi="138" status="NOMINAL" />
            <PredictiveCard day="WEDNESDAY" aqi="156" status="INC_RISK" color="text-red-500" />
            <PredictiveCard day="THURSDAY" aqi="121" status="OPTIMAL" color="text-blue-400" />
            <div className="p-8 bg-emerald-500 text-black flex flex-col justify-center items-center text-center cursor-pointer hover:bg-white transition-all group">
              <Zap size={24} className="mb-2 group-hover:scale-125 transition-transform" />
              <span className="font-black text-[10px] tracking-[0.3em] uppercase">Sync External Nodes</span>
            </div>
          </div>
        </section>

        {/* --- FEATURE SECTION (IMAGE DRIVEN) --- */}
        <div className="space-y-48">
          <FeatureBlock 
            num="01" img={img01} tag="Infrastucture" title="Dustbin Finder" 
            desc="Mapping localized disposal units through geospatial intelligence to eliminate urban blind spots." 
          />
          <FeatureBlock 
            num="02" img={img02} tag="Neural Link" title="Eco-Bot Core" reverse
            desc="A decentralized AI coordinator designed to mobilize environmental groups without social noise." 
          />
          <FeatureBlock 
            num="03" img={img03} tag="Computer Vision" title="AI Segregator" 
            desc="Automated material recognition protocols to ensure waste streams are optimized for recycling." 
          />
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 text-center bg-black">
        <Cpu className="mx-auto text-emerald-500/20 mb-6 animate-spin-slow" size={32} />
        <p className="text-[8px] font-black tracking-[1em] text-gray-800 uppercase">PrithviLok // v4.0.2 // Intelligence Secure</p>
      </footer>

      {/* --- ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading-bar { 0% { left: -100% } 100% { left: 100% } }
        .animate-loading-bar { animation: loading-bar 3s linear infinite; }
        @keyframes spin-slow { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
      `}} />
    </div>
  );
};

// --- SUB-COMPONENTS ---

const PredictiveCard = ({ day, aqi, status, color = "text-emerald-500" }) => (
  <div className="p-8 bg-white/[0.02] border border-white/5 flex justify-between items-center hover:bg-emerald-500/5 transition-colors group">
    <div>
      <span className="block text-[8px] font-black text-gray-600 tracking-widest mb-1 uppercase font-mono">{day}</span>
      <span className="text-xl font-black uppercase tracking-tighter group-hover:text-emerald-400 transition-colors">Forecast</span>
    </div>
    <div className="text-right">
      <span className={`block text-3xl font-mono font-black ${color}`}>{aqi}</span>
      <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{status}</span>
    </div>
  </div>
);

const FeatureBlock = ({ num, img, tag, title, desc, reverse }) => (
  <div className={`flex flex-col lg:flex-row items-center gap-16 md:gap-32 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
    <div className="w-full lg:w-1/2 relative group">
      <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-emerald-500/30" />
      <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-emerald-500/30" />
      <div className="aspect-[16/10] overflow-hidden border border-white/10 relative">
        <img src={img} alt={title} className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-4 left-4 bg-emerald-500 text-black font-black text-[8px] px-2 py-0.5 uppercase tracking-[0.2em]">Live_Feed_Node_0{num}</div>
      </div>
    </div>
    <div className="w-full lg:w-1/2">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-emerald-500 font-black text-2xl italic tracking-tighter">{num}</span>
        <div className="h-[1px] w-12 bg-emerald-500/30" />
        <span className="text-[9px] font-black tracking-[0.5em] text-gray-500 uppercase">{tag}</span>
      </div>
      <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">{title}</h2>
      <p className="text-gray-400 text-lg uppercase leading-relaxed font-medium tracking-tight max-w-lg">{desc}</p>
      <button className="mt-10 flex items-center gap-3 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors">
        Read Protocol <ArrowRight size={14} />
      </button>
    </div>
  </div>
);

export default AnalyticsPage;