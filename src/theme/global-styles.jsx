import { css } from "@emotion/react";
import fonts from "./fonts";
import { darkCSSVariables, lightCSSVariables, make } from "./theme";

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

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
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

  figure {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;
