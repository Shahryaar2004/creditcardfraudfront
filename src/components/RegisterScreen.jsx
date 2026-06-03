import React, { useState } from 'react';
import { useApp } from './AppContext';
import { UserPlus, Mail, Lock, User, ShieldAlert, ArrowLeft } from 'lucide-react';
import axios from 'axios';

export default function RegisterScreen({ onNavigateToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      // Calls your Express register endpoint
      await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      setSuccessMsg('Identity provisioned successfully! Redirecting to gateway login...');
      setTimeout(() => {
        onNavigateToLogin();
      }, 1500);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Registration structural handshake failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden selection:bg-emerald-500 selection:text-slate-950">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 w-full max-w-md rounded-2xl p-8 space-y-6 shadow-2xl relative z-10 hover:border-slate-700/80 transition-all duration-300">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>

        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl">
            <UserPlus size={28} />
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-wide">IDENTITY PROVISIONING</h3>
          <p className="text-xs text-slate-400 font-mono">Register new cryptographic profile node</p>
        </div>

        {errorMsg && <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-xl font-mono text-center animate-scaleUp">⚠️ {errorMsg}</div>}
        {successMsg && <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3 rounded-xl font-mono text-center animate-scaleUp">✅ {successMsg}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono mb-1">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950/80 text-sm text-white border border-slate-800 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-emerald-500 font-mono" placeholder="Ali" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono mb-1">Email Account</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950/80 text-sm text-white border border-slate-800 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-emerald-500 font-mono" placeholder="ali@gmail.com" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono mb-1">Passphrase</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
              <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-slate-950/80 text-sm text-white border border-slate-800 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-emerald-500 font-mono" placeholder="••••••••" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono mb-1">Clearance Allocation (Role)</label>
            <div className="relative">
              <ShieldAlert size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
              <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-950/80 text-sm text-white border border-slate-800 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-emerald-500 font-mono option:bg-slate-950">
                <option value="user">Standard Client (Sandbox Access Only)</option>
                <option value="analyst">Fraud Analyst (Requires Secure Gatepass)</option>
                <option value="admin">Admin / Bank Staff (Requires Secure Gatepass)</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-emerald-500 text-slate-950 text-xs font-bold py-3.5 rounded-xl uppercase tracking-widest font-mono transition-all hover:bg-emerald-400 disabled:opacity-50 flex items-center justify-center gap-2">
            {isLoading ? <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div> : <span>Provision Account Node</span>}
          </button>
        </form>

        <button onClick={onNavigateToLogin} className="w-full text-center text-xs text-slate-500 hover:text-slate-300 font-mono transition-colors flex items-center justify-center gap-1.5 pt-2">
          <ArrowLeft size={12} /> Return to Login Gateway
        </button>
      </div>
    </div>
  );
}