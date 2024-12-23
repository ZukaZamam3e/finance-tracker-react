import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["vite.svg"],
      useCredentials: true,
      manifest: {
        name: "Finance Tracker",
        short_name: "finance-tracker",
        description: "Track Finances",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: ".",
        icons: [
          {
            src: "icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  build: {
    manifest: true,
  },
  server: {
    open: true,
    port: 5173,
  },
});
