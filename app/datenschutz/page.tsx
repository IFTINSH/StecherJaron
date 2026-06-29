import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Datenschutz', robots: { index: false } };

export default function Datenschutz() {
  return (
    <main className="relative z-10 mx-auto min-h-dvh max-w-2xl px-6 pb-28 pt-28">
      <Link href="/" className="underline-trail font-display text-xs uppercase tracking-brand text-white/70">
        ← Zurück
      </Link>
      <h1 className="mt-8 font-display text-4xl uppercase tracking-brand text-white" style={{ fontWeight: 300 }}>
        Datenschutz
      </h1>
      <div className="mt-8 space-y-4 font-light leading-relaxed text-body">
        <p className="rounded-lg border border-line bg-surface p-4 text-sm text-secondary">
          Platzhalter — vor Veröffentlichung mit einer vollständigen
          Datenschutzerklärung ersetzen (DSGVO). Punkte u. a.: Hosting (Vercel),
          eingebettete Schriften (lokal via next/font), externe Links
          (Instagram, Google Maps), später ggf. Sanity (CMS) & Video-Einbettung.
        </p>
        <p>
          Diese Website wird bei Vercel gehostet. Schriften werden lokal
          ausgeliefert (keine externen Google-Anfragen). Beim Klick auf externe
          Links (Instagram, Google Maps) gelten die Datenschutzbestimmungen der
          jeweiligen Anbieter.
        </p>
      </div>
    </main>
  );
}
