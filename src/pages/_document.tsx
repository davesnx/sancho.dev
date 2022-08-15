import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang={"en"}>
        <Head>
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
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async src="https://cdn.splitbee.io/sb.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
