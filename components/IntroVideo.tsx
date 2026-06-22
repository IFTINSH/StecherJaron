'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// "Scrolls in & expands" like dotstolines.com. Plays muted+looped; once the
// block is fully in view we try to unmute (sound on). Browsers may block
// unmuted autoplay without a prior tap → we fall back to a "Ton aktivieren"
// button. Mobile-first.
export default function IntroVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [needsTap, setNeedsTap] = useState(false);
  const autoTried = useRef(false); // auto-unmute only once
  const userDecided = useRef(false); // once the user toggles, never auto-override

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.45, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [24, 0]);

  // Try to enable sound once the video is (almost) fully visible.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      async ([entry]) => {
        // Only ever attempt auto-unmute ONCE, and never after the user has
        // made their own choice via the sound button.
        if (userDecided.current || autoTried.current) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.85) {
          autoTried.current = true;
          try {
            el.muted = false;
            await el.play();
            setMuted(false);
            setNeedsTap(false);
          } catch {
            el.muted = true;
            setMuted(true);
            setNeedsTap(true);
          }
        }
      },
      { threshold: [0, 0.85, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = async () => {
    const el = videoRef.current;
    if (!el) return;
    userDecided.current = true; // user is in control from now on
    const next = !muted;
    el.muted = next;
    if (!next) {
      try {
        await el.play();
      } catch {
        /* ignore */
      }
    }
    setMuted(next);
    setNeedsTap(false);
  };

  return (
    <section className="relative z-10 px-2 py-16 md:px-4 md:py-24">
      <div ref={sectionRef} className="mx-auto w-full max-w-[1800px]">
        <motion.div
          style={{ scale, opacity, borderRadius: radius }}
          className="relative mx-auto aspect-[4/5] w-full overflow-hidden bg-[#0a0a0a] sm:aspect-video"
        >
          <video
            ref={videoRef}
            src="/video/intro.mp4"
            poster="/hero/hero.jpeg"
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
          />

          <button
            onClick={toggleSound}
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-xs font-light uppercase tracking-brand text-white backdrop-blur-md transition-colors hover:bg-black/75"
            aria-label={muted ? 'Ton aktivieren' : 'Ton ausschalten'}
          >
            {muted ? <SoundOff /> : <SoundOn />}
            <span>{muted ? 'Ton' : 'Ton an'}</span>
          </button>

          {needsTap && muted && (
            <button
              onClick={toggleSound}
              className="absolute inset-0 flex items-center justify-center bg-black/30"
              aria-label="Ton aktivieren"
            >
              <span className="flex items-center gap-3 rounded-full bg-white/90 px-6 py-3 text-sm font-medium uppercase tracking-wordmark text-black">
                <SoundOn /> Ton aktivieren
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function SoundOn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
function SoundOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}
