'use client';

import { motion } from 'motion/react';
import EventCard from './EventCard';
import { SeeAllTile } from './GalleryPreview';
import type { EventItem } from '@/lib/data';

// Events overview — desktop shows the full grid (Chris-Foy /all style); mobile
// shows the newest three plus an "Alle ansehen" tile that opens /events (same
// pattern as the Portfolio/Studio previews). Each tile links to its event page.
export default function Events({ events }: { events: EventItem[] }) {
  // events arrive sorted newest-first (see lib/data)
  const newest = events.slice(0, 3);
  const mini = events.slice(3, 7).map((ev) => ({ key: ev.slug, src: ev.cover, alt: ev.title }));
  const remaining = Math.max(events.length - newest.length, 0);
  const showSeeAll = remaining > 0 && mini.length > 0;

  return (
    <section id="events" className="relative z-10 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1800px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center font-display text-4xl uppercase tracking-brand text-white/90 md:text-left md:text-7xl"
          style={{ fontWeight: 300 }}
        >
          Events
        </motion.h2>

        {/* ── Mobile: newest three + "Alle ansehen" tile → /events ── */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:hidden">
          {newest.map((ev) => (
            <EventCard key={ev.slug} event={ev} />
          ))}

          {showSeeAll && (
            <SeeAllTile
              mini={mini}
              remaining={remaining}
              href="/events"
              vertical={false}
              className="aspect-[4/3] w-full"
            />
          )}
        </div>

        {/* ── Desktop: full grid (unchanged) ── */}
        <div className="mt-12 hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3">
          {events.map((ev, i) => (
            <EventCard key={ev.slug} event={ev} delay={(i % 3) * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
