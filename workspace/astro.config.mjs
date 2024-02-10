import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import critters from 'astro-critters';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import { glslify } from 'vite-plugin-glslify';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [react(), tailwind(), critters()],
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
    plugins: [
      vanillaExtractPlugin(),
      svelte({
        preprocess: preprocess(),
      }),
      glslify(),
    ],
  },
});
