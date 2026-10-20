import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from /geokurs/. Override with BASE=/ for other hosts.
export default defineConfig({
  base: process.env.BASE ?? '/geokurs/',
  plugins: [react()],
});
