import { defineType, defineField } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'URL-Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      options: { dateFormat: 'DD.MM.YYYY' },
      description: 'Bestimmt die Reihenfolge auf der Website (neueste zuerst).',
    }),
    defineField({ name: 'location', title: 'Ort', type: 'string' }),
    defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 4 }),
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
  preview: { select: { title: 'title', subtitle: 'date', media: 'cover' } },
});
