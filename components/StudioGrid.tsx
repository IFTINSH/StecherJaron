'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import Lightbox from './Lightbox';
import { studioImages } from '@/lib/content';

// The full studio photo grid with a lightbox — the "Alle ansehen" view reached from
// the Studio preview. Uniform 4:5 tiles, static images (no parallax), same look the
// Studio section used to have inline.
export default function StudioGrid() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {studioImages.map((img, i) => (
          <motion.button
            key={img.src}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => setLightbox(i)}
            className="group relative aspect-[4/5] overflow-hidden bg-surface"
            aria-label="Foto vergrößern"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.button>
        ))}
      </div>

      {/* Shared lightbox — navigates through all studio photos */}
      {lightbox !== null && (
        <Lightbox
          images={studioImages}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onIndexChange={setLightbox}
        />
      )}
    </>
  );
}
