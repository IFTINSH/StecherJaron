import { defineType, defineField } from 'sanity';

// Singleton: der Inhalt des "How to Book"-Panels (Floating-Button unten rechts).
export const howToBook = defineType({
  name: 'howToBook',
  title: 'How to Book',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Überschrift', type: 'string', initialValue: 'How to Book' }),
    defineField({
      name: 'sections',
      title: 'Abschnitte',
      type: 'array',
      of: [
        defineField({
          name: 'section',
          title: 'Abschnitt',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Abschnitts-Titel',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'items',
              title: 'Punkte',
              type: 'array',
              of: [{ type: 'text', rows: 2 }],
            }),
          ],
          preview: { select: { title: 'heading' } },
        }),
      ],
    }),
    defineField({ name: 'ctaLabel', title: 'Button-Text', type: 'string' }),
    defineField({ name: 'ctaUrl', title: 'Button-Link (Instagram)', type: 'url' }),
  ],
  preview: { select: { title: 'title' } },
});
