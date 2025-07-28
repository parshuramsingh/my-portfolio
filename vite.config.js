import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'], // prevent duplicate versions
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // ensure these are optimized
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react'
            if (id.includes('lottie')) return 'lottie'
            return 'vendor'
          }
        },
      },
    },
  },
})
