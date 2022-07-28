import React from "react";
import styled, { css } from "styled-components";
import { Link as GatsbyLink } from "gatsby";

import { transparent, xxtransparent } from "../colors"
import { colors } from "../theme";
import fonts from "../fonts";

const Anchor = css`
  color: ${props => props.color};
  font-family: ${fonts.sans};
  font-weight: 500;
  font-size: inherit;
  line-height: inherit;

  cursor: pointer;
  overflow-wrap: break-word;
  word-wrap: break-word;
  display: inherit;

  transition: color 0.15s ease;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 1.5px;
  text-decoration: underline;
  text-decoration-color: ${props => props.underlineColor};

  &:hover {
    text-decoration-color: ${props => props.underlineHoverColor};
  }
`;

const StyledA = styled.a`
  ${Anchor}
`;

const UnstyledA = styled.a`
  color: currentColor;
  text-decoration: none;
`;

const useUnderlineColors = (color) => {
  const [underlineColor, setUnderlineColor] = React.useState(color);
  const [underlineHoverColor, setUnderlineHoverColor] = React.useState(color);

  React.useEffect(() => {
    setUnderlineColor(c => xxtransparent(c))
    setUnderlineHoverColor(c => transparent(c))
  }, [])

  return [underlineColor, underlineHoverColor]
}

export const TextLink = ({ to, ...rest }) => {
  const color = rest.color || colors.body;
  const [underlineColor, underlineHoverColor] = useUnderlineColors(color);

  return (
    <StyledA
      {...rest}
      target="_blank"
      rel="noreferrer noopener"
      href={to}
      color={color}
      underlineColor={underlineColor}
      underlineHoverColor={underlineHoverColor}
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

const StyledNavigateText = styled(NavigateButton)`
  ${Anchor}
`;

export const NavigateText = ({ to, ...rest }) => {
  const color = rest.color || colors.body;
  const [underlineColor, underlineHoverColor] = useUnderlineColors(color);

  return (
    <StyledNavigateText
      {...rest}
      href={to}
      color={color}
      underlineColor={underlineColor}
      underlineHoverColor={underlineHoverColor}
    />
  );
};
