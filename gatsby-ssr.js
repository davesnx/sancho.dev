import "./static/fonts/styles.css";
import React from "react";
import GlobalStyles from "./src/components/global-styles";

export const wrapPageElement = ({ element }) => {
  return (
    <>
      <GlobalStyles />
      {element}
    </>
  );
};
