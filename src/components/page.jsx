import React from "react";

import Layout from "../components/layout";
import Spacer, { RelativeSpacer } from "../components/spacer";
import Main from "../components/main";
import { isMobile } from "react-device-detect";

const Page = ({ title, children }) => (
  <Layout>
    <RelativeSpacer top={isMobile ? 8 : 16}>
      <Main>
        {title}
        <Spacer top={4}>{children}</Spacer>
      </Main>
    </RelativeSpacer>
  </Layout>
);

export default Page;
