import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import font from "./fonts";
import colors from "./colors";
import { GithubIcon } from "./social-media";

const Distribute = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  & > *:not(:last-child) {
    margin-right: 24px;
  }
`;

const Item = styled.span`
  font-size: ${font.fontSize0};
  font-family: ${font.sans};
  font-weight: bold;
  color: ${colors.black};
`;

const Root = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  padding-top: 24px;
  margin-top: 24px;
  border-top: 1px solid ${colors.fadedBlack};
`;

const TwitterLink = styled(Link)`
  margin-left: 4px;
  text-decoration: none;
`;

const Footer = () => (
  <>
    <Item>
      Thanks for reading. If you have any feedback please contact me on
      <TwitterLink href="https://twitter.com/davesnx">Twitter</TwitterLink>.
    </Item>
    <Root>
      <Distribute>
        <Link to="/blog">
          <Item>Blog</Item>
        </Link>
        <Link to="/">
          <Item>About</Item>
        </Link>
        <Link to="/experiments">
          <Item>Experiments</Item>
        </Link>
      </Distribute>
      <GithubIcon href="https://github.com/davesnx/sancho.dev" />
    </Root>
  </>
);

export default Footer;
