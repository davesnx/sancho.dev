import { toHtml } from "hast-util-to-html";
import parse from "rehype-parse";
import { unified } from "unified";
import type { Node } from "unist";

const CALLOUT = /__(.*?)__/g;

export default function rehypeHighlightWord(code: Node | Array<Node>) {
  const html = toHtml(code);
  const result = html.replace(
    CALLOUT,
    (_, text) => `<span class="highlight-word">${text}</span>`,
  );
  const hast = unified()
    .use(parse, { emitParseErrors: true, fragment: true })
    .parse(result);

  return hast.data?.children || "";
}
