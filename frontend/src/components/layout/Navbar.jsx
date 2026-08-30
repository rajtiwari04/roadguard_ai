import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, PlusCircle, Map, LayoutDashboard, Building2 } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EAE7DF] select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-md bg-charcoal text-white flex items-center justify-center font-bold text-sm tracking-widest shadow-subtle group-hover:bg-civic transition-colors">
            N
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg text-charcoal tracking-tight">NAGARSETU</span>
            <span className="hidden md:inline-block ml-2.5 text-xs text-charcoal-subtle font-medium border-l border-charcoal-faint pl-2.5">
              See it. Verify it. Fix it.
            </span>
          </div>
        </Link>

        {/* Right Links */}
        <nav className="flex items-center space-x-1.5 sm:space-x-3">
          <Link
            to="/map"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-semibold text-charcoal-muted hover:text-charcoal hover:bg-canvas-subtle transition-colors"
          >
            <Map className="w-4 h-4 text-civic" />
            <span className="hidden sm:inline">Civic Map</span>
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-charcoal bg-white border border-[#EAE7DF] shadow-subtle hover:bg-surface-hover transition-all min-h-[36px]"
          >
            <LayoutDashboard className="w-4 h-4 text-charcoal-muted" />
            <span>App Platform</span>
          </Link>

          <Link
            to="/report"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-charcoal hover:bg-civic transition-colors shadow-subtle min-h-[36px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden xs:inline">Report</span>
          </Link>
        </nav>

      </div>
    </header>
  );
};
