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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "sancho.dev",
        short_name: "sancho.dev",
        start_url: "/",
        background_color: "#FFFFFF",
        theme_color: "#233044",
        display: `standalone`,
        icon: `static/favicon/android-chrome-512x512.png`,
      },
    },
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
      resolve: `gatsby-plugin-splitbee`,
      options: {
        includeInDevelopment: false,
        delayTimeout: 0,
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
      resolve: "gatsby-plugin-sharp",
      options: {
        base64Width: 30,
        stripMetadata: true,
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
              maxWidth: 836,
              linkImagesToOriginal: false,
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
    `gatsby-plugin-styled-components`,
  ],
};
