import type { ComponentType } from 'react';

import { notFound } from 'next/navigation';

import { BlogPostView } from '@/components/blog-post-view';
import { getPostStaticParams, getPublishedPostBySlug, loadPostModule } from '@/posts';
import { buildArticleJsonLd, buildMetadata, getSocialImage } from '@/site';

type BlogPageParams = {
  slug: string[];
};

type PostModule = {
  default: ComponentType;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostStaticParams();
}

const resolvePost = async (paramsPromise: Promise<BlogPageParams>) => {
  const { slug } = await paramsPromise;
  const joinedSlug = slug.join('/');
  const post = getPublishedPostBySlug(joinedSlug);

  if (!post) {
    notFound();
  }

  return post;
};

export async function generateMetadata({ params }: { params: Promise<BlogPageParams> }) {
  const post = await resolvePost(params);

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    slug: post.slug,
    publishedAt: post.publishedAt,
    canonicalUrl: post.canonicalUrl,
    kind: 'article',
  });
}

export default async function BlogPostPage({ params }: { params: Promise<BlogPageParams> }) {
  const post = await resolvePost(params);
  const module = (await loadPostModule(post)) as PostModule;
  const articleUrl = `${post.canonicalUrl ?? `https://sancho.dev/blog/${post.slug}`}`;
  const socialImage = getSocialImage({ slug: post.slug });
  const jsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    url: articleUrl,
    image: socialImage,
  });

  return <BlogPostView post={post} PostContent={module.default} jsonLd={jsonLd} />;
}
