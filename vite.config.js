import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor libraries into their own chunk
          if (id.includes('node_modules')) {
            return 'vendor'; // All node_modules will go into a separate chunk
          }
          // You can add more conditions to create other chunks based on your needs
          if (id.includes('src/components')) {
            return 'components'; // Separate components into their own chunk
          }
          if (id.includes('src/utils')) {
            return 'utils'; 
          }
        }
      }
    },
    chunkSizeWarningLimit: 600 
  }
});