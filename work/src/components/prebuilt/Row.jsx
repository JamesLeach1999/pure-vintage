import styled from "@emotion/styled";


const Row = styled.div`
  width: 450px;
  margin: 30px auto;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #000000;
  border-radius: 4px;
  border: #000000;
  background-color: #ffffff;
  position: relative;
  @media only screen and (max-width: 600px) {
    width: 275px;
  }
`;

export default Row;
