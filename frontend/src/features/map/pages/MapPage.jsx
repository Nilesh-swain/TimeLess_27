import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Plus, Loader2, Search, Camera, X, MapPin, Navigation } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- CUSTOM ICONS ---
const userIcon = L.divIcon({
  className: "user-location-marker",
  html: '<div class="pulse"></div><div class="blue-dot"></div>',
  iconSize: [100, 100],
  iconAnchor: [50, 50],
});

const createBinIcon = (name) =>
  L.divIcon({
    className: "custom-bin-label",
    html: `
      <div class="bin-pill">
        <span>🗑️</span>
        <span>${name.substring(0, 12)}${name.length > 12 ? "..." : ""}</span>
      </div>
    `,
    iconSize: [120, 50],
    iconAnchor: [60, 50],
  });

const MapPage = () => {
  // State Management
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [dustbins, setDustbins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBin, setSelectedBin] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", lat: "", lng: "", image: null });

  // Fetch Bins from Backend
  const fetchDustbins = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dustbins");
      const data = await response.json();
      if (response.ok) setDustbins(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setLoading(false);
      },
      () => {
        setUserLocation([20.2961, 85.8245]); // Fallback coords
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
    fetchDustbins();
  }, []);

  // Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Please capture/upload an image");
    
    setIsUploading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("lat", formData.lat);
    data.append("lng", formData.lng);
    data.append("image", formData.image);

    try {
      const response = await fetch("http://localhost:5000/api/dustbins/add", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        await fetchDustbins();
        setShowModal(false);
        setFormData({ name: "", lat: "", lng: "", image: null });
        alert("Dustbin added successfully!");
      }
    } catch (err) {
      alert("Failed to connect to server");
    } finally {
      setIsUploading(false);
    }
  };

  // Map Interaction Logic
  const AddMarkerEvents = () => {
    useMapEvents({
      click(e) {
        if (isAddingMode) {
          setFormData((prev) => ({
            ...prev,
            lat: e.latlng.lat.toFixed(6),
            lng: e.latlng.lng.toFixed(6),
          }));
          setShowModal(true);
          setIsAddingMode(false); // Disable mode once location is picked
        } else {
          setSelectedBin(null);
        }
      },
    });
    return null;
  };

  const filteredBins = dustbins.filter((bin) =>
    bin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-full bg-transparent">
        <Loader2 className="w-12 h-12 animate-spin text-green-600" />
        <p className="mt-4 font-bold text-gray-400">Loading Geospatial Data...</p>
      </div>
    );

  return (
    /* Fix: Main container set to relative, full height of parent, and hidden overflow */
    <div className="relative w-full h-full min-h-[calc(100vh-80px)] overflow-hidden flex flex-col">
      
      {/* 1. SEARCH BAR - Increased z-index for visibility */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1001] w-full max-w-md px-4">
        <div className="relative flex items-center bg-[#0a0f0d] rounded-2xl shadow-2xl border border-white/10 p-1">
          <Search className="ml-4 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search for nearby bins..."
            className="w-full p-3 bg-transparent rounded-xl focus:outline-none text-gray-200 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 2. INSTRUCTIONAL POP-UP */}
      {isAddingMode && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[1001] animate-in fade-in zoom-in duration-300">
          <div className="bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border-2 border-white/20">
            <MapPin size={20} className="animate-pulse" />
            <span className="font-bold">Tap the map to place a bin</span>
            <button 
              onClick={() => setIsAddingMode(false)}
              className="ml-2 p-1 hover:bg-green-700 rounded-full transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* 3. BOTTOM LEFT INFO PANEL */}
      {selectedBin && (
        <div className="absolute bottom-6 left-6 z-[1001] w-80 bg-[#0d1311] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-left-8 duration-500">
          <div className="relative">
            <img src={selectedBin.imageUrl} className="w-full h-44 object-cover opacity-80" alt="bin" />
            <button 
              onClick={() => setSelectedBin(null)}
              className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/80 transition"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-black text-gray-100 tracking-tight">{selectedBin.name}</h3>
            <div className="flex items-center gap-2 mt-2 text-gray-500 font-medium text-sm">
              <MapPin size={16} />
              <span>{selectedBin.lat}, {selectedBin.lng}</span>
            </div>
            <button
              onClick={() => window.open(`https://www.google.com/maps?q=${selectedBin.lat},${selectedBin.lng}`, "_blank")}
              className="w-full mt-6 bg-green-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-green-500 shadow-lg shadow-green-900/20 transition"
            >
              <Navigation size={20} />
              Start Navigation
            </button>
          </div>
        </div>
      )}

      {/* 4. FLOATING ACTION BUTTON */}
      <div className="absolute bottom-8 right-8 z-[1001]">
        <button
          onClick={() => {
            setIsAddingMode(!isAddingMode);
            setSelectedBin(null);
          }}
          className={`p-6 rounded-full shadow-2xl text-white transition-all transform active:scale-90 flex items-center justify-center ${
            isAddingMode ? "bg-red-500 rotate-45 shadow-red-900/40" : "bg-green-600 hover:bg-green-500 shadow-green-900/40"
          }`}
        >
          <Plus size={36} strokeWidth={3} />
        </button>
      </div>

      {/* LEAFLET MAP - Wrapped in flex-1 to fill the remaining space of the layout */}
      <div className="flex-1 w-full relative z-0">
        <MapContainer 
            center={userLocation} 
            zoom={15} 
            className="w-full h-full" 
            zoomControl={false}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={userLocation} icon={userIcon} />
            
            {filteredBins.map((bin) => (
            <Marker
                key={bin._id}
                position={[bin.lat, bin.lng]}
                icon={createBinIcon(bin.name)}
                eventHandlers={{
                click: (e) => {
                    setSelectedBin(bin);
                    e.target._map.flyTo([bin.lat, bin.lng], 16, { duration: 1.5 });
                },
                }}
            />
            ))}
            <AddMarkerEvents />
        </MapContainer>
      </div>

      {/* 5. ADD BIN MODAL */}
      {showModal && (
        <div 
          className="absolute inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => !isUploading && setShowModal(false)}
        >
          <div 
            className="bg-[#0d1311] border border-white/10 rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 text-gray-500 hover:text-white transition"
            >
              <X size={28} />
            </button>

            <h2 className="text-3xl font-black text-white mb-2">Register Bin</h2>
            <p className="text-gray-500 font-medium mb-8">Mark this location for the community.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-500 ml-2">Location Name</label>
                <input
                  placeholder="e.g. South Gate Entrance"
                  className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-green-500 text-white transition font-bold"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <label className="flex flex-col items-center justify-center w-full h-52 border-4 border-dashed border-white/5 rounded-[2rem] cursor-pointer hover:bg-white/5 transition overflow-hidden">
                {formData.image ? (
                  <img src={URL.createObjectURL(formData.image)} className="h-full w-full object-cover" alt="upload" />
                ) : (
                  <div className="text-center text-gray-500">
                    <Camera size={50} className="mx-auto mb-2" />
                    <span className="text-sm font-black tracking-widest uppercase">UPLOAD PHOTO</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                />
              </label>

              <button
                disabled={isUploading}
                type="submit"
                className="w-full bg-green-600 text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-green-900/20 active:scale-95 transition-all disabled:bg-gray-800 disabled:text-gray-500"
              >
                {isUploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>PUBLISHING...</span>
                  </div>
                ) : (
                  "CONFIRM LOCATION"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;