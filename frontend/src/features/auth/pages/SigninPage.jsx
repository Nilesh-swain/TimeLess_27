import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, Leaf, ChevronLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // 1. Store the JWT token and User details in LocalStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      // 2. Redirect to dashboard
      navigate('/overview');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080b0a] flex items-center justify-center p-6 relative overflow-hidden text-white">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-900/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-xl shadow-2xl z-10">
        
        {/* --- LEFT SIDE: FORM --- */}
        <div className="p-8 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
          <div className="mb-10">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors text-xs font-bold uppercase tracking-widest mb-6"
            >
              <ChevronLeft size={16} />
              Back to Home
            </button>
            <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
            <p className="text-gray-500 font-medium">Enter your credentials to access your eco-dashboard.</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-500 transition-colors" size={20} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-white placeholder:text-gray-600"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Password</label>
                <button type="button" className="text-[10px] font-bold text-green-500 hover:underline uppercase tracking-tighter">
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-500 transition-colors" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-white placeholder:text-gray-600"
                  onChange={handleChange}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl mt-4 flex items-center justify-center gap-2 transition-all shadow-xl shadow-green-900/20 active:scale-95 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In
                  <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-500 font-medium">
            Don't have an account? {' '}
            <button onClick={() => navigate('/signup')} className="text-green-500 font-bold hover:underline">Sign Up Free</button>
          </p>
        </div>

        {/* --- RIGHT SIDE: BRANDING --- */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-emerald-800 to-green-600 text-white relative order-1 lg:order-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <Leaf size={28} fill="white" />
              </div>
              <span className="text-2xl font-black tracking-tighter italic">ECOHACK</span>
            </div>
            <h1 className="text-5xl font-black leading-[1.1] pt-8">
              Welcome <br /> <span className="text-green-200">Back.</span>
            </h1>
            <p className="text-green-100/70 font-medium max-w-xs pt-4">
              Continue your mission to monitor and improve environmental health in your community.
            </p>
          </div>

          <div className="p-6 rounded-[2rem] bg-black/20 border border-white/10 backdrop-blur-md">
            <p className="text-sm italic text-green-100">"Small acts, when multiplied by millions of people, can transform the world."</p>
            <p className="text-[10px] font-black uppercase tracking-widest mt-4 text-green-300">— Howard Zinn</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SigninPage;