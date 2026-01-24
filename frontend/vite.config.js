import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/balai/bbwssumatera8/",
  server: {
    host: '0.0.0.0', // Agar bisa diakses dari localhost Mac
    port: 5173,
    watch: {
      usePolling: true, // Sangat penting untuk Docker agar Hot Reload jalan
    },
  },
});
