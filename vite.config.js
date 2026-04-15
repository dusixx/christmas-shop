import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/",
  build: {
    assetsDir: "",
    minify: true,
  },
});
