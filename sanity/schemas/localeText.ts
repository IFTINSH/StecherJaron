import { defineType, defineField } from 'sanity';

// Multi-line variant of localeString (see localeString.ts).
export const localeText = defineType({
  name: 'localeText',
  title: 'Text (DE / EN)',
  type: 'object',
  fields: [
    defineField({ name: 'de', title: 'Deutsch', type: 'text', rows: 4 }),
    defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
  ],
});
