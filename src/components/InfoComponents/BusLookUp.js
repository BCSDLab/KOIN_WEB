import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  
  @media (max-width: 576px) {
    border-top: none;
    padding-top: 3px;
    width: 100%;
    height: 100%;
  }
`;

const LookUp = styled.div`
  width: 1131px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 63px;
  
  @media (max-width: 576px) {
    padding-left: 16px;
    padding-right: 16px;
    width: calc(100% - 32px);
    margin-top: 26px;
    height: 100%;
    float: left;
  }
`;

const Title = styled.h1`
  text-align: left;
  letter-spacing: -1.5px;
  font-size: 30px;
  color: #175c8e;
  font-family: NanumSquare, serif;
  font-weight: 800;
  margin: 0 0 27px 0;
  
  @media (max-width: 576px) {
    font-size: 20px;
    margin: 0 0 17px 0;
  }
`;

const Desc = styled.div`
  text-align: left;
  letter-spacing: -1.2px;
  font-size: 24px;
  color: black;
  width: 55%;
  font-weight: 300;
  float: left;
  
  @media (max-width: 576px) {
    font-size: 18px;
    margin-top: 3px;
  }
`;

const SelectForm = styled.div`
  width: 45%;
  text-align: right;
  //position: relative;
  //bottom: 4px;
  float: right;
  font-size: 24px;
  
  @media (max-width: 576px) {
    margin-top: 41px;
    width: 100%;
    margin-bottom: 12px;
    font-size: 20px;
  }
`;

const DropDownContentsContainer = styled.div`
  display: none;
  position: absolute;
  background-color: #ffffff;
  width: 120px;
  left: -10px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  font-size: 14px;
`;

const DropDown = styled.div`
  position: relative;
  display: inline-block;
  justify-content: center;
  
  &:hover ${DropDownContentsContainer}{
    display: block;
  }
`;

const DropDownBtn = styled.button`
  background-color: #ffffff;
  color: black;
  top: 1px;
  position: relative;
  border: none;
  cursor: pointer;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  
  @media (max-width: 576px) {
    font-size: 20px;
  }
`;

const ArrowImg = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/bus_dropdown.png"
})`
  flex: none;
  width: 15px;
  height: auto;
  margin: 0 5px 2px 5px;
`;

const DropDownContent = styled.a`
  color: black;
  padding: 10px 0;
  text-decoration: none;
  display: block;
  border: 1px #d0d0d0 solid;
  text-align: center;
  border-collapse: collapse;
  margin-top: -1px;
  cursor: pointer;
`;

const CardsContainer = styled.div`
  position: relative;
  top: 20px;
  width: 100%;
  display: -ms-flexbox;
  -ms-flex-direction: row;
  display: grid;
  grid-template-columns: repeat(3, 370px);
  grid-column-gap: 9px;
  
  @media (max-width: 576px) {
    float: left;
    height: 100%;
    margin-bottom: 40px;
    display: block;
  }
`;

const Cards = styled.div`
  width: 370px;
  height: 252px;
  color: white;
  
  @media (max-width: 576px) {
    width: 100%;
    height: 100%;
    float: left;
    margin-bottom: 12px;
  }

  // IE 10+
  @media all and (-ms-high-contrast: none) {
    margin-right: 9px;
    
    &:last-child {
      margin-right: 0;
    }
  }
`;

const UpperCard = styled.div`
  height: 162px;
  background-color: ${props => props.type === "shuttle" ? "#f7941e": props.type === "daesung"? "#7c9fae" : "#4db297"};
`;

const LowerCard = styled.div`
  background-color: ${props => props.type === "shuttle" ? "#f7941e": props.type === "daesung"? "#7c9fae" : "#4db297"};
  margin-top: 5px;
  height: 85px;
  padding-left: 23px;
  padding-right: 23px;
`;

const UpperCardContainer = styled.div`
  padding: 26px 23px 10px 23px;
`;

const CardHeader = styled.div`
  height: 35px;
  text-align: left;
`;

const Tag = styled.div`
  border: 1px white solid;
  border-radius: 14px;
  padding: 3px 8px;
  font-size: 11px;
  margin-right: 13px;
  width: 23px;
  float: left;
  margin-top: 2px;
  text-align: center;
`;

const Station = styled.span`
  font-size: 24px;
  letter-spacing: -1.2px;
  
  @media (max-width: 576px) {
    font-size: 20px;  
  }
