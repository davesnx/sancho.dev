import React from "react";
import styled from "styled-components";
import { formatReadingTime } from "../utils/helpers";

const Distribute = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Span = styled.span`
  font-size: 16px;
`;

const PostInfo = ({ date, timeToRead }) => (
  <Distribute>
    <Span>{formatReadingTime(timeToRead)}</Span>
    <Span>{date}</Span>
  </Distribute>
);

export default PostInfo;
