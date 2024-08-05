import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "public/index.html"),
      },
    },
  },
});
