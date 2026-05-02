import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/logs': {
        target: 'http://20.207.122.201',
        changeOrigin: true,
        secure: false,
        rewrite: (path) =>
          path.replace('/logs', '/evaluation-service/logs'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            if (req.headers.authorization) {
              proxyReq.setHeader('Authorization', req.headers.authorization)
            }
          })
        },
      },

      '/notifications': {
        target: 'http://20.207.122.201',
        changeOrigin: true,
        secure: false,
        rewrite: (path) =>
          path.replace(
            '/notifications',
            '/evaluation-service/notifications'
          ),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            if (req.headers.authorization) {
              proxyReq.setHeader('Authorization', req.headers.authorization)
            }
          })
        },
      },
    },
  },
})