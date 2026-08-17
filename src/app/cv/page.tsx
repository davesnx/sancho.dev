import { css } from '@linaria/core';
import { JsonLd } from '@/components/json-ld';
import { PrintButton } from '@/components/print-button';
import { ProfileEntry, profileListClass } from '@/components/profile-entry';
import { H1, H2, Page, Row, Spacer, Stack, Text, TextLink } from '@/components/ui';
import { career, projectMeta, projects, skills } from '@/profile';
import { buildMetadata, buildWebPageJsonLd } from '@/site';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

const cvClass = css`
  max-width: 72ch;

  @media print {
    max-width: none;
    color: #111;
    font-size: 10pt;

    :global([data-site-header]),
    :global([data-site-footer]) {
      display: none !important;
    }

    :global(body) {
      background: #fff !important;
      color: #111 !important;
    }

    :global([data-site-root]),
    :global(main),
    :global(main *) {
      background-color: #fff !important;
      color: #111 !important;
    }

    :global(a) {
      color: #111 !important;
      text-decoration: none !important;
    }
  }
`;

const headerClass = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 599px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const roleClass = css`
  margin-top: 0.5rem;
`;

const sectionClass = css`
  break-inside: avoid;
`;

const sectionTitleClass = css`
  margin-bottom: 1rem;
`;

const skillListClass = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const metadata = buildMetadata({
  title: 'CV',
  description: "David Sancho's experience, open-source work, and technical focus.",
  path: '/cv',
});

export default function CvPage() {
  return (
    <Page>
      <JsonLd
        data={buildWebPageJsonLd({
          title: 'David Sancho CV',
          description: "David Sancho's experience, open-source work, and technical focus.",
          path: '/cv',
          type: 'ProfilePage',
        })}
      />
      <div className={cvClass}>
        <div className={headerClass}>
          <div>
            <H1>David Sancho</H1>
            <Text className={roleClass} size={fonts.fontSize1} color={colors.textProse}>
              Software engineer · Barcelona
            </Text>
          </div>
          <PrintButton />
        </div>

        <Spacer top={3} />
        <Row gap={2} justify="flex-start" wrap>
          <TextLink href="https://github.com/davesnx">GitHub</TextLink>
          <TextLink href="https://x.com/davesnx">X</TextLink>
          <TextLink href="https://bsky.app/profile/david.sancho.dev">Bluesky</TextLink>
          <TextLink href="https://sancho.dev">sancho.dev</TextLink>
        </Row>

        <Spacer top={6} />
        <Text size={fonts.fontSize1} color={colors.textProse}>
          I build UI infrastructure and developer tools where OCaml, functional programming, and the web meet. At
          Ahrefs, I work on the systems behind its frontend and maintain open-source tools across the Reason and OCaml
          ecosystems.
        </Text>

        <Spacer top={8} />
        <Stack gap={8} align="stretch">
          <section className={sectionClass} aria-labelledby="cv-experience">
            <H2 id="cv-experience" className={sectionTitleClass}>
              Experience
            </H2>
            <ul className={profileListClass}>
              {career.map((entry) => (
                <ProfileEntry
                  key={`${entry.company}-${entry.from}`}
                  title={entry.company}
                  href={entry.companyUrl}
                  description={entry.role}
                  meta={`${entry.from}–${entry.to}`}
                  details={entry.details}
                />
              ))}
            </ul>
          </section>

          <section className={sectionClass} aria-labelledby="cv-open-source">
            <H2 id="cv-open-source" className={sectionTitleClass}>
              Selected open source
            </H2>
            <ul className={profileListClass}>
              {projects.map((project) => (
                <ProfileEntry
                  key={project.name}
                  title={project.name}
                  href={project.url}
                  description={project.description}
                  meta={projectMeta(project)}
                />
              ))}
            </ul>
          </section>

          <section className={sectionClass} aria-labelledby="cv-skills">
            <H2 id="cv-skills" className={sectionTitleClass}>
              Focus
            </H2>
            <ul className={skillListClass}>
              {skills.map((skill) => (
                <li key={skill}>
                  <Text size={fonts.fontSizeN1}>{skill}</Text>
                </li>
              ))}
            </ul>
          </section>
        </Stack>
      </div>
    </Page>
  );
}
