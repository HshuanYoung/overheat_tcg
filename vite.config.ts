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
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) {
              if (id.includes('/src/scripts/') || id.includes('\\src\\scripts\\')) {
                const fileName = path.basename(id);
                if (fileName === 'BaseUtil.ts') return 'game-engine';
                const prefix = fileName.slice(0, 3);
                if (/^\d{3}$/.test(prefix)) return `card-scripts-${prefix}`;
                return 'card-scripts-misc';
              }
              if (id.includes('/src/services/') || id.includes('\\src\\services\\')) return undefined;
              return undefined;
            }

            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('socket.io-client') || id.includes('engine.io-client') || id.includes('engine.io-parser')) {
              return 'vendor-socket';
            }
            if (id.includes('motion')) return 'vendor-motion';
            if (id.includes('lucide-react')) return 'vendor-icons';
            return 'vendor';
          },
        },
      },
    },
    server: {
      allowedHosts: ['hsyoung.icu', 'www.hsyoung.icu', 'frp-all.com'],
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
        host: 'hsyoung.icu',
      } : false,
    },
  };
});
