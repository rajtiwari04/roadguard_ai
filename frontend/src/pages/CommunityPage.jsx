import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { MobileNav } from '../components/layout/MobileNav';
import { useCivic } from '../context/CivicContext';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { ConfidenceMeter } from '../components/common/ConfidenceMeter';
import {
  Users,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  MapPin,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Filter
} from 'lucide-react';

export const CommunityPage = () => {
  const { incidents, userVotes, voteCommunityIncident, anonSessionId } = useCivic();

  // Show active un-resolved incidents first for verification
  const verificationIncidents = incidents.filter(i => i.status !== 'Resolved' && i.status !== 'Resolution Verified');

  return (
    <div className="flex h-screen bg-[#FBF9F5] overflow-hidden">
      
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        <Topbar title="Community Verification" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6 space-y-6 max-w-4xl mx-auto w-full">
          
          {/* Header */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-3">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-civic" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">
                Help verify what your neighborhood sees.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Nearby civic reports become high-confidence municipal work orders when residents validate evidence. Your votes remain 100% anonymous under session token <span className="font-mono font-bold text-charcoal">{anonSessionId}</span>.
            </p>
          </div>

          {/* Verification Cards Feed */}
          <div className="space-y-6">
            {verificationIncidents.map((inc) => {
              const voted = userVotes[inc.id];
              return (
                <div
                  key={inc.id}
                  className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-5 transition-all hover:border-civic/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE7DF] pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-charcoal-subtle">{inc.id}</span>
                      <span className="text-xs font-bold text-civic">{inc.type}</span>
                      <SeverityBadge severity={inc.severity} size="small" />
                    </div>
                    <span className="text-xs font-medium text-charcoal-muted flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-civic" />
                      <span>{inc.ward}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Evidence Photo (5 cols) */}
                    <div className="md:col-span-5 rounded-md overflow-hidden border border-[#EAE7DF]">
                      <img
                        src={inc.evidenceUrl}
                        alt="Civic report evidence"
                        className="w-full h-44 object-cover"
                      />
                    </div>

                    {/* Incident & Voting Actions (7 cols) */}
                    <div className="md:col-span-7 space-y-4">
                      <div>
                        <h3 className="font-bold text-base text-charcoal leading-tight">
                          {inc.location}
                        </h3>
                        <p className="text-xs text-charcoal-muted mt-1 leading-relaxed line-clamp-2">
                          {inc.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#EAE7DF]">
                          <span className="text-[10px] text-charcoal-subtle block">AI Model Match</span>
                          <span className="font-mono font-bold text-charcoal">{inc.aiConfidence}% Confidence</span>
                        </div>
                        <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#EAE7DF]">
                          <span className="text-[10px] text-charcoal-subtle block">Consensus Score</span>
                          <span className="font-mono font-bold text-emerald-800">{inc.communityConfidence}% Verified</span>
                        </div>
                      </div>

                      {/* Vote Question & Buttons */}
                      <div className="pt-2">
                        {voted ? (
                          <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                              <span>Vote Recorded: {voted === 'confirm' ? 'Confirmed Issue' : 'Disputed Issue'}</span>
                            </div>
                            <span className="font-mono text-[10px] text-emerald-800">{inc.confirmedVotes} Yes / {inc.disputedVotes} No</span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <span className="text-xs font-bold text-charcoal block">
                              Have you personally seen this issue?
                            </span>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                onClick={() => voteCommunityIncident(inc.id, 'confirm')}
                                className="py-2.5 px-3 rounded-md text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-subtle flex items-center justify-center space-x-1.5"
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                                <span>Confirm Issue ({inc.confirmedVotes})</span>
                              </button>

                              <button
                                onClick={() => voteCommunityIncident(inc.id, 'dispute')}
                                className="py-2.5 px-3 rounded-md text-xs font-bold text-charcoal bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors flex items-center justify-center space-x-1.5"
                              >
                                <ThumbsDown className="w-3.5 h-3.5 text-stone-600" />
                                <span>Dispute ({inc.disputedVotes})</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                  </div>

                  <div className="pt-3 border-t border-[#EAE7DF] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-charcoal-subtle">Reported {inc.date}</span>
                    <Link
                      to={`/incident/${inc.id}`}
                      className="font-bold text-civic hover:underline flex items-center space-x-1"
                    >
                      <span>Full Telemetry & Audit Log</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </main>

      </div>

      <MobileNav />
    </div>
  );
};
