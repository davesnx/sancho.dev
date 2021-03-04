import styled from "styled-components";

import { styles } from "./text";
import colors from "./colors";

export const ListItem = styled.li`
  ${styles};
  margin-top: 0.3em;
  margin-bottom: 0.3em;
  margin-left: 1.1em;
  padding-left: 0.5em;
  display: list-item;

  & > * {
    display: inline-block;
  }

  &::marker {
    opacity: 0.4;
    color: ${colors.black};
  }
`;

export const OrderList = styled.ol`
  margin: 24px 0px;
  padding: 0px;
  color: ${colors.black};
`;

export const UnorderList = styled.ul`
  margin: 24px 0px;
  padding: 0px;
  color: ${colors.black};
`;

export const VisualList = styled.ul`
  margin: 8px 0px;
  padding: 0;
  color: ${colors.black};
  list-style: none;
`;
