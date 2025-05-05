import { css } from "@emotion/react";
import fonts from "./fonts";
import { colors, darkCSSVariables, lightCSSVariables, make } from "./theme";

const GlobalStyles = css`
  :root {
    ${lightCSSVariables};
    ${darkCSSVariables};
  }

  html[data-theme="dark"] {
    ${make("dark")};
  }

  html[data-theme="light"] {
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
    box-sizing: border-box;
  }

  pre,
  code {
    font-family: ${fonts.mono};
    font-weight: 400;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    tab-size: 4;
    hyphens: none;
  }

  pre {
    display: grid;
    overflow: auto;
    position: relative;
    padding: 2rem;
    border-radius: 6px;
    margin: 0;
    background: ${colors.codeBackground};
  }

  :not(pre) > code {
    white-space: normal;
    border-radius: 4px;
    padding: 3px 6px;
    margin: 0px 2px;
    color: ${colors.body};
    background: ${colors.contrastCodeBackground30};
  }

  p > code:first-of-type {
    margin-left: 0;
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
