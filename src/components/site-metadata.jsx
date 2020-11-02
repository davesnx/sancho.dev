import React from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import colors from "./colors";

const SiteMetadata = ({ pathname }) => {
  const {
    site: {
      siteMetadata: { siteUrl, title, twitter },
    },
  } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          siteUrl
          title
          twitter
        }
      }
    }
  `);

  return (
    <Helmet defaultTitle={title} titleTemplate={`%s | ${title}`}>
      <html lang="en" />
      <meta charSet="utf-8" />

      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content={colors.black} />
      <meta
        name="ahrefs-site-verification"
        content="bd6c5b649f70973df5dea834d5ed90214fd6acec11974bfdd1d44b2e24a03009"
      />

      <link rel="manifest" href={`${siteUrl}/manifest.json`} />
      <link rel="shortcut icon" href={`${siteUrl}/favicon/favicon.ico`} />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href={`${siteUrl}/favicon/apple-touch-icon`}
      />
      <link
        rel="icon"
        type="image/png"
        href={`${siteUrl}/favicon/favicon-512x512.png`}
        sizes="512x512"
      />
      <link
        rel="icon"
        type="image/png"
        href={`${siteUrl}/favicon/favicon-192x192.png`}
        sizes="192x192"
      />
      <link
        rel="icon"
        type="image/png"
        href={`${siteUrl}/favicon/favicon-160x160.png`}
        sizes="160x160"
      />
      <link
        rel="icon"
        type="image/png"
        href={`${siteUrl}/favicon/favicon-16x16.png`}
        sizes="16x16"
      />
      <link
        rel="icon"
        type="image/png"
        href={`${siteUrl}/favicon/favicon-32x32.png`}
        sizes="32x32"
      />
      <meta
        name="msapplication-TileImage"
        content={`${siteUrl}/favicon/mstile-144x144.png`}
      />
      <meta name="msapplication-TileColor" content={colors.black} />

      {/* OpenGraph tags */}
      <meta property="og:locale" content="en" />
      <meta property="og:site_name" content={title} />
      <meta
        property="og:image"
        content={`${siteUrl}/android-chrome-512x512.png`}
      />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />

      {/* Twitter Card tags */}
      <meta name="twitter:site" content={title} />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
};

export default SiteMetadata;
