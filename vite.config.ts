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
      "@routes": "/src/routes",
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
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/')) return 'react';
            if (id.includes('react-router-dom')) return 'router';
            if (id.includes('@reduxjs') || id.includes('react-redux')) return 'redux';
          }
          return null; 
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
    proxy: {
 "/api/auth": {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
    },
    "/api/email": {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
    },
    "/api/users": {
      target: "http://localhost:8082",
      changeOrigin: true,
      secure: false,
    },
    "/api/course": {
      target: "http://localhost:8083",
      changeOrigin: true,
      secure: false,
    },
    "/api/notifications": {
      target: "http://localhost:8081",
      changeOrigin: true,
      secure: false,
    }
    },
  },

  preview: {
    port: 4173,
    host: true,
  },
});
