import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getEvent, getEventSlugs, getHowToBook } from '@/lib/data';
import { formatEventDate } from '@/lib/format';
import BackgroundShader from '@/components/BackgroundShader';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import HowToBook from '@/components/HowToBook';
import Footer from '@/components/Footer';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ev = await getEvent(slug);
  if (!ev) return { title: 'Event' };
  return {
    title: ev.title,
    description: ev.description ?? `${ev.title} — Stecher Jaron`,
    alternates: { canonical: `/events/${slug}` },
    openGraph: { title: ev.title, images: ev.cover ? [ev.cover] : [] },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [ev, howToBook] = await Promise.all([getEvent(slug), getHowToBook()]);
  if (!ev) notFound();

  // Show the gallery images; fall back to the cover if no extra images exist.
  const images = ev.images.length > 0 ? ev.images : ev.cover ? [ev.cover] : [];

  return (
    <>
      <BackgroundShader />
      <Header />
      <main className="relative z-10 min-h-dvh px-6 pb-28 pt-28 md:px-12">
        <div className="mx-auto max-w-[1500px]">
          <BackButton />

          <header className="mt-8 border-b border-line pb-8">
            <h1
              className="font-display text-4xl uppercase tracking-brand text-white md:text-6xl"
              style={{ fontWeight: 300 }}
            >
              {ev.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-display text-xs uppercase tracking-brand text-muted">
              {formatEventDate(ev.date) && <span>{formatEventDate(ev.date)}</span>}
              {ev.location && <span>{ev.location}</span>}
            </div>
            {ev.description && (
              <p className="mt-6 max-w-2xl font-light leading-relaxed text-body">
                {ev.description}
              </p>
            )}
          </header>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {images.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] w-full overflow-hidden bg-surface"
              >
                <Image
                  src={src}
                  alt={ev.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <HowToBook data={howToBook} />
    </>
  );
}
