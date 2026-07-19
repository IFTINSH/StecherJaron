/**
 * Nachträgliches Seed-Skript NUR für die Wannado's (schema: wannados) —
 * lädt public/wannados/*.jpeg nach Sanity hoch und legt je ein Dokument an.
 * Ohne diese Dokumente ist die Liste "Wannado's" im Studio leer und die Seite
 * zeigt nur den content.ts-Fallback.
 *
 * Voraussetzung: Schreib-Token in .env.local als SANITY_API_WRITE_TOKEN.
 * Start:  npm run seed:wannados
 *
 * Idempotent für DOKUMENTE (feste _id -> createOrReplace). Bild-Assets werden
 * bei jedem Lauf neu hochgeladen -> nur einmal laufen lassen.
 */
const path = require('path');
const fs = require('fs');
const { createClient } = require('@sanity/client');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error('FEHLER: NEXT_PUBLIC_SANITY_PROJECT_ID fehlt. Mit --env-file=.env.local starten (npm run seed:wannados).');
  process.exit(1);
}
if (!token) {
  console.error('FEHLER: SANITY_API_WRITE_TOKEN fehlt in .env.local. Token in sanity.io/manage -> API -> Tokens (Editor) anlegen.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const PUBLIC = path.join(__dirname, '..', 'public');

// Spiegel von lib/content.ts (wannados) — Reihenfolge = order
const sheets = [
  'wannados/wannados-1.jpeg',
  'wannados/wannados-2.jpeg',
  'wannados/wannados-3.jpeg',
  'wannados/wannados-4.jpeg',
  'wannados/wannados-5.jpeg',
  'wannados/wannados-6.jpeg',
];

async function uploadImage(relPath) {
  const abs = path.join(PUBLIC, relPath);
  const stream = fs.createReadStream(abs);
  const asset = await client.assets.upload('image', stream, { filename: path.basename(abs) });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function run() {
  console.log(`Seeding Wannado's -> Projekt ${projectId} / Dataset ${dataset}\n`);

  let i = 0;
  for (const file of sheets) {
    i++;
    const img = await uploadImage(file);
    await client.createOrReplace({
      _id: `wannado-${i}`,
      _type: 'wannados',
      image: img,
      label: `Sheet ${String(i).padStart(2, '0')}`,
      alt: {
        de: 'Wannado’s Flash Sheet von Stecher Jaron',
        en: 'Wannado’s flash sheet by Stecher Jaron',
      },
      order: i,
    });
    console.log(`✓ Wannado ${i}/${sheets.length}`);
  }

  console.log('\nFertig. Im Studio (/studio) unter "Wannado’s" sichtbar.');
}

run().catch((err) => {
  console.error('\nSeed fehlgeschlagen:', err.message);
  process.exit(1);
});
