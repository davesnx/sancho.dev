import React from "react";

import Layout from "../components/layout";
import Spacer from "../components/spacer";
import Main from "../components/main";
import { H1 } from "../components/heading";

const Page = ({ title, children }) => (
  <Layout>
    <Spacer top={50}>
      <Main>
        <H1 raw>{title}</H1>
        <Spacer top={4}>{children}</Spacer>
      </Main>
    </Spacer>
  </Layout>
);

export default Page;
