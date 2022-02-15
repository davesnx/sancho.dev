import React from "react";
import styled from "styled-components";

import colors from "../colors";

const A = styled.a`
  color: ${colors.paleBlue};
  font-weight: 500;
  font-size: inherit;
  line-height: inherit;
  transition: color 0.15s ease;

  text-decoration: underline;
  text-decoration-color: ${colors.paleBlue};
  text-decoration-thickness: 1.5px;
  text-underline-offset: 1.5px;

  &:hover {
    color: ${colors.blue};
    text-decoration-color: ${colors.blue};
  }

  cursor: pointer;
  overflow-wrap: break-word;
  word-wrap: break-word;
  display: inherit;
`;

const UnstyledA = styled.a`
  color: currentColor;
`;

export const Link = ({ to, ...rest }) => {
  return (
    <A
      target="_blank"
      rel="noreferrer noopener"
      {...rest}
      href={to || rest.href}
    />
  );
};

export const UnstyledLink = ({ to, ...rest }) => {
  return (
    <UnstyledA target="_blank" rel="noreferrer noopener" {...rest} href={to} />
  );
};

export default Link;
