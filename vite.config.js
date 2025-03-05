import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://final-se-obackend.vercel.app', // Proxy requests from /api to backend server
    },
  },
  plugins: [react()],
})
