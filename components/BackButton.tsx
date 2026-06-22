'use client';

import { useRouter } from 'next/navigation';

// Real "back" navigation so the browser restores the exact scroll position the
// user came from (the Events section). Falls back to /#events if there is no
// in-app history (e.g. the event page was opened directly).
export default function BackButton() {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const sameOrigin =
      typeof document !== 'undefined' &&
      document.referrer &&
      new URL(document.referrer).origin === window.location.origin;

    if (window.history.length > 1 && sameOrigin) {
      router.back();
    } else {
      router.push('/#events');
    }
  };

  return (
    <a
      href="/#events"
      onClick={handleClick}
      className="underline-trail font-display text-xs uppercase tracking-brand text-white/70"
    >
      ← Alle Events
    </a>
  );
}
