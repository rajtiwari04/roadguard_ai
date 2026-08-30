import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { MobileNav } from '../components/layout/MobileNav';
import { useCivic } from '../context/CivicContext';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { ConfidenceMeter } from '../components/common/ConfidenceMeter';
import { AuthorityIncidentMap } from '../components/map/AuthorityIncidentMap';
import {
  Building2,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Sparkles,
  Loader2,
  Check,
  X,
  FileCheck,
  Wrench,
  UserCheck,
  Navigation,
  MapPin,
  Compass,
  Clock,
  ExternalLink,
  Route,
  Copy,
  Locate,
  Eye
} from 'lucide-react';

// Helper for Department HQ and distance/travel time metrics
const getDepartmentMetrics = (incident) => {
  const departmentHqs = {
    'Roads & Infrastructure': {
      name: 'Municipal PWD Engineering Division HQ',
      address: 'GT Road Engineering Hub, Kanpur',
      coordinates: [26.4720, 80.3180]
    },
    'Sanitation & Waste': {
      name: 'Sanitation Zone 2 Command Center',
      address: 'Mall Road Municipal Office, Kanpur',
      coordinates: [26.4650, 80.3480]
    },
    'Water & Sewage': {
      name: 'Jal Sansthan Main Dispatch Division',
      address: 'Company Bagh Waterworks, Kanpur',
      coordinates: [26.4780, 80.3220]
    },
    'Electrical & Lighting': {
      name: 'Municipal Electrical & Lighting Depot',
      address: 'Civil Lines Power Substation, Kanpur',
      coordinates: [26.4600, 80.3520]
    },
    'Public Safety': {
      name: 'Civic Safety & Rapid Response Cell',
      address: 'Municipal Command Center, Kanpur',
      coordinates: [26.4670, 80.3350]
    }
  };

  const hq = departmentHqs[incident?.department] || departmentHqs['Public Safety'];

  const [lat1, lon1] = hq.coordinates;
  const [lat2, lon2] = incident?.coordinates || [26.4700, 80.3300];

  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distKm = R * c;

  const distanceText = distKm < 1 ? `${Math.round(distKm * 1000)} m` : `${distKm.toFixed(1)} km`;
  const travelMins = Math.max(4, Math.round((distKm / 22) * 60 + 3));
  const travelTimeText = `~${travelMins} mins (Rapid Field Unit)`;

  return {
    hq,
    distanceKm: distKm.toFixed(1),
    distanceText,
    travelTimeText,
    travelMins
  };
};

