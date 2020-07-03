import React from "react";

import Layout from "../components/layout";
import Spacer, { RelativeSpacer } from "../components/spacer";
import Main from "../components/main";
import { isMobile } from "./../utils/helpers";

const Page = ({ title, children }) => (
  <Layout>
    <RelativeSpacer top={isMobile() ? 6 : 12}>
      <Main>
        {title}
        <Spacer top={3}>{children}</Spacer>
      </Main>
    </RelativeSpacer>
  </Layout>
);

export default Page;
