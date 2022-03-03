/* This file can't have any dependency, we inject it outside of the app and react. During SSR. */

const r = "#FF211B";
const g = "#17E620";
const b = "#003AEC";

const lightValues = {
  body: "#233044",
  contrast: "#FAFAFA",
  subtle: "#AEB2B9",
  primary: "#4299e8",
  twitter: "rgba(29, 161, 242, 1)",
  github: "rgba(24, 23, 23, 1)",
  telegram: "rgba(114, 137, 218, 1)",
  strava: "rgba(252, 76, 2, 1)",
  r, g, b
};

const darkValues = {
  body: "rgb(164 173 187)",
  contrast: "rgb(29 29 29)",
  subtle: "#54585d",
  primary: "#3a80bf",
  twitter: "rgba(29, 161, 242, 1)",
  github: "rgba(24, 23, 23, 1)",
  telegram: "rgba(114, 137, 218, 1)",
  strava: "rgba(252, 76, 2, 1)",
  r, g, b
};

export let KEY = "__sancho-www-theme";

let declaration = (theme, key, value) => `--c-${theme}-${key}: ${value};`;

let variable = str => `var(${str})`;
let variableName = key => `--c-${key}`;

let objectToCSSVariable = (prefix, obj) => {
  return Object.entries(obj)
    .map(([key, value]) => declaration(prefix, key, value))
    .join(" ");
};

export let lightRoot = objectToCSSVariable("light", lightValues);
export let darkRoot = objectToCSSVariable("dark", darkValues);

export let colorKeys = Object.keys(lightValues);

export let make = theme => {
  let makeRoot = str => `:root { ${str} }`;
  const mappings = colorKeys.map(key => [
    `--c-${key}`,
    `var(--c-${theme}-${key})`,
  ]);

  return makeRoot(mappings.map(([colorName, themeName]) => {
    return `${colorName}: ${themeName};`
  }).join(" "))
};

export let colors = Object.fromEntries(
  Object.entries(lightValues).map(([key, _value]) => [
    key,
    variable(variableName(key)),
  ])
);
