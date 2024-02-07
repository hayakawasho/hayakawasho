import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [react(), tailwind()],
  compressHTML: true,
  build: {
    inlineStylesheets: 'never',
  },
  server: {
    port: 3000,
  },
  vite: {
    build: {
      cssCodeSplit: false,
    },
    plugins: [vanillaExtractPlugin()],
  },
});
