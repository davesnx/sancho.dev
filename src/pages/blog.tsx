import React from "react";
import styled from "@emotion/styled";

import type { GetStaticProps } from "next";

import MetaData from "../components/site-metadata";
import type { Frontmatter } from "../lib/frontmatter";
import { getAllFrontmatter } from "../lib/mdx";
import Spacer from "../components/spacer";
import { H1, H3 } from "../components/heading";
import { NavigateButton } from "../components/link";
import Page from "../components/page";
import { Row, Stack } from "../components/taco";
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
`;

const PostDescription = styled.div`
  width: 80%;

  @media screen and (max-width: ${constants.mobile.width}px) {
    width: 100%;
  }
`;

const YearSection = styled.div`
  position: relative;
  width: 100%;
`;

const YearHeader = styled.h2`
  position: absolute;
  right: calc(100% + 120px);
  top: 0px;
  line-height: 1.3;
  padding: 0;
  font-family: ${font.mono};
  font-size: ${font.fontSize3};
  font-weight: 600;
  color: ${colors.body10};
  margin: 0;
  user-select: none;
`;

type PostsByYear = { [year: string]: Frontmatter[] };

const groupByYear = (frontmatters: Frontmatter[]): PostsByYear => {
  return frontmatters.reduce((acc: PostsByYear, frontmatter) => {
    const year = frontmatter.publishedAt
      ? new Date(frontmatter.publishedAt).getFullYear().toString()
      : "Unknown";
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(frontmatter);
    return acc;
  }, {});
};

const Blog = ({ frontmatters }: { frontmatters: Array<Frontmatter> }) => {
  const publishedPosts = frontmatters.filter(
    (frontmatter: Frontmatter) => frontmatter.isDraft !== true
  );
  const postsByYear = groupByYear(publishedPosts);
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <MetaData title="Blog" />
      <Page title={<H1>Blog</H1>}>
        <Spacer bottom={4}>
          <Text color={colors.body50} size={font.fontSize1}>
            Subscribe via{" "}
            <NavigateButton
              href="/rss.xml"
              color={colors.primary80}
              hoverColor={colors.primary}
            >
              RSS
            </NavigateButton>
          </Text>
        </Spacer>
        <Spacer bottom={16}>
          <Stack gap={10} align="left" fullWidth>
            {years.map((year) => (
              <YearSection key={year}>
                <YearHeader>{year}</YearHeader>
                <Stack gap={6} align="left" fullWidth>
                  {(postsByYear[year] ?? []).map((frontmatter: Frontmatter) => (
                    <PostLink
                      hoverColor={colors.primary}
                      color={colors.body50}
                      decorationColor={colors.body30}
                      key={frontmatter.title}
                      href={"/blog/" + frontmatter.slug}
                    >
                      <Stack fullWidth align="left">
                        <Row distribute="between" fullWidth columnReverseOnMobile>
                          <PostTitle> {frontmatter.title}</PostTitle>
                        </Row>
                        {frontmatter.description ? (
                          <Spacer top={0.5}>
                            <PostDescription>
                              <Text color={colors.body50} size={font.fontSize1}>
                                {frontmatter.description}
                              </Text>
                            </PostDescription>
                          </Spacer>
                        ) : null}
                      </Stack>
                    </PostLink>
                  ))}
                </Stack>
              </YearSection>
            ))}
          </Stack>
        </Spacer>
      </Page>
    </>
  );
};

export default Blog;
