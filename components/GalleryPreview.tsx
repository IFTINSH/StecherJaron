'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import ParallaxImage from './ParallaxImage';

// Shared "editorial preview" (from the Figma design): a few feature images in dark
// 4:5 frames plus a compact "+N / Alle ansehen" tile whose background is a blurred
// mini-mosaic of the following images. Desktop shows four tiles in a row; mobile is
// a static 2×2 grid (three works + the See-All tile). Used by both Portfolio and
// Studio — items are generic, with an optional label bottom-left (e.g. the style).

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
  magnitude = 7.7,
}: {
  item: PreviewItem;
  /** index into the full items array (for lightbox navigation) */
  index: number;
  onOpenLightbox: (index: number) => void;
  className?: string;
  /** parallax strength (% travel); the mobile swipe row uses a gentler value */
  magnitude?: number;
}) {
  const t = useTranslations('gallery');
  return (
    <button
      onClick={() => onOpenLightbox(index)}
      aria-label={item.alt || t('enlargeImage')}
      className={`group relative block cursor-pointer overflow-hidden rounded-sm bg-surface ${className}`}
    >
      {/* Parallax: the image gently scrolls within its frame as the tile passes by,
          matching the rest of the site's images. */}
      <ParallaxImage
        src={item.src}
        alt={item.alt}
        loading="lazy"
        sizes="(min-width: 768px) 25vw, 72vw"
        magnitude={magnitude}
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
// Exported for reuse (e.g. the Events section builds the same tile from covers).
export function SeeAllTile({
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
  const t = useTranslations('gallery');
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
          {t('seeAll')}
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
// Mobile: a static 2×2 grid — two works on top, one work + the See-All tile
// below. Everything is visible at once (no swiping, no dots), and the See-All
// tile is a full member of the grid, like in the original Figma composition.
function MobileGrid({
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
  const showSeeAll = remaining > 0 && mini.length > 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:hidden">
      {/* magnitude 4: gentler parallax — on a phone the frame passes the viewport
          quickly, so the same travel reads much stronger than on desktop */}
      {works.map((item, i) => (
        <FeatureImage
          key={item.key}
          item={item}
          index={i}
          onOpenLightbox={onOpenLightbox}
          className="aspect-[4/5] w-full"
          magnitude={4}
        />
      ))}

      {showSeeAll && (
        <SeeAllTile mini={mini} remaining={remaining} href={href} vertical className="aspect-[4/5] w-full" />
      )}
    </div>
  );
}

export default function GalleryPreview({ items, href, onOpenLightbox }: Props) {
  if (!items.length) return null;

  // Desktop shows four features + the See-All tile (five tiles fill the row); mobile
  // is a 2×2 grid: three works + the See-All tile. Each layout draws its mini-mosaic
  // from the images that follow the ones already on display.
  const dFeatures = items.slice(0, 4);
  const dMini = items.slice(4, 8);
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

      {/* ── Mobile: 2×2 grid (three works + See-All tile) ── */}
      <MobileGrid works={mWorks} mini={mMini} remaining={mRemaining} href={href} onOpenLightbox={onOpenLightbox} />
    </motion.div>
  );
}
