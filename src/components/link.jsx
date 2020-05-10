import styled from "styled-components";
import colors from "./colors";

const Link = styled.a`
  color: ${colors.blue};
  font-weight: 600;
  font-size: inherit;
  transition: color 0.15s ease;

  text-decoration: none;
  &:hover {
    color: ${colors.paleBlue};
  }
`;

export default Link;
