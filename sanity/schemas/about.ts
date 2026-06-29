import { defineType, defineField } from 'sanity';

export const about = defineType({
  name: 'about',
  title: 'Über mich',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Überschrift', type: 'string', initialValue: 'Über mich' }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'text',
      rows: 8,
      description: 'Absätze bleiben erhalten (leere Zeile = neuer Absatz).',
    }),
  ],
  preview: { select: { title: 'title' } },
});
