import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Main from "../components/main";
import Spacer from "../components/spacer";
import PostInfo from "../components/info";
import { H1, H2 } from "../components/heading";

export default ({ data }) => {
  const post = data.markdownRemark;
  const url = post.fields.slug
    ? `${data.site.siteMetadata.siteUrl}${post.fields.slug}`
    : data.site.siteMetadata.siteUrl;

  return (
    <>
      <Helmet title={post.frontmatter.title}>
        {/* OpenGraph tags */}
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.frontmatter.subtitle} />
        <meta property="og:image" content={post.frontmatter.imghero} />
        {/* Twitter Card tags */}
        <meta name="twitter:title" content={post.frontmatter.title} />
        <meta name="twitter:description" content={post.frontmatter.subtitle} />
        <meta name="twitter:image" content={post.frontmatter.imghero} />
      </Helmet>
      <Layout>
        <Spacer top={20}>
          <Main>
            <div>
              <H1>{post.frontmatter.title}</H1>
              {post.frontmatter.subtitle && (
                <H2>{post.frontmatter.subtitle}</H2>
              )}
              <PostInfo
                date={post.frontmatter.date}
                timeToRead={post.timeToRead}
              />
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
          </Main>
        </Spacer>
      </Layout>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
        imghero
      }
    }
  }
`;
