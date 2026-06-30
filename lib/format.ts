// Anzeige-Formatierung fürs Event-Datum.
// Akzeptiert ISO-Datum aus Sanity ("2026-07-12"), reine Jahreszahl ("2025")
// oder leer. Timezone-sicher (kein new Date()), parst die Teile direkt.
// Konvention: der 1. Januar zeigt nur das Jahr — praktisch für Events, von
// denen nur das Jahr bekannt ist.
const MONTHS_DE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

export function formatEventDate(date?: string): string | undefined {
  if (!date) return undefined;
  const m = /^(\d{4})(?:-(\d{2})-(\d{2}))?/.exec(date.trim());
  if (!m) return date; // unbekanntes Format → roh anzeigen
  const [, year, month, day] = m;
  if (!month || !day) return year; // nur Jahreszahl
  if (month === '01' && day === '01') return year; // 1. Januar = nur Jahr
  return `${Number(day)}. ${MONTHS_DE[Number(month) - 1]} ${year}`;
}
