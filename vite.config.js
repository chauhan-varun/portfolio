import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable minification and tree-shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Generate chunk size warnings at 500kb
    chunkSizeWarningLimit: 500,
    // Split chunks more aggressively for better code-splitting
    rollupOptions: {
      output: {
        // More granular code splitting for better performance
        manualChunks: (id) => {
          // React core libraries
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'vendor';
          }
          
          // Framer Motion
          if (id.includes('node_modules/framer-motion')) {
            return 'animations';
          }
          
          // React Icons - split by icon set to create smaller chunks
          if (id.includes('node_modules/react-icons')) {
            if (id.includes('/fa/')) return 'icons-fa';
            if (id.includes('/si/')) return 'icons-si';
            if (id.includes('/bi/')) return 'icons-bi';
            if (id.includes('/fi/')) return 'icons-fi';
            if (id.includes('/go/')) return 'icons-go';
            return 'icons';
          }
          
          // Three.js core and related packages - split into smaller chunks
          if (id.includes('node_modules/three/')) {
            // Split Three.js into core and extras
            if (id.includes('/examples/') || id.includes('/addons/')) {
              return 'three-extras';
            }
            return 'three-core';
          }
          
          // React Three Fiber and Drei - split separately
          if (id.includes('node_modules/@react-three/fiber')) {
            return 'three-fiber';
          }
          
          if (id.includes('node_modules/@react-three/drei')) {
            return 'three-drei';
          }
        },
        // Improve chunk naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        // Generate smaller entry chunks
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  // Enable source map compression for production builds
  css: {
    devSourcemap: false,
  },
  // Optimize server performance
  server: {
    hmr: {
      overlay: true,
    },
  },
})
