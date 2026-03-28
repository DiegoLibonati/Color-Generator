import path from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@tests": path.resolve(__dirname, "./__tests__"),
      },
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
