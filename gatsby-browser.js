import React from "react";
import GlobalStyles from "./src/components/global-styles";

import "./static/fonts/styles.css";

export const wrapRootElement = ({ element }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <>
      <GlobalStyles />
      {element}
    </>
  );
};
