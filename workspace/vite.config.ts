import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { sveltePreprocess } from "svelte-preprocess";
// import { glslify } from "vite-plugin-glslify";

const isDev = process.env.NODE_ENV !== "production";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {},
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
  },
  plugins: [
    // glslify(),
    svelte({
      preprocess: sveltePreprocess(),
    }),
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
          if (id.includes("node_modules")) {
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
