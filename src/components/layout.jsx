import React from "react";
import styled from "styled-components";
import GlobalStyles from "./global-styles";
import SiteMetadata from "./site-metadata";
import colors from "./colors";
import "../../static/fonts/styles.css";

const Root = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${props => props.backgroundColor};
`;

export default ({ children, pathname, backgroundColor = colors.white }) => {
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
    <Root backgroundColor={backgroundColor}>
      <GlobalStyles />
      <SiteMetadata pathname={pathname} />
      {children}
    </Root>
  );
};
