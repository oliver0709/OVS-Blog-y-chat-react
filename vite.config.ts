import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      util: "rollup-plugin-polyfill-node/polyfills/util",
      global: "rollup-plugin-polyfill-node/polyfills/global",
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill(), // Polyfills para Node.js
        nodePolyfills(), // Otro conjunto de polyfills que incluye "global" y otros módulos de Node.js
      ],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // Añadimos soporte para "global" en el navegador
      },
    },
  },
});
