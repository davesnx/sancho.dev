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
import * as Heading from "../../components/heading";
import { TextLink } from "../../components/link";
import { ListItem, OrderList, UnorderList } from "../../components/list";
import Page from "../../components/page";
import MetaData from "../../components/site-metadata";
import Spacer from "../../components/spacer";
import Text from "../../components/text";
import { ZoomableImage } from "../../components/zoomable-image";
import breakpoints from "../../theme/constants";
import fonts from "../../theme/fonts";
import { colors } from "../../theme/theme";

/* Inline code styling */
const BlogContent = styled.div`
  *:not(pre) > code {
    font-family: ${fonts.mono};
    white-space: normal;
    border-radius: 4px;
    padding: 3px 6px;
    margin: 0px 2px;
    color: ${colors.body};
    background: ${colors.contrastCodeBackground30};
  }

  p > code:first-of-type {
    margin-left: 0;
  }

  /* Shiki dual-theme: map CSS variables to color property based on site theme */
  code[data-theme*=" "] span {
    color: var(--shiki-dark);
    font-style: var(--shiki-dark-font-style);
    font-weight: var(--shiki-dark-font-weight);
    text-decoration: var(--shiki-dark-text-decoration);
  }

  html[data-theme="light"] & code[data-theme*=" "] span {
    color: var(--shiki-light);
    font-style: var(--shiki-light-font-style);
    font-weight: var(--shiki-light-font-weight);
    text-decoration: var(--shiki-light-text-decoration);
  }
`;

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

const HeadingContent = styled.span`
  position: relative;
  display: inline;
`;

const AnchorLink = styled.a`
  position: absolute;
  right: calc(100% + 1rem);
  top: 0;
  color: ${colors.contrastCodeBackground80};
  text-decoration: none;
  font-family: ${fonts.mono};
  font-weight: 800;
  line-height: inherit;
  white-space: nowrap;

  &:hover {
    color: ${colors.contrastCodeBackground};
  }

  @media screen and (max-width: ${breakpoints.mobile.width}px) {
    display: none;
  }
`;

const scrollOffsetTop = "5rem";

const StyledH1 = styled(Heading.H1)`
  margin-top: 5rem;
  margin-bottom: 1rem;
  scroll-margin-top: ${scrollOffsetTop};
`;

const StyledH2 = styled(Heading.H2)`
  margin-top: 4rem;
  margin-bottom: 1rem;
  scroll-margin-top: ${scrollOffsetTop};
`;

const StyledH3 = styled(Heading.H3)`
  margin-top: 3rem;
  margin-bottom: 1rem;
  scroll-margin-top: ${scrollOffsetTop};
`;

const StyledH4 = styled(Heading.H4)`
  margin-top: 2rem;
  margin-bottom: 1rem;
  scroll-margin-top: ${scrollOffsetTop};
`;

const StyledH5 = styled(Heading.H5)`
  margin-top: 2rem;
  margin-bottom: 1rem;
  scroll-margin-top: ${scrollOffsetTop};
`;

const StyledH6 = styled(Heading.H6)`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  scroll-margin-top: ${scrollOffsetTop};
`;

const createHeadingWithAnchor = (
  HeadingComponent: typeof StyledH1,
  symbol: string
) => {
  const HeadingWithAnchor = ({ id, children, ...props }: any) => (
    <HeadingComponent id={id} {...props}>
      <HeadingContent>
        {id && (
          <AnchorLink href={`#${id}`} aria-label={`Link to ${children}`}>
            {symbol}
          </AnchorLink>
        )}
        {children}
      </HeadingContent>
    </HeadingComponent>
  );
  return HeadingWithAnchor;
};

const H1 = createHeadingWithAnchor(StyledH1, "#");
const H2 = createHeadingWithAnchor(StyledH2, "#");
const H3 = createHeadingWithAnchor(StyledH3, "#");
const H4 = createHeadingWithAnchor(StyledH4, "#");
const H5 = createHeadingWithAnchor(StyledH5, "#");
const H6 = createHeadingWithAnchor(StyledH6, "#");

