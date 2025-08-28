import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages altında yayın: https://aysel-sunduk.github.io/Portfolio/
  // Repo adı: Portfolio
  base: "/Portfolio/",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
