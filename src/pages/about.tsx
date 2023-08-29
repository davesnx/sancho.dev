import React from "react";

import { Emoji } from "../components/emoji";
import { H1 } from "../components/heading";
import { TextLink, NavigateText } from "../components/link";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import Spacer from "../components/spacer";
import Text from "../components/text";
import { ListItem, VisualList } from "../components/list";

/*import font from "../theme/fonts";
const Heading = ({ children }: string) => (
  <Spacer top={2} bottom={1}>
    <Text size={font.fontSize2} weight="500">
      {children}
    </Text>
  </Spacer>
); */

/* I work at [Ahrefs](https://ahrefs.com/) where I build user interfaces, their design system, and tooling. As part of my job but also passion, I maintain a few open-source projects:

- [styled-ppx](https://github.com/davesnx/styled-ppx) Type-safe styled components for ReScript with type-safe CSS, including a CSS parser and type-checker.
- [server-reason-react](https://github.com/ml-in-barcelona/server-reason-react) Server rendering Reason React components in OCaml using Reason.
- [reason-react](https://github.com/reasonml/reason-react) Reason bindings for React.js.
- [Reason](https://github.com/reasonml/reason) A programming language that combines the JavaScript and OCaml ecosystems. It is simple, fast, and type-safe.

I love running, cycling, skiing, coffee and minimalism. */

let About = () => {
  return (
    <>
      <MetaData title="About me" />
      <Page title={<H1>About me</H1>}>
        <Text>
          Hi <Emoji name="hand">👋</Emoji>
          {`, My name is David Sancho and I'm a
        developer from Barcelona currently working remotely at `}
          <TextLink href="http://ahrefs.com">Ahrefs</TextLink>
          {` as a Software
        engineer. Nomading between Barcelona and La Cerdanya.`}
        </Text>
        <Spacer top={2} />
        <Text>
          {`Previously worked at `}
          <TextLink href="https://draftbit.com">Draftbit</TextLink>
          {` helping people
        create React Native apps visually, and at `}
          <TextLink href="https://www.typeform.com">Typeform</TextLink>
          {` as Frontend engineer on the Renderer Team `}
          <i>{`(also known as "form experience")`}</i>.
        </Text>
        <Spacer top={2} />
        <Text>
          {`Passionate about functional programming, design, scalability, people and
        startups, but lately about compilers. Even with my limited english, I'm
        trying to write about those in this `}
          <NavigateText underline href="/blog">
            blog
          </NavigateText>
          .
        </Text>
        <Spacer top={2} />
        <Text>{`I maintain (or help maintaining) a few open-source projects:`}</Text>
        <VisualList>
          <ListItem>
            <Text>
              <Spacer inline right={1} as="span">
                <TextLink href="https://github.com/davesnx/styled-ppx">
                  styled-ppx
                </TextLink>
              </Spacer>
              Type-safe styled components for ReScript and Melange with
              type-safe CSS, including a CSS parser and type-checker.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <Spacer inline right={1} as="span">
                <TextLink href="https://github.com/ml-in-barcelona/server-reason-react">
                  server-reason-react
                </TextLink>
              </Spacer>
              Server rendering Reason React components in OCaml using Reason.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <Spacer inline right={1} as="span">
                <TextLink href="https://github.com/reasonml/reason-react">
                  reason-react
                </TextLink>
              </Spacer>
              Reason bindings for React.js
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <Spacer inline right={1} as="span">
                <TextLink href="https://github.com/reasonml/reason">
                  Reason
                </TextLink>
              </Spacer>
              A programming language that combines the JavaScript and OCaml
              ecosystems. It is simple, fast, and type-safe.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <Spacer inline right={1} as="span">
                <TextLink href="https://github.com/melange-re/melange">
                  Melange
                </TextLink>
              </Spacer>
              A mixture of tools combined to produce JavaScript from OCaml and
              Reason
            </Text>
          </ListItem>
        </VisualList>
        <Spacer top={2} />
        <Text>
          {`I'm grateful for what Open Source gave me and that's why most of my code
        is public and hosted in `}
          <TextLink href="https://github.com/davesnx">
            github.com/davesnx
          </TextLink>
          .
        </Text>
        <Spacer top={2} />
        <Text>
          {`I love endurance sports, specifically triathlon and ski. I'm focused on
        Olympic and Half-Ironman distances.`}
        </Text>
        <Spacer top={2} />
        <Text>
          {`If you want to know more, follow my fast thoughts on `}
          <TextLink href="https://github.com/davesnx">Twitter</TextLink>.
        </Text>
      </Page>
    </>
  );
};

export default About;
