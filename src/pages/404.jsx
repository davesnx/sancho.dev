import React from "react";
import Layout from "../components/layout";

export default () => (
  <Layout>
    <h1>
      <span role="img" aria-label="Ghost">
        🤔 Not found
      </span>
    </h1>
    <p>
      It seems this page does not exist. Go back to the{" "}
      <a href="https://sancho.dev">home page</a>
    </p>
  </Layout>
);
