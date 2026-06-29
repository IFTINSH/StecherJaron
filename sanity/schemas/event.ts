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
    defineField({ name: 'date', title: 'Datum', type: 'string', description: 'z. B. „12. Juli 2026"' }),
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
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Kleinere Zahl = weiter vorne in der Event-Übersicht.',
    }),
  ],
  orderings: [
    { title: 'Reihenfolge', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'title', subtitle: 'date', media: 'cover' } },
});
