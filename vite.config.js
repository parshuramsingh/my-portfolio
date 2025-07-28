// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'], // this is good, keep it
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // this is also okay
  },
  build: {
    chunkSizeWarningLimit: 800,
    // ❌ REMOVE manualChunks — it's causing production React loading issues
  },
})
