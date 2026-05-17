import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import type { UserConfig } from "vite";

export default defineConfig(({ mode }): UserConfig => {
  const isDev = mode === "development";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
        "@tests": path.resolve(import.meta.dirname, "./__tests__"),
      },
    },
    server: {
      port: 3000,
      open: true,
      strictPort: true,
    },
    preview: {
      port: 3001,
    },
    build: {
      outDir: "dist",
      sourcemap: isDev,
      minify: "esbuild",
      target: "ES2022",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
          },
        },
      },
    },
  };
});
