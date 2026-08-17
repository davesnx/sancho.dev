import { css } from '@linaria/core';
import { ArticleFeedback } from '@/components/article-feedback';
import { ArticleMeta } from '@/components/article-meta';
import { HeadingNavigation } from '@/components/heading-navigation';
import { JsonLd } from '@/components/json-ld';
import { MelangePlayground } from '@/components/melange-playground';
import { postContentClass } from '@/components/post-content';
import { PrintButton } from '@/components/print-button';
import { ProfileEntry, profileListClass } from '@/components/profile-entry';
import { ThemeToggle } from '@/components/theme-toggle';
import { ButtonLink, H1, H2, H3, H4, H5, H6, Page, Row, Spacer, Stack, space, Text, TextLink } from '@/components/ui';
import { YouTubeEmbed } from '@/components/youtube-embed';
import { YouTubeIcon } from '@/components/youtube-icon';
import { career, projectMeta, projects } from '@/profile';
import { buildMetadata, buildWebPageJsonLd } from '@/site';
import breakpoints, { layout } from '@/theme/constants';
import fonts, { typography } from '@/theme/fonts';
import { colors, darkCSSVariables, lightCSSVariables } from '@/theme/theme';
import SystemMdxSample from '../../content/system-sample.mdx';

const introClass = css`
  max-width: 72ch;
`;

const sectionClass = css`
  width: 100%;
`;

const sectionTitleClass = css`
  margin-bottom: 1.5rem;
`;

const tokenTableClass = css`
  width: 100%;
  border-collapse: collapse;
  font-family: ${fonts.mono};
  font-size: ${fonts.fontSizeN2};

  th,
  td {
    padding: 0.75rem;
    border-bottom: 1px solid ${colors.borderSubtle};
    text-align: left;
  }

  th {
    color: ${colors.textMuted};
  }

  @media (max-width: 599px) {
    display: block;
    overflow-x: auto;
  }
`;

const tableWrapClass = css`
  width: 100%;
  overflow-x: auto;
`;

const swatchClass = css`
  display: inline-block;
  width: 2.5rem;
  height: 1.5rem;
  border: 1px solid ${colors.borderSubtle};
  border-radius: 999px;
`;

const tokenValueClass = css`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
`;

const sampleClass = css`
  width: 100%;
  padding: 1.5rem 0;
  border-top: 1px solid ${colors.borderSubtle};

  &:last-child {
    border-bottom: 1px solid ${colors.borderSubtle};
  }
`;

const labelClass = css`
  display: block;
  margin-bottom: 0.75rem;
  color: ${colors.textMuted};
  font-family: ${fonts.mono};
  font-size: ${fonts.fontSizeN2};
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const spacingBarClass = css`
  height: 0.75rem;
  background: ${colors.textMuted};
`;

const buttonExampleClass = css`
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  padding: 0 1rem;
  border: 1px solid ${colors.borderStrong};
  border-radius: 6px;
  background: ${colors.backgroundSecondary};
`;

const metadataClass = css`
  color: ${colors.textMuted};
  font-family: ${fonts.mono};
  font-size: ${fonts.fontSizeN2};
  font-weight: 600;
  letter-spacing: 0.05em;
`;

const longTextClass = css`
  max-width: ${layout.readingMeasure};
  overflow-wrap: anywhere;
