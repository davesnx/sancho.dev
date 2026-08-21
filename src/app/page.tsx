import { css } from '@linaria/core';

import { H1, Page, Row, Spacer, Text, TextLink } from '@/components/ui';
import { buildHomeJsonLd, buildMetadata, serializeJsonLd, siteConfig } from '@/site';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

const nameClass = css`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.6px;
  color: ${colors.textAccent};
`;

export const metadata = buildMetadata({
  title: 'David Sancho',
  description: siteConfig.homeDescription,
  path: '/',
  kind: 'website',
});

const homeJsonLd = buildHomeJsonLd();

export default function HomePage() {
  return (
    <Page title={<H1 className={nameClass}>David Sancho</H1>}>
      <script type="application/ld+json">{serializeJsonLd(homeJsonLd)}</script>
      <Spacer bottom={10}>
        <Text size={fonts.fontSize1} align="left">
          A Software Engineer based in Barcelona, making software with{' '}
          <TextLink href="https://reasonml.github.io/">Reason</TextLink> and{' '}
          <TextLink href="https://ocaml.org/">OCaml</TextLink>.
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          I am currently working at <TextLink href="https://ahrefs.com/">ahrefs</TextLink>, building the UI
          infrastructure that powers their frontend in OCaml, with{' '}
          <TextLink href="https://melange.re/">Melange</TextLink>,{' '}
          <TextLink href="https://github.com/ml-in-barcelona/server-reason-react">server-reason-react</TextLink>,{' '}
          <TextLink href="https://github.com/davesnx/styled-ppx">styled-ppx</TextLink> and company.
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          My work bridges functional programming, web technologies, and maintainability. I focus on clear architecture
          and better developer tools, contribute to the broader Reason and Melange ecosystems, and co-host{' '}
          <TextLink href="https://www.twitch.tv/emelletv">emelle.tv</TextLink>, where we explore ML-family languages
          with their authors and maintainers.
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          Previously, I helped build visual app development platforms at{' '}
          <TextLink href="https://draftbit.com">Draftbit</TextLink> and spent five years at{' '}
          <TextLink href="https://www.typeform.com">Typeform</TextLink>, where I led the form rendering engine.
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          You can read more about me on the <TextLink href="/about">about</TextLink> page.
        </Text>
      </Spacer>
      <Row gap={2} justify="flex-start" wrap>
        <TextLink
          href={siteConfig.socialProfiles.github}
          color={colors.textSecondary}
          hoverColor={colors.textPrimary}
          decorationColor={colors.borderSubtle}
        >
          Github
        </TextLink>
        <TextLink
          href={siteConfig.socialProfiles.x}
          color={colors.textSecondary}
          hoverColor={colors.textPrimary}
          decorationColor={colors.borderSubtle}
        >
          (X) Twitter
        </TextLink>
        <TextLink
          href={siteConfig.socialProfiles.bluesky}
          color={colors.bluesky60}
          hoverColor={colors.bluesky}
          decorationColor={colors.bluesky20}
        >
          Bluesky
        </TextLink>
        <TextLink
          href={siteConfig.socialProfiles.discord}
          color={colors.discord60}
          hoverColor={colors.discord}
          decorationColor={colors.discord20}
        >
          Discord
        </TextLink>
        <TextLink
          href={siteConfig.socialProfiles.strava}
          color={colors.strava60}
          hoverColor={colors.strava}
          decorationColor={colors.strava20}
        >
          Strava
        </TextLink>
      </Row>
    </Page>
  );
}
