import { css } from '@linaria/core';

import { ButtonLink, H1, H3, Page, Spacer, Stack, Text } from '@/components/ui';
import { getPublishedPosts } from '@/posts';
import { buildMetadata } from '@/site';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

export const metadata = buildMetadata({
  title: 'Blog',
  description: "davesnx's technical blog about Software Engineering.",
  path: '/blog',
});

const yearSectionClass = css`
  display: flex;
  align-items: flex-start;
  gap: clamp(12px, 3vw, 24px);
  width: 100%;
`;

const yearHeaderClass = css`
  order: 1;
  flex: 0 0 4ch;
  margin: 0;
  font-family: ${fonts.mono};
  font-size: ${fonts.fontSize3};
  line-height: 1.3;
  font-weight: 700;
  text-align: right;
  color: ${colors.textSecondary};
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
  width: 100%;
`;

export default function BlogIndexPage() {
  const postsByYear = Object.groupBy(getPublishedPosts(), (post) =>
    new Date(post.publishedAt).getFullYear().toString(),
  );
  const years = Object.keys(postsByYear).sort((left, right) => Number(right) - Number(left));

  return (
    <Page title={<H1>Blog</H1>}>
      <Spacer bottom={16}>
        <Stack gap={10} align="flex-start" fullWidth>
          {years.map((year) => (
            <section key={year} className={yearSectionClass}>
              <h2 className={yearHeaderClass}>{year}</h2>
              <Stack gap={6} align="flex-start" fullWidth>
                {(postsByYear[year] ?? []).map((post) => (
                  <ButtonLink key={post.slug} href={`/blog/${post.slug}`} className={postLinkClass}>
                    <Stack gap={0.5} align="flex-start" fullWidth>
                      <H3 className={postTitleClass}>{post.title}</H3>
                      {post.description ? (
                        <div className={postDescriptionClass}>
                          <Text color={colors.textSecondary} size={fonts.fontSize1}>
                            {post.description}
                          </Text>
                        </div>
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
