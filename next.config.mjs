/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },

  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
