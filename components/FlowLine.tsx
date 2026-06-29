'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useId } from 'react';
import { useLoaded } from './LoadingProvider';

// A fine CHROME/metallic line on Jaron's silhouette, used purely as an INTRO flourish:
//  1. the COMPLETE contour pops in around his body (no draw-on), with a subtle sheen,
//  2. it holds,
//  3. then it RETRACTS symmetrically: a gap opens at the seam (top of head) and both
//     ends recede evenly to meet at the path midpoint — one cohesive motion.
// Metallic (not glowing): the stroke is a vertical silver gradient with a "horizon"
// edge; the bright halo/bloom are kept very low so it reads as chrome, not neon.
//
//   0 ── appear+sheen ──── hold ──── retract (gap → recede) ──── gone
const DELAY = 0.4; // wait for the hero to settle
const APPEAR = 0.4; // pop-in
const HOLD = 1.4; // linger
const RETRACT = 1.6; // gap opens and the line recedes
const RETRACT_DELAY = DELAY + APPEAR + HOLD; // when the retract starts
const LAG = 0.09; // layers trail the core on retract → comet trail
const RETRACT_EASE = [0.7, 0, 0.3, 1] as const; // hesitate, then flow back

interface Props {
  path: string;
  viewBox: string;
  /** Desktop overlays a cover crop ("…slice"); mobile is locked 1:1 ("none"). */
  preserveAspectRatio?: string;
  /** Arc-length fraction (0–1) the line recedes TO when dissolving. 0.5 = path
   *  midpoint; ~0.354 = the bottom edge (so both ends run off the bottom together). */
  vanish?: number;
}

export default function FlowLine({
  path,
  viewBox,
  preserveAspectRatio = 'xMidYMid slice',
  vanish = 0.5,
}: Props) {
  const loaded = useLoaded();
  const reduce = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  // Reduced motion: the line is a transient intro effect, so show nothing.
  if (reduce) return null;

  // Stroke layers: a faint soft halo for depth (NOT a bright glow) + the chrome core.
  const STROKES = [
    { width: 2.6, stroke: 'white', opacity: 0.05 },
    { width: 1.1, stroke: `url(#chrome-${uid})`, opacity: 1 },
  ];

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      fill="none"
    >
      <defs>
        {/* vertical chrome ramp: highlight → falloff → light band → dark horizon → sheen */}
        <linearGradient id={`chrome-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eaeaea" />
          <stop offset="22%" stopColor="#9b9b9b" />
          <stop offset="48%" stopColor="#e2e2e2" />
          <stop offset="52%" stopColor="#646464" />
          <stop offset="78%" stopColor="#a9a9a9" />
          <stop offset="100%" stopColor="#7c7c7c" />
        </linearGradient>
        <filter id={`bloom-${uid}`} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {STROKES.map((s, i) => {
        // outer layer (lower i) trails the core → soft comet trail. pathLength +
        // pathOffset animate together so the visible arc stays CENTRED on `vanish`
        // and shrinks symmetrically: both ends recede evenly and meet there.
        const retract = {
          duration: RETRACT,
          delay: RETRACT_DELAY + (STROKES.length - 1 - i) * LAG,
          ease: RETRACT_EASE,
        };
        return (
          <motion.path
            key={i}
            d={path}
            stroke={s.stroke}
            strokeWidth={s.width}
            strokeLinecap="butt"
            strokeLinejoin="round"
            initial={{ opacity: 0, pathLength: 1, pathOffset: vanish - 0.5 }}
            animate={loaded ? { opacity: s.opacity, pathLength: 0, pathOffset: vanish } : {}}
            transition={{
              opacity: { duration: APPEAR, delay: DELAY, ease: 'easeOut' },
              pathLength: retract,
              pathOffset: retract,
            }}
          />
        );
      })}

      {/* effect: a soft, dim sheen flares around the contour as it pops in (subtle) */}
      <motion.path
        d={path}
        stroke="white"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#bloom-${uid})`}
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: [0, 0.2, 0] } : {}}
        transition={{ duration: 1, times: [0, 0.45, 1], delay: DELAY, ease: 'easeOut' }}
      />
    </svg>
  );
}
