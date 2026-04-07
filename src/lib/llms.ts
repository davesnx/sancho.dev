import { aboutMarkdown } from "../app/about/content";
import type { BlogPost } from "./posts";
import { getPublishedPostBySlug, getPublishedPosts } from "./posts";
import { siteConfig } from "./site";

const stripMdxComponents = (content: string): string => {
  return content
    .replace(/^\s*(import|export)\s.+$/gm, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/<\/?[A-Z][^>\n]*?>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const getPostLlmUrl = (post: BlogPost) => `${siteConfig.siteUrl}/blog/llms/${post.slug}`;

export const buildPostLlmText = (post: BlogPost): string => {
  const lines = [
    `> Fetch the complete blog index at: ${siteConfig.siteUrl}/llms.txt`,
    "",
    `# ${post.title}`,
    "",
    "- **By**: @davesnx",
    `- **Date**: ${post.publishedAt}`,
  ];

  if (post.tags.length > 0) {
    lines.push(`- **Tags**: ${post.tags.join(", ")}`);
  }

  lines.push(`- **URL**: ${siteConfig.siteUrl}/blog/${post.slug}`);
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(stripMdxComponents(post.content));

  return `${lines.join("\n").trim()}\n`;
};

export const buildLlmsIndexText = (): string => {
  const posts = getPublishedPosts();
  const lines = [
    `# ${siteConfig.siteName}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## About",
    "",
    aboutMarkdown,
    "",
    "## Full Context",
    "",
    `- [Complete site export](${siteConfig.siteUrl}/llms-full.txt)`,
    "",
    "## Posts",
    "",
  ];

  for (const post of posts) {
    const tagSuffix = post.tags.length > 0 ? ` (${post.tags.join(", ")})` : "";
    lines.push(`- [${post.title}](${getPostLlmUrl(post)}) - ${post.publishedAt}${tagSuffix}`);
  }

  return `${lines.join("\n")}\n`;
};

export const buildLlmsFullText = (): string => {
  const posts = getPublishedPosts();
  const sections = [
    `# ${siteConfig.siteName}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## About",
    "",
    aboutMarkdown,
    "",
    "## Posts",
    "",
    ...posts.flatMap((post) => [buildPostLlmText(post).trimEnd(), "", "---", ""]),
  ];

  return `${sections.join("\n").trim()}\n`;
};

export const getPostLlmTextBySlug = (slug: string) => {
  const post = getPublishedPostBySlug(slug);

  if (!post) {
    return undefined;
  }

  return buildPostLlmText(post);
};
