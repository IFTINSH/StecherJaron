import { Jost, Inter } from 'next/font/google';

// Display / wordmark — thin geometric, all-caps, wide tracking (matches Moritz's screenshot)
export const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

// Body — clean, neutral, highly readable
export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});
