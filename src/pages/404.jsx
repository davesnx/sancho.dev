import React from "react";

import font from "../fonts";
import Text from "../components/text";
import Page from "../components/page";
import Spacer from "../components/spacer";
import { TextLink, Navigate } from "../components/link";

export default () => (
  <Page title="Page not found">
    <Text weight={600}>
      If it sounds like it shoud, <br /> please open an issue in{" "}
      <TextLink to="https://github.com/davesnx/sancho.dev">the repo</TextLink>.
    </Text>
    <Spacer top={4} />
    <Text size={font.fontSizeN1}>
      Go back to <Navigate to="https://sancho.dev">home</Navigate>.
    </Text>
  </Page>
);
