import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://cecile-arnoux-osteopathe.vercel.app',
  output: 'static',
});
