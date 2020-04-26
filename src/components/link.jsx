import styled from "styled-components";
import colors from "./colors";

const Link = styled.a`
  color: ${colors.black};
  font-weight: 600;
  font-size: inherit;
  transition: color 0.15s ease;
  &:hover {
    color: ${colors.grey};
  }
`;

export default Link;
