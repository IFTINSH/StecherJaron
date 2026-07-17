import { defineType, defineField } from 'sanity';

export const tattoo = defineType({
  name: 'tattoo',
  title: 'Portfolio-Bild',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'alt', title: 'Bildbeschreibung (Alt-Text)', type: 'localeString' }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Kleinere Zahl = weiter vorne im Portfolio.',
    }),
  ],
  orderings: [
    { title: 'Reihenfolge', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'alt.de', subtitle: 'category.title', media: 'image' } },
});
