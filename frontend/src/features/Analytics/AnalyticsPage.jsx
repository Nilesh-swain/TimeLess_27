import React, { useState, useEffect } from "react";
import {
  Activity,
  Radio,
  Monitor,
  AlertCircle,
  Waves,
  ShieldCheck,
  Info,
} from "lucide-react";

const AnalyticsPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#020203] text-[#e0e0e0] p-4 lg:p-10 overflow-x-hidden relative">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full" />
      </div>

      {/* HEADER */}
      <header className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-12 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500/80">
              Nexus Systems v4.2
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extralight text-white">
            Flux{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Terminal
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl">
          <TopStat icon={<Radio size={14} />} label="Uplink" value="Secure" color="text-emerald-400" />
          <div className="w-px h-8 bg-white/10" />
          <TopStat icon={<Monitor size={14} />} label="Engine" value="Active" color="text-blue-400" />
        </div>
      </header>

      <div className="relative z-10 grid lg:grid-cols-12 gap-8">

        {/* UPCOMING WEEK STATUS */}
        <div className="lg:col-span-12 bg-gradient-to-r from-black via-[#08080a] to-black border border-white/5 rounded-[36px] p-8 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-500 mb-2">
              Incoming Week Assessment
            </p>
            <h3 className="text-3xl font-light">
              Status:
              <span className="ml-3 font-bold text-red-500 animate-pulse">
                DANGEROUS
              </span>
            </h3>
            <p className="mt-3 text-xs text-gray-400 max-w-xl">
              High AQI levels expected mid-week. Outdoor exposure discouraged.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-black/40 p-6 rounded-3xl border border-red-500/20">
            <AlertCircle className="text-red-500" size={40} />
            <div>
              <p className="text-[9px] uppercase tracking-widest font-black text-gray-500">
                Risk Index
              </p>
              <p className="text-4xl font-mono font-bold text-red-500">
                8.6 / 10
              </p>
            </div>
          </div>
        </div>

        {/* ATMOSPHERIC VARIANCE (UPDATED GRAPH) */}
        <div className="lg:col-span-8 bg-[#08080a] border border-white/5 rounded-[40px] p-8 shadow-2xl">
          <h2 className="text-lg text-white/80 flex items-center gap-3 mb-6">
            <Activity className="text-emerald-500" size={18} />
            Atmospheric Variance (AQI)
          </h2>

          <div className="relative h-[260px] w-full">

            {/* Y AXIS */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[9px] text-gray-500 font-mono">
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>

            <svg
              className="ml-8 w-[calc(100%-2rem)] h-full"
              viewBox="0 0 700 250"
              preserveAspectRatio="none"
            >
              {/* GRID */}
              {[0, 50, 100, 150, 200].map((y, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={y}
                  x2="700"
                  y2={y}
                  stroke="white"
                  strokeOpacity="0.05"
                />
              ))}

              {/* AQI LINE */}
              <path
                d="M0,140 L100,120 L200,160 L300,90 L400,110 L500,150 L600,130"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="1200"
                strokeDashoffset={isLoaded ? "0" : "1200"}
                className="transition-all duration-[3s]"
              />

              {/* POINTS */}
              {[
                [0, 140],
                [100, 120],
                [200, 160],
                [300, 90],
                [400, 110],
                [500, 150],
                [600, 130],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="5" fill="#10b981" />
              ))}
            </svg>

            {/* X AXIS */}
            <div className="ml-8 mt-3 flex justify-between text-[9px] font-black text-gray-500 tracking-widest">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
              <span>SUN</span>
            </div>
          </div>
        </div>

        {/* WEEKLY PROJECTION */}
        <div className="lg:col-span-4 bg-[#08080a] border border-white/5 rounded-[40px] p-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-6">
            7-Day Perdition
          </h3>

          <div className="flex items-end justify-between gap-2 h-48">
            <ProjectionBar day="M" height="50%" val="112" />
            <ProjectionBar day="T" height="85%" val="188" alert />
            <ProjectionBar day="W" height="40%" val="98" />
            <ProjectionBar day="T" height="65%" val="145" />
            <ProjectionBar day="F" height="55%" val="132" />
            <ProjectionBar day="S" height="30%" val="84" />
            <ProjectionBar day="S" height="35%" val="90" />
          </div>

          <p className="text-[10px] text-gray-500 font-mono mt-6 border-t border-white/5 pt-4">
            <Info size={12} className="inline mr-2 text-emerald-500" />
            Mid-week AQI spike expected.
          </p>
        </div>

        {/* WATER QUALITY */}
        <div className="lg:col-span-12 bg-white/[0.02] border border-white/5 rounded-[48px] p-10">
          <h3 className="text-4xl font-light text-white mb-10">
            Water <span className="font-bold italic">Pollution Variance</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <WaterInsight icon={<AlertCircle className="text-red-500" />} title="Contamination Alert" desc="Nitrogen spike detected mid-week." />
            <WaterInsight icon={<Waves className="text-blue-500" />} title="Flow Status" desc="Average flow stable at 4.2 m/s." />
            <WaterInsight icon={<ShieldCheck className="text-emerald-500" />} title="Bio-Security" desc="Filtration operating at 94% efficiency." />
          </div>
        </div>

      </div>
    </div>
  );
};

/* SUB COMPONENTS */

const TopStat = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-3 px-4 py-1">
    <div className="text-gray-500">{icon}</div>
    <div>
      <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{label}</p>
      <p className={`text-xs font-bold uppercase ${color}`}>{value}</p>
    </div>
  </div>
);

const ProjectionBar = ({ day, height, val, alert }) => (
  <div className="flex flex-col items-center justify-end h-full">
    <span className={`text-[9px] mb-2 ${alert ? "text-red-500" : "text-emerald-400"}`}>
      {val}
    </span>
    <div
      style={{ height }}
      className={`w-3 rounded-t-full ${alert ? "bg-red-500" : "bg-emerald-500"}`}
    />
    <span className={`mt-3 text-[9px] font-black ${alert ? "text-red-500" : "text-gray-500"}`}>
      {day}
    </span>
  </div>
);

const WaterInsight = ({ icon, title, desc }) => (
  <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl hover:-translate-y-1 transition-all">
    <div className="mb-4">{icon}</div>
    <h4 className="text-sm font-bold text-white mb-2 uppercase">{title}</h4>
    <p className="text-xs text-gray-500">{desc}</p>
  </div>
);

export default AnalyticsPage;
