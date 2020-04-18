import React from "react";
import styled from "styled-components";
import { formatReadingTime } from "../utils/helpers";
import font from "./fonts";

const Distribute = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Span = styled.span`
  font-size: ${font.fontSize0};
  font-family: ${font.sans};
`;

const Footer = ({ date, timeToRead }) => (
  <Distribute>
    <Span>{date}</Span>
  </Distribute>
);

export default Footer;
