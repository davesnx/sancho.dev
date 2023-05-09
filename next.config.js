/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  compress: true,
  swcMinify: true,
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
