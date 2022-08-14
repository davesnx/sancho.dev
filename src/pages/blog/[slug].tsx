import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { window } from "browser-monads-ts";
import { parseISO, format } from "date-fns";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticProps, InferGetStaticPropsType } from "next";

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
import { Stack } from "../../components/taco";
import Text from "../../components/text";
import { rgb } from "../../theme/color";
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

const Content = styled(Text)`
  margin-bottom: 24px;
  display: block;

  a {
    display: inline;
  }
`;

const Line = {
  horitzontal: css`
    opacity: 0.4;
    background-color: ${rgb(colors.subtle)};
    width: 100%;
    height: 2px;
  `,
  vertical: css`
    opacity: 0.4;
    width: 2px;
    height: 100%;
    background-color: ${rgb(colors.subtle)};
  `,
};

const Hr = styled.hr`
  border-top-width: 1px;
  border-bottom-width: 0;
  margin-top: 3em;
  margin-bottom: 3em;

  ${Line["horitzontal"]}
`;

const Image = styled.img`
  width: 100%;
  border-radius: 4px;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
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

const Inline = styled.div`
  display: inline-flex;
`;

const TwitterShare = ({ title, href }) => {
  let urlToShare = `http://www.twitter.com/share?url=${href}&text=${title}: `;
  return (
    <span>
      <Spacer right={0.5} inline={true}>
        <Text>If you like it enough, consider to </Text>{" "}
      </Spacer>
      <TextLink color={colors.twitter} href={urlToShare}>
        <Inline>
          <Text tiny weight={500} color={colors.primary}>
            share it on Twitter
          </Text>
          <Spacer left={0.5} />
          <Icon svg={Twitter} size={20} color={colors.primary} />
        </Inline>
      </TextLink>
    </span>
  );
};

/* export const getStaticPaths = () => {
  let frontmatters = getAllFrontmatter();

  console.log(frontmatters.map(({ slug }: Frontmatter) => ({ params: { slug } })))
  return {
    paths: frontmatters.map(({ slug }: Frontmatter) => ({ params: { slug: "blog/" + slug } })),
    fallback: false,
  };
}; */

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params?.slug && !Array.isArray(context.params?.slug)) {
    let { frontmatter, code } = await getMdxBySlug(context.params.slug);

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
      />
      <Page
        title={
          <Stack align="left" gap={1}>
            <Spacer bottom={3}>
              <NavigateText href="/blog">Back</NavigateText>
            </Spacer>
            <H1>{frontmatter.title}</H1>
            <Text weight={400} color={colors.subtle} size={font.fontSizeN1}>
              {format(parseISO(frontmatter.publishedAt), "MMMM yyyy")}
            </Text>
          </Stack>
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
            a: ({ href, ...rest }) => <TextLink href={href} {...rest} />,
            li: ListItem,
            ol: OrderList,
            ul: UnorderList,
            hr: Hr,
            blockquote: Blockquote,
            img: Image,
          }}
        />

        <Spacer top={4} bottom={2}>
          <Hr />
        </Spacer>
        <Text>
          <strong>Thanks for reaching the end.</strong> Let me know if you have
          any feedback, correction or question. Always happy to chat.
        </Text>
        <Spacer top={2} />
        <TwitterShare title={frontmatter.title} href={window.location.href} />
        <Spacer bottom={10} />
      </Page>
    </>
  );
};

export default Post;
