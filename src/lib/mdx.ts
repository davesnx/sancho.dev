import fs from "fs";
import path from "path";

import { globbySync } from "globby";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { createHighlighter } from "shiki";

import type { Frontmatter } from "./frontmatter";
import rehypeHighlightCode from "./rehype-highlight-code";
import rehypeMetaAttribute from "./rehype-meta-attribute";

const cwd = process.cwd();
const DATA_PATH = path.join(cwd, "src", "content", "posts");

const loadGrammar = (grammarPath: string) => {
  return JSON.parse(
    fs.readFileSync(path.resolve(grammarPath), "utf-8")
  );
};

const customLanguages = [
  {
    ...loadGrammar("./src/lib/code-highlight/syntaxes/rescript.json"),
    name: "rescript",
  },
  {
    ...loadGrammar("./src/lib/code-highlight/syntaxes/reason.json"),
    name: "reason",
  },
  {
    ...loadGrammar("./src/lib/code-highlight/syntaxes/ocaml.json"),
    name: "ocaml",
  },
  {
    ...loadGrammar("./src/lib/code-highlight/syntaxes/mlx.json"),
    name: "mlx",
  },
  {
    ...loadGrammar("./src/lib/code-highlight/syntaxes/dune.json"),
    name: "dune",
  },
  {
    ...loadGrammar("./src/lib/code-highlight/syntaxes/cram.json"),
    name: "cram",
  },
];

export const getAllFrontmatter = () => {
  const paths = globbySync(`${path.join(DATA_PATH)}/*.mdx`);
  return paths.map((filePath: string) => {
    const source = fs.readFileSync(path.join(filePath), "utf8");
    const { data, content } = matter(source);
    const filenameWithoutExt = path.basename(filePath).replace(".mdx", "");

    return {
      ...(data as Frontmatter),
      slug: filenameWithoutExt,
      wordCount: content.split(/\s+/g).length,
      readingTime: readingTime(content),
    } as Frontmatter;
  });
};

const ayuDarkTheme = {
  ...JSON.parse(
    fs.readFileSync(
      path.join(cwd, "src", "lib", "./code-highlight/themes/ayu-mirage.json"),
      "utf-8",
    ),
  ),
  name: "ayu-dark",
};

const ayuLightTheme = {
  ...JSON.parse(
    fs.readFileSync(
      path.join(cwd, "src", "lib", "./code-highlight/themes/ayu-light.json"),
      "utf-8",
    ),
  ),
  name: "ayu-light",
};

const codeHighlightOptions = {
  theme: {
    dark: "ayu-dark",
    light: "ayu-light",
  },
  getHighlighter: async () => {
    const highlighter = await createHighlighter({
      themes: [ayuDarkTheme, ayuLightTheme],
      langs: [
        "javascript",
        "typescript",
        "jsx",
        "tsx",
        "json",
        "bash",
        "shell",
        "markdown",
        "css",
        "html",
        "yaml",
        "toml",
        "diff",
        "c",
        "rust",
        "python",
        "ruby",
        "go",
        "sql",
        "graphql",
        "xml",
        "swift",
        "kotlin",
        "java",
        "php",
        "scss",
        "less",
        "make",
        "dockerfile",
        ...customLanguages,
      ],
    });
    return highlighter;
  },
  grid: true,
  onVisitLine(node: { children: { type: string; value: string }[] }) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: { properties: { className: string[] } }) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedChars(node: { properties: { className: string[] } }) {
    node.properties.className = ["word"];
  },
};

export const getMdxBySlug = async (slug: string) => {
  const source = fs.readFileSync(path.join(DATA_PATH, `${slug}.mdx`), "utf8");

  const { frontmatter, code } = await bundleMDX({
    source,
    mdxOptions: (options) => {
      return {
        ...options,
        remarkPlugins: [...(options.remarkPlugins ?? []), remarkGfm],
        rehypePlugins: [
          ...(options.rehypePlugins ?? []),
          [rehypePrettyCode, codeHighlightOptions],
          rehypeMetaAttribute,
          rehypeHighlightCode,
          rehypeSlug,
          rehypeAutolinkHeadings,
        ],
      };
    },
  });

  return {
    frontmatter: {
      ...(frontmatter as Frontmatter),
      slug,
      wordCount: code.split(/\s+/g).length,
      readingTime: readingTime(code),
    } as Frontmatter,
    code,
  };
};
