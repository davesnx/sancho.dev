import styled from "styled-components";

import { styles } from "./text";
import colors from "./colors";

export const ListItem = styled.li`
  ${styles};
  margin: 0;
  display: list-item;

  & > * {
    display: inline-block;
  }
`;

export const OrderList = styled.ol`
  margin: 8px 16px;
`;

export const UnorderList = styled.ul`
  margin: 8px 16px;
  padding: 0;
  color: ${colors.black};
`;

export const VisualList = styled.ul`
  margin: 8px 0px;
  padding: 0;
  color: ${colors.black};
  list-style: none;
`;
