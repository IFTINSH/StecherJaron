import { defineRouting } from 'next-intl/routing';

// German is the default and served on the bare URLs (/, /portfolio, …).
// English is served under /en. `as-needed` keeps the default locale prefix-free
// and redirects /de/* → /* so there is no duplicate content.
export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
