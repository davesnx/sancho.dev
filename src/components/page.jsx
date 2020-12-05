import React from "react";

import Layout from "../components/layout";
import Spacer from "../components/spacer";
import Main from "../components/main";

const Page = ({ title, children }) => (
  <Layout>
    <Main>
      {title}
      <Spacer top={3}>{children}</Spacer>
    </Main>
  </Layout>
);

export default Page;
