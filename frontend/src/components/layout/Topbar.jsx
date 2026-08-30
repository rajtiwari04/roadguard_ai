import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCivic } from '../../context/CivicContext';
import {
  ShieldCheck,
  Bell,
  Wifi,
  WifiOff,
  MapPin,
  Plus,
  ExternalLink,
  X
} from 'lucide-react';

export const Topbar = ({ title }) => {
  const {
    anonSessionId,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    isOffline,
    setIsOffline
  } = useCivic();

  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const unreadNotifs = notifications.filter(n => !n.read);

  return (
    <header className="h-16 bg-white border-b border-[#EAE7DF] px-3 sm:px-6 flex items-center justify-between shrink-0 z-30 select-none">
      
      {/* Title & Location Context */}
      <div className="flex items-center space-x-2 min-w-0 pr-2">
        <h1 className="text-sm sm:text-lg font-extrabold text-charcoal tracking-tight truncate">{title}</h1>
        
        <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-canvas-subtle border border-[#EAE7DF] text-xs text-charcoal-muted shrink-0">
          <MapPin className="w-3.5 h-3.5 text-civic" />
          <span className="font-medium text-[11px]">Kanpur Metro Area</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 shrink-0">
        
        {/* Offline Mode Toggle Button */}
        <button
          onClick={() => setIsOffline(!isOffline)}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all border min-h-[36px] ${
            isOffline
              ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
              : 'bg-canvas-subtle text-charcoal-muted border-[#EAE7DF] hover:bg-canvas-muted'
          }`}
          title="Toggle Simulated Offline State"
        >
          {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-700" /> : <Wifi className="w-3.5 h-3.5 text-emerald-600" />}
          <span className="hidden sm:inline">{isOffline ? 'Offline Active' : 'Online'}</span>
        </button>

        {/* Notifications Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifPopover(!showNotifPopover)}
            className="p-2 rounded-md border border-[#EAE7DF] bg-white hover:bg-canvas-subtle text-charcoal-muted transition-colors relative min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadNotifs.length}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          {showNotifPopover && (
            <div className="fixed sm:absolute right-2 sm:right-0 top-16 sm:top-auto sm:mt-2 w-[calc(100vw-16px)] sm:w-96 bg-white rounded-lg shadow-modal border border-[#EAE7DF] z-50 overflow-hidden animate-slide-down">
              <div className="p-3 bg-canvas-subtle border-b border-[#EAE7DF] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-civic" />
                  <span className="font-bold text-xs text-charcoal">Notifications</span>
                  {unreadNotifs.length > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-civic text-white">
                      {unreadNotifs.length} new
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-civic hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                  <button
                    onClick={() => setShowNotifPopover(false)}
                    className="p-1 text-charcoal-subtle hover:text-charcoal"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#EAE7DF]">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-charcoal-subtle">
                    You're all caught up. No notifications.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3 text-xs transition-colors cursor-pointer hover:bg-canvas-subtle ${
                        !n.read ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-charcoal">{n.title}</span>
                        <span className="text-[10px] text-charcoal-subtle shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="text-charcoal-muted mt-1 text-[11px] leading-relaxed">{n.message}</p>
                      {n.incidentId && (
                        <Link
                          to={`/incident/${n.incidentId}`}
                          className="inline-flex items-center space-x-1 text-[11px] font-semibold text-civic mt-1.5 hover:underline"
                        >
                          <span>View {n.incidentId}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-[#EAE7DF] bg-[#FAF9F5] text-center">
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifPopover(false)}
                  className="text-xs font-semibold text-charcoal-muted hover:text-charcoal"
                >
                  View All & Preferences →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Anonymous Identity Pill */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-md bg-canvas-subtle border border-[#EAE7DF] text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-charcoal text-xs">Anonymous Citizen</span>
          <span className="font-mono text-[11px] text-charcoal-subtle bg-white px-1.5 py-0.5 rounded border border-[#EAE7DF]">
            {anonSessionId}
          </span>
        </div>

        {/* Report Issue CTA */}
        <Link
          to="/report"
          className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-charcoal hover:bg-civic transition-colors shadow-subtle min-h-[36px]"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Report</span>
        </Link>

      </div>
    </header>
  );
};
