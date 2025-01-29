import styled from "@emotion/styled";
import React from "react";

import { H1, H2 } from "../components/heading";
import { TextLink } from "../components/link";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import Spacer from "../components/spacer";
import { Row, Stack } from "../components/taco";
import Text from "../components/text";
import { rgba } from "../theme/color";
import font from "../theme/fonts";
import { colors } from "../theme/theme";

let Gallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

let CompanyLogo = styled.div`
  min-width: 150px;
  max-width: 150px;
  padding: 1.8rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

let JobRoot = styled.section`
  width: 100%;
  padding: 1.4rem;
  border-radius: 8px;
  border: 2px solid ${rgba(colors.contrastCodeBackground, 1)};
  background-color: ${rgba(colors.contrastCodeBackground, 0.3)};
`;

let Job = ({
  company,
  date,
  role,
}: {
  company: {
    name: string;
    url: string | null;
    logo: React.ReactNode | null;
    logoIsDark: boolean;
  };
  date: string;
  role: string;
}) => (
  <JobRoot>
    <Row fullWidth gap={3}>
      {company.logo && <CompanyLogo> {company.logo} </CompanyLogo>}
      <Stack gap={1} align="left" fullWidth>
        <Row distribute="between" fullWidth>
          <Stack align="left" gap={0}>
            <Text weight={400} size={font.fontSize2}>
              {role}
            </Text>
            {company.url && (
              <Text weight={400} size={font.fontSize0}>
                <TextLink color={colors.subtle} href={company.url}>
                  {company.url}
                </TextLink>
              </Text>
            )}

            {!company.url && (
              <Text weight={400} color={colors.subtle} size={font.fontSize1}>
                {company.name}
              </Text>
            )}
          </Stack>
          <Text wieght={800} size={font.fontSize2}>
            {date}
          </Text>
        </Row>
      </Stack>
      <Spacer right={0} />
    </Row>
  </JobRoot>
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
  border: 2px solid ${rgba(colors.contrastCodeBackground, 1)};
  background-color: ${rgba(colors.contrastCodeBackground, 0.3)};

  &:hover {
    background-color: ${rgba(colors.contrastCodeBackground, 0.8)};
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
    <Text weight={600} size={font.fontSize1}>
      {name}
    </Text>
    <Text size={font.fontSizeN1}>{description}</Text>
  </OpenSourceItem>
);

let LogoImg = styled.img`
  width: 100%;
  opacity: 0.7;

  ${(props) => (props.logoIsDark ? "filter: brightness(0) invert(1)" : "")}
`;

let AherfsLogo = () => <LogoImg src="/logos/ahrefs.png" alt="Ahrefs" />;

let DraftbitLogo = () => <LogoImg src="/logos/draftbit.png" alt="Draftbit" />;

let TypeformLogo = () => (
  <LogoImg logoIsDark={true} src="/logos/typeform.webp" alt="Typeform" />
);

let OfertiaLogo = () => (
  <LogoImg logoIsDark={true} src="/logos/ofertia.png" alt="Ofertia" />
);

let Work = () => (
  <>
    <MetaData title="Work" />
    <Page title={<H1>Work</H1>}>
      <Spacer top={6} bottom={3}>
        <H2>Experience</H2>
      </Spacer>
      <Stack gap={3} align="left">
        <Job
          company={{
            name: "ahrefs",
            url: "https://ahrefs.com",
            logo: <AherfsLogo />,
          }}
          date="2021 - now"
          role="Software Engineer"
        />
        <Job
          company={{
            name: "Draftbit",
            url: "https://draftbit.com",
            logo: <DraftbitLogo />,
          }}
          date="2020 - 2021"
          role="Fullstack Engineer"
        />
        <Job
          company={{
            name: "Typeform",
            url: "https://typeform.com",
            logo: <TypeformLogo />,
          }}
          date="2014 - 2019"
          role="Frontend Engineer"
        />
        <Job
          company={{
            name: "Ofertia",
            url: "https://ofertia.com",
            logo: <OfertiaLogo />,
          }}
          date="2013 - 2014"
          role="Backend developer"
        ></Job>

        <Job
          company={{
            name: "Freelance",
            url: null,
            logo: (
              <Text weight={400} size={font.fontSize3}>
                😭
              </Text>
            ),
            logoIsDark: false,
          }}
          date="2010 - 2013"
          role="Web developer"
        />
      </Stack>
      <Spacer top={3} />
      <Spacer top={6} bottom={3}>
        <H2>Open Source</H2>
      </Spacer>
      <Text>{`I author, maintain or co-maintain a few open-source projects`}</Text>
      <Spacer top={3} />
      <Gallery>
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
      </Gallery>
    </Page>
  </>
);

export default Work;
