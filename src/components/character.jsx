import styled from "@emotion/styled";

import { colors } from "../theme/theme";
import { rgb } from "../theme/color";

export const Character = styled.span`
  font-wariation-settings: "wght" ${(props) => props.wght};
  width: ${(props) => (props.isMobile ? "25px" : "75px")};
  font-size: ${(props) => (props.isMobile ? "25px" : "50px")};
  text-transform: uppercase;
  font-family: "Inter";
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${rgb(colors.body)};
  transition: all 200ms ease-out;

  & + & {
    border-left: none;
  }
`;
