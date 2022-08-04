import React from "react";

import Page from "../components/page";
import { Item, Kind } from "../components/item";
import { Stack } from "../components/taco";
import { H1 } from "../components/heading";

let Talks = () => (
  <Page title={<H1>Talks</H1>}>
    <Stack gap={5}>
      <Item
        title="The needed introduction to make a ppx"
        description="An introduction to make your first ppx, your first OCaml preprocessor extension"
        meta="ReasonSTHLM November 2020"
        kind={Kind.YouTube}
        link="https://youtu.be/dMoRMqQ6GLs?t=4206"
      />
      <Item
        title="Presenting styled-ppx"
        description="Talk about my experience building and using styled-ppx"
        meta={"ReasonSTHLM May 2020"}
        kind={Kind.YouTube}
        link="https://www.youtube.com/watch?v=ekHCBZiCviM"
      />
      <Item
        title="CSS-in-Reason and OCaml"
        description="Present the status quo of writting CSS inside ReasonReact apps and my approach to fix it"
        meta={"NearForm WFH Conf 2020"}
        kind={Kind.YouTube}
        link="https://www.youtube.com/watch?v=D8WhIeMIZQc"
      />
    </Stack>
  </Page>
);

export default Talks;
