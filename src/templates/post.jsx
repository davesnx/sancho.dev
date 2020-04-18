import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import Layout from "../components/layout";
import Main from "../components/main";
import Spacer from "../components/spacer";
import Footer from "../components/footer";
import Text from "../components/text";
import Link from "../components/link";
import { ListItem, OrderList } from "../components/list";
import { H1, H2, H3, H4, H5, H6 } from "../components/heading";
import colors from "../components/colors";

const Hr = styled.hr`
  width: 100%;
  opacity: 0.1;
`;

const Blockquote = styled.blockquote`
  font-style: italic;
  background: ${colors.fadedBlack};
  padding: 16px 32px;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: -32px;
  margin-right: -32px;

  & p {
    margin: 0;
  }
`;

export default ({ data }) => {
  const post = data.mdx;
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
            <H1 raw>{post.frontmatter.title}</H1>
            {post.frontmatter.subtitle && (
              <H2 raw>{post.frontmatter.subtitle}</H2>
            )}
            <Spacer bottom={6} top={3}>
              <MDXProvider
                components={{
                  h1: H1,
                  h2: H2,
                  h3: H3,
                  h4: H4,
                  h5: H5,
                  h6: H6,
                  p: Text,
                  a: Link,
                  li: ListItem,
                  ol: OrderList,
                  hr: Hr,
                  blockquote: Blockquote,
                }}
              >
                <MDXRenderer>{post.body}</MDXRenderer>
              </MDXProvider>
            </Spacer>
            <Footer date={post.frontmatter.date} timeToRead={post.timeToRead} />
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
    mdx(fields: { slug: { eq: $slug } }) {
      body
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
