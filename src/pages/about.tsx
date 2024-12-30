import styled from "@emotion/styled";
import React from "react";

import { H1 } from "../components/heading";
import { TextLink } from "../components/link";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import { ListItem, UnorderList } from "../components/list";
import Spacer from "../components/spacer";
import { Stack } from "../components/taco";
import Text from "../components/text";
import fonts from "../theme/fonts";
import { colors } from "../theme/theme";
import { rgba } from "../theme/color";

const Content = styled.div`
  line-height: 1.7;
  color: ${rgba(colors.body, 0.9)};
  font-size: ${fonts.fontSize1};
  display: block;
`;

const Bio = () => {
  return (
    <Content>
      <Text size={fonts.fontSize1} align="left">
        Hi, I'm David. A software engineer based in Barcelona, with winters spent skiing in the Pyrenees. My work bridges functional programming and web technologies, focusing on creating better developer tools and experiences with {" "}
        <TextLink href="http://reasonml.github.io/">Reason</TextLink>
        <span> and </span>
        <TextLink href="https://ocaml.org/">OCaml</TextLink>
        <span>.</span>
      </Text>

      <Spacer top={2} />
      <Text size={fonts.fontSize1}>
        I believe clarity in the design, a sound architecture, and the evolution of software are the foundation of building powerful and maintainable software. Working at{' '}
        <TextLink href="https://ahrefs.com/">ahrefs</TextLink>
        , I'm building developer tooling while maintaining several Open Source projects in the Reason ecosystem, including:
      </Text>

      <Spacer top={2} />
      <UnorderList>
        <ListItem>
          <TextLink href="https://github.com/reasonml/reason-react">reason-react</TextLink> Official React bindings for Reason and Melange
        </ListItem>
        <ListItem>
          <TextLink href="https://github.com/davesnx/styled-ppx">styled-ppx</TextLink> Type-safe styled components for ReScript, Melange, and native
        </ListItem>
        <ListItem>
          <TextLink href="https://github.com/ml-in-barcelona/server-reason-react">server-reason-react</TextLink> Native server-side rendering for Reason React components
        </ListItem>
      </UnorderList>

      <Spacer top={2} />
      <Text size={fonts.fontSize1}>
        I also contribute to the broader Reason and Melange ecosystems and co-host{' '}
        <TextLink href="https://www.twitch.tv/emelletv">emelle.tv</TextLink>
        , where we explore ML-family languages and meet incredible authors of the ecosystem.
      </Text>

      <Spacer top={2} />
      <Text size={fonts.fontSize1}>
        Previously, I helped build visual app development platforms at{' '}
        <TextLink href="https://draftbit.com">Draftbit</TextLink>
        {' '}and architected the form rendering engine during my 5 years at{' '}
        <TextLink href="https://www.typeform.com">Typeform</TextLink>
        . My technical interests span compilers, type systems, scalable systems, and startup cultures.
      </Text>

      <Spacer top={2} />
      <Text size={fonts.fontSize1}>
        Want to chat? DM me on{' '}
        <TextLink href="https://x.com/davesnx">Twitter</TextLink>
        {' '}or{' '}
        <TextLink href="https://bsky.app/profile/david.sancho.dev">Bluesky</TextLink>
      </Text>
    </Content>
  );
};

let About = () => {
  return (
    <>
      <MetaData title="About" />
      <Page title={<H1>About</H1>}>
        <Stack align="left" gap={5}>
          <Bio />
        </Stack>
      </Page >
    </>
  );
};

export default About;
