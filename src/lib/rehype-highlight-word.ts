import { toHtml } from "hast-util-to-html";
import parse from "rehype-parse";
import { unified } from "unified";
import { Node } from "unist";

const CALLOUT = /__(.*?)__/g;

export default function rehypeHighlightWord(code: Node | Array<Node>) {
  let html = toHtml(code);
  let result = html.replace(
    CALLOUT,
    (_, text) => `<span class="highlight-word">${text}</span>`,
  );
  let hast = unified()
    .use(parse, { emitParseErrors: true, fragment: true })
    .parse(result);

  return hast.data?.children || "";
}
