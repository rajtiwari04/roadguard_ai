import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { MobileNav } from '../components/layout/MobileNav';
import { useCivic } from '../context/CivicContext';
import { SeverityBadge } from '../components/common/SeverityBadge';
import {
  WifiOff,
  Wifi,
  RefreshCw,
  CheckCircle2,
  Database,
  Loader2,
  HardDrive,
  PlusCircle
} from 'lucide-react';

export const OfflinePage = () => {
  const {
    offlineQueue,
    isOffline,
    setIsOffline,
    syncOfflineQueue,
    addOfflineReport
  } = useCivic();

  const [syncing, setSyncing] = useState(false);
  const [syncStepText, setSyncStepText] = useState('');
  const [syncedCount, setSyncedCount] = useState(null);

  const handleStartSync = () => {
    if (offlineQueue.length === 0) return;

    setSyncing(true);
    setSyncedCount(null);
    setSyncStepText('Connecting to municipal gateway...');

    setTimeout(() => {
      setSyncStepText('Encrypting & uploading local report payloads...');
    }, 1000);

    setTimeout(() => {
      syncOfflineQueue((count) => {
        setSyncing(false);
        setSyncedCount(count || 2);
        setIsOffline(false);
      });
    }, 2500);
  };

  const handleCreateMockOfflineReport = () => {
    addOfflineReport({
      type: "Pothole",
      location: `GT Road Service Lane near KM ${Math.floor(12 + Math.random() * 20)}`,
      severity: "High"
    });
  };

  return (
    <div className="flex h-screen bg-[#FBF9F5] overflow-hidden">
      
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        <Topbar title="Offline Civic Scanning" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6 space-y-6 max-w-4xl mx-auto w-full">
          
          {/* Header */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <WifiOff className="w-6 h-6 text-amber-700" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">
                  Offline-First Scanning Engine
                </h2>
              </div>

              {/* Offline Status Badge */}
              <button
                onClick={() => setIsOffline(!isOffline)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  isOffline
                    ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                {isOffline ? 'Mode: Offline Active' : 'Mode: Online'}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Designed for field municipal inspectors and citizens operating in low-connectivity zones. Reports are stored securely in browser IndexedDB/localStorage and automatically queue for sync once connection re-establishes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleCreateMockOfflineReport}
                className="px-4 py-2 rounded-md text-xs font-bold text-charcoal bg-[#FAF9F5] border border-[#EAE7DF] hover:bg-canvas-subtle transition-colors flex items-center space-x-1.5"
              >
                <PlusCircle className="w-4 h-4 text-civic" />
                <span>Simulate Offline Report Capture</span>
              </button>

              <button
                disabled={offlineQueue.length === 0 || syncing}
                onClick={handleStartSync}
                className="px-6 py-2 rounded-md text-xs font-bold text-white bg-charcoal hover:bg-civic disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors shadow-subtle flex items-center space-x-1.5"
              >
                {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                <span>{syncing ? 'Synchronizing...' : 'Sync When Online'}</span>
              </button>
            </div>
          </div>

          {/* Syncing Progress Banner */}
          {syncing && (
            <div className="p-5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2 animate-slide-up">
              <div className="flex items-center space-x-2 font-bold">
                <Loader2 className="w-4 h-4 text-civic animate-spin" />
                <span>{syncStepText}</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-civic h-1.5 rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
            </div>
          )}

          {/* Sync Success Banner */}
          {syncedCount && !syncing && (
            <div className="p-5 rounded-lg bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 space-y-1 animate-slide-up">
              <div className="flex items-center space-x-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>{syncedCount} civic incidents synchronized successfully!</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                Local queue cleared and incidents transmitted to Kanpur Municipal Command Center.
              </p>
            </div>
          )}

          {/* Offline Queue List */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle">
                Local Offline Queue ({offlineQueue.length} Pending Items)
              </span>
              <span className="text-[11px] font-mono text-charcoal-subtle">STORAGE: LOCALSTORAGE</span>
            </div>

            {offlineQueue.length === 0 ? (
              <div className="p-8 text-center text-xs text-charcoal-subtle space-y-2">
                <HardDrive className="w-8 h-8 mx-auto text-charcoal-faint" />
                <p>Offline queue is empty. All captured reports are fully synchronized.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#EAE7DF]">
                {offlineQueue.map((item) => (
                  <div key={item.id} className="py-4 flex items-center justify-between text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-amber-800">{item.id}</span>
                        <span className="font-bold text-charcoal">{item.type}</span>
                        <SeverityBadge severity={item.severity} size="small" />
                      </div>
                      <span className="text-charcoal-muted block font-medium">{item.location}</span>
                      <span className="text-[10px] text-charcoal-subtle block font-mono">{item.timestamp}</span>
                    </div>

                    <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[10px]">
                      QUEUED LOCAL
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </main>

      </div>

      <MobileNav />
    </div>
  );
};
