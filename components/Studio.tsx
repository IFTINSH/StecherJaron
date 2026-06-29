'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import ParallaxImage from './ParallaxImage';
import { site, studioImages } from '@/lib/content';

// Heading on top, then the text + address, then a uniform photo grid (same look as
// Portfolio) — clean and consistent. Tap any photo to open the lightbox.
export default function Studio() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="studio" className="relative z-10 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1800px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center font-display text-4xl uppercase tracking-brand text-white/90 md:text-left md:text-7xl"
          style={{ fontWeight: 300 }}
        >
          Studio
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 flex flex-col items-center gap-6 text-center md:mt-10 md:flex-row md:items-end md:justify-between md:text-left"
        >
          <p className="max-w-md font-light leading-relaxed text-body">
            Ein ruhiger, privater Raum im Herzen von Passau — Platz für
            Konzentration, gute Gespräche und saubere Arbeit.
          </p>

          <div className="shrink-0">
            <span className="font-display text-xs uppercase tracking-brand text-secondary">
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

        {/* Uniform photo grid — same look as Portfolio */}
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {studioImages.map((img) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setLightbox(img.src)}
              className="group relative aspect-[4/5] overflow-hidden bg-surface"
              aria-label="Foto vergrößern"
            >
              <ParallaxImage
                src={img.src}
                alt={img.alt}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
                className="transition-transform duration-700 ease-out group-hover:scale-105"
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
