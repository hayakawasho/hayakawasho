import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), svelte()],
  devToolbar: {
    enabled: false,
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "never",
  },
  server: {
    port: 3000,
  },
  prefetch: true,
  vite: {
    build: {
      // cssCodeSplit: false,
    },
    // plugins: [vanillaExtractPlugin(), glslify()],
  },
});
