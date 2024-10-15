import styled from "@emotion/styled";

import constants from "../theme/constants";
import { px, rem, unit } from "../utils/unit";

type Props = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  inline?: boolean;
};

const Spacer = styled.div`
  ${(props: Props) => props.top && `margin-top: ${px(unit(props.top))}`};
  ${(props: Props) =>
    props.bottom && `margin-bottom: ${px(unit(props.bottom))}`};
  ${(props: Props) => props.left && `margin-left: ${px(unit(props.left))}`};
  ${(props: Props) => props.right && `margin-right: ${px(unit(props.right))}`};
  ${(props: Props) => props.inline && "display: inline-block"};
`;

export const RelativeSpacer = styled.div`
  ${(props: Props) => props.top && `margin-top: ${rem(props.top)}`};
  ${(props: Props) => props.bottom && `margin-bottom: ${rem(props.bottom)}`};
  ${(props: Props) => props.left && `margin-left: ${rem(props.left)}`};
  ${(props: Props) => props.right && `margin-right: ${rem(props.right)}`};
  ${(props: Props) => props.inline && "display: inline-block"};
`;

type ResponsiveSpacerT = {
  desktopTop?: number;
  desktopBottom?: number;
  desktopLeft?: number;
  desktopRight?: number;
  mobileTop?: number;
  mobileBottom?: number;
  mobileLeft?: number;
  mobileRight?: number;
};

export const ResponsiveSpacer = styled.div`
  ${(props: ResponsiveSpacerT) =>
    props.desktopTop && `margin-top: ${rem(props.desktopTop)}`};
  ${(props: ResponsiveSpacerT) =>
    props.desktopBottom && `margin-bottom: ${rem(props.desktopBottom)}`};
  ${(props: ResponsiveSpacerT) =>
    props.desktopLeft && `margin-left: ${rem(props.desktopLeft)}`};
  ${(props: ResponsiveSpacerT) =>
    props.desktopRight && `margin-right: ${rem(props.desktopRight)}`};

  @media screen and (max-width: ${constants.mobile.width}px) {
    ${(props: ResponsiveSpacerT) =>
      props.mobileTop && `margin-top: ${rem(props.mobileTop)}`};
    ${(props: ResponsiveSpacerT) =>
      props.mobileBottom && `margin-bottom: ${rem(props.mobileBottom)}`};
    ${(props: ResponsiveSpacerT) =>
      props.mobileLeft && `margin-left: ${rem(props.mobileLeft)}`};
    ${(props: ResponsiveSpacerT) =>
      props.mobileRight && `margin-right: ${rem(props.mobileRight)}`};
  }
`;

export default Spacer;
