import React from "react";
import Helmet from "react-helmet";
import styled, { css } from "styled-components";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { window } from "browser-monads";

import Page from "../components/page";
import Spacer from "../components/spacer";
import { Row } from "../components/taco";
import Text from "../components/text";
import { Link } from "../components/link";
import Icon from "../components/icon";

import Twitter from "./../svgs/twitter";
import { ListItem, OrderList, UnorderList } from "../components/list";
import { H1, H2, H3, H4, H5, H6 } from "../components/heading";
import colors from "../colors";
import font from "../fonts";

const PaddedH1 = styled(H1)`
  margin-top: 5.5rem;
  margin-bottom: 1rem;
`;

const PaddedH2 = styled(H2)`
  margin-top: 4.5rem;
  margin-bottom: 1rem;
`;

const PaddedH3 = styled(H3)`
  margin-top: 3.5rem;
  margin-bottom: 1rem;
`;

const PaddedH4 = styled(H4)`
  margin-top: 2.5rem;
  margin-bottom: 1rem;
`;

const PaddedH5 = styled(H5)`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const PaddedH6 = styled(H6)`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

const Content = styled(Text)`
  margin-bottom: 24px;
  display: block;

  a {
    display: inline;
  }
`;

const Line = css`
  opacity: 0.3;
  border: 1px dotted ${colors.grey};
`;

const Hr = styled.hr`
  border-top-width: 1px;
  border-bottom-width: 0;
  margin-top: 3em;
  margin-bottom: 3em;

  ${Line}
`;

const Image = styled.img`
  width: 100%;
  border-radius: 4px;
`;

const Blockquote = styled.blockquote`
  margin: 32px;
  position: relative;
  padding: 0px;

  margin-left: 24px;
  &:before {
    content: "";
    position: absolute;
    margin-left: -24px;

    height: 100%;
    ${Line}
  }

  & p {
    margin: 0;
    font-style: italic;
    font-weight: 500;
  }

  & > code {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
`;

const Small = styled(Text)`
  font-size: ${font.fontSizeN1};
`;

const TwitterShare = ({ title, href }) => {
  const urlToShare = `http://www.twitter.com/share?url=${href}&text=${title}: `;
  return (
    <div>
      <Row align="center" distribute="top" gap={1}>
        <Link to={urlToShare}>
          <Text tiny weight={500} color={colors.paleBlue}>
            Share on Twitter
          </Text>
          <Spacer left={1} />
          <Icon svg={Twitter} size={20} color={colors.paleBlue} />
        </Link>
      </Row>
    </div>
  );
};

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
      <Page title={post.frontmatter.title}>
        <Spacer bottom={2}>
          <MDXProvider
            components={{
              h1: PaddedH1,
              h2: PaddedH2,
              h3: PaddedH3,
              h4: PaddedH4,
              h5: PaddedH5,
              h6: PaddedH6,
              p: Content,
              a: Link,
              li: ListItem,
              ol: OrderList,
              ul: UnorderList,
              hr: Hr,
              blockquote: Blockquote,
              img: Image,
            }}
          >
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </Spacer>
        <Spacer top={2} bottom={2}>
          <Hr />
        </Spacer>
        <Text>
          <Text weight={500}>Thanks for reaching the end.</Text> Let me know if
          you have any feedback, correction or question. I'm always happy to
          chat.
        </Text>
        <Spacer top={2} />
        <TwitterShare
          title={post.frontmatter.title}
          href={window.location.href}
        />
        <Spacer top={2} bottom={2}>
          <Hr />
        </Spacer>
        <Spacer bottom={12}>
          <Small align="center">
            Made in Barcelona{" "}
            <Small align="center" weight={500}>
              · David Sancho ·
            </Small>{" "}
            {new Date().getFullYear()}
          </Small>
        </Spacer>
      </Page>
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
        date(formatString: "MMMM YYYY")
      }
    }
  }
`;
