import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Link as Navigate, graphql } from "gatsby";

import Text from "./../components/text";
import Page from "./../components/page";
import { H1, H3 } from "./../components/heading";

const BlogLink = styled(Navigate)`
  color: inherit;
  text-decoration: none;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default ({ data }) => {
  const {
    site: {
      siteMetadata: { siteUrl, description, title },
    },
  } = data;

  return (
    <>
      <Helmet defaultTitle={title} titleTemplate={`%s | ${title}`}>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Page title={<H1 raw>Thoughts</H1>}>
        {data.allMdx.edges.map(({ node }) => (
          <div key={node.id}>
            <BlogLink to={node.fields.slug}>
              <H3 raw>{node.frontmatter.title}</H3>
              <Text raw>{node.frontmatter.date}</Text>
            </BlogLink>
            <Text>{node.excerpt}</Text>
          </div>
        ))}
      </Page>
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          timeToRead
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
