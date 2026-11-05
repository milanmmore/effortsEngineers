/** @type {import('next').NextConfig} */
const isIndexingEnabled = process.env.ALLOW_INDEXING === 'true';

const nextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    return isIndexingEnabled
      ? []
      : [
          {
            source: '/:path*',
            headers: [
              {
                key: 'X-Robots-Tag',
                value: 'noindex, nofollow',
              },
            ],
          },
        ];
  },
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
};

module.exports = nextConfig;
