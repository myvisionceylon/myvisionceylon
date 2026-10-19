// @ts-check
import { defineConfig } from 'astro/config';

// The live address. Change to https://myvisionceylon.com once you buy the domain.
export default defineConfig({
  site: 'https://myvisionceylon.charukarp.workers.dev',
  trailingSlash: 'ignore',
  // Plain code blocks, so ASCII drawings get the green terminal style.
  markdown: { syntaxHighlight: false },
});
