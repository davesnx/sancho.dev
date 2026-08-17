import Fs from 'node:fs';
import Path from 'node:path';
import { compareDesc } from 'date-fns/compareDesc';
import { parseISO } from 'date-fns/parseISO';
import GithubSlugger from 'github-slugger';
import { globbySync } from 'globby';
import matter from 'gray-matter';
import { cache } from 'react';
import readingTime from 'reading-time';

export type BlogPostFrontmatter = {
  title?: string;
  description?: string;
  publishedAt?: string;
  tags?: string[];
  draft?: boolean;
  canonicalUrl?: string;
  published?: boolean;
};

export type BlogPost = {
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

export type BlogHeading = {
  level: 2 | 3;
  text: string;
  id: string;
};

const POSTS_DIR = Path.join(process.cwd(), 'src', 'content', 'posts');
const VALID_SLUG = /^[a-z0-9/_-]+$/i;

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

const getRequiredField = (sourcePath: string, field: 'title' | 'publishedAt', value: unknown) => {
  if (typeof value === 'string' && value.length > 0) {
    return value;
  }

  throw new Error(`Missing ${field} in ${sourcePath}`);
};

const readAllPosts = cache((): BlogPost[] => {
  const files = globbySync([`${POSTS_DIR}/**/*.mdx`, `${POSTS_DIR}/**/*.md`]);

  return files
    .map((sourcePath) => {
      const source = Fs.readFileSync(sourcePath, 'utf8');
      const { data, content } = matter(source);
      const frontmatter = data as BlogPostFrontmatter;
      const slug = toSlug(sourcePath);
      const extension = sourcePath.endsWith('.md') ? 'md' : 'mdx';

      return {
        slug,
        sourcePath,
        extension,
        title: getRequiredField(sourcePath, 'title', frontmatter.title),
        description: typeof frontmatter.description === 'string' ? frontmatter.description : '',
        publishedAt: getRequiredField(sourcePath, 'publishedAt', frontmatter.publishedAt),
        tags: Array.isArray(frontmatter.tags)
          ? frontmatter.tags.filter((tag): tag is string => typeof tag === 'string')
          : [],
        draft: frontmatter.draft === true,
        canonicalUrl: typeof frontmatter.canonicalUrl === 'string' ? frontmatter.canonicalUrl : undefined,
        published: frontmatter.published !== false,
        content,
        wordCount: content.split(/\s+/g).filter(Boolean).length,
        readingTime: readingTime(content),
        headings: getPostHeadings(content),
      } satisfies BlogPost;
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
