// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Lock output to pure static — prevents any deploy platform (e.g. Cloudflare
  // Workers Builds) from auto-adding an SSR adapter and emitting /_image?
  // runtime URLs that 404 in production.
  output: 'static',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});