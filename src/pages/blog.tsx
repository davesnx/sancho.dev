import React from "react";
import styled from "@emotion/styled";

import { format, parseISO } from "date-fns";
import { GetStaticProps } from "next";

import MetaData from "../components/site-metadata";
import { Frontmatter } from "../lib/frontmatter";
import { getAllFrontmatter } from "../lib/mdx";

import { H1, H3 } from "../components/heading";
import { NavigateButton } from "../components/link";
import Page from "../components/page";
import { Row, Stack } from "../components/taco";
import Text from "../components/text";
import constants from "../theme/constants";
import font from "../theme/fonts";
import { colors } from "../theme/theme";

export const getStaticProps: GetStaticProps = async () => {
  let frontmatters = getAllFrontmatter();
  let sortedFrontmatters = frontmatters.sort((a: Frontmatter, b: Frontmatter) =>
    b.publishedAt && a.publishedAt
      ? Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
      : 0
  );
  return { props: { frontmatters: sortedFrontmatters } };
};

const PostLink = styled(NavigateButton)`
  width: 100%;
`;

const PostDescription = styled.div`
  width: 80%;

  @media screen and (max-width: ${constants.mobile.width}px) {
    width: 100%;
  }
`;

const PostDate = styled.div`
  @media screen and (max-width: ${constants.mobile.width}px) {
    display: none;
  }
`;

let Blog = ({ frontmatters }: { frontmatters: Array<Frontmatter> }) => {
  return (
    <>
      <MetaData title="Blog" />
      <Page title={<H1>Blog</H1>}>
        <Stack gap={3} align="left" fullWidth>
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
                  <Row distribute="between" gap={2} fullWidth>
                    <H3> {frontmatter.title}</H3>
                    {frontmatter.publishedAt ? (
                      <PostDate>
                        <Text
                          color={colors.subtle}
                          size={font.fontSize1}
                          weight={300}
                        >
                          {format(parseISO(frontmatter.publishedAt), "MM/yyyy")}
                        </Text>
                      </PostDate>
                    ) : null}
                  </Row>
                  {frontmatter.description ? (
                    <PostDescription>
                      <Text
                        color={colors.subtle}
                        size={font.fontSize1}
                        weight={300}
                      >
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
