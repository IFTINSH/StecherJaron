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
const { client, uploadImage, projectId, dataset } = require('./_sanity.cjs')('npm run seed:studio');

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
