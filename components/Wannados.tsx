'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Lightbox from './Lightbox';
import type { WannadoItem } from '@/lib/data';

// Wannados — the "flash wall": designs Jaron wants to tattoo, clients pick one.
// A horizontal row of frameless flash sheets on the black ground (soft shadow
// for depth) that you drag / swipe / arrow through.
//
// Mobile: a centred, ENDLESS carousel — the sheets are rendered three times and
// the scroll position is silently recentred into the middle copy, so swiping
// left past the first sheet reveals the last (no dead ends, no empty gutter).
// Desktop: five sheets in the section's gutter, a plain left-aligned strip that
// stops at the ends (arrows disable there). Only the middle copy is exposed to
// screen readers / keyboard; the clones are inert.
export default function Wannados({ items }: { items: WannadoItem[] }) {
  const t = useTranslations();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [loop, setLoop] = useState(false); // endless carousel — mobile only
  // Gesture state — only used to tell a tap (opens lightbox) from a swipe/scroll.
  const gesture = useRef({ active: false, startX: 0, startY: 0, moved: false });
  const raf = useRef(0);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const n = items.length;

  // The endless loop is mobile-only; desktop keeps a plain bounded strip.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setLoop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // One scroll "step" = sheet width + gap. Constant for every sheet, so a whole
  // copy of the strip is n*step wide and every snap position is a step multiple.
  const stepOf = (el: HTMLDivElement) => {
    const first = el.querySelector<HTMLElement>('[data-sheet]');
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
    return first.offsetWidth + gap;
  };

  // Active = which real sheet sits at the current snap position.
  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el || n === 0) return;
    const step = stepOf(el);
    if (!step) return;
    const idx = Math.round(el.scrollLeft / step);
    if (loop) {
      setActive(((idx % n) + n) % n);
    } else {
      const maxScroll = el.scrollWidth - el.clientWidth;
      let i = idx;
      if (el.scrollLeft >= maxScroll - 2) i = n - 1; // pin last at the end
      setActive(Math.max(0, Math.min(n - 1, i)));
    }
  }, [n, loop]);

  // Mobile loop only: keep the viewport in the middle copy. If it drifts into
  // the first or third copy, jump by one copy width — the jump lands on the same
  // sheet, so it's invisible, which is what makes the strip feel endless.
  const recenter = useCallback(() => {
    const el = trackRef.current;
    if (!el || n === 0 || !loop) return;
    const step = stepOf(el);
    if (!step) return;
    const idx = Math.round(el.scrollLeft / step);
    if (idx < n) el.scrollLeft += n * step;
    else if (idx >= 2 * n) el.scrollLeft -= n * step;
  }, [n, loop]);

  // Position on mount / breakpoint change: mobile starts in the middle copy (so
  // there's a full copy of buffer each side); desktop at the first sheet.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || n === 0) return;
    const step = stepOf(el);
    if (step) el.scrollLeft = loop ? n * step : 0;
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, n, loop]);

  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(measure);
    if (loop) {
      if (idle.current) clearTimeout(idle.current);
      idle.current = setTimeout(recenter, 120); // recentre once the scroll settles
    }
  };

  // Arrow buttons (desktop only — mobile navigates by swipe). Bounded: reads the
  // live scroll position and scrolls to an absolute, clamped target so rapid
  // double-clicks can't stack past the ends.
  const nudge = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = stepOf(el);
    if (!step) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const current = Math.round(el.scrollLeft / step);
    const target = Math.max(0, Math.min(n - 1, current + dir));
    el.scrollTo({ left: Math.min(target * step, maxScroll), behavior: 'smooth' });
  };

  // Horizontal paging and vertical page-scroll are handled NATIVELY by the
  // scroll container (scroll-snap). We only track whether the pointer moved
  // (a swipe/scroll) so a swipe doesn't also open the lightbox.
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

  const copies = loop ? [0, 1, 2] : [1];

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

        {/* The wall. Mobile: full-bleed and centre-snapped so the active sheet
            sits mid-screen with a symmetric peek, looping endlessly. Desktop:
            back in the gutter, five across, left-aligned, bounded. */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endGesture}
          onPointerCancel={endGesture}
          className="mt-10 -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-[18vw] select-none md:mx-0 md:mt-14 md:px-0 [-webkit-touch-callout:none] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {copies.flatMap((copy) =>
            items.map((sheet, i) => (
              <button
                key={`${sheet.id}-c${copy}`}
                data-sheet
                type="button"
                onClick={() => openSheet(i)}
                aria-hidden={copy !== 1}
                tabIndex={copy === 1 ? 0 : -1}
                aria-label={t('wannados.enlargeSheet', { label: sheet.label })}
                className="w-[64vw] flex-shrink-0 snap-center snap-always select-none md:w-[calc((100%-6rem)/5)] md:snap-start"
              >
                <div>
                  <Image
                    src={sheet.src}
                    alt={sheet.alt}
                    width={sheet.w}
                    height={sheet.h}
                    sizes="(max-width: 768px) 64vw, 340px"
                    loading="lazy"
                    draggable={false}
                    className="pointer-events-none block h-auto w-full select-none shadow-[0_24px_50px_-24px_rgba(0,0,0,0.9)] [-webkit-touch-callout:none] [-webkit-user-drag:none]"
                  />
                  <span className="block pt-3 text-center font-display text-xs uppercase tracking-wordmark text-muted">
                    {sheet.label}
                  </span>
                </div>
              </button>
            )),
          )}
        </div>

        {/* Index + arrows — arrows only from md up (mobile navigates by swipe);
            the segment line stays as the position indicator on all sizes. On
            desktop the strip is bounded, so the arrows disable at the ends. */}
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
          {/* Segment line — one bar per sheet, the active one wider and white. */}
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
