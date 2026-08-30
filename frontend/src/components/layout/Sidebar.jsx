import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCivic } from '../../context/CivicContext';
import {
  LayoutDashboard,
  PlusCircle,
  Map,
  FileText,
  Users,
  Building2,
  BarChart3,
  ShieldCheck,
  WifiOff
} from 'lucide-react';

export const Sidebar = () => {
  const { anonSessionId, offlineQueue } = useCivic();

  const navItems = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/report", label: "Report Issue", icon: PlusCircle, highlight: true },
    { to: "/map", label: "Civic Map", icon: Map },
    { to: "/reports", label: "My Reports", icon: FileText },
    { to: "/community", label: "Community", icon: Users },
    { to: "/authority", label: "Authority Hub", icon: Building2 },
    { to: "/analytics", label: "City Analytics", icon: BarChart3 },
    { to: "/privacy", label: "Privacy Center", icon: ShieldCheck },
    { to: "/offline", label: "Offline Mode", icon: WifiOff, badge: offlineQueue.length > 0 ? offlineQueue.length : null }
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#EAE7DF] flex flex-col h-full shrink-0 select-none">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-[#EAE7DF]">
        <NavLink to="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-md bg-charcoal text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-subtle group-hover:bg-civic transition-colors">
            N
          </div>
          <div>
            <span className="font-bold text-base text-charcoal tracking-tight">NAGARSETU</span>
            <span className="block text-[11px] text-charcoal-subtle font-medium">Kanpur Civic Intelligence</span>
          </div>
        </NavLink>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-charcoal-subtle">
          Platform Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-canvas-subtle text-charcoal shadow-subtle font-bold border-l-2 border-civic'
                    : 'text-charcoal-muted hover:text-charcoal hover:bg-canvas-subtle/60'
                }`
              }
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`w-4 h-4 ${item.highlight ? 'text-civic' : 'text-charcoal-subtle'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Privacy Badge Footer */}
      <div className="p-4 border-t border-[#EAE7DF] bg-[#FAF9F5]/70">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="block font-bold text-charcoal text-[11px]">Anonymous Session</span>
              <span className="block font-mono text-[10px] text-charcoal-subtle">{anonSessionId}</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </div>

    </aside>
  );
};
