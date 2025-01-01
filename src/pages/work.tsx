import styled from "@emotion/styled";
import React from "react";

import { H1, H2 } from "../components/heading";
import { TextLink } from "../components/link";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import Spacer from "../components/spacer";
import { Row, Stack } from "../components/taco";
import Text from "../components/text";
import { rgb, rgba } from "../theme/color";
import font from "../theme/fonts";
import { colors } from "../theme/theme";

let Job = ({
  company,
  date,
  role,
}: {
  company: { name: string; url: string | null };
  date: string;
  role: string;
}) => (
  <Stack gap={1} align="left" fullWidth>
    <Row distribute="between" fullWidth>
      {company.url && (
        <Text weight={400} size={font.fontSize2}>
          <TextLink href={company.url}>{company.name}</TextLink>
        </Text>
      )}
      {!company.url && (
        <Text weight={400} size={font.fontSize2}>
          {company.name}
        </Text>
      )}
      <Text wieght={400} size={font.fontSize2}>
        {date}
      </Text>
    </Row>
    <Text>{role}</Text>
  </Stack>
);

let OpenSourceItem = styled.a`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  cursor: pointer;

  text-decoration: none;

  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${rgba(colors.contrastCodeBackground, 1)};

  &:hover {
    background-color: ${rgba(colors.contrastCodeBackground, 0.2)};
  }
`;
let OpenSource = ({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) => (
  <OpenSourceItem href={url} target="_blank">
    <Text weight={600} size={font.fontSize2}>
      {name}
    </Text>
    <Text size={font.fontSize1}>{description}</Text>
  </OpenSourceItem>
);

let Work = () => (
  <>
    <MetaData title="Work" />
    <Page title={<H1>Work</H1>}>
      <Spacer top={3} />
      <Text>{`I author, maintain or co-maintain a few open-source projects`}</Text>
      <Spacer top={3} />
      <Stack gap={3} align="left">
        <OpenSource
          name="styled-ppx"
          description="Styled components for ReScript and Melange with type-safe CSS, including a CSS parser and CSS type-checker."
          url="https://github.com/davesnx/styled-ppx"
        />
        <OpenSource
          name="server-reason-react"
          description="Server rendering Reason React components in OCaml using Reason."
          url="https://github.com/ml-in-barcelona/server-reason-react"
        />
        <OpenSource
          name="reason-react"
          description="Reason bindings for React.js"
          url="https://github.com/reasonml/reason-react"
        />
        <OpenSource
          name="reason"
          description="A programming language that combines the JavaScript and OCaml ecosystems."
          url="https://github.com/reasonml/reason"
        />
        <OpenSource
          name="melange"
          description="A mixture of tools combined to produce JavaScript from OCaml and Reason"
          url="https://github.com/melange-re/melange"
        />
        <OpenSource
          name="html_of_jsx"
          description="OCaml library to render HTML with JSX"
          url="https://github.com/davesnx/html_of_jsx"
        />
        <OpenSource
          name="ocaml-box"
          description="OCaml library to render boxes in the terminal"
          url="https://github.com/davesnx/ocaml-box"
        />
        <OpenSource
          name="taco"
          description="Layout primitives written in ReasonReact and styled-ppx"
          url="https://github.com/davesnx/taco"
        />
        <OpenSource
          name="query-json"
          description="Faster, simpler and more portable implementation of `jq` in Reason"
          url="https://github.com/davesnx/query-json"
        />
        <OpenSource
          name="query-json's playground"
          description="Backendless playground for query-json to play, explore and learn. Build with Js_of_ocaml and jsoo-react"
          url="https://github.com/davesnx/query-json"
        />
        <OpenSource
          name="The interactive way to learn ramda"
          description="Website to teach Ramda.js interactively. Build with React."
          url="https://github.com/davesnx/learn-ramda"
        />
        <Spacer top={2} />
      </Stack>
      <Spacer bottom={3}>
        <H2>Experience</H2>
      </Spacer>
      <Stack gap={5} align="left">
        <Job
          company={{ name: "Ahrefs", url: "https://ahrefs.com" }}
          date="2021 - now"
          role="Software Engineer"
        />
        <Job
          company={{ name: "Draftbit", url: "https://draftbit.com" }}
          date="2020 - 2021"
          role="Fullstack Engineer"
        />
        <Job
          company={{ name: "Typeform", url: "https://typeform.com" }}
          date="2014 - 2019"
          role="Frontend Engineer"
        />
        <Job
          company={{ name: "Ofertia", url: "https://ofertia.com" }}
          date="2013 - 2014"
          role="Backend developer"
        ></Job>

        <Job
          company={{ name: "Freelance", url: null }}
          date="2010 - 2013"
          role="Web developer"
        />
      </Stack>
    </Page>
  </>
);

export default Work;
