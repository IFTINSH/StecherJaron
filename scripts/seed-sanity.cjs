/**
 * Einmaliges Seed-Skript: lädt die Bestandsinhalte aus lib/content.ts + die
 * Bilder aus public/ nach Sanity hoch (Über mich, Kategorien, Portfolio, Events).
 *
 * Voraussetzung: Schreib-Token in .env.local als SANITY_API_WRITE_TOKEN
 * (sanity.io/manage -> API -> Tokens -> "Editor").
 *
 * Start:  npm run seed
 *
 * Idempotent für DOKUMENTE (feste _id -> createOrReplace, kein Duplizieren).
 * Bilder werden bei jedem Lauf neu hochgeladen -> Skript nur einmal laufen lassen.
 *
 * WICHTIG: Dokument-IDs dürfen KEINEN Punkt enthalten — Sanity macht Docs mit
 * Punkt-ID automatisch privat (nur mit Token lesbar). Darum Bindestriche.
 */
const { client, uploadImage, projectId, dataset } = require('./_sanity.cjs')('npm run seed');

// --- Daten (Spiegel von lib/content.ts) ---------------------------------------
const about = {
  title: 'Über mich',
  body: `Hey, ich bin Jaron — Tattoo Artist aus Passau. Ich spezialisiere mich auf Dotwork, Blackwork und Fine-Line Tattoos. Jedes meiner Designs entsteht individuell für dich, mit einem Fokus auf feine Details, klare Linien und ausdrucksstarke Kontraste zwischen schwarzer Tinte und Haut. Lass uns gemeinsam deine Vision auf die Haut bringen.`,
};

const howToBook = {
  title: 'How to Book',
  sections: [
    {
      heading: 'Buchungsanfrage',
      items: [
        'Buchungsanfragen erfolgen ausschließlich über Instagram.',
        'Bitte sende eine möglichst präzise Beschreibung deiner Tattoo-Idee oder Wunschvorstellung.',
        'Falls vorhanden, ergänze deine Anfrage gerne mit Referenzbildern, Inspirationen oder Skizzen.',
        'Bei Wannados füge bitte zusätzlich einen entsprechenden Screenshot bei.',
        'Wenn du die gewünschte Größe bereits einschätzen kannst, teile diese am besten in cm mit; das erleichtert eine erste preisliche Orientierung.',
        'Ein Foto der gewünschten Körperstelle hilft dabei, Placement und Wirkung besser einzuschätzen.',
        'Sollte es dir unangenehm sein, ein Foto der Stelle zu schicken, ist das selbstverständlich kein Problem — gib in dem Fall einfach kurz Bescheid.',
        'Bitte nenne außerdem 2–3 Termine, die für dich grundsätzlich infrage kommen.',
        'Aktuelle verfügbare Termine findest du in den Instagram-Highlights.',
      ],
    },
    {
      heading: 'Terminreservierung',
      items: [
        'Für die verbindliche Buchung eines Termins wird eine nicht erstattbare Anzahlung in Höhe von 50 € erhoben.',
        'Diese Anzahlung deckt die Ausarbeitung deines individuellen Entwurfs ab und dient zugleich der verbindlichen Reservierung deines Termins.',
      ],
    },
    {
      heading: 'Stil und Zusammenarbeit',
      items: [
        'Auch neue, besondere oder stilistisch unkonventionelle Ideen sind jederzeit willkommen.',
        'Entscheidend ist, dass Motiv, Stil und Umsetzung für beide Seiten stimmig sind.',
        'Die beste Arbeit entsteht immer dann, wenn eine gemeinsame kreative Basis vorhanden ist und das Projekt von Anfang an auf gegenseitigem Vertrauen beruht.',
      ],
    },
  ],
  ctaLabel: 'Auf Instagram schreiben',
  ctaUrl: 'https://www.instagram.com/stecherjaron/',
};

// Reihenfolge = order; Key = wird zur deterministischen _id (category-<key>)
const categories = [
  { key: 'dotwork', title: 'Dotwork', order: 1 },
  { key: 'blackwork', title: 'Blackwork', order: 2 },
  { key: 'fineline', title: 'Fine-Line', order: 3 },
];
const styleToCatKey = { Dotwork: 'dotwork', Blackwork: 'blackwork', 'Fine-Line': 'fineline' };

const tattoos = [
  { id: 't1', file: 'tattoos/tattoo-1.jpeg', style: 'Fine-Line' },
  { id: 't2', file: 'tattoos/tattoo-2.jpeg', style: 'Blackwork' },
  { id: 't3', file: 'tattoos/tattoo-3.jpeg', style: 'Dotwork' },
  { id: 't4', file: 'tattoos/tattoo-4.jpeg', style: 'Blackwork' },
  { id: 't5', file: 'tattoos/tattoo-5.jpeg', style: 'Fine-Line' },
  { id: 't6', file: 'tattoos/tattoo-6.jpeg', style: 'Dotwork' },
  { id: 't7', file: 'tattoos/tattoo-7.jpeg', style: 'Blackwork' },
  { id: 't8', file: 'tattoos/tattoo-8.jpeg', style: 'Fine-Line' },
];