`;

const BusName = styled.div`
  float: right;
  font-size: 14px;
  letter-spacing: -0.7px;
`;

const Info = styled.div`
  margin-top: 26px;
  text-align: left;
  width: 100%;
  height: 30px;
`;

const Time = styled.div`
  font-size: 18px;
  min-width: 100px;
  float: left;
  text-align: left;
  font-weight: 700;
  letter-spacing: -0.9px;
  
  @media (max-width: 576px) {
    font-size: 18px
  }
`;

const Type = styled.div`
  float: right;
  font-size: 14px;
  width: 68px;
  letter-spacing: -0.7px;
  text-align: right;
  height: 10px;
`;

const BusIcon = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/bus_icon-white.png"
})`
  position: relative;
  height: 15px;
  width: auto;
  right: 8px;
  top: 1px;
`;

const LowerCardContainer = styled.div`
  padding-top: 23px;
`;

const NextBus = styled.div`
  font-size: 12px;
  text-align: left;
  width: 100%;
  float: left;
  height: 20px;
`;

const Detail = styled.span`
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.6px;
  margin-left: 10px;
`;

// 시간 반환 함수
const hour = (val) => {
  return Math.floor(val / 60 / 60);
};

const minute = (val) => {
  return Math.floor(val / 60) % 60;
};

const timeToString = (time) => {
  if(!time){
    return "운행정보없음"
  } else if (time === "미운행"){
    return "미운행"
  } else if(hour(time) === 0 && minute(time) === 0){
    return "곧 도착"
  } else if(hour(time) === 0){
    return minute(time) + "분 전"
  } else return hour(time) + "시간 " + minute(time) + "분 전"
};

const getBusDepartTime = (remain_time) => {
  let remain_minute = Math.floor(remain_time / 60);
  let today = new Date();
  
  let minutes = today.getMinutes() + remain_minute;
  let hours = today.getHours();
  
  hours += Math.floor(minutes / 60);
  minutes %= 60;
  hours %= 24;
  
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + ":" + minutes;
};

export default function BusLookUp(
  {
    departList,
    arrivalList,
    selectDepart,
    selectArrival,
    cityBusData,
    shuttleBusData,
    expressBusData
  }
) {
  return (
    <Container>
      <LookUp>
        <Title>
          버스 / 교통 운행정보
        </Title>
        <Desc>
          어디를 가시나요?
        </Desc>
        <div>
          <Desc>
            운행수단별로 간단히 비교해드립니다.
          </Desc>

          <SelectForm>
            <DropDown>
              <DropDownBtn>
                {departList[0]}
                <ArrowImg/>
              </DropDownBtn>
              <DropDownContentsContainer>
                <DropDownContent onClick={() => selectDepart(departList[1])}>
                  {departList[1]}
                </DropDownContent>
                <DropDownContent onClick={() => selectDepart(departList[2])}>
                  {departList[2]}
                </DropDownContent>
              </DropDownContentsContainer>
            </DropDown>
            <span>에서</span>

            <DropDown>
              <DropDownBtn>
                {arrivalList[0]}
                <ArrowImg/>
              </DropDownBtn>
              <DropDownContentsContainer>
                <DropDownContent onClick={() => selectArrival(arrivalList[1])}>
                  {arrivalList[1]}
                </DropDownContent>
                <DropDownContent onClick={() => selectArrival(arrivalList[2])}>
                  {arrivalList[2]}
                </DropDownContent>
              </DropDownContentsContainer>
            </DropDown> 갑니다
          </SelectForm>
        </div>

        <CardsContainer>
          <Cards>
            <UpperCard type={"shuttle"}>
              <UpperCardContainer>
                <CardHeader>
                  <Tag>출발</Tag>
                  <Station>
                    {departList[0]}
                  </Station>
                </CardHeader>
                <CardHeader>
                  <Tag>도착</Tag>
                  <Station>
                    {arrivalList[0]}
                  </Station>
                </CardHeader>
                <Info>
                  <Time>
                    {timeToString(shuttleBusData?.now_bus?.remain_time)}
                    {shuttleBusData?.now_bus?.remain_time > 0 &&
                      <Detail>
                        {"(" + getBusDepartTime(shuttleBusData?.now_bus?.remain_time) +" 출발)"}
                      </Detail>
                    }
                  </Time>
                  <Type>
                    <BusIcon/>
                    학교셔틀
                  </Type>
                </Info>
              </UpperCardContainer>
            </UpperCard>
            <LowerCard type={"shuttle"}>
              <LowerCardContainer>
                <NextBus>
                  다음버스
                </NextBus>
                <Time>
                  {timeToString(shuttleBusData?.next_bus?.remain_time)}
                  {shuttleBusData?.next_bus?.remain_time > 0 &&
                    <Detail>
                      {"(" + getBusDepartTime(shuttleBusData?.next_bus?.remain_time) +" 출발)"}
                    </Detail>
                  }
                </Time>
                <Type>
                  <BusIcon/>
                  학교셔틀
                </Type>
              </LowerCardContainer>
            </LowerCard>
          </Cards>
          
          <Cards>
            <UpperCard type={"daesung"}>
              <UpperCardContainer>
                <CardHeader>
                  <Tag>출발</Tag>
                  <Station>
                    {departList[0]}
                  </Station>
                </CardHeader>
                <CardHeader>
                  <Tag>도착</Tag>
                  <Station>
                    {arrivalList[0]}
                  </Station>
                </CardHeader>
                <Info>
                  {expressBusData === '미운행' ?
                  <Time>
                    미운행
                  </Time>
                  :
                  <Time>
                    {timeToString(expressBusData?.now_bus?.remain_time)}
                    {expressBusData?.now_bus?.remain_time > 0 &&
                      <Detail>
                        {"(" + getBusDepartTime(expressBusData?.now_bus?.remain_time) +" 출발)"}
                      </Detail>
                    }
                  </Time>
                }
                  <Type>
                    <BusIcon/>
                    대성고속
                  </Type>
                </Info>
              </UpperCardContainer>
            </UpperCard>
            <LowerCard type={"daesung"}>
              <LowerCardContainer>
                <NextBus>
                  다음버스
                </NextBus>
                {expressBusData === '미운행' ?
                  <Time>
                    미운행
                  </Time>
                  :
                  <Time>
                    {timeToString(expressBusData?.next_bus?.remain_time)}
                    {expressBusData?.next_bus?.remain_time > 0 &&
                      <Detail>
                        {"(" + getBusDepartTime(expressBusData?.next_bus?.remain_time) +" 출발)"}
                      </Detail>
                    }
                  </Time>
                }
                
                <Type>
                  <BusIcon/>
                  대성고속
                </Type>
              </LowerCardContainer>
            </LowerCard>
          </Cards>

          <Cards>
            <UpperCard type={"city"}>
              <UpperCardContainer>
                <CardHeader>
                  <Tag>출발</Tag>
                  <Station>
                    {departList[0]}
                  </Station>
                  {cityBusData?.now_bus?.remain_time > 0 &&
                  <BusName>
                    {cityBusData?.now_bus?.bus_number + "번 버스"}
                  </BusName>
                  }
                </CardHeader>
                <CardHeader>
                  <Tag>도착</Tag>
                  <Station>
                    {arrivalList[0]}
                  </Station>
                </CardHeader>
                <Info>
                  <Time>
                    {timeToString(cityBusData?.now_bus?.remain_time)}
                    {cityBusData?.now_bus?.bus_number > 0 &&
                    <Detail>
                      {"(" + getBusDepartTime(cityBusData?.now_bus?.remain_time) +" 출발)"}
                    </Detail>
                    }
                  </Time>
                  <Type>
                    <BusIcon/>
                    시내버스
                  </Type>
                </Info>
              </UpperCardContainer>
            </UpperCard>
            <LowerCard type={"city"}>
              <LowerCardContainer>
                <NextBus>
                  다음버스
                  {cityBusData?.next_bus?.remain_time > 0 &&
                  <BusName>
                    {cityBusData?.next_bus?.bus_number + "번 버스"}
                  </BusName>
                  }
                </NextBus>
                <Time>
                  {timeToString(cityBusData?.next_bus?.remain_time)}
                  {cityBusData?.next_bus?.remain_time > 0 &&
                  <Detail>
                    {"(" + getBusDepartTime(cityBusData?.next_bus?.remain_time) +" 출발)"}
                  </Detail>
                  }
                </Time>
                <Type>
                  <BusIcon/>
                  시내버스
                </Type>
              </LowerCardContainer>
            </LowerCard>
          </Cards>
        </CardsContainer>

      </LookUp>
    </Container>
  )
}
