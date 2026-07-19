import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { getSiteSettings } from '@/lib/data';
import type { Locale } from '@/lib/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });
  return { title: t('imprintTitle'), robots: { index: false } };
}

export default async function Impressum({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'legal' });
  const tc = await getTranslations({ locale, namespace: 'common' });
  const settings = await getSiteSettings();
  const [imprintStreet = '', imprintCity = ''] = settings.studio.address.split(', ');
  const headingClass = 'font-display text-sm uppercase tracking-brand text-white';
  return (
    <main className="relative z-10 mx-auto min-h-dvh max-w-2xl px-6 pb-28 pt-28">
      <Link href="/" className="underline-trail font-display text-xs uppercase tracking-brand text-white/70">
        {tc('back')}
      </Link>
      <h1 className="mt-8 font-display text-4xl uppercase tracking-brand text-white" style={{ fontWeight: 300 }}>
        {t('imprintTitle')}
      </h1>
      <div className="mt-10 space-y-8 font-light leading-relaxed text-body">
        <section className="space-y-3">
          <h2 className={headingClass}>{t('imprint.accordingTitle')}</h2>
          <p>
            {t('imprint.name')}
            <br />
            {t('imprint.business')}
            <br />
            {imprintStreet}
            <br />
            {imprintCity}
          </p>
        </section>
        <section className="space-y-3">
          <h2 className={headingClass}>{t('imprint.contactTitle')}</h2>
          <p>
            {t('imprint.emailLabel')}:{' '}
            <a href={`mailto:${t('imprint.email')}`} className="underline-trail">
              {t('imprint.email')}
            </a>
            <br />
            Instagram:{' '}
            <a
              href={settings.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-trail"
            >
              {settings.instagram.handle}
            </a>
          </p>
        </section>
        <section className="space-y-3">
          <h2 className={headingClass}>{t('imprint.responsibleTitle')}</h2>
          <p>{t('imprint.responsibleBody')}</p>
        </section>
        <section className="space-y-3">
          <h2 className={headingClass}>{t('imprint.vatTitle')}</h2>
          <p>{t('imprint.vatBody')}</p>
        </section>
        <section className="space-y-3">
          <h2 className={headingClass}>{t('imprint.disputeTitle')}</h2>
          <p>{t('imprint.disputeBody')}</p>
        </section>
        <section className="space-y-3">
          <h2 className={headingClass}>{t('imprint.linksTitle')}</h2>
          <p>{t('imprint.linksBody')}</p>
        </section>
      </div>
    </main>
  );
}
