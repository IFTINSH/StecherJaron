'use client';

import type { HowToBookData } from '@/lib/data';

// Collapsed "How to Book" accordion — one source (Sanity: howToBook.sections),
// reused in the Contact section and the floating How-to-Book panel so the long
// guidance never reads as one overwhelming wall of text. openIdx is lifted so
// the caller controls which section starts open (or none).
export default function BookingAccordion({
  sections,
  openIdx,
  setOpenIdx,
}: {
  sections: HowToBookData['sections'];
  openIdx: number | null;
  setOpenIdx: (i: number | null) => void;
}) {
  return (
    <div>
      {sections.map((section, i) => {
        const open = openIdx === i;
        return (
          <div key={section.heading} className="border-t border-line last:border-b">
            <button
              type="button"
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <h3 className="font-display text-sm font-normal uppercase tracking-brand text-white">
                {section.heading}
              </h3>
              <span
                className="text-secondary transition-transform duration-300"
                style={{ transform: open ? 'rotate(45deg)' : 'none' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>
            {open && (
              <ul className="space-y-2.5 pb-5 pl-4 text-left text-sm leading-relaxed text-body">
                {section.items.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
