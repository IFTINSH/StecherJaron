/**
 * Seed-Skript für das Singleton "Einstellungen" (schema: siteSettings) —
 * legt das eine Dokument mit den aktuellen Werten aus lib/content.ts an, damit
 * das Studio-Feld nicht leer ist. Danach dort editierbar (Adresse, Maps-Link,
 * Instagram, Tagline).
 *
 * Voraussetzung: Schreib-Token in .env.local als SANITY_API_WRITE_TOKEN.
 * Start:  npm run seed:site
 *
 * Idempotent (feste _id -> createOrReplace) — überschreibt Studio-Änderungen,
 * also nur einmalig zum Anlegen laufen lassen.
 */
const { client, projectId, dataset } = require('./_sanity.cjs')('npm run seed:site');

async function run() {
  console.log(`Seeding Einstellungen -> Projekt ${projectId} / Dataset ${dataset}\n`);
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    address: 'Firmianstraße 10, 94032 Passau',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Firmianstra%C3%9Fe+10+Passau',
    instagramHandle: '@stecherjaron',
    instagramUrl: 'https://www.instagram.com/stecherjaron/',
    tagline: 'Tattoo Artist · Passau',
  });
  console.log('✓ Einstellungen angelegt\n\nIm Studio (/studio) unter "Einstellungen" sichtbar.');
}

run().catch((err) => {
  console.error('\nSeed fehlgeschlagen:', err.message);
  process.exit(1);
});
