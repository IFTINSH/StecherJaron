'use client';

import { useEffect, useRef } from 'react';

// Shared lightbox for all galleries: locks the page scroll while open, closes on
// Escape / backdrop / ×, and navigates with arrow keys, edge buttons (desktop)
// and horizontal swipe (touch). The image re-runs its entrance animation on
// every index change (key={index}).

export interface LightboxImage {
  src: string;
  alt?: string;
}

interface Props {
  images: readonly LightboxImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

export default function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = images.length;
  const canNavigate = count > 1;

  const prev = () => onIndexChange((index - 1 + count) % count);
  const next = () => onIndexChange((index + 1) % count);

  // Keyboard: Escape closes, arrows navigate.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!canNavigate) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Lock the page scroll behind the lightbox while open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const image = images[index];
  if (!image) return null;

  return (
    <div
      className="animate-lightbox-bg fixed inset-0 z-[200] flex items-center justify-center p-4"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label="Bildansicht"
      onClick={onClose}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        if (!touch.current || !canNavigate) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        const dy = e.changedTouches[0].clientY - touch.current.y;
        touch.current = null;
        // horizontal swipe → navigate
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) prev();
          else next();
        }
      }}
    >
      {/* dvh (not vh) so the image centres in the VISIBLE viewport on phones,
          where the browser chrome eats into 100vh */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={index}
        src={image.src}
        alt={image.alt ?? ''}
        className="animate-lightbox-img max-h-[85dvh] max-w-[92vw] select-none object-contain"
        draggable={false}
        onClick={(e) => e.stopPropagation()}
      />

      {/* back — explicit way out, matching the subpages' back link.
          NOTE: underline-trail sets position:relative, so it must live on an
          inner span — on the button itself it would cancel `absolute` and the
          button would flow next to the image. */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute left-6 top-7 font-display text-xs uppercase tracking-brand text-white/70"
      >
        <span className="underline-trail">← Zurück</span>
      </button>

      {/* close */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-6 top-6 p-2 text-white/70 transition-colors hover:text-white"
        aria-label="Schließen"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {canNavigate && (
        <>
          {/* prev / next — desktop; on touch you swipe instead */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 p-2.5 text-white/50 transition-colors hover:text-white md:block"
            aria-label="Vorheriges Bild"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 p-2.5 text-white/50 transition-colors hover:text-white md:block"
            aria-label="Nächstes Bild"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* position */}
          <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-display text-[11px] uppercase tracking-brand text-white/40">
            {index + 1} / {count}
          </span>
        </>
      )}
    </div>
  );
}
