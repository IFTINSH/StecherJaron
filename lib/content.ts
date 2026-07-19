// ---------------------------------------------------------------------------
// Central content layer. Structured to map 1:1 onto Sanity later (Phase 2).
// For now everything is local so the site is fully viewable without a CMS.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Stecher Jaron',
  wordmark: 'STECHER JARON',
  tagline: 'Tattoo Artist · Passau',
  instagram: {
    handle: '@stecherjaron',
    url: 'https://www.instagram.com/stecherjaron/',
  },
  studio: {
    address: 'Firmianstraße 10, 94032 Passau',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Firmianstra%C3%9Fe+10+Passau',
  },
} as const;

// Absolute hrefs (/#section) so the nav also works from subpages like
// /portfolio or /events/…; on the homepage they still scroll in place.
export const nav = [
  { href: '/#about', label: 'Über mich' },
  { href: '/#work', label: 'Portfolio' },
  { href: '/#wannados', label: 'Wannado’s' },
  { href: '/#studio', label: 'Studio' },
  { href: '/#events', label: 'Events' },
  { href: '/#contact', label: 'Kontakt' },
] as const;

export const about = {
  title: 'Über mich',
  // Short teaser shown under the wordmark in the hero.
  teaser: `Tattoo Artist aus Passau — spezialisiert auf Dotwork, Blackwork & Fine-Line. Jedes Design entsteht individuell für dich.`,
  body: `Bei mir dreht sich alles um dich und dein Tattoo – persönlich und ohne Zeitdruck. Ich arbeite ausschließlich nach Termin, damit jedes Tattoo die Aufmerksamkeit bekommt, die es verdient. Mir ist wichtig, dass du dich wohlfühlst, deshalb gehören bei mir guter Kaffee, HiFi-Sound und eine entspannte Atmosphäre dazu. Meine künstlerischen Schwerpunkte liegen auf Microrealism, Surrealism, Blackwork und Fineline-Tattoos.`,
};

