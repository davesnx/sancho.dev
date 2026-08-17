import { css } from '@linaria/core';

import { JsonLd } from '@/components/json-ld';
import { H1, Page, Row, Spacer, Text, TextLink } from '@/components/ui';
import { buildMetadata, buildPersonJsonLd, buildWebPageJsonLd } from '@/site';
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
  description:
    'David Sancho writes about OCaml, Melange, Reason, React infrastructure, and open source software engineering.',
  path: '/',
  kind: 'website',
});

export default function HomePage() {
  return (
    <Page title={<H1 className={nameClass}>David Sancho</H1>}>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            title: 'David Sancho',
            description: metadata.description as string,
            path: '/',
          }),
          buildPersonJsonLd(),
        ]}
      />
      <Spacer bottom={10}>
        <Text size={fonts.fontSize1} align="left">
          I am a software engineer based in Barcelona, working where functional programming meets the web.
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          At <TextLink href="https://ahrefs.com/">Ahrefs</TextLink>, I build the OCaml UI infrastructure behind its
          frontend. My work includes <TextLink href="https://melange.re/">Melange</TextLink>,{' '}
          <TextLink href="https://reasonml.github.io/">Reason</TextLink>,{' '}
          <TextLink href="https://github.com/ml-in-barcelona/server-reason-react">server-reason-react</TextLink>, and{' '}
          <TextLink href="https://github.com/davesnx/styled-ppx">styled-ppx</TextLink>.
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          You can read more about me on the <TextLink href="/about">about</TextLink> page.
        </Text>
      </Spacer>
      <Row gap={2} justify="flex-start" wrap>
        <TextLink
          href="https://github.com/davesnx"
          color={colors.textMuted}
          hoverColor={colors.textPrimary}
          decorationColor={colors.textMuted}
        >
          GitHub
        </TextLink>
        <TextLink
          href="https://x.com/davesnx"
          color={colors.textMuted}
          hoverColor={colors.textPrimary}
          decorationColor={colors.textMuted}
        >
          X
        </TextLink>
        <TextLink
          href="https://bsky.app/profile/david.sancho.dev"
          color={colors.textMuted}
          hoverColor={colors.textPrimary}
          decorationColor={colors.textMuted}
        >
          Bluesky
        </TextLink>
        <TextLink
          href="https://discordapp.com/users/122441959414431745"
          color={colors.textMuted}
          hoverColor={colors.textPrimary}
          decorationColor={colors.textMuted}
        >
          Discord
        </TextLink>
        <TextLink
          href="https://www.strava.com/athletes/davesnx"
          color={colors.textMuted}
          hoverColor={colors.textPrimary}
          decorationColor={colors.textMuted}
        >
          Strava
        </TextLink>
      </Row>
    </Page>
  );
}
