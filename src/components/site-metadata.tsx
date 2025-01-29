import Head from "next/head";
import React from "react";

const config = {
  siteUrl: `https://sancho.dev`,
  title: `David Sancho`,
  twitter: `@davesnx`,
  feedUrl: `https://sancho.dev/rss.xml`,
  description:
    "Software engineer into ReasonML and OCaml. Working on styled-ppx and UI stuff at ahrefs. Co-host at emelle.tv",
};

type RequiredProps = {
  title: string;
};

const defaultProps = {
  description: config.description,
  url: config.siteUrl,
  schemaType: "website",
  createdAt: new Date().toISOString(),
};

type Props = RequiredProps & {
  [key in keyof typeof defaultProps]?: (typeof defaultProps)[key];
};

const MetaData = (props: Props) => {
  const subtitle = props.title || "";
  const title = subtitle + " | sancho.dev";
  const description = props.description || defaultProps.description;
  const schemaType = props.schemaType || defaultProps.schemaType;
  const createdAt = props.createdAt || defaultProps.createdAt;
  const url = props.url || defaultProps.url;

  const image = `https://api.metaimg.net/v1/render?design=profile&avatar=https://avatars.githubusercontent.com/u/3763599?v=4&name=David+Sancho&handler=%40davesnx&description=Software+engineer.+Currently+working+at+ahrefs+remotely+on+UI+stuff+and+building+styled-ppx.+Previously+%40draftbit+%40Typeform.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Co-host+at+https%3A%2F%2Femelle.tv&backgroundColor=191919&textColor=ced0d2`;
  const metaTags: Array<{ name: string; content: string }> = [
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: config.twitter },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: config.twitter },
    { name: "twitter:image:src", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "og:title", content: title },
    { name: "og:type", content: schemaType },
    { name: "og:url", content: url },
    { name: "og:image", content: image },
    { name: "og:description", content: description },
    { name: "og:site_name", content: config.title },
    { name: "og:published_time", content: createdAt },
  ];

  const favicons = [
    {
      rel: "apple-touch-icon",
      href: "/favicon/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon/favicon-512x512.png",
      sizes: "512x512",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon/favicon-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon/favicon-160x160.png",
      sizes: "160x160",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon/favicon-16x16.png",
      sizes: "16x16",
    },
  ];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="davesnx's personal blog"
        href={config.feedUrl}
      />
      {favicons.map((favicon) => (
        <link key={favicon.href} {...favicon} />
      ))}
      {metaTags.map(({ name, content }) => (
        <meta key={name} name={name} content={content} />
      ))}
      <meta
        name="ahrefs-site-verification"
        content="66eb7258c64a949157d612bbbbbaf307cb4a3cad3ce20766bdc504486b0712b4"
      />
      <script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="PlRodvhsdeDa2TA0XmHPLw"
        async
      ></script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": schemaType,
            name: title,
            about: description,
            url: url,
          }),
        }}
      />
    </Head>
  );
};

export default MetaData;
