'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { EventItem } from '@/lib/data';
import { formatEventDate } from '@/lib/format';

// Events overview — a grid of tiles (Chris-Foy /all style). Each tile links to
// its own event page.
export default function Events({ events }: { events: EventItem[] }) {
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

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {events.map((ev, i) => (
            <motion.div
              key={ev.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: (i % 3) * 0.06,
              }}
            >
              <Link
                href={`/events/${ev.slug}`}
                className="group block"
                aria-label={`Event ansehen: ${ev.title}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
                  <Image
                    src={ev.cover}
                    alt={ev.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-sm uppercase tracking-wordmark text-white">
                    {ev.title}
                  </h3>
                  {formatEventDate(ev.date) && (
                    <span className="font-display text-xs uppercase tracking-brand text-muted">
                      {formatEventDate(ev.date)}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
