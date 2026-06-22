import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { events, getEvent } from '@/lib/content';
import BackgroundShader from '@/components/BackgroundShader';
import BackButton from '@/components/BackButton';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ev = getEvent(slug);
  if (!ev) return { title: 'Event' };
  return {
    title: ev.title,
    description: ev.description ?? `${ev.title} — Stecher Jaron`,
    openGraph: { title: ev.title, images: [ev.cover] },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ev = getEvent(slug);
  if (!ev) notFound();

  return (
    <>
      <BackgroundShader />
      <main className="relative z-10 min-h-dvh px-6 pb-28 pt-28 md:px-12">
        <div className="mx-auto max-w-[1500px]">
          <BackButton />

          <header className="mt-8 border-b border-[#1a1a1a] pb-8">
            <h1
              className="font-display text-4xl uppercase tracking-brand text-white md:text-6xl"
              style={{ fontWeight: 300 }}
            >
              {ev.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-display text-xs uppercase tracking-brand text-[#777]">
              {ev.date && <span>{ev.date}</span>}
              {ev.location && <span>{ev.location}</span>}
            </div>
            {ev.description && (
              <p className="mt-6 max-w-2xl font-light leading-relaxed text-[#bbb]">
                {ev.description}
              </p>
            )}
          </header>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {ev.media.map((m, i) =>
              m.type === 'video' ? (
                <video
                  key={i}
                  src={m.src}
                  controls
                  playsInline
                  className="aspect-[4/3] w-full bg-[#0a0a0a] object-cover"
                />
              ) : (
                <div
                  key={i}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a]"
                >
                  <Image
                    src={m.src}
                    alt={m.alt ?? ev.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
