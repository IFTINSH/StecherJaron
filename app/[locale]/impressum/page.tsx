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
  return (
    <main className="relative z-10 mx-auto min-h-dvh max-w-2xl px-6 pb-28 pt-28">
      <Link href="/" className="underline-trail font-display text-xs uppercase tracking-brand text-white/70">
        {tc('back')}
      </Link>
      <h1 className="mt-8 font-display text-4xl uppercase tracking-brand text-white" style={{ fontWeight: 300 }}>
        {t('imprintTitle')}
      </h1>
      <div className="mt-8 space-y-4 font-light leading-relaxed text-body">
        <p className="rounded-lg border border-line bg-surface p-4 text-sm text-secondary">
          {t('imprintPlaceholder')}
        </p>
        <p>
          {t('imprintAccording')}
          <br />
          Stecher Jaron
          <br />
          {imprintStreet}
          <br />
          {imprintCity}
        </p>
        <p>
          <strong className="text-white">{t('contact')}</strong>
          <br />
          Instagram: @stecherjaron
        </p>
        <p>
          <strong className="text-white">{t('responsible')}</strong>
          <br />
          {t('responsibleName')}
        </p>
      </div>
    </main>
  );
}
