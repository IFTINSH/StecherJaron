import type { MetadataRoute } from 'next';
import { getEventSlugs } from '@/lib/data';

// Generates /sitemap.xml. Lists the public, indexable pages only:
// homepage + /portfolio + /atelier + /events + every event detail page.
// Deliberately excluded: /studio (Sanity admin) and /impressum + /datenschutz
// (both marked noindex), which therefore don't belong in the sitemap.
const SITE_URL = 'https://stecherjaron.de';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/atelier`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/events`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const slugs = await getEventSlugs();
  const eventPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/events/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticPages, ...eventPages];
}
