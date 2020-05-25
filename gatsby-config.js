module.exports = {
  siteMetadata: {
    siteUrl: `https://sancho.dev`,
    title: `David Sancho`,
    twitter: `@davesnx`,
    description:
      "Software Engineer." +
      "Passionate about design, functional programming, scalability, people and business.",
  },
  plugins: [
    { resolve: `gatsby-plugin-styled-components`, options: {} },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `David Sancho`,
        short_name: `davesnx`,
        start_url: `/`,
        background_color: `#F6F6F6`,
        theme_color: `#F6F6F6`,
        display: `standalone`,
        /* icons: [
          {
            src: `${__dirname}/static/favicon/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `${__dirname}/static/favicon/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ], */
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `src`, path: `${__dirname}/src/` },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-45029133-1",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
  ],
};
