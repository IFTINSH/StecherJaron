import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTattoos, getHowToBook } from '@/lib/data';
import type { Locale } from '@/lib/i18n/routing';
import BackgroundShader from '@/components/BackgroundShader';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import GalleryGrid from '@/components/GalleryGrid';
import HowToBook from '@/components/HowToBook';
import Footer from '@/components/Footer';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Alle Arbeiten von Stecher Jaron — Dotwork, Blackwork, Fine-Line Tattoos.',
  alternates: { canonical: '/portfolio' },
};

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [tattoos, howToBook] = await Promise.all([getTattoos(locale), getHowToBook(locale)]);

  return (
    <>
      <BackgroundShader />
      <Header />
      <main className="relative z-10 min-h-dvh px-6 pb-28 pt-28 md:px-12">
        <div className="mx-auto max-w-[1800px]">
          <BackButton label="← Zurück" fallbackHref="/#work" />

          <header className="mt-8 border-b border-line pb-8">
            <h1
              className="font-display text-4xl uppercase tracking-brand text-white md:text-6xl"
              style={{ fontWeight: 300 }}
            >
              Portfolio
            </h1>
          </header>

          <div className="mt-10">
            <GalleryGrid tattoos={tattoos} />
          </div>
        </div>
      </main>
      <Footer />
      <HowToBook data={howToBook} />
    </>
  );
}
