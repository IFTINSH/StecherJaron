'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useLoaded } from './LoadingProvider';

// Responsive hero for a PORTRAIT photo:
// - mobile: full-bleed (phone screen is portrait too → fits with minimal crop)
// - desktop: split — portrait photo in a tall left column, wordmark on the right
function Wordmark({
  loaded,
  align,
}: {
  loaded: boolean;
  align: 'right' | 'left';
}) {
  return (
    <h1
      className={`font-display uppercase ${align === 'right' ? 'text-right' : 'text-left'}`}
      style={{ fontWeight: 300 }}
    >
      {['Stecher', 'Jaron'].map((word, i) => (
        <span key={word} className="block overflow-hidden">
          <motion.span
            className="block leading-[1.02] tracking-brand text-white"
            initial={{ y: '110%' }}
            animate={loaded ? { y: '0%' } : { y: '110%' }}
            transition={{
              duration: 1.1,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.4 + i * 0.14,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const loaded = useLoaded();

  const imageReveal = {
    initial: { scale: 1.4, clipPath: 'inset(12% 12% 12% 12%)' },
    animate: loaded
      ? { scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }
      : { scale: 1.4, clipPath: 'inset(12% 12% 12% 12%)' },
    transition: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 },
  };

  return (
    <section id="top" className="relative h-[100dvh] w-full overflow-hidden">
      {/* ---------- MOBILE: full-bleed ---------- */}
      <div className="relative h-full w-full md:hidden">
        <motion.div className="absolute inset-0" {...imageReveal}>
          <Image
            src="/hero/hero.jpeg"
            alt="Stecher Jaron in seinem Studio"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: '32% 30%' }}
          />
          <div className="absolute inset-0 bg-black/35" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-start px-6 pb-24 text-[15vw]">
          <Wordmark loaded={loaded} align="left" />
        </div>
      </div>

      {/* ---------- DESKTOP: split ---------- */}
      <div className="hidden h-full grid-cols-2 md:grid">
        <motion.div className="relative h-full overflow-hidden" {...imageReveal}>
          <Image
            src="/hero/hero.jpeg"
            alt="Stecher Jaron in seinem Studio"
            fill
            priority
            sizes="50vw"
            className="object-cover"
            style={{ objectPosition: '50% 25%' }}
          />
          <div className="absolute inset-0 bg-black/15" />
        </motion.div>

        <div className="relative flex h-full flex-col justify-center px-10 lg:px-16 text-[8vw] lg:text-[6.5vw]">
          <Wordmark loaded={loaded} align="left" />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-6 font-display text-sm uppercase tracking-brand text-white/55"
          >
            Tattoo Artist · Passau
          </motion.p>
        </div>
      </div>

      {/* soft fade into the page below — melts the hero into the flow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-b from-transparent to-black md:h-40" />

      {/* scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <div className="h-10 w-px animate-pulse bg-white/50" />
      </motion.div>
    </section>
  );
}
