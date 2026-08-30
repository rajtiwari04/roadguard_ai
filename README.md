# NagarSetu — See it. Verify it. Fix it.

NagarSetu is a modern civic-tech platform for transparent, crowdsourced issue reporting, verification, and resolution tracking.

---

## 📁 Repository Architecture

This repository is structured for a decoupled full-stack architecture:

```
/
├── frontend/             # Dedicated React / Vite Frontend application
│   ├── src/              # Application components, context, pages, & mock data
│   │   ├── components/   # UI components (common, layout, map)
│   │   ├── context/      # React context (CivicContext)
│   │   ├── data/         # Mock data & persistence defaults
│   │   └── pages/        # Route pages
│   ├── public/           # Static assets (favicons, public images)
│   ├── package.json      # Frontend package configuration & dependencies
│   ├── vite.config.js    # Vite build & server configuration
│   ├── tailwind.config.js# Tailwind CSS styling configuration
│   └── postcss.config.js # PostCSS configuration
│
├── backend/              # Dedicated Backend service (Future architecture)
│
├── package.json          # Root convenience script runner (delegates to frontend)
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Running the Frontend

Navigate to the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

Alternatively, from the repository root:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Building for Production

To generate production build artifacts (`/frontend/dist`):

```bash
cd frontend
npm run build
```

Or from the root directory:

```bash
npm run build
```

---

## 💡 Features Preserved & Covered

- **Anonymous Issue Reporting**: Seamless reporting without login barriers.
- **Civic Issue Taxonomy**: Potholes, Garbage, Waterlogging, Damaged Signs, Fallen Trees.
- **Interactive Map**: Leaflet map integration with custom markers and filters.
- **Community Verification**: Crowd-backed verification system.
- **Authority Dashboard**: Management view for civic authorities and status workflow.
- **Offline & LocalStorage Persistence**: Resilient local-first state handling.
