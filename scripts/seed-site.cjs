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
const { createClient } = require('@sanity/client');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error('FEHLER: NEXT_PUBLIC_SANITY_PROJECT_ID fehlt. Mit --env-file=.env.local starten (npm run seed:site).');
  process.exit(1);
}
if (!token) {
  console.error('FEHLER: SANITY_API_WRITE_TOKEN fehlt in .env.local. Token in sanity.io/manage -> API -> Tokens (Editor) anlegen.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

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
