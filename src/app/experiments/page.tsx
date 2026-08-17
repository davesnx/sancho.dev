import { css } from '@linaria/core';

import { ButtonLink, H1, Page, Spacer, Text } from '@/components/ui';
import { buildMetadata } from '@/site';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

const listClass = css`
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid ${colors.borderSubtle};
`;

const itemClass = css`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) auto;
  align-items: baseline;
  gap: 1rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid ${colors.borderSubtle};
  text-decoration: none;

  @media (max-width: 599px) {
    grid-template-columns: 1fr auto;

    & p {
      grid-column: 1 / -1;
    }
  }
`;

const titleClass = css`
  margin: 0;
  font-size: ${fonts.fontSize2};
  color: ${colors.textAccent};
`;

const arrowClass = css`
  color: ${colors.textMuted};
  font-family: ${fonts.mono};

  @media (max-width: 599px) {
    grid-column: 2;
    grid-row: 1;
  }
`;

const experiments = [
  {
    href: '/experiments/chromatic',
    title: 'Chromatic aberration',
    description: 'A playful RGB-split hover and orientation effect.',
  },
  {
    href: '/experiments/variable',
    title: 'Variable font weight',
    description: 'Interactive typography driven by pointer position.',
  },
];

export const metadata = buildMetadata({
  title: 'Experiments',
  description: 'Small interactive UI experiments by David Sancho.',
  path: '/experiments',
});

export default function ExperimentsPage() {
  return (
    <Page title={<H1>Experiments</H1>}>
      <Text color={colors.textProse}>
        Small interface and typography studies. They are public, but intentionally outside the main navigation.
      </Text>
      <Spacer top={4} />
      <ul className={listClass}>
        {experiments.map((experiment) => (
          <li key={experiment.href}>
            <ButtonLink href={experiment.href} className={itemClass}>
              <h2 className={titleClass}>{experiment.title}</h2>
              <Text color={colors.textMuted}>{experiment.description}</Text>
              <span className={arrowClass} aria-hidden="true">
                →
              </span>
            </ButtonLink>
          </li>
        ))}
      </ul>
    </Page>
  );
}
