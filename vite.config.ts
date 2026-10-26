import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'postprocessing-vendor': ['@react-three/postprocessing', 'postprocessing'],
          'animation-vendor': ['gsap', 'lenis', 'framer-motion'],
          'ui-vendor': ['lucide-react', 'zustand', 'canvas-confetti'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
