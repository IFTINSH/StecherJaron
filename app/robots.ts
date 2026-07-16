import type { MetadataRoute } from 'next';

// Generates /robots.txt. The Sanity Studio admin route (/studio) is kept out of
// search indexes; everything else is crawlable. Sitemap + host point at the
// production domain (stecherjaron.de) so they stay correct once the domain is live.
const SITE_URL = 'https://stecherjaron.de';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/studio/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
