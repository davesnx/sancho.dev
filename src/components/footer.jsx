import React from "react";
import styled from "styled-components";
import { Link as Navigate } from "gatsby";

import Link from "./link";
import font from "./fonts";
import colors from "./colors";
import Text from "./text";
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
  text-transform: uppercase;
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
  border-top: 1px solid ${colors.fadedBlack};
`;

const TwitterLink = styled(Link)`
  margin-left: 4px;
  text-decoration: none;
  color: ${colors.paleBlue};
`;

const NavigateStyled = styled(Navigate)`
  text-decoration: none;
  font-size: ${font.fontSizeN1};
  letter-spacing: 1.5px;
`;

const InlineLogo = styled.div`
  display: inline-flex;
  align-self: center;
  margin-left: 4px;
`;

const Footer = () => (
  <>
    <Text>
      Thanks for reading. If you have any feedback please contact me on
      <TwitterLink href="https://twitter.com/davesnx">Twitter</TwitterLink>{" "}
      <InlineLogo>
        <Twitter fill={colors.paleBlue} size={16} />
      </InlineLogo>
    </Text>
    <Root>
      <Distribute>
        <NavigateStyled to="/blog">
          <Item>Blog</Item>
        </NavigateStyled>
        <NavigateStyled to="/">
          <Item>About</Item>
        </NavigateStyled>
        <NavigateStyled to="/experiments">
          <Item>Experiments</Item>
        </NavigateStyled>
      </Distribute>
      <GithubIcon href="https://github.com/davesnx/sancho.dev" />
    </Root>
  </>
);

export default Footer;
