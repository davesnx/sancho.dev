import Fs from "node:fs";
import FsPromises from "node:fs/promises";
import Path from "node:path";
import { compareDesc, parseISO } from "date-fns";
import {
  getAboutContent,
  getPublishedBlogPosts,
  type PublishedBlogPost,
} from "./get-pages.mts";

const stripMdxComponents = (content: string): string => {
  return content
    .replace(/^\s*(import|export)\s.+$/gm, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/<\/?[A-Z][^>\n]*?>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const buildPostMarkdown = (post: PublishedBlogPost): string => {
  const lines = [
    "> Fetch the complete blog index at: https://sancho.dev/llms.txt",
    "",
    `# ${post.title}`,
    "",
    "- **By**: @davesnx",
    `- **Date**: ${post.publishedAt}`,
  ];

  if (post.tags.length > 0) {
    lines.push(`- **Tags**: ${post.tags.join(", ")}`);
  }

  lines.push(`- **URL**: https://sancho.dev${post.route}`);
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(stripMdxComponents(post.content));

  return `${lines.join("\n").trim()}\n`;
};

export const generateLLMsTxt = async (): Promise<string> => {
  const posts = await getPublishedBlogPosts();
  const aboutContent = getAboutContent();

  const sortedPosts = posts.sort((a, b) =>
    compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)),
  );

  const lines = [
    "# sancho.dev",
    "",
    "> davesnx's personal blog about Software, Functional Programming, OCaml, Reason, Melange, and more.",
    "",
    "## About",
    "",
    aboutContent,
    "",
    "## Posts",
    "",
  ];

  for (const post of sortedPosts) {
    const tagSuffix = post.tags.length > 0 ? ` (${post.tags.join(", ")})` : "";
    lines.push(
      `- [${post.title}](https://sancho.dev${post.route}.md) - ${post.publishedAt}${tagSuffix}`,
    );
  }

  return `${lines.join("\n")}\n`;
};

export const generateMarkdownFiles = async (
  outputDir = Path.join(process.cwd(), "out"),
): Promise<void> => {
  const posts = await getPublishedBlogPosts();

  for (const post of posts) {
    const slugPath = post.route.replace(/^\/blog\//, "");
    const outputPath = Path.join(outputDir, "blog", `${slugPath}.md`);
    Fs.mkdirSync(Path.dirname(outputPath), { recursive: true });
    await FsPromises.writeFile(outputPath, buildPostMarkdown(post));
  }
};
