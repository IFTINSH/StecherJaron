import type { Metadata } from 'next';
import BackgroundShader from '@/components/BackgroundShader';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import StudioGrid from '@/components/StudioGrid';
import HowToBook from '@/components/HowToBook';
import Footer from '@/components/Footer';
import { site } from '@/lib/content';
import { getHowToBook, getStudioImages } from '@/lib/data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Studio',
  description: 'Impressionen aus dem Studio von Stecher Jaron in Passau.',
  alternates: { canonical: '/atelier' },
};

export default async function AtelierPage() {
  const [howToBook, images] = await Promise.all([getHowToBook(), getStudioImages()]);

  return (
    <>
      <BackgroundShader />
      <Header />
      <main className="relative z-10 min-h-dvh px-6 pb-28 pt-28 md:px-12">
        <div className="mx-auto max-w-[1800px]">
          <BackButton label="← Zurück" fallbackHref="/#studio" />

          <header className="mt-8 flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
            <h1
              className="font-display text-4xl uppercase tracking-brand text-white md:text-6xl"
              style={{ fontWeight: 300 }}
            >
              Studio
            </h1>

            <div className="shrink-0">
              <span className="font-display text-xs uppercase tracking-brand text-secondary">
                Adresse
              </span>
              <a
                href={site.studio.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-trail mt-2 block font-display text-lg uppercase tracking-wordmark text-white"
              >
                {site.studio.address}
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
