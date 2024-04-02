/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: 'placehold.co',
      }
    ],
    dangerouslyAllowSVG: true,
  }
};

export default nextConfig;
