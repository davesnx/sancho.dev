const increment = "1.2";
const lineHeightFixed = "0.5rem";
const lineHeightRelative = "1.2rem";

const fontSize0 = "(1rem + 0.15vw)";
const fontSize1 = `calc(${fontSize0} * ${increment})`;
const fontSize2 = `calc(${fontSize0} * ${increment} * 2)`;
const fontSize3 = `calc(${fontSize0} * 3)`;
const globalFontSize = `${fontSize0}`;
const globalLineHeight = `calc(${lineHeightFixed} + ${lineHeightRelative})`;

export default {
  fontSize0,
  fontSize1,
  fontSize2,
  fontSize3,
  globalFontSize,
  globalLineHeight
};
