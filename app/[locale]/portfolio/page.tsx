import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getTattoos, getHowToBook } from '@/lib/data';
import type { Locale } from '@/lib/i18n/routing';
import BackgroundShader from '@/components/BackgroundShader';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import GalleryGrid from '@/components/GalleryGrid';
import HowToBook from '@/components/HowToBook';
import Footer from '@/components/Footer';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pageMeta' });
  const isDe = locale === 'de';
  return {
    title: t('portfolioTitle'),
    description: t('portfolioDescription'),
    alternates: {
      canonical: isDe ? '/portfolio' : '/en/portfolio',
      languages: { 'de-DE': '/portfolio', 'en-US': '/en/portfolio', 'x-default': '/portfolio' },
    },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const [tattoos, howToBook] = await Promise.all([getTattoos(locale), getHowToBook(locale)]);

  return (
    <>
      <BackgroundShader />
      <Header />
      <main className="relative z-10 min-h-dvh px-6 pb-28 pt-28 md:px-12">
        <div className="mx-auto max-w-[1800px]">
          <BackButton label={t('common.back')} fallbackHref="/#work" />

          <header className="mt-8 border-b border-line pb-8">
            <h1
              className="font-display text-4xl uppercase tracking-brand text-white md:text-6xl"
              style={{ fontWeight: 300 }}
            >
              {t('sections.portfolio')}
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
