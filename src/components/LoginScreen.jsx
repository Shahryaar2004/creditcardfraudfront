import React, { useState } from 'react';
import { useApp } from './AppContext';
import { ShieldCheck, Eye, EyeOff, Lock, Mail, Server } from 'lucide-react';

export default function LoginScreen() {
  const { loginUser } = useApp();
  const [email, setEmail] = useState('ali@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    
    // Simulate minor network delay for impressive loading state spinner
    setTimeout(async () => {
      const res = await loginUser(email, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.error || "Authentication authorization refused.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Dynamic Animated Core Blur Elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none delay-1000"></div>

      {/* Main Glassmorphic Card Container */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 w-full max-w-md rounded-2xl p-8 space-y-6 shadow-2xl shadow-emerald-500/5 transition-all duration-500 hover:border-slate-700/80 relative z-10">
        
        {/* Animated Security Border Glow Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse"></div>

        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl relative transition-transform duration-300 hover:scale-105 group">
            <ShieldCheck size={32} className="transition-transform duration-500 group-hover:rotate-[360deg]" />
            <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-wide">PRIME-GUARD GATEWAY</h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1.5 font-mono">
              <Server size={12} className="text-slate-500" /> Secure Cloud Database Session Node
            </p>
          </div>
        </div>

        {/* Error Feedback Wrapper Alert */}
        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3.5 rounded-xl text-center font-mono animate-scaleUp flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
            {errorMsg}
          </div>
        )}

        {/* Login Submission Credentials Form */}
        <form onSubmit={handleFormLogin} className="space-y-5">
          
          {/* Email Field Panel */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono pl-1">
              Identity Vector (Email)
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                <Mail size={16} />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/80 text-sm text-white border border-slate-800/80 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 font-mono transition-all duration-300"
                placeholder="identity@domain.com"
              />
            </div>
          </div>

          {/* Password Field Panel */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono pl-1">
              Cryptographic Passphrase
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                <Lock size={16} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/80 text-sm text-white border border-slate-800/80 rounded-xl pl-11 pr-11 py-3.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 font-mono transition-all duration-300"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Authorization Submission Action Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-emerald-500 text-slate-950 text-xs font-bold py-4 rounded-xl uppercase tracking-widest font-mono transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying Security Matrix...</span>
              </>
            ) : (
              <span>Establish Session Token</span>
            )}
          </button>
        </form>
        
        {/* Verification Footnote Metadata */}
        <div className="text-center pt-2">
          <p className="text-[9px] font-mono text-slate-600 tracking-wider">
            PCI-DSS COMPLIANT ENCRYPTION HANDSHAKE ACTIVE
          </p>
        </div>

      </div>
    </div>
  );
}