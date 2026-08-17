import Fs from 'node:fs';
import Path from 'node:path';
import { compareDesc } from 'date-fns/compareDesc';
import { parseISO } from 'date-fns/parseISO';
import GithubSlugger from 'github-slugger';
import { globbySync } from 'globby';
import matter from 'gray-matter';
import { cache } from 'react';
import readingTime from 'reading-time';

type BaseBlogPost = {
  slug: string;
  sourcePath: string;
  extension: 'md' | 'mdx';
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  draft: boolean;
  canonicalUrl?: string;
  published: boolean;
  content: string;
  wordCount: number;
  readingTime: ReturnType<typeof readingTime>;
  headings: BlogHeading[];
};

export type ArticlePost = BaseBlogPost & {
  kind: 'article';
};

export type YouTubePost = BaseBlogPost & {
  kind: 'youtube';
  youtubeId: string;
  event: string;
  thumbnail: string;
  uploadedAt: string;
};

export type BlogPost = ArticlePost | YouTubePost;

export type BlogHeading = {
  level: 2 | 3;
  text: string;
  id: string;
};

const POSTS_DIR = Path.join(process.cwd(), 'src', 'content', 'posts');
const VALID_SLUG = /^[a-z0-9/_-]+$/i;
const VALID_YOUTUBE_ID = /^[a-zA-Z0-9_-]{11}$/;

const toHeadingText = (value: string) =>
  value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[`*~]/g, '')
    .trim();

export const getPostHeadings = (content: string): BlogHeading[] => {
  const headings: BlogHeading[] = [];
  const slugger = new GithubSlugger();
  let inCodeFence = false;

  for (const line of content.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    const marker = match?.[1];
    const rawText = match?.[2];
    if (!marker || !rawText) continue;

    const text = toHeadingText(rawText);
    if (!text) continue;

    headings.push({
      level: marker.length as 2 | 3,
      text,
      id: slugger.slug(text),
    });
  }

  return headings;
};

const toSlug = (sourcePath: string) =>
  Path.relative(POSTS_DIR, sourcePath)
    .replace(/\.(md|mdx)$/, '')
    .split(Path.sep)
    .join('/');

const getRequiredText = (sourcePath: string, field: string, value: unknown) => {
  if (typeof value === 'string' && value.trim().length > 0) return value.trim();
  throw new Error(`Missing ${field} in ${sourcePath}`);
};

const getRequiredDate = (sourcePath: string, field: string, value: unknown) => {
  const date = getRequiredText(sourcePath, field, value);
  if (Number.isNaN(parseISO(date).getTime())) {
    throw new Error(`Invalid ${field} in ${sourcePath}: ${date}`);
  }
  return date;
};

const getOptionalText = (sourcePath: string, field: string, value: unknown) => {
  if (value === undefined) return undefined;
  if (typeof value !== 'string') throw new Error(`Invalid ${field} in ${sourcePath}`);
  return value.trim() || undefined;
};

const getBoolean = (sourcePath: string, field: string, value: unknown, fallback: boolean) => {
  if (value === undefined) return fallback;
  if (typeof value !== 'boolean') throw new Error(`Invalid ${field} in ${sourcePath}`);
  return value;
};

const getTags = (sourcePath: string, value: unknown) => {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((tag) => typeof tag !== 'string')) {
    throw new Error(`Invalid tags in ${sourcePath}`);
  }
  return value.map((tag) => tag.trim()).filter(Boolean);
};

const readAllPosts = cache((): BlogPost[] => {
  const files = globbySync([`${POSTS_DIR}/**/*.mdx`, `${POSTS_DIR}/**/*.md`]);

  return files
    .map((sourcePath) => {
      const source = Fs.readFileSync(sourcePath, 'utf8');
      const { data, content } = matter(source);
      const frontmatter: Record<string, unknown> = Object.fromEntries(Object.entries(data));
      const slug = toSlug(sourcePath);
      const extension = sourcePath.endsWith('.md') ? 'md' : 'mdx';
      const kind = frontmatter.kind ?? 'article';
      if (kind !== 'article' && kind !== 'youtube') {
        throw new Error(`Invalid kind in ${sourcePath}: ${String(frontmatter.kind)}`);
      }

      const basePost = {
        slug,
        sourcePath,
        extension,
        title: getRequiredText(sourcePath, 'title', frontmatter.title),
        description: getOptionalText(sourcePath, 'description', frontmatter.description) ?? '',
        publishedAt: getRequiredDate(sourcePath, 'publishedAt', frontmatter.publishedAt),
        tags: getTags(sourcePath, frontmatter.tags),
        draft: getBoolean(sourcePath, 'draft', frontmatter.draft, false),
        canonicalUrl: getOptionalText(sourcePath, 'canonicalUrl', frontmatter.canonicalUrl),
        published: getBoolean(sourcePath, 'published', frontmatter.published, true),
        content,
        wordCount: content.split(/\s+/g).filter(Boolean).length,
        readingTime: readingTime(content),
        headings: getPostHeadings(content),
      } satisfies BaseBlogPost;

      if (kind === 'youtube') {
        const youtubeId = getRequiredText(sourcePath, 'youtubeId', frontmatter.youtubeId);
        if (!VALID_YOUTUBE_ID.test(youtubeId)) {
          throw new Error(`Invalid youtubeId in ${sourcePath}: ${youtubeId}`);
        }

        const thumbnail = `/images/talks/${slug}.jpg`;
        if (!Fs.existsSync(Path.join(process.cwd(), 'public', thumbnail))) {
          throw new Error(`Missing YouTube thumbnail in public${thumbnail}`);
        }

        return {
          ...basePost,
          kind,
          description: getRequiredText(sourcePath, 'description', frontmatter.description),
          youtubeId,
          event: getRequiredText(sourcePath, 'event', frontmatter.event),
          thumbnail,
          uploadedAt: getRequiredDate(sourcePath, 'uploadedAt', frontmatter.uploadedAt),
        } satisfies YouTubePost;
      }

      return { ...basePost, kind } satisfies ArticlePost;
    })
    .sort((left, right) => compareDesc(parseISO(left.publishedAt), parseISO(right.publishedAt)));
});

export const getAllPosts = () => readAllPosts();

export const getPublishedPosts = () =>
  readAllPosts().filter((post) => !post.draft && post.published && !post.canonicalUrl);

export const getPublishedPostBySlug = (slug: string) => {
  if (!VALID_SLUG.test(slug)) {
    return undefined;
  }

  return getPublishedPosts().find((post) => post.slug === slug);
};

export const getPostStaticParams = () => getPublishedPosts().map((post) => ({ slug: post.slug.split('/') }));

export const loadPostModule = async (post: BlogPost) => {
  return import(`../content/posts/${post.slug}.${post.extension}`);
};
