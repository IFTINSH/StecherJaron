import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });
  return { title: t('privacyTitle'), robots: { index: false } };
}

export default async function Datenschutz({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'legal' });
  const tc = await getTranslations({ locale, namespace: 'common' });
  const sections = t.raw('privacy.sections') as ReadonlyArray<{
    title: string;
    paragraphs: readonly string[];
  }>;
  const translationNote = t.raw('privacy.translationNote') as string;
  return (
    <main className="relative z-10 mx-auto min-h-dvh max-w-2xl px-6 pb-28 pt-28">
      <Link href="/" className="underline-trail font-display text-xs uppercase tracking-brand text-white/70">
        {tc('back')}
      </Link>
      <h1 className="mt-8 font-display text-4xl uppercase tracking-brand text-white" style={{ fontWeight: 300 }}>
        {t('privacyTitle')}
      </h1>
      <div className="mt-10 space-y-8 font-light leading-relaxed text-body">
        {translationNote && (
          <p className="rounded-lg border border-line bg-surface p-4 text-sm text-secondary">
            {translationNote}
          </p>
        )}
        {sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="font-display text-sm uppercase tracking-brand text-white">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        <p className="text-sm text-muted">{t('privacy.updated')}</p>
      </div>
    </main>
  );
}
