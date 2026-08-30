import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { CivicMap } from '../components/map/CivicMap';
import { useCivic } from '../context/CivicContext';
import {
  ShieldCheck,
  PlusCircle,
  Map,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Sparkles,
  Search,
  Users,
  Building2,
  FileCheck2,
  ChevronRight
} from 'lucide-react';

export const LandingPage = () => {
  const { incidents } = useCivic();
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-charcoal flex flex-col selection:bg-civic-light selection:text-civic overflow-x-hidden">
      
      {/* Editorial Header */}
      <Navbar />

      {/* SECTION 1 — HERO */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20 border-b border-[#EAE7DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-8 sm:mb-12">
           
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal tracking-tight leading-[1.15] mb-4 sm:mb-6">
              See it. Verify it. <br />
              <span className="text-civic font-extrabold underline decoration-civic/20 underline-offset-8">Fix it.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-charcoal-muted font-normal leading-relaxed mb-6 sm:mb-8 max-w-2xl">
              Civic problems are everywhere. What cities need is a better way to see them, verify them, and act on them — without sacrificing citizen privacy.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                to="/report"
                className="px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-charcoal hover:bg-civic transition-all shadow-subtle flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Report an Issue</span>
              </Link>

              <Link
                to="/map"
                className="px-6 py-3.5 rounded-md text-sm font-semibold text-charcoal bg-white border border-[#EAE7DF] hover:bg-surface-hover transition-all shadow-subtle flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <Map className="w-4 h-4 text-civic" />
                <span>Explore City Map</span>
              </Link>

              <Link
                to="/authority"
                className="px-4 py-3 rounded-md text-xs font-semibold text-charcoal-muted hover:text-charcoal transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>Municipal Portal</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hero Visual — Composition showing embedded Kanpur map & selected incident */}
          <div className="relative mt-6 rounded-xl border border-[#EAE7DF] bg-white p-2.5 sm:p-3 shadow-modal">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:h-[480px]">
              
              {/* Map Surface */}
              <div className="lg:col-span-2 h-72 sm:h-96 lg:h-full rounded-lg overflow-hidden border border-[#EAE7DF]">
                <CivicMap
                  incidents={incidents.slice(0, 15)}
                  selectedIncident={selectedIncident}
                  onSelectIncident={(inc) => setSelectedIncident(inc)}
                />
              </div>

              {/* Selected Incident Signal & Road Health Panel */}
              <div className="p-4 bg-[#FAF9F5] rounded-lg border border-[#EAE7DF] flex flex-col justify-between overflow-y-auto max-h-96 lg:max-h-none">
                <div>
                  <div className="flex items-center justify-between border-b border-[#EAE7DF] pb-3 mb-3">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-charcoal-subtle">
                      ACTIVE INCIDENT SIGNAL
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      LIVE STREAM
                    </span>
                  </div>

                  {selectedIncident && (
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-civic uppercase tracking-wider block">
                          {selectedIncident.type}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base text-charcoal leading-tight mt-0.5">
                          {selectedIncident.location}
                        </h3>
                      </div>

                      <div className="rounded-md overflow-hidden border border-[#EAE7DF]">
                        <img
                          src={selectedIncident.evidenceUrl}
                          alt="Civic evidence preview"
                          className="w-full h-28 sm:h-32 object-cover"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 sm:p-2.5 rounded bg-white border border-[#EAE7DF]">
                          <span className="text-[10px] text-charcoal-subtle block">AI Confidence</span>
                          <span className="font-mono font-bold text-charcoal text-xs sm:text-sm">{selectedIncident.aiConfidence}%</span>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded bg-white border border-[#EAE7DF]">
                          <span className="text-[10px] text-charcoal-subtle block">Verifications</span>
                          <span className="font-mono font-bold text-charcoal text-xs sm:text-sm">{selectedIncident.confirmedVotes} Citizens</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded bg-white border border-[#EAE7DF] text-xs">
                        <div className="flex justify-between items-center text-charcoal-muted mb-1">
                          <span>Road Health Corridor</span>
                          <span className="font-bold text-red-600">{selectedIncident.roadHealthScore}/100</span>
                        </div>
                        <div className="w-full bg-canvas-subtle rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-red-500 h-1.5 rounded-full"
                            style={{ width: `${selectedIncident.roadHealthScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#EAE7DF] mt-3">
                  <Link
                    to={selectedIncident ? `/incident/${selectedIncident.id}` : '/map'}
                    className="w-full py-2.5 px-3 rounded text-xs font-semibold text-white bg-charcoal hover:bg-civic transition-colors flex items-center justify-center space-x-1.5 min-h-[40px]"
                  >
                    <span>Inspect Full Evidence & Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM */}
      <section className="py-14 sm:py-24 border-b border-[#EAE7DF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle block mb-2">
              The Urban Challenge
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-charcoal tracking-tight leading-tight">
              A pothole isn't just a pothole.
            </h2>
            <p className="mt-3 text-sm sm:text-lg text-charcoal-muted leading-relaxed">
              Every day, cities generate thousands of invisible breakdowns. Traditional municipal complaint systems break down under fragmentation, fake reports, and lack of accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Story Side 1: Road Hazards */}
            <div className="space-y-4 sm:space-y-6">
              <div className="p-5 sm:p-6 rounded-lg bg-[#FAF9F5] border border-[#EAE7DF] space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 text-red-700">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <h3 className="font-bold text-base text-charcoal">Road & Traffic Safety Hazards</h3>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                  A damaged road surface affects vehicle suspension, causes emergency braking, blocks school commute corridors, and risks life for two-wheeler commuters.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-charcoal-subtle pt-2 border-t border-[#EAE7DF]">
                  <span>• Safety Risks</span>
                  <span>• Traffic Congestion</span>
                  <span>• Emergency Delays</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-lg bg-[#FAF9F5] border border-[#EAE7DF] space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 text-amber-700">
                  <Activity className="w-5 h-5 shrink-0" />
                  <h3 className="font-bold text-base text-charcoal">Sanitation & Public Health Accumulation</h3>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                  A garbage dump isn't only a sanitation issue — it causes vector-borne illness, drain clogging during monsoon rains, and neighborhood deterioration.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-charcoal-subtle pt-2 border-t border-[#EAE7DF]">
                  <span>• Health Risks</span>
                  <span>• Drain Blockage</span>
                  <span>• Rapid Decay</span>
                </div>
              </div>
            </div>

            {/* Story Side 2: System Failures */}
            <div className="p-6 sm:p-8 rounded-lg bg-charcoal text-white space-y-5 sm:space-y-6 shadow-modal">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight">Why traditional civic portals fail</h3>
              
              <ul className="space-y-4 text-xs sm:text-sm text-charcoal-faint">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-white block font-semibold">Fragmented & Duplicate Complaints</strong>
                    Dozens of citizens report the exact same pothole across different phone lines, clogging municipal queues.
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-white block font-semibold">Poor Evidence Quality</strong>
                    Blurry photos or missing GPS coordinates force field inspectors to make wasteful physical verification trips.
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-white block font-semibold">Lack of Neighborhood Validation</strong>
                    Authorities struggle to identify which issues genuinely impact residents versus trivial claims.
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-white block font-semibold">No Resolution Proof</strong>
                    Marked "resolved" on paper, but the road remains broken in reality.
                  </div>
                </li>
              </ul>

              <div className="pt-3 border-t border-charcoal-muted/40">
                <p className="text-xs text-charcoal-subtle italic">
                  NagarSetu bridges this gap through privacy-first AI analysis and decentralized community validation.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3 — SOLUTION NARRATIVE CYCLE */}
      <section className="py-14 sm:py-24 border-b border-[#EAE7DF] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-civic block mb-2">
              The NagarSetu Cycle
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
              From observation to action.
            </h2>
            <p className="mt-2 text-xs sm:text-base text-charcoal-muted">
              A five-stage transparent pipeline transforming raw photos into verified municipal resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            
            {[
              {
                step: "01",
                title: "SEE",
                desc: "Citizen captures an issue photo or video anonymously. No signup or phone number required.",
                icon: Search
              },
              {
                step: "02",
                title: "VERIFY",
                desc: "AI classifies severity & location. Nearby opted-in citizens anonymously vote to confirm.",
                icon: Users
              },
              {
                step: "03",
                title: "PRIORITIZE",
                desc: "Traffic route importance, AI confidence, and community votes calculate operational urgency.",
                icon: Activity
              },
              {
                step: "04",
                title: "FIX",
                desc: "Assigned municipal department receives complete evidence dossier and dispatches crew.",
                icon: Building2
              },
              {
                step: "05",
                title: "VERIFY AGAIN",
                desc: "After-fix photo is uploaded and AI cross-verifies resolution before closing the incident.",
                icon: FileCheck2
              }
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="p-4 sm:p-5 rounded-lg bg-white border border-[#EAE7DF] flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] font-bold text-civic bg-civic-light px-2 py-0.5 rounded">
                        STAGE {s.step}
                      </span>
                      <Icon className="w-4 h-4 text-charcoal-subtle" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-charcoal mb-1">{s.title}</h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* SECTION 4 — FEATURE STORY EXPOSITIONS */}
      <section className="py-14 sm:py-24 border-b border-[#EAE7DF] bg-white space-y-16 sm:space-y-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          
          {/* Feature 1: AI Civic Detection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-civic block mb-2">
                Computer Vision Engine
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight mb-3">
                Turn a photo into civic intelligence.
              </h3>
              <p className="text-xs sm:text-base text-charcoal-muted leading-relaxed mb-5">
                When a citizen submits a photograph or video, NagarSetu automatically extracts issue classification, estimates depth and volume severity, and detects exact geotag boundaries.
              </p>

              <div className="space-y-2.5 text-xs font-medium">
                <div className="flex items-center space-x-2 text-charcoal">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Automatic classification (Pothole, Waterlogging, Garbage, Lighting)</span>
                </div>
                <div className="flex items-center space-x-2 text-charcoal">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>94% average AI confidence scoring</span>
                </div>
                <div className="flex items-center space-x-2 text-charcoal">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sub-meter spatial accuracy with privacy blur</span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-lg bg-[#FAF9F5] border border-[#EAE7DF] space-y-3 shadow-subtle">
              <div className="flex items-center justify-between text-xs border-b border-[#EAE7DF] pb-2">
                <span className="font-bold text-charcoal">EVIDENCE ANALYSIS PREVIEW</span>
                <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[10px]">94.2% MATCH</span>
              </div>
              <img
                src={incidents[0].evidenceUrl}
                alt="AI Analysis Example"
                className="w-full h-44 sm:h-56 object-cover rounded border border-[#EAE7DF]"
              />
              <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                <div className="p-2 bg-white rounded border border-[#EAE7DF]">
                  <span className="text-[10px] text-charcoal-subtle block">Type</span>
                  <span className="font-bold text-charcoal truncate block">{incidents[0].type}</span>
                </div>
                <div className="p-2 bg-white rounded border border-[#EAE7DF]">
                  <span className="text-[10px] text-charcoal-subtle block">Severity</span>
                  <span className="font-bold text-red-600 truncate block">{incidents[0].severity}</span>
                </div>
                <div className="p-2 bg-white rounded border border-[#EAE7DF]">
                  <span className="text-[10px] text-charcoal-subtle block">Location</span>
                  <span className="font-bold text-charcoal truncate block">{incidents[0].ward}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Privacy-First Reporting */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="p-5 sm:p-6 rounded-lg bg-charcoal text-white space-y-5 shadow-modal order-2 lg:order-1">
              <div className="flex items-center space-x-3 border-b border-charcoal-muted/40 pb-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm sm:text-base">Privacy Architecture</h4>
                  <p className="text-[11px] text-charcoal-subtle">Zero personal data retention guarantee</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/10">
                  <span className="text-charcoal-faint">Reporter Identity</span>
                  <span className="font-semibold text-emerald-400">Anonymous Citizen</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/10">
                  <span className="text-charcoal-faint">Session Token</span>
                  <span className="font-mono text-amber-300">ANON-7F29A</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/10">
                  <span className="text-charcoal-faint">Location Radius</span>
                  <span className="text-white font-medium">Approximate 50m Grid</span>
                </div>
              </div>

              <p className="text-xs text-charcoal-subtle italic">
                “NagarSetu is designed around the problem that needs solving, not the person who reported it.”
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-2">
                Privacy By Design
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight mb-3">
                Your identity is not the story.
              </h3>
              <p className="text-xs sm:text-base text-charcoal-muted leading-relaxed mb-5">
                Citizens hesitate to report civic issues when forced to provide phone numbers, OTP verification, or personal accounts. NagarSetu removes identity barriers completely.
              </p>

              <div className="space-y-2.5 text-xs font-medium">
                <div className="flex items-center space-x-2 text-charcoal">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No login, email, phone number, or government ID required</span>
                </div>
                <div className="flex items-center space-x-2 text-charcoal">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>EXIF metadata and face blurring applied before storage</span>
                </div>
                <div className="flex items-center space-x-2 text-charcoal">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Local session identifiers stored safely in browser storage</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5 — IMPACT STATISTICS */}
      <section className="py-12 sm:py-20 border-b border-[#EAE7DF] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle block mb-2">
              Kanpur Pilot Metrics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
              Real Impact in Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-lg bg-white border border-[#EAE7DF]">
              <span className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight block font-mono">
                1,284
              </span>
              <span className="text-xs font-semibold text-charcoal-muted mt-1 block">
                Civic Issues Detected
              </span>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#EAE7DF]">
              <span className="text-3xl sm:text-5xl font-extrabold text-civic tracking-tight block font-mono">
                3,842
              </span>
              <span className="text-xs font-semibold text-charcoal-muted mt-1 block">
                Community Verifications
              </span>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#EAE7DF]">
              <span className="text-3xl sm:text-5xl font-extrabold text-emerald-700 tracking-tight block font-mono">
                742
              </span>
              <span className="text-xs font-semibold text-charcoal-muted mt-1 block">
                Verified Resolutions
              </span>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#EAE7DF]">
              <span className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight block font-mono">
                91%
              </span>
              <span className="text-xs font-semibold text-charcoal-muted mt-1 block">
                Avg Verification Confidence
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6 — CALL TO ACTION */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-charcoal tracking-tight mb-4">
            See something that needs fixing?
          </h2>
          <p className="text-xs sm:text-base text-charcoal-muted mb-6 max-w-xl mx-auto">
            Take a photo, let AI classify it, and let your neighborhood verify it. No account required.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              to="/report"
              className="px-8 py-3.5 rounded-md text-sm font-bold text-white bg-charcoal hover:bg-civic transition-all shadow-modal flex items-center justify-center space-x-2 min-h-[44px]"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Report an Issue Now</span>
            </Link>

            <Link
              to="/map"
              className="px-8 py-3.5 rounded-md text-sm font-bold text-charcoal bg-[#FAF9F5] border border-[#EAE7DF] hover:bg-canvas-subtle transition-all flex items-center justify-center space-x-2 min-h-[44px]"
            >
              <Map className="w-5 h-5 text-civic" />
              <span>Explore City Map</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="mt-auto bg-[#FAF9F5] border-t border-[#EAE7DF] py-8 text-xs text-charcoal-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-center sm:text-left">
            <span className="font-bold text-charcoal tracking-wider">NAGARSETU</span>
            <span>•</span>
            <span>Privacy-Preserving Civic Platform</span>
          </div>

          <div className="flex items-center space-x-4 font-medium">
            <Link to="/privacy" className="hover:text-charcoal">Privacy</Link>
            <Link to="/map" className="hover:text-charcoal">Civic Map</Link>
            <Link to="/authority" className="hover:text-charcoal">Authority Hub</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};
