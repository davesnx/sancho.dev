import React from "react";
import styled from "styled-components";
import { unit, px } from "./unit";
import colors from "./colors";

const StackAlignMap = {
  top: "flex-start",
  center: "center",
  bottom: "flex-end",
};

const StackDistributeMap = {
  around: "space-around",
  between: "space-between",
  evenly: "space-evenly",
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => (props.fullHeight ? "100%" : "auto")};

  align-items: ${props => StackAlignMap[props.align || "center"]};
  justify-content: ${props => StackDistributeMap[props.distribute || "center"]};

  & > *:not(:last-child) {
    ${props => `margin-bottom: ${px(unit(props.gap || 0))}`};
  }
`;

const RowAlignMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const RowDistributeMap = {
  around: "space-around",
  between: "space-between",
  evenly: "space-evenly",
  top: "flex-start",
  center: "center",
  bottom: "flex-end",
};

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => (props.fullWidth ? "100%" : "auto")};

  align-items: ${props => RowAlignMap[props.align || "center"]};
  justify-content: ${props => RowDistributeMap[props.distribute || "center"]};

  & > * {
    min-width: 0;
  }

  & > *:not(:last-child) {
    ${props => `margin-right: ${px(unit(props.gap || 0))}`};
  }
`;

const DistributeMap = {
  horitzontal: Row,
  vertical: Stack,
};

export const Distribute = ({ direction, ...rest }) => {
  const C = DistributeMap[direction || "horitzontal"];
  return <C {...rest} />;
};

export const Align = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StackWithDivider = styled(Stack)`
  & > *:not(:last-child) {
    padding-bottom: 40px;
    border-bottom: 1px solid ${colors.fadedBlack};
  }
`;
