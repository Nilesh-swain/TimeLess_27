import React, { useState, useEffect } from 'react';
import { 
  Wind, 
  Droplets, 
  Trash2, 
  Activity, 
  ChevronRight,
  Loader2,
  Navigation
} from 'lucide-react';

const OverviewPage = () => {
  const [nearbyBins, setNearbyBins] = useState([]);
  const [aqiData, setAqiData] = useState({ value: '...', status: 'Loading', color: 'text-gray-400' });
  const [loading, setLoading] = useState(true);

  // Helper to get color based on AQI category
  const getAQIStyles = (category) => {
    switch (category) {
      case "Good": return "text-green-400";
      case "Moderate": return "text-yellow-400";
      case "Poor": return "text-orange-400";
      case "Very Poor": return "text-red-400";
      case "Severe": return "text-purple-500";
      default: return "text-gray-400";
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        
        try {
          // 1. Fetch Air Quality from FastAPI (Port 8000)
          const aqiResponse = await fetch("http://127.0.0.1:8000/aqi", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat: latitude, lon: longitude }),
          });
          const aqiResult = await aqiResponse.json();
          
          if (!aqiResult.error) {
            setAqiData({
              value: aqiResult.aqi,
              status: aqiResult.category,
              color: getAQIStyles(aqiResult.category)
            });
          }

          // 2. Fetch Nearby Bins from Node backend (Port 5000)
          const binResponse = await fetch("http://localhost:5000/api/dustbins/get-bin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat: latitude, lng: longitude }),
          });
          const binData = await binResponse.json();
          setNearbyBins(Array.isArray(binData) ? binData : []);

        } catch (error) {
          console.error("Dashboard Fetch Error:", error);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Location access denied", err);
        setLoading(false);
        setAqiData({ value: 'N/A', status: 'No GPS', color: 'text-red-500' });
      }
    );
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 p-4 lg:p-8">
      
      {/* --- METRIC CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Air Quality" 
          value={aqiData.value} 
          status={aqiData.status} 
          color={aqiData.color} 
          icon={<Wind />} 
        />
        <MetricCard 
          title="Water pH" 
          value="7.2" 
          status="Safe" 
          color="text-blue-400" 
          icon={<Droplets />} 
        />
        <MetricCard 
          title="Nearby Bins" 
          value={loading ? "..." : nearbyBins.length} 
          status="Within 100m" 
          color="text-amber-400" 
          icon={<Trash2 />} 
        />
        <MetricCard 
          title="Daily Impact" 
          value="+120" 
          status="Points" 
          color="text-emerald-400" 
          icon={<Activity />} 
        />
      </div>

      {/* --- LOWER SECTION: MAP & LIST --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* MAP PREVIEW */}
        <div className="xl:col-span-2 h-[450px] bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-50" />
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md z-10 text-center">
             <Navigation className="text-green-500 mx-auto mb-2 animate-bounce" />
             <p className="text-gray-300 font-bold uppercase tracking-widest text-xs italic">
                Interactive Map Loading...
             </p>
          </div>
        </div>

        {/* QUICK LIST - LIVE BINS */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Trash2 size={20} className="text-green-500" />
              Quick Disposal
            </h3>
            <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded-lg font-black uppercase">
              Live
            </span>
          </div>
          
          <div className="space-y-3 min-h-[300px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                <Loader2 className="animate-spin text-green-500 mb-2" size={32} />
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Scanning GPS...</p>
              </div>
            ) : nearbyBins.length > 0 ? (
              nearbyBins.map((bin) => (
                <NearbyItem 
                  key={bin._id}
                  name={bin.name} 
                  distance="< 100m" 
                  status="Active" 
                  image={bin.imageUrl}
                  lat={bin.lat}
                  lng={bin.lng}
                />
              ))
            ) : (
              <div className="p-10 bg-white/5 border border-dashed border-white/10 rounded-[2rem] text-center">
                <Activity className="text-gray-700 mx-auto mb-3" size={40} />
                <p className="text-sm text-gray-500 font-bold">No bins found nearby</p>
                <p className="text-[10px] text-gray-600 uppercase mt-1">Try moving to a new location</p>
              </div>
            )}
          </div>

          <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold hover:bg-white/10 hover:border-white/20 transition-all mt-2 active:scale-95">
            View All Locations
          </button>
        </div>
      </div>
    </div>
  );
};

// --- INTERNAL COMPONENTS ---

const MetricCard = ({ title, value, status, color, icon }) => (
  <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group cursor-default">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-white/5 ${color} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <div className={`text-[10px] font-black uppercase px-2 py-1 rounded-md bg-white/5 ${color} border border-white/5`}>
        {status}
      </div>
    </div>
    <div className="text-4xl font-black mb-1 tracking-tight text-white">{value}</div>
    <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{title}</div>
  </div>
);

const NearbyItem = ({ name, distance, status, image, lat, lng }) => {
  const handleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
    window.open(url, '_blank');
  };

  return (
    <div 
      onClick={handleNavigate}
      className="p-4 rounded-2xl bg-[#0d1311] border border-white/5 flex items-center justify-between group hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/5 shrink-0">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-green-500 bg-green-500/10">
              <Trash2 size={20} />
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-200 group-hover:text-green-400 transition-colors">
            {name}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
             <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">{distance}</span>
             <span className="w-1 h-1 bg-gray-700 rounded-full" />
             <span className="text-[9px] text-green-500 font-bold uppercase">{status}</span>
          </div>
        </div>
      </div>
      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-green-600 group-hover:text-white transition-all">
        <ChevronRight size={16} />
      </div>
    </div>
  );
};

export default OverviewPage;