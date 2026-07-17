import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Run on every path EXCEPT:
  //  - /studio  → Sanity admin, stays un-localized (no /en/studio)
  //  - /api, /_next, /_vercel → framework internals
  //  - anything with a dot (assets, robots.txt, sitemap.xml)
  matcher: ['/((?!studio|api|_next|_vercel|.*\\..*).*)'],
};
