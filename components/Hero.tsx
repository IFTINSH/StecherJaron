'use client';

import { motion } from 'motion/react';
import { useLoaded } from './LoadingProvider';
import { site } from '@/lib/content';
import HeroPhotoBackground from './HeroPhotoBackground';
import HeroLine from './HeroLine';

// Hero is ONE stage: the full-bleed photo, the silhouette line and the wordmark
// are stacked layers inside this section. The photo fades on scroll as the whole
// stage scrolls away.
export default function Hero() {
  const loaded = useLoaded();

  return (
    <section id="top" className="relative h-[100vw] w-full overflow-hidden md:h-[100svh]">
      {/* Photo + line stage. Mobile: full-bleed (inset-0). Desktop (.hero-stage):
          the full 16:9 image at the same scale/position as the cover crop, but its
          bottom isn't clipped — the previously cut-off bottom shows below the fold
          and fades out (mask) for a seamless transition. Top/left/right unchanged. */}
      <div className="absolute inset-0 hero-stage">
        <HeroPhotoBackground />
        <HeroLine />
      </div>
      {/* ---------- corner wordmark: top right ---------- */}
      <motion.div
        className="absolute right-6 top-24 z-10 text-right md:right-12 md:top-28"
        initial={{ opacity: 0, y: -10 }}
        animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1
          className="font-display text-2xl uppercase leading-[1.05] tracking-wordmark text-white md:text-4xl"
          style={{ fontWeight: 300 }}
        >
          Stecher
          <br />
          Jaron
        </h1>
        <p className="mt-3 font-display text-[10px] uppercase tracking-brand text-white/60 md:text-xs">
          {site.tagline}
        </p>
      </motion.div>

    </section>
  );
}
