import Fs from "fs";
import Path from "path";
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

const stripMdxComponents = (content) => {
  return content
    .replace(/^\s*(import|export)\s.+$/gm, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/<\/?[A-Z][^>\n]*?>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const buildPostMarkdown = (post) => {
  let lines = [
    "> Fetch the complete blog index at: https://sancho.dev/llms.txt",
    "",
    `# ${post.title}`,
    "",
    `- **By**: @davesnx`,
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

const aboutContent = `
Hi, I'm David. A software engineer based in Barcelona, who spends the cold winter in the Pyrenees. My work bridges functional programming, web technologies and maintanability; by focusing on creating better developer tools and experiences with [Reason](http://reasonml.github.io/) and [OCaml](https://ocaml.org/).

I believe that the recipe for creating maintainable and powerful software lies in designing with clarity, sound architecture, and embracing the iterative nature of development. Currently working at [ahrefs](https://ahrefs.com/), primarily building developer tooling to help create nice UIs, also maintaining several Open Source projects in the Reason ecosystem, such as [reason-react](https://github.com/reasonml/reason-react), [server-reason-react](https://github.com/ml-in-barcelona/server-reason-react) and [styled-ppx](https://github.com/davesnx/styled-ppx).

I also contribute to the broader Reason and Melange ecosystems and co-host [emelle.tv](https://www.twitch.tv/emelletv), where we explore ML-family languages and meet incredible authors from the ecosystem.

Previously, I helped build visual app development platforms at [Draftbit](https://draftbit.com) for a year and, even before, worked at [Typeform](https://www.typeform.com) for 5 years where I lead the form rendering engine.

Want to chat? DM me on [Twitter](https://x.com/davesnx) or [Bluesky](https://bsky.app/profile/david.sancho.dev)
`.trim();

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
    "## About",
    "",
    aboutContent,
    "",
    "## Posts",
    "",
  ];

  for (let post of sortedPosts) {
    let tagSuffix = post.tags.length > 0 ? ` (${post.tags.join(", ")})` : "";
    lines.push(
      `- [${post.title}](https://sancho.dev${post.route}.md) - ${post.publishedAt}${tagSuffix}`,
    );
  }

  return lines.join("\n") + "\n";
};

export let generateMarkdownFiles = async (
  outputDir = Path.join(process.cwd(), "out"),
) => {
  let posts = await getBlogContent();

  for (let post of posts) {
    let slugPath = post.route.replace(/^\/blog\//, "");
    let outputPath = Path.join(outputDir, "blog", `${slugPath}.md`);
    Fs.mkdirSync(Path.dirname(outputPath), { recursive: true });
    await Fs.promises.writeFile(outputPath, buildPostMarkdown(post));
  }
};
