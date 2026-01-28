import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: "/balai/bbwssumatera8/",
    server: {
      proxy: {
        "/api/": {
          target: env.VITE_API_TARGET,
          changeOrigin: true,
          secure: false,
        },
      },
      host: '0.0.0.0', // Agar bisa diakses dari localhost Mac
      port: 5173,
      watch: {
        usePolling: true, // Sangat penting untuk Docker agar Hot Reload jalan
      },
    },
  };
});

