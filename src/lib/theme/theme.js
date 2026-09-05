/*
 * Active palette entry point. Components import `colors` from here and the global
 * stylesheet reads the CSS variables from here, so swapping the palette for the whole
 * site is a one-line change. Palettes: ./luma.js (extracted from luma.com/barcelona,
 * active) and ./navy.js (the previous sancho.dev palette). Both expose the same API and
 * the same token names.
 */
export { assignThemeVariables, colors, darkCSSVariables, lightCSSVariables, make } from './luma';
