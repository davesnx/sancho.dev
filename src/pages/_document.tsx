import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang={"en"}>
        <Head>
          <link
            key="silka-thin"
            href={"/fonts/silka-thin-webfont.woff2"}
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            key="silka-medium"
            href={"/fonts/silka-medium-webfont.woff2"}
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            key="silka-regular"
            href={"/fonts/silka-regular-webfont.woff2"}
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            key="silka-semibold"
            href={"/fonts/silka-semibold-webfont.woff2"}
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            key="silka-bold"
            href={"/fonts/silka-bold-webfont.woff2"}
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            key="sfmono-bold"
            href={"/fonts/SFMono-Bold.otf"}
            rel="preload"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          <link
            key="sfmono-medium"
            href={"/fonts/SFMono-Medium.otf"}
            rel="preload"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="davesnx's personal blog"
            href="https://sancho.dev/rss.xml"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async src="https://cdn.splitbee.io/sb.js"></script>
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
