import styled from "styled-components";
import font from "./fonts";
import colors from "./colors";

export default styled.p`
  font-weight: 200;
  font-size: ${font.fontSize1};
  line-height: 1.7;
  color: ${colors.white};
  text-align: ${props => (props.align === "center" ? "center" : "left")}};
  margin: 0;
`;
