// Inspired by https://github.com/j0lv3r4/mdx-prism

import { toString } from "hast-util-to-string";
import rangeParser from "parse-numeric-range";
import { refractor } from "refractor";
import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";

import highlightLine from "./rehype-highlight-line";
/* import highlightWord from "./rehype-highlight-word"; */

function visitor(node: Element, _index: number | undefined, parent: Element | Root | undefined) {
  if (
    !parent ||
    !("tagName" in parent) ||
    parent.tagName !== "pre" ||
    node.tagName !== "code" ||
    !node.properties?.className
  ) {
    return;
  }

  const className = node.properties.className as string[] | undefined;
  if (!className || !className[0]) return;
  const [, lang] = className[0].split("-");
  if (!lang) return;
  const codeString: string = toString(node);
  const result = refractor.highlight(codeString, lang);

  const lineProp = node.properties.line as string | undefined;
  const linesToHighlight = rangeParser(lineProp || "0");
  const highlighted = highlightLine(result, linesToHighlight);
  /* result = highlightWord(result); */

  node.children = highlighted as Element["children"];
}

export default function highlightCode() {
  return (tree: Root) => {
    visit(tree, "element", visitor);
  };
}
