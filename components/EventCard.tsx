'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import type { EventItem } from '@/lib/data';
import { formatEventDate } from '@/lib/format';
import type { Locale } from '@/lib/i18n/routing';

// One event tile (cover + title/date row) linking to its detail page.
// Used by the homepage Events section and the /events overview page.
export default function EventCard({ event, delay = 0 }: { event: EventItem; delay?: number }) {
  const t = useTranslations('events');
  const locale = useLocale() as Locale;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      <Link
        href={`/events/${event.slug}`}
        className="group block"
        aria-label={t('view', { title: event.title })}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
          <Image
            src={event.cover}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-sm uppercase tracking-wordmark text-white">
            {event.title}
          </h3>
          {formatEventDate(event.date, locale) && (
            <span className="font-display text-xs uppercase tracking-brand text-muted">
              {formatEventDate(event.date, locale)}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
