import type { Metadata } from "next";
import Script from "next/script";
import { preload } from "react-dom";

import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/site";
import { displayFont, monoFont } from "./fonts";
import "./style.linaria.global";
import { AppThemeProvider } from "./theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.siteName,
    template: "%s | sancho.dev",
  },
  description: siteConfig.description,
  authors: [
    {
      name: siteConfig.authorName,
      url: `${siteConfig.siteUrl}/about`,
    },
  ],
  alternates: {
    types: {
      "application/rss+xml": siteConfig.feedUrl,
    },
  },
  icons: {
    apple: "/favicon/apple-touch-icon.png",
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  verification: {
    other: {
      "ahrefs-site-verification": siteConfig.verification.ahrefs,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  preload("/fonts/DMSans-400.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/DMSans-700.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  return (
    <html lang="en" suppressHydrationWarning className={`${monoFont.variable} ${displayFont.variable}`} data-scroll-behavior="smooth">
      <body>
        <AppThemeProvider>
          <SiteShell>{children}</SiteShell>
        </AppThemeProvider>
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="PlRodvhsdeDa2TA0XmHPLw" async />
      </body>
    </html>
  );
}
