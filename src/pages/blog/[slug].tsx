import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { format, parseISO } from "date-fns";
import { getMDXComponent } from "mdx-bundler/client";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import type { Frontmatter } from "../../lib/frontmatter";
import { getAllFrontmatter, getMdxBySlug } from "../../lib/mdx";
import Twitter from "../../components/svgs/twitter";
import { Row } from "../../components/taco";
import { H1, H2, H3, H4, H5, H6 } from "../../components/heading";
import { TextLink } from "../../components/link";
import { ListItem, OrderList, UnorderList } from "../../components/list";
import Page from "../../components/page";
import MetaData from "../../components/site-metadata";
import Spacer from "../../components/spacer";
import Text from "../../components/text";
import { ZoomableImage } from "../../components/zoomable-image";
import breakpoints from "../../theme/constants";
import font from "../../theme/fonts";
import { colors } from "../../theme/theme";

const ThanksContainer = styled.div`
  background-color: ${colors.codeBackground};
  padding: 2rem;
  border-radius: 8px;
`;

const TwitterButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${colors.overlay};
  color: ${colors.body};
  padding: 10px 16px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 150ms ease-in-out;
  font-size: 14px;

  &:hover {
    background-color: ${colors.contrastCodeBackground80};
  }

  &:active {
    background-color: ${colors.contrastCodeBackground80};
  }
`;

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
  line-height: 1.85rem;
  color: ${colors.body90};
  font-size: ${font.fontSize1};
  font-weight: 400;
  margin-bottom: 1.2rem;
  display: block;

  a {
    display: inline;
  }
`;

const Line = {
  horitzontal: css`
    background-color: ${colors.body10};
    width: 100%;
    height: 2px;
  `,
  vertical: css`
    background-color: ${colors.body10};
    width: 2px;
    height: 100%;
  `,
};

const Hr = styled.hr`
  border-top-width: 2px;
  border-style: none;
  border-bottom-width: 0;
  margin-top: 2em;
  margin-bottom: 1.5em;
  width: 100%;
  padding: 0px 2rem;

  ${Line["horitzontal"]}
`;

const Img = styled.img`
  width: 100%;
  border-radius: 6px;
  margin: 0;
`;

const Oversized = styled.span`
  display: block;
  margin: 1rem 0 3rem 0;
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
  color: ${colors.body90};
  line-height: 1.7142857;
  margin-bottom: 2em;
  margin-top: 2em;
  table-layout: auto;
  text-align: left;

  td {
    border-color: ${colors.body30};
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
    background-color: ${colors.body10};
    border-color: ${colors.body30};
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-top-width: 1px;
    border-right-width: 0;
    border-style: solid;
    padding: 0.75rem;
    vertical-align: bottom;
  }

  td:last-child {
    border-color: ${colors.body30};
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
      <ZoomableImage {...props} />
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
    background-color: ${colors.grey} !important;
  }
`;

// Override margins for oversized code blocks inside lists
const Li = styled(ListItem)`
  & ${Oversized} {
    margin: 0 !important;
    margin-bottom: 2em !important;
  }
`;

const PageTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.65rem;

  margin-left: -6rem;
  margin-right: -6rem;
  max-width: 150%;

  @media screen and (max-width: calc(${breakpoints.desktop.width}px + 32px)) {
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`;

const BlogPostTitle = styled(H1)`
  font-size: 3rem;
  text-align: center;
  width: 100%;
  line-height: 1.4;
  color: ${colors.primary90};

  @media screen and (max-width: ${breakpoints.mobile.width}px) {
    font-size: 2rem;
  }
`;

const A = (props: any) => {
  return (
    <TextLink
      {...props}
      weight={500}
      color={colors.body}
      hoverColor={colors.primary}
    />
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const frontmatters = getAllFrontmatter();
  const paths = frontmatters.map(({ slug }: Frontmatter) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

const Strong = (props: any) => {
  return <Text as="strong" weight={400} color={colors.primary} {...props} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.slug && !Array.isArray(params?.slug)) {
    const { frontmatter, code } = await getMdxBySlug(params.slug);

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

export default function Post({
  frontmatter,
  code,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = getMDXComponent(code);

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
          <>
            <PageTitle>
              <BlogPostTitle>{frontmatter.title}</BlogPostTitle>
            </PageTitle>
            <Spacer bottom={2} />
            <Row gap={2}>
              <Text
                kerning="0.05rem"
                color={colors.body50}
                size={font.fontSizeN2}
                weight={600}
                monospace
              >
                {format(
                  parseISO(frontmatter.publishedAt),
                  "MMM yyyy"
                ).toUpperCase()}
              </Text>
              <Text color={colors.body30} size={font.fontSize0} weight={400} monospace>
                {" • ".toUpperCase()}
              </Text>
              <Text kerning="0.05rem" weight={600} size={font.fontSizeN2} monospace>
                <TextLink
                  weight={600}
                  color={colors.body50}
                  hoverColor={colors.body80}
                  decorationColor="transparent"
                  href="/about"
                  monospace
                >
                  {`davesnx`.toUpperCase()}
                </TextLink>
              </Text>
            </Row>
          </>
        }
      >
        <Component
          components={{
            strong: Strong,
            h1: PaddedH1,
            h2: PaddedH2,
            h3: PaddedH3,
            h4: PaddedH4,
            h5: PaddedH5,
            h6: PaddedH6,
            p: Content,
            a: A,
            li: Li,
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
        <ThanksContainer>
          <Row distribute="between" align="center" wrap="wrap" gap={2}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <Text>
                <Strong>Thanks for reading!</Strong> Let me know if you have
                feedback or questions, and follow me on 𝕏 (Twitter) for updates.
              </Text>
            </div>
            <TwitterButton
              href="https://twitter.com/davesnx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter fill={colors.body} size={20} />
              <Text>Follow me </Text>
            </TwitterButton>
          </Row>
        </ThanksContainer>
        <Spacer top={2} />
      </Page>
    </>
  );
}
