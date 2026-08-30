import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { MobileNav } from '../components/layout/MobileNav';
import { useCivic } from '../context/CivicContext';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  Building2,
  Filter,
  Search,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  ExternalLink
} from 'lucide-react';

const CATEGORY_CHART_DATA = [
  { category: 'Pothole', count: 480 },
  { category: 'Garbage', count: 320 },
  { category: 'Waterlogging', count: 210 },
  { category: 'Streetlight', count: 150 },
  { category: 'Road Damage', count: 124 }
];

const TREND_CHART_DATA = [
  { day: 'Mon', reported: 42, resolved: 38 },
  { day: 'Tue', reported: 55, resolved: 46 },
  { day: 'Wed', reported: 68, resolved: 52 },
  { day: 'Thu', reported: 72, resolved: 65 },
  { day: 'Fri', reported: 61, resolved: 58 },
  { day: 'Sat', reported: 49, resolved: 41 },
  { day: 'Sun', reported: 35, resolved: 39 }
];

export const AuthorityPage = () => {
  const { incidents } = useCivic();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredIncidents = incidents.filter(inc => {
    if (categoryFilter !== 'All' && inc.type !== categoryFilter) return false;
    if (severityFilter !== 'All' && inc.severity !== severityFilter) return false;
    if (statusFilter !== 'All' && inc.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return inc.id.toLowerCase().includes(q) || inc.location.toLowerCase().includes(q) || inc.type.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex h-screen bg-[#FBF9F5] overflow-hidden">
      
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        <Topbar title="Municipal Civic Intelligence" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 md:pb-6 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Header Summary Cards */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE7DF] pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 shrink-0" />
                <h2 className="text-lg sm:text-2xl font-extrabold text-charcoal tracking-tight">
                  Municipal Command Center
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
                Kanpur Municipal Corporation • Real-time priority queue & resolution verification
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono bg-white px-3 py-1.5 rounded-md border border-[#EAE7DF] self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-charcoal font-bold">Zone 1 & 2 Live Feeds</span>
            </div>
          </div>

          {/* Operational Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
            <div className="p-3.5 sm:p-4 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle">
              <span className="text-[9px] sm:text-[10px] font-bold text-charcoal-subtle uppercase tracking-wider block">Total Issues</span>
              <span className="text-xl sm:text-2xl font-extrabold text-charcoal font-mono mt-0.5 block">1,284</span>
              <span className="text-[10px] text-emerald-700 font-semibold">+4.2% this week</span>
            </div>

            <div className="p-3.5 sm:p-4 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle">
              <span className="text-[9px] sm:text-[10px] font-bold text-charcoal-subtle uppercase tracking-wider block">Critical Priority</span>
              <span className="text-xl sm:text-2xl font-extrabold text-red-600 font-mono mt-0.5 block">42</span>
              <span className="text-[10px] text-red-700 font-semibold">Immediate dispatch</span>
            </div>

            <div className="p-3.5 sm:p-4 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle">
              <span className="text-[9px] sm:text-[10px] font-bold text-charcoal-subtle uppercase tracking-wider block">Pending Review</span>
              <span className="text-xl sm:text-2xl font-extrabold text-amber-700 font-mono mt-0.5 block">317</span>
              <span className="text-[10px] text-charcoal-muted">Awaiting crew</span>
            </div>

            <div className="p-3.5 sm:p-4 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle">
              <span className="text-[9px] sm:text-[10px] font-bold text-charcoal-subtle uppercase tracking-wider block">Verified Resolved</span>
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 font-mono mt-0.5 block">742</span>
              <span className="text-[10px] text-emerald-700 font-semibold">AI Verified</span>
            </div>

            <div className="p-3.5 sm:p-4 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle col-span-2 lg:col-span-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-charcoal-subtle uppercase tracking-wider block">Verification Rate</span>
              <span className="text-xl sm:text-2xl font-extrabold text-civic font-mono mt-0.5 block">91%</span>
              <span className="text-[10px] text-civic font-semibold">High accuracy</span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Issues by Category */}
            <div className="p-4 sm:p-5 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle">Issues by Category</span>
                <span className="text-[10px] font-mono text-charcoal-subtle">MUNICIPAL METRICS</span>
              </div>
              <div className="h-48 sm:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CATEGORY_CHART_DATA}>
                    <XAxis dataKey="category" stroke="#8C9099" fontSize={10} tickLine={false} />
                    <YAxis stroke="#8C9099" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1C1D1F', borderRadius: '6px', color: '#FFF', fontSize: '12px' }}
                    />
                    <Bar dataKey="count" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Resolution Performance */}
            <div className="p-4 sm:p-5 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle">Daily Intake vs Resolution</span>
                <span className="text-[10px] font-mono text-charcoal-subtle">WEEKLY VELOCITY</span>
              </div>
              <div className="h-48 sm:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={TREND_CHART_DATA}>
                    <XAxis dataKey="day" stroke="#8C9099" fontSize={10} tickLine={false} />
                    <YAxis stroke="#8C9099" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1C1D1F', borderRadius: '6px', color: '#FFF', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="reported" stroke="#EA580C" fill="#FFF7ED" strokeWidth={2} />
                    <Area type="monotone" dataKey="resolved" stroke="#15803D" fill="#F0FDF4" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Main Operational Section */}
          <div className="p-4 sm:p-5 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-civic shrink-0" />
                <h3 className="font-bold text-sm text-charcoal">Operational Priority Queue</h3>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                
                {/* Search Bar */}
                <div className="relative flex-1 sm:flex-none">
                  <Search className="w-3.5 h-3.5 text-charcoal-subtle absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search ID, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-md border border-[#EAE7DF] bg-[#FAF9F5] text-xs font-medium w-full sm:w-52"
                  />
                </div>

                {/* Category Dropdown */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-2 py-1.5 rounded border border-[#EAE7DF] bg-[#FAF9F5] text-xs font-semibold flex-1 sm:flex-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Pothole">Pothole</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Waterlogging">Waterlogging</option>
                  <option value="Broken Streetlight">Streetlight</option>
                  <option value="Road Damage">Road Damage</option>
                </select>

                {/* Severity Dropdown */}
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="px-2 py-1.5 rounded border border-[#EAE7DF] bg-[#FAF9F5] text-xs font-semibold flex-1 sm:flex-none"
                >
                  <option value="All">All Severities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {/* Desktop Table View (hidden on small screens) */}
            <div className="hidden md:block overflow-x-auto border border-[#EAE7DF] rounded-lg">
              <table className="w-full text-left text-xs text-charcoal border-collapse">
                <thead className="bg-[#FAF9F5] border-b border-[#EAE7DF] font-bold text-charcoal-subtle uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Category & Location</th>
                    <th className="p-3">Severity</th>
                    <th className="p-3">AI Match</th>
                    <th className="p-3">Community Votes</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE7DF]">
                  {filteredIncidents.slice(0, 12).map((inc) => (
                    <tr
                      key={inc.id}
                      onClick={() => navigate(`/authority/incident/${inc.id}`)}
                      className="hover:bg-canvas-subtle/50 transition-colors cursor-pointer"
                    >
                      <td className="p-3 font-mono font-bold text-civic">{inc.id}</td>
                      <td className="p-3">
                        <span className="font-bold block text-charcoal">{inc.type}</span>
                        <span className="text-[11px] text-charcoal-muted truncate max-w-xs block">{inc.location}</span>
                      </td>
                      <td className="p-3">
                        <SeverityBadge severity={inc.severity} size="small" />
                      </td>
                      <td className="p-3 font-mono font-bold">{inc.aiConfidence}%</td>
                      <td className="p-3">
                        <span className="font-semibold text-emerald-800">{inc.confirmedVotes} confirmed</span>
                        <span className="text-[10px] text-charcoal-subtle block">({inc.communityConfidence}% confidence)</span>
                      </td>
                      <td className="p-3 font-medium text-charcoal-muted">{inc.department}</td>
                      <td className="p-3">
                        <StatusBadge status={inc.status} />
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          to={`/authority/incident/${inc.id}`}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-charcoal text-white font-bold text-[11px] hover:bg-civic transition-colors"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Incident Cards List (visible on mobile screens) */}
            <div className="md:hidden space-y-3">
              {filteredIncidents.slice(0, 12).map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => navigate(`/authority/incident/${inc.id}`)}
                  className="p-3.5 rounded-lg bg-[#FAF9F5] border border-[#EAE7DF] space-y-2.5 cursor-pointer hover:border-civic transition-colors shadow-subtle"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono text-xs font-bold text-civic">{inc.id}</span>
                      <SeverityBadge severity={inc.severity} size="small" />
                    </div>
                    <StatusBadge status={inc.status} />
                  </div>

                  <div>
                    <span className="font-bold text-xs text-charcoal block">{inc.type}</span>
                    <span className="text-[11px] text-charcoal-muted line-clamp-1">{inc.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-[#EAE7DF]">
                    <div>
                      <span className="text-charcoal-subtle block text-[10px]">AI Confidence</span>
                      <span className="font-mono font-bold text-charcoal">{inc.aiConfidence}%</span>
                    </div>
                    <div>
                      <span className="text-charcoal-subtle block text-[10px]">Community</span>
                      <span className="font-bold text-emerald-800">{inc.confirmedVotes} Confirmed</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#EAE7DF] flex items-center justify-between text-xs">
                    <span className="text-[10px] text-charcoal-subtle">{inc.department}</span>
                    <span className="font-bold text-civic flex items-center space-x-1 text-xs">
                      <span>Manage Dispatch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
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
