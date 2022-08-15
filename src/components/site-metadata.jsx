import React from "react";
import Head from "next/head";

const config = {
  siteUrl: `https://sancho.dev`,
  title: `David Sancho`,
  twitter: `@davesnx`,
  description:
    "Software Engineer. Making cute software with ReasonML and OCaml" +
    "Passionate in design, functional programming, scalability, people and business.",
};

/* const postImage = `https://api.metaimg.net/v1/render?design=profile&avatar=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1508834887079505934%2FDpjXkZ54_400x400.jpg&name=David+Sancho&handler=%40davesnx&description=${config.description}&backgroundColor=FFFFFF&textColor=000000`; */

const MetaData = ({
  title: subtitle,
  description = config.description,
  url = config.siteUrl,
  schemaType = "website",
  createdAt = new Date().toISOString(),
}) => {
  const title = subtitle + " | sancho.dev";
  const image = `https://api.metaimg.net/v1/render?design=simple&align=left&image=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576618148400-f54bed99fcfd&title=${title}&description=${description}&textColor=000000&backgroundColor=FFFFFF"`;
  const metaTags = [
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
      {/* <link rel="manifest" href="/favicon/site.webmanifest" /> */}
      {favicons.map((favicon) => (
        <link key={favicon.href} {...favicon} />
      ))}
      {metaTags.map(({ name, content }) => (
        <meta key={name} name={name} content={content} />
      ))}
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
