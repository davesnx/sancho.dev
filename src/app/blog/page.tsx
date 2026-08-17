import { css } from '@linaria/core';
import { ButtonLink, H1, H3, Page, Spacer, Stack, Text, TextLink } from '@/components/ui';
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

const videoIconClass = css`
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  fill: ${colors.textMuted};
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

const YouTubeIcon = () => (
  <svg viewBox="0 0 512 512" className={videoIconClass} aria-hidden="true">
    <path d="M490.24,113.92c-13.888-24.704-28.96-29.248-59.648-30.976C399.936,80.864,322.848,80,256.064,80c-66.912,0-144.032,0.864-174.656,2.912c-30.624,1.76-45.728,6.272-59.744,31.008C7.36,138.592,0,181.088,0,255.904v0.256c0,74.496,7.36,117.312,21.664,141.728c14.016,24.704,29.088,29.184,59.712,31.264C112.032,430.944,189.152,432,256.064,432c66.784,0,143.872-1.056,174.56-2.816c30.688-2.08,45.76-6.56,59.648-31.264C504.704,373.504,512,330.688,512,256.192C512,181.088,504.704,138.592,490.24,113.92zM192,352V160l160,96L192,352z" />
  </svg>
);

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
