import React from "react";
import styled from "styled-components";

import Icon from "./icon";

const A = styled.a`
  display: inline-block;
`;

const LinkIcon = ({ href, ...rest }) => (
  <A target="_blank" rel="noreferrer noopener" href={href}>
    <Icon padded {...rest} />
  </A>
);

export default LinkIcon;
