import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Link as Navigate, graphql } from "gatsby";

import Text from "../components/text";
import Page from "../components/page";
import Spacer from "../components/spacer";
import { H1, H3 } from "../components/heading";
import { isMobile } from "react-device-detect";

const BlogLink = styled(Navigate)`
  color: inherit;
  text-decoration: none;

  display: flex;
  justify-content: space-between;

  ${isMobile ? "flex-direction: column-reverse" : ""};
  align-items: ${isMobile ? "left" : "center"};
`;

const Title = () => {
  return (
    <div>
      <H1 raw>Thoughts</H1>
      <Text>Here is where I will collect some ideas about Software</Text>
    </div>
  );
};

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

      <Page title={<Title />}>
        {data.allMdx.edges.map(({ node }) => (
          <Spacer bottom={3} key={node.id}>
            <BlogLink to={node.fields.slug}>
              <H3 raw>{node.frontmatter.title}</H3>
              <Text raw>{node.frontmatter.date}</Text>
            </BlogLink>
            <Text>{node.excerpt}</Text>
          </Spacer>
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
