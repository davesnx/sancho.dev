import { css } from '@linaria/core';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { H1, H2, Page, Spacer, Stack, Text, TextLink } from '@/components/ui';
import { career, contact, introduction, outsideComputers, type ProfileSegment, projects } from '@/profile';
import { buildMetadata } from '@/site';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

const sectionClass = css`
  max-width: 72ch;
`;

const sectionHeadingClass = css`
  margin-bottom: 1.5rem;
`;

const listClass = css`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid ${colors.borderSubtle};
`;

const listItemClass = css`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${colors.borderSubtle};

  @media (max-width: 599px) {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
`;

const dateClass = css`
  white-space: nowrap;
  color: ${colors.textMuted};
  font-family: ${fonts.mono};
  font-size: ${fonts.fontSizeN2};
  font-weight: 600;
`;

const projectMetaClass = css`
  color: ${colors.textMuted};
  font-family: ${fonts.mono};
  font-size: ${fonts.fontSizeN2};
`;

export const metadata = buildMetadata({
  title: 'About',
  description:
    'About David Sancho: software engineer in Barcelona working on OCaml, developer tooling, and UI infrastructure at Ahrefs.',
  path: '/about',
});

const renderParagraph = (paragraph: ProfileSegment[]) =>
  paragraph.map((segment) => {
    if (typeof segment === 'string') return segment;
    return (
      <TextLink key={`${segment.text}-${segment.href}`} href={segment.href}>
        {segment.text}
      </TextLink>
    );
  });

function Prose({ paragraphs }: { paragraphs: ProfileSegment[][] }) {
  return (
    <div className={sectionClass}>
      {paragraphs.map((paragraph, index) => (
        <Fragment key={paragraph.map((segment) => (typeof segment === 'string' ? segment : segment.text)).join('')}>
          <Text size={fonts.fontSize1} align={index === 0 ? 'left' : undefined}>
            {renderParagraph(paragraph)}
          </Text>
          {index < paragraphs.length - 1 ? <Spacer top={2} /> : null}
        </Fragment>
      ))}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`about-${title.toLowerCase().replaceAll(' ', '-')}`}>
      <H2 id={`about-${title.toLowerCase().replaceAll(' ', '-')}`} className={sectionHeadingClass}>
        {title}
      </H2>
      {children}
    </section>
  );
}

export default function AboutPage() {
  return (
    <Page title={<H1>About</H1>}>
      <Stack gap={10} align="flex-start" fullWidth>
        <Prose paragraphs={introduction} />

        <Section title="Work">
          <Text className={sectionClass} size={fonts.fontSize1} color={colors.textProse}>
            I have worked across backend, frontend, product engineering, and developer tooling.
          </Text>
          <Spacer top={3} />
          <ul className={listClass}>
            {career.map((entry) => (
              <li key={`${entry.company}-${entry.from}`} className={listItemClass}>
                <div>
                  <Text weight={700} color={colors.textAccent}>
                    {entry.companyUrl ? <TextLink href={entry.companyUrl}>{entry.company}</TextLink> : entry.company}
                  </Text>
                  <Text size={fonts.fontSizeN1} color={colors.textProse}>
                    {entry.role}
                  </Text>
                </div>
                <span className={dateClass}>
                  {entry.from}–{entry.to}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Open source">
          <Text className={sectionClass} size={fonts.fontSize1} color={colors.textProse}>
            Open source is part of how I learn, work, and share tools with the Reason and OCaml communities.
          </Text>
          <Spacer top={3} />
          <ul className={listClass}>
            {projects.map((project) => (
              <li key={project.name} className={listItemClass}>
                <div>
                  <TextLink href={project.url} weight={700} color={colors.textAccent}>
                    {project.name}
                  </TextLink>
                  <Text size={fonts.fontSizeN1} color={colors.textProse}>
                    {project.description}
                  </Text>
                </div>
                <span className={projectMetaClass}>{project.language}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Beyond computers">
          <Prose paragraphs={outsideComputers} />
        </Section>

        <Section title="Contact">
          <Prose paragraphs={contact} />
        </Section>
      </Stack>
    </Page>
  );
}
