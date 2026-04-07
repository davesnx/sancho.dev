import localFont from "next/font/local";

export const sansFont = localFont({
  variable: "--font-sans",
  display: "swap",
  preload: false,
  src: [
    {
      path: "../../public/fonts/DMSans.ttf",
      style: "normal",
      weight: "400 800",
    },
  ],
});

export const monoFont = localFont({
  variable: "--font-mono",
  display: "swap",
  preload: false,
  src: [
    {
      path: "../../public/fonts/JetBrainsMono.ttf",
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
      path: "../../public/fonts/Inter.otf",
      style: "normal",
      weight: "400 700",
    },
  ],
});
