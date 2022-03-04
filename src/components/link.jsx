import React from "react";
import styled, { css } from "styled-components";
import { Link as GatsbyLink } from "gatsby";

import { colors } from "../theme";
import fonts from "../fonts";

const Anchor = css`
  color: ${props => props.color || colors.body};
  font-family: ${fonts.sans};
  font-weight: 500;
  font-size: inherit;
  line-height: inherit;
  transition: color 0.15s ease;

  text-decoration-thickness: 1.5px;
  text-underline-offset: 1.5px;
  text-decoration: underline;
  text-decoration-color: ${props => props.color || colors.body};

  &:hover {
    text-decoration-color: ${colors.primary};
    color: ${colors.primary};
  }

  cursor: pointer;
  overflow-wrap: break-word;
  word-wrap: break-word;
  display: inherit;
`;

const StyledA = styled.a`
  ${Anchor}
`;

const UnstyledA = styled.a`
  color: currentColor;
  text-decoration: none;
`;

export const TextLink = ({ to, ...rest }) => {
  return (
    <StyledA
      target="_blank"
      rel="noreferrer noopener"
      {...rest}
      href={to || rest.href}
    />
  );
};

export const ButtonLink = ({ to, ...rest }) => {
  return (
    <UnstyledA target="_blank" rel="noreferrer noopener" {...rest} href={to} />
  );
};


export const NavigateButton = styled(GatsbyLink)`
  text-decoration: none;
`;

export const NavigateText = styled(NavigateButton)`
  ${Anchor}
`;
