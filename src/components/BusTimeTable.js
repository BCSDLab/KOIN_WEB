import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width:100%;
`;

const TimeTable = styled.div`
  margin-top: 119px;
  width: 1131px;
  margin-left: auto;
  margin-right: auto;
`;

export default function BusTimeTable() {
  return(
    <Container>
      <TimeTable>
        하단부
      </TimeTable>
    </Container>
  )
}
