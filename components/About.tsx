'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export default function About({ title, body }: { title: string; body: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="about" className="relative z-10 px-6 py-24 md:px-12 md:py-32">
      {/* fine vertical line centred exactly on the Hero ↔ About seam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-2 h-14 w-px -translate-x-1/2 -translate-y-1/2 animate-pulse bg-gradient-to-b from-transparent via-white/45 to-transparent md:top-6"
      />
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-4xl uppercase tracking-brand text-white/90 md:text-7xl"
          style={{ fontWeight: 300 }}
        >
          {title}
        </motion.h2>

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="mx-auto mt-12 max-w-3xl whitespace-pre-line font-light text-body"
          style={{ fontSize: 'clamp(1.05rem, 3.2vw, 1.7rem)', lineHeight: 1.75 }}
        >
          {body}
        </motion.p>
      </div>
    </section>
  );
}
