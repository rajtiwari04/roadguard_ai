import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { MobileNav } from '../components/layout/MobileNav';
import { useCivic } from '../context/CivicContext';
import {
  Bell,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Radio,
  MapPin,
  Settings
} from 'lucide-react';

export const NotificationsPage = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    alertsSettings,
    setAlertsSettings
  } = useCivic();

  return (
    <div className="flex h-screen bg-[#FBF9F5] overflow-hidden">
      
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        <Topbar title="Notifications & Alerts" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6 space-y-6 max-w-4xl mx-auto w-full">
          
          {/* Header & Alert Settings */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-6 h-6 text-civic" />
                <h2 className="text-xl font-extrabold text-charcoal tracking-tight">Notification Center</h2>
              </div>
              <button
                onClick={markAllNotificationsRead}
                className="text-xs font-semibold text-civic hover:underline"
              >
                Mark all read
              </button>
            </div>

            {/* Nearby Alert Settings Box */}
            <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[#EAE7DF] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span className="font-bold text-xs text-charcoal">Nearby Civic Alerts</span>
                </div>
                
                <button
                  onClick={() => setAlertsSettings({ ...alertsSettings, enabled: !alertsSettings.enabled })}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    alertsSettings.enabled
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {alertsSettings.enabled ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal-muted pt-2 border-t border-[#EAE7DF]">
                <div>
                  <span className="text-[10px] text-charcoal-subtle block">Geofence Radius</span>
                  <span className="font-semibold text-charcoal">1.0 km radius</span>
                </div>
                <div>
                  <span className="text-[10px] text-charcoal-subtle block">Privacy Protocol</span>
                  <span className="font-semibold text-charcoal">Approximate location grid only</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Feed */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle block">
              Recent Alerts
            </span>

            <div className="divide-y divide-[#EAE7DF]">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`py-4 px-2 transition-colors cursor-pointer hover:bg-[#FAF9F5] ${
                    !n.read ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-bold text-sm text-charcoal">{n.title}</span>
                    <span className="text-[11px] font-mono text-charcoal-subtle">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">{n.message}</p>
                  {n.incidentId && (
                    <Link
                      to={`/incident/${n.incidentId}`}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-civic mt-2 hover:underline"
                    >
                      <span>Open Incident {n.incidentId}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

        </main>

      </div>

      <MobileNav />
    </div>
  );
};
