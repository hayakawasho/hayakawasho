import { defineConfig, type Plugin } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { sveltePreprocess } from "svelte-preprocess";

const isDev = process.env.NODE_ENV !== "production";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {},
  server: {
    host: "0.0.0.0",
    port: 9000,
    strictPort: true,
  },
  cacheDir: '.cache/vite',
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
  ],
  build: {
    outDir: "./out/assets",
    sourcemap: isDev,
    manifest: true,
    rollupOptions: {
      // plugins: [glslify() as Plugin],
      input: "./src/entry.ts",
      output: {
        assetFileNames: `[name].[ext]`,
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        manualChunks(id) {
          if (id.includes("three")) {
            return "vendor.three";
          } else if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  esbuild: {
    drop: isDev ? [] : ["console", "debugger"],
  },
});
