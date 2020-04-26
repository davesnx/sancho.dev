import { css } from "styled-components";
import colors from "./colors";

const background = "#E2E9EE";
const blue = "#0966ba";
const black = "rgb(95, 95, 115)";
const grey = "#585858";
const orange = "#DC6439";
const purple = "#9e4eb4";
const green = "#28b3ba";
const red = "#d91c1d";
const strongblue = "#4c575d";

export default css`
  code[class*="language-"],
  pre[class*="language-"] {
    font-family: "Fira Code", "Andale Mono", "Ubuntu Mono", monospace !important;
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

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
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
    color: #f76d47;
  }

  [class*="language-"] .namespace {
    opacity: 0.7;
  }

  .token.atrule {
    color: #7c4dff;
  }

  .token.attr-name {
    color: #39adb5;
  }

  .token.attr-value {
    color: #f6a434;
  }

  .token.attribute {
    color: #f6a434;
  }

  .token.boolean {
    color: #7c4dff;
  }

  .token.builtin {
    color: #39adb5;
  }

  .token.cdata {
    color: #39adb5;
  }

  .token.char {
    color: #39adb5;
  }

  .token.class {
    color: #39adb5;
  }

  .token.class-name {
    color: #6182b8;
  }

  .token.comment {
    color: #aabfc9;
  }

  .token.constant {
    color: #7c4dff;
  }

  .token.deleted {
    color: #e53935;
  }

  .token.doctype {
    color: #aabfc9;
  }

  .token.entity {
    color: #e53935;
  }

  .token.function {
    color: ${purple};
  }

  .token.hexcode {
    color: #f76d47;
  }

  .token.id {
    color: #7c4dff;
  }

  .token.important {
    color: ${red};
  }

  .token.inserted {
    color: #39adb5;
  }

  .token.keyword {
    color: ${blue};
  }

  .token.number {
    color: #f76d47;
  }

  .token.operator {
    color: #39adb5;
  }

  .token.prolog {
    color: #aabfc9;
  }

  .token.property {
    color: ${orange};
  }

  .token.pseudo-class {
    color: #f6a434;
  }

  .token.pseudo-element {
    color: #f6a434;
  }

  .token.punctuation {
    color: ${black};
  }

  .token.regex {
    color: #6182b8;
  }

  .token.selector {
    color: ${blue};
  }

  .token.string {
    color: ${green};
  }

  .token.symbol {
    color: #7c4dff;
  }

  .token.tag {
    color: ${blue};
  }

  .token.unit {
    color: #f76d47;
  }

  .token.url {
    color: #e53935;
  }

  .token.variable {
    color: ${blue};
  }
`;
