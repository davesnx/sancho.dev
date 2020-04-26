import styled from "styled-components";

const Overlap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  & > *:not(:first-child) {
    position: absolute;
  }
`;

export default Overlap;
