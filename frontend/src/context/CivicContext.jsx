import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_INCIDENTS } from '../data/mockData';

const CivicContext = createContext();

const STORAGE_KEYS = {
  INCIDENTS: 'nagarsetu_incidents_v1',
  ANON_ID: 'nagarsetu_anon_id_v1',
  MY_REPORTS: 'nagarsetu_my_reports_v1',
  VOTES: 'nagarsetu_user_votes_v1',
  NOTIFICATIONS: 'nagarsetu_notifications_v1',
  OFFLINE_QUEUE: 'nagarsetu_offline_queue_v1',
  ALERTS: 'nagarsetu_alerts_v1'
};

const DEFAULT_NOTIFICATIONS = [
  {
    id: "notif-1",
    incidentId: "CIV-2847",
    title: "Civic issue near your area",
    message: "Potential pothole detected on GT Road, 0.7 km away.",
    timestamp: "10 mins ago",
    read: false,
    type: "alert"
  },
  {
    id: "notif-2",
    incidentId: "CIV-2846",
    title: "Community verification needed",
    message: "Garbage accumulation reported near Mall Road. Can you verify?",
    timestamp: "1 hour ago",
    read: false,
    type: "verification"
  },
  {
    id: "notif-3",
    incidentId: "CIV-2841",
    title: "Issue resolved",
    message: "Fallen tree at Tilak Nagar has been verified resolved.",
    timestamp: "3 hours ago",
    read: true,
    type: "resolution"
  }
];

