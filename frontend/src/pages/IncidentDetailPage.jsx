import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { MobileNav } from '../components/layout/MobileNav';
import { useCivic } from '../context/CivicContext';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { ConfidenceMeter } from '../components/common/ConfidenceMeter';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  MapPin,
  ArrowLeft,
  Share2,
  AlertTriangle,
  FileText,
  Activity,
  Sparkles,
  Check
} from 'lucide-react';

export const IncidentDetailPage = () => {
  const { id } = useParams();
  const { incidents, userVotes, voteCommunityIncident, anonSessionId } = useCivic();

  const incident = incidents.find(i => i.id === id) || incidents[0];
  const userVote = userVotes[incident.id];

  return (
    <div className="flex h-screen bg-[#FBF9F5] overflow-hidden">
      
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        <Topbar title={`Incident ${incident.id}`} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6 space-y-6 max-w-5xl mx-auto w-full">
          
          {/* Top Breadcrumb & Actions */}
          <div className="flex items-center justify-between">
            <Link
              to="/map"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-charcoal-muted hover:text-charcoal transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Civic Map</span>
            </Link>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-charcoal-subtle font-mono">{incident.id}</span>
              <StatusBadge status={incident.status} />
            </div>
          </div>

          {/* Title Header Card */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-civic uppercase tracking-wider">{incident.type}</span>
                <SeverityBadge severity={incident.severity} />
              </div>
              <span className="text-xs font-mono text-charcoal-subtle">{incident.date}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight leading-snug">
              {incident.location}
            </h1>

            <p className="text-sm text-charcoal-muted leading-relaxed">
              {incident.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#EAE7DF] text-xs">
              <div>
                <span className="text-[10px] text-charcoal-subtle block">Department</span>
                <span className="font-bold text-charcoal">{incident.department}</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-subtle block">Ward Area</span>
                <span className="font-medium text-charcoal">{incident.ward}</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-subtle block">Traffic Impact</span>
                <span className="font-medium text-charcoal">{incident.trafficImportance}</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-subtle block">Road Health Score</span>
                <span className="font-mono font-bold text-red-600">{incident.roadHealthScore}/100</span>
              </div>
            </div>
          </div>

          {/* Telemetry Metrics & Verification Voting Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* AI & Community Confidence */}
            <div className="p-5 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle block">
                Verification Telemetry
              </span>

              <ConfidenceMeter
                label="Computer Vision Match"
                value={incident.aiConfidence}
                subtext="AI verified visual defect signature"
              />

              <ConfidenceMeter
                label="Community Consensus Confidence"
                value={incident.communityConfidence}
                subtext={`${incident.confirmedVotes} Confirmed vs ${incident.disputedVotes} Disputed`}
              />

              <div className="p-3 rounded bg-[#FAF9F5] border border-[#EAE7DF] flex items-center justify-between text-xs">
                <span className="text-charcoal-muted">Community Ratio</span>
                <span className="font-bold font-mono text-emerald-800">
                  {incident.confirmedVotes} Yes / {incident.disputedVotes} No
                </span>
              </div>
            </div>

            {/* Neighborhood Voting Widget */}
            <div className="p-5 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-civic block">
                    Neighborhood Consensus
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-bold text-sm text-charcoal">Have you personally seen this issue?</h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Your vote is recorded anonymously as Citizen {anonSessionId}.
                </p>
              </div>

              {userVote ? (
                <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>You anonymously recorded: {userVote === 'confirm' ? 'Confirmed Issue' : 'Disputed Issue'}</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => voteCommunityIncident(incident.id, 'confirm')}
                    className="py-2.5 px-3 rounded-md text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-subtle flex items-center justify-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Issue</span>
                  </button>

                  <button
                    onClick={() => voteCommunityIncident(incident.id, 'dispute')}
                    className="py-2.5 px-3 rounded-md text-xs font-bold text-charcoal bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <XCircle className="w-4 h-4 text-stone-600" />
                    <span>Dispute Issue</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Evidence Viewer (Before & After Resolution) */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle block">
              Photographic Evidence Dossier
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-charcoal block">Initial Reported Evidence</span>
                <img
                  src={incident.evidenceUrl}
                  alt="Initial Evidence"
                  className="w-full h-56 object-cover rounded-md border border-[#EAE7DF]"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-charcoal block">
                  {incident.status === 'Resolution Verified' || incident.status === 'Resolved'
                    ? 'Verified Resolution Evidence'
                    : 'Resolution Evidence Pending'}
                </span>
                {incident.resolutionEvidenceUrl ? (
                  <img
                    src={incident.resolutionEvidenceUrl}
                    alt="Resolution Evidence"
                    className="w-full h-56 object-cover rounded-md border border-emerald-200 ring-2 ring-emerald-500/20"
                  />
                ) : (
                  <div className="w-full h-56 rounded-md bg-[#FAF9F5] border border-dashed border-[#EAE7DF] flex flex-col items-center justify-center text-charcoal-subtle p-4 text-center space-y-2">
                    <Clock className="w-8 h-8 text-amber-600" />
                    <span className="text-xs font-semibold text-charcoal">Awaiting Municipal Repair Completion</span>
                    <span className="text-[11px] text-charcoal-subtle">Resolution evidence will appear here after site crew fix.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Priority Justification & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Timeline (7 cols) */}
            <div className="md:col-span-7 p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle block">
                Audit Log & Lifecycle Timeline
              </span>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EAE7DF]">
                {incident.timeline?.map((step, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-civic ring-4 ring-white"></span>
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <span className="font-bold text-charcoal">{step.step}</span>
                      <span className="text-[10px] font-mono text-charcoal-subtle">{step.date}</span>
                    </div>
                    <p className="text-xs text-charcoal-muted leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Prioritized (5 cols) */}
            <div className="md:col-span-5 p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-civic block">
                Prioritization Intelligence
              </span>
              <h3 className="font-bold text-sm text-charcoal">Why this issue is prioritized:</h3>

              <ul className="space-y-3 text-xs text-charcoal-muted">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0"></span>
                  <span><strong>High Severity Defect:</strong> Structural depth risk exceeding safety thresholds.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-civic mt-1.5 shrink-0"></span>
                  <span><strong>Neighborhood Confirmation:</strong> Strong community verification ratio.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
                  <span><strong>Arterial Route:</strong> High vehicle density corridor affecting emergency services.</span>
                </li>
              </ul>

              <div className="pt-3 border-t border-[#EAE7DF]">
                <Link
                  to="/authority"
                  className="w-full py-2 px-3 rounded text-xs font-semibold text-charcoal bg-canvas-subtle hover:bg-canvas-muted flex items-center justify-center space-x-1"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>View in Municipal Authority Dashboard</span>
                </Link>
              </div>
            </div>

          </div>

        </main>

      </div>

      <MobileNav />
    </div>
  );
};
