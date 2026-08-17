import { css } from '@linaria/core';
import { JsonLd } from '@/components/json-ld';
import { H1, H2, Page, Stack, Text, TextLink } from '@/components/ui';
import { buildMetadata, buildWebPageJsonLd } from '@/site';
import fonts from '@/theme/fonts';
import { colors } from '@/theme/theme';

const introClass = css`
  max-width: 72ch;
`;

const sectionTitleClass = css`
  margin-bottom: 1rem;
`;

const listClass = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const itemClass = css`
  max-width: 72ch;
  color: ${colors.textProse};
  font-family: ${fonts.sans};
`;

export const metadata = buildMetadata({
  title: 'Credits',
  description: 'The tools, typefaces, and references behind sancho.dev.',
  path: '/credits',
});

export default function CreditsPage() {
  return (
    <Page title={<H1>Credits</H1>}>
      <JsonLd
        data={buildWebPageJsonLd({
          title: 'Credits',
          description: 'The tools, typefaces, and references behind sancho.dev.',
          path: '/credits',
        })}
      />
      <Stack gap={8} align="flex-start">
        <Text className={introClass} size={fonts.fontSize1} color={colors.textProse}>
          sancho.dev is designed, written, and built by David Sancho. It also depends on the work and ideas below.
        </Text>

        <section aria-labelledby="credits-type">
          <H2 id="credits-type" className={sectionTitleClass}>
            Type
          </H2>
          <ul className={listClass}>
            <li className={itemClass}>
              <TextLink href="https://fonts.google.com/specimen/DM+Sans">DM Sans</TextLink> carries the interface and
              prose.
            </li>
            <li className={itemClass}>
              <TextLink href="https://www.jetbrains.com/lp/mono/">JetBrains Mono</TextLink> carries code and metadata.
            </li>
            <li className={itemClass}>
              <TextLink href="https://rsms.me/inter/">Inter</TextLink> powers the variable-font experiment.
            </li>
          </ul>
        </section>

        <section aria-labelledby="credits-tools">
          <H2 id="credits-tools" className={sectionTitleClass}>
            Tools
          </H2>
          <ul className={listClass}>
            <li className={itemClass}>
              Built with <TextLink href="https://nextjs.org/">Next.js</TextLink>,{' '}
              <TextLink href="https://react.dev/">React</TextLink>, and local{' '}
              <TextLink href="https://mdxjs.com/">MDX</TextLink> files.
            </li>
            <li className={itemClass}>
              Styles are extracted with <TextLink href="https://linaria.dev/">Linaria</TextLink>.
            </li>
            <li className={itemClass}>
              Code highlighting uses <TextLink href="https://shiki.style/">Shiki</TextLink> and TextMate grammars.
            </li>
            <li className={itemClass}>
              The source is available on <TextLink href="https://github.com/davesnx/sancho.dev">GitHub</TextLink>.
            </li>
          </ul>
        </section>

        <section aria-labelledby="credits-inspiration">
          <H2 id="credits-inspiration" className={sectionTitleClass}>
            References
          </H2>
          <ul className={listClass}>
            <li className={itemClass}>
              <TextLink href="https://impeccable.style/">Impeccable</TextLink> helped define the design review and
              implementation discipline.
            </li>
            <li className={itemClass}>
              <TextLink href="https://stephango.com/vanilla">Steph Ango's Vanilla</TextLink> helped sharpen the
              restrained, text-first direction.
            </li>
            <li className={itemClass}>
              <TextLink href="https://danilowoz.com/">Danilo Wozniak's site</TextLink> informed link, navigation, and
              article-back interactions.
            </li>
            <li className={itemClass}>
              <TextLink href="https://markdotto.com/2024/06/03/working-with-mdx-nextjs/">
                Mark Otto's MDX notes
              </TextLink>{' '}
              were a useful reference for local content and static routes.
            </li>
          </ul>
        </section>
      </Stack>
    </Page>
  );
}
