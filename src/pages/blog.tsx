import React from "react";
import styled from "@emotion/styled";

import { format, parseISO } from "date-fns";
import type { GetStaticProps } from "next";

import MetaData from "../components/site-metadata";
import type { Frontmatter } from "../lib/frontmatter";
import { getAllFrontmatter } from "../lib/mdx";

import { H1, H3 } from "../components/heading";
import { NavigateButton } from "../components/link";
import Page from "../components/page";
import { HideOnDesktop, HideOnMobile, Row, Stack } from "../components/taco";
import Text from "../components/text";
import constants from "../theme/constants";
import font from "../theme/fonts";
import { colors } from "../theme/theme";

export const getStaticProps: GetStaticProps = async () => {
  const frontmatters = getAllFrontmatter();
  const sortedFrontmatters = frontmatters.sort((a: Frontmatter, b: Frontmatter) =>
    b.publishedAt && a.publishedAt
      ? Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
      : 0
  );
  return { props: { frontmatters: sortedFrontmatters } };
};

const PostTitle = styled(H3)`
  transition: color 0.2s ease-out;
  color: ${colors.primary80};

  width: 100%;
  text-align: left;

  &:hover {
    color: ${colors.primary};
  }
`;

const PostLink = styled(NavigateButton)`
  width: 100%;

  &:hover {
    ${PostTitle} {
      color: ${colors.primary};
    }
  }
`;

const PostDescription = styled.div`
  width: 80%;

  @media screen and (max-width: ${constants.mobile.width}px) {
    width: 100%;
  }
`;

const PostDate = styled.div`
  flex-shrink: 0;
`;

const PublishedAt = ({date}: {date: string}) => (
  <Text
    kerning="0.05rem"
    size={font.fontSizeN1}
    color={colors.body50}
    weight={600}
    monospace
  >
    {format(
      parseISO(date),
      "MMM yyyy"
    ).toUpperCase()}
  </Text>
);

const Blog = ({ frontmatters }: { frontmatters: Array<Frontmatter> }) => {
  return (
    <>
      <MetaData title="Blog" />
      <Page title={<H1>Blog</H1>}>
        <Stack gap={6} align="left" fullWidth>
          {frontmatters
            .filter((frontmatters: Frontmatter) => {
              return frontmatters.isDraft !== true;
            })
            .map((frontmatter: Frontmatter) => (
              <PostLink
                key={frontmatter.title}
                href={"/blog/" + frontmatter.slug}
              >
                <Stack fullWidth align="left">
                  <Row distribute="between" fullWidth reverseOnMobile>
                    <PostTitle> {frontmatter.title}</PostTitle>
                  </Row>
                  {frontmatter.description ? (
                    <PostDescription>
                      <Text color={colors.body50} size={font.fontSize1}>
                        {frontmatter.description}
                      </Text>
                    </PostDescription>
                  ) : null}
                </Stack>
              </PostLink>
            ))}
        </Stack>
      </Page>
    </>
  );
};

export default Blog;
