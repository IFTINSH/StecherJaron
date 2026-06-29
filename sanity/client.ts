import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, sanityConfigured } from './env';

// null until a Sanity project is configured (then lib/data.ts uses it; otherwise
// it falls back to lib/content.ts).
export const client = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
