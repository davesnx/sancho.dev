import { createGlobalStyle } from "styled-components";

import prism from "./prism";
import colors from "../colors";
import font from "../fonts";

const GlobalStyles = createGlobalStyle`
  ${prism};

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
