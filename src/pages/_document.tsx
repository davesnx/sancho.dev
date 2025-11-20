import Document, { Html, Head, Main, NextScript } from "next/document";

/*
TODO: When next@13 is installed, use next/font like:

import { DM_Sans } from "@next/font/google";

const dmsans = DM_Sans({
  subsets: ["latin"],
}); */

class MyDocument extends Document {
  render() {
    return (
      <Html lang={"en"} /* className={dmsans.className} */>
        <Head>
          <link
            key="jetbrains-mono"
            href={"/fonts/JetBrainsMono.ttf"}
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            key="dmsans-regular"
            href={"/fonts/DMSans.ttf"}
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            key="dmsans-italic"
            href={"/fonts/DMSans-Italic.ttf"}
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="davesnx's personal blog"
            href="https://sancho.dev/rss.xml"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            src="https://analytics-staging.ahrefs.dev/analytics.js"
            data-key="DWZmB48jYlnWJGp+P6ibzQ"
            async
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