const Content = styled.p`
  font-family: ${fonts.sans};
  line-height: 1.85rem;
  color: ${colors.body90};
  font-size: ${fonts.fontSize1};
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

const Oversized = styled.span`
  display: block;
  margin: 1rem 0 3rem 0;
`;

const ImageCaption = styled.div`
  margin-top: 0.25rem;
  text-align: left;
  font-family: ${fonts.sans};
  font-size: ${fonts.fontSizeN1};
  color: ${colors.body50};
  font-style: italic;
`;

const Pre = styled.pre`
  display: block;
  margin: 1rem 0 3rem 0;

  display: grid;
  overflow: auto;
  position: relative;
  padding: 2rem;
  border-radius: 6px;
  margin: 0;
  background: ${colors.codeBackground};

  font-family: ${fonts.mono};
  font-weight: 400;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  tab-size: 4;
  hyphens: none;
`

const Code = styled.code`
  font-family: ${fonts.mono};
  font-weight: 400;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  tab-size: 4;
  hyphens: none;
`

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 0;
  overflow-x: auto;
  max-width: 100%;
  display: inline-block;
  width: 100%;
  margin: 32px 0;
  font-family: ${fonts.sans};
  color: ${colors.body90};
  line-height: 1.7142857;
  margin-bottom: 2em;
  margin-top: 2em;
  table-layout: auto;
  text-align: left;

  td {
    border-color: ${colors.body10};
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
    background-color: ${colors.codeBackground};
    border-color: ${colors.body10};
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-top-width: 1px;
    border-right-width: 0;
    border-style: solid;
    padding: 0.75rem;
    vertical-align: bottom;
  }

  td:last-child {
    border-color: ${colors.body10};
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
  const { alt, ...imageProps } = props;
  return (
    <Oversized>
      <ZoomableImage {...imageProps} alt={alt} />
      {alt && <ImageCaption>{alt}</ImageCaption>}
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
  return <Text as="strong" weight={600} color={colors.primary} {...props} />;
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
        slug={frontmatter.slug}
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
                size={fonts.fontSizeN2}
                weight={600}
                monospace
              >
                {format(
                  parseISO(frontmatter.publishedAt),
                  "MMM yyyy"
                ).toUpperCase()}
              </Text>
              <Text color={colors.body30} size={fonts.fontSize0} weight={400} monospace>
                {" • "}
              </Text>
              <Text kerning="0.05rem" weight={600} size={fonts.fontSizeN2} monospace>
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

              {frontmatter.readingTime && (
                <>
                  <Text color={colors.body30} size={fonts.fontSize0} weight={400} monospace>
                    {" • "}
                  </Text>
                  <Text
                    kerning="0.05rem"
                    color={colors.body50}
                    size={fonts.fontSizeN2}
                    weight={600}
                    monospace
                  >
                    {`${Math.floor(frontmatter.readingTime.minutes)} MINUTES`}
                  </Text>
                </>
              )}
            </Row>
          </>
        }
      >
        <BlogContent>
          <Component
            components={{
              strong: Strong,
              h1: H1,
              h2: H2,
              h3: H3,
              h4: H4,
              h5: H5,
              h6: H6,
              p: Content,
              a: A,
              li: Li,
              ol: OrderList,
              ul: UnorderList,
              hr: Hr,
              blockquote: Blockquote,
              img: Image,
              pre: Pre,
              code: Code,
              table: Table,
            }}
          />
        </BlogContent>

        {frontmatter.slug !== "hello" && (
          <>
            <Spacer top={10} bottom={4}>
              <ThanksContainer>
                <Row columnOnMobile distribute="between" align="center" wrap="wrap" gap={2}>
                  <div style={{ flex: 1, minWidth: "280px" }}>
                    <Text>
                      <Strong>Thanks for reading!</Strong> If something's unclear or you think I'm wrong, tell me. Feedback is appreciated.
                    </Text>
                  </div>
                  <TwitterButton
                    href="https://twitter.com/davesnx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter fill={colors.body} size={20} />
                    <Text monospace>@davesnx</Text>
                  </TwitterButton>
                </Row>
              </ThanksContainer>
            </Spacer>
          </>
        )}
      </Page>
    </>
  );
}
