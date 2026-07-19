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
    backToAll: '← All events',
  },
  common: {
    back: '← Back',
  },
  pageMeta: {
    portfolioTitle: 'Portfolio',
    portfolioDescription: 'All works by Stecher Jaron — dotwork, blackwork, fine-line tattoos.',
    studioTitle: 'Studio',
    studioDescription: "Impressions from Stecher Jaron's studio in Passau.",
    eventsTitle: 'Events',
    eventsDescription: 'All events by Stecher Jaron — flash days, conventions and more.',
  },
  legal: {
    imprintTitle: 'Legal Notice',
    privacyTitle: 'Privacy Policy',
    imprint: {
      accordingTitle: 'Information pursuant to § 5 DDG (German Digital Services Act)',
      name: 'Jaron Bock',
      business: 'Stecher Jaron — Tattoo Studio',
      contactTitle: 'Contact',
      emailLabel: 'Email',
      email: 'Tattoostudio.jaronbock@gmail.com',
      responsibleTitle: 'Responsible for the content pursuant to § 18 (2) MStV',
      responsibleBody: 'Jaron Bock, address as above.',
      vatTitle: 'VAT',
      vatBody:
        'No VAT is charged or shown pursuant to § 19 UStG (German small business regulation).',
      disputeTitle: 'Consumer dispute resolution',
      disputeBody:
        'We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board (§ 36 VSBG).',
      linksTitle: 'Liability for external links',
      linksBody:
        'This website contains links to external third-party websites over whose content we have no control. The respective provider is always responsible for that content; no legal violations were apparent at the time the links were set.',
    },
    privacy: {
      translationNote:
        'This English version is a convenience translation. The German version is legally authoritative.',
      updated:
        'Last updated: July 2026. We will amend this policy if the website or the legal situation changes.',
      sections: [
        {
          title: 'Controller',
          paragraphs: [
            'The controller responsible for data processing on this website is: Jaron Bock, Stecher Jaron — Tattoo Studio, Firmianstraße 10, 94032 Passau, Germany, email: Tattoostudio.jaronbock@gmail.com.',
            'No data protection officer has been appointed — there is no legal obligation to do so.',
          ],
        },
        {
          title: 'Hosting with Netlify',
          paragraphs: [
            'This website is hosted by Netlify (Netlify, Inc., San Francisco, California, USA). When you visit the website, Netlify automatically processes server log files containing information transmitted by your browser: IP address, date and time of access, page or file requested, browser type and version, operating system, and referrer URL.',
            'Processing is based on Art. 6 (1) (f) GDPR; our legitimate interest is the reliable and secure delivery of the website. Netlify stores the log data only briefly and then deletes it. A data processing agreement (Art. 28 GDPR) is in place with Netlify; any transfer of personal data to the USA is based on the EU Standard Contractual Clauses (Art. 46 GDPR). More information: netlify.com/privacy.',
          ],
        },
        {
          title: 'Image delivery via Sanity',
          paragraphs: [
            'The content of this website (in particular photos) is managed with the content management system Sanity and delivered via its content delivery network (cdn.sanity.io) (Sanity, Inc., San Francisco, USA). When images are loaded, your IP address is transmitted to Sanity; this is technically necessary to display the content.',
            'The legal basis is Art. 6 (1) (f) GDPR (legitimate interest in performant content delivery); transfers to the USA are based on the EU Standard Contractual Clauses. More information: sanity.io/legal/privacy.',
          ],
        },
        {
          title: 'Google Maps (two-click solution)',
          paragraphs: [
            'For directions we embed a Google Maps map — as a two-click solution for privacy reasons: initially you only see a locally stored preview image (based on OpenStreetMap map material); no data is transmitted to Google or OpenStreetMap at this stage.',
            'Only when you click “Load map” is the interactive Google Maps map loaded. Data (including your IP address) is then transmitted to Google, and Google may set cookies. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland; data may also be transferred to the USA (Google LLC). Google is certified under the EU-U.S. Data Privacy Framework.',
            'The legal basis is your consent given by clicking (Art. 6 (1) (a) GDPR). It applies to the current page view; after reloading the page, the map will only load again after another click. More information: policies.google.com/privacy.',
          ],
        },
        {
          title: 'Fonts, cookies & tracking',
          paragraphs: [
            'The fonts used are embedded locally; no connection to Google Fonts or other font providers is established when you visit the website.',
            'This website does not set cookies and does not use any analytics or tracking tools. Only after actively loading the Google map (see above) may Google set cookies.',
          ],
        },
        {
          title: 'Contacting us',
          paragraphs: [
            'If you contact us by email or via Instagram (e.g. with a booking enquiry), we process the data you provide (name or username, contact details, content of the enquiry) in order to handle your enquiry. The legal basis is Art. 6 (1) (b) GDPR (steps prior to entering into a contract) or Art. 6 (1) (f) GDPR. We delete the data as soon as it is no longer required to handle the enquiry and no statutory retention obligations apply.',
            'For communication via Instagram, the privacy policy of Meta Platforms Ireland Limited additionally applies.',
          ],
        },
        {
          title: 'External links',
          paragraphs: [
            'This website contains links to external websites (e.g. Instagram, Google Maps, OpenStreetMap). When you click them, the privacy policies of the respective providers apply.',
          ],
        },
        {
          title: 'Encryption',
          paragraphs: [
            'This website uses SSL/TLS encryption (recognisable by “https://” in the address bar) to protect transmitted data.',
          ],
        },
        {
          title: 'Your rights',
          paragraphs: [
            'Under the GDPR you have the following rights: access to your stored data (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20), and objection to processing based on Art. 6 (1) (f) GDPR (Art. 21). You may withdraw any consent you have given at any time with effect for the future (Art. 7 (3)). An informal email to the address given above is sufficient.',
            'You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). The authority responsible for us is the Bavarian State Office for Data Protection Supervision (BayLDA), Promenade 18, 91522 Ansbach, Germany.',
          ],
        },
      ],
    },
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
