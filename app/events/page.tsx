import type { Metadata } from 'next';
import { getEvents, getHowToBook } from '@/lib/data';
import BackgroundShader from '@/components/BackgroundShader';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import EventCard from '@/components/EventCard';
import HowToBook from '@/components/HowToBook';
import Footer from '@/components/Footer';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Events',
  description: 'Alle Events von Stecher Jaron — Flashdays, Conventions und mehr.',
};

// The full events overview — the "Alle ansehen" target of the mobile Events
// preview. Same page skeleton as /portfolio and /atelier.
export default async function EventsPage() {
  const [events, howToBook] = await Promise.all([getEvents(), getHowToBook()]);

  return (
    <>
      <BackgroundShader />
      <Header />
      <main className="relative z-10 min-h-dvh px-6 pb-28 pt-28 md:px-12">
        <div className="mx-auto max-w-[1800px]">
          <BackButton label="← Zurück" fallbackHref="/#events" />

          <header className="mt-8 border-b border-line pb-8">
            <h1
              className="font-display text-4xl uppercase tracking-brand text-white md:text-6xl"
              style={{ fontWeight: 300 }}
            >
              Events
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
