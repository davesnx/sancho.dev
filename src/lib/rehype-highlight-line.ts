// Inspired by https://github.com/j0lv3r4/mdx-prism

import { toHtml } from "hast-util-to-html";
import parse from "rehype-parse";
import { unified } from "unified";

let lineNumberify = function lineNumberify(ast, lineNum = 1) {
  let lineNumber = lineNum;
  return ast.reduce(
    (result, node) => {
      if (node.type === "text") {
        if (node.value.indexOf("\n") === -1) {
          node.lineNumber = lineNumber;
          result.nodes.push(node);
          return result;
        }

        let lines = node.value.split("\n");
        for (let i = 0; i < lines.length; i++) {
          if (i !== 0) ++lineNumber;
          if (i === lines.length - 1 && lines[i].length === 0) continue;
          result.nodes.push({
            type: "text",
            value: i === lines.length - 1 ? lines[i] : `${lines[i]}\n`,
            lineNumber,
          });
        }

        result.lineNumber = lineNumber;
        return result;
      }

      if (node.children) {
        node.lineNumber = lineNumber;
        let processed = lineNumberify(node.children, lineNumber);
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

let wrapLines = function wrapLines(ast, linesToHighlight) {
  let highlightAll = linesToHighlight.length === 1 && linesToHighlight[0] === 0;
  let allLines = Array.from(new Set(ast.map((x) => x.lineNumber)));
  let i = 0;
  let wrapped = allLines.reduce((nodes, marker) => {
    let line = marker;
    let children = [];
    for (; i < ast.length; i++) {
      if (ast[i].lineNumber < line) {
        nodes.push(ast[i]);
        continue;
      }

      if (ast[i].lineNumber === line) {
        children.push(ast[i]);
        continue;
      }

      if (ast[i].lineNumber > line) {
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
          linesToHighlight.includes(line) || highlightAll ? "true" : "false",
      },
      children,
      lineNumber: line,
    });

    return nodes;
  }, []);

  return wrapped;
};

// https://github.com/gatsbyjs/gatsby/pull/26161/files
let MULTILINE_TOKEN_SPAN = /<span class="token ([^"]+)">[^<]*\n[^<]*<\/span>/g;

let applyMultilineFix = function (ast) {
  // AST to HTML
  let html = toHtml(ast);

  // Fix JSX issue
  html = html.replace(MULTILINE_TOKEN_SPAN, (match, token) =>
    match.replace(/\n/g, `</span>\n<span class="token ${token}">`),
  );

  // HTML to AST
  let hast = unified()
    .use(parse, { emitParseErrors: true, fragment: true })
    .parse(html);

  return hast.children;
};

function rehypeHighlightLine(ast, lines) {
  let formattedAst = applyMultilineFix(ast);
  let numbered = lineNumberify(formattedAst).nodes;

  return wrapLines(numbered, lines);
}

export default rehypeHighlightLine;
