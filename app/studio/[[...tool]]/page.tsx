import { NextStudio } from 'next-sanity/studio';
import { metadata as studioMetadata, viewport } from 'next-sanity/studio';
import config from '@/sanity.config';

// Embedded Sanity Studio — Jaron's dashboard at /studio (Sanity login required).
export const dynamic = 'force-static';
export { viewport };

// Keep the admin dashboard out of search indexes (also disallowed in robots.txt).
export const metadata = {
  ...studioMetadata,
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
