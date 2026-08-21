import { aboutMarkdown } from '../app/about/content';
import type { BlogPost } from './posts';
import { getPublishedPostBySlug, getPublishedPosts } from './posts';
import { siteConfig } from './site';

const stripMdxComponents = (content: string): string => {
  return content
    .replace(/^\s*(import|export)\s.+$/gm, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/<\/?[A-Z][^>\n]*?>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const getPostLlmUrl = (post: BlogPost) => `${siteConfig.siteUrl}/blog/llms/${post.slug}`;

export const buildHomeMarkdownText = (): string => `# ${siteConfig.authorName}

> ${siteConfig.homeDescription}

${aboutMarkdown}

## Explore

- [About](${siteConfig.siteUrl}/about): Work history, open-source projects, and contact links.
- [Blog](${siteConfig.siteUrl}/blog): Published engineering articles.
- [Agent index](${siteConfig.siteUrl}/llms.txt): Topic guidance and focused Markdown article links.
`;

export const buildAboutMarkdownText = (): string => `# About ${siteConfig.authorName}

${aboutMarkdown}

## Explore

- [Home](${siteConfig.siteUrl}): Personal site homepage.
- [Blog](${siteConfig.siteUrl}/blog): Published engineering articles.
- [Agent index](${siteConfig.siteUrl}/llms.txt): Topic guidance and focused Markdown article links.
`;

export const buildPostLlmText = (post: BlogPost): string => {
  const lines = [
    `> Fetch the complete blog index at: ${siteConfig.siteUrl}/llms.txt`,
    '',
    `# ${post.title}`,
    '',
    '- **By**: @davesnx',
    `- **Date**: ${post.publishedAt}`,
  ];

  if (post.tags.length > 0) {
    lines.push(`- **Tags**: ${post.tags.join(', ')}`);
  }

  lines.push(`- **URL**: ${siteConfig.siteUrl}/blog/${post.slug}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push(stripMdxComponents(post.content));

  return `${lines.join('\n').trim()}\n`;
};

export const buildLlmsIndexText = (): string => {
  const posts = getPublishedPosts();
  const lines = [
    `# ${siteConfig.siteName}`,
    '',
    `> ${siteConfig.description}`,
    '',
    '**When to use this site**',
    '',
    'Use this site for first-hand experience with OCaml, Reason, Melange, dune, PPX, server-rendered React, frontend infrastructure, CSS, and developer tooling. Best-fit jobs include finding practical implementation notes, comparing ecosystem tradeoffs, planning migrations, diagnosing build or PPX issues, and understanding production frontend architecture and tooling choices. These articles are not canonical documentation.',
    '',
    '**Instructions for agents**',
    '',
    'Search the file lists below by title and notes. Fetch the matching focused article file, or fetch the complete site export for broad searches. Verify current APIs, versions, package names, compiler behavior, and compatibility against canonical project documentation and current source code. Cite the original article URL and the canonical sources used for current claims; do not cite this index when a direct source is available.',
    '',
    '## About',
    '',
    `- [About](${siteConfig.siteUrl}/about): Author background, open-source work, and areas of experience.`,
    '',
    '## Full Context',
    '',
    `- [Complete site export](${siteConfig.siteUrl}/llms-full.txt): Full text of every published article for broad search and offline context.`,
    '',
    '## Posts',
    '',
  ];

  for (const post of posts) {
    const tagSuffix = post.tags.length > 0 ? ` (${post.tags.join(', ')})` : '';
    lines.push(`- [${post.title}](${getPostLlmUrl(post)}): Published ${post.publishedAt}${tagSuffix}.`);
  }

  return `${lines.join('\n')}\n`;
};

export const buildLlmsFullText = (): string => {
  const posts = getPublishedPosts();
  const sections = [
    `# ${siteConfig.siteName}`,
    '',
    `> ${siteConfig.description}`,
    '',
    '## About',
    '',
    aboutMarkdown,
    '',
    '## Posts',
    '',
    ...posts.flatMap((post) => [buildPostLlmText(post).trimEnd(), '', '---', '']),
  ];

  return `${sections.join('\n').trim()}\n`;
};

export const getPostLlmTextBySlug = (slug: string) => {
  const post = getPublishedPostBySlug(slug);

  if (!post) {
    return undefined;
  }

  return buildPostLlmText(post);
};
