import fs from "node:fs";
import path from "node:path";

import rehypePrettyCode from "rehype-pretty-code";
import { createHighlighter } from "shiki";

const rootDir = process.cwd();

const loadJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));

const customLanguages = [
  { ...loadJson("src/lib/code-highlight/syntaxes/rescript.json"), name: "rescript" },
  { ...loadJson("src/lib/code-highlight/syntaxes/reason.json"), name: "reason" },
  { ...loadJson("src/lib/code-highlight/syntaxes/ocaml.json"), name: "ocaml" },
  { ...loadJson("src/lib/code-highlight/syntaxes/mlx.json"), name: "mlx" },
  { ...loadJson("src/lib/code-highlight/syntaxes/dune.json"), name: "dune" },
  { ...loadJson("src/lib/code-highlight/syntaxes/cram.json"), name: "cram" },
];

const ayuDarkTheme = {
  ...loadJson("src/lib/code-highlight/themes/ayu-mirage.json"),
  name: "ayu-dark",
};

const ayuLightTheme = {
  ...loadJson("src/lib/code-highlight/themes/ayu-light.json"),
  name: "ayu-light",
};

const options = {
  theme: {
    dark: "ayu-dark",
    light: "ayu-light",
  },
  keepBackground: false,
  grid: true,
  getHighlighter: async () =>
    createHighlighter({
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
        "clojure",
        "lisp",
        ...customLanguages,
      ],
    }),
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
};

export default function rehypeCustomPrettyCode() {
  return rehypePrettyCode(options);
}
