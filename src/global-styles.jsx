import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    text-size-adjust: 100%;

    color: ${colors.white};
  }

  #root {
    height: 100vh;
    width: 100vw;
  }

  * {
    font-family: 'Fira Code';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    line-height: 1.5;
  }

  div {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }
`;

export default GlobalStyles;
