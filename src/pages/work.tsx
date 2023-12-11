import React from "react";

import { H1, H2 } from "../components/heading";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import Spacer from "../components/spacer";
import { Stack } from "../components/taco";
import Text from "../components/text";
import font from "../theme/fonts";
import { TextLink } from "../components/link";

let Work = () => (
  <>
    <MetaData title="Work" />
    <Page title={<H1>Work</H1>}>
      <Spacer top={3} />
      <Text>{`I author (or maintain) a few open-source projects:`}</Text>
      <Spacer top={3} />
      <Stack gap={3} align="left">
        <Text>
          <TextLink href="https://github.com/davesnx/styled-ppx">
            styled-ppx
          </TextLink>
          Type-safe styled components for ReScript and Melange with type-safe
          CSS, including a CSS parser and type-checker.
        </Text>

        <Text>
          <TextLink href="https://github.com/ml-in-barcelona/server-reason-react">
            server-reason-react
          </TextLink>
          Server rendering Reason React components in OCaml using Reason.
        </Text>

        <Text>
          <TextLink href="https://github.com/reasonml/reason-react">
            reason-react
          </TextLink>
          Reason bindings for React.js
        </Text>

        <Text>
          <TextLink href="https://github.com/reasonml/reason">Reason</TextLink>A
          programming language that combines the JavaScript and OCaml
          ecosystems. It is simple, fast, and type-safe.
        </Text>

        <Text>
          <TextLink href="https://github.com/melange-re/melange">
            Melange
          </TextLink>
          A mixture of tools combined to produce JavaScript from OCaml and
          Reason
        </Text>

        <Text>
          <TextLink href="https://github.com/davesnx/html_of_jsx/">
            Html_of_jsx
          </TextLink>
          An OCaml library to render HTML with JSX
        </Text>

        <Text>
          <TextLink href="https://github.com/davesnx/ocaml-box">
            ocaml-box
          </TextLink>
          OCaml library to render boxes in the terminal with OCaml or Reason.
          (First opam package)
        </Text>

        <Text>
          <TextLink href="https://github.com/davesnx/taco">taco</TextLink>
          Layout primitives written with ReasonReact and styled-ppx
        </Text>

        <Text>
          <TextLink href="https://github.com/davesnx/query-json">
            query-json
          </TextLink>
          Faster, simpler and more portable implementation of `jq` in Reason
        </Text>

        <Text>
          <TextLink href="https://query-json.netlify.app/">
            {`query-json's playground`}
          </TextLink>
          Backendless playground for query-json to play, explore and learn.
          Build with Js_of_ocaml with jsoo-react
        </Text>

        <Text>
          <TextLink href="https://davesnx.github.io/learn-ramda/">
            {`Learn ramda, the interactive way`}
          </TextLink>
          Website to teach Ramda.js interactively. Build with React.
        </Text>

        <Spacer top={2} />
      </Stack>
      <Spacer bottom={3}>
        <H2>Experience</H2>
      </Spacer>
      <Stack gap={5} align="left">
        <Stack gap={1} align="left">
          <Text size={font.fontSize2}>
            <TextLink href="https://ahrefs.com">Ahrefs</TextLink>
          </Text>
          <Text wieght={400}>{" (2021 - now)"}</Text>
          <Text>{"Design system, tooling and Open Source."}</Text>
        </Stack>
        <Stack gap={1} align="left">
          <Text size={font.fontSize2}>
            <TextLink href="https://draftbit.com">Draftbit</TextLink>
          </Text>
          <Text wieght={400}>{" (2020 - 2021)"}</Text>
          <Text>{"Fullstack product development"}</Text>
        </Stack>

        <Stack gap={1} align="left">
          <Text size={font.fontSize2}>
            <TextLink href="https://typeform.com">Typeform</TextLink>
          </Text>
          <Text wieght={400}>{" (2014 - 2019)"}</Text>
          <Text>{"Software Engineer"}</Text>
        </Stack>

        <Stack gap={1} align="left">
          <Text size={font.fontSize2}>
            <TextLink href="https://ofteria.com">Ofertia</TextLink>
          </Text>
          <Text wieght={400}>{" (2013)"}</Text>
          <Text>
            {"Web development"}
            {/* Backend systems with PHP with Laravel, MySQL and Apache */}
          </Text>
        </Stack>

        <Stack gap={1} align="left">
          <Text size={font.fontSize2}>Freelance</Text>
          <Text wieght={400}>{" (2010 - 2013)"}</Text>
          <Text>{"Web development"}</Text>
        </Stack>
      </Stack>
    </Page>
  </>
);

export default Work;
