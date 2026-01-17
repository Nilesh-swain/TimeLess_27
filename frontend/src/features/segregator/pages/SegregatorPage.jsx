import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  X, 
  ShieldCheck, 
  Info, 
  Leaf,
  Loader2,
  Activity,
  AlertCircle,
  Recycle,
  Trash
} from 'lucide-react';

const SegregatorPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setSelectedImage(reader.result);
    reader.readAsDataURL(file);

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch("https://wasteclassificationan.onrender.com/classify-waste", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Classification failed");

      const data = await response.json();
      
      if (data.is_waste) {
        // Map the new API fields to our State
        setResult({
          type: data.waste_type,
          bin: data.recommended_bin,
          decomposition: data.decomposition_method,
          instruction: data.disposal_instruction,
          points: 50
        });
      } else {
        setError(data.message || "Item not recognized as waste.");
      }
    } catch (err) {
      setError("AI Server connection error. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8 text-white">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black italic tracking-tight">AI SEGREGATOR</h2>
          <p className="text-gray-500 font-medium text-sm">Real-time Material Classification</p>
        </div>
        {selectedImage && (
          <button onClick={resetScanner} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all border border-white/10">
            <X size={18} /> New Scan
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT: IMAGE PREVIEW */}
        <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 h-[500px] flex items-center justify-center">
          {!selectedImage ? (
            <div onClick={() => fileInputRef.current.click()} className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all group">
               <div className="w-20 h-20 bg-green-500/20 rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Camera size={32} className="text-green-500" />
               </div>
               <p className="font-bold text-gray-400">Capture or Upload Photo</p>
               <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>
          ) : (
            <>
              <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center">
                  <Loader2 className="text-green-500 animate-spin mb-4" size={48} />
                  <p className="text-green-500 font-black tracking-widest text-xs uppercase">Analyzing Molecular Structure...</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* RIGHT: AI INSIGHTS */}
        <div className="space-y-6">
          {error && (
            <div className="p-8 rounded-[2.5rem] bg-red-500/10 border border-red-500/20 text-center animate-in zoom-in">
              <AlertCircle className="text-red-500 mx-auto mb-4" size={40} />
              <p className="text-red-400 font-bold">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {/* Main Classification Card */}
              <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-green-600 to-emerald-800 shadow-2xl relative overflow-hidden">
                <ShieldCheck className="absolute -right-4 -bottom-4 text-white/10 w-40 h-40" />
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-wider">AI Verified</span>
                    <span className="flex items-center gap-1 text-green-200 text-xs font-bold">
                       <Activity size={14} /> +{result.points} Points
                    </span>
                  </div>
                  <h3 className="text-4xl font-black mb-2">{result.type}</h3>
                  <div className="flex items-center gap-2 text-green-100/80 font-bold text-sm uppercase tracking-widest">
                    <Recycle size={16} /> Recommended Bin: <span className="text-white underline decoration-white/40">{result.bin}</span>
                  </div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 gap-4">
                {/* Decomposition Info */}
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-2xl h-fit text-blue-400">
                    <Leaf size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Biological Impact</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{result.decomposition}</p>
                  </div>
                </div>

                {/* Disposal Instructions */}
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-2xl h-fit text-amber-400">
                    <Trash size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Disposal Instructions</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{result.instruction}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!result && !error && !isAnalyzing && (
            <div className="h-full min-h-[400px] border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-gray-600">
               <Upload size={48} className="mb-4 opacity-20" />
               <p className="font-bold uppercase tracking-widest text-[10px]">Awaiting system input</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SegregatorPage;