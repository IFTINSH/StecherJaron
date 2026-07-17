import { defineType, defineField } from 'sanity';

// Field-level i18n: one value with a German and an English variant, shown inline
// in a single document (no /en/studio, no duplicate documents). GROQ reads
// `field.de` / `field[$locale]`; the public site picks the right one per locale.
export const localeString = defineType({
  name: 'localeString',
  title: 'Text (DE / EN)',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({ name: 'de', title: 'Deutsch', type: 'string' }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
  ],
});
