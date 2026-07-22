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
const { client, uploadImage, projectId, dataset } = require('./_sanity.cjs')('npm run seed:wannados');

// Spiegel von lib/content.ts (wannados) — Reihenfolge = order
const sheets = [
  'wannados/wannados-1.jpeg',
  'wannados/wannados-2.jpeg',
  'wannados/wannados-3.jpeg',
  'wannados/wannados-4.jpeg',
  'wannados/wannados-5.jpeg',
  'wannados/wannados-6.jpeg',
];


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
