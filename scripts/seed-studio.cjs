/**
 * Nachträgliches Seed-Skript NUR für die Studio-Fotos (schema: studioImage) —
 * lädt public/studio-photos/*.jpeg nach Sanity hoch. Getrennt vom großen
 * seed-sanity.cjs, damit dessen Bilder nicht erneut hochgeladen werden.
 *
 * Voraussetzung: Schreib-Token in .env.local als SANITY_API_WRITE_TOKEN.
 * Start:  npm run seed:studio
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
  console.error('FEHLER: NEXT_PUBLIC_SANITY_PROJECT_ID fehlt. Mit --env-file=.env.local starten (npm run seed:studio).');
  process.exit(1);
}
if (!token) {
  console.error('FEHLER: SANITY_API_WRITE_TOKEN fehlt in .env.local. Token in sanity.io/manage -> API -> Tokens (Editor) anlegen.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const PUBLIC = path.join(__dirname, '..', 'public');

// Spiegel von lib/content.ts (studioImages) — Reihenfolge = order
const studioPhotos = [
  'studio-photos/studio-1.jpeg',
  'studio-photos/studio-2.jpeg',
  'studio-photos/studio-3.jpeg',
  'studio-photos/studio-4.jpeg',
  'studio-photos/studio-5.jpeg',
  'studio-photos/studio-6.jpeg',
  'studio-photos/studio-7.jpeg',
  'studio-photos/studio-8.jpeg',
];

async function uploadImage(relPath) {
  const abs = path.join(PUBLIC, relPath);
  const stream = fs.createReadStream(abs);
  const asset = await client.assets.upload('image', stream, { filename: path.basename(abs) });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function run() {
  console.log(`Seeding Studio-Fotos -> Projekt ${projectId} / Dataset ${dataset}\n`);

  let i = 0;
  for (const file of studioPhotos) {
    i++;
    const img = await uploadImage(file);
    await client.createOrReplace({
      _id: `studio-foto-${i}`,
      _type: 'studioImage',
      image: img,
      alt: 'Studio Impression',
      order: i,
    });
    console.log(`✓ Studio-Foto ${i}/${studioPhotos.length}`);
  }

  console.log('\nFertig. Im Studio (/studio) unter "Studio-Fotos" sichtbar.');
}

run().catch((err) => {
  console.error('\nSeed fehlgeschlagen:', err.message);
  process.exit(1);
});
