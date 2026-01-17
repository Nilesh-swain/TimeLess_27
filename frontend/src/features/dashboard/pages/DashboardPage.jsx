import React, { useState } from 'react';
import { 
  Wind, 
  Droplets, 
  Trash2, 
  Camera, 
  MessageSquare, 
  AlertTriangle, 
  TrendingUp, 
  Map as MapIcon, 
  Activity,
  User,
  Bell,
  MapPin,
  ChevronRight
} from 'lucide-react';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen bg-[#080b0a] text-gray-100 flex font-sans">
      
      {/* --- LEFT SIDEBAR --- */}
      <aside className="w-20 lg:w-64 bg-[#0a0f0d] border-r border-white/5 flex flex-col items-center lg:items-start py-8 px-4 gap-8 shrink-0">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-900/40">
            <Activity className="text-white" size={24} />
          </div>
          <span className="hidden lg:block text-xl font-black uppercase tracking-widest text-green-50">EcoPulse</span>
        </div>

        <nav className="flex flex-col gap-2 w-full mt-4">
          <NavItem icon={<TrendingUp size={20} />} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          
          {/* NEW OPTION ADDED HERE */}
          <NavItem 
            icon={<MapPin size={20} />} 
            label="Dustbins Near You" 
            active={activeTab === 'Dustbins Near You'} 
            onClick={() => setActiveTab('Dustbins Near You')} 
          />

          <NavItem icon={<MapIcon size={20} />} label="Infrastructure" active={activeTab === 'Infrastructure'} onClick={() => setActiveTab('Infrastructure')} />
          <NavItem icon={<Wind size={20} />} label="Air Quality" active={activeTab === 'Air Quality'} onClick={() => setActiveTab('Air Quality')} />
          <NavItem icon={<Droplets size={20} />} label="Water Quality" active={activeTab === 'Water Quality'} onClick={() => setActiveTab('Water Quality')} />
          <NavItem icon={<Camera size={20} />} label="AI Segregator" active={activeTab === 'AI Segregator'} onClick={() => setActiveTab('AI Segregator')} />
          <NavItem icon={<MessageSquare size={20} />} label="Climate Bot" active={activeTab === 'Climate Bot'} onClick={() => setActiveTab('Climate Bot')} />
        </nav>

        <div className="mt-auto w-full border-t border-white/5 pt-6">
          <NavItem icon={<User size={20} />} label="Profile" active={false} />
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-10">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">{activeTab}</h1>
            <p className="text-gray-500 font-medium">Bhubaneswar, India • Live Geospatial Feed</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-3 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition">
                <Bell size={20} />
             </button>
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-600 to-emerald-400 border-2 border-white/10" />
          </div>
        </header>

        {/* CONDITIONAL RENDERING BASED ON SIDEBAR */}
        {activeTab === 'Overview' ? (
          <div className="space-y-10">
            {/* ... Existing Overview Metric Cards ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="Air Quality" value="42" status="Good" color="text-green-400" icon={<Wind />} />
                <MetricCard title="Water pH" value="7.2" status="Safe" color="text-blue-400" icon={<Droplets />} />
                <MetricCard title="Nearby Bins" value="12" status="Active" color="text-amber-400" icon={<Trash2 />} />
                <MetricCard title="Daily Impact" value="+120" status="Points" color="text-emerald-400" icon={<Activity />} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 h-[400px] bg-white/5 border border-white/5 rounded-[2.5rem] flex items-center justify-center">
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs italic">Map Component Integrated Here</p>
                </div>
                
                {/* NEARBY DUSTBINS QUICK LIST SECTION */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold px-2">Dustbins Near You</h3>
                    <div className="space-y-3">
                        <NearbyItem name="Sector 4 Park" distance="200m" status="Empty" />
                        <NearbyItem name="Main Market Gate" distance="450m" status="Full" />
                        <NearbyItem name="Railway Station" distance="1.2km" status="Empty" />
                    </div>
                    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold hover:bg-white/10 transition">
                        View All Locations
                    </button>
                </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-white/5 rounded-[2.5rem]">
            <p className="text-gray-600 font-bold uppercase tracking-widest">{activeTab} Section Loading...</p>
          </div>
        )}
      </main>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
      active 
      ? 'bg-green-600 text-white shadow-lg shadow-green-900/40' 
      : 'text-gray-500 hover:bg-white/5 hover:text-gray-200'
    }`}
  >
    {icon}
    <span className="hidden lg:block font-bold text-sm tracking-wide">{label}</span>
  </button>
);

const MetricCard = ({ title, value, status, color, icon }) => (
  <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-white/5 ${color}`}>{icon}</div>
      <div className={`text-[10px] font-black uppercase px-2 py-1 rounded-md bg-white/5 ${color}`}>{status}</div>
    </div>
    <div className="text-4xl font-black mb-1">{value}</div>
    <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{title}</div>
  </div>
);

const NearbyItem = ({ name, distance, status }) => (
  <div className="p-4 rounded-2xl bg-[#0d1311] border border-white/5 flex items-center justify-between group hover:bg-white/5 transition cursor-pointer">
    <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status === 'Full' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
            <Trash2 size={18} />
        </div>
        <div>
            <h4 className="text-sm font-bold">{name}</h4>
            <p className="text-[10px] text-gray-500 font-medium">{distance} away • {status}</p>
        </div>
    </div>
    <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition" />
  </div>
);

export default DashboardPage;