import { resolve } from "path";
import { splitVendorChunkPlugin, defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";
// // import viteCompression from "vite-plugin-compression";
import { glslify } from "vite-plugin-glslify";

const isDev = process.env.NODE_ENV !== "production";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
  plugins: [
    svelte({
      preprocess: preprocess(),
    }),
    // viteCompression(),
    glslify(),
    splitVendorChunkPlugin(),
  ],
  build: {
    outDir: "./out/assets",
    sourcemap: isDev,
    manifest: true,
    rollupOptions: {
      input: "./src/entry.ts",
      output: {
        assetFileNames: `[name].[ext]`,
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        manualChunks(id) {
          if (id.includes("three")) {
            return "vendor.three";
          }
        },
      },
    },
  },
  esbuild: {
    drop: isDev ? [] : ["console", "debugger"],
  },
});
