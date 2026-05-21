import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'motion/react'],
      exclude: ['framer-motion'],
    },
    server: {
      allowedHosts: ['hsyoung.com', 'www.hsyoung.com', 'frp-all.com'],
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
        '/socket.io': {
          target: 'http://localhost:3001',
          ws: true,
          changeOrigin: true,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              // Silent proxy errors which are common during dev restarts
            });
            proxy.on('proxyReqWs', (proxyReq, req, socket, options, head) => {
              socket.on('error', (err) => {
                // Silent socket errors to prevent terminal noise
              });
            });
          },
        },
      },
      hmr: process.env.DISABLE_HMR !== 'true' ? {
        host: 'hsyoung.com',
      } : false,
    },
  };
});
