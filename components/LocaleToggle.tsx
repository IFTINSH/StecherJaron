'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, Link } from '@/lib/i18n/navigation';
import { routing } from '@/lib/i18n/routing';

// Compact DE / EN switch. Links to the same page in the other locale — next-intl
// resolves the counterpart URL (/ ↔ /en, /portfolio ↔ /en/portfolio) itself.
export default function LocaleToggle({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const active = useLocale();
  const t = useTranslations('header');

  return (
    <div
      className={`flex items-center gap-1.5 font-display text-xs uppercase tracking-brand ${className}`}
      aria-label={t('switchLanguage')}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-line">/</span>}
          <Link
            href={pathname}
            locale={loc}
            aria-current={active === loc ? 'true' : undefined}
            className={
              active === loc
                ? 'text-white'
                : 'text-secondary transition-colors hover:text-white'
            }
          >
            {loc.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
