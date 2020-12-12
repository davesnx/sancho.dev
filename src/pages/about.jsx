import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";

import Page from "../components/page";
import Description from "./../components/description";
import Spacer from "../components/spacer";
import LinkIcon from "../components/link-icon";
import Link from "../components/link";
import Text from "../components/text";
import { H1, H4 } from "../components/heading";
import { Stack, Row } from "../components/taco";
import colors from "./../components/colors";
import Github from "./../svgs/github";
import Web from "./../svgs/web";
import YouTube from "./../svgs/youtube";

const StackWidthDivider = styled(Stack)`
  & > *:not(:last-child) {
    padding-bottom: 40px;
    border-bottom: 1px solid ${colors.fadedBlack};
  }
`;

const GithubIcon = ({ href }) => (
  <LinkIcon size={38} href={href} svg={Github} bg="rgba(24, 23, 23, 0.1)" />
);

const WebIcon = ({ href }) => (
  <LinkIcon size={38} href={href} svg={Web} bg="rgba(24, 23, 23, 0.1)" />
);

const YouTubeIcon = ({ href }) => (
  <LinkIcon size={38} href={href} svg={YouTube} bg="rgba(24, 23, 23, 0.1)" />
);

const Kind = {
  Web: "Web",
  GitHub: "Github",
  YouTube: "YouTube",
};

const KindToIcon = {
  Web: WebIcon,
  Github: GithubIcon,
  YouTube: YouTubeIcon,
};

const NotShrink = styled.div`
  flex-shrink: 0;
`;

const Item = ({ title, description, kind, link }) => {
  const Icon = KindToIcon[kind] || KindToIcon["Web"];

  return (
    <Row fullWidth align="center" distribute="between" gap={2}>
      <Link to={link}>
        <div>
          <Stack align="left" gap={2}>
            <H4>{title}</H4>
            <Text>{description}</Text>
          </Stack>
        </div>
      </Link>
      <NotShrink>
        <Icon href={link} />
      </NotShrink>
    </Row>
  );
};

const Projects = () => (
  <>
    <H1>Projects</H1>
    <Spacer top={3} />
    <Text>
      I'm a very creative person and have a mind full of ideas, some of them
      gets materialized into code and share it as Open Source Software, here's a
      bunch of them:
    </Text>
    <Spacer top={4} />
    <StackWidthDivider gap={5}>
      <Item
        title="styled-ppx"
        description="The ppx that enables CSS-in-Reason. Writting styled components with type-safety CSS, build on top of emotion, allows you to style apps quickly, performant and as you always done it."
        kind={Kind.GitHub}
        link="https://github.com/davesnx/styled-ppx"
      />
      <Item
        title="query-json"
        description="Faster and simpler implementation of jq in Reason Native, made it for learning purposes and achived 2x and 5x performance over jq"
        kind={Kind.GitHub}
        link="https://github.com/davesnx/query-json"
      />
      <Item
        title="serverless playground for query-json"
        description="Run query-json as a JavaScript library, using js_of_ocaml allows to have a playground that runs without a server and can run the execution syncronously."
        kind={Kind.Web}
        link="https://query-json.netlify.app"
      />
      <Item
        title="reason-react-rules-of-hooks-ppx"
        description="Validates the rules of React hooks in Reason and OCaml"
        link="https://github.com/reason-in-barcelona/react-rules-of-hooks-ppx"
        kind={Kind.GitHub}
      />
      <Item
        title="learn-ramda"
        description="It's a website to lean interactively all the methods in ramda, a famous functional programming library in JavaScript"
        kind={Kind.Web}
        link="https://davesnx.github.io/learn-ramda"
      />
      <Item
        title="dinosaur"
        description="Chrome's dinosaur game when you are offline. Game build with Revery (reason-native)."
        kind={Kind.GitHub}
        link="https://github.com/davesnx/dinosaur"
      />
      <Item
        title="shelm"
        description="A toy elm app to explore the language, it's a basic frontend app simulating a shell terminal."
        kind={Kind.GitHub}
        link="https://github.com/davesnx/shelm"
      />
    </StackWidthDivider>
  </>
);

const Talks = () => (
  <>
    <H1>Talks</H1>
    <Spacer top={3} />
    <StackWidthDivider gap={5}>
      <Item
        title="The needed introduction to make a ppx"
        description="An introduction to make your first ppx, your first OCaml preprocessor extension - ReasonSTHLM November"
        kind={Kind.YouTube}
        link="https://youtu.be/dMoRMqQ6GLs?t=4206"
      />
      <Item
        title="Presenting styled-ppx"
        description="Talk about my experience building and using styled-ppx - ReasonSTHLM May"
        kind={Kind.YouTube}
        link="https://www.youtube.com/watch?v=ekHCBZiCviM"
      />
      <Item
        title="CSS-in-Reason and OCaml"
        description="Present the status quo of writting CSS inside ReasonReact apps and my approach to fix it - NearForm WFH Conf 2020"
        kind={Kind.YouTube}
        link="https://www.youtube.com/watch?v=D8WhIeMIZQc"
      />
    </StackWidthDivider>
  </>
);

export default () => {
  return (
    <Page title="About">
      <>
        <Description />
        <Spacer top={10} />
        <Projects />
        <Spacer top={10} />
        <Talks />
      </>
    </Page>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
