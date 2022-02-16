import { Link } from "gatsby";
import styled from "styled-components";

import colors from "../colors";

const Navigate = styled(Link)`
  color: ${colors.blue};
  font-weight: 500;
  font-size: inherit;
  transition: color 0.15s ease;

  cursor: pointer;
  overflow-wrap: break-word;
  word-wrap: break-word;

  text-decoration: none;

  &:hover {
    color: ${colors.blue};
    text-decoration: ${props => props.underline ? "underline" : "none"};
    text-decoration-thickness: 1.5px;
    text-underline-offset: 1.5px;
    text-decoration-color: ${colors.blue};
  }
`;

export default Navigate;
