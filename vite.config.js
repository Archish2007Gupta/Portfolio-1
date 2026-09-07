import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env files so we can read VITE_API_BASE_URL during config resolution
  const env = loadEnv(mode, process.cwd(), '')

  // In development: proxy /api to the local Express backend (localhost:5000).
  // In production: VITE_API_BASE_URL is set (e.g. Railway URL).
  //   The frontend calls that URL directly — no proxy needed.
  const isDev = mode === 'development' || !env.VITE_API_BASE_URL

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      open: false,
      proxy: isDev
        ? {
            '/api': {
              target: 'http://localhost:5000',
              changeOrigin: true
            }
          }
        : {}
    }
  }
})
