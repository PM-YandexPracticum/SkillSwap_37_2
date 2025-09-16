import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr() // это для иконок-компонентов
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@store': path.resolve(__dirname, 'src/services/store')
    }
  }

});
