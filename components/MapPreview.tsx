'use client';

import { useState } from 'react';
import Image from 'next/image';

// Two-click Google Maps embed (GDPR-friendly): the page ships with a LOCAL map
// image (stitched from OpenStreetMap tiles, address centred — no third-party
// requests). Only after the visitor clicks "Karte laden" does the actual Google
// Maps iframe load. The PREVIEW is darkened to sit in the black-and-white design;
// the loaded map keeps Google's real colours (that's what you navigate with).
const EMBED_URL =
  'https://maps.google.com/maps?q=Firmianstra%C3%9Fe+10,+94032+Passau&z=16&output=embed';

// grayscale first, then invert → clean dark monochrome preview
const DARK_FILTER = 'grayscale(1) invert(0.92) contrast(0.9)';

export default function MapPreview() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="mx-auto mt-8 w-full max-w-xl md:mx-0 md:max-w-none">
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-line bg-surface">
        {loaded ? (
          <iframe
            src={EMBED_URL}
            title="Karte: Firmianstraße 10, Passau"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            aria-label="Google-Maps-Karte laden"
            className="group absolute inset-0 block h-full w-full cursor-pointer"
          >
            <Image
              src="/map/map-preview.png"
              alt="Kartenausschnitt: Firmianstraße 10, Passau"
              fill
              sizes="(max-width: 768px) 100vw, 576px"
              loading="lazy"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{ filter: DARK_FILTER }}
            />

            {/* location pin on the address (image is centred on it) */}
            <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>

            {/* load CTA — same pill language as the other buttons */}
            <span className="absolute inset-x-0 bottom-5 flex justify-center">
              <span className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-xs uppercase tracking-brand text-black transition-opacity group-hover:opacity-85">
                Karte laden
              </span>
            </span>
          </button>
        )}
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-muted">
        {loaded ? (
          <>Karte: Google Maps</>
        ) : (
          <>
            Vorschau: ©{' '}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-trail"
            >
              OpenStreetMap
            </a>
            -Mitwirkende · Beim Laden wird Google Maps eingebunden.
          </>
        )}
      </p>
    </div>
  );
}
