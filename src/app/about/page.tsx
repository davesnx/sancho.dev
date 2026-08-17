import { css } from '@linaria/core';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { ProfileEntry, profileListClass } from '@/components/profile-entry';
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
            I have worked across backend, frontend, product engineering, and developer tooling. The complete timeline is
            available in my <TextLink href="/cv">printable CV</TextLink>.
          </Text>
          <Spacer top={3} />
          <ul className={profileListClass}>
            {career.map((entry) => (
              <ProfileEntry
                key={`${entry.company}-${entry.from}`}
                title={entry.company}
                href={entry.companyUrl}
                description={entry.role}
                meta={`${entry.from}–${entry.to}`}
              />
            ))}
          </ul>
          <Spacer top={2} />
          <Text className={sectionClass} size={fonts.fontSizeN1} color={colors.textMuted}>
            The tokens and components behind this site are documented in its <TextLink href="/system">System</TextLink>.
          </Text>
        </Section>

        <Section title="Open source">
          <Text className={sectionClass} size={fonts.fontSize1} color={colors.textProse}>
            Open source is part of how I learn, work, and share tools with the Reason and OCaml communities.
          </Text>
          <Spacer top={3} />
          <ul className={profileListClass}>
            {projects.map((project) => (
              <ProfileEntry
                key={project.name}
                title={project.name}
                href={project.url}
                description={project.description}
                meta={project.language}
              />
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
