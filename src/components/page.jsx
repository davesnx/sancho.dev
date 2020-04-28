import React from "react";

import Layout from "../components/layout";
import Spacer, { RelativeSpacer } from "../components/spacer";
import Main from "../components/main";
import { H1 } from "../components/heading";

const Page = ({ title, children }) => (
  <Layout>
    <RelativeSpacer top={16}>
      <Main>
        {title}
        <Spacer top={4}>{children}</Spacer>
      </Main>
    </RelativeSpacer>
  </Layout>
);

export default Page;
