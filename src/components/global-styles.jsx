import { createGlobalStyle, css } from "styled-components";

import prism from "./prism";
import colors from "../colors";
import font from "../fonts";

const darkTheme = css`
  html {
    filter: hue-rotate(180deg) invert(90%);

    img {
      filter: invert(111%) hue-rotate(180deg);
    }
  }
`;

const GlobalStyles = createGlobalStyle`
  ${prism};


  @media (prefers-color-scheme: dark) {
    ${darkTheme}
  }

  body.__dark-theme-enabled {
    ${darkTheme}
  }

  html,
  body,
  #root,
  #gatsby-focus-wrapper,
  #___gatsby {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    min-width: 100vw;
    height: 100%;
    width: 100%;
    text-size-adjust: 100%;

    color: ${colors.white};
    font-size: 100%;
  }

  body {
    font-size: ${font.globalFontSize};
    line-height: ${font.globalLineHeight};
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
`;

export default GlobalStyles;