`;

const parseThemeVariables = (cssVariables: string, prefix: 'light' | 'dark') => {
  const variables = new Map<string, string>();
  const pattern = new RegExp(`--c-${prefix}-([a-zA-Z0-9]+):\\s*([^;]+);`, 'g');
  let match = pattern.exec(cssVariables);
  while (match) {
    if (match[1] && match[2]) variables.set(match[1], match[2].trim());
    match = pattern.exec(cssVariables);
  }
  return variables;
};

const renderSwatch = (value: string) => (
  <span className={tokenValueClass}>
    <span className={swatchClass} style={{ background: value }} aria-hidden="true" />
    <code>{value}</code>
  </span>
);

const lightTokens = parseThemeVariables(lightCSSVariables, 'light');
const darkTokens = parseThemeVariables(darkCSSVariables, 'dark');
const tokenNames = [...new Set([...lightTokens.keys(), ...darkTokens.keys()])].sort();
const firstCareer = career[0];
const firstProject = projects[0];
const typographyTokens = Object.entries(typography).map(([name, token]) => ({ name, ...token }));
const layoutTokens = [
  { name: 'content max', value: `${layout.contentWidth}px` },
  { name: 'reading measure', value: layout.readingMeasure },
  { name: 'mobile max', value: `${breakpoints.mobile.width}px` },
  { name: 'desktop nav min', value: `${breakpoints.mobile.width + 1}px` },
  { name: 'mobile gutter', value: layout.mobileGutter },
  { name: 'desktop gutter', value: layout.desktopGutter },
  { name: 'spacing unit', value: `${layout.spacingUnit}px` },
];
const exampleHeadings = [
  { level: 2 as const, text: 'Colors', id: 'system-colors' },
  { level: 2 as const, text: 'Typography', id: 'system-type' },
  { level: 2 as const, text: 'Prose', id: 'system-prose' },
];

export const metadata = buildMetadata({
  title: 'System',
  description: 'The design tokens and shared components used on sancho.dev.',
  path: '/system',
});

export default function SystemPage() {
  return (
    <Page title={<H1>System</H1>}>
      <JsonLd
        data={buildWebPageJsonLd({
          title: 'System',
          description: 'The design tokens and shared components used on sancho.dev.',
          path: '/system',
          type: 'TechArticle',
        })}
      />
      <Stack gap={12} align="flex-start" fullWidth>
        <Text className={introClass} size={fonts.fontSize1} color={colors.textProse}>
          A living reference for the tokens and components used across sancho.dev. Every example below renders the same
          values or components used by the site.
        </Text>

        <section className={sectionClass} aria-labelledby="system-colors">
          <H2 id="system-colors" className={sectionTitleClass}>
            Colors
          </H2>
          <table className={tokenTableClass}>
            <thead>
              <tr>
                <th>Token</th>
                <th>Light</th>
                <th>Dark</th>
              </tr>
            </thead>
            <tbody>
              {tokenNames.map((token) => (
                <tr key={token}>
                  <td>{token}</td>
                  <td>{renderSwatch(lightTokens.get(token) ?? '—')}</td>
                  <td>{renderSwatch(darkTokens.get(token) ?? '—')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={sectionClass} aria-labelledby="system-type">
          <H2 id="system-type" className={sectionTitleClass}>
            Typography
          </H2>
          <div className={sampleClass}>
            <span className={labelClass}>Heading 3</span>
            <H3>Tools support the reading path</H3>
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>Heading 4</span>
            <H4>Components keep content predictable</H4>
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>Heading 5</span>
            <H5>Small headings carry hierarchy</H5>
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>Heading 6</span>
            <H6>Metadata stays quiet and readable</H6>
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>Body</span>
            <Text size={fonts.fontSize1}>
              A readable measure, generous line height, and direct language carry long-form content.
            </Text>
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>Metadata</span>
            <span className={metadataClass}>AUG 2026 · 8 MINUTES</span>
          </div>
          <div className={tableWrapClass}>
            <table className={tokenTableClass}>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Family</th>
                  <th>Size</th>
                  <th>Weight</th>
                  <th>Line height</th>
                </tr>
              </thead>
              <tbody>
                {typographyTokens.map((token) => (
                  <tr key={token.name}>
                    <td>{token.name}</td>
                    <td>
                      <code>{token.fontFamily}</code>
                    </td>
                    <td>
                      <code>{token.fontSize}</code>
                    </td>
                    <td>{token.fontWeight}</td>
                    <td>{token.lineHeight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="system-spacing">
          <H2 id="system-spacing" className={sectionTitleClass}>
            Spacing
          </H2>
          <Stack gap={2} align="flex-start">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <Row key={step} gap={2} justify="flex-start" fullWidth>
                <span className={metadataClass}>
                  {step} · {space(step)}
                </span>
                <span className={spacingBarClass} style={{ width: space(step) }} />
              </Row>
            ))}
          </Stack>
          <Spacer top={3} />
          <div className={tableWrapClass}>
            <table className={tokenTableClass}>
              <thead>
                <tr>
                  <th>Layout role</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {layoutTokens.map((token) => (
                  <tr key={token.name}>
                    <td>{token.name}</td>
                    <td>
                      <code>{token.value}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="system-actions">
          <H2 id="system-actions" className={sectionTitleClass}>
            Links and actions
          </H2>
          <div className={sampleClass}>
            <span className={labelClass}>Text links</span>
            <Row gap={2} justify="flex-start" wrap>
              <TextLink href="/about">Internal link</TextLink>
              <TextLink href="https://ocaml.org/">External link</TextLink>
            </Row>
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>Button link</span>
            <ButtonLink href="/blog" className={buttonExampleClass}>
              Browse the Blog
            </ButtonLink>
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>Theme control</span>
            <ThemeToggle />
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>CV print action</span>
            <Row gap={2} justify="flex-start" wrap>
              <PrintButton disabled />
              <TextLink href="/cv">Open the CV to print</TextLink>
            </Row>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="system-prose">
          <H2 id="system-prose" className={sectionTitleClass}>
            Prose
          </H2>
          <article className={postContentClass}>
            <SystemMdxSample />
          </article>
        </section>

        <section className={sectionClass} aria-labelledby="system-media">
          <H2 id="system-media" className={sectionTitleClass}>
            Media
          </H2>
          <div className={sampleClass}>
            <span className={labelClass}>Melange playground</span>
            <MelangePlayground>{`let greeting = "hello"\nJs.log(greeting)`}</MelangePlayground>
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>YouTube embed</span>
            <YouTubeEmbed
              videoId="Oy3lZl2kE-0"
              title="Universal React in OCaml"
              thumbnail="/images/talks/universal-react-in-ocaml.jpg"
            />
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="system-content-patterns">
          <H2 id="system-content-patterns" className={sectionTitleClass}>
            Content patterns
          </H2>
          <div className={sampleClass}>
            <span className={labelClass}>Profile entries</span>
            <ul className={profileListClass}>
              {firstCareer ? (
                <ProfileEntry
                  title={firstCareer.company}
                  href={firstCareer.companyUrl}
                  description={firstCareer.role}
                  meta={`${firstCareer.from}–${firstCareer.to}`}
                />
              ) : null}
              {firstProject ? (
                <ProfileEntry
                  title={firstProject.name}
                  href={firstProject.url}
                  description={firstProject.description}
                  meta={projectMeta(firstProject)}
                />
              ) : null}
            </ul>
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>Article metadata</span>
            <ArticleMeta publishedAt="2026-03-03" readingMinutes={8} />
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>Heading navigation</span>
            <HeadingNavigation headings={exampleHeadings} />
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>YouTube marker</span>
            <Row gap={1} justify="flex-start">
              <YouTubeIcon />
              <Text>YouTube video</Text>
            </Row>
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>Article footer</span>
            <ArticleFeedback />
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="system-resilience">
          <H2 id="system-resilience" className={sectionTitleClass}>
            Resilience
          </H2>
          <div className={sampleClass}>
            <span className={labelClass}>Long text</span>
            <Text className={longTextClass}>
              A-very-long-unbroken-value-that-must-wrap-without-expanding-the-page-or-hiding-neighboring-content.example
            </Text>
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>Empty state</span>
            <Text color={colors.textMuted}>No entries yet.</Text>
          </div>
          <div className={sampleClass}>
            <span className={labelClass}>Reduced motion</span>
            <Text color={colors.textProse}>
              The global <code>prefers-reduced-motion</code> rule removes non-essential animation and shortens
              transitions without hiding content.
            </Text>
          </div>
        </section>
      </Stack>
    </Page>
  );
}
