import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCivic } from '../../context/CivicContext';
import {
  LayoutDashboard,
  PlusCircle,
  Map,
  Users,
  Building2,
  MoreHorizontal,
  FileText,
  BarChart3,
  ShieldCheck,
  WifiOff,
  Bell,
  X,
  Home
} from 'lucide-react';

export const MobileNav = () => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const { offlineQueue, notifications } = useCivic();
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const mainTabs = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/map", label: "Map", icon: Map },
    { to: "/report", label: "Report", icon: PlusCircle, isMain: true },
    { to: "/community", label: "Verify", icon: Users },
    { to: "/authority", label: "Authority", icon: Building2 },
  ];

  const moreItems = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/report", label: "Report Issue", icon: PlusCircle, highlight: true },
    { to: "/map", label: "Civic Map", icon: Map },
    { to: "/reports", label: "My Reports", icon: FileText },
    { to: "/community", label: "Community", icon: Users },
    { to: "/authority", label: "Authority Hub", icon: Building2 },
    { to: "/analytics", label: "City Analytics", icon: BarChart3 },
    { to: "/notifications", label: "Notifications", icon: Bell, badge: unreadNotifs > 0 ? unreadNotifs : null },
    { to: "/privacy", label: "Privacy Center", icon: ShieldCheck },
    { to: "/offline", label: "Offline Mode", icon: WifiOff, badge: offlineQueue.length > 0 ? offlineQueue.length : null },
    { to: "/", label: "Landing Home", icon: Home }
  ];

  return (
    <>
      {/* Bottom Fixed Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EAE7DF] px-2 py-1.5 flex items-center justify-around shadow-modal select-none">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[56px] py-1 px-1.5 rounded-md text-[11px] font-semibold transition-colors ${
                  tab.isMain
                    ? 'text-white bg-charcoal rounded-lg py-1.5 px-3 shadow-subtle'
                    : isActive
                    ? 'text-civic font-bold'
                    : 'text-charcoal-muted hover:text-charcoal'
                }`
              }
            >
              <Icon className={`w-5 h-5 ${tab.isMain ? 'text-white' : ''}`} />
              <span className="mt-0.5 text-[10px] leading-tight">{tab.label}</span>
            </NavLink>
          );
        })}

        {/* More Menu Trigger */}
        <button
          onClick={() => setShowMoreMenu(true)}
          className="flex flex-col items-center justify-center min-w-[56px] py-1 px-1.5 rounded-md text-[11px] font-semibold text-charcoal-muted hover:text-charcoal transition-colors relative"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="mt-0.5 text-[10px] leading-tight">More</span>
          {(unreadNotifs > 0 || offlineQueue.length > 0) && (
            <span className="absolute top-0.5 right-2 w-2 h-2 rounded-full bg-civic"></span>
          )}
        </button>
      </nav>

      {/* Mobile "More" Slide-up Sheet */}
      {showMoreMenu && (
        <div className="md:hidden fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex flex-col justify-end animate-fade-in">
          <div className="bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto p-5 space-y-4 shadow-modal border-t border-[#EAE7DF] animate-slide-up">
            
            <div className="flex items-center justify-between border-b border-[#EAE7DF] pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded bg-charcoal text-white font-bold text-xs flex items-center justify-center">
                  N
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-charcoal">NAGARSETU Navigation</h3>
                  <span className="text-[10px] text-charcoal-subtle block">Kanpur Civic Intelligence</span>
                </div>
              </div>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-1.5 rounded-full bg-canvas-subtle text-charcoal-muted hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {moreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setShowMoreMenu(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between p-3 rounded-lg border text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-civic-light border-civic/40 text-civic font-bold'
                          : 'bg-[#FAF9F5] border-[#EAE7DF] text-charcoal hover:bg-canvas-subtle'
                      }`
                    }
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${item.highlight ? 'text-civic' : 'text-charcoal-subtle'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="ml-1 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-amber-100 text-amber-800 shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
