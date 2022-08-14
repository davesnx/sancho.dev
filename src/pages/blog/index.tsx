import React from "react";

import { parseISO, format } from "date-fns";
import { GetStaticProps } from "next";

import { Frontmatter } from "@lib/frontmatter";
import { getAllFrontmatter } from "@lib/mdx";
import MetaData from "src/components/site-metadata";

import { H1, H3 } from "../../components/heading";
import { NavigateButton } from "../../components/link";
import Page from "../../components/page";
import Spacer from "../../components/spacer";
import Text from "../../components/text";
import font from "../../theme/fonts";
import { colors } from "../../theme/theme";

export const getStaticProps: GetStaticProps = async () => {
  let frontmatters = getAllFrontmatter();
  let sortedFrontmatters = frontmatters.sort((a: Frontmatter, b: Frontmatter) =>
    b.publishedAt && a.publishedAt
      ? Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
      : 0
  );
  return { props: { frontmatters: sortedFrontmatters } };
};

let Blog = ({ frontmatters }: { frontmatters: Array<Frontmatter> }) => {
  return (
    <>
      <MetaData title="Thoughts" />
      <Page title={<H1>Thoughts</H1>}>
        {frontmatters.map((frontmatter: Frontmatter) => (
          <Spacer bottom={4} key={frontmatter.title}>
            {frontmatter.publishedAt ? (
              <Text weight={400} color={colors.subtle} size={font.fontSizeN1}>
                {format(parseISO(frontmatter.publishedAt), "MMMM yyyy")}
              </Text>
            ) : null}
            <NavigateButton href={"/blog/" + frontmatter.slug}>
              <H3> {frontmatter.title}</H3>
            </NavigateButton>
          </Spacer>
        ))}
      </Page>
    </>
  );
};

export default Blog;
