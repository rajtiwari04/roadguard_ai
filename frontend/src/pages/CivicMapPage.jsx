import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { MobileNav } from '../components/layout/MobileNav';
import { useCivic } from '../context/CivicContext';
import { CivicMap } from '../components/map/CivicMap';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { ConfidenceMeter } from '../components/common/ConfidenceMeter';
import { CITY_STATS } from '../data/mockData';
import {
  Filter,
  MapPin,
  ArrowRight,
  Map,
  List
} from 'lucide-react';

export const CivicMapPage = () => {
  const { incidents } = useCivic();

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);
  const [mobileTab, setMobileTab] = useState('map'); // 'map' | 'details'

  const categories = ['All', 'Pothole', 'Garbage', 'Waterlogging', 'Broken Streetlight', 'Road Damage', 'Damaged Sign'];
  const severities = ['All', 'Critical', 'High', 'Medium', 'Low'];

  const filteredIncidents = incidents.filter(inc => {
    if (categoryFilter !== 'All' && inc.type !== categoryFilter) return false;
    if (severityFilter !== 'All' && inc.severity !== severityFilter) return false;
    if (statusFilter !== 'All' && inc.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="flex h-screen bg-[#FBF9F5] overflow-hidden">
      
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        <Topbar title="Civic Intelligence Map" />

        {/* Filter Controls Bar */}
        <div className="bg-white border-b border-[#EAE7DF] px-3 sm:px-4 py-2.5 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 z-20">
          
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5 max-w-full">
            <span className="font-bold text-charcoal flex items-center space-x-1 shrink-0 text-xs">
              <Filter className="w-3.5 h-3.5 text-civic" />
              <span className="hidden sm:inline">Filters:</span>
            </span>

            {/* Category Horizontal Scroll Pills */}
            <div className="flex items-center space-x-1 shrink-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors ${
                    categoryFilter === cat
                      ? 'bg-charcoal text-white shadow-subtle'
                      : 'bg-canvas-subtle text-charcoal-muted hover:text-charcoal'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="text-charcoal-faint shrink-0">|</span>

            {/* Severity Select */}
            <div className="flex items-center space-x-1 shrink-0">
              <span className="text-charcoal-subtle font-semibold text-[11px] hidden sm:inline">Severity:</span>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="text-[11px] font-semibold px-2 py-1 rounded bg-canvas-subtle border border-[#EAE7DF] text-charcoal"
              >
                {severities.map(sev => (
                  <option key={sev} value={sev}>{sev}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
            {/* Mobile View Toggle */}
            <div className="flex items-center bg-canvas-subtle rounded-lg p-0.5 border border-[#EAE7DF] md:hidden">
              <button
                onClick={() => setMobileTab('map')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center space-x-1 ${
                  mobileTab === 'map' ? 'bg-white text-charcoal shadow-subtle' : 'text-charcoal-muted'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Map</span>
              </button>
              <button
                onClick={() => setMobileTab('details')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center space-x-1 ${
                  mobileTab === 'details' ? 'bg-white text-charcoal shadow-subtle' : 'text-charcoal-muted'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Details</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-charcoal-subtle">
              <strong className="text-charcoal">{filteredIncidents.length}</strong> incidents
            </div>
          </div>

        </div>

        {/* Main Map & Side Drawer Layout */}
        <div className="flex-1 relative overflow-hidden flex flex-col md:flex-row pb-14 md:pb-0">
          
          {/* Map Surface */}
          <div className={`flex-1 h-full relative ${mobileTab === 'details' ? 'hidden md:block' : 'block'}`}>
            <CivicMap
              incidents={filteredIncidents}
              selectedIncident={selectedIncident}
              onSelectIncident={(inc) => {
                setSelectedIncident(inc);
                // On mobile, if clicked marker, auto switch to details tab or expand drawer
              }}
            />
          </div>

          {/* Side Drawer Incident Detail & Corridor Panel */}
          <div className={`w-full md:w-96 bg-white border-t md:border-t-0 md:border-l border-[#EAE7DF] h-full overflow-y-auto p-4 space-y-4 shrink-0 shadow-modal z-20 ${
            mobileTab === 'map' ? 'hidden md:block' : 'block'
          }`}>
            
            {selectedIncident ? (
              <div className="space-y-4 animate-slide-up">
                <div className="flex items-center justify-between border-b border-[#EAE7DF] pb-2.5">
                  <span className="font-mono text-xs font-bold text-charcoal-subtle">{selectedIncident.id}</span>
                  <StatusBadge status={selectedIncident.status} />
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold text-civic uppercase tracking-wider">{selectedIncident.type}</span>
                    <SeverityBadge severity={selectedIncident.severity} size="small" />
                  </div>
                  <h3 className="font-bold text-base text-charcoal leading-tight">
                    {selectedIncident.location}
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1 leading-relaxed line-clamp-3">
                    {selectedIncident.description}
                  </p>
                </div>

                <div className="rounded-md overflow-hidden border border-[#EAE7DF]">
                  <img
                    src={selectedIncident.evidenceUrl}
                    alt="Evidence preview"
                    className="w-full h-36 object-cover"
                  />
                </div>

                <div className="space-y-3 pt-1">
                  <ConfidenceMeter label="AI Confidence Score" value={selectedIncident.aiConfidence} />
                  <ConfidenceMeter label="Community Confidence" value={selectedIncident.communityConfidence} />
                </div>

                <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#EAE7DF] text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-charcoal-subtle">Assigned Department</span>
                    <span className="font-bold text-charcoal">{selectedIncident.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-subtle">Ward</span>
                    <span className="font-medium text-charcoal">{selectedIncident.ward}</span>
                  </div>
                </div>

                <Link
                  to={`/incident/${selectedIncident.id}`}
                  className="w-full py-2.5 px-3 rounded-md text-xs font-bold text-white bg-charcoal hover:bg-civic transition-colors flex items-center justify-center space-x-1.5 shadow-subtle min-h-[40px]"
                >
                  <span>Open Full Incident Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-charcoal-subtle">
                Click any marker on the map to view incident telemetry.
              </div>
            )}

            {/* Road Health Corridors Card */}
            <div className="pt-4 border-t border-[#EAE7DF] space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-subtle block">
                Kanpur Road Health Corridors
              </span>
              
              <div className="space-y-2">
                {CITY_STATS.roadHealthCorridors.map((c, i) => (
                  <div key={i} className="p-2.5 rounded bg-[#FAF9F5] border border-[#EAE7DF] text-xs space-y-1">
                    <div className="flex justify-between font-semibold text-charcoal">
                      <span className="truncate pr-2">{c.corridor}</span>
                      <span className={`font-mono shrink-0 ${c.score < 50 ? 'text-red-600 font-bold' : 'text-emerald-700'}`}>
                        {c.score}/100
                      </span>
                    </div>
                    <div className="w-full bg-canvas-muted rounded-full h-1 overflow-hidden">
                      <div
                        className={`h-1 rounded-full ${c.score < 50 ? 'bg-red-500' : 'bg-emerald-600'}`}
                        style={{ width: `${c.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      <MobileNav />
    </div>
  );
};
