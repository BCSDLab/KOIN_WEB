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
  margin-bottom: 16px;
`
const Timetable = styled.div`
  width: 256px;
  height: 369px;
  position: relative;
  border-left: solid 1px #d2dae2;
  margin-left: -1px;
  font-size: 10px;
`;

const TimetableHead = styled.div`
  width: 100%;
  height: 27px;
  background-color: #f1f1f1;;
  border-top: solid 1px #d2dae2;
  display: flex;
`;
const TimetableHeadCol = styled.div`
  border-right: solid 1px #d2dae2;
  width: 41px;
  height: 100%;
  font-family: NanumBarunGothic;
  line-height: 27px;
  letter-spacing: normal;
  color: #555555;
  
  :first-child {
    width: 45px;
  }
`;
const TimetableContent = styled.div`
  width: 100%;
  overflow: hidden;
  display: inline-flex;
  flex: none;
  border-bottom: #d2dae2 1px solid;
`;
const TimetableRowContainer = styled.div`
  border-top: #d2dae2 1px solid;
`;
const TimetableRowLine = styled.div`
  margin-top: -1px;
  height: 17px;
  
  ::after {
    content: '';
    position: absolute;
    width: 100%;
  }
  :nth-child(odd)::after {
    border-bottom: #dadada 1px solid;
  }
  :nth-child(even)::after {
    border-bottom: rgba(218, 218, 218, 0.3) 1px solid;
  }
  :last-child {
    height: 52px;
  }
`;

const TimetableSideCol = styled.div`
  width: 45px;
  height: 100%;
  border-right: #dadada 1px solid;
`;
const TimetableSideRow = styled.div`
  height: 16px;
  font-size: 7px;
  line-height: 16px;
  
  :last-child {
    height: 52px;
    line-height: 52px;
  }
`;
const TimetableSideTimeAlias = styled.div`
  display: inline-block;
  width: 16px;
  border-right: #dadada 1px solid;
`;
const TimetableSideTime = styled.div`
  display: inline-block;
  width: 26px;
`;

const TimetableCol = styled.div`
  border-right: #dadada 1px solid;
  width: 41px;
  
`;

export default function IndexTimeTable() {
  let timeAlias = ["01A", "01B", "02A", "02B", "03A", "03B", "04A", "04B", "05A", "05B", "06A", "06B", "07A", "07B", "08A", "08B", "09A", "09B"];
  let times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
  return (
    <Container>
      <Title>시간표</Title>
      <Timetable>
        <TimetableHead>
          <TimetableHeadCol/>
          <TimetableHeadCol>월요일</TimetableHeadCol>
          <TimetableHeadCol>화요일</TimetableHeadCol>
          <TimetableHeadCol>수요일</TimetableHeadCol>
          <TimetableHeadCol>목요일</TimetableHeadCol>
          <TimetableHeadCol>금요일</TimetableHeadCol>
        </TimetableHead>
        <TimetableContent>
          <TimetableRowContainer>
            {timeAlias.map(value => (<TimetableRowLine key={value}/>))}
            <TimetableRowLine/>
          </TimetableRowContainer>
          <TimetableSideCol>
            {timeAlias.map((value, index) => (
              <TimetableSideRow key={value}>
                <TimetableSideTimeAlias>
                  {value}
                </TimetableSideTimeAlias>
                <TimetableSideTime>
                  {times[index]}
                </TimetableSideTime>
              </TimetableSideRow>
            ))}
            <TimetableSideRow>
              그 이후
            </TimetableSideRow>
          </TimetableSideCol>
          <TimetableCol></TimetableCol>
          <TimetableCol></TimetableCol>
          <TimetableCol></TimetableCol>
          <TimetableCol></TimetableCol>
          <TimetableCol></TimetableCol>
        </TimetableContent>
      </Timetable>
    </Container>
  )
}
