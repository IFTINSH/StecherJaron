'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { onLenisScroll } from './lenisStore';

// Image that gently "scrolls within" its frame (parallax): the picture is a bit
// taller than its tile (which is overflow-hidden) and translates vertically as the
// tile passes through the viewport. Driven directly from scroll events (native +
// Lenis) so it works on desktop smooth-scroll, not just native mobile scroll.
const MAG = 11; // % parallax travel each direction

interface Props {
  src: string;
  alt: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
  /** classes for the <img> (e.g. object-cover + hover scale) */
  className?: string;
  /** parallax travel each direction, in %. Defaults to the site standard. */
  magnitude?: number;
}

export default function ParallaxImage({ src, alt, sizes, loading, className, magnitude = MAG }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const y = useMotionValue('0%');

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the tile's top enters at the viewport bottom, 1 when its bottom
      // leaves at the viewport top.
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.min(1, Math.max(0, progress));
      y.set(`${(0.5 - clamped) * 2 * magnitude}%`);
    };

    update();
    const offLenis = onLenisScroll(update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      offLenis();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [reduce, y, magnitude]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-x-0 -inset-y-[16%]"
        style={{ y, willChange: 'transform' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={loading}
          className={cn('object-cover', className)}
        />
      </motion.div>
    </div>
  );
}
