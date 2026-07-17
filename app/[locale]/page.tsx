import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/lib/i18n/routing';
import BackgroundShader from '@/components/BackgroundShader';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingProvider from '@/components/LoadingProvider';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import IntroVideo from '@/components/IntroVideo';
import Gallery from '@/components/Gallery';
import Studio from '@/components/Studio';
import Wannados from '@/components/Wannados';
import Events from '@/components/Events';
import Contact from '@/components/Contact';
import HowToBook from '@/components/HowToBook';
import Footer from '@/components/Footer';
import { getAbout, getTattoos, getEvents, getHowToBook, getStudioImages, getWannados } from '@/lib/data';
import type { Locale } from '@/lib/i18n/routing';

export const revalidate = 60;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  // Guard: a bare path like /favicon.ico would otherwise match [locale] and run
  // a Sanity query with an invalid $locale. Reject anything that isn't a locale.
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [about, tattoos, events, howToBook, studioImages, wannados] = await Promise.all([
    getAbout(locale),
    getTattoos(locale),
    getEvents(locale),
    getHowToBook(locale),
    getStudioImages(locale),
    getWannados(locale),
  ]);

  return (
    <>
      <BackgroundShader />
      <SmoothScroll />
      <LoadingProvider>
        <Header />
        <main className="relative">
          <Hero />
          <About title={about.title} body={about.body} />
          <IntroVideo />
          <Gallery tattoos={tattoos} />
          <Wannados items={wannados} />
          <Studio images={studioImages} />
          <Events events={events} />
          <Contact howToBook={howToBook} />
        </main>
        <Footer />
        <HowToBook data={howToBook} />
      </LoadingProvider>
    </>
  );
}
