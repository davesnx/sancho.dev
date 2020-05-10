import React from "react";
import styled from "styled-components";

import Link from "./link";
import font from "./fonts";
import colors from "./colors";
import { GithubIcon } from "./social-media";
import Twitter from "./../svgs/twitter";

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
  display: inline-flex;
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

const BlueTwitter = "rgb(29, 161, 242)";

const TwitterLink = styled(Link)`
  margin-left: 4px;
  text-decoration: none;
  color: ${BlueTwitter};
`;

const InlineLogo = styled.div`
  display: inline-flex;
  align-self: center;
  margin-left: 4px;
`;

const Footer = () => (
  <>
    <Item>
      Thanks for reading. If you have any feedback please contact me on
      <TwitterLink href="https://twitter.com/davesnx">Twitter</TwitterLink>{" "}
      <InlineLogo>
        <Twitter fill={BlueTwitter} size={16} />
      </InlineLogo>
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
