import { css } from "styled-components";

import colors from "../colors";

const background = "#E2E9EE";
const black = "#4c4c5c";
const orange = "#DC6439";
const yellow = "#e28200";
const purple = "#9e4eb4";
const green = "#28b3ba";
const red = "#ef6b73";
const grey = "#aabfc9";
const strongblue = "#4c575d";

export default css`
  code[class*="language-"],
  pre[class*="language-"] {
    font-family: "SF Mono", "Fira Code", monospace;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5em;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
  }

  .gatsby-highlight {
    margin: 0;
    margin-bottom: 2rem;
    padding: 1.25rem 32px;
    background: ${background};
    border-radius: 4px;
    border: 1px solid ${colors.fadedBlack};
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
    tab-size: 4;
    hyphens: none;
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
    margin: 0;
    padding: 0;
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
