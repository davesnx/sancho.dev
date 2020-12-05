import React from "react";
import styled from "styled-components";

const ORANGE_REASON = "#db4d3f";

const Square = styled.div`
  width: 20px;
  height: 20px;
  background: ${ORANGE_REASON};
  position: relative;
`;

const RE = styled.span`
  color: white;
  position: absolute;
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  right: 1.5px;
  bottom: 1px;
  -webkit-font-smoothing: subpixel-antialiased;
`;

export default () => (
  <Square>
    <RE>RE</RE>
  </Square>
);
