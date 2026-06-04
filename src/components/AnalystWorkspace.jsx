import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { ShieldAlert, Check, X, MapPin, Smartphone, TrendingUp, AlertTriangle } from 'lucide-react';

export default function AnalystWorkspace() {
  const { transactions, resolveTransactionStatus } = useApp();
  const [selectedTxnId, setSelectedTxnId] = useState(null);

  // Filter out the transactions that are classified as "Suspicious" from the DB
  const suspiciousQueue = transactions.filter(t => t.status === 'Suspicious');
  
  // Default select the first item in the triage queue
  const activeTxn = selectedTxnId 
    ? suspiciousQueue.find(t => t.id === selectedTxnId) 
    : suspiciousQueue[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Fraud Analyst Workspace</h2>
        <p className="text-sm text-slate-400">Reviewing real-time transactional anomalies requiring human decision resolution.</p>
      </div>

      {suspiciousQueue.length === 0 ? (
        <div className="p-16 border border-dashed border-slate-800 text-center rounded-2xl bg-slate-900/10 max-w-2xl mx-auto">
          <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Check size={32} />
          </div>
          <h3 className="text-lg font-semibold text-white">Triage Queue Cleared</h3>
          <p className="text-sm text-slate-400 mt-2">
            The database reports zero pending anomalies requiring manual validations.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Suspicious Items Queue */}
          <div className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ShieldAlert size={14} className="text-amber-400" /> 
                Pending Core Audit ({suspiciousQueue.length})
              </span>
            </div>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
              {suspiciousQueue.map((txn) => {
                const isSelected = activeTxn && activeTxn.id === txn.id;
                return (
                  <button
                    key={txn.id}
                    onClick={() => setSelectedTxnId(txn.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-2 ${
                      isSelected 
                        ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg' 
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-mono font-bold text-sm text-slate-200">{txn.id}</span>
                      <span className="font-mono text-sm font-bold">${txn.amount}</span>
                    </div>
                    <div className="text-xs text-slate-400 flex justify-between w-full">
                      <span>{txn.vendor}</span>
                      <span className="text-amber-400 font-semibold">{txn.riskScore}% Risk</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Area: Granular Investigation & Actions */}
          {activeTxn && (
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono font-bold bg-slate-950 border border-slate-800 px-2 py-1 rounded text-slate-400">
                    CASE RECORD: {activeTxn.id}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">Anomaly Attribution Metrics</h3>
                </div>

                {/* Direct Database Write Action Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={() => resolveTransactionStatus(activeTxn.id, 'Legitimate')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold transition-all hover:bg-emerald-400"
                  >
                    <Check size={14} strokeWidth={3} /> Clear Safe
                  </button>
                  <button
                    onClick={() => resolveTransactionStatus(activeTxn.id, 'Fraudulent')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-rose-500 text-slate-950 rounded-xl text-xs font-bold transition-all hover:bg-rose-400"
                  >
                    <X size={14} strokeWidth={3} /> Confirm Fraud
                  </button>
                </div>
              </div>

              {/* Attributes Metadata Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                  <MapPin size={16} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] uppercase text-slate-500 font-bold">Location Signature</p>
                    <p className="text-sm font-semibold text-slate-200">{activeTxn.location?.name || 'Unknown'}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                  <Smartphone size={16} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] uppercase text-slate-500 font-bold">Terminal Hardware</p>
                    <p className="text-sm font-semibold text-slate-200">{activeTxn.device}</p>
                  </div>
                </div>
              </div>

              {/* Flags Engine Reason Blocks */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <AlertTriangle size={14} className="text-amber-400" />
                  Rule Violations Flagged by Engine
                </div>
                <div className="space-y-2">
                  {activeTxn.flags?.map((flag, index) => (
                    <div key={index} className="text-xs bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-slate-300 font-mono">
                      • {flag}
                    </div>
                  )) || <div className="text-xs text-slate-500">No rule flags attached.</div>}
                </div>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}