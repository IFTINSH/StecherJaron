'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { useLoaded } from './LoadingProvider';
import { useSite } from './SiteProvider';
import LocaleToggle from './LocaleToggle';

// Homepage-section anchors. Labels come from the `nav` message namespace.
const navItems = [
  { href: '/#about', key: 'about' },
  { href: '/#work', key: 'portfolio' },
  { href: '/#wannados', key: 'wannados' },
  { href: '/#studio', key: 'studio' },
  { href: '/#events', key: 'events' },
  { href: '/#contact', key: 'contact' },
] as const;

export default function Header() {
  const loaded = useLoaded();
  const [open, setOpen] = useState(false);
  const t = useTranslations('nav');
  const th = useTranslations('header');
  const locale = useLocale();
  const s = useSite();
  // Prefix homepage anchors with the locale so cross-page nav stays in-language.
  const prefix = locale === 'de' ? '' : `/${locale}`;

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
          href={`${prefix}/#top`}
          className="font-display tracking-wordmark text-lg uppercase text-white no-underline md:text-xl"
          style={{ fontWeight: 400 }}
        >
          {s.wordmark}
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((link, i) => (
            <motion.a
              key={link.href}
              href={`${prefix}${link.href}`}
              className="underline-trail font-display text-sm font-light uppercase tracking-brand text-white"
              initial={{ opacity: 0, y: -8 }}
              animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.08 }}
            >
              {t(link.key)}
            </motion.a>
          ))}
          {/* Hairline sets the language switch apart from the nav links as a
              utility control, not a seventh destination. */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: -8 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.5, delay: 1.1 + navItems.length * 0.08 }}
          >
            <span className="h-4 w-px bg-line" aria-hidden="true" />
            <LocaleToggle />
          </motion.div>
        </nav>

        {/* Mobile: language switch always visible next to the menu button,
            set apart by a hairline so it reads as utility, not a nav item. */}
        <div className="flex items-center gap-3 md:hidden">
          <LocaleToggle />
          <span className="h-4 w-px bg-line" aria-hidden="true" />
          <button
            onClick={() => setOpen(true)}
            className="-m-2 p-2 font-display text-sm font-light uppercase tracking-brand text-white"
            aria-label={th('openMenu')}
          >
            {th('menu')}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu — z above the How-to-Book pill (z-120) so the pill is
          covered while the menu is open */}
      <div
        className="fixed inset-0 z-[130] flex flex-col items-center justify-center bg-black transition-opacity duration-500 md:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-2 p-3 font-display text-sm font-light uppercase tracking-brand text-white"
          aria-label={th('closeMenu')}
        >
          {th('close')}
        </button>

        <nav className="flex flex-col items-center gap-8">
          {navItems.map((link) => (
            <a
              key={link.href}
              href={`${prefix}${link.href}`}
              onClick={() => setOpen(false)}
              className="font-display text-2xl font-light uppercase tracking-brand text-white no-underline transition-colors duration-300 hover:text-secondary"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-10 flex flex-col items-center gap-5">
          <LocaleToggle className="text-sm" />
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs uppercase tracking-brand text-secondary">
              {th('socialMedia')}
            </span>
            <a
              href={s.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-trail text-sm text-white no-underline"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
