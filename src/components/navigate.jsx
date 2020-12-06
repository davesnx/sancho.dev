import { Link } from "gatsby";
import styled from "styled-components";
import colors from "./colors";

const Navigate = styled(Link)`
  text-decoration: none;
  color: ${colors.paleBlue};
  font-weight: 500;
  font-size: inherit;
  transition: color 0.15s ease;

  text-decoration: none;
  &:hover {
    color: ${colors.blue};
  }

  cursor: pointer;
  overflow-wrap: break-word;
  word-wrap: break-word;
  display: inherit;
`;

export default Navigate;
