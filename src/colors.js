import Color from 'color'

const alphaToColor = (color, alpha) => {
  return Color(color)
    .alpha(alpha)
    .rgb()
    .toString()
}

const getValue = variable => {
  console.log(variable);
  const variableName = variable.replace("var(", "").replace(")", "");
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

export const transparent = color => alphaToColor(getValue(color), 0.8)
export const xtransparent = color => alphaToColor(getValue(color), 0.6)
export const xxtransparent = color => alphaToColor(getValue(color), 0.3)
export const xxxtransparent = color => alphaToColor(getValue(color), 0.1)

