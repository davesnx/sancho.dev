import React from "react";

import Page from "../components/page";
import { Link } from "../components/link";
import Navigate from "../components/navigate";
import Spacer from "../components/spacer";
import Text from "../components/text";
import SocialMedia from "../components/social-media";

export default () => {
  return (
    <Page title="David Sancho">
      <Text align="left">I'm a Barcelona based software engineer.
        Trying to make cute software with{" "}
        <Link to="http://reasonml.github.io/">Reason</Link> and{" "}
        <Link to="https://ocaml.org/">OCaml</Link>. I co-host{" "}
        <Link to="https://www.twitch.tv/emelletv">EmelleTV</Link> a streaming show
        about these languages.
      </Text>
      <Spacer top={2} />
      <Text>
        Currently I work at <Link to="https://ahrefs.com/">Ahrefs</Link>, building <Link to="https://styled-ppx.vercel.app">styled-ppx</Link>.
      </Text>
      <Spacer top={2} />
      <Text>
        In my spare time, I train as an amateur triathlete focused in Olympic
        and Half Ironman distances and creating/maintaing a bunch of Open Source
        projects
      </Text>
      <Spacer top={2} />
      <Text>
        You can read more about me in the{" "}
        <Navigate underline to="/about">about</Navigate> page.
      </Text>
      <Spacer top={4} />
      <SocialMedia />
    </Page>
  );
};
