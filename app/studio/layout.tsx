import { jost, inter } from '@/lib/fonts';
import '../globals.css';

// Separate (un-localized) root layout for the Sanity Studio at /studio.
// Kept outside the [locale] tree so editors always use /studio, never /en/studio.
export default function StudioRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${jost.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
