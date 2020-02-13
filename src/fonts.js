const increment = "1.2";
const lineHeightFixed = "0.4rem";
const lineHeightRelative = "1.1rem";

const fontSize0 = "1.1rem";
const fontSize1 = `calc(${fontSize0} * ${increment})`;
const fontSize2 = "3rem";
const globalFontSize = `${fontSize0}`;
const globalLineHeight = `calc(${lineHeightFixed} + ${lineHeightRelative})`;

export default {
  fontSize0,
  fontSize1,
  fontSize2,
  globalFontSize,
  globalLineHeight
};
