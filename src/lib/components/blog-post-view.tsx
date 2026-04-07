import type { ComponentType } from "react";

import { css } from "@linaria/core";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";

import type { BlogPost } from "@/posts";
import { postContentClass } from "@/components/post-content";
import { H1, Page, Row, Spacer, Text, TextLink } from "@/components/ui";
import breakpoints from "@/theme/constants";
import fonts from "@/theme/fonts";
import { colors } from "@/theme/theme";

const titleWrapClass = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 0.65rem;
  margin-left: -6rem;
  margin-right: -6rem;
  max-width: 150%;

  @media screen and (max-width: calc(${breakpoints.desktop.width}px + 32px)) {
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`;

const titleClass = css`
  margin: 5rem 0px 1rem;
  font-size: 3rem;
  width: 100%;
  text-align: center;
  line-height: 1.4;
  color: ${colors.textAccent};

  @media screen and (max-width: 599px) {
    font-size: 2rem;
  }
`;

const metaRowClass = css`
  justify-content: center;
  flex-wrap: wrap;
`;

const thanksClass = css`
  background: ${colors.backgroundSecondary};
  padding: 2rem;
  border-radius: 8px;
`;

const thanksButtonClass = css`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${colors.backgroundSecondary};
  color: ${colors.textPrimary};
  padding: 10px 16px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 150ms ease-in-out;
  font-size: 14px;

  &:hover,
  &:active {
    background-color: ${colors.backgroundTertiary};
  }
`;

const twitterIconClass = css`
  width: 20px;
  height: 20px;
`;

const TwitterIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={twitterIconClass} fill={colors.textPrimary}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function BlogPostView({
  post,
  PostContent,
  jsonLd,
}: {
  post: BlogPost;
  PostContent: ComponentType;
  jsonLd: Record<string, unknown>;
}) {
  return (
    <Page
      title={
        <>
          <div className={titleWrapClass}>
            <H1 className={titleClass}>{post.title}</H1>
          </div>
          <Spacer bottom={2} />
          <Row className={metaRowClass} gap={2}>
            <Text kerning="0.05rem" color={colors.textSecondary} size={fonts.fontSizeN2} weight={600} monospace>
              {format(parseISO(post.publishedAt), "MMM yyyy").toUpperCase()}
            </Text>
            <Text color={colors.textTertiary} size={fonts.fontSize0} weight={400} monospace>
              •
            </Text>
            <Text kerning="0.05rem" weight={600} size={fonts.fontSizeN2} monospace>
              <TextLink href="/about" weight={600} color={colors.textSecondary} hoverColor={colors.textProse} decorationColor="transparent" monospace>
                DAVESNX
              </TextLink>
            </Text>
            <Text color={colors.textTertiary} size={fonts.fontSize0} weight={400} monospace>
              •
            </Text>
            <Text kerning="0.05rem" color={colors.textSecondary} size={fonts.fontSizeN2} weight={600} monospace>
              {`${Math.max(1, Math.floor(post.readingTime.minutes))} MINUTES`}
            </Text>
          </Row>
        </>
      }
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className={postContentClass}>
        <PostContent />
      </article>

      {post.slug !== "hello" ? (
        <Spacer top={10} bottom={4}>
          <div className={thanksClass}>
            <Row columnOnMobile justify="space-between" align="center" wrap gap={2}>
              <div style={{ flex: 1, minWidth: "280px" }}>
                <Text>
                  <strong>Thanks for reading!</strong> <br /> Any feedback is appreciated.
                </Text>
              </div>
              <a className={thanksButtonClass} href="https://twitter.com/davesnx" target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
                <Text monospace>@davesnx</Text>
              </a>
            </Row>
          </div>
        </Spacer>
      ) : null}
    </Page>
  );
}
