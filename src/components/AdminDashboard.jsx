import React, { useState } from 'react';
import { useApp } from './AppContext';
import StatCard from './StatCard';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Activity, ShieldCheck, Zap, Terminal, AlertTriangle, CheckCircle, Eye } from 'lucide-react';

export default function AdminDashboard() {
  const { transactions, performanceMetrics, chartData, toggleUserBlockStatus } = useApp();
  const [targetEmail, setTargetEmail] = useState('ali@gmail.com');

  const COLORS = ['#10b981', '#f59e0b', '#f43f5e']; // Legitimate, Suspicious, Fraudulent colors

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Transactions (MongoDB)" value={performanceMetrics.totalProcessed} icon={Activity} />
        <StatCard title="Threats Automatically Isolated" value={performanceMetrics.totalBlocked} icon={ShieldCheck} type="danger" />
        <StatCard title="Core Core Latency Spec" value={performanceMetrics.avgLatency} icon={Zap} type="success" />
      </div>

      {/* Main Analytics Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Aspect: Live Database Log Pipeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 p-4 border border-slate-800 rounded-xl flex items-center gap-2">
            <Terminal size={18} className="text-emerald-400" />
            <h3 className="font-semibold text-sm text-slate-200">Live Database Pipeline Transactions Logs</h3>
          </div>

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
            {transactions.map((txn) => (
              <div key={txn.id} className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-white">{txn.id}</span>
                    <span className="text-xs text-slate-500 font-mono">({txn.cardNumber})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    <span className="text-slate-200 font-semibold">{txn.vendor}</span> • {txn.location?.name}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-slate-100">${txn.amount}</span>
                  <div className="text-[10px] uppercase font-bold tracking-wider mt-1">
                    <span className={txn.status === 'Fraudulent' ? 'text-rose-400' : txn.status === 'Suspicious' ? 'text-amber-400' : 'text-emerald-400'}>
                      {txn.status} (Risk: {txn.riskScore}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Aspect: Recharts Visualization & Administrative Controls */}
        <div className="space-y-6">
          {/* Recharts Pie Chart Block */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Risk Matrix Allocations</h4>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick User Override Management */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Access Override</h4>
            <input 
              type="email" 
              value={targetEmail} 
              onChange={(e) => setTargetEmail(e.target.value)} 
              className="w-full bg-slate-950 text-xs text-white border border-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 font-mono"
              placeholder="Enter User Email"
            />
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => toggleUserBlockStatus(targetEmail, true)} className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 py-2 rounded-lg text-xs font-bold font-mono">
                FREEZE USER
              </button>
              <button onClick={() => toggleUserBlockStatus(targetEmail, false)} className="bg-emerald-500 text-slate-950 hover:bg-emerald-400 py-2 rounded-lg text-xs font-bold font-mono">
                UNFREEZE
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}