import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { dataset, projectId, sanityConfigured } from './env';

const builder = sanityConfigured ? imageUrlBuilder({ projectId, dataset }) : null;

/** Build a CDN URL for a Sanity image at a given width (auto format). */
export function imageUrl(source: SanityImageSource, width = 1200): string | null {
  if (!builder || !source) return null;
  return builder.image(source).width(width).auto('format').url();
}
