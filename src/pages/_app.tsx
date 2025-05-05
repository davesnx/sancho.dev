import "../theme/fonts.css";

import React from "react";

import { Global } from "@emotion/react";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";

import GlobalStyles from "../theme/global-styles";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={GlobalStyles} />
      <ThemeProvider defaultTheme={"dark"}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
