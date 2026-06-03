import React, { useState } from 'react';
import { AppProvider, useApp } from './components/AppContext';
import Navbar from './components/Navbar';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import AdminDashboard from './components/AdminDashboard';
import AnalystWorkspace from './components/AnalystWorkspace';
import CustomerPortal from './components/CustomerPortal';
import { ShieldX } from 'lucide-react';

function MasterContainer() {
  const { token, currentRole, user } = useApp();
  const [authView, setAuthView] = useState('login'); // Tracks toggling between 'login' and 'register'

  // 1. INTERCEPT FLOW FOR UNAUTHENTICATED USERS
  if (!token) {
    if (authView === 'register') {
      return <RegisterScreen onNavigateToLogin={() => setAuthView('login')} />;
    }
    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950">
        {/* Render the core Login input panel */}
        <LoginScreen />
        
        {/* This is the missing signup clickable toggle anchor link */}
        <button 
          onClick={() => setAuthView('register')} 
          className="text-xs text-emerald-400 hover:text-emerald-300 font-mono tracking-wider -mt-12 mb-8 underline transition-colors cursor-pointer relative z-20"
        >
          Need to provision a new account? Sign up here
        </button>
      </div>
    );
  }

  // 2. ENFORCE ACCESS CONTROL ROLES (SRS 5.3 User Classes Verification)
  const holdsAdminClearance = user?.role === 'admin';
  const holdsAnalystClearance = user?.role === 'analyst' || user?.role === 'admin';

  const renderingUnauthorizedBarrier = (requiredRole) => (
    <div className="min-h-[60vh] flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-xl">
        <div className="inline-flex p-3.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">
          <ShieldX size={32} />
        </div>
        <h3 className="text-lg font-bold text-white tracking-wide font-mono">ACCESS PRIVILEGE DENIED</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Your active identity token status is signed as <span className="text-emerald-400 font-bold font-mono">"{user?.role}"</span>. 
          Entering this sector requires explicit <span className="text-rose-400 font-bold font-mono">"{requiredRole}"</span> database credentials.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      <Navbar />
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {currentRole === 'Admin' && (holdsAdminClearance ? <AdminDashboard /> : renderingUnauthorizedBarrier('admin'))}
        {currentRole === 'Analyst' && (holdsAnalystClearance ? <AnalystWorkspace /> : renderingUnauthorizedBarrier('analyst'))}
        {currentRole === 'Customer' && <CustomerPortal />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MasterContainer />
    </AppProvider>
  );
}