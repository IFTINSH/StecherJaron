'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { about } from '@/lib/content';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="about" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-4xl uppercase tracking-brand text-white/90 md:text-7xl"
          style={{ fontWeight: 300 }}
        >
          {about.title}
        </motion.h2>

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="mx-auto mt-12 max-w-3xl font-light text-[#ccc]"
          style={{ fontSize: 'clamp(1.05rem, 3.2vw, 1.7rem)', lineHeight: 1.75 }}
        >
          {about.body}
        </motion.p>
      </div>
    </section>
  );
}
