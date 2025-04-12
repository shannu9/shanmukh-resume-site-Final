// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // ✅ this should be here if you have a public folder
  build: {
    outDir: 'dist', // ✅ optional, but good to ensure
  },
});
