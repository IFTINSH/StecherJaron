'use client';

import { MeshGradient } from '@paper-design/shaders-react';

// One continuous background for the whole page: animated mesh (like Website 1)
// + a uniform scrim for text readability. Because every section is transparent
// on top of this, the page reads as a single flowing canvas (no hard panel edges).
export default function BackgroundShader({ speed = 0.3 }: { speed?: number }) {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-50">
        <MeshGradient
          className="h-full w-full"
          colors={['#000000', '#1a1a1a', '#333333', '#ffffff']}
          speed={speed}
        />
      </div>
      {/* uniform readability scrim */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