export const AuthorityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { incidents, updateIncidentStatus } = useCivic();

  const incident = incidents.find(i => i.id === id) || incidents[0];
  const metrics = getDepartmentMetrics(incident);

  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);
  const [isZoomedToIncident, setIsZoomedToIncident] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [arrivedAtSite, setArrivedAtSite] = useState(false);

  const [resolutionPhoto, setResolutionPhoto] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [verifyProgress, setVerifyProgress] = useState(0);
  const [verifyStepText, setVerifyStepText] = useState('');
  const [verificationPassed, setVerificationPassed] = useState(false);

  const sampleResolutionPhoto = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300" fill="%2315803D"><rect width="500" height="300" fill="%23F0FDF4"/><rect y="160" width="500" height="140" fill="%2327272A"/><line x1="0" y1="230" x2="500" y2="230" stroke="%23FACC15" stroke-width="5"/><circle cx="250" cy="150" r="35" fill="%23166534"/><path d="M235 150 L245 160 L265 140" stroke="%23FFFFFF" stroke-width="4"/><text x="140" y="80" fill="%23166534" font-family="sans-serif" font-weight="bold">AI RESOLUTION MATCH 98.4%</text></svg>';

  const handleCopyCoordinates = () => {
    if (incident?.coordinates) {
      const coordStr = `${incident.coordinates[0]}, ${incident.coordinates[1]}`;
      navigator.clipboard.writeText(coordStr);
      setCopiedCoords(true);
      setTimeout(() => setCopiedCoords(false), 2000);
    }
  };

  const handleStartResolutionAi = () => {
    setVerifying(true);
    setVerifyProgress(0);

    const steps = [
      { pct: 30, text: "Comparing before & after spatial geometry..." },
      { pct: 65, text: "Matching asphalt landmark features..." },
      { pct: 90, text: "Verifying clear road surface restoration..." },
      { pct: 100, text: "Verification Passed! Match Confidence 98.4%" }
    ];

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < steps.length) {
        setVerifyProgress(steps[idx].pct);
        setVerifyStepText(steps[idx].text);
        idx++;
      } else {
        clearInterval(interval);
        setVerifying(false);
        setVerificationPassed(true);
      }
    }, 700);
  };

  const handleConfirmVerifiedResolved = () => {
    updateIncidentStatus(incident.id, 'Resolution Verified', {
      resolutionEvidenceUrl: resolutionPhoto || sampleResolutionPhoto
    });
    setShowResolveModal(false);
    navigate('/authority');
  };

  return (
    <div className="flex h-screen bg-[#FBF9F5] overflow-hidden">
      
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        <Topbar title={`Authority Workspace: ${incident.id}`} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6 space-y-6 max-w-5xl mx-auto w-full">
          
          {/* Header & Back link */}
          <div className="flex items-center justify-between">
            <Link
              to="/authority"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-charcoal-muted hover:text-charcoal transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Command Center</span>
            </Link>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-charcoal-subtle">{incident.id}</span>
              <StatusBadge status={incident.status} />
            </div>
          </div>

          {/* Workflow Pipeline Breadcrumb Indicator */}
          <div className="p-3 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle hidden sm:block">
            <div className="flex items-center justify-between text-[11px] font-bold text-charcoal-muted">
              <span className="text-emerald-700 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>1. Detect</span>
              </span>
              <span>→</span>
              <span className="text-emerald-700 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>2. Verify</span>
              </span>
              <span>→</span>
              <span className="text-emerald-700 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>3. Assign</span>
              </span>
              <span>→</span>
              <span className="text-civic flex items-center space-x-1 font-extrabold underline">
                <MapPin className="w-3.5 h-3.5" />
                <span>4. Locate</span>
              </span>
              <span>→</span>
              <span className="text-civic flex items-center space-x-1 font-extrabold underline">
                <Navigation className="w-3.5 h-3.5" />
                <span>5. Navigate</span>
              </span>
              <span>→</span>
              <span className="text-charcoal-subtle flex items-center space-x-1">
                <Wrench className="w-3.5 h-3.5" />
                <span>6. Resolve</span>
              </span>
              <span>→</span>
              <span className="text-charcoal-subtle flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>7. Verify</span>
              </span>
            </div>
          </div>

          {/* Incident Dossier Card */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-civic uppercase tracking-wider">{incident.type}</span>
                <SeverityBadge severity={incident.severity} />
              </div>
              <span className="text-xs font-mono text-charcoal-subtle">Assigned: {incident.department}</span>
            </div>

            <h1 className="text-2xl font-extrabold text-charcoal tracking-tight">
              {incident.location}
            </h1>

            <p className="text-xs text-charcoal-muted leading-relaxed">
              {incident.description}
            </p>

            {/* Evidence Image */}
            <div className="rounded-lg overflow-hidden border border-[#EAE7DF]">
              <img
                src={incident.evidenceUrl}
                alt="Reported evidence"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Arrived Notification Banner */}
          {arrivedAtSite && (
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between shadow-subtle animate-fade-in">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <div>
                  <span className="font-bold block">Field Officer Arrived at Incident Site</span>
                  <span className="text-[11px] text-emerald-800">
                    GPS telemetry confirmed arrival at {incident.coordinates[0].toFixed(4)}°, {incident.coordinates[1].toFixed(4)}°. Field unit ready to initiate repair.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setArrivedAtSite(false)}
                className="text-emerald-700 hover:text-emerald-900 text-xs font-bold underline ml-3"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* LOCATION & NAVIGATION CARD */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE7DF] pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-md bg-civic-light text-civic">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-charcoal tracking-tight">
                    Field Location & Navigation Center
                  </h2>
                  <p className="text-xs text-charcoal-muted">
                    Exact coordinates, office distance, and route telemetry for field officers
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setIsZoomedToIncident(true);
                    const mapElem = document.getElementById('authority-incident-map-container');
                    if (mapElem) mapElem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-md text-xs font-bold text-charcoal bg-canvas-subtle hover:bg-canvas-muted border border-[#EAE7DF] transition-colors flex items-center space-x-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-civic" />
                  <span>View on Map</span>
                </button>

                <button
                  onClick={() => setShowNavModal(true)}
                  className="px-4 py-1.5 rounded-md text-xs font-bold text-white bg-civic hover:bg-civic-dark transition-colors shadow-subtle flex items-center space-x-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate to Location</span>
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Coordinates */}
              <div className="p-3 bg-[#FAF9F5] rounded-md border border-[#EAE7DF] space-y-1">
                <div className="flex items-center justify-between text-[11px] text-charcoal-subtle font-semibold">
                  <span className="flex items-center space-x-1">
                    <Locate className="w-3.5 h-3.5 text-civic" />
                    <span>Exact GPS Coordinates</span>
                  </span>
                  <button
                    onClick={handleCopyCoordinates}
                    className="text-charcoal-muted hover:text-civic transition-colors"
                    title="Copy Coordinates"
                  >
                    {copiedCoords ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xs font-mono font-bold text-charcoal">
                  {incident.coordinates ? `${incident.coordinates[0].toFixed(4)}° N, ${incident.coordinates[1].toFixed(4)}° E` : '26.4784° N, 80.3015° E'}
                </div>
              </div>

              {/* Office Distance */}
              <div className="p-3 bg-[#FAF9F5] rounded-md border border-[#EAE7DF] space-y-1">
                <div className="flex items-center space-x-1 text-[11px] text-charcoal-subtle font-semibold">
                  <Route className="w-3.5 h-3.5 text-amber-600" />
                  <span>Distance from Department HQ</span>
                </div>
                <div className="text-xs font-bold text-charcoal flex items-center space-x-1.5">
                  <span>{metrics.distanceText}</span>
                  <span className="text-[10px] font-normal text-charcoal-subtle">({metrics.hq.name.split(' ')[0]} HQ)</span>
                </div>
              </div>

              {/* Travel Time */}
              <div className="p-3 bg-[#FAF9F5] rounded-md border border-[#EAE7DF] space-y-1">
                <div className="flex items-center space-x-1 text-[11px] text-charcoal-subtle font-semibold">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Est. Field Travel Time</span>
                </div>
                <div className="text-xs font-bold text-charcoal">
                  {metrics.travelTimeText}
                </div>
              </div>

            </div>

            {/* Address & HQ Details */}
            <div className="p-3 bg-canvas-subtle rounded-md border border-[#EAE7DF] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
              <div>
                <span className="font-bold text-charcoal block">Location Name / Address:</span>
                <span className="text-charcoal-muted">{incident.location}</span>
              </div>
              <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#EAE7DF]">
                <span className="font-bold text-charcoal block">Relevant Authority Division HQ:</span>
                <span className="text-charcoal-muted">{metrics.hq.name} ({metrics.hq.address})</span>
              </div>
            </div>

            {/* Embedded Interactive Leaflet Map */}
            <div id="authority-incident-map-container" className="pt-2">
              <AuthorityIncidentMap
                incident={incident}
                departmentHq={metrics.hq}
                isZoomedToIncident={isZoomedToIncident}
              />
            </div>
          </div>

          {/* AI Reasoning & Community Verification Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-5 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle block">
                AI Computer Vision Telemetry
              </span>
              <ConfidenceMeter label="Defect Match Confidence" value={incident.aiConfidence} />
              <div className="p-3 rounded bg-[#FAF9F5] border border-[#EAE7DF] text-xs space-y-1">
                <span className="font-bold text-charcoal block">AI Model Analysis:</span>
                <p className="text-charcoal-muted">
                  High surface depression match detected. Pothole volume estimated at ~0.4 cubic meters. High risk to low-ground clearance vehicles.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-civic block">
                Community Validation Consensus
              </span>
              <ConfidenceMeter label="Neighborhood Confidence" value={incident.communityConfidence} />
              <div className="p-3 rounded bg-[#FAF9F5] border border-[#EAE7DF] text-xs flex justify-between">
                <div>
                  <span className="font-bold text-emerald-800 text-sm block">{incident.confirmedVotes}</span>
                  <span className="text-charcoal-subtle text-[10px]">Confirmed Votes</span>
                </div>
                <div>
                  <span className="font-bold text-stone-700 text-sm block">{incident.disputedVotes}</span>
                  <span className="text-charcoal-subtle text-[10px]">Disputed Votes</span>
                </div>
              </div>
            </div>

          </div>

          {/* Authority Actions Toolbar */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-modal space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal block">
              Municipal Dispatch Controls
            </span>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => updateIncidentStatus(incident.id, 'Under Repair')}
                className="px-4 py-2.5 rounded-md text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-subtle flex items-center space-x-1.5"
              >
                <Wrench className="w-4 h-4" />
                <span>Mark Under Repair</span>
              </button>

              <button
                onClick={() => {
                  setResolutionPhoto(sampleResolutionPhoto);
                  setShowResolveModal(true);
                }}
                className="px-6 py-2.5 rounded-md text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-subtle flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Upload Resolution & Verify AI Fix</span>
              </button>

              <button
                onClick={() => setShowNavModal(true)}
                className="px-4 py-2.5 rounded-md text-xs font-bold text-charcoal bg-canvas-subtle hover:bg-canvas-muted border border-[#EAE7DF] transition-colors flex items-center space-x-1.5 ml-auto"
              >
                <Navigation className="w-4 h-4 text-civic" />
                <span>Open Navigation GPS</span>
              </button>
            </div>
          </div>

        </main>

      </div>

      {/* FIELD NAVIGATION EXPERIENCE MODAL */}
      {showNavModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-6 shadow-modal border border-[#EAE7DF] animate-slide-up">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#EAE7DF] pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-civic-light text-civic">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-extrabold text-base text-charcoal">Field GPS Turn-by-Turn Navigation</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                      <span>GPS Fixed (±3m)</span>
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-muted">Incident {incident.id} • {incident.type}</p>
                </div>
              </div>
              <button onClick={() => setShowNavModal(false)} className="p-1 text-charcoal-subtle hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Telemetry Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 bg-[#FAF9F5] rounded-lg border border-[#EAE7DF]">
                <span className="text-[10px] text-charcoal-subtle font-semibold uppercase block">Distance</span>
                <span className="text-sm font-extrabold text-charcoal">{metrics.distanceText}</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F5] rounded-lg border border-[#EAE7DF]">
                <span className="text-[10px] text-charcoal-subtle font-semibold uppercase block">Est. ETA</span>
                <span className="text-sm font-extrabold text-emerald-700">{metrics.travelMins} mins</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F5] rounded-lg border border-[#EAE7DF]">
                <span className="text-[10px] text-charcoal-subtle font-semibold uppercase block">Target Lat</span>
                <span className="text-xs font-mono font-bold text-charcoal">{incident.coordinates ? incident.coordinates[0].toFixed(4) : '26.4784'}°</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F5] rounded-lg border border-[#EAE7DF]">
                <span className="text-[10px] text-charcoal-subtle font-semibold uppercase block">Target Lng</span>
                <span className="text-xs font-mono font-bold text-charcoal">{incident.coordinates ? incident.coordinates[1].toFixed(4) : '80.3015'}°</span>
              </div>
            </div>

            {/* Turn by Turn Directions */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal block">
                Field Unit Dispatch Route
              </span>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-canvas-subtle border border-[#EAE7DF] flex items-start space-x-3">
                  <div className="p-1.5 rounded-full bg-indigo-100 text-indigo-700 mt-0.5 flex-shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block">1. Depart HQ: {metrics.hq.name}</span>
                    <span className="text-charcoal-muted text-[11px]">{metrics.hq.address}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-canvas-subtle border border-[#EAE7DF] flex items-start space-x-3">
                  <div className="p-1.5 rounded-full bg-amber-100 text-amber-700 mt-0.5 flex-shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block">2. Turn 1: Main Arterial Corridor</span>
                    <span className="text-charcoal-muted text-[11px]">Head toward {incident.ward || 'target ward'} (~{(metrics.distanceKm * 0.6).toFixed(1)} km)</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start space-x-3">
                  <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-700 mt-0.5 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-emerald-950 block">3. Arrive: {incident.location}</span>
                    <span className="text-emerald-800 text-[11px]">Exact site target ({incident.coordinates ? incident.coordinates.join(', ') : '26.4784, 80.3015'})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* External Map Action & Arrival Buttons */}
            <div className="pt-4 border-t border-[#EAE7DF] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${incident.coordinates ? incident.coordinates.join(',') : '26.4784,80.3015'}`;
                  window.open(url, '_blank');
                }}
                className="px-4 py-2.5 rounded-md text-xs font-bold text-charcoal bg-canvas-subtle hover:bg-canvas-muted border border-[#EAE7DF] transition-colors flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4 text-civic" />
                <span>Launch External Google Maps GPS</span>
              </button>

              <button
                onClick={() => {
                  setArrivedAtSite(true);
                  setShowNavModal(false);
                  setIsZoomedToIncident(true);
                }}
                className="px-5 py-2.5 rounded-md text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-subtle flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulate Arrival at Site</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* RESOLUTION VERIFICATION MODAL */}
      {showResolveModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-6 shadow-modal border border-[#EAE7DF] animate-slide-up">
            
            <div className="flex items-center justify-between border-b border-[#EAE7DF] pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <h3 className="font-extrabold text-base text-charcoal">Resolution AI Cross-Verification</h3>
              </div>
              <button onClick={() => setShowResolveModal(false)} className="p-1 text-charcoal-subtle hover:text-charcoal">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-charcoal-muted">
                Upload resolution evidence photo taken by the repair field inspector on site.
              </p>

              {/* Resolution Image Preview */}
              <div className="rounded-lg overflow-hidden border border-emerald-200 bg-emerald-50/50 p-2">
                <img
                  src={resolutionPhoto || sampleResolutionPhoto}
                  alt="Resolution proof"
                  className="w-full h-44 object-cover rounded"
                />
              </div>

              {!verificationPassed ? (
                verifying ? (
                  <div className="py-6 text-center space-y-3">
                    <Loader2 className="w-8 h-8 text-emerald-700 animate-spin mx-auto" />
                    <span className="text-xs font-bold text-charcoal block">{verifyStepText}</span>
                    <div className="w-full bg-canvas-muted rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${verifyProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleStartResolutionAi}
                    className="w-full py-3 rounded-md text-xs font-bold text-white bg-charcoal hover:bg-emerald-700 transition-colors shadow-subtle flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Run AI Resolution Comparison Scan</span>
                  </button>
                )
              ) : (
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                    <span className="font-bold">Resolution Verification Passed (98.4%)</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    AI cross-reference confirmed zero structural defect remaining on asphalt surface.
                  </p>
                </div>
              )}
            </div>

            {verificationPassed && (
              <div className="pt-4 border-t border-[#EAE7DF] flex justify-end space-x-2">
                <button
                  onClick={handleConfirmVerifiedResolved}
                  className="px-6 py-2.5 rounded-md text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-subtle"
                >
                  Confirm & Mark Verified Resolved
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      <MobileNav />
    </div>
  );
};
