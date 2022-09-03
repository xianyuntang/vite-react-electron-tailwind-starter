import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  root: resolve("./src/renderer"),
  build: {
    outDir: resolve("./dist"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@/renderer": resolve(__dirname, "src", "renderer"),
      "@/main": resolve(__dirname, "src", "main"),
    },
  },
});
