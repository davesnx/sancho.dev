/* eslint-disable */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withPlugins(
  [
    withOptimizedImages,
    withBundleAnalyzer({
      poweredByHeader: false,
      trailingSlash: true,
      basePath: "",
      // The starter code load resources from `public` folder with `router.basePath` in React components.
      // So, the source code is "basePath-ready".
      // You can remove `basePath` if you don't need it.
      reactStrictMode: true,
      eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
    }),
  ],
  {
    typescript: {
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      ignoreBuildErrors: true,
    },
    compiler: {
      emotion: true,
    },
    reactStrictMode: false,
  }
);

module.exports = nextConfig
