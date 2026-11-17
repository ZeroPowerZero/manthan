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
          bg: '#000000',              // Jet Black Sky
          surface: '#080808',         // Deep obsidian surface
          card: '#0D0D0D',            // High-contrast jet black card
          border: 'rgba(250, 204, 21, 0.15)',
          'border-light': 'rgba(250, 204, 21, 0.3)',
          primary: '#FACC15',         // Bold Warm Yellow
          'primary-hover': '#EAB308',  // Rich Golden Yellow
          yellow: '#FACC15',          // Signature Warm Yellow
          gold: '#FDE047',            // Radiant Starlight
          'warm-white': '#FFFDF5',    // Stellar Warm White
        },
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Outfit"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"Space Grotesk"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
