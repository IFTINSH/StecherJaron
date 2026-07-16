import { defineType, defineField } from 'sanity';

export const wannados = defineType({
  name: 'wannados',
  title: 'Wannados (Flash Sheet)',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Flash Sheet',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Bezeichnung',
      type: 'string',
      description: 'Kleiner Text unter dem Sheet, z. B. „Sheet 01".',
      initialValue: 'Sheet',
    }),
    defineField({
      name: 'alt',
      title: 'Bildbeschreibung (Alt-Text)',
      type: 'string',
      initialValue: 'Wannados Flash Sheet von Stecher Jaron',
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Kleinere Zahl = weiter vorne.',
    }),
  ],
  orderings: [
    { title: 'Reihenfolge', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'label', subtitle: 'alt', media: 'image' } },
});
