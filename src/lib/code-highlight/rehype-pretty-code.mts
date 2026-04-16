import fs from "node:fs";
import path from "node:path";

import type { LanguageRegistration } from "@shikijs/types";
import type { Root } from "hast";
import rehypePrettyCode, { type LineElement, type Options, type Theme } from "rehype-pretty-code";
import { createHighlighter } from "shiki";
import type { Transformer } from "unified";

const rootDir = process.cwd();

function readJson(relativePath: string): unknown {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function loadLanguage(name: string, relativePath: string): LanguageRegistration {
  const language = readJson(relativePath) as Record<string, unknown>;
  return {
    ...language,
    name,
  } as LanguageRegistration;
}

function loadTheme(name: string, relativePath: string): Theme {
  return { ...(readJson(relativePath) as object), name } as Theme;
}

const customLanguages = [
  loadLanguage("rescript", "src/lib/code-highlight/syntaxes/rescript.json"),
  loadLanguage("reason", "src/lib/code-highlight/syntaxes/reason.json"),
  loadLanguage("ocaml", "src/lib/code-highlight/syntaxes/ocaml.json"),
  loadLanguage("mlx", "src/lib/code-highlight/syntaxes/mlx.json"),
  loadLanguage("dune", "src/lib/code-highlight/syntaxes/dune.json"),
  loadLanguage("cram", "src/lib/code-highlight/syntaxes/cram.json"),
];

const ayuDarkTheme = loadTheme("ayu-dark", "src/lib/code-highlight/themes/ayu-mirage.json");

const ayuLightTheme = loadTheme("ayu-light", "src/lib/code-highlight/themes/ayu-light.json");

const options: Options = {
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
        "lisp",
        ...customLanguages,
      ],
    }),
  onVisitLine(node: LineElement) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
};

export default function rehypeCustomPrettyCode(): void | Transformer<Root, Root> {
  return rehypePrettyCode(options);
}
