import React from 'react';
import { useApp } from './AppContext';
import { Shield, ShieldAlert, Users, CreditCard, Radio, LogOut } from 'lucide-react';

export default function Navbar() {
  const { currentRole, setCurrentRole, user } = useApp();

  const roles = [
    { id: 'Admin', label: 'Admin / Bank Staff', icon: Users },
    { id: 'Analyst', label: 'Fraud Analyst', icon: ShieldAlert },
    { id: 'Customer', label: 'Transaction Sandbox', icon: CreditCard },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-slate-100 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50">
      
      {/* Platform Branding */}
      <div className="flex items-center gap-3">
        <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/30 text-emerald-400">
          <Shield size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-wider text-white">PRIME-GUARD</h1>
          <p className="text-xs text-slate-400">MERN Fraud Detection Core</p>
        </div>
      </div>

      {/* Role Management Tabs (SRS 5.3 User Classes) */}
      <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full md:w-auto overflow-x-auto">
        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = currentRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => setCurrentRole(role.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon size={16} />
              {role.label}
            </button>
          );
        })}
      </div>

      {/* Database Connection Status & Logout */}
      <div className="flex items-center gap-4 text-xs text-slate-400">
        <div className="hidden lg:flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800">
          <Radio size={14} className="text-emerald-400 animate-pulse" />
          <span>MongoDB Live Stream</span>
        </div>
        
        {user && (
          <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
            <div className="text-right hidden sm:block">
              <p className="text-white font-medium text-xs">{user.name}</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">{user.role}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 bg-slate-950 border border-slate-800 hover:border-rose-500/30 hover:text-rose-400 rounded-lg transition-all"
              title="Terminate Gateway Session"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>

    </nav>
  );
}