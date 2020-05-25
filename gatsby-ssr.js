import React from "react";
import GlobalStyles from "./src/components/global-styles";
import "./static/fonts/styles.css";

export const wrapPageElement = ({ element }) => {
  return (
    <>
      <GlobalStyles />
      {element}
    </>
  );
};
