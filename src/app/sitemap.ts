import type { MetadataRoute } from 'next';

import { getPublishedPosts } from '@/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '/',
    '/about',
    '/blog',
    '/cv',
    '/credits',
    '/system',
    '/experiments',
    '/experiments/chromatic',
    '/experiments/variable',
  ];
  const staticEntries = pages.map((route) => ({
    url: `https://sancho.dev${route}`,
  }));

  const postEntries = getPublishedPosts().map((post) => ({
    url: `https://sancho.dev/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  return [...staticEntries, ...postEntries];
}
