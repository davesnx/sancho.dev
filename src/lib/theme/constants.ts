const breakpoints = {
  desktop: { width: 900 - 1 },
  mobile: { width: 600 - 1 },
};

export const layout = {
  contentWidth: breakpoints.desktop.width,
  readingMeasure: '72ch',
  mobileGutter: '24px',
  desktopGutter: '32px',
  spacingUnit: 8,
} as const;

export default breakpoints;
