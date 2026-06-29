'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { emitLenisScroll } from './lenisStore';

export default function SmoothScroll() {
  useEffect(() => {
    // Always (re)load at the top — stop the browser from restoring the previous
    // scroll position (which often left mobile reloads parked at the Events section).
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });
    lenis.scrollTo(0, { immediate: true });
    lenis.on('scroll', emitLenisScroll);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
