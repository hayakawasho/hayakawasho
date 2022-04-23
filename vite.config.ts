import { resolve } from "path";
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import glslifyCompiler from "vite-plugin-glslify";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "app"),
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  plugins: [
    glsl(),
    glslifyCompiler(),
    svelte({
      emitCss: false,
      preprocess: preprocess(),
    }),
  ],
  build: {
    // manifest: true,
    // rollupOptions: {
    //   input: "./app/client/index.ts",
    // },
  },
  css: {},
});
