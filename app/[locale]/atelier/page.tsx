import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import BackgroundShader from '@/components/BackgroundShader';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import StudioGrid from '@/components/StudioGrid';
import HowToBook from '@/components/HowToBook';
import Footer from '@/components/Footer';
import { getHowToBook, getStudioImages, getSiteSettings } from '@/lib/data';
import type { Locale } from '@/lib/i18n/routing';

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
    title: t('studioTitle'),
    description: t('studioDescription'),
    alternates: {
      canonical: isDe ? '/atelier' : '/en/atelier',
      languages: { 'de-DE': '/atelier', 'en-US': '/en/atelier', 'x-default': '/atelier' },
    },
  };
}

export default async function AtelierPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const [howToBook, images, settings] = await Promise.all([
    getHowToBook(locale),
    getStudioImages(locale),
    getSiteSettings(),
  ]);

  return (
    <>
      <BackgroundShader />
      <Header />
      <main className="relative z-10 min-h-dvh px-6 pb-28 pt-28 md:px-12">
        <div className="mx-auto max-w-[1800px]">
          <BackButton label={t('common.back')} fallbackHref="/#studio" />

          <header className="mt-8 flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
            <h1
              className="font-display text-4xl uppercase tracking-brand text-white md:text-6xl"
              style={{ fontWeight: 300 }}
            >
              {t('sections.studio')}
            </h1>

            <div className="shrink-0">
              <span className="font-display text-xs uppercase tracking-brand text-secondary">
                {t('labels.address')}
              </span>
              <a
                href={settings.studio.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-trail mt-2 block font-display text-lg uppercase tracking-wordmark text-white"
              >
                {settings.studio.address}
              </a>
            </div>
          </header>

          <div className="mt-10">
            <StudioGrid images={images} />
          </div>
        </div>
      </main>
      <Footer />
      <HowToBook data={howToBook} />
    </>
  );
}
