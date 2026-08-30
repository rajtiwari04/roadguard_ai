import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { ConfidenceMeter } from '../common/ConfidenceMeter';
import { ShieldCheck, MapPin, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom DivIcon generator for Leaflet map markers
const createCustomMarkerIcon = (severity, type, isSelected) => {
  let color = '#2563EB'; // Low blue
  if (severity === 'Critical') color = '#DC2626';
  else if (severity === 'High') color = '#EA580C';
  else if (severity === 'Medium') color = '#D97706';

  const selectedRing = isSelected ? `ring-4 ring-offset-2 ring-charcoal` : '';

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform ${selectedRing}">
      ${severity === 'Critical' ? `<span class="absolute w-8 h-8 rounded-full bg-red-400/40 animate-ping"></span>` : ''}
      <div style="background-color: ${color}" class="w-7 h-7 rounded-full shadow-lg border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
        ${type === 'Pothole' ? 'P' : type === 'Garbage' ? 'G' : type === 'Waterlogging' ? 'W' : type === 'Broken Streetlight' ? 'L' : 'R'}
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-leaflet-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

// Component to handle map re-centering when selected incident changes
const MapRecenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 1.2 });
    }
  }, [center, map]);
  return null;
};

export const CivicMap = ({ incidents, selectedIncident, onSelectIncident }) => {
  const [mapCenter] = useState([26.4700, 80.3300]); // Kanpur

  return (
    <div className="relative w-full h-full min-h-[450px] bg-canvas-subtle rounded-lg overflow-hidden border border-[#EAE7DF] shadow-subtle">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full min-h-[450px] z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {selectedIncident && <MapRecenter center={selectedIncident.coordinates} />}

        {incidents.map((inc) => (
          <Marker
            key={inc.id}
            position={inc.coordinates}
            icon={createCustomMarkerIcon(inc.severity, inc.type, selectedIncident?.id === inc.id)}
            eventHandlers={{
              click: () => onSelectIncident(inc)
            }}
          >
            <Popup>
              <div className="p-3 w-64 text-charcoal">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-[10px] font-bold text-charcoal-subtle">{inc.id}</span>
                  <SeverityBadge severity={inc.severity} size="small" />
                </div>
                <h4 className="font-bold text-sm text-charcoal line-clamp-1 mb-1">{inc.type}</h4>
                <p className="text-[11px] text-charcoal-muted line-clamp-2 mb-2">{inc.location}</p>

                <div className="space-y-1.5 pt-2 border-t border-[#EAE7DF] text-[11px]">
                  <div className="flex justify-between text-charcoal-muted">
                    <span>AI Confidence</span>
                    <span className="font-bold font-mono text-charcoal">{inc.aiConfidence}%</span>
                  </div>
                  <div className="flex justify-between text-charcoal-muted">
                    <span>Community Votes</span>
                    <span className="font-bold text-charcoal">{inc.confirmedVotes} confirmed</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#EAE7DF] flex items-center justify-between">
                  <StatusBadge status={inc.status} />
                  <Link
                    to={`/incident/${inc.id}`}
                    className="inline-flex items-center text-xs font-bold text-civic hover:underline"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-lg border border-[#EAE7DF] shadow-subtle text-xs space-y-1.5 hidden sm:block">
        <div className="font-bold text-charcoal text-[11px] uppercase tracking-wider mb-1">
          Severity Markers
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
          <span className="text-charcoal-muted text-[11px]">Critical</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
          <span className="text-charcoal-muted text-[11px]">High</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="text-charcoal-muted text-[11px]">Medium</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          <span className="text-charcoal-muted text-[11px]">Low</span>
        </div>
      </div>
    </div>
  );
};
