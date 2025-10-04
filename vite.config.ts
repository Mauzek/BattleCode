import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": "/src",
      "@api": "/src/api",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@config": "/src/config",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@schemas": "/src/schemas",
      "@store": "/src/store",
      "@styles": "/src/styles",
      "@types": "/src/types",
      "@utils": "/src/utils",
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const chunks = {
              vendor: ["react", "react-dom"],
              router: ["react-router-dom"],
              redux: ["@reduxjs/toolkit", "react-redux"],
            };

            for (const [chunkName, modules] of Object.entries(chunks)) {
              if (
                modules.some((module) => id.includes(`node_modules/${module}`))
              ) {
                return chunkName;
              }
            }
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },

  preview: {
    port: 4173,
    host: true,
  },
});
