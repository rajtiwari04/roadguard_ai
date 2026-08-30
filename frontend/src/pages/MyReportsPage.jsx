import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { MobileNav } from '../components/layout/MobileNav';
import { useCivic } from '../context/CivicContext';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  FileText,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
  PlusCircle
} from 'lucide-react';

export const MyReportsPage = () => {
  const { incidents, myReportIds, anonSessionId } = useCivic();

  const myReports = incidents.filter(i => myReportIds.includes(i.id));

  return (
    <div className="flex h-screen bg-[#FBF9F5] overflow-hidden">
      
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        <Topbar title="My Anonymous Reports" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6 space-y-6 max-w-4xl mx-auto w-full">
          
          {/* Header */}
          <div className="p-6 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle space-y-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-6 h-6 text-civic" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">
                My Anonymous Reports
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              You can track the resolution progress of your reports locally without creating an account or providing personal identity. Bound to browser session token <span className="font-mono font-bold text-charcoal">{anonSessionId}</span>.
            </p>
          </div>

          {/* Timeline / List */}
          <div className="space-y-3">
            {myReports.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-lg border border-[#EAE7DF] space-y-4">
                <Clock className="w-10 h-10 text-charcoal-subtle mx-auto" />
                <h3 className="font-bold text-base text-charcoal">No Anonymous Reports Yet</h3>
                <p className="text-xs text-charcoal-muted max-w-xs mx-auto">
                  Submit a photo of a civic issue to begin tracking its resolution lifecycle.
                </p>
                <Link
                  to="/report"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-md text-xs font-bold text-white bg-charcoal hover:bg-civic transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Report an Issue Now</span>
                </Link>
              </div>
            ) : (
              myReports.map((inc) => (
                <div
                  key={inc.id}
                  className="p-5 bg-white rounded-lg border border-[#EAE7DF] shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-civic"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-charcoal-subtle">{inc.id}</span>
                      <span className="text-xs font-bold text-civic">{inc.type}</span>
                      <SeverityBadge severity={inc.severity} size="small" />
                    </div>
                    <h3 className="font-bold text-sm text-charcoal leading-snug">{inc.location}</h3>
                    <p className="text-xs text-charcoal-muted line-clamp-1">{inc.description}</p>
                    <span className="text-[11px] text-charcoal-subtle block font-mono">Reported {inc.date}</span>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#EAE7DF]">
                    <StatusBadge status={inc.status} />
                    <Link
                      to={`/incident/${inc.id}`}
                      className="text-xs font-bold text-civic hover:underline flex items-center space-x-1"
                    >
                      <span>Track Progress</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

        </main>

      </div>

      <MobileNav />
    </div>
  );
};
