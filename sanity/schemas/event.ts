import { defineType, defineField } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'localeString' }),
    defineField({
      name: 'slug',
      title: 'URL-Slug',
      type: 'slug',
      // Slug is shared across languages → derive it from the German title.
      options: {
        source: (doc) => (doc.title as { de?: string } | undefined)?.de || '',
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      options: { dateFormat: 'DD.MM.YYYY' },
      description: 'Bestimmt die Reihenfolge auf der Website (neueste zuerst).',
    }),
    defineField({ name: 'location', title: 'Ort', type: 'localeString' }),
    defineField({ name: 'description', title: 'Beschreibung', type: 'localeText' }),
    defineField({
      name: 'cover',
      title: 'Cover-Bild',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  orderings: [
    { title: 'Datum (neueste zuerst)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: { select: { title: 'title.de', subtitle: 'date', media: 'cover' } },
});
