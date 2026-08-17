import { css } from '@linaria/core';
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import type { ComponentType } from 'react';
import { postContentClass } from '@/components/post-content';
import { H1, Page, Row, Spacer, Text, TextLink } from '@/components/ui';
import type { BlogHeading, BlogPost } from '@/posts';
import breakpoints from '@/theme/constants';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

const titleWrapClass = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.65rem;
  max-width: 72ch;
`;

const titleClass = css`
  margin: 2rem 0 0.75rem;
  font-size: clamp(2.35rem, 6vw, 3.75rem);
  width: 100%;
  text-align: left;
  line-height: 1.12;
  letter-spacing: -0.025em;
  color: ${colors.textAccent};

  @media screen and (max-width: 599px) {
    font-size: 2.25rem;
  }
`;

const metaRowClass = css`
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const backLinkClass = css`
  display: inline-flex;
  font-size: ${fonts.fontSizeN1};
`;

const tableOfContentsClass = css`
  max-width: 72ch;
  margin: 0 0 4rem;
  padding: 1rem 0;
  border-top: 1px solid ${colors.borderSubtle};
  border-bottom: 1px solid ${colors.borderSubtle};

  @media screen and (max-width: ${breakpoints.mobile.width}px) {
    display: none;
  }
`;

const tableOfContentsTitleClass = css`
  display: block;
  margin-bottom: 0.75rem;
  color: ${colors.textMuted};
  font-family: ${fonts.mono};
  font-size: ${fonts.fontSizeN2};
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const tableOfContentsListClass = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const tableOfContentsNestedListClass = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0.4rem 0 0;
  padding-left: 1.5rem;
  list-style: none;
`;

const tableOfContentsLinkClass = css`
  display: inline;
  color: ${colors.textProse};
  font-size: ${fonts.fontSizeN1};
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
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={twitterIconClass}
    fill={colors.textPrimary}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

type TableOfContentsItem = {
  heading: BlogHeading;
  children: BlogHeading[];
};

const groupHeadings = (headings: BlogHeading[]) => {
  const items: TableOfContentsItem[] = [];

  for (const heading of headings) {
    const previous = items.at(-1);
    if (heading.level === 3 && previous?.heading.level === 2) {
      previous.children.push(heading);
    } else {
      items.push({ heading, children: [] });
    }
  }

  return items;
};

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
  const hasTableOfContents = post.headings.length >= 3;
  const tableOfContents = hasTableOfContents ? groupHeadings(post.headings) : [];

  return (
    <Page
      title={
        <>
          <TextLink href="/blog" className={backLinkClass} color={colors.textMuted} hoverColor={colors.textAccent}>
            ← Blog
          </TextLink>
          <div className={titleWrapClass}>
            <H1 className={titleClass}>{post.title}</H1>
          </div>
          <Spacer bottom={2} />
          <Row className={metaRowClass} gap={2}>
            <Text kerning="0.05rem" color={colors.textMuted} size={fonts.fontSizeN2} weight={600} monospace>
              {format(parseISO(post.publishedAt), 'MMM d, yyyy').toUpperCase()}
            </Text>
            <Text color={colors.textTertiary} size={fonts.fontSize0} weight={400} monospace>
              •
            </Text>
            <Text kerning="0.05rem" weight={600} size={fonts.fontSizeN2} monospace>
              <TextLink
                href="/about"
                weight={600}
                color={colors.textMuted}
                hoverColor={colors.textPrimary}
                decorationColor={colors.textMuted}
                monospace
              >
                DAVESNX
              </TextLink>
            </Text>
            <Text color={colors.textTertiary} size={fonts.fontSize0} weight={400} monospace>
              •
            </Text>
            <Text kerning="0.05rem" color={colors.textMuted} size={fonts.fontSizeN2} weight={600} monospace>
              {`${Math.max(1, Math.ceil(post.readingTime.minutes))} MINUTES`}
            </Text>
          </Row>
        </>
      }
    >
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialized from local metadata and escapes script delimiters. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializedJsonLd }} />
      {hasTableOfContents ? (
        <nav className={tableOfContentsClass} aria-label="On this page">
          <span className={tableOfContentsTitleClass}>On this page</span>
          <ol className={tableOfContentsListClass}>
            {tableOfContents.map(({ heading, children }) => (
              <li key={heading.id}>
                <TextLink href={`#${heading.id}`} className={tableOfContentsLinkClass}>
                  {heading.text}
                </TextLink>
                {children.length > 0 ? (
                  <ol className={tableOfContentsNestedListClass}>
                    {children.map((child) => (
                      <li key={child.id}>
                        <TextLink href={`#${child.id}`} className={tableOfContentsLinkClass}>
                          {child.text}
                        </TextLink>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <article className={postContentClass}>
        <PostContent />
      </article>

      {post.slug !== 'hello' ? (
        <Spacer top={10} bottom={4}>
          <div className={thanksClass}>
            <Row columnOnMobile justify="space-between" align="center" wrap gap={2}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <Text>
                  <strong>Thanks for reading!</strong> <br /> Any feedback is appreciated.
                </Text>
              </div>
              <a
                className={thanksButtonClass}
                href="https://twitter.com/davesnx"
                target="_blank"
                rel="noopener noreferrer"
              >
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
