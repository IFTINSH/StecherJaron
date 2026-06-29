'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import HeroPattern from './HeroPattern';
import { useLoaded } from './LoadingProvider';

// Row of three (static) figures: the group turns horizontal -> vertical
// (0 -> 90deg), shrinks (0.85) and fades (0.4) on scroll, then clamps (static).
export default function PatternBackground() {
  const loaded = useLoaded();
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(900);

  useEffect(() => {
    const set = () => setVh(window.innerHeight || 900);
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  const rotate = useTransform(scrollY, [0, vh], [0, 90], { clamp: true });
  const scale = useTransform(scrollY, [0, vh], [1, 0.85], { clamp: true });
  const opacity = useTransform(scrollY, [0, vh], [1, 0.4], { clamp: true });

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* centred so all three figures stay fully visible */}
      <div>
        {/* scroll-driven turn + shrink + fade */}
        <motion.div style={{ rotate, scale, opacity }}>
          {/* load entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          >
            <HeroPattern />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
