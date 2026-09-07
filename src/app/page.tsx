import { css } from '@linaria/core';
import type { Metadata } from 'next';

import { IconTextLink } from '@/components/icon-text-link';
import { SocialLinks } from '@/components/social-links';
import { H1, Page, Spacer, Text, TextLink } from '@/components/ui';
import { buildMetadata } from '@/site';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

const nameClass = css`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.6px;
  color: ${colors.textAccent};
`;

export const metadata: Metadata = buildMetadata({
  title: 'David Sancho',
  description:
    'David Sancho writes about Software engineering: OCaml, Melange, Reason, React infrastructure and Open Source',
  path: '/',
  kind: 'website',
});

export default function HomePage() {
  return (
    <Page title={<H1 className={nameClass}>Hi, I'm David Sancho</H1>}>
      <Spacer bottom={10}>
        <Text size={fonts.fontSize1} align="left">
          Welcome to my little space on the internet.
        </Text>
        <Text size={fonts.fontSize1} align="left">
          I work as a Remote Software Engineer based in Andorra, making software with{' '}
          <IconTextLink href="https://ocaml.org/" icon="/logos/ocaml-icon.svg" aria-label="OCaml">
            OCaml
          </IconTextLink>
          .
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          Currently working at{' '}
          <IconTextLink href="https://ahrefs.com/" icon="/logos/ahrefs-icon.svg" aria-label="ahrefs">
            ahrefs
          </IconTextLink>
          , building the UI infrastructure with{' '}
          <IconTextLink href="https://melange.re/" icon="/logos/github-icon.svg" aria-label="Melange">
            Melange
          </IconTextLink>
          ,{' '}
          <IconTextLink
            href="https://github.com/ml-in-barcelona/server-reason-react"
            icon="https://avatars.githubusercontent.com/u/71291184?s=80&v=4"
            aria-label="server-reason-react"
          >
            server-reason-react
          </IconTextLink>
          ,{' '}
          <IconTextLink
            href="https://github.com/davesnx/styled-ppx"
            icon="https://avatars.githubusercontent.com/u/3763599?s=80&v=4"
            aria-label="styled-ppx"
          >
            styled-ppx
          </IconTextLink>{' '}
          and company.
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          Trying to express myself on <TextLink href="/blog">blog</TextLink> and you can read more about me on the{' '}
          <TextLink href="/about">about</TextLink> page.
        </Text>
      </Spacer>
      <SocialLinks />
    </Page>
  );
}
