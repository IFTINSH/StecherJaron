'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { howToBook } from '@/lib/content';

// Persistent, site-wide "How to Book" affordance. A fixed pill (bottom-left)
// opens a panel with the booking steps + Jaron's booking note + an Instagram CTA.
export default function HowToBook() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-[120] flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-5 py-3 font-display text-xs uppercase tracking-brand text-white backdrop-blur-md transition-colors hover:border-white hover:bg-black"
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
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-white/10 bg-[#0a0a0a] p-7 md:rounded-2xl md:p-10"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-5 top-5 text-white/60 transition-colors hover:text-white"
                aria-label="Schließen"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <h3 className="font-display text-3xl uppercase tracking-brand text-white" style={{ fontWeight: 300 }}>
                {howToBook.title}
              </h3>
              <p className="mt-4 max-w-lg font-light leading-relaxed text-[#bbb]">
                {howToBook.intro}
              </p>

              <div className="mt-7 grid gap-8 md:grid-cols-2">
                <ol className="space-y-4">
                  {howToBook.steps.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-display text-sm text-[#666]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-light leading-relaxed text-white/90">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-black">
                  <Image
                    src={howToBook.image}
                    alt="Booking-Hinweis von Stecher Jaron"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-contain"
                  />
                </div>
              </div>

              <a
                href={howToBook.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-display text-xs uppercase tracking-brand text-black transition-opacity hover:opacity-85"
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
