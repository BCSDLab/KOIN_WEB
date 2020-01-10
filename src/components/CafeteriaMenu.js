import React, {useEffect} from "react";
import styled from "styled-components"
import CafeteriaMenuList from "./CafeteriaMenuList";
import CafeteriaMenuListMobile from "./CafeteriaMenuListMobile";

const Container = styled.div`
  border-top: #f7941e 5px solid;
  width: 100%;
  
  @media(max-width: 576px){
    border-top: none;
  }
`;

const CafeteriaContainer = styled.div`
  margin: 49px auto 35px auto;
  width: 1132px;
  
  @media (max-width: 576px) {
    width: calc(100% - 32px);
    min-width: 300px;
    margin: 30px auto auto auto;
  }
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
  
  @media(max-width: 576px){
    border: solid #989898;
    border-width: 0 2.5px 2.5px 0;
  }
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
  
  @media (max-width: 576px) {
    height: 21px;
    font-family: AppleSDGothicNeoM00,sans-serif;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.11;
    letter-spacing: normal;
    text-align: left;
    color: #4f4f4f;
  }
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
  
  @media(max-width: 576px){
    display: none;
  }
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

const PcCafeteriaMenu = styled.div`
  @media(max-width: 576px){
    display: none;
  }
`;

const MobileCafeteriaMenu = styled.div`
  display: none;
  @media(max-width: 576px){
    display: block;
    padding-top: 101.5px;
  }
`;

const FixedTopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 101.5px;
  background-color: #FFFFFF;
  //border-bottom: 1px rgba(23,92,142,0.3) solid;
`;

const TimeList = styled.div`
  margin-top: 30px;
`;

const TimeButton = styled.button`
  width: 58px;
  height: 24px;
  border-radius: 12px;
  border: solid 1px #dddddd;
  font-family: AppleSDGothicNeoM00,sans-serif;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -0.48px;
  text-align: center;
  color: #2b2b2b;
  margin: 0 calc(7%);
`;

const CafeteriaSection = styled.span`
  height: 10px;
  border: solid ${(props) => (props.cafeteria === "능수관" || props.cafeteria === "수박여" || props.cafeteria === "2캠퍼스") ? '#f7941e' : '#175c8e'};
  border-width: 0 1.5px 0 1.5px;
  font-family: AppleSDGothicNeoSB00,sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  padding: 0 12px;
  line-height: 1.15;
  color: ${(props) => (props.cafeteria === "능수관" || props.cafeteria === "수박여" || props.cafeteria === "2캠퍼스") ? '#f7941e' : '#175c8e'};
  background-color: #FFFFFF;
  z-index: 1;
  margin: 0 5.5px;
    
  &:before {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    background-color: rgba(
    ${props => props.cafeteria === "능수관" || props.cafeteria === "수박여" || props.cafeteria === "2캠퍼스" ? 247 : 23 },
    ${props => props.cafeteria === "능수관" || props.cafeteria === "수박여" || props.cafeteria === "2캠퍼스" ? 148 : 92 },
    ${props => props.cafeteria === "능수관" || props.cafeteria === "수박여" || props.cafeteria === "2캠퍼스" ? 30 : 142 },
    0.3);
    left: 0;
    right: 0;
    margin: 10px auto 0 auto;
    z-index: -1;
  }
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
        <PcCafeteriaMenu>
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
        </PcCafeteriaMenu>

        <MobileCafeteriaMenu>
          <FixedTopBar>
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
            <TimeList>
              <TimeButton>아침</TimeButton>
              <TimeButton>점심</TimeButton>
              <TimeButton>저녁</TimeButton>
            </TimeList>
          </FixedTopBar>
          {cafeteriaList.map((cafeteria)=> {
            return(
              <div key={cafeteria}>
                <CafeteriaSection cafeteria={cafeteria}>
                  {cafeteria}
                </CafeteriaSection>
                <CafeteriaMenuListMobile
                  cafeteriaMenus={cafeteriaMenus}
                  times={["BREAKFAST","LUNCH","DINNER"]}
                  cafeteria={cafeteria}/>
              </div>
            )
          })}
        </MobileCafeteriaMenu>
      </CafeteriaContainer>
    </Container>
  )
}
