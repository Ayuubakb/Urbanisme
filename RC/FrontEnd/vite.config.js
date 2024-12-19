import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,           // Allow access from the network
    port: 5173,           // Ensure this matches EXPOSE in Dockerfile
    strictPort: true,
    watch: {
      usePolling: true,  // Fix for some Docker environments
    },
  },
})