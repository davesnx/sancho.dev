import React from "react";

import { colors, KEY as THEME_KEY, make } from "./src/theme"
import GlobalStyle from "./src/global-styles"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <style charSet="utf-8" key="global-styles" type="text/css">{GlobalStyle}</style>,
    <style charSet="utf-8" key="theme-overrides" id="theme-override" type="text/css"></style>,
    <script
      key="theme-iff"
      charSet="utf-8"
      dangerouslySetInnerHTML={{
        __html: `
  (function() {
    var localStorageValue;

    var makeTheme = ${make.toString()};
    var overriteRoot = function (str) {
      var themeOverridesStyleElement = document.querySelector("#theme-override");
      themeOverridesStyleElement.innerHTML = str;
    };
    var colorKeys = Object.keys(${JSON.stringify(colors)});

    try {
      localStorageValue = localStorage.getItem('${THEME_KEY}');
    } catch (e) {}

    var systemPreferDark = window.matchMedia('(prefers-color-scheme: dark)');
    var systemPreference = systemPreferDark.matches ? 'dark' : 'light';
    var theme = localStorageValue || systemPreference;

    localStorage.setItem('${THEME_KEY}', theme);
    var css = makeTheme(theme);
    overriteRoot(css);
  })();
`
          .replace(/\n/g, " ")
          .replace(/ {2}/g, ""),
      }}
    />,
  ]);
};
