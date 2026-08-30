import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { MapPin, Building2, ExternalLink } from 'lucide-react';

// Custom Leaflet icon generator for Incident Marker
const createIncidentIcon = (severity, type) => {
  let color = '#2563EB'; // Low blue
  if (severity === 'Critical') color = '#DC2626';
  else if (severity === 'High') color = '#EA580C';
  else if (severity === 'Medium') color = '#D97706';

  const html = `
    <div class="relative flex items-center justify-center transform hover:scale-110 transition-transform">
      ${severity === 'Critical' ? `<span class="absolute w-9 h-9 rounded-full bg-red-500/40 animate-ping"></span>` : ''}
      <div style="background-color: ${color}" class="w-8 h-8 rounded-full shadow-lg border-2 border-white flex items-center justify-center text-white text-xs font-extrabold">
        ${type === 'Pothole' ? 'P' : type === 'Garbage' ? 'G' : type === 'Waterlogging' ? 'W' : type === 'Broken Streetlight' ? 'L' : 'R'}
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

// Custom Leaflet icon generator for Department HQ Marker
const createHqIcon = () => {
  const html = `
    <div class="relative flex items-center justify-center transform hover:scale-105 transition-transform">
      <div class="w-8 h-8 rounded-full bg-charcoal shadow-lg border-2 border-white flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-hq-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

// Helper component to auto-fit or re-center map bounds
const MapBoundsController = ({ hqCoords, incidentCoords, isZoomedToIncident }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !incidentCoords) return;

    if (isZoomedToIncident) {
      map.flyTo(incidentCoords, 16, { duration: 1.2 });
    } else if (hqCoords && incidentCoords) {
      const bounds = L.latLngBounds([hqCoords, incidentCoords]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [hqCoords, incidentCoords, isZoomedToIncident, map]);

  return null;
};

export const AuthorityIncidentMap = ({ incident, departmentHq, isZoomedToIncident }) => {
  if (!incident || !incident.coordinates) return null;

  const incidentPos = incident.coordinates;
  const hqPos = departmentHq?.coordinates || [26.4670, 80.3350];
  const routePolyline = [hqPos, incidentPos];

  return (
    <div className="relative w-full h-[360px] sm:h-[400px] bg-canvas-subtle rounded-lg overflow-hidden border border-[#EAE7DF] shadow-subtle">
      <MapContainer
        center={incidentPos}
        zoom={14}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapBoundsController
          hqCoords={hqPos}
          incidentCoords={incidentPos}
          isZoomedToIncident={isZoomedToIncident}
        />

        {/* Route Line connecting HQ to Incident */}
        <Polyline
          positions={routePolyline}
          pathOptions={{
            color: '#1D4ED8',
            weight: 4,
            dashArray: '8, 8',
            opacity: 0.85
          }}
        />

        {/* Department Office Marker */}
        <Marker position={hqPos} icon={createHqIcon()}>
          <Popup>
            <div className="p-2 text-charcoal space-y-1">
              <div className="flex items-center space-x-1 text-civic font-bold text-xs">
                <Building2 className="w-3.5 h-3.5" />
                <span>Department Office HQ</span>
              </div>
              <p className="text-[11px] font-semibold text-charcoal-muted">
                {departmentHq?.name || 'Municipal Operations Division'}
              </p>
              <span className="text-[10px] font-mono text-charcoal-subtle">
                {hqPos[0].toFixed(4)}° N, {hqPos[1].toFixed(4)}° E
              </span>
            </div>
          </Popup>
        </Marker>

        {/* Incident Marker */}
        <Marker
          position={incidentPos}
          icon={createIncidentIcon(incident.severity, incident.type)}
        >
          <Popup>
            <div className="p-3 w-64 text-charcoal">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono text-[10px] font-bold text-charcoal-subtle">{incident.id}</span>
                <SeverityBadge severity={incident.severity} size="small" />
              </div>
              <h4 className="font-bold text-sm text-charcoal line-clamp-1 mb-1">{incident.type}</h4>
              <p className="text-[11px] text-charcoal-muted line-clamp-2 mb-2">{incident.location}</p>
              
              <div className="pt-2 border-t border-[#EAE7DF] flex items-center justify-between text-[11px]">
                <span className="font-mono font-bold text-charcoal">
                  {incidentPos[0].toFixed(4)}°, {incidentPos[1].toFixed(4)}°
                </span>
                <StatusBadge status={incident.status} />
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg border border-[#EAE7DF] shadow-subtle text-[11px] space-y-1">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-charcoal border border-white flex items-center justify-center text-[8px] text-white font-bold">H</span>
          <span className="text-charcoal-muted font-medium">Department Office HQ</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-blue-600 border border-white"></span>
          <span className="text-charcoal-muted font-medium">Incident Site ({incident.id})</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-0.5 border-t-2 border-dashed border-civic"></span>
          <span className="text-charcoal-muted text-[10px]">Field Route</span>
        </div>
      </div>
    </div>
  );
};
