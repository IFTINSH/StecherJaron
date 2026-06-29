import { client } from '@/sanity/client';
import { imageUrl } from '@/sanity/image';
import {
  about as aboutFallback,
  tattoos as tattoosFallback,
  events as eventsFallback,
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

export async function getEvents(): Promise<EventItem[]> {
  if (!client) return eventsFallback.map(toFallbackEvent);
  const docs = await client.fetch<RawEvent[]>(
    `*[_type == "event" && defined(cover)] | order(order asc, _createdAt desc){
      "slug": slug.current, title, date, location, description, cover, images
    }`,
    {},
    fetchOpts,
  );
  const items = docs.map(fromSanityEvent).filter((e) => e.slug && e.cover);
  return items.length ? items : eventsFallback.map(toFallbackEvent);
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
