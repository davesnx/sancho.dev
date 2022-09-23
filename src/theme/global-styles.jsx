import fonts from "./fonts";
import { make, lightRoot, darkRoot, colors } from "./theme";
import { css } from "@emotion/react";
import { rgb } from "./color";

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
  #__next {
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
    -webkit-overflow-scrolling: touch;

    line-height: 1.4;
    box-sizing: border-box;
  }

  code,
  pre {
    font-family: ${fonts.mono};
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    tab-size: 4;
    hyphens: none;
    background: ${rgb(colors.codeBackground)};
  }

  pre {
    overflow: auto;
    position: relative;
    padding: 1.25rem 1rem;
    margin: 1rem 0;
    border-radius: 3px;
  }

  pre > code {
    margin: 0;
    display: grid;
  }

  :not(pre) > code {
    white-space: normal;
    border-radius: 2px;
    padding: 3px 6px;
    margin: 0px 2px;
    color: ${rgb(colors.body)};
  }

  html[data-theme="dark"] pre[data-theme="light"],
  html[data-theme="dark"] code[data-theme="light"] {
    display: none;
  }

  html[data-theme="light"] pre[data-theme="dark"],
  html[data-theme="light"] code[data-theme="dark"] {
    display: none;
  }
`;

export default GlobalStyles;
