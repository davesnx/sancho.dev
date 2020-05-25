import React from "react";
import styled from "styled-components";
import SiteMetadata from "./site-metadata";
import colors from "./colors";

const Root = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${props => props.backgroundColor};
`;

export default ({ children, pathname, backgroundColor = colors.white }) => {
  return (
    <>
      <Root backgroundColor={backgroundColor}>
        <SiteMetadata pathname={pathname} />
        {children}
      </Root>
    </>
  );
};
