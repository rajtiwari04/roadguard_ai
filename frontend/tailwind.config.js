/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FBF9F5',
          subtle: '#F4F1EA',
          muted: '#EAE7DF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F7F6F2',
          active: '#EFECE4',
          accent: '#FAF8F3',
        },
        charcoal: {
          DEFAULT: '#1C1D1F',
          muted: '#525660',
          subtle: '#8C9099',
          faint: '#D2D4DA',
        },
        civic: {
          DEFAULT: '#1D4ED8', // Refrained Indigo/Civic blue
          light: '#EFF6FF',
          border: '#BFDBFE',
          dark: '#1E40AF',
        },
        severity: {
          critical: '#DC2626',
          criticalBg: '#FEF2F2',
          criticalBorder: '#FECACA',
          high: '#EA580C',
          highBg: '#FFF7ED',
          highBorder: '#FFEDD5',
          medium: '#D97706',
          mediumBg: '#FFFBEB',
          mediumBorder: '#FDE68A',
          low: '#2563EB',
          lowBg: '#EFF6FF',
          lowBorder: '#BFDBFE',
        },
        status: {
          verified: '#15803D',
          verifiedBg: '#F0FDF4',
          verifiedBorder: '#BBF7D0',
          pending: '#D97706',
          pendingBg: '#FFFBEB',
          repair: '#6366F1',
          repairBg: '#EEF2FF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      borderRadius: {
        'subtle': '6px',
        'card': '10px',
        'modal': '14px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'float': '0 4px 16px -2px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'modal': '0 12px 32px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
