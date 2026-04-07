import { fileURLToPath } from "node:url";

import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import withLinaria from "next-with-linaria";

const libPath = fileURLToPath(new URL("./src/lib", import.meta.url));
const rehypePrettyCodePluginPath = fileURLToPath(new URL("./src/lib/code-highlight/rehype-pretty-code.mjs", import.meta.url));

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      "remark-gfm",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
    rehypePlugins: [
      rehypePrettyCodePluginPath,
      "rehype-slug",
      ["rehype-autolink-headings", { behavior: "append" }],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  staticPageGenerationTimeout: 15000,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  linaria: {
    fastCheck: false,
    sourceMap: process.env.NODE_ENV !== "production",
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": libPath,
    };

    return config;
  },
};

export default withBundleAnalyzer(withLinaria(withMDX(nextConfig)));
