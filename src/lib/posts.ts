import Fs from "node:fs";
import Path from "node:path";
import { cache } from "react";

import { compareDesc } from "date-fns/compareDesc";
import { parseISO } from "date-fns/parseISO";
import { globbySync } from "globby";
import matter from "gray-matter";
import readingTime from "reading-time";

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
  extension: "md" | "mdx";
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
};

const POSTS_DIR = Path.join(process.cwd(), "src", "content", "posts");
const VALID_SLUG = /^[a-z0-9/_-]+$/i;

const toSlug = (sourcePath: string) =>
  Path.relative(POSTS_DIR, sourcePath).replace(/\.(md|mdx)$/, "").split(Path.sep).join("/");

const getRequiredField = (
  sourcePath: string,
  field: "title" | "publishedAt",
  value: unknown,
) => {
  if (typeof value === "string" && value.length > 0) {
    return value;
  }

  throw new Error(`Missing ${field} in ${sourcePath}`);
};

const readAllPosts = cache((): BlogPost[] => {
  const files = globbySync([`${POSTS_DIR}/**/*.mdx`, `${POSTS_DIR}/**/*.md`]);

  return files
    .map((sourcePath) => {
      const source = Fs.readFileSync(sourcePath, "utf8");
      const { data, content } = matter(source);
      const frontmatter = data as BlogPostFrontmatter;
      const slug = toSlug(sourcePath);
      const extension = sourcePath.endsWith(".md") ? "md" : "mdx";

      return {
        slug,
        sourcePath,
        extension,
        title: getRequiredField(sourcePath, "title", frontmatter.title),
        description:
          typeof frontmatter.description === "string" ? frontmatter.description : "",
        publishedAt: getRequiredField(sourcePath, "publishedAt", frontmatter.publishedAt),
        tags: Array.isArray(frontmatter.tags)
          ? frontmatter.tags.filter((tag): tag is string => typeof tag === "string")
          : [],
        draft: frontmatter.draft === true,
        canonicalUrl:
          typeof frontmatter.canonicalUrl === "string"
            ? frontmatter.canonicalUrl
            : undefined,
        published: frontmatter.published !== false,
        content,
        wordCount: content.split(/\s+/g).filter(Boolean).length,
        readingTime: readingTime(content),
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

export const getPostStaticParams = () =>
  getPublishedPosts().map((post) => ({ slug: post.slug.split("/") }));

export const loadPostModule = async (post: BlogPost) => {
  return import(`../content/posts/${post.slug}.${post.extension}`);
};
