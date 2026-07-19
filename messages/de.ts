// German UI-chrome dictionary. Prose content (about, howToBook, events, alt
// texts) comes from Sanity per locale — NOT from here.
const messages = {
  meta: {
    title: 'Stecher Jaron — Tattoo Artist Passau',
    titleTemplate: '%s — Stecher Jaron',
    description:
      'Stecher Jaron — Tattoo Artist aus Passau. Dotwork, Blackwork & Fine-Line Tattoos. Individuelle Designs, feine Details, klare Linien. Studio: Firmianstraße 10, Passau.',
    areaServed: 'Passau und Umgebung',
  },
  nav: {
    about: 'Über mich',
    portfolio: 'Portfolio',
    wannados: 'Wannado’s',
    studio: 'Studio',
    events: 'Events',
    contact: 'Kontakt',
  },
  header: {
    menu: 'Menü',
    close: 'Schließen',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    socialMedia: 'Social Media',
    switchLanguage: 'Sprache wechseln',
  },
  sections: {
    portfolio: 'Portfolio',
    studio: 'Studio',
    events: 'Events',
    contact: 'Kontakt',
    wannados: 'Wannado’s',
  },
  labels: {
    address: 'Adresse',
    booking: 'Booking',
  },
  wannados: {
    subtitle: 'Designs, die ich gerne stechen möchte — such dir eins aus.',
    prevSheet: 'Vorheriges Sheet',
    nextSheet: 'Nächstes Sheet',
    enlargeSheet: '{label} vergrößern',
  },
  events: {
    loadMore: 'Weitere laden',
    view: 'Event ansehen: {title}',
    backToAll: '← Alle Events',
  },
  common: {
    back: '← Zurück',
  },
  pageMeta: {
    portfolioTitle: 'Portfolio',
    portfolioDescription: 'Alle Arbeiten von Stecher Jaron — Dotwork, Blackwork, Fine-Line Tattoos.',
    studioTitle: 'Studio',
    studioDescription: 'Impressionen aus dem Studio von Stecher Jaron in Passau.',
    eventsTitle: 'Events',
    eventsDescription: 'Alle Events von Stecher Jaron — Flashdays, Conventions und mehr.',
  },
  legal: {
    imprintTitle: 'Impressum',
    privacyTitle: 'Datenschutz',
    imprintPlaceholder:
      'Platzhalter — bitte vor Veröffentlichung mit den echten Angaben füllen (Pflicht nach §5 DDG / §18 MStV).',
    imprintAccording: 'Angaben gemäß §5 DDG',
    contact: 'Kontakt',
    responsible: 'Verantwortlich für den Inhalt',
    responsibleName: 'Jaron [Nachname], Anschrift wie oben.',
    privacyPlaceholder:
      'Platzhalter — vor Veröffentlichung mit einer vollständigen Datenschutzerklärung ersetzen (DSGVO). Punkte u. a.: Hosting (Netlify), eingebettete Schriften (lokal via next/font), externe Links (Instagram, Google Maps), später ggf. Sanity (CMS) & Video-Einbettung.',
    privacyBody:
      'Diese Website wird bei Netlify gehostet (Netlify, Inc., San Francisco, Kalifornien, USA). Beim Aufruf der Seite verarbeitet Netlify technisch notwendige Daten (z. B. IP-Adresse) in Server-Logfiles; die Übermittlung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln. Schriften werden lokal ausgeliefert (keine externen Google-Anfragen). Beim Klick auf externe Links (Instagram, Google Maps) gelten die Datenschutzbestimmungen der jeweiligen Anbieter.',
  },
  gallery: {
    all: 'Alle',
    loadMore: 'Mehr laden',
    seeAll: 'Alle ansehen',
    enlargeImage: 'Bild vergrößern',
  },
  video: {
    sound: 'Ton',
    enableSound: 'Ton aktivieren',
    disableSound: 'Ton ausschalten',
    fullscreen: 'Vollbild',
    exitFullscreen: 'Vollbild verlassen',
  },
  map: {
    loadMap: 'Karte laden',
    loadMapAria: 'Google-Maps-Karte laden',
    mapLoaded: 'Karte: Google Maps',
    previewPrefix: 'Vorschau: ©',
    previewSuffix: '-Mitwirkende · Beim Laden wird Google Maps eingebunden.',
    osm: 'OpenStreetMap',
    iframeTitle: 'Karte: {address}',
    imageAlt: 'Kartenausschnitt: {address}',
  },
  studioSection: {
    address: 'Adresse',
  },
  howtobook: {
    close: 'Schließen',
  },
  footer: {
    imprint: 'Impressum',
    privacy: 'Datenschutz',
  },
  lightbox: {
    view: 'Bildansicht',
    back: '← Zurück',
    close: 'Schließen',
    prevImage: 'Vorheriges Bild',
    nextImage: 'Nächstes Bild',
  },
  studioGrid: {
    enlargePhoto: 'Foto vergrößern',
  },
} as const;

export default messages;
