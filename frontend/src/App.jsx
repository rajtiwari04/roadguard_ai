import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CivicProvider } from './context/CivicContext';
import { Toast } from './components/common/Toast';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ReportIssuePage } from './pages/ReportIssuePage';
import { CivicMapPage } from './pages/CivicMapPage';
import { IncidentDetailPage } from './pages/IncidentDetailPage';
import { CommunityPage } from './pages/CommunityPage';
import { MyReportsPage } from './pages/MyReportsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AuthorityPage } from './pages/AuthorityPage';
import { AuthorityDetailPage } from './pages/AuthorityDetailPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { OfflinePage } from './pages/OfflinePage';

export function App() {
  return (
    <CivicProvider>
      <Router>
        <div className="min-h-screen bg-[#FBF9F5] text-[#1C1D1F]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/report" element={<ReportIssuePage />} />
            <Route path="/map" element={<CivicMapPage />} />
            <Route path="/incident/:id" element={<IncidentDetailPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/reports" element={<MyReportsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/authority" element={<AuthorityPage />} />
            <Route path="/authority/incident/:id" element={<AuthorityDetailPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/offline" element={<OfflinePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toast />
        </div>
      </Router>
    </CivicProvider>
  );
}

export default App;
