'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import EventCard from './EventCard';
import type { EventItem } from '@/lib/data';

const MOBILE_PAGE = 3;
const DESKTOP_PAGE = 6; // two rows of three on lg — keeps the grid from getting overwhelming

// Events overview — both mobile and desktop start with the newest few and reveal
// more in place via "Weitere laden" (same pattern as the portfolio feed's
// "Mehr laden"), so a growing event list never floods the section. Mobile shows
// three at a time, desktop six. Each tile links to its event page.
export default function Events({ events }: { events: EventItem[] }) {
  // events arrive sorted newest-first (see lib/data)
  const [visible, setVisible] = useState(MOBILE_PAGE);
  const [desktopVisible, setDesktopVisible] = useState(DESKTOP_PAGE);
  const t = useTranslations();

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
          {t('sections.events')}
        </motion.h2>

        {/* ── Mobile: newest first, more revealed in place ── */}
        <div className="md:hidden">
          <div className="mt-12 md:mt-14 grid grid-cols-1 gap-8">
            {events.slice(0, visible).map((ev) => (
              <EventCard key={ev.slug} event={ev} />
            ))}
          </div>

          {visible < events.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisible((v) => v + MOBILE_PAGE)}
                className="underline-trail font-display text-sm uppercase tracking-brand text-white"
              >
                {t('events.loadMore')}
              </button>
            </div>
          )}
        </div>

        {/* ── Desktop: paged grid, more revealed in place ── */}
        <div className="hidden md:block">
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-3">
            {events.slice(0, desktopVisible).map((ev, i) => (
              <EventCard key={ev.slug} event={ev} delay={(i % 3) * 0.06} />
            ))}
          </div>

          {desktopVisible < events.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setDesktopVisible((v) => v + DESKTOP_PAGE)}
                className="underline-trail font-display text-sm uppercase tracking-brand text-white"
              >
                {t('events.loadMore')}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
