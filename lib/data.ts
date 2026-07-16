import { client } from '@/sanity/client';
import { imageUrl } from '@/sanity/image';
import {
  about as aboutFallback,
  howToBook as howToBookFallback,
  tattoos as tattoosFallback,
  events as eventsFallback,
  studioImages as studioImagesFallback,
  wannados as wannadosFallback,
} from './content';

// Revalidate Sanity-backed pages at most once a minute so edits show up quickly.
const fetchOpts = { next: { revalidate: 60 } } as const;

export interface AboutData {
  title: string;
  body: string;
}
export interface TattooItem {
  id: string;
  src: string;
  alt: string;
  style: string;
}
export interface EventItem {
  slug: string;
  title: string;
  date?: string;
  location?: string;
  description?: string;
  cover: string;
  images: string[];
}

export interface HowToBookData {
  title: string;
  sections: { heading: string; items: string[] }[];
  ctaLabel: string;
  ctaUrl: string;
}

export async function getHowToBook(): Promise<HowToBookData> {
  if (!client) return howToBookFallback;
  const doc = await client.fetch<Partial<HowToBookData> | null>(
    `*[_type == "howToBook"][0]{ title, sections, ctaLabel, ctaUrl }`,
    {},
    fetchOpts,
  );
  // Nur Sanity nehmen, wenn echte Abschnitte vorhanden sind, sonst Fallback.
  if (!doc?.sections?.length) return howToBookFallback;
  return {
    title: doc.title || howToBookFallback.title,
    sections: doc.sections,
    ctaLabel: doc.ctaLabel || howToBookFallback.ctaLabel,
    ctaUrl: doc.ctaUrl || howToBookFallback.ctaUrl,
  };
}

export async function getAbout(): Promise<AboutData> {
  if (!client) return { title: aboutFallback.title, body: aboutFallback.body };
  const doc = await client.fetch<{ title?: string; body?: string } | null>(
    `*[_type == "about"][0]{ title, body }`,
    {},
    fetchOpts,
  );
  if (!doc?.body) return { title: aboutFallback.title, body: aboutFallback.body };
  return { title: doc.title || aboutFallback.title, body: doc.body };
}

export async function getTattoos(): Promise<TattooItem[]> {
  if (!client) {
    return tattoosFallback.map((t) => ({ id: t.id, src: t.src, alt: t.alt, style: t.style }));
  }
  const docs = await client.fetch<
    { id: string; alt?: string; style?: string; image: unknown }[]
  >(
    `*[_type == "tattoo" && defined(image)] | order(order asc, _createdAt desc){
      "id": _id, alt, "style": category->title, image
    }`,
    {},
    fetchOpts,
  );
  const items = docs
    .map((d) => ({
      id: d.id,
      src: imageUrl(d.image as never, 1000) || '',
      alt: d.alt || 'Tattoo von Stecher Jaron',
      style: d.style || 'Sonstige',
    }))
    .filter((t) => t.src);
  // configured but still empty → keep showing current content until items are added
  return items.length
    ? items
    : tattoosFallback.map((t) => ({ id: t.id, src: t.src, alt: t.alt, style: t.style }));
}

export interface StudioImageItem {
  id: string;
  src: string;
  alt: string;
}

export async function getStudioImages(): Promise<StudioImageItem[]> {
  const fallback = () =>
    studioImagesFallback.map((s) => ({ id: s.src, src: s.src, alt: s.alt }));
  if (!client) return fallback();
  const docs = await client.fetch<{ id: string; alt?: string; image: unknown }[]>(
    `*[_type == "studioImage" && defined(image)] | order(order asc, _createdAt desc){
      "id": _id, alt, image
    }`,
    {},
    fetchOpts,
  );
  const items = docs
    .map((d) => ({
      id: d.id,
      src: imageUrl(d.image as never, 1000) || '',
      alt: d.alt || 'Studio Impression',
    }))
    .filter((s) => s.src);
  // configured but still empty → keep showing current content until items are added
  return items.length ? items : fallback();
}

