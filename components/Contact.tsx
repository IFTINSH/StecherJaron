'use client';

import { motion } from 'motion/react';
import { site } from '@/lib/content';

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-4xl uppercase tracking-brand text-white/90 md:text-7xl"
          style={{ fontWeight: 300 }}
        >
          Kontakt
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-10 max-w-xl font-light text-body"
          style={{ fontSize: 'clamp(1.05rem, 3vw, 1.5rem)', lineHeight: 1.7 }}
        >
          Für Termine und Anfragen schreib mir einfach eine DM auf Instagram.
        </motion.p>

        <div className="mt-12 flex flex-col items-center justify-center gap-12 md:flex-row md:gap-20">
          <div className="text-center">
            <span className="mb-4 block font-display text-sm uppercase tracking-brand text-secondary">
              Instagram
            </span>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-trail text-xl font-light text-white md:text-3xl"
            >
              {site.instagram.handle}
            </a>
          </div>

          <div className="text-center">
            <span className="mb-4 block font-display text-sm uppercase tracking-brand text-secondary">
              Studio
            </span>
            <a
              href={site.studio.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-trail text-xl font-light text-white md:text-3xl"
            >
              {site.studio.address}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
