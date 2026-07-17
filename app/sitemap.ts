import type { MetadataRoute } from 'next';
import { getEventSlugs } from '@/lib/data';

// Generates /sitemap.xml. Lists the public, indexable pages only:
// homepage + /portfolio + /atelier + /events + every event detail page,
// each with its German and English (/en) alternate (hreflang).
// Deliberately excluded: /studio (Sanity admin) and /impressum + /datenschutz
// (both marked noindex), which therefore don't belong in the sitemap.
const SITE_URL = 'https://stecherjaron.de';

const enUrl = (path: string) => `${SITE_URL}/en${path === '/' ? '' : path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entry = (
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number,
  ): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    alternates: {
      languages: { de: `${SITE_URL}${path}`, en: enUrl(path) },
    },
  });

  const staticPages: MetadataRoute.Sitemap = [
    entry('/', 'monthly', 1),
    entry('/portfolio', 'weekly', 0.9),
    entry('/atelier', 'monthly', 0.6),
    entry('/events', 'weekly', 0.7),
  ];

  const slugs = await getEventSlugs();
  const eventPages: MetadataRoute.Sitemap = slugs.map((slug) =>
    entry(`/events/${slug}`, 'monthly', 0.5),
  );

  return [...staticPages, ...eventPages];
}
