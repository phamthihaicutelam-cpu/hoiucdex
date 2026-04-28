/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploads.mangadex.org',
        pathname: '/covers/**',
      },
      // FIX: chapter pages cũng từ uploads.mangadex.org/data/
      {
        protocol: 'https',
        hostname: 'uploads.mangadex.org',
        pathname: '/data/**',
      },
      // FIX: MangaDex CDN nodes cho chapter images
      {
        protocol: 'https',
        hostname: '*.mangadex.network',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
