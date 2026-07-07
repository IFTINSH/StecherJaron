'use client';

import { useRouter } from 'next/navigation';

// Real "back" navigation so the browser restores the exact scroll position the
// user came from. Falls back to a section anchor if there is no in-app history
// (e.g. the page was opened directly). Defaults target the Events section.
interface Props {
  label?: string;
  /** anchor to jump to when there's no in-app history to go back to */
  fallbackHref?: string;
}

export default function BackButton({ label = '← Alle Events', fallbackHref = '/#events' }: Props) {
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
      router.push(fallbackHref);
    }
  };

  return (
    <a
      href={fallbackHref}
      onClick={handleClick}
      className="underline-trail font-display text-xs uppercase tracking-brand text-white/70"
    >
      {label}
    </a>
  );
}
