const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  typescript: {
  // Dangerously allow production builds to successfully complete even if your project has type errors.
    ignoreBuildErrors: true,
  },
  compiler: {
    emotion: true,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
