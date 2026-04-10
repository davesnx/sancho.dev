import { css } from "@linaria/core";

import { H1, Page, Row, Spacer, Text, TextLink } from "@/components/ui";
import { buildMetadata } from "@/site";
import fonts from "@/theme/fonts";
import { colors } from "@/theme/theme";

const nameClass = css`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.6px;
  color: ${colors.textAccent};
`;

export const metadata = buildMetadata({
  title: "David Sancho",
  description: "David Sancho writes about OCaml, Melange, Reason, React infrastructure, and open source software engineering.",
  path: "/",
  kind: "website",
});

export default function HomePage() {
  return (
    <Page
      title={
        <H1 className={nameClass}>David Sancho</H1>
      }
    >
      <Spacer bottom={10}>
        <Text size={fonts.fontSize1} align="left">
          A Software Engineer based in Barcelona, making software with <TextLink href="http://reasonml.github.io/">Reason</TextLink> and <TextLink href="https://ocaml.org/">OCaml</TextLink>
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          I am currently working at <TextLink href="https://ahrefs.com/">ahrefs</TextLink>, making tools that help developers build great user interfaces.
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          You can read more about me on the <TextLink href="/about">about</TextLink> page.
        </Text>
      </Spacer>
      <Row gap={2} justify="flex-start" wrap>
        <TextLink href="https://github.com/davesnx" color={colors.textSecondary} hoverColor={colors.textPrimary} decorationColor={colors.borderSubtle}>
          Github
        </TextLink>
        <TextLink href="https://x.com/davesnx" color={colors.textSecondary} hoverColor={colors.textPrimary} decorationColor={colors.borderSubtle}>
          (X) Twitter
        </TextLink>
        <TextLink href="https://bsky.app/profile/david.sancho.dev" color={colors.bluesky60} hoverColor={colors.bluesky} decorationColor={colors.bluesky20}>
          Bluesky
        </TextLink>
        <TextLink href="https://discordapp.com/users/122441959414431745" color={colors.discord60} hoverColor={colors.discord} decorationColor={colors.discord20}>
          Discord
        </TextLink>
        <TextLink href="https://www.strava.com/athletes/davesnx" color={colors.strava60} hoverColor={colors.strava} decorationColor={colors.strava20}>
          Strava
        </TextLink>
      </Row>
    </Page>
  );
}
