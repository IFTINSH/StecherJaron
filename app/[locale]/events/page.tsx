import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getEvents, getHowToBook } from '@/lib/data';
import type { Locale } from '@/lib/i18n/routing';
import BackgroundShader from '@/components/BackgroundShader';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import EventCard from '@/components/EventCard';
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
    title: t('eventsTitle'),
    description: t('eventsDescription'),
    alternates: {
      canonical: isDe ? '/events' : '/en/events',
      languages: { 'de-DE': '/events', 'en-US': '/en/events', 'x-default': '/events' },
    },
  };
}

// The full events overview — the "Alle ansehen" target of the mobile Events
// preview. Same page skeleton as /portfolio and /atelier.
export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const [events, howToBook] = await Promise.all([getEvents(locale), getHowToBook(locale)]);

  return (
    <>
      <BackgroundShader />
      <Header />
      <main className="relative z-10 min-h-dvh px-6 pb-28 pt-28 md:px-12">
        <div className="mx-auto max-w-[1800px]">
          <BackButton label={t('common.back')} fallbackHref="/#events" />

          <header className="mt-8 border-b border-line pb-8">
            <h1
              className="font-display text-4xl uppercase tracking-brand text-white md:text-6xl"
              style={{ fontWeight: 300 }}
            >
              {t('sections.events')}
            </h1>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {events.map((ev, i) => (
              <EventCard key={ev.slug} event={ev} delay={(i % 3) * 0.06} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <HowToBook data={howToBook} />
    </>
  );
}
