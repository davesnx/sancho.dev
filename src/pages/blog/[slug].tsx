import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { format, parseISO } from "date-fns";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import { Frontmatter } from "../../lib/frontmatter";
import { getAllFrontmatter, getMdxBySlug } from "../../lib/mdx";

import { H1, H2, H3, H4, H5, H6 } from "../../components/heading";
import { TextLink } from "../../components/link";
import { ListItem, OrderList, UnorderList } from "../../components/list";
import Page from "../../components/page";
import MetaData from "../../components/site-metadata";
import Spacer from "../../components/spacer";
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
  border-radius: 6px;
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

// Override margins for oversized code blocks inside lists
const Li = styled(ListItem)`
  & ${Oversized} {
    margin: 0 !important;
    margin-bottom: 2em !important;
  }
`;

const PageTitle = styled.div`
  display: flex;
  margin: 8rem -3rem;
  margin-top: 0px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: ${breakpoints.desktop.width}px) {
    margin: 8rem 0;
    margin-top: 0px;
  }
  @media screen and (max-width: ${breakpoints.mobile.width}px) {
    margin: 3rem 0;
    margin-top: 0px;
  }
`;

const BlogPostTitle = styled(H1)`
  font-size: 3.5rem;
  text-align: center;
  line-height: 1.2;
  color: ${rgb(colors.primary)};

  @media screen and (max-width: ${breakpoints.mobile.width}px) {
    font-size: 2rem;
  }
`;

const A = (props: any) => {
  return <TextLink {...props} color={colors.body} hoverColor={colors.primary} />;
};

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

let Strong = (props: any) => {
  return <Text as="strong" weight={400} color={colors.primary} {...props} />;
};

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
          <PageTitle>
            <BlogPostTitle>{frontmatter.title}</BlogPostTitle>
            <Text weight={400} color={colors.subtle} size={font.fontSize1}>
              {format(parseISO(frontmatter.publishedAt), "MMMM yyyy")}
            </Text>
          </PageTitle>
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
        <Text>
          <Strong>Thanks for reaching the end</Strong>. Let me know if you have
          any feedback, corrections or questions. Always happy to chat about any topic mentioned in this post, feel free to reach out.
        </Text>
        <Spacer top={2} />
      </Page>
    </>
  );
};

export default Post;
