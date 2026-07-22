import { client } from '@/sanity/client';
import { imageUrl } from '@/sanity/image';
import type { Locale } from './i18n/routing';
import {
  site as siteFallback,
  about as aboutFallback,
  howToBook as howToBookFallback,
  tattoos as tattoosFallback,
  events as eventsFallback,
  studioImages as studioImagesFallback,
  wannados as wannadosFallback,
} from './content';

// Revalidate Sanity-backed pages at most once a minute so edits show up quickly.
const fetchOpts = { next: { revalidate: 60 } } as const;

// Sanity-Fetch, der nie wirft. Ohne das legt ein CORS-Fehler, eine falsche
// Project-ID oder eine Sanity-Störung die ganze Seite lahm (uncaught throw in
// der Server Component) — statt auf lib/content.ts zurückzufallen.
async function safeFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  try {
    return await client!.fetch<T>(query, params, fetchOpts);
  } catch (err) {
    console.error('[sanity] Fetch fehlgeschlagen, nutze Fallback-Inhalte:', err);
    return null;
  }
}

// Global site data (address, maps, Instagram, tagline). Same shape as the static
// `site` object so consumers can swap 1:1; Sanity values override the fallback.
export interface SiteSettings {
  name: string;
  wordmark: string;
  tagline: string;
  instagram: { handle: string; url: string };
  studio: { address: string; mapsUrl: string };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const base: SiteSettings = {
    name: siteFallback.name,
    wordmark: siteFallback.wordmark,
    tagline: siteFallback.tagline,
    instagram: { ...siteFallback.instagram },
    studio: { ...siteFallback.studio },
  };
  if (!client) return base;
  const doc = await safeFetch<{
    address?: string;
    mapsUrl?: string;
    instagramHandle?: string;
    instagramUrl?: string;
    tagline?: string;
  } | null>(
    `*[_type == "siteSettings"][0]{ address, mapsUrl, instagramHandle, instagramUrl, tagline }`,
  );
  if (!doc) return base;
  return {
    name: base.name,
    wordmark: base.wordmark,
    tagline: doc.tagline || base.tagline,
    instagram: {
      handle: doc.instagramHandle || base.instagram.handle,
      url: doc.instagramUrl || base.instagram.url,
    },
    studio: {
      address: doc.address || base.studio.address,
      mapsUrl: doc.mapsUrl || base.studio.mapsUrl,
    },
  };
}

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

export async function getHowToBook(locale: Locale = 'de'): Promise<HowToBookData> {
  if (!client) return howToBookFallback;
  const doc = await safeFetch<Partial<HowToBookData> | null>(
    // coalesce(field[$locale], field.de, field) reads the localized value and
    // gracefully falls back — also works for not-yet-migrated plain-string data.
    `*[_type == "howToBook"][0]{
      "title": coalesce(title[$locale], title.de, title),
      "sections": sections[]{
        "heading": coalesce(heading[$locale], heading.de, heading),
        "items": items[]{ "v": coalesce(@[$locale], @.de, @) }.v
      },
      "ctaLabel": coalesce(ctaLabel[$locale], ctaLabel.de, ctaLabel),
      ctaUrl
    }`,
    { locale },
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

export async function getAbout(locale: Locale = 'de'): Promise<AboutData> {
  if (!client) return { title: aboutFallback.title, body: aboutFallback.body };
  const doc = await safeFetch<{ title?: string; body?: string } | null>(
    `*[_type == "about"][0]{
      "title": coalesce(title[$locale], title.de, title),
      "body": coalesce(body[$locale], body.de, body)
    }`,
    { locale },
  );
  if (!doc?.body) return { title: aboutFallback.title, body: aboutFallback.body };
  return { title: doc.title || aboutFallback.title, body: doc.body };
}

export async function getTattoos(locale: Locale = 'de'): Promise<TattooItem[]> {
  if (!client) {
    return tattoosFallback.map((t) => ({ id: t.id, src: t.src, alt: t.alt, style: t.style }));
  }
  const docs = await safeFetch<
    { id: string; alt?: string; style?: string; image: unknown }[]
  >(
    `*[_type == "tattoo" && defined(image)] | order(order asc, _createdAt desc){
      "id": _id, "alt": coalesce(alt[$locale], alt.de, alt), "style": category->title, image
    }`,
    { locale },
  );
  const items = (docs ?? [])
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

export async function getStudioImages(locale: Locale = 'de'): Promise<StudioImageItem[]> {
  const fallback = () =>
    studioImagesFallback.map((s) => ({ id: s.src, src: s.src, alt: s.alt }));
  if (!client) return fallback();
  const docs = await safeFetch<{ id: string; alt?: string; image: unknown }[]>(
    `*[_type == "studioImage" && defined(image)] | order(order asc, _createdAt desc){
      "id": _id, "alt": coalesce(alt[$locale], alt.de, alt), image
    }`,
    { locale },
  );
  const items = (docs ?? [])
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

export async function getWannados(locale: Locale = 'de'): Promise<WannadoItem[]> {
  const fallback = () =>
    wannadosFallback.map((w) => ({ id: w.src, src: w.src, alt: w.alt, label: w.label, w: w.w, h: w.h }));
  if (!client) return fallback();
  const docs = await safeFetch<
    { id: string; alt?: string; label?: string; w?: number; h?: number; image: unknown }[]
  >(
    `*[_type == "wannados" && defined(image)] | order(order asc, _createdAt desc){
      "id": _id, "alt": coalesce(alt[$locale], alt.de, alt), label, image,
      "w": image.asset->metadata.dimensions.width,
      "h": image.asset->metadata.dimensions.height
    }`,
    { locale },
  );
  const items = (docs ?? [])
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

export async function getEvents(locale: Locale = 'de'): Promise<EventItem[]> {
  if (!client) return sortedFallbackEvents();
  const docs = await safeFetch<RawEvent[]>(
    // coalesce -> Events ohne Datum ans Ende (sonst sortiert GROQ null bei desc nach oben).
    `*[_type == "event" && defined(cover)] | order(coalesce(date, "") desc, _createdAt desc){
      "slug": slug.current,
      "title": coalesce(title[$locale], title.de, title),
      date,
      "location": coalesce(location[$locale], location.de, location),
      "description": coalesce(description[$locale], description.de, description),
      cover, images
    }`,
    { locale },
  );
  const items = (docs ?? []).map(fromSanityEvent).filter((e) => e.slug && e.cover);
  return items.length ? items : sortedFallbackEvents();
}

export async function getEvent(slug: string, locale: Locale = 'de'): Promise<EventItem | null> {
  if (!client) {
    const ev = eventsFallback.find((e) => e.slug === slug);
    return ev ? toFallbackEvent(ev) : null;
  }
  const doc = await safeFetch<RawEvent | null>(
    `*[_type == "event" && slug.current == $slug][0]{
      "slug": slug.current,
      "title": coalesce(title[$locale], title.de, title),
      date,
      "location": coalesce(location[$locale], location.de, location),
      "description": coalesce(description[$locale], description.de, description),
      cover, images
    }`,
    { slug, locale },
  );
  if (doc) return fromSanityEvent(doc);
  const fb = eventsFallback.find((e) => e.slug === slug);
  return fb ? toFallbackEvent(fb) : null;
}

export async function getEventSlugs(): Promise<string[]> {
  if (!client) return eventsFallback.map((e) => e.slug);
  const slugs = await safeFetch<string[]>(
    `*[_type == "event" && defined(slug.current)].slug.current`,
  );
  return slugs?.length ? slugs : eventsFallback.map((e) => e.slug);
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