const events = [
  { slug: 'flashdays', title: 'Flashdays', date: '2025', location: 'Passau',
    description: 'Flashdays im Studio — ausgewählte Designs zu festen Konditionen, spontan stechbar.',
    files: ['events/flashdays/img-1.jpeg'] },
  { slug: 'pbc-bootsparty', title: 'PBC Bootsparty', date: '2025', location: 'Passau',
    description: 'Eindrücke von der PBC Bootsparty.',
    files: ['events/pbc-bootsparty/img-1.jpeg', 'events/pbc-bootsparty/img-2.jpeg'] },
  { slug: 'pbc-regensburg', title: 'PBC Event Regensburg', date: '2025', location: 'Tanzdirektion Süd, Regensburg',
    description: 'PBC Event in der Tanzdirektion Süd, Regensburg.',
    files: ['events/pbc-regensburg/img-1.jpeg', 'events/pbc-regensburg/img-2.jpeg'] },
  { slug: 'traegertal-2026', title: 'Trägertal 2026', date: '2026', location: 'Trägertal',
    description: 'Trägertal Festival 2026.',
    files: ['events/traegertal-2026/img-1.jpeg'] },
  { slug: 'traegertal-2025', title: 'Trägertal 2025', date: '2025', location: 'Trägertal',
    description: 'Trägertal Festival 2025.',
    files: ['events/traegertal-2025/img-1.jpeg'] },
  { slug: 'sonstige-kunst', title: 'Sonstige Kunst', date: '', location: '',
    description: 'Weitere Arbeiten und künstlerische Projekte abseits der Haut.',
    files: ['events/sonstige-kunst/img-1.jpeg'] },
];

// --- Helfer -------------------------------------------------------------------
function imageField(assetId) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } };
}

// --- Lauf ---------------------------------------------------------------------
async function run() {
  console.log(`Seeding -> Projekt ${projectId} / Dataset ${dataset}\n`);

  // 1) Über mich
  await client.createOrReplace({ _id: 'about', _type: 'about', title: about.title, body: about.body });
  console.log('✓ Über mich');

  // 1b) How to Book
  await client.createOrReplace({
    _id: 'howToBook',
    _type: 'howToBook',
    title: howToBook.title,
    sections: howToBook.sections.map((s, si) => ({
      _key: `s${si}`,
      _type: 'section',
      heading: s.heading,
      items: s.items,
    })),
    ctaLabel: howToBook.ctaLabel,
    ctaUrl: howToBook.ctaUrl,
  });
  console.log('✓ How to Book');

  // 2) Kategorien
  for (const c of categories) {
    await client.createOrReplace({ _id: `category-${c.key}`, _type: 'category', title: c.title, order: c.order });
  }
  console.log(`✓ ${categories.length} Kategorien`);

  // 3) Portfolio (Tattoos)
  let i = 0;
  for (const t of tattoos) {
    i++;
    const img = await uploadImage(t.file);
    const catKey = styleToCatKey[t.style];
    await client.createOrReplace({
      _id: `tattoo-${t.id}`,
      _type: 'tattoo',
      image: img,
      alt: 'Tattoo von Stecher Jaron',
      category: { _type: 'reference', _ref: `category-${catKey}` },
      order: i,
    });
    console.log(`✓ Tattoo ${t.id} (${t.style})`);
  }

  // 4) Events (Sortierung auf der Website läuft über 'date', nicht über order)
  for (const ev of events) {
    const coverAndImages = [];
    for (const f of ev.files) coverAndImages.push(await uploadImage(f));
    const [cover, ...rest] = coverAndImages;
    const doc = {
      _id: `event-${ev.slug}`,
      _type: 'event',
      title: ev.title,
      slug: { _type: 'slug', current: ev.slug },
      date: ev.date || undefined,
      location: ev.location || undefined,
      description: ev.description || undefined,
      cover,
    };
    // Alle hochgeladenen Bilder (inkl. Cover) in die Galerie; Array-Keys ergänzen
    doc.images = coverAndImages.map((img, idx) => ({ ...img, _key: `img-${idx}` }));
    await client.createOrReplace(doc);
    console.log(`✓ Event ${ev.slug} (${ev.files.length} Bild/er)`);
  }

  console.log('\nFertig. Im Studio (/studio) sind jetzt alle Inhalte sichtbar.');
}

run().catch((err) => {
  console.error('\nSeed fehlgeschlagen:', err.message);
  process.exit(1);
});
