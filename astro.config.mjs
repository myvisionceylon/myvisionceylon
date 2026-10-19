// @ts-check
import { defineConfig } from 'astro/config';

// Change `site` to https://myvisionceylon.com once you buy the domain.
export default defineConfig({
  site: 'https://myvisionceylon.pages.dev',
  trailingSlash: 'ignore',
  // Plain code blocks, so ASCII drawings get the green terminal style.
  markdown: { syntaxHighlight: false },
});
