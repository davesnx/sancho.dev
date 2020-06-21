import styled from "styled-components";
import colors from "./colors";

const Link = styled.a`
  color: ${colors.paleBlue};
  font-weight: 500;
  font-size: inherit;
  transition: color 0.15s ease;

  text-decoration: none;
  &:hover {
    color: ${colors.blue};
  }

  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export default Link;
