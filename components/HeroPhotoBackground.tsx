'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLoaded } from './LoadingProvider';
import FlowLine from './FlowLine';
import { JARON_SILHOUETTE_MOBILE, JARON_VIEWBOX_MOBILE } from './heroSilhouette';

// Jaron's portrait as the hero. Scales in on load, fades away on scroll.
// Responsive art-direction:
//  - Desktop: the 16:9 photo fills edge-to-edge; the silhouette line is overlaid
//    separately (HeroLine) in the matching .hero-stage box.
//  - Mobile: the FULL 4:3 photo is shown (nothing cropped, so the line runs all the
//    way around Jaron), anchored to the top and faded into the page at the bottom —
//    same treatment as desktop. Photo + line live in ONE box of the photo's aspect,
//    so the line stays glued to Jaron on every phone size.
const MOBILE_MASK =
  'linear-gradient(to bottom, #000 0%, #000 88%, transparent 100%)';

export default function HeroPhotoBackground() {
  const loaded = useLoaded();
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(900);

  useEffect(() => {
    const set = () => setVh(window.innerHeight || 900);
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  const opacity = useTransform(scrollY, [0, vh * 0.9], [1, 0], { clamp: true });

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{ opacity }}
    >
      {/* MOBILE: full 4:3 photo band (whole scene visible) + line, faded at bottom */}
      <motion.div
        className="absolute inset-x-0 top-[12vw] aspect-[2400/1792] md:hidden"
        style={{ WebkitMaskImage: MOBILE_MASK, maskImage: MOBILE_MASK }}
        initial={{ scale: 1.06 }}
        animate={loaded ? { scale: 1 } : { scale: 1.06 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
      >
        <Image
          src="/hero/hero-4x3.jpeg"
          alt="Stecher Jaron"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* scrim dims the photo (legible wordmark) but sits BELOW the line */}
        <div className="absolute inset-0 bg-black/40" />
        <FlowLine
          path={JARON_SILHOUETTE_MOBILE}
          viewBox={JARON_VIEWBOX_MOBILE}
          preserveAspectRatio="none"
          // mobile viewBox scales DOWN to phone width (~0.67×) vs desktop UP (~2.15×),
          // so it needs a heavier width to read on screen — but kept a touch under
          // full desktop-match so the line stays fine and refined ("edel"), not chunky.
          weight={2.1}
        />
      </motion.div>

      {/* DESKTOP: 16:9 fills edge-to-edge; on a 16:9 screen nothing is cropped */}
      <motion.div
        className="absolute inset-0 hidden md:block"
        initial={{ scale: 1.06 }}
        animate={loaded ? { scale: 1 } : { scale: 1.06 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
      >
        <Image
          src="/hero/hero-16x9.jpeg"
          alt="Stecher Jaron"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: '50% 50%' }}
        />
      </motion.div>

      {/* desktop readability scrim (mobile has its own inside the band) */}
      <div className="absolute inset-0 hidden bg-black/40 md:block" />
    </motion.div>
  );
}
