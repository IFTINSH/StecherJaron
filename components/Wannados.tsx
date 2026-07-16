'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import Lightbox from './Lightbox';
import type { WannadoItem } from '@/lib/data';

// Wannados — the "flash wall": designs Jaron wants to tattoo, clients pick one.
// A horizontal, left-aligned row of white "paper" sheets on the black ground that
// you drag / swipe / arrow through — like flipping the flash binder on the studio
// wall. Sits in the same gutter/container as Portfolio & Studio (mobile centred,
// desktop left) so it reads as one of the site's sections, not a floating widget.
// Only a couple of sheets show at once, so it scales to any number. Click a sheet
// to open it full-size in the shared lightbox.
export default function Wannados({ items }: { items: WannadoItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  // Pointer-drag state (desktop mouse only — touch uses native scroll + snap).
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });
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

  // Nudge by one sheet (arrow buttons).
  const nudge = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const sheet = el.querySelector<HTMLElement>('[data-sheet]');
    if (!sheet) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
    el.scrollBy({ left: dir * (sheet.offsetWidth + gap), behavior: 'smooth' });
  };

  // Mouse drag-to-scroll. Touch is left to the native scroller so snap + momentum
  // feel right on phones (the priority surface).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;
    el.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  const openSheet = (i: number) => {
    // A drag shouldn't also open the lightbox.
    if (drag.current.moved) return;
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
          Wannados
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto mt-6 max-w-[42ch] text-center text-secondary md:mx-0 md:mt-8 md:text-left"
        >
          Designs, die ich gerne stechen möchte — such dir eins aus.
        </motion.p>

        {/* The wall — left-aligned strip; first sheet flush with the gutter, peeks right */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain md:mt-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ cursor: 'grab' }}
        >
          {items.map((sheet, i) => (
            <button
              key={sheet.id}
              data-sheet
              type="button"
              onClick={() => openSheet(i)}
              aria-label={`${sheet.label} vergrößern`}
              className="w-[78vw] flex-shrink-0 snap-start select-none md:w-[calc((100%-6rem)/5)]"
            >
              <div
                className="bg-[#f6f4ef] p-3 md:p-4"
                style={{
                  transform: `rotate(${i % 2 === 0 ? -0.8 : 0.8}deg)`,
                  boxShadow: '0 30px 60px -20px rgba(0,0,0,0.85), 0 8px 22px -8px rgba(0,0,0,0.6)',
                }}
              >
                <Image
                  src={sheet.src}
                  alt={sheet.alt}
                  width={sheet.w}
                  height={sheet.h}
                  sizes="(max-width: 768px) 78vw, 340px"
                  loading="lazy"
                  draggable={false}
                  className="pointer-events-none block h-auto w-full"
                />
                <span className="block pt-3 pb-1 text-center font-display text-xs uppercase tracking-wordmark text-[#5a564c]">
                  {sheet.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Index + arrows — left-aligned on desktop, centred on mobile */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Vorheriges Sheet"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white hover:text-black"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="min-w-[6em] text-center font-display text-xs uppercase tracking-brand tabular-nums text-secondary">
            {String(active + 1).padStart(2, '0')} — {String(items.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Nächstes Sheet"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white hover:text-black"
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
