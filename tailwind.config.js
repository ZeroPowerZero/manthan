/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#0A0B1E',              // Deep Cosmic Midnight Indigo (exact logo canvas)
          surface: '#0F112B',         // Deep celestial surface
          card: '#141738',            // Soft midnight card layer
          border: 'rgba(255, 255, 255, 0.07)',
          'border-light': 'rgba(255, 255, 255, 0.12)',
          primary: '#F59E0B',         // Radiant Star Gold / Amber
          'primary-hover': '#FBBF24',
          champagne: '#EDD8BD',       // Logo Wordmark Warm Champagne Sand
          cyan: '#22D3EE',            // Swirling Azure Arc
          teal: '#06B6D4',
          violet: '#818CF8',          // Swirling Cosmic Indigo / Violet Arc
          purple: '#A855F7',
          gold: '#FDE68A',            // Golden Starlight
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
