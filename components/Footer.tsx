import Link from 'next/link';
import { site } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-gradient-to-b from-transparent to-black/80">
      <div className="mx-auto max-w-[1800px] px-6 pb-10 pt-16 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <span className="font-display text-sm uppercase tracking-brand text-white">
            {site.wordmark}
          </span>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-trail uppercase tracking-brand"
            >
              Instagram
            </a>
            <Link href="/impressum" className="underline-trail uppercase tracking-brand">
              Impressum
            </Link>
            <Link href="/datenschutz" className="underline-trail uppercase tracking-brand">
              Datenschutz
            </Link>
          </div>

          <span className="text-xs text-muted">
            © {new Date().getFullYear()} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
