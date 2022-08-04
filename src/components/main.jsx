import styled from "styled-components";
import constants from "../constants";

export default styled.main`
  width: 100%;
  max-width: ${constants.desktop.width};
  padding: 32px;
  margin: 0 auto;

  @media (max-width: ${constants.mobile.width}) {
    padding: 24px;
  }
`;
