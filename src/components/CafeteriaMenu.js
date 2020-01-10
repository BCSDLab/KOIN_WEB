import React, {useEffect} from "react";
import styled from "styled-components"
import CafeteriaMenuList from "./CafeteriaMenuList";

const Container = styled.div`
  border-top: #f7941e 5px solid;
  width: 100%;
`;

const CafeteriaContainer = styled.div`
  margin: 49px auto 35px auto;
  width: 1132px;
`;

const Title = styled.div`
  width: auto;
  height: 29px;
  font-family: NanumSquare, sans-serif;
  font-size: 24px;
  font-weight: 800;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -1.5px;
  text-align: left;
  color: #175c8e;
`;

const DateSelector = styled.div`
  margin-top: 22px;
  margin-bottom: -4px;
`;

const Arrow = styled.span` 
  width: 6.5px;
  height: 6.5px;
  border: solid #bbbbbb;
  border-width: 0 2px 2px 0;
  display: inline-block;
  transform: ${props => props.direction === "prev" ? "rotate(135deg)" : "rotate(-45deg)"};
  -webkit-transform: ${props => props.direction === "prev" ? "rotate(135deg)" : "rotate(-45deg)"};
  margin-bottom: 3.5px;
  cursor: pointer;
`;

const Date = styled.span`
  height: 27px;
  font-family: AppleSDGothicNeoB00, sans-serif;
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.41;
  letter-spacing: normal;
  text-align: center;
  color: #3a3a3a;
  margin: 0 7px;
`;

const CafeteriaList = styled.button`
  width: 158px;
  height: 54px;
  border: solid ${(props) => (props.cafeteria === "능수관" || props.cafeteria === "수박여" || props.cafeteria === "2캠퍼스") ? '#f7941e' : '#175c8e'};
  border-width: 3px 0 3px 0;
  color: ${(props) => (props.cafeteria === "능수관" || props.cafeteria === "수박여" || props.cafeteria === "2캠퍼스") ? '#f7941e' : '#175c8e'};
  padding: 21px auto;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: -0.8px;
  text-align: center;
  margin: 50px 2px 0 1.5px;
`;

const Breakfast = styled.div`
  margin-top: 35px;
`;

const TimeSection = styled.button`
  width: 62px;
  height: 24px;
  border-radius: 13px;
  border: solid 0.7px #c0c0c0;
  font-family: AppleSDGothicNeoSB00,sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: normal;
  text-align: center;
  color: #838383;
  background-color: #FFFFFF;
  z-index: 1;
    
  &:before {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    width: 1132px;
    background-color: #c0c0c0;
    left: 0;
    right: 0;
    margin: 8px auto 0 auto;
    z-index: -1;
  }
`;

const Lunch = styled.div`
  margin-top: 22px;
`;

const Dinner = styled.div`
  margin-top: 24px;
`;

export default function CafeteriaMenu(
  {
    date,
    clickPrev,
    clickNext,
    cafeteriaList,
    cafeteriaMenus
  }) {
  return (
    <Container>
      <CafeteriaContainer>
        <Title>
          오늘의 식단
        </Title>
        <DateSelector>
          <Arrow
            onClick={clickPrev}
            direction="prev"/>
          <Date>
            {date.slice(0, 4)}년 {date.slice(5, 7)}월 {date.slice(8, 10)}일
          </Date>
          <Arrow
            onClick={clickNext}
            direction="next"/>
        </DateSelector>
        {cafeteriaList.map((cafeteria) => {
          return (
            <CafeteriaList
              key={cafeteria}
              cafeteria={cafeteria}>
              {cafeteria}
            </CafeteriaList>
          )
        })}
        <Breakfast>
          <TimeSection>
            아침
          </TimeSection>
          <CafeteriaMenuList
            cafeteriaList={cafeteriaList}
            cafeteriaMenus={cafeteriaMenus}
            time={"BREAKFAST"}/>
        </Breakfast>
        <Lunch>
          <TimeSection>
            점심
          </TimeSection>
          <CafeteriaMenuList
            cafeteriaList={cafeteriaList}
            cafeteriaMenus={cafeteriaMenus}
            time={"LUNCH"}/>
        </Lunch>
        <Dinner>
          <TimeSection>
            저녁
          </TimeSection>
          <CafeteriaMenuList
            cafeteriaList={cafeteriaList}
            cafeteriaMenus={cafeteriaMenus}
            time={"DINNER"}/>
        </Dinner>
      </CafeteriaContainer>
    </Container>
  )
}
