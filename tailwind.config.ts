import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        foreground: '#e2e8f0',
        muted: '#94a3b8',
        primary: {
          DEFAULT: '#22c55e',
          foreground: '#052e16'
        },
        card: '#111827',
        border: '#1f2937',
        input: '#111827'
      },
      borderRadius: {
        lg: '12px',
        md: '10px',
        sm: '8px'
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(34,197,94,0.0)' },
          '50%': { boxShadow: '0 0 24px rgba(34,197,94,0.25)' }
        }
      },
      animation: {
        glow: 'glow 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
} satisfies Config
