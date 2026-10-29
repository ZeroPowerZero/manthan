import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'animation-vendor': ['gsap', 'lenis', 'framer-motion'],
          'ui-vendor': ['lucide-react', 'zustand', 'canvas-confetti'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
