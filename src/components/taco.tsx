import styled from "@emotion/styled";

import constants from "../theme/constants";
import { px, unit } from "../utils/unit";

const StackAlignMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const StackDistributeMap = {
  around: "space-around",
  between: "space-between",
  evenly: "space-evenly",
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

type StackProps = {
  fullHeight?: boolean;
  fullWidth?: boolean;
  gap?: number;
  align?: keyof typeof StackAlignMap;
  distribute?: keyof typeof StackDistributeMap;
};

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(props: StackProps) => (props.fullHeight ? "100%" : "auto")};
  width: ${(props: StackProps) => (props.fullWidth ? "100%" : "auto")};

  align-items: ${(props: StackProps) => StackAlignMap[props.align || "center"]};
  justify-content: ${(props: StackProps) =>
    StackDistributeMap[props.distribute || "center"]};

  & > *:not(:last-child) {
    ${(props: StackProps) => `margin-bottom: ${px(unit(props.gap || 0))}`};
  }
`;

const RowAlignMap = {
  top: "flex-start",
  center: "center",
  bottom: "flex-end",
  baseline: "baseline",
};

const RowDistributeMap = {
  around: "space-around",
  between: "space-between",
  evenly: "space-evenly",
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

type RowProps = {
  fullWidth?: boolean;
  gap?: number;
  align?: keyof typeof RowAlignMap;
  distribute?: keyof typeof RowDistributeMap;
  wrap?: "wrap" | "nowrap";
  columnOnMobile?: boolean;
  columnReverseOnMobile?: boolean;
};

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: ${(props: RowProps) => (props.fullWidth ? "100%" : "auto")};
  flex-wrap: ${(props: RowProps) => (props.wrap ? "wrap" : "nowrap")};

  align-items: ${(props: RowProps) => RowAlignMap[props.align || "center"]};
  justify-content: ${(props: RowProps) =>
    RowDistributeMap[props.distribute || "center"]};

  & > * {
    min-width: 0;
  }

  & > *:not(:last-child) {
    ${(props: RowProps) => `margin-right: ${px(unit(props.gap || 0))}`};
  }

  ${(props: RowProps) =>
    props.columnOnMobile &&
    `
    @media screen and (max-width: ${constants.mobile.width}px) {
      flex-direction: column;
      align-items: flex-start;

      & > *:not(:last-child) {
        margin-right: 0;
        margin-bottom: ${px(unit(props.gap || 0))};
      }
    }
  `}

  ${(props: RowProps) =>
    props.columnReverseOnMobile &&
    `
    @media screen and (max-width: ${constants.mobile.width}px) {
      flex-direction: column-reverse;
      align-items: flex-start;

      & > *:not(:last-child) {
        margin-right: 0;
        margin-top: ${px(unit(props.gap || 0))};
      }
    }
  `}
`;

export const Align = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HideOnMobile = styled.div`
  @media screen and (max-width: ${constants.mobile.width}px) {
    display: none;
  }
`;

export const HideOnDesktop = styled.div`
  @media screen and (min-width: ${constants.mobile.width + 1}px) {
    display: none;
  }
`;
