import React from "react";

import Layout from "../components/layout";
import Spacer from "../components/spacer";
import { H1 } from "../components/heading";
import Main from "../components/main";

const Page = ({ title, children }) => (
  <Layout>
    <Main>
      <H1>{title}</H1>
      <Spacer top={3}>{children}</Spacer>
    </Main>
  </Layout>
);

export default Page;
