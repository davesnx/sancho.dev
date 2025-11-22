import React from "react";

import { H1 } from "../components/heading";
import { NavigateText, TextLink } from "../components/link";
import Page from "../components/page";
import MetaData from "../components/site-metadata";
import Spacer from "../components/spacer";
import Text from "../components/text";
import font from "../theme/fonts";

const Error = () => (
  <>
    <MetaData title="404" />
    <Page title={<H1>Page not found</H1>}>
      <Text weight={600}>
        If it sounds like it shoud, <br /> please open an issue in{" "}
        <TextLink href="https://github.com/davesnx/sancho.dev">
          the repo
        </TextLink>
        .
      </Text>
      <Spacer top={4} />
      <Text size={font.fontSizeN1}>
        Go back to <NavigateText href="/">home</NavigateText>.
      </Text>
    </Page>
  </>
);

export default Error;
