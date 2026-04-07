import { css } from "@linaria/core";

import fonts from "@/theme/fonts";
import { assignThemeVariables, darkCSSVariables, lightCSSVariables } from "@/theme/theme";

export const globals = css`
  :global(:root) {
    ${lightCSSVariables}
    ${darkCSSVariables}
    ${assignThemeVariables("dark")}
    color-scheme: dark;
  }

  :global(html[data-theme="light"]) {
    ${assignThemeVariables("light")}
    color-scheme: light;
  }

  :global(html[data-theme="dark"]) {
    ${assignThemeVariables("dark")}
    color-scheme: dark;
  }

  :global(*) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
  }

  :global(html),
  :global(body),
  :global(#root),
  :global(#__next) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    height: 100%;
    width: 100%;
    text-size-adjust: 100%;
    font-size: 100%;
  }

  :global(body) {
    background: var(--c-backgroundPrimary);
    color: var(--c-textPrimary);
    font-size: ${fonts.globalFontSize};
    font-family: ${fonts.sans};
    line-height: ${fonts.globalLineHeight};
    text-rendering: optimizeLegibility;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(figure) {
    margin: 0;
    padding: 0;
  }

  :global(a) {
    color: inherit;
  }

  :global(img) {
    max-width: 100%;
  }

  :global(button),
  :global(input),
  :global(textarea),
  :global(select) {
    font: inherit;
  }

  :global(pre),
  :global(code) {
    font-family: ${fonts.mono};
  }

  :global(summary) {
    list-style: none;
  }

  :global(summary::-webkit-details-marker) {
    display: none;
  }

  :global(::selection) {
    background: var(--c-borderSubtle);
    color: var(--c-textAccent);
  }
`;
