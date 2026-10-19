# myvisionceylon

```
> booting myvisionceylon ...
> a notebook of visions for Sri Lanka
> practical ■   futuristic ▲   fantasy ◆   community ●
```

Ideas for Sri Lanka, written down, dated, and public. Some are practical, some
futuristic, some pure fantasy. Each one sits on a map of the island.

Live site: https://myvisionceylon.charukarp.workers.dev
Have an idea of your own? See [Submitting a vision](#submitting-a-vision).

---

## How the site works

Every idea is one Markdown file. The map, the lists and the RSS feed are all
built from those files. You never edit the map by hand.

```
src/content/
  visions/      your national visions → a page + a pin on the map
  community/    ideas sent in by others → a page + a ● pin, with credit
  thoughts/     personal writing → a page, no pin
```

Files starting with `_` (like `_template.md`) are never published.

Other places you might touch:

| file | what it is |
| --- | --- |
| `src/site.config.ts` | your name, email, LinkedIn and other links, license |
| `src/pages/about.md` | your About page. Plain Markdown; hints are in the `<!-- -->` comment at the top |
| `src/styles/terminal.css` | colors and fonts (all colors are at the top) |
| `astro.config.mjs` | the site address; change it when you buy the domain |

---

## Writing a new vision

1. Copy `src/content/visions/_template.md` to a new file, e.g. `src/content/visions/kandy-sky-tram.md`.
   The file name becomes the address: `/visions/kandy-sky-tram/`.
2. Fill in the top block:
   - `kind`: `practical`, `futuristic` or `fantasy`
   - `lat` / `lng`: right-click the spot on Google Maps, the two numbers it shows
   - `summary`: one line; it appears in the map tooltip
3. Write the body under the `##` headings. Plain Markdown.
4. Keep `draft: true` while you're working on it. Set `draft: false` to publish.
5. Commit and push. Cloudflare rebuilds the site in about a minute.

You can do all of this in the GitHub website: open the folder, **Add file → Create new file**,
paste the template, edit, **Commit changes**. No computer setup needed.

**Drawings:** put ASCII art inside a fenced code block (three backticks) and it renders
in the green terminal style. Small SVG line drawings also work; put them in `public/img/`
and use `![description](/img/name.svg)`.

**Coordinates must be inside Sri Lanka.** If a pin would land outside the island,
the build fails on purpose so the mistake never goes live.

---

## Running it on your computer (optional)

Needs [Node.js](https://nodejs.org) 22 or newer.

```sh
npm install
npm run dev      # open http://localhost:4321 (drafts are visible here)
npm run build    # makes the final site in dist/ (drafts are hidden)
```

---

## Publishing on Cloudflare Pages

One-time setup:

1. Log in to the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**.
2. Pick the `myvisionceylon/myvisionceylon` repository.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Save and deploy. You get `https://<project-name>.<account>.workers.dev` (Workers) or `.pages.dev` (Pages).

After that, every push to `main` publishes automatically.

### Adding myvisionceylon.com later

1. Buy the domain (Cloudflare Registrar sells at cost).
2. In the Pages project → **Custom domains** → add `myvisionceylon.com`.
3. Change `site` in `astro.config.mjs` to `https://myvisionceylon.com` and push.
4. Optional: **Email Routing** in Cloudflare can forward `ideas@myvisionceylon.com`
   to the Proton inbox for free. Then update `email` in `src/site.config.ts`.

---

## Cross-posting to Blogspot

The site publishes an RSS feed at `/rss.xml` with every vision and thought.

Simple way: when a new vision goes live, make a short Blogger post with the summary and
a "read the full vision at myvisionceylon" link. That keeps this site as the original
source for search engines.

(An automatic GitHub Action that posts to Blogger through its API can be added later.)

---

## Submitting a vision

Anyone can suggest an idea. Three ways:

1. **Email:** the address is on the [submit page](https://myvisionceylon.charukarp.workers.dev/submit/).
2. **GitHub issue:** use the [Submit a vision form](../../issues/new?template=submit-vision.yml).
3. **Pull request:** fork this repo, copy `src/content/community/_template.md` to a new file
   in the same folder, fill it in, and open a pull request.

Only the maintainer can publish. Every community idea is credited to the person who sent it.

### For the maintainer: publishing a community idea

1. Create `src/content/community/<short-name>.md` from the template
   (or merge their pull request).
2. Fill `submitted_by` and `submitted_via` (`email`, `issue` or `pull request`).
3. Push. It appears with a ● COMMUNITY pin and a credit box.

---

## Proof of authorship

Every page links to its edit history on GitHub. Each commit is a public, timestamped
record of who wrote what, and when. For extra proof, save important pages to the
[Internet Archive](https://web.archive.org/save) after publishing.

## License

Writing and drawings: CC BY-NC 4.0. Code: MIT. Details in [LICENSE.md](LICENSE.md).
