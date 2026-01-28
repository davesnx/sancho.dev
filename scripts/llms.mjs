import Fs from "fs";
import { globby } from "globby";
import matter from "gray-matter";
import { compareDesc, parseISO } from "date-fns";

let getBlogContent = async () => {
  let mdxPages = await globby([
    "src/content/posts/**/*.mdx",
    "src/content/posts/**/*.md",
  ]);

  return mdxPages
    .filter((page) => Fs.existsSync(page))
    .map((page) => {
      let source = Fs.readFileSync(page, "utf8");
      let fm = matter(source);

      if (fm.data.draft) {
        return null;
      }
      if (fm.data.canonicalUrl) {
        return null;
      }

      let route = page
        .replace("src/content/posts/", "/blog/")
        .replace(".mdx", "")
        .replace(".md", "");

      return {
        route,
        title: fm.data.title,
        publishedAt: fm.data.publishedAt,
        description: fm.data.description || "",
        tags: fm.data.tags || [],
        content: fm.content,
      };
    })
    .filter(Boolean);
};

export let generateLLMsTxt = async () => {
  let posts = await getBlogContent();

  let sortedPosts = posts.sort((a, b) =>
    compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)),
  );

  let lines = [
    "# sancho.dev",
    "",
    "> davesnx's personal blog about Software, Functional Programming, OCaml, Reason, Melange, and more.",
    "",
    "## Posts",
    "",
  ];

  for (let post of sortedPosts) {
    lines.push(`### ${post.title}`);
    lines.push(`URL: https://sancho.dev${post.route}`);
    lines.push(`Date: ${post.publishedAt}`);
    if (post.tags.length > 0) {
      lines.push(`Tags: ${post.tags.join(", ")}`);
    }
    lines.push("");
    lines.push(post.content.trim());
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  return lines.join("\n");
};
