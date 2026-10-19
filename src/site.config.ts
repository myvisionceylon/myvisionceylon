// One place for the details that appear across the site.
// Edit these and every page updates.

export const SITE = {
  name: 'myvisionceylon',
  title: 'MyVisionCeylon: a notebook of visions for Sri Lanka',
  description:
    'Visions for Sri Lanka: some practical, some futuristic, some pure fantasy. Written down, dated, and open for anyone to build on.',
  author: 'Charuka Panapitya',
  email: 'myvisionceylon@proton.me',
  github: 'https://github.com/myvisionceylon',
  repo: 'https://github.com/myvisionceylon/myvisionceylon',
  blog: 'https://imaginatiodec.blogspot.com',
  license: 'CC BY-NC 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
  startYear: 2026,
};

// The four kinds of markers on the map.
export const KINDS = {
  practical: { label: 'PRACTICAL', glyph: '■', color: 'var(--practical)' },
  futuristic: { label: 'FUTURISTIC', glyph: '▲', color: 'var(--futuristic)' },
  fantasy: { label: 'FANTASY', glyph: '◆', color: 'var(--fantasy)' },
  community: { label: 'COMMUNITY', glyph: '●', color: 'var(--community)' },
} as const;

export type Kind = keyof typeof KINDS;
