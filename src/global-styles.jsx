import fonts from "./fonts";
import { make, lightRoot, darkRoot, colors } from "./theme"
import { css } from "styled-components"

const black = colors.prismBlack;
const orange = colors.prismOrange;
const yellow = colors.prismYellow;
const purple = colors.prismPurple;
const green = colors.prismGreen;
const red = colors.prismRed;
const grey = colors.prismGrey;
const strongblue = colors.prismStrongblue;

const GlobalStyles = css`
  :root {
    ${lightRoot};
    ${darkRoot};
  }

  @media (prefers-color-scheme: dark) {
    ${make("dark")};
  }

  @media (prefers-color-scheme: light) {
    ${make("light")};
  }

  html,
  body,
  #root,
  #gatsby-focus-wrapper,
  #___gatsby {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    height: 100%;
    width: 100%;
    text-size-adjust: 100%;
    font-size: 100%;
  }

  body {
    font-size: ${fonts.globalFontSize};
    line-height: ${fonts.globalLineHeight};
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    line-height: 1.4;
    box-sizing: border-box;
  }

  .gatsby-resp-image-background-image {
    border-radius: 6px;
  }

  .gatsby-highlight {
    overflow-y: auto;
    margin: 0;
    margin-bottom: 2rem;
    background-color: ${colors.contrast};
    border-radius: 4px;
    border: 1px solid ${colors.subtle};
  }

  code, pre {
    font-family: ${fonts.mono};
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5em;
    background-color: ${colors.contrast};
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    color: ${strongblue};
    tab-size: 4;
    hyphens: none;
  }

  pre {
    overflow: auto;
    position: relative;
    margin: 0;
    padding: 1.25rem 1rem;
  }

  pre > code {
    padding: 1.25rem 1rem;
    margin: 0;
  }

  :not(pre) > code {
    white-space: normal;
    border-radius: 2px;
    padding: 4px 6px;
    color: ${black};
    font-weight: 600;
  }

  .language-css > code,
  .language-sass > code,
  .language-scss > code {
    color: ${orange};
  }

  .namespace {
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
    color: ${colors.primary};
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
    color: ${colors.primary};
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
    color: ${colors.primary};
  }

  .token.selector {
    color: ${colors.primary};
  }

  .token.string {
    color: ${green};
  }

  .token.symbol {
    color: ${purple};
  }

  .token.tag {
    color: ${colors.primary};
  }

  .token.unit {
    color: ${orange};
  }

  .token.url {
    color: ${red};
  }

  .token.variable {
    color: ${colors.primary};
  }

  .token.parameter {
    color: ${colors.primary};
  }

  .token.plain-text {
    color: ${colors.body};
  }
`;

export default GlobalStyles;
