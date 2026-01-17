import React, { use } from 'react';
import { 
  Wind, 
  Trash2, 
  MessageSquare, 
  Camera, 
  Droplets, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  BarChart3 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-gray-100 font-sans selection:bg-green-500/30">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-900/20">
            <Globe className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight uppercase text-green-50">EcoPulse</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-green-400 transition">Solutions</a>
          <a href="#impact" className="hover:text-green-400 transition">Global Impact</a>
          <a href="#dashboard" className="hover:text-green-400 transition">Dashboard</a>
        </div>
        <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-green-900/20 active:scale-95">
          Launch Dashboard
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative px-8 pt-20 pb-32 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent -z-10" />
        
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/30 border border-green-500/20 text-green-400 text-xs font-bold mb-8 animate-fade-in">
            <ShieldCheck size={14} />
            <span>AI-POWERED CLIMATE INTELLIGENCE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-tight">
            Predict. Inform. Act. <br />
            <span className="text-green-500">For a Greener Today.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The all-in-one ecosystem unifying air, water, and waste insights into a single intelligent dashboard powered by AI and community participation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate("/dashboard")} 
              className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 group"
            >
              Get Started Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-4 rounded-2xl font-bold text-lg backdrop-blur-sm transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-8 py-24 bg-[#0d1311]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Ecosystem</h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Wind className="text-blue-400" />}
              title="Air Quality Engine"
              description="Real-time AQI prediction with AI alerts for mask usage and outdoor safety based on traffic and weather patterns."
              accent="blue"
            />
            <FeatureCard 
              icon={<Trash2 className="text-green-400" />}
              title="Waste Infrastructure"
              description="Locate nearest recycling centers or drop points. Report overflowing bins and illegal dumping instantly."
              accent="green"
            />
            <FeatureCard 
              icon={<MessageSquare className="text-amber-400" />}
              title="Climate Mentor AI"
              description="Personal everyday assistant providing eco-tips based on your specific location and real-time environment risks."
              accent="amber"
            />
            <FeatureCard 
              icon={<Camera className="text-purple-400" />}
              title="AI Waste Segregator"
              description="Point your camera at trash and let AI instantly detect wet, dry, or hazardous materials with disposal guides."
              accent="purple"
            />
            <FeatureCard 
              icon={<Droplets className="text-cyan-400" />}
              title="Water Monitoring"
              description="Monitor pH, TDS, and contamination risks in your area. Get drinking safety status and conservation tips."
              accent="cyan"
            />
            <FeatureCard 
              icon={<BarChart3 className="text-emerald-400" />}
              title="Measurable Impact"
              description="Track your personal contribution to pollution reduction and waste segregation on a community leaderboard."
              accent="emerald"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-8 py-24 bg-[#0a0f0d]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-8">Data-Backed Awareness <br /> Meets Local Action.</h2>
            <div className="space-y-6">
              <div className="flex gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition">
                <div className="bg-green-600/20 p-3 rounded-xl h-fit text-green-500 italic font-bold">01</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Predict</h4>
                  <p className="text-gray-400 text-sm">We don't just show data; we forecast levels using historical ML models.</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition">
                <div className="bg-green-600/20 p-3 rounded-xl h-fit text-green-500 italic font-bold">02</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Inform</h4>
                  <p className="text-gray-400 text-sm">Actionable intelligence for mask usage, school closures, or irrigation.</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition">
                <div className="bg-green-600/20 p-3 rounded-xl h-fit text-green-500 italic font-bold">03</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Act</h4>
                  <p className="text-gray-400 text-sm">Close the loop by connecting with local eco-clubs and authorities.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="aspect-square bg-green-600/10 rounded-[4rem] flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/20 blur-3xl rounded-full" />
                {/* Mock UI Element */}
                <div className="w-full bg-[#151c19] border border-white/10 rounded-3xl p-6 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-bold">Air Quality Index</span>
                        <span className="text-green-400 text-xs px-2 py-1 bg-green-400/10 rounded-md uppercase font-bold tracking-widest">Live</span>
                    </div>
                    <div className="text-5xl font-black mb-2">42</div>
                    <p className="text-green-500 text-sm mb-4 font-bold">GOOD - Safe for outdoor activities</p>
                    <div className="space-y-2">
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-green-500" />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                            <span>Good</span>
                            <span>Poor</span>
                            <span>Hazardous</span>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Globe className="text-green-600" size={20} />
          <span className="text-lg font-bold tracking-tight uppercase">EcoPulse</span>
        </div>
        <p className="text-gray-500 text-sm">© 2026 EcoPulse Intelligence. Local Impact, Global Relevance.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, accent }) => {
  return (
    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-green-500/30 hover:bg-white/10 transition-all duration-300 group">
      <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {description}
      </p>
      <button className="text-green-400 font-bold text-xs flex items-center gap-2 uppercase tracking-widest group-hover:gap-3 transition-all">
        Learn More <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default LandingPage;