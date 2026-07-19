import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/@firebase/") || id.includes("/node_modules/firebase/")) {
            return "firebase";
          }
          if (id.includes("/node_modules/@stripe/") || id.includes("/node_modules/@stripe-js/")) {
            return "payments";
          }
          if (id.includes("/node_modules/leaflet/") || id.includes("/node_modules/react-leaflet/")) {
            return "maps";
          }
          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/react-router") ||
            id.includes("/node_modules/scheduler/")
          ) {
            return "react-core";
          }
        },
      },
    },
  },
});
