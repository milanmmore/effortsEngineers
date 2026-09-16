/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  ...(isGithubPages
    ? {
        basePath: '/EffortsEngineers',
        assetPrefix: '/EffortsEngineers/',
      }
    : {}),
  images: {
    unoptimized: true,
  },
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
};

module.exports = nextConfig;
