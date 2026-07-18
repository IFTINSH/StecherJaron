'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Lightbox from './Lightbox';
import type { WannadoItem } from '@/lib/data';

// Wannados — the "flash wall": designs Jaron wants to tattoo, clients pick one.
// A horizontal, left-aligned row of the flash sheets on the black ground that
// you drag / swipe / arrow through — the drawings sit straight and frameless
// (no paper mat, just a soft shadow for depth) so they stand on their own.
// Sits in the same gutter/container as Portfolio & Studio (mobile centred,
// desktop left) so it reads as one of the site's sections, not a floating widget.
// Only a couple of sheets show at once, so it scales to any number. Click a sheet
// to open it full-size in the shared lightbox.
export default function Wannados({ items }: { items: WannadoItem[] }) {
  const t = useTranslations();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  // Gesture state — only used to tell a tap (opens lightbox) from a swipe/scroll.
  // The actual paging is the browser's native horizontal scroll-snap (see the wall).
  const gesture = useRef({ active: false, startX: 0, startY: 0, moved: false });
  const raf = useRef(0);

  // Index of the sheet at the current reading position (left edge of the strip).
  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('[data-sheet]');
    if (!first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
    const step = first.offsetWidth + gap;
    const maxScroll = el.scrollWidth - el.clientWidth;
    let i = Math.round(el.scrollLeft / step);
    if (el.scrollLeft >= maxScroll - 2) i = items.length - 1; // pin last at the end
    setActive(Math.max(0, Math.min(items.length - 1, i)));
  }, [items.length]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(measure);
  };

  // Nudge by one sheet (arrow buttons). Reads the LIVE scroll position and scrolls to
  // an absolute, clamped target — so rapid double-clicks can't stack past the ends
  // (the `active` state lags behind the smooth-scroll animation and can't be trusted).
  const nudge = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const sheet = el.querySelector<HTMLElement>('[data-sheet]');
    if (!sheet) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
    const step = sheet.offsetWidth + gap;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const current = Math.round(el.scrollLeft / step);
    const target = Math.max(0, Math.min(items.length - 1, current + dir));
    el.scrollTo({ left: Math.min(target * step, maxScroll), behavior: 'smooth' });
  };

  // Horizontal paging and vertical page-scroll are handled NATIVELY by the scroll
  // container (scroll-snap) — the browser axis-locks the gesture, so it's smooth and
  // never gets "stuck". We only track whether the pointer moved (a swipe/scroll) so
  // it doesn't also open the lightbox.
  const onPointerDown = (e: React.PointerEvent) => {
    gesture.current = { active: true, startX: e.clientX, startY: e.clientY, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const g = gesture.current;
    if (!g.active) return;
    if (Math.abs(e.clientX - g.startX) > 10 || Math.abs(e.clientY - g.startY) > 10) {
      g.moved = true;
    }
  };
  const endGesture = () => {
    gesture.current.active = false;
  };

  const openSheet = (i: number) => {
    // A swipe/scroll (not a tap) shouldn't also open the lightbox.
    if (gesture.current.moved) return;
    setLightbox(i);
  };

  return (
    <section id="wannados" className="relative z-10 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1800px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center font-display text-4xl uppercase tracking-brand text-white/90 md:text-left md:text-7xl"
          style={{ fontWeight: 300 }}
        >
          {t('sections.wannados')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto mt-6 max-w-[42ch] text-center text-secondary md:mx-0 md:mt-8 md:text-left"
        >
          {t('wannados.subtitle')}
        </motion.p>

        {/* The wall — left-aligned strip; first sheet flush with the gutter, peeks right.
            Sheets are frameless and straight; a soft shadow lifts each off the black. */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endGesture}
          onPointerCancel={endGesture}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain select-none md:mt-14 [-webkit-touch-callout:none] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((sheet, i) => (
            <button
              key={sheet.id}
              data-sheet
              type="button"
              onClick={() => openSheet(i)}
              aria-label={t('wannados.enlargeSheet', { label: sheet.label })}
              className="w-[78vw] flex-shrink-0 snap-start snap-always select-none md:w-[calc((100%-6rem)/5)]"
            >
              <div>
                <Image
                  src={sheet.src}
                  alt={sheet.alt}
                  width={sheet.w}
                  height={sheet.h}
                  sizes="(max-width: 768px) 78vw, 340px"
                  loading="lazy"
                  draggable={false}
                  className="pointer-events-none block h-auto w-full select-none shadow-[0_24px_50px_-24px_rgba(0,0,0,0.9)] [-webkit-touch-callout:none] [-webkit-user-drag:none]"
                />
                <span className="block pt-3 text-center font-display text-xs uppercase tracking-wordmark text-muted">
                  {sheet.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Index + arrows — arrows only from md up (mobile navigates by swipe);
            the index counter stays as the position indicator on all sizes. */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={active <= 0}
            aria-label={t('wannados.prevSheet')}
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white hover:text-black disabled:pointer-events-none disabled:opacity-30 md:flex"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          {/* Segment line — one bar per sheet, the active one wider and white.
              Matches the site's hairline language; replaces the numeric counter. */}
          <div
            className="flex items-center gap-2"
            role="img"
            aria-label={`${active + 1} / ${items.length}`}
          >
            {items.map((_, i) => (
              <span
                key={i}
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-7 bg-white' : 'w-3.5 bg-white/25'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={active >= items.length - 1}
            aria-label={t('wannados.nextSheet')}
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white hover:text-black disabled:pointer-events-none disabled:opacity-30 md:flex"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>
      </div>

      {lightbox !== null && items[lightbox] && (
        <Lightbox
          images={items}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onIndexChange={setLightbox}
        />
      )}
    </section>
  );
}
