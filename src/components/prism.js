import { css } from "styled-components";
import colors from "./colors";

const background = "#E2E9EE";
const black = "rgb(95, 95, 115)";
const orange = "#DC6439";
const yellow = "#f6a434";
const purple = "#9e4eb4";
const green = "#28b3ba";
const red = "#ef6b73";
const grey = "#aabfc9";
const strongblue = "#4c575d";

export default css`
  code[class*="language-"],
  pre[class*="language-"] {
    font-family: "Fira Code", monospace !important;
    font-size: 16px !important;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    vertical-align: middle;
  }

  .gatsby-highlight {
    margin: 1rem -32px;
    padding: 1.25rem 32px;
    border-radius: 4px;
    background: ${background};
  }

  code[class*="language-"],
  pre[class*="language-"] {
    background: ${background};
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    color: ${strongblue};
    font-family: Roboto Mono, monospace;
    font-size: 1em;
    line-height: 1.5em;

    tab-size: 4;
    hyphens: none;
  }

  code[class*="language-"]::-moz-selection,
  pre[class*="language-"]::-moz-selection,
  code[class*="language-"] ::-moz-selection,
  pre[class*="language-"] ::-moz-selection {
    background: #cceae7;
    color: #263238;
  }

  code[class*="language-"]::selection,
  pre[class*="language-"]::selection,
  code[class*="language-"] ::selection,
  pre[class*="language-"] ::selection {
    background: #cceae7;
    color: #263238;
  }

  :not(pre) > code[class*="language-"] {
    white-space: normal;
    border-radius: 2px;
    padding: 4px 6px;
    color: ${black};
    font-weight: 600;
  }

  pre[class*="language-"] {
    overflow: auto;
    position: relative;
    margin: 0.5em 0;
    padding: 1.25em 1em;
  }

  .language-css > code,
  .language-sass > code,
  .language-scss > code {
    color: ${orange};
  }

  [class*="language-"] .namespace {
    opacity: 0.7;
  }

  .token.atrule {
    color: ${purple};
  }

  .token.attr-name {
    color: ${green};
  }

  .token.attr-value {
    color: ${yellow};
  }

  .token.attribute {
    color: ${yellow};
  }

  .token.boolean {
    color: ${purple};
  }

  .token.builtin {
    color: ${green};
  }

  .token.cdata {
    color: ${green};
  }

  .token.char {
    color: ${green};
  }

  .token.class {
    color: ${green};
  }

  .token.class-name {
    color: ${colors.blue};
  }

  .token.comment {
    color: ${grey};
  }

  .token.constant {
    color: ${purple};
  }

  .token.deleted {
    color: ${red};
  }

  .token.doctype {
    color: ${grey};
  }

  .token.entity {
    color: ${red};
  }

  .token.function {
    color: ${purple};
  }

  .token.hexcode {
    color: ${orange};
  }

  .token.id {
    color: ${purple};
  }

  .token.important {
    color: ${red};
  }

  .token.inserted {
    color: ${green};
  }

  .token.keyword {
    color: ${colors.blue};
  }

  .token.number {
    color: ${orange};
  }

  .token.operator {
    color: ${green};
  }

  .token.prolog {
    color: ${grey};
  }

  .token.property {
    color: ${orange};
  }

  .token.pseudo-class {
    color: ${yellow};
  }

  .token.pseudo-element {
    color: ${yellow};
  }

  .token.punctuation {
    color: ${black};
  }

  .token.regex {
    color: ${colors.blue};
  }

  .token.selector {
    color: ${colors.blue};
  }

  .token.string {
    color: ${green};
  }

  .token.symbol {
    color: ${purple};
  }

  .token.tag {
    color: ${colors.blue};
  }

  .token.unit {
    color: ${orange};
  }

  .token.url {
    color: ${red};
  }

  .token.variable {
    color: ${colors.blue};
  }
`;
