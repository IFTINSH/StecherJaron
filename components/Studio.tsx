'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import GalleryPreview, { type PreviewItem } from './GalleryPreview';
import Lightbox from './Lightbox';
import { site } from '@/lib/content';
import type { StudioImageItem } from '@/lib/data';

// Heading + address, then the editorial preview (a few photos + an "Alle ansehen"
// tile). The full grid lives on its own page (/atelier), reached from the See-All
// tile — same pattern as Portfolio. Photos come from Sanity (lib/data).
export default function Studio({ images }: { images: StudioImageItem[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const t = useTranslations();

  const items: PreviewItem[] = images.map((img) => ({
    key: img.id,
    src: img.src,
    alt: img.alt,
  }));

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
          {t('sections.studio')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-12 text-center md:mt-10 md:text-left"
        >
          <span className="block font-display text-xs uppercase tracking-brand text-secondary">
            {t('studioSection.address')}
          </span>
          <a
            href={site.studio.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-trail mt-2 inline-block font-display text-lg uppercase tracking-wordmark text-white"
          >
            {site.studio.address}
          </a>
        </motion.div>

        {/* Editorial preview — a few photos + "Alle ansehen" → /atelier */}
        <div className="mt-12">
          <GalleryPreview items={items} href="/atelier" onOpenLightbox={setLightbox} />
        </div>
      </div>

      {/* Preview lightbox shows ONLY the tapped photo (no browsing) — seeing all
          photos goes through the "Alle ansehen" page. */}
      {lightbox !== null && items[lightbox] && (
        <Lightbox
          images={[items[lightbox]]}
          index={0}
          onClose={() => setLightbox(null)}
          onIndexChange={() => {}}
        />
      )}
    </section>
  );
}
