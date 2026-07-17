'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import GalleryPreview, { type PreviewItem } from './GalleryPreview';
import Lightbox from './Lightbox';
import type { TattooItem } from '@/lib/data';

// Homepage Portfolio section: the editorial "Galerie" preview (feature works +
// an "Alle ansehen" tile); the tile opens the full social-media feed on its own page.
export default function Gallery({ tattoos }: { tattoos: TattooItem[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const t = useTranslations('sections');

  const items: PreviewItem[] = tattoos.map((t) => ({
    key: t.id,
    src: t.src,
    alt: t.alt,
    label: t.style,
  }));

  return (
    <section id="work" className="relative z-10 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-8"
        >
          <h2
            className="text-center font-display text-4xl uppercase tracking-brand text-white/90 md:text-left md:text-7xl"
            style={{ fontWeight: 300 }}
          >
            {t('portfolio')}
          </h2>
        </motion.div>

        {/* Editorial preview — full width */}
        <GalleryPreview items={items} href="/portfolio" onOpenLightbox={setLightbox} />
      </div>

      {/* Preview lightbox shows ONLY the tapped work (no browsing) — seeing all
          works goes through the "Alle ansehen" page. */}
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
