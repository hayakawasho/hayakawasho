import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import critters from "astro-critters";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), critters()],
  devToolbar: {
    enabled: false,
  },
  outDir: "./out/",
  compressHTML: true,
  build: {
    // inlineStylesheets: "never",
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  prefetch: true,
  vite: {
    build: {
      // cssCodeSplit: false,
    },
    plugins: [],
  },
});