// "How to Book" — persistent overlay content. Booking happens via Instagram.
export const howToBook = {
  title: 'How to Book',
  sections: [
    {
      heading: 'Buchungsanfrage',
      items: [
        'Buchungsanfragen erfolgen ausschließlich über Instagram.',
        'Beschreibe deine Tattoo-Idee möglichst präzise und ergänze sie — falls vorhanden — mit Referenzbildern, Inspirationen oder Skizzen; bei Wannado’s bitte zusätzlich einen Screenshot.',
        'Wenn du die gewünschte Größe bereits einschätzen kannst, teile diese am besten in cm mit; das erleichtert eine erste preisliche Orientierung.',
        'Ein Foto der gewünschten Körperstelle hilft, Placement und Wirkung besser einzuschätzen — ist dir das unangenehm, gib einfach kurz Bescheid, das ist selbstverständlich kein Problem.',
        'Nenne außerdem 2–3 mögliche Termine; aktuell verfügbare Termine findest du in den Instagram-Highlights.',
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

// ---------------------------------------------------------------------------
// Gallery — filterable by style (NISSACO-style category bar).
// NOTE: style categories are PLACEHOLDERS until Jaron confirms them.
// ---------------------------------------------------------------------------
export type TattooStyle = 'Dotwork' | 'Blackwork' | 'Fine-Line';

export const tattooStyles: TattooStyle[] = ['Dotwork', 'Blackwork', 'Fine-Line'];

export interface Tattoo {
  id: string;
  src: string;
  alt: string;
  style: TattooStyle;
}

export const tattoos: Tattoo[] = [
  { id: 't1', src: '/tattoos/tattoo-1.jpeg', alt: 'Tattoo von Stecher Jaron', style: 'Fine-Line' },
  { id: 't2', src: '/tattoos/tattoo-2.jpeg', alt: 'Tattoo von Stecher Jaron', style: 'Blackwork' },
  { id: 't3', src: '/tattoos/tattoo-3.jpeg', alt: 'Tattoo von Stecher Jaron', style: 'Dotwork' },
  { id: 't4', src: '/tattoos/tattoo-4.jpeg', alt: 'Tattoo von Stecher Jaron', style: 'Blackwork' },
  { id: 't5', src: '/tattoos/tattoo-5.jpeg', alt: 'Tattoo von Stecher Jaron', style: 'Fine-Line' },
  { id: 't6', src: '/tattoos/tattoo-6.jpeg', alt: 'Tattoo von Stecher Jaron', style: 'Dotwork' },
  { id: 't7', src: '/tattoos/tattoo-7.jpeg', alt: 'Tattoo von Stecher Jaron', style: 'Blackwork' },
  { id: 't8', src: '/tattoos/tattoo-8.jpeg', alt: 'Tattoo von Stecher Jaron', style: 'Fine-Line' },
];

// ---------------------------------------------------------------------------
// Studio photos (Concept A — editorial sticky)
// ---------------------------------------------------------------------------
export const studioImages = [
  { src: '/studio-photos/studio-1.jpeg', alt: 'Studio Impression', w: 1080, h: 1620 },
  { src: '/studio-photos/studio-2.jpeg', alt: 'Studio Impression', w: 1080, h: 1620 },
  { src: '/studio-photos/studio-3.jpeg', alt: 'Studio Impression', w: 1080, h: 1620 },
  { src: '/studio-photos/studio-4.jpeg', alt: 'Studio Impression', w: 1080, h: 1355 },
  { src: '/studio-photos/studio-5.jpeg', alt: 'Studio Impression', w: 1080, h: 1620 },
  { src: '/studio-photos/studio-6.jpeg', alt: 'Studio Impression', w: 1080, h: 1620 },
  { src: '/studio-photos/studio-7.jpeg', alt: 'Studio Impression', w: 811, h: 1080 },
  { src: '/studio-photos/studio-8.jpeg', alt: 'Studio Impression', w: 1080, h: 1620 },
];

// ---------------------------------------------------------------------------
// Wannados — flash sheets: designs Jaron wants to tattoo, clients pick from them.
// Presented as a horizontal "flash wall": white "paper" sheets on black that you
// drag/swipe through, one in focus at a time (see components/Wannados.tsx).
// Full sheets (never cropped); w/h drive next/image aspect ratio (all ~4:5).
// ---------------------------------------------------------------------------
export interface WannadoSheet {
  src: string;
  alt: string;
  label: string;
  w: number;
  h: number;
}

export const wannados: WannadoSheet[] = [
  { src: '/wannados/wannados-1.jpeg', alt: 'Wannado’s Flash Sheet von Stecher Jaron', label: 'Sheet 01', w: 1638, h: 2048 },
  { src: '/wannados/wannados-2.jpeg', alt: 'Wannado’s Flash Sheet von Stecher Jaron', label: 'Sheet 02', w: 1638, h: 2048 },
  { src: '/wannados/wannados-3.jpeg', alt: 'Wannado’s Flash Sheet von Stecher Jaron', label: 'Sheet 03', w: 1626, h: 2033 },
  { src: '/wannados/wannados-4.jpeg', alt: 'Wannado’s Flash Sheet von Stecher Jaron', label: 'Sheet 04', w: 1638, h: 2048 },
  { src: '/wannados/wannados-5.jpeg', alt: 'Wannado’s Flash Sheet von Stecher Jaron', label: 'Sheet 05', w: 1638, h: 2048 },
  { src: '/wannados/wannados-6.jpeg', alt: 'Wannado’s Flash Sheet von Stecher Jaron', label: 'Sheet 06', w: 1607, h: 2009 },
];

// ---------------------------------------------------------------------------
// Events — overview grid (Chris-Foy-style) → each links to a detail page.
// NOTE: dates / locations / descriptions are PLACEHOLDERS, editable later.
// ---------------------------------------------------------------------------
export interface EventMedia {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

export interface StudioEvent {
  slug: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  cover: string;
  media: EventMedia[];
}

export const events: StudioEvent[] = [
  {
    slug: 'flashdays',
    title: 'Flashdays',
    date: '2025',
    location: 'Passau',
    description:
      'Flashdays im Studio — ausgewählte Designs zu festen Konditionen, spontan stechbar.',
    cover: '/events/flashdays/img-1.jpeg',
    media: [{ type: 'image', src: '/events/flashdays/img-1.jpeg', alt: 'Flashdays' }],
  },
  {
    slug: 'pbc-bootsparty',
    title: 'PBC Bootsparty',
    date: '2025',
    location: 'Passau',
    description: 'Eindrücke von der PBC Bootsparty.',
    cover: '/events/pbc-bootsparty/img-1.jpeg',
    media: [
      { type: 'image', src: '/events/pbc-bootsparty/img-1.jpeg', alt: 'PBC Bootsparty' },
      { type: 'image', src: '/events/pbc-bootsparty/img-2.jpeg', alt: 'PBC Bootsparty' },
    ],
  },
  {
    slug: 'pbc-regensburg',
    title: 'PBC Event Regensburg',
    date: '2025',
    location: 'Tanzdirektion Süd, Regensburg',
    description: 'PBC Event in der Tanzdirektion Süd, Regensburg.',
    cover: '/events/pbc-regensburg/img-1.jpeg',
    media: [
      { type: 'image', src: '/events/pbc-regensburg/img-1.jpeg', alt: 'PBC Event Regensburg' },
      { type: 'image', src: '/events/pbc-regensburg/img-2.jpeg', alt: 'PBC Event Regensburg' },
    ],
  },
  {
    slug: 'traegertal-2026',
    title: 'Trägertal 2026',
    date: '2026',
    location: 'Trägertal',
    description: 'Trägertal Festival 2026.',
    cover: '/events/traegertal-2026/img-1.jpeg',
    media: [{ type: 'image', src: '/events/traegertal-2026/img-1.jpeg', alt: 'Trägertal 2026' }],
  },
  {
    slug: 'traegertal-2025',
    title: 'Trägertal 2025',
    date: '2025',
    location: 'Trägertal',
    description: 'Trägertal Festival 2025.',
    cover: '/events/traegertal-2025/img-1.jpeg',
    media: [{ type: 'image', src: '/events/traegertal-2025/img-1.jpeg', alt: 'Trägertal 2025' }],
  },
  {
    slug: 'sonstige-kunst',
    title: 'Sonstige Kunst',
    date: '',
    description: 'Weitere Arbeiten und künstlerische Projekte abseits der Haut.',
    cover: '/events/sonstige-kunst/img-1.jpeg',
    media: [{ type: 'image', src: '/events/sonstige-kunst/img-1.jpeg', alt: 'Sonstige Kunst' }],
  },
];

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}
