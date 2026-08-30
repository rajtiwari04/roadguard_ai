import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { MobileNav } from '../components/layout/MobileNav';
import { useCivic } from '../context/CivicContext';
import { ShieldCheck, Lock, EyeOff, UserX, CheckCircle2, XCircle } from 'lucide-react';

export const PrivacyPage = () => {
  const { anonSessionId } = useCivic();

  return (
    <div className="flex h-screen bg-[#FBF9F5] overflow-hidden">
      
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        <Topbar title="Privacy Center" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6 space-y-6 max-w-4xl mx-auto w-full">
          
          {/* Header */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">Your Privacy</h2>
            </div>
            <p className="text-base sm:text-lg text-charcoal font-semibold">
              “Built around the issue, not the identity.”
            </p>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              NagarSetu operates under a strict Zero-PII (Personally Identifiable Information) mandate. We evaluate civic evidence without ever requesting or storing citizen identity data.
            </p>
          </div>

          {/* Active Session Badge */}
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-emerald-700" />
              <span className="font-bold text-emerald-900">Current Local Session Token</span>
            </div>
            <span className="font-mono font-bold text-emerald-800 bg-white px-2.5 py-1 rounded border border-emerald-300">
              {anonSessionId}
            </span>
          </div>

          {/* What NagarSetu DOES NOT ask for */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 block">
              What NagarSetu Never Asks For:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                "Full Name",
                "Email Address",
                "Phone Number / OTP",
                "Government Identification",
                "Public Social Profiles",
                "Exact Home Address"
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded bg-red-50/50 border border-red-200 flex items-center space-x-2 text-red-900 font-semibold">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Privacy Guarantees */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4 text-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle block">
              System Privacy Architecture
            </span>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 rounded bg-[#FAF9F5] border border-[#EAE7DF]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="font-bold text-charcoal block">EXIF Metadata Scrubbing</strong>
                  All uploaded photo evidence is automatically stripped of camera serial numbers and embedded location EXIF headers prior to server storage.
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded bg-[#FAF9F5] border border-[#EAE7DF]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="font-bold text-charcoal block">Spatial Grid Blurring</strong>
                  Report locations are mapped to approximate 50-meter municipal grid centroids to prevent reverse tracking to individual residences.
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded bg-[#FAF9F5] border border-[#EAE7DF]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="font-bold text-charcoal block">Local Session Isolation</strong>
                  Submitted report IDs and neighborhood votes are stored locally inside browser localStorage and never cross-referenced across IP logs.
                </div>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="p-6 bg-charcoal text-white rounded-lg shadow-modal text-center space-y-2">
            <p className="text-sm font-bold tracking-tight">
              “NagarSetu is designed around the problem that needs solving, not the person who reported it.”
            </p>
          </div>

        </main>

      </div>

      <MobileNav />
    </div>
  );
};
