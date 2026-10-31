import path from "path";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  ssr: {
    external: ["@material-tailwind/react"],
  },
  optimizeDeps: {
    include: ["@material-tailwind/react"],
  },
});
