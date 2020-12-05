import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import Page from "../components/page";
import Spacer from "../components/spacer";
import Text from "../components/text";
import Link from "../components/link";
import Icon from "../components/icon";

import Twitter from "./../svgs/twitter";
import { ListItem, OrderList, UnorderList } from "../components/list";
import { H1, H2, H3, H4, H5, H6 } from "../components/heading";
import colors from "../components/colors";
import fonts from "../components/fonts";

const Hr = styled.span`
  display: block;
  width: 100%;
  opacity: 0.3;
  height: 2px;
  background-color: ${colors.grey};
`;

const Image = styled.img`
  width: 100%;
  border-radius: 4px;
`;

const Blockquote = styled.blockquote`
  font-style: italic;
  padding: 16px 24px;
  margin: 0px;

  &:before {
    content: ">";
    font-style: normal;
    font-family: ${fonts.mono};
    position: absolute;
    margin-left: -24px;

    font-size: 18px;
    line-height: 1.8;
    color: ${colors.black};
    opacity: 0.9;
    font-weight: 700;
  }

  & p {
    margin: 0;
  }

  & > code {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
`;

const Align = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const Stack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TwitterShare = ({ title, href }) => {
  const urlToShare = `http://www.twitter.com/share?url=${href}&text=${title}: `;
  return (
    <Link href={urlToShare}>
      <Align>
        <Stack>
          <Text tiny raw color={colors.paleBlue}>
            Share on Twitter
          </Text>
          <Spacer left={1} />
          <Icon svg={Twitter} size={20} color={colors.paleBlue} />
        </Stack>
      </Align>
    </Link>
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
      <Page title={<H1 raw>{post.frontmatter.title}</H1>}>
        <Spacer bottom={2}>
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
              ul: UnorderList,
              hr: Hr,
              blockquote: Blockquote,
              img: Image,
            }}
          >
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </Spacer>
        <Spacer top={4} bottom={4}>
          <Hr />
        </Spacer>
        <Text>
          Thanks for reaching the end, If you have any question, correction or
          comment let me know!
        </Text>
        <TwitterShare
          title={post.frontmatter.title}
          href={window && window.location.href}
        />
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
