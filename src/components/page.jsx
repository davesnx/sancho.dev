import React from "react";

import Layout from "./layout";
import Spacer from "./spacer";
import { H1 } from "./heading";
import Main from "./main";

const Page = ({ title, children }) => (
  <Layout>
    <Main>
      <H1>{title}</H1>
      <Spacer top={3}>{children}</Spacer>
    </Main>
  </Layout>
);

export default Page;
