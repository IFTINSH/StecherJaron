/**
 * Einmaliges Aufräum-Skript: entfernt das verwaiste Feld 'order' aus allen
 * Event-Dokumenten. Das Feld wurde früher vom Seed-Skript gesetzt, ist aber
 * nicht (mehr) im Event-Schema definiert (Events sortieren über 'date') und
 * löst im Studio die Warnung "Unknown field found: order" aus.
 *
 * Voraussetzung: Schreib-Token in .env.local als SANITY_API_WRITE_TOKEN.
 * Start:  node --env-file=.env.local scripts/cleanup-event-order.cjs
 *
 * Idempotent: nach dem ersten Lauf gibt es nichts mehr zu tun.
 */
const { createClient } = require('@sanity/client');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error('FEHLER: NEXT_PUBLIC_SANITY_PROJECT_ID fehlt. Mit --env-file=.env.local starten.');
  process.exit(1);
}
if (!token) {
  console.error('FEHLER: SANITY_API_WRITE_TOKEN fehlt in .env.local.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

async function run() {
  const ids = await client.fetch(`*[_type == "event" && defined(order)]._id`);
  if (!ids.length) {
    console.log('Keine Events mit verwaistem order-Feld gefunden — nichts zu tun.');
    return;
  }
  let tx = client.transaction();
  for (const id of ids) tx = tx.patch(id, (p) => p.unset(['order']));
  await tx.commit();
  console.log(`✓ order-Feld aus ${ids.length} Event(s) entfernt.`);
}

run().catch((err) => {
  console.error('\nCleanup fehlgeschlagen:', err.message);
  process.exit(1);
});
