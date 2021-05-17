import React from "react";

import Page from "../components/page";
import { Item, Kind } from "../components/item";
import { StackWithDivider } from "../components/taco";

const Talks = () => (
  <Page title="Talks">
    <StackWithDivider gap={5}>
      <Item
        title="The needed introduction to make a ppx"
        description="ReasonSTHLM November: An introduction to demystify implementing a preprocessor extension for OCaml"
        kind={Kind.YouTube}
        link="https://youtu.be/dMoRMqQ6GLs?t=4206"
      />
      <Item
        title="Presenting styled-ppx"
        description="ReasonSTHLM May: Talk about my experience building and using styled-ppx"
        kind={Kind.YouTube}
        link="https://www.youtube.com/watch?v=ekHCBZiCviM"
      />
      <Item
        title="CSS-in-Reason and OCaml"
        description="NearForm WFH Conf 2020: Present the status quo of writting CSS inside ReasonReact apps and my approach to fix it"
        kind={Kind.YouTube}
        link="https://www.youtube.com/watch?v=D8WhIeMIZQc"
      />
    </StackWithDivider>
  </Page>
);

export default Talks;
