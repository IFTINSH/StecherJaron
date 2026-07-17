'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import type { HowToBookData } from '@/lib/data';
import BookingAccordion from './BookingAccordion';

// Persistent, site-wide "How to Book" affordance. A fixed floating pill (bottom-
// right) opens a panel with the booking guidance, grouped into clear sections.
export default function HowToBook({ data }: { data: HowToBookData }) {
  const howToBook = data;
  const t = useTranslations('howtobook');
  const [open, setOpen] = useState(false);
  // Which section is expanded; starts fully collapsed so the panel isn't a wall
  // of text — same collapsed pattern as the Contact section.
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    // Other components (e.g. "Alle Details" in the Contact section) can open the panel.
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('howtobook:open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('howtobook:open', onOpen);
    };
  }, []);

  // Lock background scroll while the panel is open (same pattern as Lightbox).
  // Hiding body overflow also removes the scrollable range, so Lenis smooth-scroll
  // has nothing to move — the page behind stays put on desktop and mobile.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[120] flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-5 py-3 font-display text-xs uppercase tracking-brand text-white backdrop-blur-md transition-colors hover:border-white hover:bg-black"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        How to Book
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm md:items-center md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={howToBook.title}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-white/10 bg-surface p-7 md:rounded-2xl md:p-10"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-5 top-5 text-white/70 transition-colors hover:text-white"
                aria-label={t('close')}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <h3 className="font-display text-3xl uppercase tracking-brand text-white" style={{ fontWeight: 300 }}>
                {howToBook.title}
              </h3>

              <div className="mt-8">
                <BookingAccordion sections={howToBook.sections} openIdx={openIdx} setOpenIdx={setOpenIdx} />
              </div>

              <a
                href={howToBook.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-display text-xs uppercase tracking-brand text-black transition-opacity hover:opacity-85"
              >
                {howToBook.ctaLabel}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
