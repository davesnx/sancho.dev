/* This file can't have any dependency, we inject it outside of the app and react. During SSR. */

const values = {
  r: "#FF211B",
  g: "#17E620",
  b: "#003AEC",
};

const lightValues = {
  body: "35,48,68",
  contrast: "250,250,250",
  overlay: "255,255,255",
  codeBackground: "38,38,41",
  subtle: "174,178,185",
  primary: "66,153,232",
  twitter: "29,161,242",
  github: "24,23,23",
  telegram: "114,137,218",
  strava: "252,76,2",
  /* strongBlue: "#4c575d",*/
};

const darkValues = {
  body: "206,208,210",
  contrast: "29,29,29",
  overlay: "17,17,17",
  codeBackground: "38,38,41",
  subtle: "84,88,93",
  primary: "58,128,191",
  twitter: "29,161,242",
  github: "164,173,187",
  telegram: "114,137,218",
  strava: "252,76,2",
  /* strongBlue: "#aabfc9",*/
};

const lightTheme = Object.assign({}, lightValues, values);
const darkTheme = Object.assign({}, darkValues, values);

export let KEY = "__sancho-www-theme";

let declaration = (theme, key, value) => `--c-${theme}-${key}: ${value};`;

let variable = (str) => `var(${str})`;
let variableName = (key) => `--c-${key}`;

let objectToCSSVariable = (prefix, obj) => {
  return Object.entries(obj)
    .map(([key, value]) => declaration(prefix, key, value))
    .join(" ");
};

export let lightRoot = objectToCSSVariable("light", lightTheme);
export let darkRoot = objectToCSSVariable("dark", darkTheme);

export let colorKeys = Object.keys(lightTheme);

export let make = (theme) => {
  let makeRoot = (str) => `:root { ${str} }`;
  const mappings = colorKeys.map((key) => [
    `--c-${key}`,
    `var(--c-${theme}-${key})`,
  ]);

  return makeRoot(
    mappings
      .map(([colorName, themeName]) => `${colorName}: ${themeName};`)
      .join(" ")
  );
};

export let colors = Object.fromEntries(
  Object.entries(lightTheme).map(([key, _value]) => [
    key,
    variable(variableName(key)),
  ])
);
