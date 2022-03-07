import React from "react";

import Page from "../components/page";
import Spacer from "../components/spacer";

import Text from "../components/text";
import { Item, Kind } from "../components/item";
import { Stack } from "../components/taco";

let Projects = () => (
  <Page title="Projects">
    <Text>
      I'm a very creative person and have a mind full of ideas, some of them
      gets materialized into code and eventually shared it as Open Source,
      here's a list of them
    </Text>
    <Spacer top={4} />
    <Stack gap={5}>
      <Item
        title="styled-ppx"
        description="The ppx that enables CSS-in-Reason. Writting styled components with type-safety CSS, build on top of emotion, allows you to style apps quickly, performant and as you always done it."
        kind={Kind.GitHub}
        meta="Reason"
        link="https://github.com/davesnx/styled-ppx"
      />
      <Item
        title="query-json"
        description="Faster and simpler implementation of jq in Reason, made it for learning purposes and achived 2x and 5x performance over jq"
        kind={Kind.GitHub}
        meta="Reason"
        link="https://github.com/davesnx/query-json"
      />
      <Item
        title="playground for query-json"
        description="Run query-json as a JavaScript library, using js_of_ocaml to compile to JavaScript. Made a serverless playground where compiling, parsing and running queries happens syncronously"
        kind={Kind.Web}
        meta="Reason"
        link="https://query-json.netlify.app"
      />
      <Item
        title="reason-react-rules-of-hooks-ppx"
        description="Validates the rules of React hooks in Reason and OCaml"
        link="https://github.com/reason-in-barcelona/react-rules-of-hooks-ppx"
        meta="Reason"
        kind={Kind.GitHub}
      />
      <Item
        title="learn-ramda"
        description="It's a website to lean interactively all the methods in ramda, a famous functional programming library in JavaScript"
        kind={Kind.Web}
        meta="JavaScript"
        link="https://davesnx.github.io/learn-ramda"
      />
      <Item
        title="dinosaur"
        description="Chrome's dinosaur game when you are offline. Game build with Revery (reason-native)."
        kind={Kind.GitHub}
        meta="Reason"
        link="https://github.com/davesnx/dinosaur"
      />
      <Item
        title="shelm"
        description="A toy elm app to explore the language, it's a basic frontend app simulating a shell terminal."
        kind={Kind.GitHub}
        meta="Elm"
        link="https://github.com/davesnx/shelm"
      />
    </Stack>
  </Page>
);

export default Projects;
