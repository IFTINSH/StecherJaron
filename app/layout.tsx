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
  keywords: [
    'Tattoo Passau',
    'Tattoo Artist Passau',
    'Stecher Jaron',
    'Dotwork',
    'Blackwork',
    'Fine-Line Tattoo',
  ],
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
  alternates: { canonical: '/' },
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
    addressLocality: 'Passau',
    addressCountry: 'DE',
  },
  sameAs: [site.instagram.url],
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
