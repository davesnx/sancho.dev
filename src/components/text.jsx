import styled, { css } from "styled-components";
import font from "./fonts";
import colors from "./colors";

export const styles = css`
  font-weight: 200;
  font-size: ${font.fontSize1};
  font-family: ${font.sans};
  line-height: 1.7;
  color: ${colors.black};
  margin: 0;
`;

export default styled.p`
  ${styles};

  text-align: ${props => (props.align === "center" ? "center" : "left")}};
  margin-bottom: ${props => (!props.raw ? "24px" : "")};
`;
