import { Link } from "gatsby";
import styled from "styled-components";

import colors from "../colors";

const Navigate = styled(Link)`
  color: ${colors.paleBlue};
  font-weight: 500;
  font-size: inherit;
  transition: color 0.15s ease;

  text-decoration: ${props => props.underline ? "underline" : "none"};
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
`;

export default Navigate;
