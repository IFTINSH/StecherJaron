'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { site } from '@/lib/content';
import type { HowToBookData } from '@/lib/data';
import BookingAccordion from './BookingAccordion';
import MapPreview from './MapPreview';

// Contact = the page's closing beat: booking + address under one heading.
// Desktop: two columns — address + map left, the "So läuft's" accordion right.
// Mobile: address + map first, then the same accordion stacked below. Both use
// the identical collapsed How-to-Book content + Instagram CTA.
export default function Contact({ howToBook }: { howToBook: HowToBookData }) {
  // Separate state per breakpoint (both layouts live in the DOM at once).
  // Both start fully collapsed on desktop and mobile.
  const [openDesktop, setOpenDesktop] = useState<number | null>(null);
  const [openMobile, setOpenMobile] = useState<number | null>(null);

  return (
    <section id="contact" className="relative z-10 px-6 pb-14 pt-24 md:px-12 md:pb-16 md:pt-32">
      <div className="mx-auto max-w-[1800px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center font-display text-4xl uppercase tracking-brand text-white/90 md:text-7xl"
          style={{ fontWeight: 300 }}
        >
          Kontakt
        </motion.h2>

        {/* ── Desktop: address hugs the left, booking hugs the right, a subtle
             full-height hairline splits the wide middle so it doesn't read empty. ── */}
        <div className="mt-16 hidden items-stretch gap-x-16 md:grid md:grid-cols-[1fr_1px_1fr] lg:gap-x-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-full max-w-xl justify-self-center"
          >
            <span className="mb-3 block font-display text-xs uppercase tracking-brand text-secondary">
              Adresse
            </span>
            <a
              href={site.studio.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-trail text-xl font-light text-white"
            >
              {site.studio.address}
            </a>
            <MapPreview />
          </motion.div>

          {/* Subtle vertical divider filling the centre */}
          <div className="w-px self-stretch bg-line" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="w-full max-w-xl justify-self-center"
          >
            <span className="mb-4 block font-display text-xs uppercase tracking-brand text-secondary">
              Booking
            </span>
            <BookingAccordion sections={howToBook.sections} openIdx={openDesktop} setOpenIdx={setOpenDesktop} />
            <a
              href={howToBook.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-display text-xs uppercase tracking-brand text-black transition-opacity hover:opacity-85"
            >
              {howToBook.ctaLabel}
            </a>
          </motion.div>
        </div>

        {/* ── Mobile: address + map, then the same accordion + CTA ── */}
        <div className="mt-8 md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-center"
          >
            <span className="mb-3 block font-display text-xs uppercase tracking-brand text-secondary">
              Adresse
            </span>
            <a
              href={site.studio.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-trail text-lg font-light text-white"
            >
              {site.studio.address}
            </a>
            <MapPreview />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-12"
          >
            <span className="mb-4 block text-center font-display text-xs uppercase tracking-brand text-secondary">
              Booking
            </span>
            <BookingAccordion sections={howToBook.sections} openIdx={openMobile} setOpenIdx={setOpenMobile} />
            <a
              href={howToBook.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-8 flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-display text-xs uppercase tracking-brand text-black transition-opacity hover:opacity-85"
            >
              {howToBook.ctaLabel}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
