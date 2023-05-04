import React from "react";

import Layout from "./layout";
import Spacer from "./spacer";
import Main from "./main";

const Page = ({ title, children }) => (
  <Layout key={title}>
    <Main>
      {title}
      <Spacer top={3}>{children}</Spacer>
    </Main>
  </Layout>
);

export default Page;
