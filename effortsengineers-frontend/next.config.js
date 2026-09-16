/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  ...(isGithubPages
    ? {
        basePath: '/effortsEngineers',
        assetPrefix: '/effortsEngineers/',
        env: {
          NEXT_PUBLIC_BASE_PATH: '/effortsEngineers',
        },
      }
    : {
        env: {
          NEXT_PUBLIC_BASE_PATH: '',
        },
      }),
  images: {
    unoptimized: true,
  },
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
};

module.exports = nextConfig;
