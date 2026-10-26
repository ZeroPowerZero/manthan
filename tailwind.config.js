/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#17141F',
          darker: '#0E0C13',
          card: '#1F1B2B',
          surface: '#1B1724',
          border: 'rgba(216, 197, 245, 0.12)',
        },
        lavender: {
          DEFAULT: '#D8C5F5',
          light: '#ECE2FA',
          muted: '#B09BD4',
          glow: 'rgba(216, 197, 245, 0.35)',
        },
        ivory: {
          DEFAULT: '#F2E9DB',
          muted: '#C8BEAE',
          dim: '#9E9484',
        },
        burgundy: {
          DEFAULT: '#6E263D',
          dark: '#481827',
          light: '#8E3250',
          muted: 'rgba(110, 38, 61, 0.4)',
        },
        // Iridescent Accents
        holo: {
          indigo: '#2B2A6B',
          magenta: '#C13DD6',
          cyan: '#4FD8E8',
          gold: '#F2B84B',
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'iridescent-linear': 'linear-gradient(135deg, #C13DD6 0%, #4FD8E8 50%, #F2B84B 100%)',
        'iridescent-soft': 'linear-gradient(135deg, rgba(193, 61, 214, 0.2) 0%, rgba(79, 216, 232, 0.2) 50%, rgba(242, 184, 75, 0.2) 100%)',
        'radial-glow': 'radial-gradient(circle at center, rgba(79, 216, 232, 0.15) 0%, rgba(193, 61, 214, 0.08) 45%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
