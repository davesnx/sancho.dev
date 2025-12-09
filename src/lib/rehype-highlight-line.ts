// Inspired by https://github.com/j0lv3r4/mdx-prism

import { toHtml } from "hast-util-to-html";
import parse from "rehype-parse";
import { unified } from "unified";
import type { RefractorRoot } from "refractor";

type LineNode = {
  type: string;
  value?: string;
  lineNumber?: number;
  children?: LineNode[];
  tagName?: string;
  properties?: Record<string, unknown>;
};

type LineResult = {
  nodes: LineNode[];
  lineNumber: number;
};

const lineNumberify = function lineNumberify(ast: LineNode[], lineNum = 1): LineResult {
  let lineNumber = lineNum;
  return ast.reduce<LineResult>(
    (result, node) => {
      if (node.type === "text") {
        const nodeValue = node.value ?? "";
        if (nodeValue.indexOf("\n") === -1) {
          node.lineNumber = lineNumber;
          result.nodes.push(node);
          return result;
        }

        const lines = nodeValue.split("\n");
        for (let i = 0; i < lines.length; i++) {
          if (i !== 0) ++lineNumber;
          const currentLine = lines[i];
          if (i === lines.length - 1 && currentLine?.length === 0) continue;
          result.nodes.push({
            type: "text",
            value: i === lines.length - 1 ? (currentLine ?? "") : `${currentLine ?? ""}\n`,
            lineNumber,
          });
        }

        result.lineNumber = lineNumber;
        return result;
      }

      if (node.children) {
        node.lineNumber = lineNumber;
        const processed = lineNumberify(node.children, lineNumber);
        node.children = processed.nodes;
        result.lineNumber = processed.lineNumber;
        result.nodes.push(node);
        return result;
      }

      result.nodes.push(node);
      return result;
    },
    { nodes: [], lineNumber },
  );
};

const wrapLines = function wrapLines(ast: LineNode[], linesToHighlight: number[]): LineNode[] {
  const highlightAll = linesToHighlight.length === 1 && linesToHighlight[0] === 0;
  const allLines = Array.from(new Set(ast.map((x: LineNode) => x.lineNumber)));
  let i = 0;
  const wrapped = allLines.reduce<LineNode[]>((nodes, marker) => {
    const line = marker;
    const children: LineNode[] = [];
    for (; i < ast.length; i++) {
      const currentNode = ast[i];
      if (!currentNode) break;
      if ((currentNode.lineNumber ?? 0) < (line ?? 0)) {
        nodes.push(currentNode);
        continue;
      }

      if (currentNode.lineNumber === line) {
        children.push(currentNode);
        continue;
      }

      if ((currentNode.lineNumber ?? 0) > (line ?? 0)) {
        break;
      }
    }

    nodes.push({
      type: "element",
      tagName: "div",
      properties: {
        dataLine: line,
        className: "highlight-line",
        dataHighlighted:
          linesToHighlight.includes(line as number) || highlightAll ? "true" : "false",
      },
      children,
      lineNumber: line,
    });

    return nodes;
  }, []);

  return wrapped;
};

// https://github.com/gatsbyjs/gatsby/pull/26161/files
const MULTILINE_TOKEN_SPAN = /<span class="token ([^"]+)">[^<]*\n[^<]*<\/span>/g;

const applyMultilineFix = (ast: RefractorRoot): LineNode[] => {
  // AST to HTML
  let html = toHtml(ast);

  // Fix JSX issue
  html = html.replace(MULTILINE_TOKEN_SPAN, (match, token) =>
    match.replace(/\n/g, `</span>\n<span class="token ${token}">`),
  );

  // HTML to AST
  const hast = unified()
    .use(parse, { emitParseErrors: true, fragment: true })
    .parse(html);

  return hast.children as LineNode[];
};

function rehypeHighlightLine(ast: RefractorRoot, lines: number[]): LineNode[] {
  const formattedAst = applyMultilineFix(ast);
  const numbered = lineNumberify(formattedAst).nodes;

  return wrapLines(numbered, lines);
}

export default rehypeHighlightLine;
