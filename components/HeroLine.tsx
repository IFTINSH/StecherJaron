'use client';

import FlowLine from './FlowLine';
import { JARON_SILHOUETTE, JARON_VIEWBOX } from './heroSilhouette';

// Desktop silhouette line — overlaid on the full-bleed 16:9 hero photo inside the
// .hero-stage box (which already matches the photo's crop), so a cover mapping
// ("xMidYMid slice") lines it up on Jaron. Mobile uses its own locked variant,
// rendered inside HeroPhotoBackground.
export default function HeroLine() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
      aria-hidden="true"
    >
      <FlowLine path={JARON_SILHOUETTE} viewBox={JARON_VIEWBOX} />
    </div>
  );
}
