import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { site } from '@/lib/content';

export default async function Footer() {
  const t = await getTranslations('footer');
  return (
    <footer className="relative z-10 bg-gradient-to-b from-transparent to-black/80">
      <div className="mx-auto max-w-[1800px] px-6 pb-8 pt-8 md:px-12">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted">
            <Link href="/impressum" className="underline-trail uppercase tracking-brand">
              {t('imprint')}
            </Link>
            <Link href="/datenschutz" className="underline-trail uppercase tracking-brand">
              {t('privacy')}
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
