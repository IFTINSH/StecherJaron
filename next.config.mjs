/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false, // Next.js Dev-Tools-Indikator ("N") ausblenden
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
