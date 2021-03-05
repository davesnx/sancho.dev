import PropTypes from "prop-types";
import styled from "styled-components";

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

Spacer.displayName = "Spacer";

Spacer.propTypes = {
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  inline: PropTypes.bool,
};

export default Spacer;
