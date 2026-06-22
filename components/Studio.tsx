'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { site, studioImages } from '@/lib/content';

// Concept A — "Editorial Sticky", compact variant.
// Desktop: sticky text panel left; photos as a multi-column masonry on the right
// (short scroll, images uncropped). Mobile: text block, then a 2-column masonry.
// Tap any photo to view it full size in a lightbox.
export default function Studio() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="studio" className="relative z-10 px-4 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        {/* Sticky text panel */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display text-5xl uppercase tracking-brand text-white/90 md:text-7xl"
              style={{ fontWeight: 300 }}
            >
              Studio
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8 space-y-6"
            >
              <p className="max-w-sm font-light leading-relaxed text-[#bbb]">
                Ein ruhiger, privater Raum im Herzen von Passau — Platz für
                Konzentration, gute Gespräche und saubere Arbeit.
              </p>

              <div>
                <span className="font-display text-xs uppercase tracking-brand text-[#666]">
                  Adresse
                </span>
                <a
                  href={site.studio.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-trail mt-2 block font-display text-lg uppercase tracking-wordmark text-white"
                >
                  {site.studio.address}
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Masonry photo grid */}
        <div className="columns-2 gap-3 md:col-span-8 lg:columns-3 [&>*]:mb-3">
          {studioImages.map((img) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setLightbox(img.src)}
              className="group block w-full overflow-hidden break-inside-avoid bg-[#0a0a0a]"
              aria-label="Foto vergrößern"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
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
