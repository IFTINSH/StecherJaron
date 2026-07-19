// Sanity environment. projectId/dataset come from a free Sanity project
// (set in .env.local + Netlify). Until configured, the site falls back to the
// built-in content in lib/content.ts, so nothing breaks before setup.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';

/** true once a real Sanity project id is present */
export const sanityConfigured = projectId.length > 0;
