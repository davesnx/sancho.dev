import styled from "styled-components";

import { colors } from "../theme";

export const Character = styled.span.attrs(props => ({
  style: {
    fontVariationSettings: `"wght" ${props.wght}`,
  },
}))`
  width: ${props => (props.isMobile ? "25px" : "75px")};
  font-size: ${props => (props.isMobile ? "25px" : "50px")};
  text-transform: uppercase;
  font-family: "Inter";
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.body};
  transition: all 200ms ease-out;

  & + & {
    border-left: none;
  }
`;
