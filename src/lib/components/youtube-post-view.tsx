import { css } from '@linaria/core';
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import type { ComponentType } from 'react';
import { postContentClass } from '@/components/post-content';
import { H1, H2, Page, Row, Spacer, Text, TextLink } from '@/components/ui';
import { YouTubeEmbed } from '@/components/youtube-embed';
import type { YouTubePost } from '@/posts';
import breakpoints from '@/theme/constants';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

const backLinkClass = css`
  display: inline-flex;
  font-size: ${fonts.fontSizeN1};
`;

const titleClass = css`
  max-width: 72ch;
  margin: 2rem 0 0.75rem;
  font-size: clamp(2.35rem, 6vw, 3.75rem);
  line-height: 1.12;
  letter-spacing: -0.025em;
  color: ${colors.textAccent};

  @media screen and (max-width: ${breakpoints.mobile.width}px) {
    font-size: 2.25rem;
  }
`;

const metaRowClass = css`
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const descriptionClass = css`
  max-width: 72ch;
`;

const transcriptHeadingClass = css`
  margin: 4rem 0 1.5rem;
`;

export function YouTubePostView({
  post,
  PostContent,
  jsonLd,
}: {
  post: YouTubePost;
  PostContent: ComponentType;
  jsonLd: Record<string, unknown>;
}) {
  const serializedJsonLd = JSON.stringify(jsonLd).replaceAll('<', '\\u003c');
  const hasTranscript = post.content.trim().length > 0;

  return (
    <Page
      title={
        <>
          <TextLink href="/blog" className={backLinkClass} color={colors.textMuted} hoverColor={colors.textAccent}>
            ← Blog
          </TextLink>
          <H1 className={titleClass}>{post.title}</H1>
          <Row className={metaRowClass} gap={2}>
            <Text kerning="0.05rem" color={colors.textMuted} size={fonts.fontSizeN2} weight={600} monospace>
              {format(parseISO(post.publishedAt), 'MMM d, yyyy').toUpperCase()}
            </Text>
            <Text color={colors.textTertiary} size={fonts.fontSize0} monospace>
              •
            </Text>
            <Text kerning="0.05rem" color={colors.textMuted} size={fonts.fontSizeN2} weight={600} monospace>
              {post.event.toUpperCase()}
            </Text>
          </Row>
        </>
      }
    >
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized from validated local metadata. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializedJsonLd }} />
      <YouTubeEmbed videoId={post.youtubeId} title={post.title} thumbnail={post.thumbnail} />
      <Spacer top={4} />
      <Text className={descriptionClass} size={fonts.fontSize1} color={colors.textProse}>
        {post.description}
      </Text>
      {hasTranscript ? (
        <>
          <H2 className={transcriptHeadingClass}>Transcript</H2>
          <article className={postContentClass}>
            <PostContent />
          </article>
        </>
      ) : null}
    </Page>
  );
}
