import styled from "styled-components";
import { styles } from "./text";
import { unit, px } from "./unit";

export const ListItem = styled.li`
  ${styles};
  margin: 0;
`;

export const OrderList = styled.ol`
  margin: ${px(unit(3))};
`;
