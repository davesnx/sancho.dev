import { css } from '@linaria/core';
import { PrintButton } from '@/components/print-button';
import { H1, H2, Page, Row, Spacer, Stack, Text, TextLink } from '@/components/ui';
import { career, projects, skills } from '@/profile';
import { buildMetadata } from '@/site';
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

const listClass = css`
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid ${colors.borderSubtle};
`;

const itemClass = css`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${colors.borderSubtle};
  break-inside: avoid;

  @media (max-width: 599px) {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
`;

const itemContentClass = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const dateClass = css`
  white-space: nowrap;
  color: ${colors.textMuted};
  font-family: ${fonts.mono};
  font-size: ${fonts.fontSizeN2};
  font-weight: 600;

  @media print {
    color: #333;
  }
`;

const detailListClass = css`
  margin: 0.75rem 0 0;
  padding-left: 1.25rem;
  color: ${colors.textProse};

  & li + li {
    margin-top: 0.35rem;
  }
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
            <ul className={listClass}>
              {career.map((entry) => (
                <li key={`${entry.company}-${entry.from}`} className={itemClass}>
                  <div className={itemContentClass}>
                    <Text weight={700} color={colors.textAccent}>
                      {entry.companyUrl ? <TextLink href={entry.companyUrl}>{entry.company}</TextLink> : entry.company}
                    </Text>
                    <Text size={fonts.fontSizeN1} color={colors.textProse}>
                      {entry.role}
                    </Text>
                    <ul className={detailListClass}>
                      {entry.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                  <span className={dateClass}>
                    {entry.from}–{entry.to}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={sectionClass} aria-labelledby="cv-open-source">
            <H2 id="cv-open-source" className={sectionTitleClass}>
              Selected open source
            </H2>
            <ul className={listClass}>
              {projects.map((project) => (
                <li key={project.name} className={itemClass}>
                  <div className={itemContentClass}>
                    <TextLink href={project.url} weight={700} color={colors.textAccent}>
                      {project.name}
                    </TextLink>
                    <Text size={fonts.fontSizeN1} color={colors.textProse}>
                      {project.description}
                    </Text>
                  </div>
                  <span className={dateClass}>{project.language}</span>
                </li>
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
