import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 256px;
`;

const Title = styled.div`
  font-family: NanumSquare;
  font-size: 17px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  cursor: pointer;
  color: #175c8e;
  padding-left: 5px;
`

export default function IndexTimeTable() {
  return(
    <Container>
      <Title>시간표</Title>
    </Container>
  )
}
