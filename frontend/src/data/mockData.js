// Helper mock SVG evidence generators for civic issues
const createCivicEvidenceSvg = (type, title, date, severityColor) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
    <rect width="600" height="400" fill="#EFECE6"/>
    <!-- Simulated Asphalt/Street Texture -->
    <rect x="0" y="240" width="600" height="160" fill="#3A3D42"/>
    <line x1="0" y1="320" x2="600" y2="320" stroke="#E5E7EB" stroke-width="4" stroke-dasharray="24 16"/>
    <!-- Sidewalk/Curb -->
    <rect x="0" y="210" width="600" height="30" fill="#9CA3AF"/>
    <!-- Background building outline -->
    <path d="M40 210 V110 H140 V210 M160 210 V80 H280 V210 M320 210 V130 H480 V210" stroke="#B1B5C0" stroke-width="2" fill="#DFE2E8"/>
    <!-- Civic Problem Visual -->
    ${type === 'Pothole' ? `
      <ellipse cx="300" cy="310" rx="90" ry="35" fill="#1C1D1F"/>
      <ellipse cx="295" cy="308" rx="80" ry="28" fill="#111213"/>
      <path d="M230 300 C 260 280, 340 330, 370 305" stroke="#4B5563" stroke-width="3"/>
    ` : type === 'Garbage' ? `
      <path d="M240 240 L260 190 L340 185 L370 240 Z" fill="#65A30D"/>
      <path d="M220 245 L250 210 L300 245 Z" fill="#D97706"/>
      <circle cx="310" cy="220" r="18" fill="#EF4444"/>
      <path d="M280 240 L350 200 L380 245 Z" fill="#4B5563"/>
    ` : type === 'Waterlogging' ? `
      <ellipse cx="300" cy="300" rx="220" ry="50" fill="#3B82F6" opacity="0.75"/>
      <path d="M120 295 Q 300 320 480 295 Q 300 270 120 295" fill="#60A5FA" opacity="0.5"/>
    ` : type === 'Broken Streetlight' ? `
      <rect x="420" y="70" width="12" height="140" fill="#4B5563"/>
      <path d="M410 70 H450 L435 50 H415 Z" fill="#1F2937"/>
      <circle cx="426" cy="75" r="8" fill="#EF4444" opacity="0.8"/>
      <path d="M420 85 L390 120 M432 85 L460 125" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4 4"/>
    ` : `
      <rect x="220" y="270" width="160" height="40" fill="#B91C1C" opacity="0.8"/>
      <path d="M200 310 L400 310" stroke="#F59E0B" stroke-width="6"/>
    `}
    
    <!-- AI Bounding Box Overlay -->
    <rect x="180" y="160" width="240" height="170" fill="none" stroke="${severityColor}" stroke-width="2" stroke-dasharray="6 4"/>
    <rect x="180" y="132" width="140" height="28" fill="${severityColor}"/>
    <text x="188" y="151" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">AI: ${type.toUpperCase()}</text>
    
    <!-- Watermark / Timestamp -->
    <rect x="12" y="12" width="240" height="34" rx="4" fill="rgba(28, 29, 31, 0.75)"/>
    <text x="24" y="33" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="500">NAGARSETU VERIFIED EVID • ${date}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const createResolvedEvidenceSvg = (type, date) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
    <rect width="600" height="400" fill="#F0FDF4"/>
    <!-- Fresh Asphalt / Repaired Road -->
    <rect x="0" y="220" width="600" height="180" fill="#27272A"/>
    <line x1="0" y1="310" x2="600" y2="310" stroke="#FACC15" stroke-width="6"/>
    <!-- Fresh Sidewalk -->
    <rect x="0" y="190" width="600" height="30" fill="#D1D5DB"/>
    <!-- Background Clean Area -->
    <path d="M40 190 V100 H140 V190 M160 190 V70 H280 V190 M320 190 V120 H480 V190" stroke="#9CA3AF" stroke-width="2" fill="#E5E7EB"/>
    
    <!-- Resolution Check Overlay -->
    <circle cx="300" cy="200" r="45" fill="#166534"/>
    <path d="M280 200 L295 215 L325 185" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    
    <!-- AI Verification Banner -->
    <rect x="160" y="270" width="280" height="36" rx="6" fill="#15803D"/>
    <text x="300" y="293" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">RESOLUTION VERIFIED BY AI (98.4%)</text>
    
    <rect x="12" y="12" width="260" height="34" rx="4" fill="rgba(21, 128, 61, 0.9)"/>
    <text x="24" y="33" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="500">MUNICIPAL FIX COMPLETED • ${date}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const INITIAL_INCIDENTS = [
  {
    id: "CIV-2847",
    type: "Pothole",
    location: "GT Road, near Rawatpur Crossing, Kanpur",
    coordinates: [26.4784, 80.3015],
    severity: "Critical",
    aiConfidence: 94,
    communityConfidence: 91,
    confirmedVotes: 47,
    disputedVotes: 4,
    status: "Community Verified",
    priority: "Critical",
    department: "Roads & Infrastructure",
    ward: "Ward 1 - Swaroop Nagar",
    date: "2026-08-29 09:15",
    description: "Large deep pothole occupying 60% of the eastbound traffic lane. Causing severe traffic bottlenecks during morning rush hour and extreme risk to two-wheelers.",
    evidenceUrl: createCivicEvidenceSvg('Pothole', 'Rawatpur GT Road Pothole', '2026-08-29', '#DC2626'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Pothole', '2026-08-30'),
    affectedArea: "35 sq. meters lane surface",
    trafficImportance: "High (Arterial GT Road Corridor)",
    roadHealthScore: 38,
    timeline: [
      { step: "Reported", date: "2026-08-29 09:15", detail: "Reported anonymously by Citizen ANON-7F29A" },
      { step: "AI Detected", date: "2026-08-29 09:16", detail: "AI model classified as Critical Pothole (94% confidence)" },
      { step: "Community Verified", date: "2026-08-29 11:30", detail: "47 nearby citizens confirmed incident (91% confidence)" },
      { step: "Forwarded", date: "2026-08-29 12:00", detail: "Assigned to Municipal Roads & Infrastructure Division" }
    ]
  },
  {
    id: "CIV-2846",
    type: "Garbage",
    location: "Mall Road, near Phool Bagh Gate 2, Kanpur",
    coordinates: [26.4670, 80.3540],
    severity: "High",
    aiConfidence: 89,
    communityConfidence: 87,
    confirmedVotes: 32,
    disputedVotes: 3,
    status: "Forwarded",
    priority: "High",
    department: "Sanitation & Waste",
    ward: "Ward 2 - Mall Road",
    date: "2026-08-29 08:40",
    description: "Overflowing commercial waste dump encroaching on pedestrian walkway and market entrance. Odor and stray animal accumulation.",
    evidenceUrl: createCivicEvidenceSvg('Garbage', 'Phool Bagh Mall Road Dumping', '2026-08-29', '#EA580C'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Garbage', '2026-08-30'),
    affectedArea: "18 sq. meters sidewalk",
    trafficImportance: "Medium (Commercial Pedestrian Zone)",
    roadHealthScore: 72,
    timeline: [
      { step: "Reported", date: "2026-08-29 08:40", detail: "Reported anonymously by Citizen ANON-4A12B" },
      { step: "AI Detected", date: "2026-08-29 08:41", detail: "AI model classified as Unsanitary Waste Hotspot (89% confidence)" },
      { step: "Community Verified", date: "2026-08-29 10:15", detail: "32 citizens verified location" },
      { step: "Forwarded", date: "2026-08-29 10:30", detail: "Sent to Zone 2 Sanitation Officer" }
    ]
  },
  {
    id: "CIV-2845",
    type: "Waterlogging",
    location: "Swaroop Nagar, Lane 3 near Company Bagh, Kanpur",
    coordinates: [26.4820, 80.3120],
    severity: "Critical",
    aiConfidence: 96,
    communityConfidence: 93,
    confirmedVotes: 58,
    disputedVotes: 2,
    status: "Under Repair",
    priority: "Critical",
    department: "Water & Sewage",
    ward: "Ward 1 - Swaroop Nagar",
    date: "2026-08-28 17:20",
    description: "Severe stormwater stagnation due to choked storm drain main line. 1.5 ft water depth blocking school access road.",
    evidenceUrl: createCivicEvidenceSvg('Waterlogging', 'Swaroop Nagar Stagnation', '2026-08-28', '#DC2626'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Waterlogging', '2026-08-30'),
    affectedArea: "120 sq. meters road junction",
    trafficImportance: "High (Residential & School Zone)",
    roadHealthScore: 54,
    timeline: [
      { step: "Reported", date: "2026-08-28 17:20", detail: "Reported anonymously by Citizen ANON-9C81F" },
      { step: "AI Detected", date: "2026-08-28 17:21", detail: "AI verified water depth & drain blockage (96% confidence)" },
      { step: "Community Verified", date: "2026-08-28 18:00", detail: "58 citizens confirmed location" },
      { step: "Forwarded", date: "2026-08-28 18:30", detail: "Dispatched Water & Sewage Jetting Truck" },
      { step: "Under Repair", date: "2026-08-29 07:00", detail: "Municipal suction crew deployed on site" }
    ]
  },
  {
    id: "CIV-2844",
    type: "Broken Streetlight",
    location: "Civil Lines, Near Bada Chauraha Flyover, Kanpur",
    coordinates: [26.4625, 80.3490],
    severity: "Medium",
    aiConfidence: 85,
    communityConfidence: 82,
    confirmedVotes: 19,
    disputedVotes: 1,
    status: "AI Verified",
    priority: "Medium",
    department: "Electrical & Lighting",
    ward: "Ward 5 - Civil Lines",
    date: "2026-08-28 21:10",
    description: "Series of 4 dark streetlight poles creating a blackout zone near pedestrian crosswalk.",
    evidenceUrl: createCivicEvidenceSvg('Broken Streetlight', 'Civil Lines Light Failure', '2026-08-28', '#D97706'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Broken Streetlight', '2026-08-30'),
    affectedArea: "80 meters road stretch",
    trafficImportance: "High (Main Night Corridor)",
    roadHealthScore: 81,
    timeline: [
      { step: "Reported", date: "2026-08-28 21:10", detail: "Reported anonymously by Citizen ANON-3D90K" },
      { step: "AI Detected", date: "2026-08-28 21:11", detail: "AI verified low-light lamp failure (85% confidence)" }
    ]
  },
  {
    id: "CIV-2843",
    type: "Road Damage",
    location: "Kakadeo Coaching Market Main Road, Kanpur",
    coordinates: [26.4730, 80.2920],
    severity: "High",
    aiConfidence: 91,
    communityConfidence: 88,
    confirmedVotes: 41,
    disputedVotes: 5,
    status: "Community Verified",
    priority: "High",
    department: "Roads & Infrastructure",
    ward: "Ward 3 - Kakadeo",
    date: "2026-08-28 14:05",
    description: "Caved-in asphalt trench around telecommunication cable excavation. Loose gravel and sharp edges.",
    evidenceUrl: createCivicEvidenceSvg('Road Damage', 'Kakadeo Trench Damage', '2026-08-28', '#EA580C'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Road Damage', '2026-08-30'),
    affectedArea: "45 sq. meters",
    trafficImportance: "High (Student & Transit Hub)",
    roadHealthScore: 42,
    timeline: [
      { step: "Reported", date: "2026-08-28 14:05", detail: "Reported anonymously by Citizen ANON-8E22P" },
      { step: "AI Detected", date: "2026-08-28 14:06", detail: "AI confirmed trench caved-in road hazard (91% confidence)" },
      { step: "Community Verified", date: "2026-08-28 15:40", detail: "41 local student & resident verifications" }
    ]
  },
  {
    id: "CIV-2842",
    type: "Damaged Sign",
    location: "Arya Nagar Crossing near Medical College, Kanpur",
    coordinates: [26.4760, 80.3200],
    severity: "Low",
    aiConfidence: 92,
    communityConfidence: 90,
    confirmedVotes: 14,
    disputedVotes: 0,
    status: "Resolved",
    priority: "Low",
    department: "Public Safety",
    ward: "Ward 1 - Swaroop Nagar",
    date: "2026-08-27 10:15",
    description: "Directional hospital signpost bent over 45 degrees blocking view of oncoming vehicles.",
    evidenceUrl: createCivicEvidenceSvg('Damaged Sign', 'Arya Nagar Signpost Bent', '2026-08-27', '#2563EB'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Damaged Sign', '2026-08-28'),
    affectedArea: "Signboard post",
    trafficImportance: "Medium",
    roadHealthScore: 88,
    timeline: [
      { step: "Reported", date: "2026-08-27 10:15", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-27 10:16", detail: "AI verified sign orientation defect (92% confidence)" },
      { step: "Community Verified", date: "2026-08-27 11:30", detail: "14 community verifications" },
      { step: "Forwarded", date: "2026-08-27 12:00", detail: "Sent to Traffic Signs Repair Team" },
      { step: "Under Repair", date: "2026-08-28 09:00", detail: "Poles realigned" },
      { step: "Resolved", date: "2026-08-28 14:00", detail: "Sign erect & verified" }
    ]
  },
  {
    id: "CIV-2841",
    type: "Fallen Tree",
    location: "Tilak Nagar Park Outer Ring Road, Kanpur",
    coordinates: [26.4850, 80.3080],
    severity: "High",
    aiConfidence: 97,
    communityConfidence: 95,
    confirmedVotes: 64,
    disputedVotes: 1,
    status: "Resolution Verified",
    priority: "High",
    department: "Sanitation & Waste",
    ward: "Ward 1 - Swaroop Nagar",
    date: "2026-08-26 16:30",
    description: "Large neem tree branch snapped off during gusty winds, partially obstructing northbound lanes.",
    evidenceUrl: createCivicEvidenceSvg('Fallen Tree', 'Tilak Nagar Fallen Branch', '2026-08-26', '#EA580C'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Fallen Tree', '2026-08-27'),
    affectedArea: "50 sq. meters lane clearance",
    trafficImportance: "Medium",
    roadHealthScore: 65,
    timeline: [
      { step: "Reported", date: "2026-08-26 16:30", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-26 16:31", detail: "AI verified fallen tree obstruction (97% confidence)" },
      { step: "Community Verified", date: "2026-08-26 17:00", detail: "64 community confirmations" },
      { step: "Forwarded", date: "2026-08-26 17:15", detail: "Horticulture quick response team dispatched" },
      { step: "Under Repair", date: "2026-08-27 08:30", detail: "Branch cleared and chopped" },
      { step: "Resolution Verification", date: "2026-08-27 10:00", detail: "AI cross-referenced clear road photo (98% match)" }
    ]
  },
  {
    id: "CIV-2840",
    type: "Pothole",
    location: "Kidwai Nagar Chauraha Signal Approach, Kanpur",
    coordinates: [26.4250, 80.3320],
    severity: "High",
    aiConfidence: 93,
    communityConfidence: 89,
    confirmedVotes: 36,
    disputedVotes: 3,
    status: "Forwarded",
    priority: "High",
    department: "Roads & Infrastructure",
    ward: "Ward 4 - Kidwai Nagar",
    date: "2026-08-29 07:50",
    description: "Multiple severe potholes near signal stopping line causing heavy braking and rear-end risk.",
    evidenceUrl: createCivicEvidenceSvg('Pothole', 'Kidwai Nagar Signal Potholes', '2026-08-29', '#EA580C'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Pothole', '2026-08-30'),
    affectedArea: "22 sq. meters",
    trafficImportance: "High (Major Junction)",
    roadHealthScore: 49,
    timeline: [
      { step: "Reported", date: "2026-08-29 07:50", detail: "Reported by ANON-1109P" },
      { step: "AI Detected", date: "2026-08-29 07:51", detail: "AI classified pothole cluster (93% confidence)" },
      { step: "Community Verified", date: "2026-08-29 09:30", detail: "36 verified" },
      { step: "Forwarded", date: "2026-08-29 10:00", detail: "Sent to South Zone PWD Division" }
    ]
  },
  {
    id: "CIV-2839",
    type: "Waterlogging",
    location: "Govind Nagar Flyover Service Lane, Kanpur",
    coordinates: [26.4380, 80.2980],
    severity: "Medium",
    aiConfidence: 88,
    communityConfidence: 85,
    confirmedVotes: 25,
    disputedVotes: 2,
    status: "AI Verified",
    priority: "Medium",
    department: "Water & Sewage",
    ward: "Ward 4 - Kidwai Nagar",
    date: "2026-08-29 10:00",
    description: "Sludge and rainwater collection under flyover pillar 14 due to blocked side drains.",
    evidenceUrl: createCivicEvidenceSvg('Waterlogging', 'Govind Nagar Service Sludge', '2026-08-29', '#D97706'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Waterlogging', '2026-08-30'),
    affectedArea: "40 sq. meters",
    trafficImportance: "Medium",
    roadHealthScore: 61,
    timeline: [
      { step: "Reported", date: "2026-08-29 10:00", detail: "Reported by ANON-9981A" },
      { step: "AI Detected", date: "2026-08-29 10:01", detail: "AI verified drainage blockage (88% confidence)" }
    ]
  },
  {
    id: "CIV-2838",
    type: "Garbage",
    location: "Chunniganj Bus Stand Gate 3, Kanpur",
    coordinates: [26.4650, 80.3380],
    severity: "High",
    aiConfidence: 95,
    communityConfidence: 92,
    confirmedVotes: 51,
    disputedVotes: 3,
    status: "Community Verified",
    priority: "High",
    department: "Sanitation & Waste",
    ward: "Ward 2 - Mall Road",
    date: "2026-08-29 06:30",
    description: "Large heap of unsegregated plastic and organic market waste spilling onto bus bay entrance.",
    evidenceUrl: createCivicEvidenceSvg('Garbage', 'Chunniganj Waste Dump', '2026-08-29', '#EA580C'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Garbage', '2026-08-30'),
    affectedArea: "60 sq. meters",
    trafficImportance: "High (Transit Terminal)",
    roadHealthScore: 50,
    timeline: [
      { step: "Reported", date: "2026-08-29 06:30", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-29 06:31", detail: "AI verified high volume waste (95% confidence)" },
      { step: "Community Verified", date: "2026-08-29 08:00", detail: "51 citizens verified" }
    ]
  },
  {
    id: "CIV-2837",
    type: "Road Damage",
    location: "Shyam Nagar Highway Service Road, Kanpur",
    coordinates: [26.4180, 80.3720],
    severity: "Critical",
    aiConfidence: 96,
    communityConfidence: 94,
    confirmedVotes: 73,
    disputedVotes: 2,
    status: "Forwarded",
    priority: "Critical",
    department: "Roads & Infrastructure",
    ward: "Ward 4 - Kidwai Nagar",
    date: "2026-08-28 19:40",
    description: "Severe bitumite erosion causing deep grooves and exposed reinforcement steel on bridge ramp.",
    evidenceUrl: createCivicEvidenceSvg('Road Damage', 'Shyam Nagar Bridge Erosion', '2026-08-28', '#DC2626'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Road Damage', '2026-08-30'),
    affectedArea: "90 sq. meters",
    trafficImportance: "Critical (Highway Access)",
    roadHealthScore: 29,
    timeline: [
      { step: "Reported", date: "2026-08-28 19:40", detail: "Reported by ANON-5431R" },
      { step: "AI Detected", date: "2026-08-28 19:41", detail: "AI flagged structural asphalt decay (96% confidence)" },
      { step: "Community Verified", date: "2026-08-28 21:00", detail: "73 confirmations" },
      { step: "Forwarded", date: "2026-08-28 21:30", detail: "Escalated to NHAI / PWD Joint Inspection" }
    ]
  },
  {
    id: "CIV-2836",
    type: "Broken Streetlight",
    location: "Kanpur Central Station Approach Road, Kanpur",
    coordinates: [26.4530, 80.3510],
    severity: "Medium",
    aiConfidence: 87,
    communityConfidence: 84,
    confirmedVotes: 22,
    disputedVotes: 1,
    status: "Under Repair",
    priority: "Medium",
    department: "Electrical & Lighting",
    ward: "Ward 5 - Civil Lines",
    date: "2026-08-27 22:15",
    description: "High-mast lighting fixture at railway station taxi stand flickering and dead transformer fuse.",
    evidenceUrl: createCivicEvidenceSvg('Broken Streetlight', 'Station Mast Light Failure', '2026-08-27', '#D97706'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Broken Streetlight', '2026-08-30'),
    affectedArea: "150 sq. meters plaza",
    trafficImportance: "High (Passenger Hub)",
    roadHealthScore: 78,
    timeline: [
      { step: "Reported", date: "2026-08-27 22:15", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-27 22:16", detail: "AI detected lighting blackout (87% confidence)" },
      { step: "Community Verified", date: "2026-08-27 23:00", detail: "22 verified" },
      { step: "Forwarded", date: "2026-08-28 09:00", detail: "Sent to Municipal Electrical Dept" },
      { step: "Under Repair", date: "2026-08-29 11:00", detail: "Electrician lift truck assigned" }
    ]
  },
  {
    id: "CIV-2835",
    type: "Pothole",
    location: "Nawabganj Ganga Barrage Road, Kanpur",
    coordinates: [26.5010, 80.3150],
    severity: "High",
    aiConfidence: 92,
    communityConfidence: 89,
    confirmedVotes: 39,
    disputedVotes: 2,
    status: "AI Verified",
    priority: "High",
    department: "Roads & Infrastructure",
    ward: "Ward 1 - Swaroop Nagar",
    date: "2026-08-29 08:10",
    description: "Consecutive potholes along scenic barrage road causing heavy swerving into oncoming traffic.",
    evidenceUrl: createCivicEvidenceSvg('Pothole', 'Ganga Barrage Road Pothole', '2026-08-29', '#EA580C'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Pothole', '2026-08-30'),
    affectedArea: "50 sq. meters",
    trafficImportance: "High (Commuter Arterial)",
    roadHealthScore: 45,
    timeline: [
      { step: "Reported", date: "2026-08-29 08:10", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-29 08:11", detail: "AI verified multiple surface depressions (92% confidence)" }
    ]
  },
  {
    id: "CIV-2834",
    type: "Garbage",
    location: "Panki Industrial Area Site 1 Main Gate, Kanpur",
    coordinates: [26.4690, 80.2350],
    severity: "Medium",
    aiConfidence: 86,
    communityConfidence: 83,
    confirmedVotes: 17,
    disputedVotes: 1,
    status: "Reported",
    priority: "Medium",
    department: "Sanitation & Waste",
    ward: "Ward 3 - Kakadeo",
    date: "2026-08-29 11:00",
    description: "Industrial packing debris and chemical cardboard cartons dumped along roadside drain.",
    evidenceUrl: createCivicEvidenceSvg('Garbage', 'Panki Industrial Waste', '2026-08-29', '#D97706'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Garbage', '2026-08-30'),
    affectedArea: "30 sq. meters",
    trafficImportance: "Low (Industrial Freight Lane)",
    roadHealthScore: 68,
    timeline: [
      { step: "Reported", date: "2026-08-29 11:00", detail: "Reported anonymously by Citizen ANON-2089C" }
    ]
  },
  {
    id: "CIV-2833",
    type: "Waterlogging",
    location: "Kalyanpur Main Market Railway Crossing, Kanpur",
    coordinates: [26.4980, 80.2620],
    severity: "Critical",
    aiConfidence: 95,
    communityConfidence: 92,
    confirmedVotes: 61,
    disputedVotes: 3,
    status: "Forwarded",
    priority: "Critical",
    department: "Water & Sewage",
    ward: "Ward 3 - Kakadeo",
    date: "2026-08-28 15:45",
    description: "Deep water pool trapped under railway underpass disrupting market access and commuter rickshaws.",
    evidenceUrl: createCivicEvidenceSvg('Waterlogging', 'Kalyanpur Railway Underpass Water', '2026-08-28', '#DC2626'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Waterlogging', '2026-08-30'),
    affectedArea: "110 sq. meters",
    trafficImportance: "Critical (Suburban Railway Link)",
    roadHealthScore: 31,
    timeline: [
      { step: "Reported", date: "2026-08-28 15:45", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-28 15:46", detail: "AI calculated sub-surface water depth (95% confidence)" },
      { step: "Community Verified", date: "2026-08-28 17:00", detail: "61 citizens verified" },
      { step: "Forwarded", date: "2026-08-28 17:30", detail: "Forwarded to Railway-Municipal Drainage Committee" }
    ]
  },
  {
    id: "CIV-2832",
    type: "Damaged Sign",
    location: "Juhi Bridge Underpass, Kanpur",
    coordinates: [26.4310, 80.3180],
    severity: "Low",
    aiConfidence: 89,
    communityConfidence: 86,
    confirmedVotes: 12,
    disputedVotes: 0,
    status: "Resolved",
    priority: "Low",
    department: "Public Safety",
    ward: "Ward 4 - Kidwai Nagar",
    date: "2026-08-25 11:20",
    description: "Height restriction clearance sign hanging precariously by one bolt.",
    evidenceUrl: createCivicEvidenceSvg('Damaged Sign', 'Juhi Bridge Sign Hanging', '2026-08-25', '#2563EB'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Damaged Sign', '2026-08-26'),
    affectedArea: "Underpass Sign",
    trafficImportance: "Medium",
    roadHealthScore: 84,
    timeline: [
      { step: "Reported", date: "2026-08-25 11:20", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-25 11:21", detail: "AI verified hazard (89% confidence)" },
      { step: "Community Verified", date: "2026-08-25 12:30", detail: "12 verified" },
      { step: "Forwarded", date: "2026-08-25 13:00", detail: "Sent to Maintenance" },
      { step: "Resolved", date: "2026-08-26 15:00", detail: "Bolts secured & aligned" }
    ]
  },
  {
    id: "CIV-2831",
    type: "Pothole",
    location: "Saket Nagar Lane 4, Kanpur",
    coordinates: [26.4290, 80.3260],
    severity: "Medium",
    aiConfidence: 90,
    communityConfidence: 87,
    confirmedVotes: 21,
    disputedVotes: 1,
    status: "AI Verified",
    priority: "Medium",
    department: "Roads & Infrastructure",
    ward: "Ward 4 - Kidwai Nagar",
    date: "2026-08-29 05:40",
    description: "Sunken sewer manhole ring causing sharp bump for cars.",
    evidenceUrl: createCivicEvidenceSvg('Pothole', 'Saket Nagar Sunken Manhole', '2026-08-29', '#D97706'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Pothole', '2026-08-30'),
    affectedArea: "8 sq. meters",
    trafficImportance: "Low (Residential Street)",
    roadHealthScore: 70,
    timeline: [
      { step: "Reported", date: "2026-08-29 05:40", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-29 05:41", detail: "AI classified manhole rim depress (90% confidence)" }
    ]
  },
  {
    id: "CIV-2830",
    type: "Road Damage",
    location: "Sharda Nagar Crossing near Metro Pillar 188, Kanpur",
    coordinates: [26.4890, 80.2850],
    severity: "High",
    aiConfidence: 94,
    communityConfidence: 90,
    confirmedVotes: 44,
    disputedVotes: 2,
    status: "Community Verified",
    priority: "High",
    department: "Roads & Infrastructure",
    ward: "Ward 3 - Kakadeo",
    date: "2026-08-28 12:15",
    description: "Crumbled asphalt edge around metro pillar base creating unsafe lane narrowing.",
    evidenceUrl: createCivicEvidenceSvg('Road Damage', 'Sharda Nagar Metro Pillar Road', '2026-08-28', '#EA580C'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Road Damage', '2026-08-30'),
    affectedArea: "38 sq. meters",
    trafficImportance: "High (Metro Corridor)",
    roadHealthScore: 52,
    timeline: [
      { step: "Reported", date: "2026-08-28 12:15", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-28 12:16", detail: "AI detected pavement edge breakdown (94% confidence)" },
      { step: "Community Verified", date: "2026-08-28 14:00", detail: "44 verified" }
    ]
  },
  {
    id: "CIV-2829",
    type: "Broken Streetlight",
    location: "Barra 2 Bypass Service Road, Kanpur",
    coordinates: [26.4150, 80.3010],
    severity: "Medium",
    aiConfidence: 86,
    communityConfidence: 83,
    confirmedVotes: 18,
    disputedVotes: 2,
    status: "Forwarded",
    priority: "Medium",
    department: "Electrical & Lighting",
    ward: "Ward 4 - Kidwai Nagar",
    date: "2026-08-27 20:30",
    description: "Broken glass shade and exposed wiring on electric pole 24.",
    evidenceUrl: createCivicEvidenceSvg('Broken Streetlight', 'Barra 2 Exposed Wiring', '2026-08-27', '#D97706'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Broken Streetlight', '2026-08-30'),
    affectedArea: "Single pole fixture",
    trafficImportance: "Medium",
    roadHealthScore: 75,
    timeline: [
      { step: "Reported", date: "2026-08-27 20:30", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-27 20:31", detail: "AI detected electrical hazard (86% confidence)" },
      { step: "Community Verified", date: "2026-08-27 21:40", detail: "18 verified" },
      { step: "Forwarded", date: "2026-08-28 09:30", detail: "Sent to KESC / Municipal Electric" }
    ]
  },
  {
    id: "CIV-2828",
    type: "Garbage",
    location: "Yashoda Nagar Highway Underpass, Kanpur",
    coordinates: [26.4020, 80.3550],
    severity: "High",
    aiConfidence: 91,
    communityConfidence: 88,
    confirmedVotes: 33,
    disputedVotes: 2,
    status: "AI Verified",
    priority: "High",
    department: "Sanitation & Waste",
    ward: "Ward 4 - Kidwai Nagar",
    date: "2026-08-29 09:50",
    description: "Illegal dumping of vegetable vendor biomass blocking stormwater gutter.",
    evidenceUrl: createCivicEvidenceSvg('Garbage', 'Yashoda Nagar Dump', '2026-08-29', '#EA580C'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Garbage', '2026-08-30'),
    affectedArea: "25 sq. meters gutter area",
    trafficImportance: "Medium",
    roadHealthScore: 63,
    timeline: [
      { step: "Reported", date: "2026-08-29 09:50", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-29 09:51", detail: "AI classified biomass dump (91% confidence)" }
    ]
  },
  {
    id: "CIV-2827",
    type: "Pothole",
    location: "Jajmau Flyover Service Road, Kanpur",
    coordinates: [26.4380, 80.4020],
    severity: "Critical",
    aiConfidence: 97,
    communityConfidence: 95,
    confirmedVotes: 82,
    disputedVotes: 3,
    status: "Under Repair",
    priority: "Critical",
    department: "Roads & Infrastructure",
    ward: "Ward 2 - Mall Road",
    date: "2026-08-26 14:10",
    description: "Crater-sized pothole on heavy truck freight route causing multiple tire punctures.",
    evidenceUrl: createCivicEvidenceSvg('Pothole', 'Jajmau Freight Crater', '2026-08-26', '#DC2626'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Pothole', '2026-08-30'),
    affectedArea: "55 sq. meters",
    trafficImportance: "Critical (Leather Hub Freight Route)",
    roadHealthScore: 24,
    timeline: [
      { step: "Reported", date: "2026-08-26 14:10", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-26 14:11", detail: "AI flagged critical crater (97% confidence)" },
      { step: "Community Verified", date: "2026-08-26 15:30", detail: "82 verifications" },
      { step: "Forwarded", date: "2026-08-26 16:00", detail: "Escalated to Heavy Paving Crew" },
      { step: "Under Repair", date: "2026-08-27 10:00", detail: "Cold mix asphalt patching underway" }
    ]
  },
  {
    id: "CIV-2826",
    type: "Fallen Tree",
    location: "Vijay Nagar Chauraha near Petrol Pump, Kanpur",
    coordinates: [26.4600, 80.2880],
    severity: "Medium",
    aiConfidence: 94,
    communityConfidence: 91,
    confirmedVotes: 29,
    disputedVotes: 1,
    status: "Resolved",
    priority: "Medium",
    department: "Sanitation & Waste",
    ward: "Ward 3 - Kakadeo",
    date: "2026-08-24 18:00",
    description: "Fallen banyan tree limb leaning over electric power cable.",
    evidenceUrl: createCivicEvidenceSvg('Fallen Tree', 'Vijay Nagar Banyan Limb', '2026-08-24', '#D97706'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Fallen Tree', '2026-08-25'),
    affectedArea: "Tree Limb",
    trafficImportance: "Medium",
    roadHealthScore: 79,
    timeline: [
      { step: "Reported", date: "2026-08-24 18:00", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-24 18:01", detail: "AI verified hazard (94% confidence)" },
      { step: "Community Verified", date: "2026-08-24 19:00", detail: "29 verified" },
      { step: "Resolved", date: "2026-08-25 11:00", detail: "Limbs safely trimmed" }
    ]
  },
  {
    id: "CIV-2825",
    type: "Waterlogging",
    location: "Armapur Estate Gate 1 Road, Kanpur",
    coordinates: [26.4520, 80.2580],
    severity: "High",
    aiConfidence: 90,
    communityConfidence: 87,
    confirmedVotes: 27,
    disputedVotes: 2,
    status: "Forwarded",
    priority: "High",
    department: "Water & Sewage",
    ward: "Ward 3 - Kakadeo",
    date: "2026-08-28 08:30",
    description: "Sewer line overflow flooding estate entry road with foul water.",
    evidenceUrl: createCivicEvidenceSvg('Waterlogging', 'Armapur Sewer Overflow', '2026-08-28', '#EA580C'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Waterlogging', '2026-08-30'),
    affectedArea: "70 sq. meters",
    trafficImportance: "Medium",
    roadHealthScore: 48,
    timeline: [
      { step: "Reported", date: "2026-08-28 08:30", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-28 08:31", detail: "AI verified sewer overflow (90% confidence)" },
      { step: "Community Verified", date: "2026-08-28 10:00", detail: "27 verified" },
      { step: "Forwarded", date: "2026-08-28 10:30", detail: "Jal Sansthan team alerted" }
    ]
  },
  {
    id: "CIV-2824",
    type: "Pothole",
    location: "Cantonment Parade Ground Gate 4 Road, Kanpur",
    coordinates: [26.4550, 80.3680],
    severity: "Low",
    aiConfidence: 88,
    communityConfidence: 85,
    confirmedVotes: 15,
    disputedVotes: 1,
    status: "AI Verified",
    priority: "Low",
    department: "Roads & Infrastructure",
    ward: "Ward 5 - Civil Lines",
    date: "2026-08-29 11:30",
    description: "Shallow pothole cluster along green belt walking path.",
    evidenceUrl: createCivicEvidenceSvg('Pothole', 'Cantonment Walking Pothole', '2026-08-29', '#2563EB'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Pothole', '2026-08-30'),
    affectedArea: "6 sq. meters",
    trafficImportance: "Low",
    roadHealthScore: 86,
    timeline: [
      { step: "Reported", date: "2026-08-29 11:30", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-29 11:31", detail: "AI detected low-severity wear (88% confidence)" }
    ]
  },
  {
    id: "CIV-2823",
    type: "Road Damage",
    location: "Shastri Nagar Water Works Road, Kanpur",
    coordinates: [26.4710, 80.3050],
    severity: "High",
    aiConfidence: 93,
    communityConfidence: 90,
    confirmedVotes: 38,
    disputedVotes: 2,
    status: "Community Verified",
    priority: "High",
    department: "Roads & Infrastructure",
    ward: "Ward 1 - Swaroop Nagar",
    date: "2026-08-28 16:20",
    description: "Deep longitudinal cracking following water pipe trench work.",
    evidenceUrl: createCivicEvidenceSvg('Road Damage', 'Shastri Nagar Longitudinal Crack', '2026-08-28', '#EA580C'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Road Damage', '2026-08-30'),
    affectedArea: "65 sq. meters",
    trafficImportance: "Medium",
    roadHealthScore: 56,
    timeline: [
      { step: "Reported", date: "2026-08-28 16:20", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-28 16:21", detail: "AI verified trench settlement (93% confidence)" },
      { step: "Community Verified", date: "2026-08-28 18:00", detail: "38 verified" }
    ]
  },
  {
    id: "CIV-2822",
    type: "Broken Streetlight",
    location: "Geeta Nagar Metro Station Exit 2, Kanpur",
    coordinates: [26.4810, 80.2950],
    severity: "High",
    aiConfidence: 91,
    communityConfidence: 89,
    confirmedVotes: 42,
    disputedVotes: 1,
    status: "Forwarded",
    priority: "High",
    department: "Electrical & Lighting",
    ward: "Ward 3 - Kakadeo",
    date: "2026-08-28 20:00",
    description: "Dark pedestrian pathway from metro exit to main road due to 3 non-functional LED fixtures.",
    evidenceUrl: createCivicEvidenceSvg('Broken Streetlight', 'Geeta Nagar Metro Pathway Dark', '2026-08-28', '#EA580C'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Broken Streetlight', '2026-08-30'),
    affectedArea: "60 meters path",
    trafficImportance: "High (Metro Commuter Path)",
    roadHealthScore: 74,
    timeline: [
      { step: "Reported", date: "2026-08-28 20:00", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-28 20:01", detail: "AI flagged lighting gap (91% confidence)" },
      { step: "Community Verified", date: "2026-08-28 21:00", detail: "42 verified" },
      { step: "Forwarded", date: "2026-08-29 08:30", detail: "Sent to Metro-Municipal Joint Ops" }
    ]
  },
  {
    id: "CIV-2821",
    type: "Waterlogging",
    location: "Vishnupuri Drainage Corridor, Kanpur",
    coordinates: [26.4870, 80.3010],
    severity: "Medium",
    aiConfidence: 87,
    communityConfidence: 84,
    confirmedVotes: 20,
    disputedVotes: 2,
    status: "AI Verified",
    priority: "Medium",
    department: "Water & Sewage",
    ward: "Ward 1 - Swaroop Nagar",
    date: "2026-08-29 06:15",
    description: "Water stagnation in open storm canal bank causing mosquito breeding concern.",
    evidenceUrl: createCivicEvidenceSvg('Waterlogging', 'Vishnupuri Canal Stagnation', '2026-08-29', '#D97706'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Waterlogging', '2026-08-30'),
    affectedArea: "50 sq. meters canal rim",
    trafficImportance: "Low",
    roadHealthScore: 69,
    timeline: [
      { step: "Reported", date: "2026-08-29 06:15", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-29 06:16", detail: "AI verified standing water (87% confidence)" }
    ]
  },
  {
    id: "CIV-2820",
    type: "Garbage",
    location: "Lakhanpur Technology Park Gate 2, Kanpur",
    coordinates: [26.4950, 80.2780],
    severity: "Low",
    aiConfidence: 90,
    communityConfidence: 86,
    confirmedVotes: 16,
    disputedVotes: 0,
    status: "Resolved",
    priority: "Low",
    department: "Sanitation & Waste",
    ward: "Ward 3 - Kakadeo",
    date: "2026-08-26 09:00",
    description: "Discarded construction timber and cement sacks on verge.",
    evidenceUrl: createCivicEvidenceSvg('Garbage', 'Lakhanpur Tech Park Timber', '2026-08-26', '#2563EB'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Garbage', '2026-08-27'),
    affectedArea: "15 sq. meters",
    trafficImportance: "Low",
    roadHealthScore: 92,
    timeline: [
      { step: "Reported", date: "2026-08-26 09:00", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-26 09:01", detail: "AI verified construction waste (90% confidence)" },
      { step: "Resolved", date: "2026-08-27 12:00", detail: "Debris cleared by contractor" }
    ]
  },
  {
    id: "CIV-2819",
    type: "Pothole",
    location: "Tatmill Chauraha Freight Turning, Kanpur",
    coordinates: [26.4480, 80.3560],
    severity: "Critical",
    aiConfidence: 96,
    communityConfidence: 93,
    confirmedVotes: 69,
    disputedVotes: 3,
    status: "Forwarded",
    priority: "Critical",
    department: "Roads & Infrastructure",
    ward: "Ward 5 - Civil Lines",
    date: "2026-08-28 18:50",
    description: "Deep rutting and double pothole at heavy truck turning radius. Risk of container rollover.",
    evidenceUrl: createCivicEvidenceSvg('Pothole', 'Tatmill Chauraha Rutting', '2026-08-28', '#DC2626'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Pothole', '2026-08-30'),
    affectedArea: "75 sq. meters",
    trafficImportance: "Critical (Major Industrial Transport Hub)",
    roadHealthScore: 28,
    timeline: [
      { step: "Reported", date: "2026-08-28 18:50", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-28 18:51", detail: "AI flagged critical freight turning hazard (96% confidence)" },
      { step: "Community Verified", date: "2026-08-28 20:00", detail: "69 verified" },
      { step: "Forwarded", date: "2026-08-28 20:30", detail: "Assigned for Emergency Asphalt Repair" }
    ]
  },
  {
    id: "CIV-2818",
    type: "Damaged Sign",
    location: "Ghantaghar Market Inner Lane, Kanpur",
    coordinates: [26.4580, 80.3450],
    severity: "Medium",
    aiConfidence: 87,
    communityConfidence: 84,
    confirmedVotes: 23,
    disputedVotes: 2,
    status: "AI Verified",
    priority: "Medium",
    department: "Public Safety",
    ward: "Ward 2 - Mall Road",
    date: "2026-08-29 07:10",
    description: "One-way traffic board spraypainted with graffiti and defaced.",
    evidenceUrl: createCivicEvidenceSvg('Damaged Sign', 'Ghantaghar Graffiti Sign', '2026-08-29', '#D97706'),
    resolutionEvidenceUrl: createResolvedEvidenceSvg('Damaged Sign', '2026-08-30'),
    affectedArea: "Signboard face",
    trafficImportance: "Medium",
    roadHealthScore: 77,
    timeline: [
      { step: "Reported", date: "2026-08-29 07:10", detail: "Reported anonymously" },
      { step: "AI Detected", date: "2026-08-29 07:11", detail: "AI verified defacement (87% confidence)" }
    ]
  }
];

export const CITY_STATS = {
  totalIssuesDetected: 1284,
  communityVerifications: 3842,
  issuesResolved: 742,
  verificationConfidence: "91%",
  cityHealthScore: 68,
  wards: [
    { name: "Ward 1 - Swaroop Nagar", health: 82, activeIssues: 6, totalResolved: 210 },
    { name: "Ward 2 - Mall Road", health: 64, activeIssues: 8, totalResolved: 185 },
    { name: "Ward 3 - Kakadeo", health: 51, activeIssues: 11, totalResolved: 142 },
    { name: "Ward 4 - Kidwai Nagar", health: 76, activeIssues: 5, totalResolved: 205 }
  ],
  roadHealthCorridors: [
    { corridor: "GT Road Arterial", score: 38, status: "Critical Attention" },
    { corridor: "Mall Road Commercial", score: 72, status: "Moderate" },
    { corridor: "Swaroop Nagar Corridor", score: 54, status: "Needs Inspection" },
    { corridor: "Civil Lines Trunk", score: 81, status: "Good" }
  ]
};
