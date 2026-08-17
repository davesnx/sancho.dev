import { css } from '@linaria/core';
import type { ComponentType } from 'react';
import { ArticleFeedback } from '@/components/article-feedback';
import { ArticleMeta } from '@/components/article-meta';
import { HeadingNavigation } from '@/components/heading-navigation';
import { postContentClass } from '@/components/post-content';
import { H1, Page, Spacer, TextLink } from '@/components/ui';
import type { BlogPost } from '@/posts';
import breakpoints from '@/theme/constants';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

const titleClass = css`
  max-width: 72ch;
  margin: 2rem 0 0.75rem;
  font-size: clamp(2.35rem, 6vw, 3.75rem);
  line-height: 1.12;
  letter-spacing: -0.025em;
  text-align: left;
  color: ${colors.textAccent};
  @media screen and (max-width: ${breakpoints.mobile.width}px) { font-size: 2.25rem; }
`;
const backLinkClass = css`
  display: inline-flex;
  font-size: ${fonts.fontSizeN1};
`;

export function BlogPostView({
  post,
  PostContent,
  jsonLd,
}: {
  post: BlogPost;
  PostContent: ComponentType;
  jsonLd: Record<string, unknown>;
}) {
  const serializedJsonLd = JSON.stringify(jsonLd).replaceAll('<', '\\u003c');
  return (
    <Page
      title={
        <>
          <TextLink href="/blog" className={backLinkClass} color={colors.textMuted} hoverColor={colors.textAccent}>
            ← Blog
          </TextLink>
          <H1 className={titleClass}>{post.title}</H1>
          <ArticleMeta publishedAt={post.publishedAt} readingMinutes={post.readingTime.minutes} />
        </>
      }
    >
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized from local metadata and escapes script delimiters. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializedJsonLd }} />
      <HeadingNavigation headings={post.headings} />
      <article className={postContentClass}>
        <PostContent />
      </article>
      {post.slug !== 'hello' ? (
        <Spacer top={10} bottom={4}>
          <ArticleFeedback />
        </Spacer>
      ) : null}
    </Page>
  );
}
