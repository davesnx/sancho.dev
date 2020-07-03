import styled from "styled-components";

import { styles } from "./text";
import colors from "./colors";

export const ListItem = styled.li`
  ${styles};
  margin: 0;
`;

export const OrderList = styled.ol`
  margin: 8px 16px;
`;

export const UnorderList = styled.ul`
  margin: 8px 16px;
  padding: 0;
  color: ${colors.black};
`;
