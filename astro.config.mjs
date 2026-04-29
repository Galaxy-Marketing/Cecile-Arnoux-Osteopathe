import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [react(), sitemap()],
  site: 'https://cecile-arnoux.com',
  output: 'static',
});
