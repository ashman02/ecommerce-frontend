import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    proxy : {
      '/api/v1' : 'https://chobarcart-api.onrender.com/api/v1/'
      // '/api/v1' : 'http://localhost:8000'
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
