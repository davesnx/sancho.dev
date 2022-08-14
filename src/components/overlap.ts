import styled from "@emotion/styled";

const Overlap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  & > *:not(:first-of-type) {
    position: absolute;
  }
`;

export default Overlap;
