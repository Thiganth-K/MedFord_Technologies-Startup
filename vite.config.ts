import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
      ,
      // Dev server proxy: forward /api requests to the backend server (default port 3000)
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, '/api')
          }
        }
      }
    };
});
