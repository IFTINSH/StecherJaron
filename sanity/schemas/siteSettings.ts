import { defineType, defineField } from 'sanity';

// Singleton: global site data used in many places (address, maps, Instagram,
// tagline). Editing it here keeps a single source of truth so a moved studio or
// a new Instagram handle never needs a code change. Read via getSiteSettings().
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Einstellungen',
  type: 'document',
  groups: [
    { name: 'studio', title: 'Studio' },
    { name: 'social', title: 'Social' },
    { name: 'brand', title: 'Marke' },
  ],
  fields: [
    defineField({
      name: 'address',
      title: 'Studio-Adresse',
      type: 'string',
      description: 'Format „Straße Nr, PLZ Ort" — steht in Studio, Kontakt, Impressum und den Metadaten.',
      group: 'studio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mapsUrl',
      title: 'Google-Maps-Link',
      type: 'url',
      description: 'Ziel des Adress-Links (öffnet Google Maps).',
      group: 'studio',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram-Handle',
      type: 'string',
      description: 'Mit @, z. B. @stecherjaron.',
      group: 'social',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram-Link',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Kurzzeile unter dem Namen (Hero + Metadaten), z. B. „Tattoo Artist · Passau".',
      group: 'brand',
    }),
  ],
  preview: {
    select: { title: 'address' },
    prepare: ({ title }) => ({ title: 'Einstellungen', subtitle: title }),
  },
});
