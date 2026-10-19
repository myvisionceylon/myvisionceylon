import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Sri Lanka's rough bounding box, so a typo in coordinates fails the build
// instead of putting a pin in the sea near India.
const lat = z.number().min(5.8).max(9.9);
const lng = z.number().min(79.4).max(82.0);

const ideaKind = z.enum(['practical', 'futuristic', 'fantasy']);

// Your own national visions. One Markdown file each in src/content/visions/.
const visions = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/visions' }),
  schema: z.object({
    title: z.string(),
    kind: ideaKind,
    location: z.string(),
    lat,
    lng,
    summary: z.string().max(160),
    status: z.enum(['idea', 'researching', 'proposed', 'in progress', 'happening']).default('idea'),
    horizon: z.string().optional(),
    written: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

// Ideas sent in by other people. Same shape, plus who sent it.
const community = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/community' }),
  schema: z.object({
    title: z.string(),
    idea_kind: ideaKind,
    location: z.string(),
    lat,
    lng,
    summary: z.string().max(160),
    submitted_by: z.string(),
    submitted_via: z.enum(['email', 'issue', 'pull request']).default('email'),
    written: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

// Personal visions: free writing, no map pin.
const thoughts = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/thoughts' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    written: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { visions, community, thoughts };
