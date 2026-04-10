import localFont from "next/font/local";

export const monoFont = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/JetBrainsMono-wght.woff2",
      style: "normal",
      weight: "400 700",
    },
  ],
});

export const displayFont = localFont({
  variable: "--font-display",
  display: "swap",
  preload: false,
  src: [
    {
      path: "../../public/fonts/InterVariable.woff2",
      style: "normal",
      weight: "400 700",
    },
  ],
});
