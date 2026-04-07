import { css } from "@linaria/core";
import type { BlogPost } from "@/posts";

import { ButtonLink, H1, H3, Page, Spacer, Stack, Text, TextLink } from "@/components/ui";
import { getPublishedPosts } from "@/posts";
import { buildMetadata } from "@/site";
import fonts from "@/theme/fonts";
import { colors } from "@/theme/theme";

export const metadata = buildMetadata({
  title: "Blog",
  description: "davesnx's technical blog about Software Engineering.",
  path: "/blog",
});

const yearSectionClass = css`
  position: relative;
  width: 100%;
`;

const yearHeaderClass = css`
  position: absolute;
  right: calc(100% + 120px);
  top: 0px;
  margin: 0;
  padding: 0;
  font-family: ${fonts.mono};
  font-size: ${fonts.fontSize3};
  line-height: 1.3;
  font-weight: 600;
  color: ${colors.textTertiary};
  opacity: 0.5;
  user-select: none;
`;

const postLinkClass = css`
  display: block;
  width: 100%;
  text-decoration: none;
`;

const postTitleClass = css`
  font-size: ${fonts.fontSize3};
  color: ${colors.textProse};
  width: 100%;
  text-align: left;
  transition: color 200ms ease-out;

  &:hover {
    color: ${colors.textAccent};
  }
`;

const postDescriptionClass = css`
  width: 80%;

  @media (max-width: 599px) {
    width: 100%;
  }
`;

type PostsByYear = Record<string, BlogPost[]>;

const groupByYear = (posts: BlogPost[]) => {
  return posts.reduce((acc, post) => {
    const year = new Date(post.publishedAt).getFullYear().toString();

    acc[year] ??= [];
    acc[year].push(post);

    return acc;
  }, {} as PostsByYear);
};

export default function BlogIndexPage() {
  let posts = getPublishedPosts();
  let postsByYear = groupByYear(posts);
  let years = Object.keys(postsByYear).sort((left, right) => Number(right) - Number(left));

  return (
    <Page title={<H1>Blog</H1>}>
      <Spacer bottom={4}>
        <Text color={colors.textSecondary} size={fonts.fontSize1}>
          Subscribe via <TextLink href="/rss.xml" color={colors.textProse} hoverColor={colors.textAccent}>RSS</TextLink>
        </Text>
      </Spacer>
      <Spacer bottom={16}>
        <Stack gap={10} align="flex-start" fullWidth>
          {years.map((year) => (
            <section key={year} className={yearSectionClass}>
              <h2 className={yearHeaderClass}>{year}</h2>
              <Stack gap={6} align="flex-start" fullWidth>
                {(postsByYear[year] ?? []).map((post) => (
                  <ButtonLink key={post.slug} href={`/blog/${post.slug}`} className={postLinkClass}>
                    <Stack gap={1} align="flex-start" fullWidth>
                      <H3 className={postTitleClass}>{post.title}</H3>
                      {post.description ? (
                        <Spacer top={0.5}>
                          <div className={postDescriptionClass}>
                            <Text color={colors.textSecondary} size={fonts.fontSize1}>
                              {post.description}
                            </Text>
                          </div>
                        </Spacer>
                      ) : null}
                    </Stack>
                  </ButtonLink>
                ))}
              </Stack>
            </section>
          ))}
        </Stack>
      </Spacer>
    </Page>
  );
}
