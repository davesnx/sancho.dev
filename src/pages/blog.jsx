import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Spacer from "../components/spacer";
import Text from "../components/text";
import Main from "../components/main";
import PostInfo from "../components/info";
import { H3, H2 } from "../components/heading";

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
            <H2>Thoughts</H2>
            <Spacer top={4}>
              {data.allMdx.edges.map(({ node }) => (
                <div key={node.id}>
                  <BlogLink to={node.fields.slug}>
                    <H3>{node.frontmatter.title}</H3>
                  </BlogLink>
                  <Spacer bottom={1} top={1}>
                    <PostInfo
                      date={node.frontmatter.date}
                      timeToRead={node.timeToRead}
                    />
                  </Spacer>
                  <Text>{node.excerpt}</Text>
                </div>
              ))}
            </Spacer>
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
