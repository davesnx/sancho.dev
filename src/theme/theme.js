/* This file can't have any dependency, we inject it outside of the app and react. During SSR. */

/**
 * @typedef {Object} CommonValues
 * @property {string} r - Red color value (#FF211B)
 * @property {string} g - Green color value (#17E620)
 * @property {string} b - Blue color value (#003AEC)
 * @property {string} bluesky - Bluesky brand color (RGB: 16,133,253)
 * @property {string} twitter - Twitter brand color (RGB: 164,173,187)
 * @property {string} github - GitHub brand color (RGB: 164,173,187)
 * @property {string} discord - Discord brand color (RGB: 114,137,218)
 * @property {string} strava - Strava brand color (RGB: 252,76,2)
 */

/**
 * Common color values shared between themes
 * @type {CommonValues}
 */
const commonValues = {
  r: "#FF211B",
  g: "#17E620",
  b: "#003AEC",
  bluesky: "16,133,253",  // #1085FD
  twitter: "164,173,187", // #181717
  github: "164,173,187",  // #181717
  discord: "114,137,218", // #7289DA
  strava: "252,76,2",     // #FC4C02
};

/**
 * @typedef {Object} ThemeValues
 * @property {string} body - Body text color
 * @property {string} contrast - Contrast background color
 * @property {string} overlay - Overlay background color
 * @property {string} codeBackground - Code block background color
 * @property {string} contrastCodeBackground - Contrasting code background color
 * @property {string} subtle - Subtle text color
 * @property {string} primary - Primary accent color
 */

/**
 * Light theme specific color values
 * @type {ThemeValues}
 */
const lightValues = {
  primary: "18,26,36",                    // #121A24
  body: "35,48,68",                       // #233044
  contrast: "250,250,250",                // #FAFAFA
  overlay: "255,255,255",                 // #FFFFFF
  codeBackground: "35,35,35",             // #1F1F1F
  contrastCodeBackground: "238,238,238",  // #EEEEEE
  subtle: "174,178,185",                  // #AEB2B9
};

/**
 * Dark theme specific color values
 * @type {ThemeValues}
 */
const darkValues = {
  primary: "250,250,250",             // #FAFAFA
  body: "206,208,210",                // #CED0D2
  contrast: "20,20,20",               // #141414
  overlay: "17,17,17",                // #111111
  codeBackground: "33,33,33",         // #212121
  contrastCodeBackground: "38,38,38", // #262626
  subtle: "84,88,93",                 // #54585D
};

/** @type {CommonValues & ThemeValues} */
const lightTheme = Object.assign({}, lightValues, commonValues);

/** @type {CommonValues & ThemeValues} */
const darkTheme = Object.assign({}, darkValues, commonValues);

/**
 * Creates a CSS variable declaration
 * @param {string} theme - Theme name ('light' or 'dark')
 * @param {string} key - Color key
 * @param {string} value - Color value
 * @returns {string} CSS variable declaration
 */
let declaration = (theme, key, value) => `--c-${theme}-${key}: ${value};`;

/**
 * Creates a CSS variable reference
 * @param {string} str - CSS variable name
 * @returns {string} CSS variable reference
 */
let variable = (str) => `var(${str})`;

/**
 * Creates a CSS variable name
 * @param {string} key - Color key
 * @returns {string} CSS variable name
 */
let variableName = (key) => `--c-${key}`;

/**
 * Converts a theme object to CSS variables
 * @param {string} prefix - Theme prefix ('light' or 'dark')
 * @param {Record<string, string>} obj - Theme object
 * @returns {string} CSS variable declarations
 */
let objectToCSSVariable = (prefix, obj) => {
  return Object.entries(obj)
    .map(([key, value]) => declaration(prefix, key, value))
    .join(" ");
};

/** @type {string} */
export let lightCSSVariables = objectToCSSVariable("light", lightTheme);
/** @type {string} */
export let darkCSSVariables = objectToCSSVariable("dark", darkTheme);

/**
 * Creates a CSS root rule
 * @param {string} str - CSS variable declarations
 * @returns {string} CSS root rule
 */
let makeRoot = (str) => `:root { ${str} }`;

/**
 * Creates a complete theme CSS root rule
 * @param {'light' | 'dark'} theme - Theme name
 * @returns {string} CSS root rule with theme variables
 */
export let make = (theme) => {
  return makeRoot(
    Object.keys(lightTheme)
      .map((key) => [`--c-${key}`, `var(--c-${theme}-${key})`])
      .map(([colorName, themeName]) => `${colorName}: ${themeName};`)
      .join(" "),
  );
};

/**
 * Object containing CSS variable references for all theme colors
 * @type {Record<keyof (CommonValues & ThemeValues), string>}
 */
export let colors = Object.fromEntries(
  Object.entries(lightTheme).map(([key, _value]) => [
    key,
    variable(variableName(key)),
  ]),
);
