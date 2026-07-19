'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { site as siteFallback } from '@/lib/content';
import type { SiteSettings } from '@/lib/data';

// Global site data (address, Instagram, tagline) fetched once on the server and
// shared with all client components below, so they don't each need it threaded
// as props. Server components read getSiteSettings() directly instead.
const SiteContext = createContext<SiteSettings | null>(null);

export function SiteProvider({ value, children }: { value: SiteSettings; children: ReactNode }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

// Falls back to the static content.ts site when no provider is present, so the
// hook is always safe to call.
export function useSite(): SiteSettings {
  return useContext(SiteContext) ?? (siteFallback as unknown as SiteSettings);
}
