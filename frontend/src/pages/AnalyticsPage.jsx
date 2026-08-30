import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { MobileNav } from '../components/layout/MobileNav';
import { CITY_STATS } from '../data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Activity, ShieldCheck, MapPin, TrendingUp, BarChart3 } from 'lucide-react';

const WARD_PIE_DATA = [
  { name: 'Ward 1 - Swaroop Nagar', value: 82, color: '#15803D' },
  { name: 'Ward 2 - Mall Road', value: 64, color: '#D97706' },
  { name: 'Ward 3 - Kakadeo', value: 51, color: '#DC2626' },
  { name: 'Ward 4 - Kidwai Nagar', value: 76, color: '#2563EB' }
];

export const AnalyticsPage = () => {
  return (
    <div className="flex h-screen bg-[#FBF9F5] overflow-hidden">
      
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        <Topbar title="City Civic Health & Ward Analytics" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE7DF] pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-civic" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">
                  City Civic Health Index
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
                Kanpur Metropolitan Ward Performance & Infrastructure Diagnostic Report
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-[#EAE7DF] shadow-subtle">
              <span className="text-xs font-bold text-charcoal-subtle uppercase">City Index Score</span>
              <span className="text-3xl font-extrabold font-mono text-civic">68<span className="text-xs text-charcoal-subtle">/100</span></span>
            </div>
          </div>

          {/* Ward Health Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CITY_STATS.wards.map((w, idx) => (
              <div key={idx} className="p-4 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-charcoal truncate">{w.name}</span>
                  <span className={`font-mono text-xs font-bold ${
                    w.health >= 75 ? 'text-emerald-700' : w.health >= 60 ? 'text-amber-700' : 'text-red-600'
                  }`}>
                    {w.health}/100
                  </span>
                </div>

                <div className="w-full bg-canvas-subtle rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full ${
                      w.health >= 75 ? 'bg-emerald-600' : w.health >= 60 ? 'bg-amber-500' : 'bg-red-600'
                    }`}
                    style={{ width: `${w.health}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-charcoal-muted pt-1 border-t border-[#EAE7DF]">
                  <span>Active Issues: <strong>{w.activeIssues}</strong></span>
                  <span>Resolved: <strong>{w.totalResolved}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Ward Breakdown & Top Hotspots */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Hotspots List (7 cols) */}
            <div className="lg:col-span-7 p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle block">
                Top Civic Breakdown Hotspots
              </span>

              <div className="space-y-3">
                {[
                  { name: "GT Road Arterial Corridor", issues: 48, severity: "Critical", score: 38 },
                  { name: "Mall Road Commercial Belt", issues: 32, severity: "High", score: 72 },
                  { name: "Swaroop Nagar Drainage Corridor", issues: 29, severity: "Critical", score: 54 },
                  { name: "Civil Lines Trunk Road", issues: 18, severity: "Medium", score: 81 }
                ].map((h, i) => (
                  <div key={i} className="p-3.5 rounded-lg bg-[#FAF9F5] border border-[#EAE7DF] flex items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-charcoal block">{h.name}</span>
                      <span className="text-[11px] text-charcoal-muted">{h.issues} Active Incidents Detected</span>
                    </div>

                    <div className="text-right">
                      <span className={`font-mono font-bold text-sm block ${
                        h.score < 50 ? 'text-red-600' : h.score < 75 ? 'text-amber-700' : 'text-emerald-700'
                      }`}>
                        {h.score}/100
                      </span>
                      <span className="text-[10px] text-charcoal-subtle uppercase font-semibold">{h.severity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ward Pie Chart (5 cols) */}
            <div className="lg:col-span-5 p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle block">
                Ward Health Score Proportion
              </span>

              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={WARD_PIE_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                      paddingAngle={4}
                    >
                      {WARD_PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1C1D1F', borderRadius: '6px', color: '#FFF', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </main>

      </div>

      <MobileNav />
    </div>
  );
};
