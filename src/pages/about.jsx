import React from "react";
import { graphql } from "gatsby";

import Page from "../components/page";
import Description from "./../components/description";
import Spacer from "../components/spacer";
import Icon from "../components/icon";
import Link from "../components/link";
import Text from "../components/text";
import { H1, H4 } from "../components/heading";
import Github from "./../svgs/github";
import Web from "./../svgs/web";

const GithubIcon = ({ href }) => (
  <Icon size={18} href={href} svg={Github} bg="rgba(24, 23, 23, 0.1)" />
);

const WebIcon = ({ href }) => (
  <Icon size={18} href={href} svg={Web} bg="rgba(24, 23, 23, 0.1)" />
);

const Kind = {
  Web: "Web",
  GitHub: "Github",
};

const KindToIcon = {
  Web: WebIcon,
  Github: GithubIcon,
};

const Item = ({ title, description, kind, link }) => {
  const Icon = KindToIcon[kind] || KindToIcon["Web"];

  return (
    <Spacer bottom={5}>
      <Link to={link}>
        <Spacer bottom={1}>
          <H4 inline>{title}</H4>
          <Spacer inline left={1}>
            <Icon href={link} />
          </Spacer>
        </Spacer>
      </Link>
      <Text> {description}</Text>
    </Spacer>
  );
};

export default () => {
  return (
    <Page title="About">
      <>
        <Description />
        <Spacer top={6}>
          <H1>Projects</H1>
          <Spacer top={3} />
          <Text>
            I'm a very creative person and have a mind full of ideas, some of
            them gets materialized into code and share it as Open Source
            Software, here's a bunch of them:
          </Text>
          <Spacer top={4}>
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
          </Spacer>
        </Spacer>
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
