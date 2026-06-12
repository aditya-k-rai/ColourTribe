import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Warn only for chunks > 600KB
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting — reduces initial bundle size (Core Web Vitals)
        manualChunks(id) {
          // Vendor: React ecosystem
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
          // Vendor: Framer Motion (large — ~25KB gzipped)
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
          // Vendor: Firebase (large — split from main)
          if (id.includes('node_modules/firebase') || id.includes('node_modules/@firebase')) {
            return 'vendor-firebase';
          }
          // Vendor: Zustand state management
          if (id.includes('node_modules/zustand')) {
            return 'vendor-zustand';
          }
          // Vendor: Lucide icons
          if (id.includes('node_modules/lucide')) {
            return 'vendor-icons';
          }
          // Vendor: Everything else from node_modules
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
      },
    },
  },
})
