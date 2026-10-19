// RSS feed of everything on the site. Blogger (and any feed reader)
// can follow this to pick up new posts.
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../site.config';
import { getVisions, getCommunity, getThoughts } from '../lib/content';

export async function GET(context: APIContext) {
  const [visions, community, thoughts] = await Promise.all([getVisions(), getCommunity(), getThoughts()]);

  const items = [
    ...visions.map((e) => ({
      title: `[vision] ${e.data.title}`,
      description: e.data.summary,
      pubDate: e.data.written,
      link: `/visions/${e.id}/`,
    })),
    ...community.map((e) => ({
      title: `[community] ${e.data.title}`,
      description: `${e.data.summary} (idea by ${e.data.submitted_by})`,
      pubDate: e.data.written,
      link: `/community/${e.id}/`,
    })),
    ...thoughts.map((e) => ({
      title: `[thought] ${e.data.title}`,
      description: e.data.summary ?? '',
      pubDate: e.data.written,
      link: `/thoughts/${e.id}/`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items,
  });
}
