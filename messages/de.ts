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
    subtitle: 'Inspiration für dein Design.',
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
    imprint: {
      accordingTitle: 'Angaben gemäß § 5 DDG',
      name: 'Jaron Bock',
      business: 'Stecher Jaron — Tattoostudio',
      contactTitle: 'Kontakt',
      emailLabel: 'E-Mail',
      email: 'Tattoostudio.jaronbock@gmail.com',
      responsibleTitle: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
      responsibleBody: 'Jaron Bock, Anschrift wie oben.',
      vatTitle: 'Umsatzsteuer',
      vatBody:
        'Gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen (Kleinunternehmerregelung).',
      disputeTitle: 'Verbraucherstreitbeilegung',
      disputeBody:
        'Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).',
      linksTitle: 'Haftung für externe Links',
      linksBody:
        'Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für diese Inhalte ist stets der jeweilige Anbieter verantwortlich; zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.',
    },
    privacy: {
      translationNote: '',
      updated:
        'Stand: Juli 2026. Wir passen diese Erklärung an, wenn sich die Website oder die Rechtslage ändert.',
      sections: [
        {
          title: 'Verantwortlicher',
          paragraphs: [
            'Verantwortlicher für die Datenverarbeitung auf dieser Website ist: Jaron Bock, Stecher Jaron — Tattoostudio, Firmianstraße 10, 94032 Passau, E-Mail: Tattoostudio.jaronbock@gmail.com.',
            'Ein Datenschutzbeauftragter ist nicht bestellt — hierzu besteht keine gesetzliche Pflicht.',
          ],
        },
        {
          title: 'Hosting bei Netlify',
          paragraphs: [
            'Diese Website wird bei Netlify gehostet (Netlify, Inc., San Francisco, Kalifornien, USA). Beim Aufruf der Website verarbeitet Netlify automatisch Server-Logfiles mit Informationen, die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite bzw. Datei, Browsertyp und -version, Betriebssystem sowie Referrer-URL.',
            'Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse ist die zuverlässige und sichere Auslieferung der Website. Die Logdaten werden von Netlify nur kurzzeitig gespeichert und anschließend gelöscht. Mit Netlify besteht ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO); eine Übermittlung personenbezogener Daten in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln (Art. 46 DSGVO). Weitere Informationen: netlify.com/privacy.',
          ],
        },
        {
          title: 'Bilder-Auslieferung über Sanity',
          paragraphs: [
            'Die Inhalte dieser Website (insbesondere Fotos) werden mit dem Content-Management-System Sanity verwaltet und über dessen Content Delivery Network (cdn.sanity.io) ausgeliefert (Sanity, Inc., San Francisco, USA). Beim Laden der Bilder wird Ihre IP-Adresse an Sanity übermittelt; dies ist technisch notwendig, um die Inhalte anzuzeigen.',
            'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der performanten Bereitstellung der Inhalte); eine Übermittlung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln. Weitere Informationen: sanity.io/legal/privacy.',
          ],
        },
        {
          title: 'Google Maps (Zwei-Klick-Lösung)',
          paragraphs: [
            'Für die Anfahrt binden wir eine Karte von Google Maps ein — aus Datenschutzgründen als Zwei-Klick-Lösung: Zunächst sehen Sie nur ein lokal gespeichertes Vorschaubild (auf Basis von OpenStreetMap-Kartenmaterial); dabei werden keine Daten an Google oder OpenStreetMap übertragen.',
            'Erst wenn Sie auf „Karte laden“ klicken, wird die interaktive Karte von Google Maps geladen. Dabei werden Daten (u. a. Ihre IP-Adresse) an Google übermittelt, und Google kann Cookies setzen. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland; Daten können dabei auch in die USA (Google LLC) übermittelt werden. Google ist nach dem EU-U.S. Data Privacy Framework zertifiziert.',
            'Rechtsgrundlage ist Ihre Einwilligung per Klick (Art. 6 Abs. 1 lit. a DSGVO). Sie gilt für den aktuellen Seitenaufruf; nach einem Neuladen der Seite wird die Karte erst nach erneutem Klick geladen. Weitere Informationen: policies.google.com/privacy.',
          ],
        },
        {
          title: 'Schriften, Cookies & Tracking',
          paragraphs: [
            'Die verwendeten Schriften sind lokal eingebunden; beim Aufruf der Website findet keine Verbindung zu Google Fonts oder anderen Schriftenanbietern statt.',
            'Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Tools. Lediglich nach dem aktiven Laden der Google-Karte (siehe oben) kann Google Cookies setzen.',
          ],
        },
        {
          title: 'Kontaktaufnahme',
          paragraphs: [
            'Wenn Sie uns per E-Mail oder über Instagram kontaktieren (z. B. für eine Buchungsanfrage), verarbeiten wir die dabei mitgeteilten Daten (Name bzw. Nutzername, Kontaktdaten, Inhalt der Anfrage), um Ihre Anfrage zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO. Wir löschen die Daten, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
            'Für die Kommunikation über Instagram gilt ergänzend die Datenschutzerklärung von Meta Platforms Ireland Limited.',
          ],
        },
        {
          title: 'Externe Links',
          paragraphs: [
            'Diese Website enthält Links zu externen Websites (z. B. Instagram, Google Maps, OpenStreetMap). Beim Anklicken gelten die Datenschutzbestimmungen des jeweiligen Anbieters.',
          ],
        },
        {
          title: 'Verschlüsselung',
          paragraphs: [
            'Diese Website nutzt eine SSL-/TLS-Verschlüsselung (erkennbar an „https://“ in der Adresszeile), um übertragene Daten zu schützen.',
          ],
        },
        {
          title: 'Ihre Rechte',
          paragraphs: [
            'Sie haben im Rahmen der DSGVO folgende Rechte: Auskunft über Ihre gespeicherten Daten (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21). Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3). Eine formlose E-Mail an die oben genannte Adresse genügt.',
            'Zudem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für uns zuständig: Bayerisches Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach.',
          ],
        },
      ],
    },
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
