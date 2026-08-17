import { notFound } from 'next/navigation';
import type { ComponentType } from 'react';

import { BlogPostView } from '@/components/blog-post-view';
import { YouTubePostView } from '@/components/youtube-post-view';
import { getPostStaticParams, getPublishedPostBySlug, loadPostModule } from '@/posts';
import { absoluteUrl, buildArticleJsonLd, buildMetadata, buildVideoJsonLd, getSocialImage } from '@/site';

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
    kind: post.kind === 'youtube' ? 'video' : 'article',
    imageUrl: post.kind === 'youtube' ? absoluteUrl(post.thumbnail) : undefined,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<BlogPageParams> }) {
  const post = await resolvePost(params);
  const module = (await loadPostModule(post)) as PostModule;
  const postUrl = `${post.canonicalUrl ?? `https://sancho.dev/blog/${post.slug}`}`;

  if (post.kind === 'youtube') {
    const jsonLd = buildVideoJsonLd({
      title: post.title,
      description: post.description,
      publishedAt: post.publishedAt,
      uploadedAt: post.uploadedAt,
      url: postUrl,
      youtubeId: post.youtubeId,
      event: post.event,
      thumbnailUrl: absoluteUrl(post.thumbnail),
    });

    return <YouTubePostView post={post} PostContent={module.default} jsonLd={jsonLd} />;
  }

  const socialImage = getSocialImage({ slug: post.slug });
  const jsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    url: postUrl,
    image: socialImage,
  });

  return <BlogPostView post={post} PostContent={module.default} jsonLd={jsonLd} />;
}
