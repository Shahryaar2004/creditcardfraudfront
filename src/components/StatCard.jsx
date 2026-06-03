import React from 'react';

export default function StatCard({ title, value, icon: Icon, type = 'default' }) {
  const themes = {
    default: {
      border: 'border-slate-800',
      bg: 'bg-slate-900/40',
      iconBg: 'bg-slate-950 text-slate-400 border-slate-800',
      text: 'text-slate-100'
    },
    success: {
      border: 'border-emerald-500/20',
      bg: 'bg-emerald-500/5',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      text: 'text-emerald-400'
    },
    danger: {
      border: 'border-rose-500/20',
      bg: 'bg-rose-500/5',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      text: 'text-rose-400'
    }
  };

  const currentTheme = themes[type] || themes.default;

  return (
    <div className={`p-5 rounded-xl border backdrop-blur-sm transition-all hover:scale-[1.01] ${currentTheme.border} ${currentTheme.bg}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className={`text-2xl font-bold font-mono tracking-tight ${currentTheme.text}`}>
            {value}
          </h3>
        </div>
        <div className={`p-2.5 rounded-lg border ${currentTheme.iconBg}`}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}