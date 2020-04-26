import { createGlobalStyle } from "styled-components";
import colors from "./colors";
import prism from "./prism";
import font from "./fonts";

const GlobalStyles = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
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
  }

  div {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  ${prism};
`;

export default GlobalStyles;
