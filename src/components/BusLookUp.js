import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-top: #f7941e 5px solid;
  width: 100%;
`;

const LookUp = styled.div`
  width: 1131px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 63px;
`;

const Title = styled.div`
  text-align: left;
  letter-spacing: -1.5px;
  font-size: 30px;
  color: #175c8e;
  font-family: NanumSquare, serif;
  font-weight: 800;
  margin-bottom: 27px;
`;

const Desc = styled.div`
  text-align: left;
  letter-spacing: -1.2px;
  font-size: 24px;
  color: black;
  width: 55%;
  font-weight: 300;
  float: left;
`;

const SelectForm = styled.div`
  width: 45%;
  text-align: right;
  //position: relative;
  //bottom: 4px;
  float: right;
  font-size: 24px;
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
  width: 99px;
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
  width: 99px;
  font-size: 24px;
  font-weight: 700;
  display: contents;
`;

const ArrowImg = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/bus_dropdown.png"
})`
  width: 15px;
  margin: 0 5px 2px 5px;
`;

const DropDownContent = styled.a`
  color: black;
  padding: 10px 10px;
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
  display: grid;
  grid-template-columns: 370px 370px 370px;
  grid-column-gap: 9px;
`;

const Cards = styled.div`
  width: 370px;
  height: 252px;
  color: white;
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
  return Math.floor(val / 1000 / 60 / 60) % 24;
};

const minute = (val) => {
  return Math.floor(val / 1000 / 60) % 60;
};

const second = (val) => {
  return Math.floor(val / 1000) % 60;
};

const timeLength = (val) => {
  return val < 10 ? '0' + val : val;
};

const timeToString = (time) => {
  return (
    time === 0 ? "운행정보없음"
    : time === "미운행" ? "미운행"
      : hour(time) === 0 ? minute(time) + "분 " + second(time) + "초 남음"
        : minute(time) === 0 ? second(time) + "초 남음"
          : hour(time) + "시간 " + minute(time) + "분 " + second(time) + "초 남음"
  )
};

const cityBusString = (remain_time) => {
  if(remain_time !== null && remain_time !== undefined) {
    return "약 "+ Math.ceil(remain_time/60)%60 +"분 남음"
  }
  else if(remain_time === undefined || remain_time === null) {
    return "운행정보없음"
  }
};

const getCityBusDepartTime = (val) => {
  let today = new Date();
  let minutes = today.getMinutes() + val;
  let hours = today.getHours();
  if (minutes >= 60) {
    hours = hours + 1;
    minutes = minutes - 60;
  }
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
    fastestShuttleTime,
    nextFastestShuttleTime,
    fastestDaesungTime,
    nextFastestDaesungTime,
    shuttleTime,
    daesungTime,
    cityBusData
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
                    {timeToString(fastestShuttleTime)}
                  </Time>
                  <Detail>
                    {shuttleTime[0].hour !== 0 ? "(" + timeLength(shuttleTime[0].hour) + ":"+timeLength(shuttleTime[0].minute) + " 출발)" : ""}
                  </Detail>
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
                  {timeToString(nextFastestShuttleTime)}
                </Time>
                <Detail>
                  {shuttleTime[1].hour !== 0 ? "(" + timeLength(shuttleTime[1].hour) + ":" + timeLength(shuttleTime[1].minute) + " 출발)" : ""}
                </Detail>
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
                  {departList[0] === "한기대"?
                    <BusName>
                      안동출발버스
                    </BusName> :
                    departList[0] === "야우리"?
                      <BusName>
                        야우리출발버스
                      </BusName>:
                      ""
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
                    {timeToString(fastestDaesungTime)}
                    <Detail>
                      {daesungTime[0].hour !== 0 ? "(" + timeLength(daesungTime[0].hour) + ":" + timeLength(daesungTime[0].minute) + " 출발)" : ""}
                    </Detail>
                  </Time>
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
                <Time>
                  {timeToString(nextFastestDaesungTime)}
                  <Detail>
                    {daesungTime[1].hour !== 0 ? "(" + timeLength(daesungTime[1].hour) + ":" + timeLength(daesungTime[1].minute) + " 출발)" : ""}
                  </Detail>
                </Time>
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
                  {cityBusData.remain_time > 0 &&
                    <BusName>
                      {cityBusData.bus_number + "번 버스"}
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
                    {cityBusString(cityBusData.remain_time)}
                    {cityBusData.remain_time > 0 &&
                      <Detail>
                        {"(" + getCityBusDepartTime(Math.ceil(cityBusData.remain_time/60)%60) +" 출발)"}
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
                  {cityBusData.next_remain_time > 0 &&
                    <BusName>
                      {cityBusData.next_bus_number + "번 버스"}
                    </BusName>
                  }
                </NextBus>
                <Time>
                  {cityBusString(cityBusData.next_remain_time)}
                  {cityBusData.next_remain_time > 0 &&
                  <Detail>
                    {"(" + getCityBusDepartTime(Math.ceil(cityBusData.next_remain_time/60)%60) +" 출발)"}
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
