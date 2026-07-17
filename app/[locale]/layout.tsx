import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages, getTranslations } from 'next-intl/server';
import { jost, inter } from '@/lib/fonts';
import { site } from '@/lib/content';
import { routing } from '@/lib/i18n/routing';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t('title');
  const description = t('description');
  const isDe = locale === 'de';

  return {
    metadataBase: new URL('https://stecherjaron.de'),
    title: { default: title, template: t('titleTemplate') },
    description,
    alternates: {
      canonical: isDe ? '/' : '/en',
      languages: { 'de-DE': '/', 'en-US': '/en', 'x-default': '/' },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isDe ? 'de_DE' : 'en_US',
      alternateLocale: isDe ? 'en_US' : 'de_DE',
      siteName: site.name,
      images: ['/hero/hero.jpeg'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/hero/hero.jpeg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Keep the page statically rendered per locale (preserves ISR).
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'meta' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TattooParlor',
    name: site.name,
    description: t('description'),
    image: 'https://stecherjaron.de/hero/hero.jpeg',
    url: 'https://stecherjaron.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Firmianstraße 10',
      postalCode: '94032',
      addressLocality: 'Passau',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.5719524,
      longitude: 13.4528076,
    },
    areaServed: t('areaServed'),
    sameAs: [site.instagram.url],
  };

  return (
    <html lang={locale} className={`${jost.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
