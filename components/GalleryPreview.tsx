'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import ParallaxImage from './ParallaxImage';

// Shared "editorial preview" (from the Figma design): a few feature images in dark
// 4:5 frames plus a compact "+N / Alle ansehen" tile whose background is a blurred
// mini-mosaic of the following images. Desktop shows four tiles in a row; mobile is
// a swipeable card row with progress dots. Used by both Portfolio and Studio — items
// are generic, with an optional label shown bottom-left (e.g. the tattoo style).

export interface PreviewItem {
  key: string;
  src: string;
  alt: string;
  /** optional caption shown bottom-left on hover (e.g. tattoo style) */
  label?: string;
}

interface Props {
  items: PreviewItem[];
  /** where "Alle ansehen" links to (the full grid page) */
  href: string;
  /** open the shared lightbox at this index into `items` */
  onOpenLightbox: (index: number) => void;
}

// Small up-right arrow (lucide ArrowUpRight), inlined to match the project's SVG style.
function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

// A feature image in a dark 4:5 frame; clicking opens the shared lightbox.
function FeatureImage({
  item,
  index,
  onOpenLightbox,
  className = '',
}: {
  item: PreviewItem;
  /** index into the full items array (for lightbox navigation) */
  index: number;
  onOpenLightbox: (index: number) => void;
  className?: string;
}) {
  return (
    <button
      onClick={() => onOpenLightbox(index)}
      aria-label={item.alt || 'Bild vergrößern'}
      className={`group relative block cursor-pointer overflow-hidden rounded-sm bg-surface ${className}`}
    >
      {/* Parallax: the image gently scrolls within its frame as the tile passes by,
          matching the rest of the site's images. */}
      <ParallaxImage
        src={item.src}
        alt={item.alt}
        loading="lazy"
        sizes="(min-width: 768px) 25vw, 72vw"
        magnitude={7.7}
        className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
      {item.label && (
        <span className="pointer-events-none absolute bottom-3 left-3.5 select-none font-display text-[10px] uppercase tracking-brand text-white/60 transition-colors duration-300 group-hover:text-white/90">
          {item.label}
        </span>
      )}
    </button>
  );
}

// "+N / Alle ansehen" tile — blurred mini-mosaic of the next images behind a veil.
function SeeAllTile({
  mini,
  remaining,
  href,
  vertical,
  className = '',
}: {
  mini: PreviewItem[];
  remaining: number;
  href: string;
  /** grid orientation of the mini-mosaic: 2×2 (vertical) vs 4×1 (horizontal strip) */
  vertical: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative block flex-shrink-0 cursor-pointer overflow-hidden rounded-sm bg-surface ${className}`}
    >
      {/* mini-preview background */}
      <div
        className={`absolute inset-0 grid ${
          vertical ? 'grid-cols-2 grid-rows-2' : 'grid-cols-4 grid-rows-1'
        }`}
      >
        {mini.map((img) => (
          <div key={img.key} className="relative overflow-hidden">
            {/* small optimized thumbnails — these render tiny and blurred, so
                sizes keeps the transferred variant small */}
            <Image
              src={img.src}
              alt=""
              aria-hidden
              fill
              sizes="160px"
              loading="lazy"
              className="scale-110 object-cover opacity-50 blur-[2px] transition-all duration-500 group-hover:scale-105 group-hover:opacity-70 group-hover:blur-0"
            />
          </div>
        ))}
      </div>

      {/* veil */}
      <div className="absolute inset-0 bg-black/[0.62] transition-colors duration-300 group-hover:bg-black/[0.52]" />

      {/* content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 select-none">
        <span className="font-display text-3xl leading-none text-white/80 transition-transform duration-300 group-hover:scale-[1.08]">
          +{remaining}
        </span>
        <span className="font-display text-[8px] uppercase tracking-brand text-white/40 transition-colors duration-300 group-hover:text-white/60">
          Alle ansehen
        </span>
      </div>

      {/* arrow */}
      <div className="absolute right-2.5 top-2.5 translate-x-0.5 -translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="text-white/45" />
      </div>
    </Link>
  );
}

// Mobile: a swipeable row of portrait cards. Cards are ~60% wide so the next one
// peeks at the edge; scroll-snap holds each in place. Progress dots track position
// (and jump on tap). The last card is the See-All tile. SCROLL_PAD must match the
// section's px-6 gutter (24px) so a snapped card aligns to the heading.
const CARD_W = 'w-[60%]';
const SCROLL_PAD = 24;

function MobileSwipe({
  works,
  mini,
  remaining,
  href,
  onOpenLightbox,
}: {
  works: PreviewItem[];
  mini: PreviewItem[];
  remaining: number;
  href: string;
  onOpenLightbox: (index: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const showSeeAll = remaining > 0 && mini.length > 0;
  const count = works.length + (showSeeAll ? 1 : 0);

  // Active card = the one whose left edge is closest to the snapped scroll position.
  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - SCROLL_PAD - el.scrollLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - SCROLL_PAD, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-6 px-6 pb-1"
      >
        {works.map((item, i) => (
          <div key={item.key} className={`${CARD_W} shrink-0 snap-start`}>
            <FeatureImage item={item} index={i} onOpenLightbox={onOpenLightbox} className="aspect-[4/5] w-full" />
          </div>
        ))}

        {showSeeAll && (
          <div className={`${CARD_W} shrink-0 snap-start`}>
            <SeeAllTile mini={mini} remaining={remaining} href={href} vertical className="aspect-[4/5] w-full" />
          </div>
        )}
      </div>

      {/* progress dots — the visible bar is tiny, so each button carries generous
          invisible padding to reach a comfortable touch-target size */}
      <div className="mt-2 flex justify-center">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Zu Bild ${i + 1}`}
            className="flex items-center px-1.5 py-3"
          >
            <span
              className={`block h-[3px] rounded-full transition-all duration-200 ${
                i === active ? 'w-5 bg-white/50' : 'w-1.5 bg-white/15'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function GalleryPreview({ items, href, onOpenLightbox }: Props) {
  if (!items.length) return null;

  // Desktop shows three features + the See-All tile (four tiles fill the row); mobile
  // is a swipe row of three + a See-All card. Each layout draws its mini-mosaic from
  // the images that follow the ones already on display.
  const dFeatures = items.slice(0, 3);
  const dMini = items.slice(3, 7);
  const dRemaining = Math.max(items.length - dFeatures.length, 0);
  const dShowSeeAll = dRemaining > 0 && dMini.length > 0;

  const mWorks = items.slice(0, 3);
  const mMini = items.slice(mWorks.length, mWorks.length + 4);
  const mRemaining = Math.max(items.length - mWorks.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* ── Desktop: four equal tiles (three features + See-All) filling the row ── */}
      <div className="hidden items-start gap-6 md:flex">
        {dFeatures.map((item, i) => (
          <FeatureImage key={item.key} item={item} index={i} onOpenLightbox={onOpenLightbox} className="aspect-[4/5] flex-1" />
        ))}

        {dShowSeeAll && (
          <SeeAllTile mini={dMini} remaining={dRemaining} href={href} vertical className="aspect-[4/5] flex-1" />
        )}
      </div>

      {/* ── Mobile: swipeable row of portrait cards (last card = See-All) ── */}
      <MobileSwipe works={mWorks} mini={mMini} remaining={mRemaining} href={href} onOpenLightbox={onOpenLightbox} />
    </motion.div>
  );
}
