import { css } from '@linaria/core';
import { ButtonLink, H1, H3, Page, Spacer, Stack, Text, TextLink } from '@/components/ui';
import { YouTubeIcon } from '@/components/youtube-icon';
import type { BlogPost } from '@/posts';
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
  font-weight: 700;
  color: ${colors.textMuted};
  user-select: none;
`;

const postLinkClass = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  text-decoration: none;
`;

const postTitleClass = css`
  font-size: ${fonts.fontSize3};
  color: ${colors.textProse};
  text-align: left;
  transition: color 200ms ease-out;

  &:hover {
    color: ${colors.textAccent};
  }
`;

const visuallyHiddenClass = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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
        <Text color={colors.textMuted} size={fonts.fontSize1}>
          Subscribe via{' '}
          <TextLink href="/rss.xml" color={colors.textProse} hoverColor={colors.textAccent} native>
            RSS
          </TextLink>
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
                    <H3 className={postTitleClass}>{post.title}</H3>
                    {post.kind === 'youtube' ? (
                      <>
                        <YouTubeIcon />
                        <span className={visuallyHiddenClass}>YouTube video</span>
                      </>
                    ) : null}
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
