import React from "react";
import GlobalStyles from "./src/components/global-styles";

export const wrapRootElement = ({ element }) => (
  <>
    <GlobalStyles />
    {element}
  </>
);
