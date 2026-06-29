'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

// "Scrolls in & expands" like dotstolines.com. Plays muted+looped; once the
// block is fully in view we try to unmute (sound on). Browsers may block
// unmuted autoplay without a prior tap → we fall back to a "Ton aktivieren"
// button. Mobile-first.
export default function IntroVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [needsTap, setNeedsTap] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const autoTried = useRef(false); // auto-unmute only once
  const userDecided = useRef(false); // once the user toggles, never auto-override

  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.45, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [24, 0]);

  // Lazy: only load + play the (heavy) video when it scrolls into view, pause
  // when it leaves. Once (almost) fully visible, try to enable sound — once.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) {
          el.pause();
          return;
        }

        // in view → start (muted) playback; preload="none" means this is the
        // first time the video actually loads.
        el.play().catch(() => {});

        // attempt auto-unmute ONCE, never after the user chose via the button.
        if (userDecided.current || autoTried.current) return;
        if (entry.intersectionRatio >= 0.85) {
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
      { threshold: [0, 0.25, 0.85, 1] }
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

  // Fullscreen (desktop): show native controls while in fullscreen for sound/seek.
  useEffect(() => {
    const onChange = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element };
      setFullscreen(!!(document.fullscreenElement || doc.webkitFullscreenElement));
    };
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
    };
  }, []);

  const toggleFullscreen = () => {
    const el = videoRef.current as
      | (HTMLVideoElement & {
          webkitRequestFullscreen?: () => void;
          webkitEnterFullscreen?: () => void;
        })
      | null;
    if (!el) return;
    const doc = document as Document & {
      webkitFullscreenElement?: Element;
      webkitExitFullscreen?: () => void;
    };
    if (document.fullscreenElement || doc.webkitFullscreenElement) {
      (document.exitFullscreen || doc.webkitExitFullscreen)?.call(document);
    } else {
      (
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.webkitEnterFullscreen
      )?.call(el);
    }
  };

  return (
    <section className="relative z-10 px-6 py-24 md:px-12 md:py-32">
      <div ref={sectionRef} className="mx-auto w-full max-w-[940px]">
        <motion.div
          style={reduce ? { opacity: 1, borderRadius: 0 } : { scale, opacity, borderRadius: radius }}
          className="relative mx-auto aspect-[4/5] w-full overflow-hidden bg-surface sm:aspect-video"
        >
          <video
            ref={videoRef}
            src="/video/intro.mp4"
            poster="/hero/hero.jpeg"
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            controls={fullscreen}
          />

          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-xs font-light uppercase tracking-brand text-white backdrop-blur-md transition-colors hover:bg-black/75"
              aria-label={muted ? 'Ton aktivieren' : 'Ton ausschalten'}
            >
              {muted ? <SoundOff /> : <SoundOn />}
              <span>{muted ? 'Ton' : 'Ton an'}</span>
            </button>
            <button
              onClick={toggleFullscreen}
              className="flex items-center justify-center rounded-full bg-black/55 p-2.5 text-white backdrop-blur-md transition-colors hover:bg-black/75"
              aria-label={fullscreen ? 'Vollbild verlassen' : 'Vollbild'}
            >
              {fullscreen ? <FsExit /> : <FsEnter />}
            </button>
          </div>

          {needsTap && muted && (
            <button
              onClick={toggleSound}
              className="absolute inset-0 flex items-center justify-center bg-black/30"
              aria-label="Ton aktivieren"
            >
              <span className="flex items-center gap-3 rounded-full bg-white/90 px-6 py-3 font-display text-sm uppercase tracking-brand text-black">
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
function FsEnter() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M16 3h3a2 2 0 0 1 2 2v3" />
      <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}
function FsExit() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}
