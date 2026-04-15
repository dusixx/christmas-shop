import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "./",
  build: {
    outDir: "../dist",
    assetsDir: "",
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "src/index.html"),
        gifts: resolve(import.meta.dirname, "src/gifts.html"),
      },
    },
  },
});
