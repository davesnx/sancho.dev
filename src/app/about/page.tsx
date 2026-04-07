import { css } from "@linaria/core";

import { buildMetadata } from "../../lib/site";
import fonts from "../../theme/fonts";
import { H1, Page, Spacer, Stack, Text, TextLink } from "../../components/ui";

const contentClass = css`
  display: block;
  line-height: 1.7;
  font-size: ${fonts.fontSize1};
`;

export const metadata = buildMetadata({
  title: "About",
  description: "About David Sancho: software engineer in Barcelona working on OCaml, developer tooling, and UI infrastructure at ahrefs.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Page title={<H1>About</H1>}>
      <Stack align="flex-start" gap={5}>
        <div className={contentClass}>
          <Text size={fonts.fontSize1} align="left">
            Hi, I&apos;m David. A software engineer based in Barcelona, who spends the cold winter in the Pyrenees. My work bridges functional programming, web technologies and maintanability; by focusing on creating better developer tools and experiences with <TextLink href="http://reasonml.github.io/">Reason</TextLink> and <TextLink href="https://ocaml.org/">OCaml</TextLink>.
          </Text>
          <Spacer top={2} />
          <Text size={fonts.fontSize1}>
            I believe that the recipe for creating maintainable and powerful software lies in designing with clarity, sound architecture, and embracing the iterative nature of development. Currently working at <TextLink href="https://ahrefs.com/">ahrefs</TextLink>, primarily building developer tooling to help create nice UIs, also maintaining several Open Source projects in the Reason ecosystem, such as <TextLink href="https://github.com/reasonml/reason-react">reason-react</TextLink>, <TextLink href="https://github.com/ml-in-barcelona/server-reason-react">server-reason-react</TextLink> and <TextLink href="https://github.com/davesnx/styled-ppx">styled-ppx</TextLink>.
          </Text>
          <Spacer top={2} />
          <Text size={fonts.fontSize1}>
            I also contribute to the broader Reason and Melange ecosystems and co-host <TextLink href="https://www.twitch.tv/emelletv">emelle.tv</TextLink>, where we explore ML-family languages and meet incredible authors from the ecosystem.
          </Text>
          <Spacer top={2} />
          <Text size={fonts.fontSize1}>
            Previously, I helped build visual app development platforms at <TextLink href="https://draftbit.com">Draftbit</TextLink> for a year and, even before, worked at <TextLink href="https://www.typeform.com">Typeform</TextLink> for 5 years where I lead the form rendering engine.
          </Text>
          <Spacer top={2} />
          <Text size={fonts.fontSize1}>
            Want to chat? DM me on <TextLink href="https://x.com/davesnx">Twitter</TextLink> or <TextLink href="https://bsky.app/profile/david.sancho.dev">Bluesky</TextLink>
          </Text>
        </div>
      </Stack>
    </Page>
  );
}
