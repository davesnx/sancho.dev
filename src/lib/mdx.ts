import fs from "fs";
import path from "path";

import glob from "glob";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { getHighlighter, BUNDLED_LANGUAGES } from "shiki";

import type { Frontmatter } from "@lib/frontmatter";
import rehypeHighlightCode from "@lib/rehype-highlight-code";
import rehypeMetaAttribute from "@lib/rehype-meta-attribute";

const ROOT_PATH = process.cwd();
export const DATA_PATH = path.join(ROOT_PATH, "src", "content", "posts");

// the front matter and content of all mdx files based on `docsPaths`
export const getAllFrontmatter = () => {
  let PATH = path.join(DATA_PATH);
  let paths = glob.sync(`${PATH}/**/*.mdx`);

  return paths.map((filePath: string) => {
    let source = fs.readFileSync(path.join(filePath), "utf8");
    let { data, content } = matter(source);
    let filenameWithoutExt = path.basename(filePath).replace(".mdx", "");

    return {
      ...(data as Frontmatter),
      slug: filenameWithoutExt,
      wordCount: content.split(/\s+/g).length,
      readingTime: readingTime(content),
    } as Frontmatter;
  });
};
const codeHighlightOptions = {
  // Use one of Shiki's packaged themes
  theme: {
    dark: JSON.parse(
      fs.readFileSync(
        require.resolve("./code-highlight/themes/ayu-mirage.json"),
        "utf-8"
      )
    ),
    light: JSON.parse(
      fs.readFileSync(
        require.resolve("./code-highlight/themes/ayu-light.json"),
        "utf-8"
      )
    ),
  },
  getHighlighter: (options) =>
    getHighlighter({
      ...options,
      langs: [
        ...BUNDLED_LANGUAGES,
        {
          id: "rescript",
          scopeName: "source.rescript",
          path: path.resolve("./src/lib/code-highlight/syntaxes/rescript.json"),
        },
        {
          id: "reason",
          scopeName: "source.reason",
          path: path.resolve("./src/lib/code-highlight/syntaxes/reason.json"),
        },
        {
          id: "ocaml",
          scopeName: "source.ocaml",
          path: path.resolve("./src/lib/code-highlight/syntaxes/ocaml.json"),
        },
        {
          id: "dune",
          scopeName: "source.dune",
          path: path.resolve("./src/lib/code-highlight/syntaxes/dune.json"),
        },
      ],
    }),
  /* // Or your own JSON theme
  theme: JSON.parse(
    Fs.readFileSync(require.resolve('./themes/dark.json'), 'utf-8')
  ), */
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  // Feel free to add classNames that suit your docs
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
};

export const getMdxBySlug = async (slug: string) => {
  let source = fs.readFileSync(path.join(DATA_PATH, `${slug}.mdx`), "utf8");

  let { frontmatter, code } = await bundleMDX({
    source,
    mdxOptions: (options) => {
      return {
        ...options,
        remarkPlugins: [...(options.remarkPlugins ?? [])],
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
