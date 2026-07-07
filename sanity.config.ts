'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { projectId, dataset, apiVersion } from './sanity/env';

export default defineConfig({
  name: 'stecher-jaron',
  title: 'Stecher Jaron',
  // 'placeholder' keeps builds green until the real id is set in .env.local
  projectId: projectId || 'placeholder',
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhalt')
          .items([
            S.listItem()
              .title('Über mich')
              .id('about')
              .child(S.document().schemaType('about').documentId('about')),
            S.listItem()
              .title('How to Book')
              .id('howToBook')
              .child(S.document().schemaType('howToBook').documentId('howToBook')),
            S.divider(),
            S.documentTypeListItem('category').title('Kategorien'),
            S.documentTypeListItem('tattoo').title('Portfolio'),
            S.documentTypeListItem('studioImage').title('Studio-Fotos'),
            S.documentTypeListItem('event').title('Events'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
