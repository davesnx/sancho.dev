import React from "react";

import Text from "../components/text";
import Page from "../components/page";
import Spacer from "../components/spacer";
import Navigate from "../components/navigate";
import Link from "../components/link";

export default () => (
  <Page title="Page cannot be found">
    <Text>
      If it sounds like it shoud 🤔, please open an issue{" "}
      <Link to="https://github.com/davesnx/sancho.dev">here</Link>.
    </Text>
    <Spacer top={2} />
    <Text>
      Go back to <Navigate to="https://sancho.dev">home</Navigate>.
    </Text>
  </Page>
);
