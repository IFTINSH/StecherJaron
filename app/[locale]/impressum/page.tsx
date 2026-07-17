import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/routing';

export const metadata: Metadata = { title: 'Impressum', robots: { index: false } };

export default async function Impressum({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="relative z-10 mx-auto min-h-dvh max-w-2xl px-6 pb-28 pt-28">
      <Link href="/" className="underline-trail font-display text-xs uppercase tracking-brand text-white/70">
        ← Zurück
      </Link>
      <h1 className="mt-8 font-display text-4xl uppercase tracking-brand text-white" style={{ fontWeight: 300 }}>
        Impressum
      </h1>
      <div className="mt-8 space-y-4 font-light leading-relaxed text-body">
        <p className="rounded-lg border border-line bg-surface p-4 text-sm text-secondary">
          Platzhalter — bitte vor Veröffentlichung mit den echten Angaben füllen
          (Pflicht nach §5 DDG / §18 MStV).
        </p>
        <p>
          Angaben gemäß §5 DDG
          <br />
          Stecher Jaron
          <br />
          Firmianstraße 10
          <br />
          94032 Passau
        </p>
        <p>
          <strong className="text-white">Kontakt</strong>
          <br />
          Instagram: @stecherjaron
        </p>
        <p>
          <strong className="text-white">Verantwortlich für den Inhalt</strong>
          <br />
          Jaron [Nachname], Anschrift wie oben.
        </p>
      </div>
    </main>
  );
}
