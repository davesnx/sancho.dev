import Head from "next/head";
import NextScript from "next/script";

const config = {
  siteUrl: `https://sancho.dev`,
  siteName: `sancho.dev`,
  authorName: `David Sancho`,
  twitter: `@davesnx`,
  feedUrl: `https://sancho.dev/rss.xml`,
  description:
    "Open Source UI infra at @ahrefs with OCaml. Made styled-ppx and server-reason-react. Working on reason-react / Melange / Reason",
};

type SchemaType = "article" | "webpage" | "website";

type RequiredProps = {
  title: string;
};

const defaultProps = {
  description: config.description,
  path: "/",
  schemaType: "webpage" as SchemaType,
  publishedAt: undefined as string | undefined,
  canonicalUrl: undefined as string | undefined,
  slug: undefined as string | undefined,
  noIndex: false,
};

type Props = RequiredProps & {
  [key in keyof typeof defaultProps]?: (typeof defaultProps)[key];
};

const getAbsoluteUrl = (path: string) => new URL(path, config.siteUrl).toString();

const getResolvedPath = ({
  path,
  schemaType,
  slug,
}: {
  path?: string;
  schemaType: SchemaType;
  slug?: string;
}) => {
  if (path) {
    return path;
  }

  if (schemaType === "article" && slug) {
    return `/blog/${slug}`;
  }

  return defaultProps.path;
};

const getStructuredData = ({
  description,
  image,
  publishedAt,
  schemaType,
  title,
  url,
}: {
  description: string;
  image: string;
  publishedAt?: string;
  schemaType: SchemaType;
  title: string;
  url: string;
}) => {
  if (schemaType === "article") {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description,
      url,
      mainEntityOfPage: url,
      image: [image],
      author: {
        "@type": "Person",
        name: config.authorName,
        url: `${config.siteUrl}/about`,
      },
      publisher: {
        "@type": "Person",
        name: config.authorName,
        url: config.siteUrl,
      },
      ...(publishedAt
        ? {
            datePublished: publishedAt,
            dateModified: publishedAt,
          }
        : {}),
      isPartOf: {
        "@type": "WebSite",
        name: config.siteName,
        url: config.siteUrl,
      },
    };
  }

  if (schemaType === "website") {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: config.siteName,
      description,
      url,
      author: {
        "@type": "Person",
        name: config.authorName,
        url: `${config.siteUrl}/about`,
      },
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: config.siteName,
      url: config.siteUrl,
    },
  };
};

const MetaData = (props: Props) => {
  const pageTitle = props.title || "";
  const title = pageTitle + " | sancho.dev";
  const description = props.description || defaultProps.description;
  const schemaType = props.schemaType || defaultProps.schemaType;
  const path = getResolvedPath({
    path: props.path,
    schemaType,
    slug: props.slug,
  });
  const canonicalUrl = props.canonicalUrl || getAbsoluteUrl(path);

  const image = props.slug
    ? `${config.siteUrl}/og/${props.slug}.png`
    : `https://metaimg.xyz/render?design=profile&avatar=https://avatars.githubusercontent.com/u/3763599?v=4&name=David+Sancho&handler=%40davesnx&description=${encodeURIComponent(description)}&backgroundColor=191919&textColor=ced0d2`;

  const twitterMetaTags: Array<{ name: string; content: string }> = [
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: config.twitter },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: config.twitter },
    { name: "twitter:image:src", content: image },
  ];

  const openGraphMetaTags: Array<{ property: string; content: string }> = [
    { property: "og:title", content: title },
    {
      property: "og:type",
      content: schemaType === "article" ? "article" : "website",
    },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: image },
    { property: "og:description", content: description },
    { property: "og:site_name", content: config.siteName },
  ];

  if (schemaType === "article" && props.publishedAt) {
    openGraphMetaTags.push({
      property: "article:published_time",
      content: props.publishedAt,
    });
  }

  const structuredData = getStructuredData({
    description,
    image,
    publishedAt: props.publishedAt,
    schemaType,
    title: pageTitle,
    url: canonicalUrl,
  });

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
      <link rel="canonical" href={canonicalUrl} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
      {props.noIndex ? <meta name="robots" content="noindex, follow" /> : null}
      <link
        rel="alternate"
        type="application/rss+xml"
        title="davesnx's personal blog"
        href={config.feedUrl}
      />
      {favicons.map((favicon) => (
        <link key={favicon.href} {...favicon} />
      ))}
      {twitterMetaTags.map(({ name, content }) => (
        <meta key={name} name={name} content={content} />
      ))}
      {openGraphMetaTags.map(({ property, content }) => (
        <meta key={property} property={property} content={content} />
      ))}
      <meta
        name="ahrefs-site-verification"
        content="e9ca7385f25c8be91c3030a42bb760b5c9f23a9e43e6dce7a5f3409951c4572d"
      />
      <NextScript
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="PlRodvhsdeDa2TA0XmHPLw"
        async
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );
};

export default MetaData;
