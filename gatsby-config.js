module.exports = {
  siteMetadata: {
    siteUrl: `https://sancho.dev`,
    title: `David Sancho`,
    twitter: `@davesnx`,
    description:
      "Hello, I'm the Reason fanboy near to you. Fighting for a better status quo" +
      "Passionate about design, functional programming, scalability, people and business.",
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `src`, path: `${__dirname}/src/` },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-auto-headers`,
          `gatsby-remark-prismjs`,
          {
            resolve: "gatsby-remark-external-links",
            options: {
              rel: "noopener noreferrer",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
  ],
};
