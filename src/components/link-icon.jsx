import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const Link = styled.a`
  display: inline-block;
`;

const LinkIcon = ({ href, ...rest }) => (
  <Link target="_blank" rel="noreferrer noopener" href={href}>
    <Icon padded {...rest} />
  </Link>
);

export default LinkIcon;
