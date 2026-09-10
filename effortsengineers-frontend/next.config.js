/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',               // ✅ replaces next export
  outputFileTracingRoot: __dirname,
  basePath: '/effortsengineers',  // ✅ repo name for GitHub Pages
  assetPrefix: '/effortsengineers/',
};

module.exports = nextConfig;

