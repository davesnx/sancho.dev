import React from "react";
import { KEY as THEME_KEY } from "./src/theme"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="theme-iff"
      charSet="utf-8"
      dangerouslySetInnerHTML={{
        __html: `
  (function() {
    var localStorageValue;

    try {
      localStorageValue = localStorage.getItem('${THEME_KEY}');
    } catch (e) {}

    var systemPreferDark = window.matchMedia('(prefers-color-scheme: dark)');
    var systemPreference = systemPreferDark.matches ? 'dark' : 'light';
    var theme = localStorageValue || systemPreference;

    localStorage.setItem('${THEME_KEY}', theme);
  })();
`
          .replace(/\n/g, " ")
          .replace(/ {2}/g, ""),
      }}
    />,
  ]);
};
