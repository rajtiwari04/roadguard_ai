import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { MobileNav } from '../components/layout/MobileNav';
import { useCivic } from '../context/CivicContext';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { CivicMap } from '../components/map/CivicMap';
import {
  ShieldCheck,
  PlusCircle,
  Map,
  Users,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Activity
} from 'lucide-react';

export const DashboardPage = () => {
  const { incidents } = useCivic();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);

  const filteredIncidents = incidents.filter(inc => {
    if (categoryFilter !== 'All' && inc.type !== categoryFilter) return false;
    if (severityFilter !== 'All' && inc.severity !== severityFilter) return false;
    return true;
  });

  const activeCount = incidents.filter(i => i.status !== 'Resolved' && i.status !== 'Resolution Verified').length;
  const verifiedCount = incidents.filter(i => i.status === 'Community Verified' || i.status === 'Resolution Verified').length;
  const criticalCount = incidents.filter(i => i.severity === 'Critical').length;

  return (
    <div className="flex h-screen bg-[#FBF9F5] overflow-hidden">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        <Topbar title="Citizen Overview" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 md:pb-6 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE7DF] pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <h2 className="text-lg sm:text-2xl font-extrabold text-charcoal tracking-tight">
                  Welcome, Anonymous Citizen
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
                Here's what’s happening in your neighborhood around Kanpur.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/report"
                className="px-3.5 py-2.5 rounded-md text-xs font-bold text-white bg-charcoal hover:bg-civic transition-colors shadow-subtle flex items-center space-x-1.5 min-h-[40px]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Report Issue</span>
              </Link>
              <Link
                to="/community"
                className="px-3.5 py-2.5 rounded-md text-xs font-bold text-charcoal bg-white border border-[#EAE7DF] hover:bg-canvas-subtle transition-colors shadow-subtle flex items-center space-x-1.5 min-h-[40px]"
              >
                <Users className="w-4 h-4 text-civic" />
                <span>Verify Issues</span>
              </Link>
            </div>
          </div>

          {/* Civic Snapshot Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 sm:p-4 rounded-lg bg-white border border-[#EAE7DF] shadow-subtle flex items-center justify-between">
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-charcoal-subtle uppercase tracking-wider block">
                  Active Nearby Incidents
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-charcoal font-mono mt-0.5 block">
                  {activeCount}
                </span>
                <span className="text-[10px] text-charcoal-muted">Within Kanpur Metro</span>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0 ml-2">
                <Activity className="w-5 h-5" />
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-lg bg-white border border-[#EAE7DF] shadow-subtle flex items-center justify-between">
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-charcoal-subtle uppercase tracking-wider block">
                  Community Verified
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono mt-0.5 block">
                  {verifiedCount}
                </span>
                <span className="text-[10px] text-charcoal-muted">Validated by Citizens</span>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 ml-2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-lg bg-white border border-[#EAE7DF] shadow-subtle flex items-center justify-between">
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-charcoal-subtle uppercase tracking-wider block">
                  Critical Priority Alerts
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-red-600 font-mono mt-0.5 block">
                  {criticalCount}
                </span>
                <span className="text-[10px] text-charcoal-muted">Require Immediate Fix</span>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0 ml-2">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Map & Incident Feed Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Incident Feed List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Filter Bar */}
              <div className="p-3 rounded-lg bg-white border border-[#EAE7DF] shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-charcoal-subtle" />
                  <span className="text-xs font-bold text-charcoal">Filter Incidents</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded bg-canvas-subtle border border-[#EAE7DF] text-charcoal flex-1 sm:flex-none"
                  >
                    <option value="All">All Categories</option>
                    <option value="Pothole">Potholes</option>
                    <option value="Garbage">Garbage</option>
                    <option value="Waterlogging">Waterlogging</option>
                    <option value="Broken Streetlight">Streetlights</option>
                    <option value="Road Damage">Road Damage</option>
                  </select>

                  {/* Severity Filter */}
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded bg-canvas-subtle border border-[#EAE7DF] text-charcoal flex-1 sm:flex-none"
                  >
                    <option value="All">All Severities</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              {/* Incidents List */}
              <div className="space-y-3">
                {filteredIncidents.slice(0, 8).map((inc) => {
                  const isSelected = selectedIncident?.id === inc.id;
                  return (
                    <div
                      key={inc.id}
                      onClick={() => setSelectedIncident(inc)}
                      className={`p-3.5 sm:p-4 rounded-lg bg-white border transition-all cursor-pointer shadow-subtle hover:border-civic ${
                        isSelected ? 'border-civic ring-1 ring-civic/20 bg-blue-50/20' : 'border-[#EAE7DF]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-mono text-[10px] font-bold text-charcoal-subtle">{inc.id}</span>
                            <span className="text-xs font-bold text-civic">{inc.type}</span>
                            <SeverityBadge severity={inc.severity} size="small" />
                          </div>
                          <h4 className="font-bold text-xs sm:text-sm text-charcoal mt-1 line-clamp-1">{inc.location}</h4>
                        </div>
                        <StatusBadge status={inc.status} />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs border-t border-[#EAE7DF]">
                        <div>
                          <span className="text-[10px] text-charcoal-subtle block">AI Confidence</span>
                          <span className="font-mono font-bold text-charcoal text-xs">{inc.aiConfidence}%</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-charcoal-subtle block">Community</span>
                          <span className="font-bold text-charcoal text-xs">{inc.confirmedVotes} confirmed</span>
                        </div>
                        <div className="hidden sm:block">
                          <span className="text-[10px] text-charcoal-subtle block">Department</span>
                          <span className="font-medium text-charcoal text-xs truncate block">{inc.department}</span>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[#EAE7DF] flex items-center justify-between text-xs">
                        <span className="text-[10px] sm:text-[11px] text-charcoal-subtle">{inc.date}</span>
                        <Link
                          to={`/incident/${inc.id}`}
                          className="font-bold text-civic hover:underline flex items-center space-x-1 text-xs"
                        >
                          <span>Full Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Interactive Map Side View (5 cols) */}
            <div className="lg:col-span-5 h-72 sm:h-96 lg:h-[620px] lg:sticky lg:top-20">
              <div className="h-full rounded-lg overflow-hidden border border-[#EAE7DF] shadow-subtle flex flex-col bg-white">
                <div className="p-3 bg-canvas-subtle border-b border-[#EAE7DF] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Map className="w-4 h-4 text-civic" />
                    <span className="font-bold text-xs text-charcoal">Spatial Incident Map</span>
                  </div>
                  <Link to="/map" className="text-xs text-civic hover:underline font-bold">
                    Full Map →
                  </Link>
                </div>
                <div className="flex-1 min-h-0">
                  <CivicMap
                    incidents={filteredIncidents}
                    selectedIncident={selectedIncident}
                    onSelectIncident={(inc) => setSelectedIncident(inc)}
                  />
                </div>
              </div>
            </div>

          </div>

        </main>

      </div>

      <MobileNav />
    </div>
  );
};
