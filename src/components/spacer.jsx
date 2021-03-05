import styled from "styled-components";

import constants from "../constants";
import { unit, px, rem } from "../utils/unit";

const Spacer = styled.div`
  ${props => props.top && `margin-top: ${px(unit(props.top))}`};
  ${props => props.bottom && `margin-bottom: ${px(unit(props.bottom))}`};
  ${props => props.left && `margin-left: ${px(unit(props.left))}`};
  ${props => props.right && `margin-right: ${px(unit(props.right))}`};
  ${props => props.inline && "display: inline-block"};
`;

export const RelativeSpacer = styled.div`
  ${props => props.top && `margin-top: ${rem(props.top)}`};
  ${props => props.bottom && `margin-bottom: ${rem(props.bottom)}`};
  ${props => props.left && `margin-left: ${rem(props.left)}`};
  ${props => props.right && `margin-right: ${rem(props.right)}`};
  ${props => props.inline && "display: inline-block"};
`;

export const ResponsiveSpacer = styled.div`
  ${props => props.desktopTop && `margin-top: ${rem(props.desktopTop)}`};
  ${props =>
    props.desktopBottom && `margin-bottom: ${rem(props.desktopBottom)}`};
  ${props => props.desktopLeft && `margin-left: ${rem(props.desktopLeft)}`};
  ${props => props.desktopRight && `margin-right: ${rem(props.desktopRight)}`};

  @media (max-width: ${constants.width}) {
    ${props => props.mobileTop && `margin-top: ${rem(props.mobileTop)}`};
    ${props =>
      props.mobileBottom && `margin-bottom: ${rem(props.mobileBottom)}`};
    ${props => props.mobileLeft && `margin-left: ${rem(props.mobileLeft)}`};
    ${props => props.mobileRight && `margin-right: ${rem(props.mobileRight)}`};
  }
`;

export default Spacer;
