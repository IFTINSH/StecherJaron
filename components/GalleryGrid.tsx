'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import Lightbox from './Lightbox';
import { cn } from '@/lib/utils';
import type { TattooItem } from '@/lib/data';

const PAGE = 12;

// The "social media feed": a filterable, paginated grid of all works with a lightbox.
// Lives on its own page (/portfolio), reached from the Portfolio preview's "Mehr anzeigen".
export default function GalleryGrid({ tattoos }: { tattoos: TattooItem[] }) {
  const [filter, setFilter] = useState<string>('Alle');
  const [visible, setVisible] = useState(PAGE);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const categories = useMemo(
    () => ['Alle', ...Array.from(new Set(tattoos.map((t) => t.style)))],
    [tattoos]
  );
  const filtered = useMemo(
    () => (filter === 'Alle' ? tattoos : tattoos.filter((t) => t.style === filter)),
    [filter, tattoos]
  );
  const shown = filtered.slice(0, visible);

  const select = (f: string) => {
    setFilter(f);
    setVisible(PAGE);
  };

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap justify-center gap-2 md:justify-start">
        {categories.map((f) => (
          <button
            key={f}
            onClick={() => select(f)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 font-display text-[11px] uppercase tracking-wordmark transition-colors duration-300',
              filter === f
                ? 'border-white bg-white text-black'
                : 'border-line text-white/70 hover:border-white hover:text-white'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((t, i) => (
            <motion.button
              key={t.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setLightbox(i)}
              className="group relative aspect-[4/5] overflow-hidden bg-surface"
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="pointer-events-none absolute bottom-3 left-3 font-display text-[10px] uppercase tracking-brand text-white/0 transition-colors duration-300 group-hover:text-white/80">
                {t.style}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible < filtered.length && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisible((v) => v + PAGE)}
            className="underline-trail font-display text-sm uppercase tracking-brand text-white"
          >
            Mehr laden
          </button>
        </div>
      )}

      {/* Shared lightbox — navigates within the currently shown (filtered) works */}
      {lightbox !== null && (
        <Lightbox
          images={shown}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onIndexChange={setLightbox}
        />
      )}
    </>
  );
}
