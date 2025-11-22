// Inspired by https://github.com/j0lv3r4/mdx-prism

import { toString } from "hast-util-to-string";
import rangeParser from "parse-numeric-range";
import { refractor } from "refractor";
import { visit } from "unist-util-visit";

import highlightLine from "./rehype-highlight-line";
/* import highlightWord from "./rehype-highlight-word"; */

function visitor(node, index, parent) {
  if (
    !parent ||
    parent.tagName !== "pre" ||
    node.tagName !== "code" ||
    !node.properties.className
  ) {
    return;
  }

  const [, lang] = node.properties.className[0].split("-");
  const codeString: string = toString(node);
  let result = refractor.highlight(codeString, lang);

  const linesToHighlight = rangeParser(node.properties.line || "0");
  result = highlightLine(result, linesToHighlight);
  /* result = highlightWord(result); */

  node.children = result;
}

export default function highlightCode() {
  return (tree) => {
    visit(tree, "element", visitor);
  };
}
