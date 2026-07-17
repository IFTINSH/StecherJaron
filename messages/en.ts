// English UI-chrome dictionary. Keys mirror messages/de.ts exactly.
const messages = {
  meta: {
    title: 'Stecher Jaron — Tattoo Artist Passau',
    titleTemplate: '%s — Stecher Jaron',
    description:
      'Stecher Jaron — tattoo artist in Passau. Dotwork, blackwork & fine-line tattoos. Individual designs, fine detail, clean lines. Studio: Firmianstraße 10, Passau.',
    areaServed: 'Passau and the surrounding area',
  },
  nav: {
    about: 'About',
    portfolio: 'Portfolio',
    wannados: 'Wannado’s',
    studio: 'Studio',
    events: 'Events',
    contact: 'Contact',
  },
  header: {
    menu: 'Menu',
    close: 'Close',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    socialMedia: 'Social Media',
    switchLanguage: 'Switch language',
  },
  sections: {
    portfolio: 'Portfolio',
    studio: 'Studio',
    events: 'Events',
    contact: 'Contact',
    wannados: 'Wannado’s',
  },
  labels: {
    address: 'Address',
    booking: 'Booking',
  },
  wannados: {
    subtitle: 'Designs I’d love to tattoo — pick one.',
    prevSheet: 'Previous sheet',
    nextSheet: 'Next sheet',
    enlargeSheet: 'Enlarge {label}',
  },
  events: {
    loadMore: 'Load more',
    view: 'View event: {title}',
  },
  gallery: {
    all: 'All',
    loadMore: 'Load more',
    seeAll: 'See all',
    enlargeImage: 'Enlarge image',
  },
  video: {
    sound: 'Sound',
    enableSound: 'Enable sound',
    disableSound: 'Mute',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit fullscreen',
  },
  map: {
    loadMap: 'Load map',
    loadMapAria: 'Load Google Maps map',
    mapLoaded: 'Map: Google Maps',
    previewPrefix: 'Preview: ©',
    previewSuffix: ' contributors · Google Maps is embedded when loaded.',
    osm: 'OpenStreetMap',
    iframeTitle: 'Map: {address}',
    imageAlt: 'Map detail: {address}',
  },
  studioSection: {
    address: 'Address',
  },
  howtobook: {
    close: 'Close',
  },
  footer: {
    imprint: 'Legal Notice',
    privacy: 'Privacy',
  },
  lightbox: {
    view: 'Image view',
    back: '← Back',
    close: 'Close',
    prevImage: 'Previous image',
    nextImage: 'Next image',
  },
  studioGrid: {
    enlargePhoto: 'Enlarge photo',
  },
} as const;

export default messages;
