import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import critters from "astro-critters";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), svelte(), critters()],
  devToolbar: {
    enabled: false
  },
  publicDir: './static',
  outDir: './public',
  compressHTML: true,
  build: {
    inlineStylesheets: "never"
  },
  server: {
    port: 3000
  },
  prefetch: true,
  vite: {
    build: {
      // cssCodeSplit: false,
    }
    // plugins: [vanillaExtractPlugin(), glslify()],
  }
});
