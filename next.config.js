/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  compress: false,
  typescript: {
    // Dangerously allow production builds to successfully complete even if your project has type errors.
    ignoreBuildErrors: true,
  },
  compiler: {
    emotion: true,
  },
  reactStrictMode: true,
  staticPageGenerationTimeout: 15000,
};

module.exports = nextConfig;
