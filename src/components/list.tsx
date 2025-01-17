import styled from "@emotion/styled";

import { rgb } from "../theme/color";
import { colors } from "../theme/theme";
import { styles } from "./text";

export const ListItem = styled.li`
  ${(props) => styles(props)};
  color: ${rgb(colors.body)};
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: 1em;
  padding-left: 0.5em;
  display: list-item;

  ::marker {
    opacity: 0.4;
    color: ${rgb(colors.body)};
  }

  & > a {
    display: inline;
  }
`;

export const OrderList = styled.ol`
  margin: 24px 0px;
  padding: 0px;
  color: ${rgb(colors.body)};
`;

export const UnorderList = styled.ul`
  width: 100%;
  margin: 24px 0px;
  padding: 0px;
  color: ${rgb(colors.body)};
`;

export const VisualList = styled.ul`
  margin: 8px 0px;
  padding: 0;
  color: ${rgb(colors.body)};
  list-style: none;
`;
