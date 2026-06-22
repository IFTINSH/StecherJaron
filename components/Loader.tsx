'use client';

import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

// Monogram clip-path reveal — carried over from Website 1 (Moritz liked this).
export default function Loader({ onComplete }: Props) {
  const [reveal, setReveal] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setReveal(true), 300);
    const t2 = setTimeout(() => setHide(true), 2400);
    const t3 = setTimeout(() => onComplete(), 3100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-transform duration-700 ease-in-out"
      style={{ transform: hide ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <div className="relative w-[28vw] max-w-[180px] min-w-[110px]">
        <img
          src="/brand/monogramm.png"
          alt=""
          className="w-full rounded-full opacity-20"
          aria-hidden="true"
        />
        <img
          src="/brand/monogramm.png"
          alt="Stecher Jaron"
          className="absolute inset-0 w-full rounded-full"
          style={{
            clipPath: reveal ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
            transition: 'clip-path 1.5s ease-in-out',
          }}
        />
      </div>
    </div>
  );
}
