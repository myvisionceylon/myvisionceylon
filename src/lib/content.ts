import { getCollection, type CollectionEntry } from 'astro:content';
import { KINDS, type Kind } from '../site.config';
import { toPercent } from './lanka';

// Drafts show while you run `npm run dev`, but never on the live site.
const showDrafts = import.meta.env.DEV;
const visible = (e: { data: { draft: boolean } }) => showDrafts || !e.data.draft;
const newestFirst = (a: { data: { written: Date } }, b: { data: { written: Date } }) =>
  b.data.written.getTime() - a.data.written.getTime();

export async function getVisions() {
  return (await getCollection('visions')).filter(visible).sort(newestFirst);
}

export async function getCommunity() {
  return (await getCollection('community')).filter(visible).sort(newestFirst);
}

export async function getThoughts() {
  return (await getCollection('thoughts')).filter(visible).sort(newestFirst);
}

export type Pin = {
  id: string;
  title: string;
  kind: Kind;
  subKind?: Kind;
  place: string;
  summary: string;
  href: string;
  date: Date;
  draft: boolean;
  left: number;
  top: number;
};

export function visionPin(e: CollectionEntry<'visions'>): Pin {
  const d = e.data;
  return {
    id: `v-${e.id}`,
    title: d.title,
    kind: d.kind,
    place: d.location,
    summary: d.summary,
    href: `/visions/${e.id}/`,
    date: d.written,
    draft: d.draft,
    ...toPercent(d.lat, d.lng),
  };
}

export function communityPin(e: CollectionEntry<'community'>): Pin {
  const d = e.data;
  return {
    id: `c-${e.id}`,
    title: d.title,
    kind: 'community',
    subKind: d.idea_kind,
    place: `${d.location} · by ${d.submitted_by}`,
    summary: d.summary,
    href: `/community/${e.id}/`,
    date: d.written,
    draft: d.draft,
    ...toPercent(d.lat, d.lng),
  };
}

export function kindInfo(kind: Kind) {
  return KINDS[kind];
}

/** 2026-10-19 style dates, like a terminal listing. */
export function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}
