'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { nav, site } from '@/lib/content';
import { useLoaded } from './LoadingProvider';

export default function Header() {
  const loaded = useLoaded();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-black/70 px-6 py-5 backdrop-blur-md md:px-12"
        initial={{ y: '-100%' }}
        animate={loaded ? { y: '0%' } : { y: '-100%' }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
      >
        <a
          href="#top"
          className="font-display tracking-wordmark text-lg uppercase text-white no-underline md:text-xl"
          style={{ fontWeight: 400 }}
        >
          {site.wordmark}
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="underline-trail font-display text-sm font-light uppercase tracking-brand text-white"
              initial={{ opacity: 0, y: -8 }}
              animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.08 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="font-display text-sm font-light uppercase tracking-brand text-white md:hidden"
          aria-label="Menü öffnen"
        >
          Menü
        </button>
      </motion.header>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-500 md:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-6 top-5 font-display text-sm font-light uppercase tracking-brand text-white"
          aria-label="Menü schließen"
        >
          Close
        </button>

        <nav className="flex flex-col items-center gap-8">
          {nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl font-light uppercase tracking-brand text-white no-underline transition-colors duration-300 hover:text-[#999]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-10 flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-brand text-[#666]">
            Social Media
          </span>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-trail text-sm text-white no-underline"
          >
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}
