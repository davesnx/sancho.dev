import React from "react";
import Layout from "../components/layout";
import Main from "../components/main";
import { H1 } from "../components/heading";
import Text from "../components/text";
import Link from "../components/link";

export default () => (
  <Layout>
    <Main>
      <H1>
        <span role="img" aria-label="Ghost">
          🤔 Not found
        </span>
      </H1>
      <Text>
        It seems this page does not exist. Go back to{" "}
        <Link href="https://sancho.dev">home</Link>
      </Text>
    </Main>
  </Layout>
);
