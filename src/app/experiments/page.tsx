import { css } from "@linaria/core";

import { ButtonLink, H1, Page, Text } from "@/components/ui";
import { buildMetadata } from "@/site";
import fonts from "@/theme/fonts";
import { colors } from "@/theme/theme";

const gridClass = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

const cardClass = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid ${colors.borderStrong};
  background: ${colors.backgroundSecondary};
  text-decoration: none;
`;

const cardTitleClass = css`
  margin: 0;
  font-size: ${fonts.fontSize2};
  color: ${colors.textAccent};
`;

const experiments = [
  {
    href: "/experiments/chromatic",
    title: "Chromatic aberration",
    description: "A playful RGB-split hover and orientation effect.",
  },
  {
    href: "/experiments/variable",
    title: "Variable font weight",
    description: "Interactive typography driven by pointer position.",
  },
];

export const metadata = buildMetadata({
  title: "Experiments",
  description: "Small interactive UI experiments by David Sancho.",
  path: "/experiments",
});

export default function ExperimentsPage() {
  return (
    <Page title={<H1>Experiments</H1>}>
      <div className={gridClass}>
        {experiments.map((experiment) => (
          <ButtonLink key={experiment.href} href={experiment.href} className={cardClass}>
            <h2 className={cardTitleClass}>{experiment.title}</h2>
            <Text color={colors.textSecondary}>{experiment.description}</Text>
          </ButtonLink>
        ))}
      </div>
    </Page>
  );
}
