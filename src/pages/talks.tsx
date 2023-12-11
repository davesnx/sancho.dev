import React from "react";

import { H1 } from "../components/heading";
import { Item, Kind } from "../components/item";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import { Stack } from "../components/taco";

let Talks = () => (
  <>
    <MetaData title="Talks" />
    <Page title={<H1>Talks</H1>}>
      <Stack gap={5}>
        <Item
          title="Server-side rendering React natively with Reason"
          description="Presenting server-reason-react, some context of the language and the library. What it means to render React in OCaml. How we use it at Ahrefs.com. A benchmark against a Node equivalent, and the future of all of this."
          meta="React Alicante 2023"
          kind={Kind.YouTube}
          link="https://www.youtube.com/watch?v=e3qY-Eg9zRY"
        />
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
  </>
);

export default Talks;
