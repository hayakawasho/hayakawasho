import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import critters from 'astro-critters';
import { glslify } from 'vite-plugin-glslify';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [react(), tailwind(), critters(), svelte()],
  compressHTML: true,
  build: {
    inlineStylesheets: 'never',
  },
  server: {
    port: 3000,
  },
  prefetch: true,
  vite: {
    build: {
      // cssCodeSplit: false,
    },
    plugins: [vanillaExtractPlugin(), glslify()],
  },
});
