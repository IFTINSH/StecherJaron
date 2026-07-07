import { defineType, defineField } from 'sanity';

export const studioImage = defineType({
  name: 'studioImage',
  title: 'Studio-Foto',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Bildbeschreibung (Alt-Text)',
      type: 'string',
      initialValue: 'Studio Impression',
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Kleinere Zahl = weiter vorne (Startseite zeigt die ersten drei).',
    }),
  ],
  orderings: [
    { title: 'Reihenfolge', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'alt', media: 'image' } },
});
