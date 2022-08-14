export let useAnalytics = () => {};

export function renderSnippet() {
  if (process.env.NODE_ENV === "production") {
    return `window.dataLayer = window.dataLayer || [];`;
  }
  return "";
}
