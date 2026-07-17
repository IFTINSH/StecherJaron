// Anzeige-Formatierung fürs Event-Datum.
// Akzeptiert ISO-Datum aus Sanity ("2026-07-12"), reine Jahreszahl ("2025")
// oder leer. Timezone-sicher (kein new Date()), parst die Teile direkt.
// Konvention: der 1. Januar zeigt nur das Jahr — praktisch für Events, von
// denen nur das Jahr bekannt ist.
import type { Locale } from './i18n/routing';

const MONTHS_DE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];
const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function formatEventDate(date?: string, locale: Locale = 'de'): string | undefined {
  if (!date) return undefined;
  const m = /^(\d{4})(?:-(\d{2})-(\d{2}))?/.exec(date.trim());
  if (!m) return date; // unbekanntes Format → roh anzeigen
  const [, year, month, day] = m;
  if (!month || !day) return year; // nur Jahreszahl
  if (month === '01' && day === '01') return year; // 1. Januar = nur Jahr
  const months = locale === 'en' ? MONTHS_EN : MONTHS_DE;
  const name = months[Number(month) - 1];
  // EN: "12 July 2026" · DE: "12. Juli 2026"
  return locale === 'en'
    ? `${Number(day)} ${name} ${year}`
    : `${Number(day)}. ${name} ${year}`;
}
