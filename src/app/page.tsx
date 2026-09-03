import { css } from '@linaria/core';
import type { Metadata } from 'next';

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
    <Page title={<H1 className={nameClass}>David Sancho</H1>}>
      <Spacer bottom={10}>
        <Text size={fonts.fontSize1} align="left">
          Remote Software Engineer based in Andorra, making software with{' '}
          <TextLink href="https://ocaml.org/">OCaml</TextLink>.
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          I am currently working at <TextLink href="https://ahrefs.com/">ahrefs</TextLink>, building the UI
          infrastructure that powers their frontend, with <TextLink href="https://melange.re/">Melange</TextLink>,{' '}
          <TextLink href="https://github.com/ml-in-barcelona/server-reason-react">server-reason-react</TextLink>,{' '}
          <TextLink href="https://github.com/davesnx/styled-ppx">styled-ppx</TextLink> and company.
        </Text>
        <Spacer top={2} />
        <Text size={fonts.fontSize1}>
          You can read more about me on the <TextLink href="/about">about</TextLink> page.
        </Text>
      </Spacer>
      <SocialLinks />
    </Page>
  );
}
