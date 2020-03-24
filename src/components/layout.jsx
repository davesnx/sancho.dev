import React from "react";
import styled from "styled-components";
import GlobalStyles from "./global-styles";
import SiteMetadata from "./site-metadata";
import colors from "./colors";
import "../../static/fonts/styles.css";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.black};
`;

export default ({ children, pathname }) => {
  /*   const { data } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `); */

  return (
    <Root>
      <GlobalStyles />
      <SiteMetadata pathname={pathname} />
      {children}
    </Root>
  );
};
