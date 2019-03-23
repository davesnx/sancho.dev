import { createGlobalStyle } from 'styled-components'
import FiraCode from './fonts/FiraCode-Regular.woff2'
import FiraCodeLight from './fonts/FiraCode-Light.woff2'
import FiraCodeMedium from './fonts/FiraCode-Medium.woff2'
import FiraCodeBold from './fonts/FiraCode-Bold.woff2'

const GlobalStyles = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  #root {
    height: 100%;
    width: 100%;
  }

  @font-face {
    font-family: 'Fira Code';
    src: url(${FiraCodeLight});
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Fira Code';
    src: url(${FiraCode});
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Fira Code';
    src: url(${FiraCodeMedium});
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Fira Code';
    src: url(${FiraCodeBold});
    font-weight: 700;
    font-style: normal;
  }

  * {
    font-family: 'Fira Code';
  }
`

export default GlobalStyles
