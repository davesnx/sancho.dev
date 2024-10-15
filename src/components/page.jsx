import React from "react";

import Layout from "./layout";
import Main from "./main";
import Spacer from "./spacer";

const Page = ({ title, children }) => (
  <Layout key={title}>
    <Main>
      {title}
      <Spacer top={3}>{children}</Spacer>
    </Main>
  </Layout>
);

export default Page;
