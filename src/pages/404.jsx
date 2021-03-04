import React from "react";
import styled from "styled-components";
import font from "../components/fonts";

import Text from "../components/text";
import Page from "../components/page";
import Spacer from "../components/spacer";
import Navigate from "../components/navigate";
import { Link } from "../components/link";

const Small = styled(Text)`
  font-size: ${font.fontSizeN1};
`;

export default () => (
  <Page title="Page not found">
    <Text weigth={600}>
      If it sounds like it shoud, <br /> please open an issue in{" "}
      <Link to="https://github.com/davesnx/sancho.dev">the repo</Link>.
    </Text>
    <Spacer top={4} />
    <Small>
      Go back to <Navigate to="https://sancho.dev">home</Navigate>.
    </Small>
  </Page>
);
