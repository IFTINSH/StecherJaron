'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import Loader from './Loader';

const LoadingContext = createContext(false);

/** true once the page is ready (intro finished, or skipped on return visits). */
export function useLoaded() {
  return useContext(LoadingContext);
}

export default function LoadingProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false); // know yet whether to show intro?
  const [showIntro, setShowIntro] = useState(false);

  // Decide once on mount: play the intro only the first time this session.
  useEffect(() => {
    const seen = sessionStorage.getItem('introShown');
    setShowIntro(!seen);
    setReady(true);
  }, []);

  // Lock scroll only while the intro is actually playing.
  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';
  }, [showIntro]);

  const finish = () => {
    sessionStorage.setItem('introShown', '1');
    setShowIntro(false);
  };

  const loaded = ready && !showIntro;

  return (
    <LoadingContext.Provider value={loaded}>
      {showIntro && <Loader onComplete={finish} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          // Fade in only for the first-load intro; instant on return visits.
          transition: showIntro ? 'opacity 0.8s ease-in-out' : 'none',
        }}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
}
