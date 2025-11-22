import styled from "@emotion/styled";
import React from "react";

import { H1 } from "../components/heading";
import { TextLink } from "../components/link";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import Spacer from "../components/spacer";
import { Stack } from "../components/taco";
import Text from "../components/text";
import fonts from "../theme/fonts";
import { colors } from "../theme/theme";

const Content = styled.div`
  line-height: 1.7;
  color: ${colors.body90};
  font-size: ${fonts.fontSize1};
  display: block;
`;

const Bio = () => {
  return (
    <Content>
      <Text size={fonts.fontSize1} align="left">
        Hi, I'm David. A software engineer based in Barcelona, who spends the
        cold winter in the Pyrenees. My work bridges functional programming, web
        technologies and maintanability; by focusing on creating better
        developer tools and experiences with{" "}
        <TextLink href="http://reasonml.github.io/">Reason</TextLink>
        <span> and </span>
        <TextLink href="https://ocaml.org/">OCaml</TextLink>
        <span>.</span>
      </Text>
      <Spacer top={2} />
      <Text size={fonts.fontSize1}>
        I believe that the recipe for creating maintainable and powerful
        software lies in designing with clarity, sound architecture, and
        embracing the iterative nature of development. Currently working at{" "}
        <TextLink href="https://ahrefs.com/">ahrefs</TextLink>, primarily
        building developer tooling to help create nice UIs, also maintaining
        several Open Source projects in the Reason ecosystem, such as{" "}
        <TextLink href="https://github.com/reasonml/reason-react">
          reason-react
        </TextLink>{" "}
        {", "}
        <TextLink href="https://github.com/ml-in-barcelona/server-reason-react">
          server-reason-react
        </TextLink>
        and{" "}
        <TextLink href="https://github.com/davesnx/styled-ppx">
          styled-ppx
        </TextLink>
        {"."}
      </Text>
      <Spacer top={2} />
      <Text size={fonts.fontSize1}>
        I also contribute to the broader Reason and Melange ecosystems and
        co-host{" "}
        <TextLink href="https://www.twitch.tv/emelletv">emelle.tv</TextLink>,
        where we explore ML-family languages and meet incredible authors from
        the ecosystem.
      </Text>

      <Spacer top={2} />
      <Text size={fonts.fontSize1}>
        Previously, I helped build visual app development platforms at{" "}
        <TextLink href="https://draftbit.com">Draftbit</TextLink> for a year{" "}
        and, even before, worked at{" "}
        <TextLink href="https://www.typeform.com">Typeform</TextLink> for 5
        years where I lead the form rendering engine.
      </Text>

      <Spacer top={2} />
      <Text size={fonts.fontSize1}>
        Want to chat? DM me on{" "}
        <TextLink href="https://x.com/davesnx">Twitter</TextLink> or{" "}
        <TextLink href="https://bsky.app/profile/david.sancho.dev">
          Bluesky
        </TextLink>
      </Text>
    </Content>
  );
};

const About = () => {
  return (
    <>
      <MetaData title="About" />
      <Page title={<H1>About</H1>}>
        <Stack align="left" gap={5}>
          <Bio />
        </Stack>
      </Page>
    </>
  );
};

export default About;
