import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Spacer from "../components/spacer";
import Text from "../components/text";
import Main from "../components/main";
import { formatReadingTime } from "../utils/helpers";

const BlogLink = styled(Link)`
  color: inherit;
  text-decoration: none;
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

      <Layout>
        <Spacer top={20}>
          <Main>
            <h1>Thoughts</h1>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <div key={node.id}>
                <BlogLink to={node.fields.slug}>
                  <h3>{node.frontmatter.title}</h3>
                </BlogLink>
                <Text>
                  <Spacer top={1}>
                    <em>{`${node.frontmatter.date} • ${formatReadingTime(
                      node.timeToRead
                    )}`}</em>
                  </Spacer>
                </Text>
                <Text>{node.excerpt}</Text>
              </div>
            ))}
          </Main>
        </Spacer>
      </Layout>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
