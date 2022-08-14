import styled from "@emotion/styled";
import constants from "../theme/constants";

const Main = styled.main`
  width: 100%;
  max-width: ${constants.desktop.width}px;
  padding: 32px;
  margin: 0 auto;

  @media (max-width: ${constants.mobile.width}px) {
    padding: 24px;
  }
`;

export default Main;
