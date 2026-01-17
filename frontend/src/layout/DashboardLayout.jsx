import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  TrendingUp, MapPin, Wind, Droplets, 
  Camera, MessageSquare, Activity, Bell, Search, User,
  Bot // Imported for the Echo Bot
} from 'lucide-react';

const DashboardLayout = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    // Special handling for the title display
    if (path === 'echobot') return 'Echo AI Bot';
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Overview';
  };

  return (
    <div className="flex h-screen bg-[#080b0a] text-gray-100 overflow-hidden font-sans">
      
      {/* --- 1. FIXED SIDEBAR --- */}
      <aside className="hidden lg:flex w-64 bg-[#0a0f0d] border-r border-white/5 flex-col py-8 px-4 shrink-0">
        <div className="flex items-center gap-3 px-3 mb-10">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-900/40">
            <Activity className="text-white" size={24} />
          </div>
          <span className="text-xl font-black uppercase tracking-widest text-green-50">EcoPulse</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <SidebarItem to="/dashboard" icon={<TrendingUp size={20} />} label="Overview" />
          <SidebarItem to="/dashboard/map" icon={<MapPin size={20} />} label="Dustbins Near You" />
          {/* <SidebarItem to="/dashboard/air" icon={<Wind size={20} />} label="Air Quality" /> */}
          {/* <SidebarItem to="/dashboard/water" icon={<Droplets size={20} />} label="Water Quality" /> */}
          <SidebarItem to="/dashboard/segregator" icon={<Camera size={20} />} label="AI Segregator" />
          
          {/* --- NEW OPTION: ECHO BOT --- */}
          <SidebarItem 
            to="/dashboard/chatbot" 
            icon={<Bot size={20} className="text-emerald-400" />} 
            label="Echo Bot" 
          />

          {/* <SidebarItem to="/dashboard/mentor" icon={<MessageSquare size={20} />} label="Climate Mentor" /> */}
        </nav>

        <div className="pt-6 border-t border-white/5">
          <SidebarItem to="/dashboard/profile" icon={<User size={20} />} label="Account" />
        </div>
      </aside>

      {/* --- 2. MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* --- FIXED NAVBAR --- */}
        <header className="h-20 bg-[#080b0a]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 shrink-0 z-20">
          <div className="flex items-center gap-8">
            <h2 className="text-xl font-black tracking-tight">{getPageTitle()}</h2>
            {/* <div className="hidden md:flex items-center bg-white/5 border border-white/10 px-4 py-2 rounded-xl w-64">
              <Search size={18} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="Ask Echo Bot something..." 
                className="bg-transparent border-none outline-none text-sm ml-3 text-gray-300 w-full"
              />
            </div> */}
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#080b0a]" />
            </button>
            <div className="h-10 w-px bg-white/5 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-green-500 uppercase leading-none">Level 12</p>
                <p className="text-sm font-bold">Warrior</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-600 to-emerald-400 border-2 border-white/10" />
            </div>
          </div>
        </header>

        {/* --- DYNAMIC PAGE CONTENT --- */}
        <main className="flex-1 overflow-y-auto bg-[#080b0a] relative">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ to, icon, label }) => (
  <NavLink 
    to={to}
    end={to === '/dashboard'}
    className={({ isActive }) => `
      flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all
      ${isActive 
        ? 'bg-green-600 text-white shadow-lg shadow-green-900/30' 
        : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}
    `}
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default DashboardLayout;