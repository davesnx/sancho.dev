import type { MetadataRoute } from "next";

import { getPublishedPosts } from "../lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about", "/blog", "/work", "/talks", "/ui", "/experiments"];
  const staticEntries = pages.map((route) => ({
    url: `https://sancho.dev${route}`,
  }));

  const postEntries = getPublishedPosts().map((post) => ({
    url: `https://sancho.dev/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  return [...staticEntries, ...postEntries];
}
