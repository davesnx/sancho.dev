import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import { Frontmatter } from "../../lib/frontmatter";
import { getAllFrontmatter, getMdxBySlug } from "../../lib/mdx";

import { H1, H2, H3, H4, H5, H6 } from "../../components/heading";
import Icon from "../../components/icon";
import { NavigateText, TextLink } from "../../components/link";
import { ListItem, OrderList, UnorderList } from "../../components/list";
import Page from "../../components/page";
import MetaData from "../../components/site-metadata";
import Spacer from "../../components/spacer";
import Twitter from "../../components/svgs/twitter";
import { Row } from "../../components/taco";
import Text from "../../components/text";
import { rgb, rgba } from "../../theme/color";
import breakpoints from "../../theme/constants";
import font from "../../theme/fonts";
import { colors } from "../../theme/theme";

const PaddedH1 = styled(H1)`
  margin-top: 5rem;
  margin-bottom: 1rem;
`;

const PaddedH2 = styled(H2)`
  margin-top: 4rem;
  margin-bottom: 1rem;
`;

const PaddedH3 = styled(H3)`
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

const PaddedH4 = styled(H4)`
  margin-top: 2rem;
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

const Content = styled.p`
  font-family: ${font.sans};
  line-height: 1.7;
  color: ${rgba(colors.body, 0.9)};
  font-size: ${font.fontSize1};
  font-weight: 200;
  margin-bottom: 1rem;
  display: block;

  a {
    display: inline;
  }
`;

const Line = {
  horitzontal: css`
    background-color: ${rgb(colors.subtle)};
    opacity: 0.4;
    width: 100%;
    height: 2px;
  `,
  vertical: css`
    background-color: ${rgb(colors.subtle)};
    opacity: 0.4;
    width: 2px;
    height: 100%;
  `,
};

const Hr = styled.hr`
  border-top-width: 1px;
  border-style: none;
  border-bottom-width: 0;
  margin-top: 3em;
  margin-bottom: 3em;

  ${Line["horitzontal"]}
`;

const Img = styled.img`
  width: 100%;
  border-radius: 4px;
  margin: 0;
`;

const Oversized = styled.span`
  display: block;
  margin: 3rem -40px;

  @media screen and (max-width: ${breakpoints.mobile.width}px) {
    margin: 3rem 0;
  }
`;

const Pre = (props: any) => (
  <Oversized>
    <pre {...props} />
  </Oversized>
);

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 0;
  width: 100%;
  margin: 32px 0;
  font-family: "${font.sans}";
  color: ${rgba(colors.body, 0.9)};
  line-height: 1.7142857;
  margin-bottom: 2em;
  margin-top: 2em;
  table-layout: auto;
  text-align: left;

  td {
    border-color: ${rgba(colors.body, 0.3)};
    border-style: solid;
    border-bottom-width: 1px;
    border-top-width: 0px;
    border-left-width: 1px;
    border-right-width: 0px;
    padding: 0.75rem;
  }

  thead {
    border-bottom-width: 1px;
    border-style: solid;
  }

  th {
    background-color: ${rgba(colors.body, 0.1)};
    border-color: ${rgba(colors.body, 0.3)};
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-top-width: 1px;
    border-right-width: 0;
    border-style: solid;
    padding: 0.75rem;
    vertical-align: bottom;
  }

  td:last-child {
    border-color: ${rgba(colors.body, 0.3)};
    border-right-width: 1px;
  }

  th:first-of-type {
    border-top-left-radius: 0.375rem;
  }
  th:last-child {
    border-right-width: 1px;
    border-style: solid;
    border-top-right-radius: 0.375rem;
  }
  tr:last-child td:first-of-type {
    border-bottom-left-radius: 0.375rem;
  }
  tr:last-child td:last-child {
    border-bottom-right-radius: 0.375rem;
  }
`;

const Image = (props: any) => {
  return (
    <Oversized>
      <Img {...props} />
    </Oversized>
  );
};

const Blockquote = styled.blockquote`
  margin: 32px;
  position: relative;
  padding: 0px;

  margin-left: 24px;

  &:before {
    content: "";
    position: absolute;
    margin-left: -24px;

    ${Line["vertical"]}
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

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-arrow-left"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M5 12l14 0"></path>
    <path d="M5 12l6 6"></path>
    <path d="M5 12l6 -6"></path>
  </svg>
);

export const getStaticPaths: GetStaticPaths = () => {
  let frontmatters = getAllFrontmatter();
  const paths = frontmatters.map(({ slug }: Frontmatter) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.slug && !Array.isArray(params?.slug)) {
    let { frontmatter, code } = await getMdxBySlug(params.slug);

    return {
      props: {
        frontmatter,
        code,
      },
    };
  }

  return {
    props: {
      frontmatter: null,
      code: null,
    },
  };
};

let LeftFloating = styled.div`
  position: absolute;
  right: 100%;
  margin-right: 8rem;

  @media screen and (max-width: ${breakpoints.mobile.width}px) {
    display: none;
  }
`;

let FloatingPoint = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

let Post = ({
  frontmatter,
  code,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  let Component = getMDXComponent(code);

  return (
    <>
      <MetaData
        title={frontmatter.title}
        description={frontmatter.description}
        schemaType="article"
        createdAt={frontmatter.publishedAt}
      />
      <Page
        title={
          <Spacer bottom={6}>
            <FloatingPoint>
              <H1>{frontmatter.title}</H1>
              <LeftFloating>
                <NavigateText color={colors.subtle} href="/blog">
                  <Row align="center" gap={0.5}>
                    <BackIcon />{" "}
                    <Text
                      color={colors.subtle}
                      weight={500}
                      size={font.fontSize2}
                    >
                      {"Blog"}
                    </Text>
                  </Row>
                </NavigateText>
              </LeftFloating>
            </FloatingPoint>
          </Spacer>
        }
      >
        <Component
          components={{
            h1: PaddedH1,
            h2: PaddedH2,
            h3: PaddedH3,
            h4: PaddedH4,
            h5: PaddedH5,
            h6: PaddedH6,
            p: Content,
            a: TextLink,
            li: ListItem,
            ol: OrderList,
            ul: UnorderList,
            hr: Hr,
            blockquote: Blockquote,
            img: Image,
            pre: Pre,
            table: Table,
          }}
        />

        <Spacer top={4} bottom={2}>
          <Hr />
        </Spacer>
        <Text>
          <strong>Thanks for reaching the end.</strong> Let me know if you have
          any feedback, corrections or questions. Always happy to chat.
        </Text>
        <Spacer top={2} />
      </Page>
    </>
  );
};

export default Post;