export const CivicProvider = ({ children }) => {
  // Session ID
  const [anonSessionId] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ANON_ID) || "ANON-7F29A";
  });

  // Incidents state
  const [incidents, setIncidents] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INCIDENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_INCIDENTS;
  });

  // My submitted report IDs
  const [myReportIds, setMyReportIds] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MY_REPORTS);
    return saved ? JSON.parse(saved) : ["CIV-2847"]; // default sample
  });

  // User community votes
  const [userVotes, setUserVotes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VOTES);
    return saved ? JSON.parse(saved) : {};
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  });

  // Offline queue
  const [offlineQueue, setOfflineQueue] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE);
    return saved ? JSON.parse(saved) : [
      {
        id: `OFFLINE-101`,
        type: "Pothole",
        location: "GT Road Service Lane",
        severity: "High",
        timestamp: "Offline capture 2 hrs ago"
      },
      {
        id: `OFFLINE-102`,
        type: "Garbage",
        location: "Mall Road Junction",
        severity: "Medium",
        timestamp: "Offline capture 1 hr ago"
      }
    ];
  });

  // Offline status toggle
  const [isOffline, setIsOffline] = useState(false);

  // Alerts settings
  const [alertsSettings, setAlertsSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ALERTS);
    return saved ? JSON.parse(saved) : { enabled: true, radiusKm: 1.0 };
  });

  // Toast message state
  const [activeToast, setActiveToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setActiveToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setActiveToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MY_REPORTS, JSON.stringify(myReportIds));
  }, [myReportIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(userVotes));
  }, [userVotes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(offlineQueue));
  }, [offlineQueue]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alertsSettings));
  }, [alertsSettings]);

  // Actions
  const addIncident = (newIncidentData) => {
    const newId = `CIV-${Math.floor(2848 + Math.random() * 1000)}`;
    const newIncident = {
      id: newId,
      type: newIncidentData.type || "Pothole",
      location: newIncidentData.location || "GT Road, Kanpur",
      coordinates: newIncidentData.coordinates || [26.4784, 80.3015],
      severity: newIncidentData.severity || "High",
      aiConfidence: newIncidentData.aiConfidence || 94,
      communityConfidence: 50,
      confirmedVotes: 1,
      disputedVotes: 0,
      status: "AI Verified",
      priority: newIncidentData.severity || "High",
      department: getDepartmentForCategory(newIncidentData.type),
      ward: "Ward 1 - Swaroop Nagar",
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      description: newIncidentData.description || "Reported via NagarSetu Citizen AI scanner.",
      evidenceUrl: newIncidentData.evidenceUrl,
      resolutionEvidenceUrl: null,
      affectedArea: "Detected region",
      trafficImportance: "High",
      roadHealthScore: 45,
      timeline: [
        { step: "Reported", date: new Date().toISOString().replace('T', ' ').substring(0, 16), detail: `Reported anonymously by Citizen ${anonSessionId}` },
        { step: "AI Detected", date: new Date().toISOString().replace('T', ' ').substring(0, 16), detail: `AI verified issue (${newIncidentData.aiConfidence || 94}% confidence)` }
      ]
    };

    setIncidents(prev => [newIncident, ...prev]);
    setMyReportIds(prev => [newId, ...prev]);
    
    // Add notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        incidentId: newId,
        title: "Report Submitted Successfully",
        message: `${newIncident.type} at ${newIncident.location} registered anonymously as ${newId}.`,
        timestamp: "Just now",
        read: false,
        type: "alert"
      },
      ...prev
    ]);

    showToast(`Report ${newId} created anonymously!`, 'success');
    return newIncident;
  };

  const voteCommunityIncident = (incidentId, voteType) => {
    if (userVotes[incidentId]) {
      showToast("You have already voted on this incident.", "warning");
      return;
    }

    setUserVotes(prev => ({ ...prev, [incidentId]: voteType }));

    setIncidents(prev => prev.map(inc => {
      if (inc.id !== incidentId) return inc;
      
      const newConfirmed = voteType === 'confirm' ? inc.confirmedVotes + 1 : inc.confirmedVotes;
      const newDisputed = voteType === 'dispute' ? inc.disputedVotes + 1 : inc.disputedVotes;
      const total = newConfirmed + newDisputed;
      const newCommunityConfidence = Math.min(99, Math.round((newConfirmed / total) * 100));

      let newStatus = inc.status;
      if (newConfirmed >= 3 && inc.status === 'AI Verified') {
        newStatus = 'Community Verified';
      }

      const updatedTimeline = [...inc.timeline];
      if (newStatus === 'Community Verified' && inc.status !== 'Community Verified') {
        updatedTimeline.push({
          step: "Community Verified",
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          detail: `${newConfirmed} citizens confirmed incident (${newCommunityConfidence}% confidence)`
        });
      }

      return {
        ...inc,
        confirmedVotes: newConfirmed,
        disputedVotes: newDisputed,
        communityConfidence: newCommunityConfidence,
        status: newStatus,
        timeline: updatedTimeline
      };
    }));

    showToast(voteType === 'confirm' ? "Incident confirmed anonymously!" : "Incident dispute recorded anonymously.", "success");
  };

  const updateIncidentStatus = (incidentId, newStatus, extraData = {}) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id !== incidentId) return inc;

      const updatedTimeline = [...inc.timeline];
      const timeStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

      if (newStatus === 'Under Repair' && !inc.timeline.some(t => t.step === 'Under Repair')) {
        updatedTimeline.push({
          step: "Under Repair",
          date: timeStr,
          detail: `Assigned to ${extraData.department || inc.department} inspection crew`
        });
      } else if (newStatus === 'Resolution Verified' || newStatus === 'Resolved') {
        if (!inc.timeline.some(t => t.step === 'Resolved')) {
          updatedTimeline.push({
            step: "Resolved",
            date: timeStr,
            detail: "Municipal work completed on site"
          });
        }
        if (!inc.timeline.some(t => t.step === 'Resolution Verification')) {
          updatedTimeline.push({
            step: "Resolution Verification",
            date: timeStr,
            detail: "AI evidence cross-match passed (98.4% match confidence)"
          });
        }
      }

      return {
        ...inc,
        status: newStatus,
        resolutionEvidenceUrl: extraData.resolutionEvidenceUrl || inc.resolutionEvidenceUrl,
        timeline: updatedTimeline
      };
    }));

    showToast(`Incident ${incidentId} status updated to: ${newStatus}`, 'success');
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addOfflineReport = (report) => {
    setOfflineQueue(prev => [
      {
        id: `OFFLINE-${Date.now()}`,
        ...report,
        timestamp: "Saved locally just now"
      },
      ...prev
    ]);
    showToast("Saved report to offline queue.", "info");
  };

  const syncOfflineQueue = (onComplete) => {
    if (offlineQueue.length === 0) {
      showToast("No offline items to sync.", "info");
      if (onComplete) onComplete();
      return;
    }

    // Process items in queue into real incidents
    offlineQueue.forEach(item => {
      addIncident({
        type: item.type || "Pothole",
        location: item.location || "GT Road, Kanpur",
        severity: item.severity || "High",
        aiConfidence: 91,
        description: "Synchronized from offline field scanner queue."
      });
    });

    const count = offlineQueue.length;
    setOfflineQueue([]);
    showToast(`Successfully synchronized ${count} offline reports!`, "success");
    if (onComplete) onComplete(count);
  };

  const getDepartmentForCategory = (cat) => {
    switch (cat) {
      case 'Pothole':
      case 'Road Damage':
        return 'Roads & Infrastructure';
      case 'Garbage':
      case 'Fallen Tree':
        return 'Sanitation & Waste';
      case 'Waterlogging':
        return 'Water & Sewage';
      case 'Broken Streetlight':
        return 'Electrical & Lighting';
      default:
        return 'Public Safety';
    }
  };

  return (
    <CivicContext.Provider value={{
      anonSessionId,
      incidents,
      myReportIds,
      userVotes,
      notifications,
      offlineQueue,
      isOffline,
      alertsSettings,
      activeToast,
      showToast,
      addIncident,
      voteCommunityIncident,
      updateIncidentStatus,
      markNotificationRead,
      markAllNotificationsRead,
      setIsOffline,
      setAlertsSettings,
      addOfflineReport,
      syncOfflineQueue
    }}>
      {children}
    </CivicContext.Provider>
  );
};

export const useCivic = () => useContext(CivicContext);
