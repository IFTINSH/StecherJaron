import type { Metadata } from 'next';
import { jost, inter } from '@/lib/fonts';
import { site } from '@/lib/content';
import './globals.css';

const description =
  'Stecher Jaron — Tattoo Artist aus Passau. Dotwork, Blackwork & Fine-Line Tattoos. Individuelle Designs, feine Details, klare Linien. Studio: Firmianstraße 10, Passau.';

export const metadata: Metadata = {
  metadataBase: new URL('https://stecherjaron.de'),
  title: {
    default: 'Stecher Jaron — Tattoo Artist Passau',
    template: '%s — Stecher Jaron',
  },
  description,
  openGraph: {
    title: 'Stecher Jaron — Tattoo Artist Passau',
    description,
    type: 'website',
    locale: 'de_DE',
    siteName: site.name,
    images: ['/hero/hero.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stecher Jaron — Tattoo Artist Passau',
    description,
    images: ['/hero/hero.jpeg'],
  },
  // Per-page canonicals are set in each page's own metadata (app/page.tsx → '/',
  // /portfolio, /atelier, /events, /events/[slug]). Not set here so subpages don't
  // all inherit the homepage canonical.
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TattooParlor',
  name: site.name,
  description,
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
  areaServed: 'Passau und Umgebung',
  sameAs: [site.instagram.url],
  // TODO (nach Rücksprache mit Jaron, siehe Plan B3):
  //  - telephone: '+49…'  → sobald es eine Geschäftsnummer gibt
  //  - openingHoursSpecification: […]  → feste Zeiten, oder Hinweis „nach Vereinbarung"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${jost.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
