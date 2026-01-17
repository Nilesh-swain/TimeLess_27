import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  X, 
  RefreshCcw, 
  ShieldCheck, 
  Info, 
  Trash2, 
  Leaf,
  Loader2,
  Activity,
  AlertCircle
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

    // 1. Show Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);

    // 2. Start API Call
    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file); // API expects a file in 'file' field

    try {
      const response = await fetch("https://wasteclassificationan.onrender.com/classify-waste", {
        method: "POST",
        body: formData,
      });


      if (!response.ok) throw new Error("Classification failed");

      const data = await response.json();
      console.log(data)
      
      // 3. Map API Response to UI
      // Adjusting based on standard classification API outputs (category/label)
      setResult({
        item: data.class || data.label || "Detected Waste",
        category: data.category || "Segregated Material",
        confidence: data.confidence ? `${(data.confidence * 100).toFixed(1)}%` : "N/A",
        instructions: getInstructions(data.class || data.label),
        points: 50
      });
    } catch (err) {
      console.error("API Error:", err);
      setError("Unable to classify this image. Please ensure the item is clear.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper to provide instructions based on detected class
  const getInstructions = (label) => {
    const l = label?.toLowerCase() || "";
    if (l.includes("plastic")) return "Rinse any food residue, crush the bottle, and place it in the BLUE recycling bin.";
    if (l.includes("paper") || l.includes("cardboard")) return "Ensure it is dry and free of oil. Flatten boxes and place in the BLUE bin.";
    if (l.includes("metal") || l.includes("can")) return "Rinse thoroughly. Metal is infinitely recyclable. Place in BLUE bin.";
    if (l.includes("glass")) return "Handle with care. If broken, wrap in paper before disposal in BLUE bin.";
    return "Dispose of this as per local municipality guidelines for general waste.";
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white">AI Segregator</h2>
          <p className="text-gray-500 font-medium">Powered by WasteClassificationAI</p>
        </div>
        {selectedImage && (
          <button 
            onClick={resetScanner}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-2xl font-bold transition-all border border-white/10"
          >
            <X size={20} />
            New Scan
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT SIDE: PREVIEW */}
        <div className="space-y-6">
          {!selectedImage ? (
            <div 
              onClick={() => fileInputRef.current.click()}
              className="h-[450px] border-4 border-dashed border-white/5 rounded-[3rem] bg-white/5 hover:bg-white/10 hover:border-green-500/30 transition-all cursor-pointer flex flex-col items-center justify-center text-center p-10 group"
            >
              <div className="w-20 h-20 bg-green-600/20 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Camera size={40} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-200">Upload Waste Photo</h3>
              <p className="text-gray-500 text-sm mt-2 max-w-xs">AI will automatically detect if it's plastic, paper, metal, or organic.</p>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>
          ) : (
            <div className="relative group overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl h-[450px]">
              <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                  <Loader2 className="text-green-500 animate-spin mb-4" size={48} />
                  <p className="text-green-500 font-black tracking-widest text-xs">AI CLASSIFYING...</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: RESULTS */}
        <div className="space-y-6">
          {error ? (
            <div className="p-8 rounded-[3rem] bg-red-500/10 border border-red-500/20 text-center">
              <AlertCircle className="text-red-500 mx-auto mb-4" size={40} />
              <p className="text-red-500 font-bold">{error}</p>
              <button onClick={resetScanner} className="mt-4 text-sm font-bold text-gray-400 underline">Try again</button>
            </div>
          ) : result ? (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <div className="p-8 rounded-[3rem] bg-gradient-to-br from-green-600 to-emerald-700 shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                  <ShieldCheck className="text-white" size={32} />
                  <span className="bg-white/20 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full">
                    AI Accuracy: {result.confidence}
                  </span>
                </div>
                <h3 className="text-4xl font-black text-white mb-2 capitalize">{result.item}</h3>
                <p className="text-green-100/80 font-bold uppercase tracking-widest text-xs">Detected Material</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5">
                  <Leaf className="text-emerald-400 mb-2" size={20} />
                  <p className="text-2xl font-black text-white">RECYCLABLE</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Status</p>
                </div>
                <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5">
                  <Activity className="text-amber-400 mb-2" size={20} />
                  <p className="text-2xl font-black text-white">+{result.points}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Eco Points</p>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-[#0d1311] border border-white/5 flex gap-5">
                <div className="shrink-0 w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                  <Info size={24} />
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  <span className="block font-bold text-gray-200 mb-1">Disposal Guidance:</span>
                  {result.instructions}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-white/5 rounded-[3rem]">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Upload className="text-gray-600" size={24} />
              </div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Waiting for Scan...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SegregatorPage;