export interface WannadoItem {
  id: string;
  src: string;
  alt: string;
  label: string;
  w: number;
  h: number;
}

export async function getWannados(): Promise<WannadoItem[]> {
  const fallback = () =>
    wannadosFallback.map((w) => ({ id: w.src, src: w.src, alt: w.alt, label: w.label, w: w.w, h: w.h }));
  if (!client) return fallback();
  const docs = await client.fetch<
    { id: string; alt?: string; label?: string; w?: number; h?: number; image: unknown }[]
  >(
    `*[_type == "wannados" && defined(image)] | order(order asc, _createdAt desc){
      "id": _id, alt, label, image,
      "w": image.asset->metadata.dimensions.width,
      "h": image.asset->metadata.dimensions.height
    }`,
    {},
    fetchOpts,
  );
  const items = docs
    .map((d) => ({
      id: d.id,
      src: imageUrl(d.image as never, 1400) || '',
      alt: d.alt || 'Wannado’s Flash Sheet von Stecher Jaron',
      label: d.label || 'Sheet',
      w: d.w || 1000,
      h: d.h || 1250,
    }))
    .filter((w) => w.src);
  // configured but still empty → keep showing current content until items are added
  return items.length ? items : fallback();
}

// Fallback-Events nach Datum sortiert (neueste zuerst), analog zur Sanity-Query.
const sortedFallbackEvents = () =>
  [...eventsFallback]
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .map(toFallbackEvent);

export async function getEvents(): Promise<EventItem[]> {
  if (!client) return sortedFallbackEvents();
  const docs = await client.fetch<RawEvent[]>(
    // coalesce -> Events ohne Datum ans Ende (sonst sortiert GROQ null bei desc nach oben).
    `*[_type == "event" && defined(cover)] | order(coalesce(date, "") desc, _createdAt desc){
      "slug": slug.current, title, date, location, description, cover, images
    }`,
    {},
    fetchOpts,
  );
  const items = docs.map(fromSanityEvent).filter((e) => e.slug && e.cover);
  return items.length ? items : sortedFallbackEvents();
}

export async function getEvent(slug: string): Promise<EventItem | null> {
  if (!client) {
    const ev = eventsFallback.find((e) => e.slug === slug);
    return ev ? toFallbackEvent(ev) : null;
  }
  const doc = await client.fetch<RawEvent | null>(
    `*[_type == "event" && slug.current == $slug][0]{
      "slug": slug.current, title, date, location, description, cover, images
    }`,
    { slug },
    fetchOpts,
  );
  if (doc) return fromSanityEvent(doc);
  const fb = eventsFallback.find((e) => e.slug === slug);
  return fb ? toFallbackEvent(fb) : null;
}

export async function getEventSlugs(): Promise<string[]> {
  if (!client) return eventsFallback.map((e) => e.slug);
  const slugs = await client.fetch<string[]>(
    `*[_type == "event" && defined(slug.current)].slug.current`,
    {},
    fetchOpts,
  );
  return slugs.length ? slugs : eventsFallback.map((e) => e.slug);
}

// ---- helpers ----
interface RawEvent {
  slug?: string;
  title?: string;
  date?: string;
  location?: string;
  description?: string;
  cover?: unknown;
  images?: unknown[];
}

function fromSanityEvent(d: RawEvent): EventItem {
  return {
    slug: d.slug || '',
    title: d.title || '',
    date: d.date,
    location: d.location,
    description: d.description,
    cover: imageUrl(d.cover as never, 1400) || '',
    images: (d.images || []).map((img) => imageUrl(img as never, 1600) || '').filter(Boolean),
  };
}

function toFallbackEvent(e: (typeof eventsFallback)[number]): EventItem {
  return {
    slug: e.slug,
    title: e.title,
    date: e.date,
    location: e.location,
    description: e.description,
    cover: e.cover,
    images: e.media.filter((m) => m.type === 'image').map((m) => m.src),
  };
}
