'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { tattoos, tattooStyles, type TattooStyle } from '@/lib/content';
import { cn } from '@/lib/utils';

type Filter = 'Alle' | TattooStyle;
const PAGE = 6;

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('Alle');
  const [visible, setVisible] = useState(PAGE);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === 'Alle' ? tattoos : tattoos.filter((t) => t.style === filter)),
    [filter]
  );
  const shown = filtered.slice(0, visible);

  const select = (f: Filter) => {
    setFilter(f);
    setVisible(PAGE);
  };

  return (
    <section id="work" className="relative z-10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1800px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center font-display text-4xl uppercase tracking-brand text-white/90 md:text-7xl"
          style={{ fontWeight: 300 }}
        >
          Portfolio
        </motion.h2>

        {/* Filter bar */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {(['Alle', ...tattooStyles] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => select(f)}
              className={cn(
                'rounded-full border px-5 py-2 font-display text-xs uppercase tracking-brand transition-colors duration-300',
                filter === f
                  ? 'border-white bg-white text-black'
                  : 'border-[#333] text-white/70 hover:border-white hover:text-white'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {shown.map((t) => (
              <motion.button
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={() => setLightbox(t.src)}
                className="group relative aspect-[4/5] overflow-hidden bg-[#0a0a0a]"
              >
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="animate-lightbox-bg fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt=""
            className="animate-lightbox-img max-h-[90vh] max-w-[92vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 text-white/70 transition-colors hover:text-white"
            aria-label="Schließen"
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
