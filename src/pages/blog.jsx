import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Link as Navigate, graphql } from "gatsby";

import Text from "../components/text";
import Page from "../components/page";
import Spacer from "../components/spacer";
import { H3 } from "../components/heading";
import font from "../components/fonts";
import { isMobile } from "../utils/helpers";

const BlogLink = styled(Navigate)`
  color: inherit;
  text-decoration: none;

  display: flex;
  justify-content: space-between;

  ${isMobile() ? "flex-direction: column-reverse" : ""};
  align-items: ${isMobile() ? "left" : "center"};
`;

const Date = styled(Text)`
  font-size: ${font.fontSizeN1};
  font-weight: bold;
  opacity: 0.35;
  text-transform: uppercase;
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

      <Page title="Thoughts">
        {data.allMdx.edges.map(({ node }) => (
          <Spacer bottom={3} key={node.id}>
            <Date align="left">{node.frontmatter.date}</Date>
            <BlogLink to={node.fields.slug}>
              <H3> {node.frontmatter.title}</H3>
            </BlogLink>
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
            date(formatString: "MMMM YYYY")
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
