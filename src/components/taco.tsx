import styled from "@emotion/styled";

import constants from "../theme/constants";
import { unit, px } from "../utils/unit";

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
  gap?: number;
  align?: keyof typeof StackAlignMap;
  distribute?: keyof typeof StackDistributeMap;
};

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(props: StackProps) => (props.fullHeight ? "100%" : "auto")};

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
};

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: ${(props: RowProps) => (props.fullWidth ? "100%" : "auto")};

  align-items: ${(props: RowProps) => RowAlignMap[props.align || "center"]};
  justify-content: ${(props: RowProps) =>
    RowDistributeMap[props.distribute || "center"]};

  & > * {
    min-width: 0;
  }

  & > *:not(:last-child) {
    ${(props: RowProps) => `margin-right: ${px(unit(props.gap || 0))}`};
  }
`;

export const Align = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

type PropsRowResponsive = {
  gap: number;
};

export const RowResponsive = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${constants.desktop.width}) {
    flex-direction: column;
    height: auto;
    align-items: center;
    justify-content: space-between;

    & > :not(:last-child) {
      margin-bottom: ${(props: PropsRowResponsive) => px(unit(props.gap || 2))};
    }
  }
`;
